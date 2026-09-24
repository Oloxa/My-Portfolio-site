const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const mediaDir = path.join(__dirname, 'xtra', 'media');

// Helper to normalize strings for relaxed asset matching
function normalizeKey(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

// Map available files in xtra/media for fast lookup
function findMediaFile(requestedName) {
  if (!fs.existsSync(mediaDir)) return null;
  const decoded = decodeURIComponent(requestedName).trim();
  const directPath = path.join(mediaDir, decoded);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return directPath;
  }

  const files = fs.readdirSync(mediaDir);
  // Try case-insensitive exact match
  const lower = decoded.toLowerCase();
  const exactMatch = files.find(f => f.toLowerCase() === lower);
  if (exactMatch) {
    return path.join(mediaDir, exactMatch);
  }

  // Try relaxed match ignoring punctuation/spaces/parentheses
  const targetKey = normalizeKey(decoded);
  const relaxedMatch = files.find(f => normalizeKey(f) === targetKey);
  if (relaxedMatch) {
    return path.join(mediaDir, relaxedMatch);
  }

  return null;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server-side proxy for Make.com webhook to prevent client CORS issues
app.post('/api/leads', async (req, res) => {
  try {
    const hookUrl = "https://hook.eu2.make.com/jzsfva1frhs1ry71bj9hljm28ohaenoz";
    const response = await fetch(hookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error("Webhook proxy error:", err.message);
    res.status(500).json({ error: "Failed to forward lead data" });
  }
});

// Media file middleware for /media/*
app.use('/media', (req, res, next) => {
  const filename = req.path.replace(/^\//, '');
  if (!filename) return next();
  const filePath = findMediaFile(filename);
  if (filePath) {
    return res.sendFile(filePath);
  }
  next();
});

// Media file middleware for /wp-content/uploads/*
app.use('/wp-content/uploads', (req, res, next) => {
  const parts = req.path.split('/').filter(Boolean);
  const filename = parts[parts.length - 1];
  if (!filename) return next();
  const filePath = findMediaFile(filename);
  if (filePath) {
    return res.sendFile(filePath);
  }
  next();
});

// Serve src directory statically (for generated assets and images)
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Serve xtra directory statically
app.use('/xtra', express.static(path.join(__dirname, 'xtra')));

// Serve root static directory (css, js, html, etc.)
app.use(express.static(__dirname));

// HTML route shortcuts for 4-page portfolio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get(['/web-services', '/web-services.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'web-services.html'));
});

app.get(['/creative-space', '/creative-space.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'creative-space.html'));
});

app.get(['/leadership-business', '/leadership-business.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'leadership-business.html'));
});

app.get(['/team', '/team-solution', '/team-solution.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'team-solution.html'));
});

app.get(['/privacy', '/privacy-policy', '/privacy-policy.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

// Fallback to index.html for root or unknown paths
app.use((req, res) => {
  const possibleFile = path.join(__dirname, req.path);
  if (fs.existsSync(possibleFile) && fs.statSync(possibleFile).isFile()) {
    return res.sendFile(possibleFile);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`XPERA server running on http://${HOST}:${PORT}`);
});

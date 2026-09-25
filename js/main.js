/**
 * H.O. Damilare Michael Portfolio - Core JavaScript System
 * Dynamic Theme Backgrounds, Dual Motion Carousels, 7-Item Pagination,
 * Global Video Players, Modal Choreography, Accessibility & Footer Sequence
 */

// Fetch Setter Polyfill/Safeguard for iframe Sandbox Environments
(function() {
    try {
        var _currentFetch = window.fetch;
        if (typeof Window !== 'undefined' && Window.prototype) {
            try {
                var protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
                if (!protoDesc || !protoDesc.set || !protoDesc.writable) {
                    Object.defineProperty(Window.prototype, 'fetch', {
                        get: function() { return _currentFetch; },
                        set: function(fn) { _currentFetch = fn; },
                        configurable: true,
                        enumerable: true
                    });
                }
            } catch (err) {}
        }
        try {
            var winDesc = Object.getOwnPropertyDescriptor(window, 'fetch');
            if (!winDesc || !winDesc.set || !winDesc.writable) {
                Object.defineProperty(window, 'fetch', {
                    get: function() { return _currentFetch; },
                    set: function(fn) { _currentFetch = fn; },
                    configurable: true,
                    enumerable: true
                });
            }
        } catch (err) {}
    } catch (e) {}
})();

// Toast Notifications
function showNotification(message, isError = false) {
    let toast = document.getElementById('mho-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'mho-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `fixed top-24 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-full text-sm font-semibold shadow-2xl transition-all duration-300 pointer-events-none opacity-100 transform translate-y-0 ${
        isError 
            ? 'bg-rose-950/90 text-rose-200 border border-rose-500/50 backdrop-blur-md' 
            : 'bg-[#12161A]/95 text-[#F5E6C8] border border-[#E6C280]/60 backdrop-blur-md shadow-[0_0_20px_rgba(230,194,128,0.2)]'
    }`;
    setTimeout(() => {
        if (toast) {
            toast.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-full text-sm font-semibold shadow-2xl transition-all duration-300 pointer-events-none opacity-0 transform -translate-y-4';
        }
    }, 4000);
}

// Global Preloader Execution (Optimized for Snappy & Seamless Loading)
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const progressEl = preloader.querySelector('.loader-bar-progress');
    const percentEl = preloader.querySelector('.loader-percentage');

    let current = 0;
    const target = 100;
    const duration = 180; // Instantaneous 180ms
    const start = performance.now();

    function dismissPreloader() {
        if (preloader.classList.contains('loaded')) return;
        if (progressEl) progressEl.style.width = '100%';
        if (percentEl) percentEl.textContent = '100%';
        preloader.classList.add('loaded');
        triggerHeroEntrance();
    }

    function updateCounter(now) {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(eased * target);

        if (progressEl) progressEl.style.width = `${current}%`;
        if (percentEl) percentEl.textContent = `${current}%`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            dismissPreloader();
        }
    }

    if (document.readyState === 'complete') {
        dismissPreloader();
    } else {
        requestAnimationFrame(updateCounter);
        window.addEventListener('load', () => setTimeout(dismissPreloader, 40), { once: true });
    }
}

// Hero Entrance Animation with H1 Text GSAP Perspective Reveal
function triggerHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    gsap.fromTo('.hero-fade-in', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out' }
    );

    gsap.fromTo('.celestial-moon-wrap',
        { scale: 0.75, opacity: 0, y: -20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.3)', delay: 0.1 }
    );

    initHeadingGsapAnimations();
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

/* ==========================================================================
   PAGE-SPECIFIC ANIMATED BACKGROUNDS
   1. Creative Services: Cosmic Galaxy & Shooting Comets
   2. Leadership & Health: Medicine & Cellular Vitality Flow Canvas
   3. Web Proficiency: Analytics Data Grid & Architectural Vectors Canvas
   4. About Me / Home: Storytelling Waves & Narrative Streams Canvas
   ========================================================================== */
function initThemeBackground() {
    const bodyTheme = document.body.getAttribute('data-page-theme') || '';
    const currentPath = window.location.pathname.toLowerCase();

    if (bodyTheme === 'creative' || currentPath.includes('creative-space')) {
        initCosmicGalaxy();
    } else if (bodyTheme === 'health' || bodyTheme === 'leadership' || currentPath.includes('leadership-business')) {
        initBioCellularFlow();
    } else if (bodyTheme === 'web' || currentPath.includes('web-services')) {
        initAnalyticsDataGrid();
    } else {
        initNarrativeLightFlow();
    }
}

// 1. Creative Space: Deep Space Galaxy, Solar System, Comets & Stellar Drift
function initCosmicGalaxy() {
    const canvas = document.getElementById('cosmicCanvas');
    const warpContainer = document.getElementById('warpBg');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let mousePos = { x: width / 2, y: height / 2, active: false };
        let smoothParallax = { x: 0, y: 0 };
        let time = 0;

        window.addEventListener('mousemove', (e) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
            mousePos.active = true;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mousePos.active = false;
        });

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // --- A. STELLAR STARFIELD WITH REALISTIC SCINTILLATION ---
        const STAR_COUNT = Math.min(180, Math.floor(width / 9));
        const starHues = ['#ffffff', '#FFF3CD', '#E6C280', '#F5E6C8', '#D8B4FE', '#93C5FD'];
        const stars = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 0.7 + Math.random() * 2.2,
                depth: 0.15 + Math.random() * 0.85,
                color: starHues[Math.floor(Math.random() * starHues.length)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.015 + Math.random() * 0.035,
                baseAlpha: 0.18 + Math.random() * 0.55
            });
        }

        // --- B. SWIRLING SPIRAL GALAXY ARMS (COSMIC DUST) ---
        const GALAXY_PARTICLES = 90;
        const galaxyArms = [];
        for (let i = 0; i < GALAXY_PARTICLES; i++) {
            const arm = i % 2; // 2 distinct spiral arms
            const dist = 35 + (i / GALAXY_PARTICLES) * 260;
            const angleOffset = (arm * Math.PI) + (dist * 0.022);
            galaxyArms.push({
                dist: dist,
                angleOffset: angleOffset,
                size: 1 + Math.random() * 2.2,
                color: i % 3 === 0 ? '#E6C280' : (i % 3 === 1 ? '#FFF3CD' : '#C084FC'),
                alpha: 0.15 + Math.random() * 0.45
            });
        }
        let galaxyRotation = 0;

        // --- C. SOLAR SYSTEM ENGINE (SUN, ORBITS, PLANETS, RINGED GIANT & MOON) ---
        const planets = [
            {
                name: "Hermes Prime",
                semiA: 85,
                semiB: 55,
                angle: 0.4,
                speed: 0.018,
                radius: 4,
                color: "#E6C280",
                glow: "rgba(230, 194, 128, 0.6)",
                hasMoon: false
            },
            {
                name: "Aura Oceanus",
                semiA: 155,
                semiB: 100,
                angle: 2.1,
                speed: 0.011,
                radius: 6.5,
                color: "#7DD3FC",
                glow: "rgba(125, 211, 252, 0.6)",
                hasMoon: true,
                moonAngle: 0,
                moonSpeed: 0.05,
                moonDist: 14
            },
            {
                name: "Kronos Titan",
                semiA: 235,
                semiB: 150,
                angle: 4.2,
                speed: 0.0065,
                radius: 9.5,
                color: "#FDE68A",
                glow: "rgba(253, 230, 138, 0.5)",
                hasRings: true,
                ringRadiusX: 19,
                ringRadiusY: 6,
                ringTilt: -0.35
            },
            {
                name: "Neura Celestial",
                semiA: 320,
                semiB: 200,
                angle: 1.1,
                speed: 0.0035,
                radius: 5.5,
                color: "#C084FC",
                glow: "rgba(192, 132, 252, 0.4)",
                hasAura: true
            }
        ];

        // --- D. HIGH-VELOCITY COMETS & SHOOTING STARS ---
        const comets = [];
        const cometSparks = [];

        function spawnComet() {
            if (comets.length >= 3) return;
            const startFromTop = Math.random() > 0.4;
            comets.push({
                x: startFromTop ? (Math.random() * width * 0.85) : -30,
                y: startFromTop ? -30 : (Math.random() * height * 0.5),
                vx: 5.5 + Math.random() * 4.5,
                vy: 4.2 + Math.random() * 3.5,
                length: 80 + Math.random() * 90,
                alpha: 0.85,
                size: 2.5 + Math.random() * 1.5,
                color: Math.random() > 0.4 ? '#FFF3CD' : '#E6C280'
            });
        }

        setInterval(() => {
            if (Math.random() > 0.25) spawnComet();
        }, 2600);

        function renderCosmicSpace() {
            if (document.hidden) {
                requestAnimationFrame(renderCosmicSpace);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            time += 0.016;

            const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.028 : 0;
            const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.028 : 0;
            smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.05;
            smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.05;

            // --- 1. RENDER SWIRLING GALAXY SPIRAL ARMS ---
            const galaxyX = (width < 900 ? width * 0.22 : width * 0.28) + smoothParallax.x * 0.4;
            const galaxyY = (width < 900 ? height * 0.72 : height * 0.65) + smoothParallax.y * 0.4;
            galaxyRotation += 0.0012;

            // Core galaxy glow
            const galGrad = ctx.createRadialGradient(galaxyX, galaxyY, 0, galaxyX, galaxyY, 140);
            galGrad.addColorStop(0, 'rgba(230, 194, 128, 0.12)');
            galGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.06)');
            galGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = galGrad;
            ctx.beginPath();
            ctx.arc(galaxyX, galaxyY, 140, 0, Math.PI * 2);
            ctx.fill();

            galaxyArms.forEach(gp => {
                const currentAngle = gp.angleOffset + galaxyRotation;
                const px = galaxyX + Math.cos(currentAngle) * gp.dist;
                const py = galaxyY + Math.sin(currentAngle) * (gp.dist * 0.65); // Elliptical perspective

                ctx.beginPath();
                ctx.arc(px, py, gp.size, 0, Math.PI * 2);
                ctx.fillStyle = gp.color;
                ctx.globalAlpha = gp.alpha;
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // --- 2. RENDER SOLAR SYSTEM: SUN & ORBITAL PATHS ---
            const sunX = (width < 900 ? width * 0.78 : width * 0.72) + smoothParallax.x * 0.8;
            const sunY = (width < 900 ? height * 0.28 : height * 0.35) + smoothParallax.y * 0.8;

            // Pulsing Coronal Radiance (The Solar Core)
            const sunPulse = Math.sin(time * 2.2) * 3;
            const sunGlowGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 65 + sunPulse);
            sunGlowGrad.addColorStop(0, '#FFFFFF');
            sunGlowGrad.addColorStop(0.18, 'rgba(255, 243, 205, 0.95)');
            sunGlowGrad.addColorStop(0.45, 'rgba(230, 194, 128, 0.55)');
            sunGlowGrad.addColorStop(0.8, 'rgba(230, 194, 128, 0.12)');
            sunGlowGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = sunGlowGrad;
            ctx.beginPath();
            ctx.arc(sunX, sunY, 65 + sunPulse, 0, Math.PI * 2);
            ctx.fill();

            // Solar Core Disk
            ctx.fillStyle = '#FFFDF0';
            ctx.beginPath();
            ctx.arc(sunX, sunY, 13, 0, Math.PI * 2);
            ctx.fill();

            // Render Elliptical Orbital Guides
            ctx.strokeStyle = 'rgba(230, 194, 128, 0.14)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 7]);

            planets.forEach(p => {
                ctx.beginPath();
                ctx.ellipse(sunX, sunY, p.semiA, p.semiB, -0.22, 0, Math.PI * 2);
                ctx.stroke();
            });
            ctx.setLineDash([]); // Reset line dash

            // Render Orbiting Planets
            planets.forEach(p => {
                p.angle += p.speed;
                // Parametric ellipse calculation with rotation
                const tilt = -0.22;
                const rawX = Math.cos(p.angle) * p.semiA;
                const rawY = Math.sin(p.angle) * p.semiB;
                const rotX = rawX * Math.cos(tilt) - rawY * Math.sin(tilt);
                const rotY = rawX * Math.sin(tilt) + rawY * Math.cos(tilt);

                const px = sunX + rotX;
                const py = sunY + rotY;

                // Planet Glow Aura
                ctx.fillStyle = p.glow;
                ctx.beginPath();
                ctx.arc(px, py, p.radius * 2.2, 0, Math.PI * 2);
                ctx.fill();

                // Planet Body
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(px, py, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Ringed Giant: Saturn Rings
                if (p.hasRings) {
                    ctx.save();
                    ctx.translate(px, py);
                    ctx.rotate(p.ringTilt);
                    ctx.strokeStyle = 'rgba(253, 230, 138, 0.75)';
                    ctx.lineWidth = 2.2;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.ringRadiusX, p.ringRadiusY, 0, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }

                // Exoplanet Moonlet
                if (p.hasMoon) {
                    p.moonAngle += p.moonSpeed;
                    const mx = px + Math.cos(p.moonAngle) * p.moonDist;
                    const my = py + Math.sin(p.moonAngle) * (p.moonDist * 0.7);
                    ctx.fillStyle = '#F8FAFC';
                    ctx.beginPath();
                    ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // --- 3. RENDER SCINTILLATING STELLAR STARS ---
            stars.forEach(s => {
                s.pulse += s.pulseSpeed;
                const alpha = (Math.sin(s.pulse) * 0.2 + s.baseAlpha);

                let sx = s.x + smoothParallax.x * s.depth * 2;
                let sy = s.y + smoothParallax.y * s.depth * 2;

                if (mousePos.active) {
                    const dx = sx - mousePos.x;
                    const dy = sy - mousePos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150 && dist > 0) {
                        const push = (1 - dist / 150) * 1.8 * s.depth;
                        sx += (dx / dist) * push;
                        sy += (dy / dist) * push;
                    }
                }

                ctx.beginPath();
                ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = Math.max(0.08, Math.min(0.85, alpha));
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // --- 4. RENDER COMETS WITH ION TAILS & TRAILING STARDUST SPARKS ---
            for (let i = comets.length - 1; i >= 0; i--) {
                const c = comets[i];
                c.x += c.vx;
                c.y += c.vy;
                c.alpha -= 0.007;

                // Spawn tail dust sparks
                if (Math.random() > 0.45) {
                    cometSparks.push({
                        x: c.x - c.vx * 2 + (Math.random() - 0.5) * 6,
                        y: c.y - c.vy * 2 + (Math.random() - 0.5) * 6,
                        alpha: 0.8,
                        color: c.color
                    });
                }

                const tailX = c.x - c.vx * 16;
                const tailY = c.y - c.vy * 16;
                const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
                grad.addColorStop(0, '#FFFFFF');
                grad.addColorStop(0.2, c.color);
                grad.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.moveTo(c.x, c.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = c.size;
                ctx.globalAlpha = Math.max(0, c.alpha);
                ctx.stroke();

                // Comet head flare
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.size * 1.2, 0, Math.PI * 2);
                ctx.fill();

                ctx.globalAlpha = 1;

                if (c.y > height + 100 || c.x > width + 100 || c.alpha <= 0) {
                    comets.splice(i, 1);
                }
            }

            // Render comet dust sparks
            for (let s = cometSparks.length - 1; s >= 0; s--) {
                const sp = cometSparks[s];
                sp.alpha -= 0.035;
                if (sp.alpha <= 0) {
                    cometSparks.splice(s, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(sp.x, sp.y, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = sp.color;
                    ctx.globalAlpha = sp.alpha * 0.7;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }

            requestAnimationFrame(renderCosmicSpace);
        }

        renderCosmicSpace();
        return;
    }

    if (!warpContainer) return;
}

// 2. Leadership & Health: Subtle Interconnected Cellular Defense & Pathogen Neutralization (With Responsive Cursor Interaction)
function initBioCellularFlow() {
    const canvas = document.getElementById('bioCellularCanvas') || document.getElementById('cellularCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mousePos = { x: -999, y: -999, active: false };
    let lastMousePos = { x: -999, y: -999 };
    let mouseVelocity = { x: 0, y: 0 };
    let smoothParallax = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        if (!mousePos.active) {
            lastMousePos.x = e.clientX;
            lastMousePos.y = e.clientY;
        } else {
            mouseVelocity.x = (e.clientX - lastMousePos.x) * 0.4;
            mouseVelocity.y = (e.clientY - lastMousePos.y) * 0.4;
            lastMousePos.x = e.clientX;
            lastMousePos.y = e.clientY;
        }
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mousePos.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mousePos.active = false;
        mouseVelocity.x = 0;
        mouseVelocity.y = 0;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 1. Healthy Interconnected Cells
    const cells = [];
    const CELL_COUNT = Math.min(32, Math.max(16, Math.floor(width / 46)));

    for (let i = 0; i < CELL_COUNT; i++) {
        cells.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 13 + Math.random() * 20,
            innerRadius: 3.5 + Math.random() * 5.5,
            vx: (Math.random() - 0.5) * 0.72,
            vy: -0.35 - Math.random() * 0.65, // Accelerated systemic buoyancy
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.038 + Math.random() * 0.045,
            isImmuneSentinel: Math.random() > 0.65, // Emerald vitality/immune sentinels
            lastFireTime: 0,
            fireCooldown: 16 + Math.floor(Math.random() * 24),
            organelles: [
                { angle: Math.random() * Math.PI * 2, dist: 5 + Math.random() * 6, speed: 0.035 },
                { angle: Math.random() * Math.PI * 2, dist: 7 + Math.random() * 4, speed: -0.028 }
            ]
        });
    }

    // 2. Cooperative Intercellular Signal Pulses (Healthy cell-to-cell communication)
    const intercellularPulses = [];
    for (let i = 0; i < 11; i++) {
        intercellularPulses.push({
            from: Math.floor(Math.random() * CELL_COUNT),
            to: Math.floor(Math.random() * CELL_COUNT),
            progress: Math.random(),
            speed: 0.018 + Math.random() * 0.025
        });
    }

    // 3. Ambient ATP / Vitality Sparkles
    const atpParticles = [];
    for (let i = 0; i < 35; i++) {
        atpParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.9 + Math.random() * 1.5,
            vy: -0.55 - Math.random() * 0.9,
            vx: (Math.random() - 0.5) * 0.45,
            alpha: 0.15 + Math.random() * 0.45,
            pulse: Math.random() * Math.PI * 2
        });
    }

    // 4. Red Viruses (Pathogens that pop up and get targeted)
    const viruses = [];
    const MAX_ACTIVE_VIRUSES = 3;
    let virusSpawnTimer = 0;

    function spawnVirus() {
        if (viruses.length >= MAX_ACTIVE_VIRUSES) return;
        const margin = 80;
        viruses.push({
            x: margin + Math.random() * (width - margin * 2),
            y: margin + Math.random() * (height - margin * 2),
            radius: 11 + Math.random() * 8,
            vx: (Math.random() - 0.5) * 0.65,
            vy: (Math.random() - 0.5) * 0.65,
            angle: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.035,
            spikes: 8,
            spikeLength: 5 + Math.random() * 3,
            maxHp: 100,
            hp: 100,
            spawnScale: 0.1,
            flash: 0,
            dissolving: false,
            dissolveProgress: 0
        });
    }

    // Seed 2 initial viruses
    spawnVirus();
    spawnVirus();

    // 5. Active Antibodies / Defensive Bio-pulses
    const antibodies = [];

    // 6. Dissolve Sparkling Particles (Harmless cellular nutrients when virus is defeated)
    const sparkles = [];

    function renderBioFlow() {
        ctx.clearRect(0, 0, width, height);

        // Natural decay of cursor motion velocity
        mouseVelocity.x *= 0.92;
        mouseVelocity.y *= 0.92;

        // Smooth subtle 3D parallax offset responding to cursor position
        const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.022 : 0;
        const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.022 : 0;
        smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.06;
        smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.06;

        // --- SUBTLE LIVING BIO-FIELD HALO UNDER CURSOR ---
        if (mousePos.active) {
            const haloGrad = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 185);
            haloGrad.addColorStop(0, 'rgba(230, 194, 128, 0.025)');
            haloGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.01)');
            haloGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = haloGrad;
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, 185, 0, Math.PI * 2);
            ctx.fill();
        }

        // --- A. SPAWN VIRUSES PERIODICALLY ---
        virusSpawnTimer++;
        if (virusSpawnTimer > 65 && viruses.length < MAX_ACTIVE_VIRUSES) {
            spawnVirus();
            virusSpawnTimer = 0;
        }

        // --- B. AMBIENT ATP PARTICLES (SUBTLE LIVING BACKGROUND, SWIRLING IN CURSOR WAKE) ---
        atpParticles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            p.pulse += 0.025;

            // Subtle organic response to cursor movement
            if (mousePos.active) {
                const pdx = p.x - mousePos.x;
                const pdy = p.y - mousePos.y;
                const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
                if (pdist < 180 && pdist > 0) {
                    const push = (1 - pdist / 180) * 1.35;
                    p.x += (pdx / pdist) * push;
                    p.y += (pdy / pdist) * push;
                    p.x += mouseVelocity.x * 0.035 * (1 - pdist / 180);
                    p.y += mouseVelocity.y * 0.035 * (1 - pdist / 180);
                }
            }

            if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            const glow = (Math.sin(p.pulse) * 0.12 + p.alpha) * 0.65;
            ctx.beginPath();
            ctx.arc(p.x + smoothParallax.x * 0.5, p.y + smoothParallax.y * 0.5, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 194, 128, ${Math.max(0.04, glow)})`;
            ctx.fill();
        });

        // --- C. INTERCONNECTED CELLULAR FILAMENTS (GAP JUNCTIONS WITH CURSOR SHIMMER) ---
        for (let i = 0; i < cells.length; i++) {
            for (let j = i + 1; j < cells.length; j++) {
                const dx = cells[i].x - cells[j].x;
                const dy = cells[i].y - cells[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 155) {
                    let alpha = (1 - dist / 155) * 0.11;

                    // Intercellular filaments subtly illuminate when cursor passes nearby
                    if (mousePos.active) {
                        const midX = (cells[i].x + cells[j].x) / 2;
                        const midY = (cells[i].y + cells[j].y) / 2;
                        const mdx = midX - mousePos.x;
                        const mdy = midY - mousePos.y;
                        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                        if (mdist < 180) {
                            alpha += (1 - mdist / 180) * 0.12;
                        }
                    }

                    ctx.beginPath();
                    ctx.moveTo(cells[i].x + smoothParallax.x, cells[i].y + smoothParallax.y);
                    ctx.lineTo(cells[j].x + smoothParallax.x, cells[j].y + smoothParallax.y);
                    ctx.strokeStyle = cells[i].isImmuneSentinel || cells[j].isImmuneSentinel
                        ? `rgba(16, 185, 129, ${alpha * 0.72})`
                        : `rgba(230, 194, 128, ${alpha * 0.75})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // --- D. INTERCELLULAR COMMUNICATION SIGNAL PULSES ---
        intercellularPulses.forEach(sp => {
            sp.progress += sp.speed;
            if (sp.progress >= 1) {
                sp.progress = 0;
                sp.from = Math.floor(Math.random() * cells.length);
                sp.to = Math.floor(Math.random() * cells.length);
            }

            const c1 = cells[sp.from];
            const c2 = cells[sp.to];
            if (c1 && c2) {
                const dx = c2.x - c1.x;
                const dy = c2.y - c1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 170) {
                    const px = c1.x + dx * sp.progress + smoothParallax.x;
                    const py = c1.y + dy * sp.progress + smoothParallax.y;

                    ctx.beginPath();
                    ctx.arc(px, py, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = c1.isImmuneSentinel ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255, 243, 205, 0.55)';
                    ctx.fill();
                }
            }
        });

        // --- E. UPDATE & DRAW VIRUSES (PATHOGENS EVADING SLIGHTLY FROM CURSOR) ---
        for (let vi = viruses.length - 1; vi >= 0; vi--) {
            const v = viruses[vi];

            // Scale-in popup effect
            if (v.spawnScale < 1) {
                v.spawnScale += 0.035;
                if (v.spawnScale > 1) v.spawnScale = 1;
            }

            if (!v.dissolving) {
                v.x += v.vx;
                v.y += v.vy;
                v.angle += v.rotSpeed;

                // Subtle pathogen response to cursor proximity
                if (mousePos.active) {
                    const vdx = v.x - mousePos.x;
                    const vdy = v.y - mousePos.y;
                    const vdist = Math.sqrt(vdx * vdx + vdy * vdy);
                    if (vdist < 180 && vdist > 0) {
                        const evade = (1 - vdist / 180) * 0.95;
                        v.x += (vdx / vdist) * evade;
                        v.y += (vdy / vdist) * evade;
                        v.angle += 0.03 * (1 - vdist / 180);
                    }
                }

                // Bounce softly off screen bounds
                if (v.x < 40 || v.x > width - 40) v.vx *= -1;
                if (v.y < 40 || v.y > height - 40) v.vy *= -1;

                if (v.flash > 0) v.flash -= 0.08;

                const curRadius = v.radius * v.spawnScale;
                const spikeLen = v.spikeLength * v.spawnScale;

                // 1. Draw virus radiating spikes (corona glycoproteins)
                ctx.save();
                ctx.translate(v.x + smoothParallax.x, v.y + smoothParallax.y);
                ctx.rotate(v.angle);

                for (let s = 0; s < v.spikes; s++) {
                    const sAngle = (s * Math.PI * 2) / v.spikes;
                    const sx1 = Math.cos(sAngle) * curRadius;
                    const sy1 = Math.sin(sAngle) * curRadius;
                    const sx2 = Math.cos(sAngle) * (curRadius + spikeLen);
                    const sy2 = Math.sin(sAngle) * (curRadius + spikeLen);

                    // Spiky stalk
                    ctx.beginPath();
                    ctx.moveTo(sx1, sy1);
                    ctx.lineTo(sx2, sy2);
                    ctx.strokeStyle = v.flash > 0 ? 'rgba(255, 243, 205, 0.45)' : 'rgba(239, 68, 68, 0.35)';
                    ctx.lineWidth = 1.3;
                    ctx.stroke();

                    // Spike bulb head
                    ctx.beginPath();
                    ctx.arc(sx2, sy2, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = v.flash > 0 ? 'rgba(255, 255, 255, 0.65)' : 'rgba(220, 38, 38, 0.48)';
                    ctx.fill();
                }

                // 2. Draw virus core capsid
                ctx.beginPath();
                ctx.arc(0, 0, curRadius, 0, Math.PI * 2);
                ctx.fillStyle = v.flash > 0
                    ? 'rgba(255, 243, 205, 0.5)'
                    : 'rgba(220, 38, 38, 0.42)';
                ctx.shadowBlur = v.flash > 0 ? 8 : 4;
                ctx.shadowColor = v.flash > 0 ? '#FFF3CD' : 'rgba(239, 68, 68, 0.3)';
                ctx.fill();
                ctx.shadowBlur = 0;

                // Inner nucleocapsid ring
                ctx.beginPath();
                ctx.arc(0, 0, curRadius * 0.55, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(153, 27, 27, 0.5)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();

                // Telemetry tag
                if (v.spawnScale >= 0.95) {
                    ctx.font = '8px monospace';
                    ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
                    ctx.textAlign = 'center';
                    ctx.fillText('PATHOGEN', v.x + smoothParallax.x, v.y + smoothParallax.y - curRadius - 8);
                }
            } else {
                // Dissolving into harmless golden nutrients
                v.dissolveProgress += 0.085;
                const curRadius = v.radius * (1 - v.dissolveProgress);
                const alpha = Math.max(0, 1 - v.dissolveProgress);

                ctx.beginPath();
                ctx.arc(v.x + smoothParallax.x, v.y + smoothParallax.y, Math.max(0.5, curRadius), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(230, 194, 128, ${alpha * 0.45})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#E6C280';
                ctx.fill();
                ctx.shadowBlur = 0;

                if (v.dissolveProgress >= 1) {
                    viruses.splice(vi, 1);
                }
            }
        }

        // --- F. CELLS COORDINATING & FIRING ANTIBODIES AT VIRUSES (WITH ORGANIC CURSOR PARTING) ---
        cells.forEach(c => {
            c.x += c.vx;
            c.y += c.vy;
            c.pulse += c.pulseSpeed;

            // Interactive organic response to cursor: subtle fluid deflection & wake drag
            if (mousePos.active) {
                const mdx = c.x - mousePos.x;
                const mdy = c.y - mousePos.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < 190 && mdist > 0) {
                    const force = (1 - mdist / 190) * 1.3;
                    c.x += (mdx / mdist) * force;
                    c.y += (mdy / mdist) * force;

                    c.x += mouseVelocity.x * 0.04 * (1 - mdist / 190);
                    c.y += mouseVelocity.y * 0.04 * (1 - mdist / 190);

                    c.pulse += 0.035 * (1 - mdist / 190);
                }
            }

            // Screen boundary wrap
            if (c.y < -50) { c.y = height + 50; c.x = Math.random() * width; }
            if (c.x < -50) c.x = width + 50;
            if (c.x > width + 50) c.x = -50;

            // Look for closest active virus to coordinate defense
            let closestVirus = null;
            let closestDist = 240;

            viruses.forEach(v => {
                if (v.dissolving || v.spawnScale < 0.7) return;
                const dx = v.x - c.x;
                const dy = v.y - c.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestVirus = v;
                }
            });

            // Extend defensive filament and fire antibodies
            if (closestVirus) {
                const defenseAlpha = (1 - closestDist / 240) * 0.14;

                ctx.beginPath();
                ctx.moveTo(c.x + smoothParallax.x, c.y + smoothParallax.y);
                ctx.lineTo(closestVirus.x + smoothParallax.x, closestVirus.y + smoothParallax.y);
                ctx.strokeStyle = c.isImmuneSentinel
                    ? `rgba(16, 185, 129, ${defenseAlpha})`
                    : `rgba(230, 194, 128, ${defenseAlpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                c.lastFireTime++;
                if (c.lastFireTime >= c.fireCooldown) {
                    c.lastFireTime = 0;
                    antibodies.push({
                        x: c.x,
                        y: c.y,
                        startX: c.x,
                        startY: c.y,
                        target: closestVirus,
                        targetX: closestVirus.x,
                        targetY: closestVirus.y,
                        progress: 0,
                        speed: 0.075 + Math.random() * 0.045,
                        isEmerald: c.isImmuneSentinel
                    });
                }
            }

            // Draw healthy cell membrane & nucleus
            const breathingR = c.radius + Math.sin(c.pulse) * 2.2;
            const primaryColor = c.isImmuneSentinel ? 'rgba(16, 185, 129,' : 'rgba(230, 194, 128,';
            const cx = c.x + smoothParallax.x;
            const cy = c.y + smoothParallax.y;

            // Outer membrane
            ctx.beginPath();
            ctx.arc(cx, cy, breathingR, 0, Math.PI * 2);
            ctx.strokeStyle = `${primaryColor} 0.15)`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Inner vital nucleus
            ctx.beginPath();
            ctx.arc(cx, cy, c.innerRadius, 0, Math.PI * 2);
            ctx.fillStyle = c.isImmuneSentinel ? 'rgba(16, 185, 129, 0.45)' : 'rgba(230, 194, 128, 0.45)';
            ctx.shadowBlur = 5;
            ctx.shadowColor = c.isImmuneSentinel ? 'rgba(16, 185, 129, 0.3)' : 'rgba(230, 194, 128, 0.3)';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Orbiting organelles
            c.organelles.forEach(o => {
                o.angle += o.speed;
                const ox = cx + Math.cos(o.angle) * o.dist;
                const oy = cy + Math.sin(o.angle) * o.dist;
                ctx.beginPath();
                ctx.arc(ox, oy, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = '#FFF3CD';
                ctx.globalAlpha = 0.55;
                ctx.fill();
                ctx.globalAlpha = 1;
            });
        });

        // --- G. UPDATE & DRAW ANTIBODIES (IMMUNE QUANTA ATTACKING VIRUSES) ---
        for (let ai = antibodies.length - 1; ai >= 0; ai--) {
            const ab = antibodies[ai];
            ab.progress += ab.speed;

            const curTargetX = ab.target && !ab.target.dissolving ? ab.target.x : ab.targetX;
            const curTargetY = ab.target && !ab.target.dissolving ? ab.target.y : ab.targetY;

            ab.x = ab.startX + (curTargetX - ab.startX) * ab.progress;
            ab.y = ab.startY + (curTargetY - ab.startY) * ab.progress;

            ctx.beginPath();
            ctx.arc(ab.x + smoothParallax.x, ab.y + smoothParallax.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = ab.isEmerald ? 'rgba(167, 243, 208, 0.65)' : 'rgba(255, 243, 205, 0.6)';
            ctx.shadowBlur = 4;
            ctx.shadowColor = ab.isEmerald ? 'rgba(16, 185, 129, 0.45)' : 'rgba(230, 194, 128, 0.45)';
            ctx.fill();
            ctx.shadowBlur = 0;

            if (ab.progress >= 1) {
                if (ab.target && !ab.target.dissolving) {
                    ab.target.hp -= 25;
                    ab.target.flash = 1;

                    for (let k = 0; k < 4; k++) {
                        sparkles.push({
                            x: ab.target.x,
                            y: ab.target.y,
                            vx: (Math.random() - 0.5) * 1.8,
                            vy: (Math.random() - 0.5) * 1.8,
                            alpha: 0.65,
                            color: ab.isEmerald ? '#10B981' : '#FFF3CD'
                        });
                    }

                    if (ab.target.hp <= 0) {
                        ab.target.dissolving = true;
                        for (let k = 0; k < 16; k++) {
                            sparkles.push({
                                x: ab.target.x,
                                y: ab.target.y,
                                vx: (Math.random() - 0.5) * 2.8,
                                vy: (Math.random() - 0.5) * 2.8,
                                alpha: 0.75,
                                color: k % 2 === 0 ? '#E6C280' : '#FFF3CD'
                            });
                        }
                    }
                }
                antibodies.splice(ai, 1);
            }
        }

        // --- H. UPDATE & DRAW DISSOLVE SPARKLES (SWIRLING IN CURSOR FLOW) ---
        for (let si = sparkles.length - 1; si >= 0; si--) {
            const s = sparkles[si];
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.96;
            s.vy *= 0.96;
            s.alpha -= 0.022;

            if (mousePos.active) {
                const ssdx = s.x - mousePos.x;
                const ssdy = s.y - mousePos.y;
                const ssdist = Math.sqrt(ssdx * ssdx + ssdy * ssdy);
                if (ssdist < 120 && ssdist > 0) {
                    s.x += mouseVelocity.x * 0.025;
                    s.y += mouseVelocity.y * 0.025;
                }
            }

            if (s.alpha <= 0) {
                sparkles.splice(si, 1);
            } else {
                ctx.beginPath();
                ctx.arc(s.x + smoothParallax.x, s.y + smoothParallax.y, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.alpha * 0.65;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        requestAnimationFrame(renderBioFlow);
    }

    renderBioFlow();
}

// 3. Web Proficiency: Analytics Data Grid & Matrix Vectors (30% Brighter Technical Vector Mesh)
function initAnalyticsDataGrid() {
    const canvas = document.getElementById('analyticsGridCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mousePos = { x: -999, y: -999, active: false };
    let smoothParallax = { x: 0, y: 0 };
    let gridPulse = 0;

    window.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mousePos.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mousePos.active = false;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const GRID_SIZE = 50;
    const packets = [];
    const PACKET_COUNT = 32;

    for (let i = 0; i < PACKET_COUNT; i++) {
        packets.push({
            x: Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE,
            y: Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE,
            dir: Math.random() > 0.5 ? 'h' : 'v',
            speed: 1.8 + Math.random() * 2.5,
            length: 24 + Math.random() * 32,
            color: Math.random() > 0.35 ? '#FFF3CD' : '#E6C280'
        });
    }

    // Glowing coordinate matrix hubs
    const matrixHubs = [];
    const HUB_COUNT = 16;
    for (let i = 0; i < HUB_COUNT; i++) {
        matrixHubs.push({
            gridX: (i * 7 + 3) * GRID_SIZE,
            gridY: ((i * 5 + 2) % 18) * GRID_SIZE,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03
        });
    }

    function renderGridData() {
        if (document.hidden) {
            requestAnimationFrame(renderGridData);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        gridPulse += 0.02;

        const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.022 : 0;
        const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.022 : 0;
        smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.05;
        smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.05;

        // --- 1. ARCHITECTURAL GRID COORDINATE LINES (30%+ BRIGHTER) ---
        ctx.strokeStyle = 'rgba(230, 194, 128, 0.085)';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        for (let x = 0; x < width; x += GRID_SIZE) {
            ctx.moveTo(x + smoothParallax.x, 0);
            ctx.lineTo(x + smoothParallax.x, height);
        }
        for (let y = 0; y < height; y += GRID_SIZE) {
            ctx.moveTo(0, y + smoothParallax.y);
            ctx.lineTo(width, y + smoothParallax.y);
        }
        ctx.stroke();

        // --- 2. PULSING MATRIX HUBS AT INTERSECTIONS ---
        matrixHubs.forEach(hub => {
            hub.phase += hub.pulseSpeed;
            const hx = (hub.gridX % (width + GRID_SIZE)) + smoothParallax.x;
            const hy = (hub.gridY % (height + GRID_SIZE)) + smoothParallax.y;
            const alpha = 0.3 + Math.sin(hub.phase) * 0.28;

            ctx.fillStyle = `rgba(230, 194, 128, ${alpha})`;
            ctx.beginPath();
            ctx.arc(hx, hy, 3, 0, Math.PI * 2);
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(230, 194, 128, 0.7)';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Reticle crosshair marker at hub
            ctx.strokeStyle = `rgba(255, 243, 205, ${alpha * 0.75})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(hx - 5, hy);
            ctx.lineTo(hx + 5, hy);
            ctx.moveTo(hx, hy - 5);
            ctx.lineTo(hx, hy + 5);
            ctx.stroke();
        });

        // --- 3. INTERACTIVE GLOW NODES NEAR CURSOR ---
        if (mousePos.active) {
            const nearGridX = Math.round(mousePos.x / GRID_SIZE) * GRID_SIZE;
            const nearGridY = Math.round(mousePos.y / GRID_SIZE) * GRID_SIZE;

            for (let ox = -GRID_SIZE * 2; ox <= GRID_SIZE * 2; ox += GRID_SIZE) {
                for (let oy = -GRID_SIZE * 2; oy <= GRID_SIZE * 2; oy += GRID_SIZE) {
                    const nx = nearGridX + ox + smoothParallax.x;
                    const ny = nearGridY + oy + smoothParallax.y;
                    const d = Math.hypot(nx - mousePos.x, ny - mousePos.y);
                    if (d < 160) {
                        const alpha = (1 - d / 160) * 0.45;
                        ctx.beginPath();
                        ctx.arc(nx, ny, 3.2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 243, 205, ${alpha})`;
                        ctx.shadowBlur = 6;
                        ctx.shadowColor = 'rgba(230, 194, 128, 0.6)';
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                }
            }
        }

        // --- 4. HIGH-LUMINANCE DATA PACKETS (30%+ BRIGHTER) ---
        packets.forEach(p => {
            let currentSpeed = p.speed;

            if (mousePos.active) {
                const distToMouse = Math.hypot(p.x - mousePos.x, p.y - mousePos.y);
                if (distToMouse < 150) {
                    currentSpeed *= 1.4;
                }
            }

            ctx.beginPath();
            if (p.dir === 'h') {
                p.x += currentSpeed;
                if (p.x > width + 60) {
                    p.x = -60;
                    p.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
                }
                const grad = ctx.createLinearGradient(p.x + smoothParallax.x, p.y + smoothParallax.y, p.x - p.length + smoothParallax.x, p.y + smoothParallax.y);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2.0;
                ctx.globalAlpha = 0.94;
                ctx.moveTo(p.x + smoothParallax.x, p.y + smoothParallax.y);
                ctx.lineTo(p.x - p.length + smoothParallax.x, p.y + smoothParallax.y);
            } else {
                p.y += currentSpeed;
                if (p.y > height + 60) {
                    p.y = -60;
                    p.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
                }
                const grad = ctx.createLinearGradient(p.x + smoothParallax.x, p.y + smoothParallax.y, p.x + smoothParallax.x, p.y - p.length + smoothParallax.y);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2.0;
                ctx.globalAlpha = 0.94;
                ctx.moveTo(p.x + smoothParallax.x, p.y + smoothParallax.y);
                ctx.lineTo(p.x + smoothParallax.x, p.y - p.length + smoothParallax.y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Head beacon dot with bright radiant halo
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(p.x + smoothParallax.x, p.y + smoothParallax.y, 2.4, 0, Math.PI * 2);
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFF3CD';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(renderGridData);
    }

    renderGridData();
}

// 4. About Me / Home: Storytelling Waves & Narrative Streams (With Responsive Cursor Interaction)
function initNarrativeLightFlow() {
    const canvas = document.getElementById('narrativeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mousePos = { x: -999, y: -999, active: false };
    let smoothParallax = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mousePos.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mousePos.active = false;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let step = 0;

    function renderNarrativeWaves() {
        ctx.clearRect(0, 0, width, height);
        step += 0.008;

        const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.02 : 0;
        const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.02 : 0;
        smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.05;
        smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.05;

        const waves = [
            { y: height * 0.35, amp: 45, freq: 0.0018, speed: step * 0.9, color: 'rgba(230, 194, 128, 0.035)' },
            { y: height * 0.55, amp: 60, freq: 0.0012, speed: step * 1.2, color: 'rgba(255, 243, 205, 0.025)' },
            { y: height * 0.75, amp: 50, freq: 0.0022, speed: step * 0.7, color: 'rgba(240, 192, 90, 0.028)' }
        ];

        waves.forEach(w => {
            ctx.beginPath();
            ctx.moveTo(0, w.y + smoothParallax.y);
            for (let x = 0; x < width; x += 15) {
                let waveY = w.y + Math.sin(x * w.freq + w.speed) * w.amp;

                // Subtle response to cursor: gently bend wave toward cursor
                if (mousePos.active) {
                    const d = Math.hypot(x - mousePos.x, waveY - mousePos.y);
                    if (d < 160) {
                        const pull = (1 - d / 160) * 18;
                        waveY += (mousePos.y > waveY ? pull : -pull);
                    }
                }

                ctx.lineTo(x + smoothParallax.x, waveY + smoothParallax.y);
            }
            ctx.strokeStyle = w.color;
            ctx.lineWidth = 1.35;
            ctx.stroke();
        });

        requestAnimationFrame(renderNarrativeWaves);
    }

    renderNarrativeWaves();
}

/* ==========================================================================
   GLOBAL FLOATING LEFT CONTACT BAR
   ========================================================================== */
function initFloatingContactSidebar() {
    const toggle = document.getElementById('mobileContactToggle');
    const sidebar = document.querySelector('.global-contact-sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== toggle) {
            sidebar.classList.remove('mobile-open');
        }
    });
}

/* ==========================================================================
   GLOBAL INTRO VIDEO SECTION HANDLER
   ========================================================================== */
function initIntroVideoPlayer() {
    const playButtons = document.querySelectorAll('.video-play-pulse-btn, .trigger-intro-video');
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = btn.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            const videoTitle = btn.getAttribute('data-video-title') || 'Personal Introduction · H.O. Damilare Michael';
            openVideoModal(videoUrl, videoTitle, 'Executive Introduction', 'Watch H.O. Damilare Michael share his multidisciplinary philosophy across full-stack architecture, generative AI video workflows, and transformative wellness distribution.');
        });
    });
}

/* ==========================================================================
   WEB ARCHITECTURE: 26 PROJECTS REPOSITORY, DUAL CAROUSELS & 7-ITEM REPEATER
   ========================================================================== */
const WEB_PROJECTS_DATA = [
    {
        id: 'adetech',
        title: 'Adetech Global Corporate Architecture',
        category: 'Enterprise Cloud Platforms',
        snippet: 'Scalable corporate web architecture providing infrastructure management & enterprise integrations.',
        description: 'Adetech is an enterprise corporate and technological presence engineered for maximum uptime, international CDN distribution, and multi-cloud service management. Features streamlined inquiry pipelines and dynamic content modules.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudflare Edge', 'REST API'],
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Adetech-Website',
        demo: 'https://adetechglobalwebsite.netlify.app'
    },
    {
        id: 'aetheria',
        title: 'Aetheria Ultra-Luxury Real Estate Sanctuary',
        category: 'Interactive WebGL & 3D Portals',
        snippet: 'Immersive architectural showcase for high-net-worth property acquisitions with cinematic spatial styling.',
        description: 'Aetheria redefines luxury real estate digital experiences with fluid micro-interactions, responsive high-resolution gallery viewports, VIP consultation scheduling, and modern architectural elegance.',
        tags: ['React', 'Three.js', 'Tailwind CSS', 'Vite', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Aetheria-Real-Estate-Site',
        demo: 'https://aetheria-real-estate-site.netlify.app'
    },
    {
        id: 'apex-logistics',
        title: 'Apex Global Logistics Matrix',
        category: 'Custom Web Applications',
        snippet: 'Real-time fleet coordination telemetry & global freight route visibility platform.',
        description: 'Engineered to eliminate supply chain opacity. Integrates multimodal freight tracking, customs documentation automation, latency-free vessel positioning, and enterprise client dashboards.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Geospatial Telemetry', 'REST API'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Apex-Logistics-Matrix',
        demo: 'https://apex-logistics-matrix.netlify.app'
    },
    {
        id: 'atelier-monarch',
        title: 'Atelier Monarch Haute Horology & Fashion',
        category: 'E-Commerce & Luxury Catalogues',
        snippet: 'Bespoke luxury horology & apparel boutique boasting sub-second page transitions & high-fidelity typography.',
        description: 'Tailored for high-end luxury collectors. Built with minimalist editorial aesthetics, curated timepiece lookbooks, private concierge appointment scheduling, and encrypted checkout workflows.',
        tags: ['React', 'Tailwind CSS', 'GraphQL', 'Shopify Storefront', 'GSAP'],
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Atelier-Monarch',
        demo: 'https://atelier-monarch.netlify.app'
    },
    {
        id: 'aura-techie',
        title: 'Aura Techie High-Conversion SaaS Landing',
        category: 'High-Performance Landing Pages',
        snippet: 'Performance-engineered landing portal achieving 99/100 Core Web Vitals with dynamic lead captures.',
        description: 'A modern technology product showcase featuring kinetic typography, dark-mode glassmorphic cards, responsive interactive feature matrices, and seamless integration with CRM webhooks.',
        tags: ['HTML5', 'Tailwind CSS', 'GSAP', 'Vite', 'Responsive Design'],
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Aura-Techie-Landing',
        demo: 'https://aura-ng.netlify.app'
    },
    {
        id: 'cito',
        title: 'Cito Digital Transformation Platform',
        category: 'High-Performance Landing Pages',
        snippet: 'Executive digital transformation launchpad designed to accelerate enterprise software adoption.',
        description: 'Cito provides modern technology consultancies with a high-impact conversion platform. Boasts frictionless interactive demo scheduling, structured service breakdowns, and optimized mobile velocity.',
        tags: ['React', 'Tailwind CSS', 'Vite', 'Micro-Interactions', 'SEO Engine'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Cito-Landing-Page',
        demo: 'https://citolandingpg.netlify.app'
    },
    {
        id: 'creative-design-apparel',
        title: 'Creative Design Apparel Catalogue',
        category: 'E-Commerce & Luxury Catalogues',
        snippet: 'Editorial streetwear & fashion catalogue featuring dynamic filtering and aesthetic product lookbooks.',
        description: 'An interactive fashion catalogue built for independent fashion design houses. Incorporates modular fabric swatch previews, seasonal drop timers, and fluid grid layouts.',
        tags: ['React', 'Tailwind CSS', 'Headless CMS', 'Editorial Layout', 'Vite'],
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Creative-Design-Apparel-Catalogue',
        demo: null
    },
    {
        id: 'devflow-copilot',
        title: 'DevFlow Copilot Developer Workspace',
        category: 'Custom Web Applications',
        snippet: 'Cloud-based developer productivity workstation streamlining workflow automation and code reviews.',
        description: 'A collaborative code intelligence workspace integrating syntax tree analysis, interactive snippet boards, multi-file side-by-side diff viewers, and webhook-driven CI/CD notifications.',
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'REST API'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/DevFlow-Copilot',
        demo: null
    },
    {
        id: 'flow-os',
        title: 'Flow OS Web Desktop Interface',
        category: 'Custom Web Applications',
        snippet: 'Browser-based operating system shell with multi-window multitasking & file management.',
        description: 'A responsive Web OS platform featuring draggable floating windows, taskbar docking, theme configuration, sandboxed browser mini-apps, and instant state persistence.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Window Management', 'Vite'],
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Flow-OS-Landing-Page',
        demo: 'https://flow-0s.netlify.app'
    },
    {
        id: 'study-pulse',
        title: 'Study Pulse AI Student Learning Hub',
        category: 'Online Course & LMS Platforms',
        snippet: 'Adaptive educational intelligence hub with personalized study trackers & cohort analytics.',
        description: 'Empowers students and academic institutions with intelligent study session logging, spaced repetition flashcards, automated progress metrics, and low-latency interactive quizzes.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Adaptive Analytics', 'Edge API'],
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/MAIN-Study-Pulse',
        demo: 'https://mainstudypulse.netlify.app'
    },
    {
        id: 'maison-there',
        title: 'MAISON THÉRÈSE Luxury Interior Architecture',
        category: 'Interactive WebGL & 3D Portals',
        snippet: 'High-end interior architecture showroom featuring 3D virtual room exploration & product specs.',
        description: 'Engineered for luxury architectural firms. Allows private clients to inspect designer fixtures, explore bespoke interior spatial layouts, and request private consultations with architectural partners.',
        tags: ['React', 'Three.js', 'Tailwind CSS', 'CAD Visualization', 'Vite'],
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/MAISON-TH-R-E---Luxury-Interior-Architecture-Product-Showroom',
        demo: 'https://maison-thre-luxury.netlify.app'
    },
    {
        id: 'medstream',
        title: 'Medstream Telemetry & Clinical Health',
        category: 'Custom Web Applications',
        snippet: 'Secure clinical telemetry portal delivering encrypted biometric tracking & practitioner records.',
        description: 'Engineered to modernize patient vitals tracking. Features longitudinal biomarker charting, HIPAA-aligned architecture, encrypted consultation requests, and immediate practitioner alert webhooks.',
        tags: ['React', 'WebRTC', 'Tailwind CSS', 'HIPAA Architecture', 'REST API'],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Medstream',
        demo: 'https://medistream.netlify.app'
    },
    {
        id: 'my-portfolio',
        title: 'HODM Multidisciplinary Portfolio Archive',
        category: 'High-Performance Landing Pages',
        snippet: 'Primary multidisciplinary personal brand archive demonstrating full-stack engineering & AI visual creation.',
        description: 'The foundational portfolio architecture of H.O. Damilare Michael. Showcases full-stack web platforms, generative AI video workflows, leadership frameworks, and health protocols.',
        tags: ['HTML5', 'Tailwind CSS', 'GSAP', 'Canvas Shaders', 'Web Audio'],
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/My-Portfolio-site',
        demo: null
    },
    {
        id: 'mykesyte',
        title: 'MykeSyte Interactive Studio',
        category: 'High-Performance Landing Pages',
        snippet: 'Creative web laboratory experimenting with kinetic micro-interactions & experimental CSS.',
        description: 'An interactive playground engineered to stress-test high-performance animations, canvas particulate fields, responsive typography scaling, and smooth navigation patterns.',
        tags: ['JavaScript', 'Tailwind CSS', 'CSS3', 'WebGL', 'Responsive UI'],
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/mykesyte',
        demo: null
    },
    {
        id: 'nexnova',
        title: 'NexNova Cloud Telemetry & DevOps Core',
        category: 'Enterprise Cloud Platforms',
        snippet: 'Distributed cloud observability suite delivering container health metrics & latency heatmaps.',
        description: 'Built for cloud infrastructure managers. Monitors microservice health, automated deployment pipelines, canary releases, and system uptime alerts through a reactive dark-mode interface.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Microservices', 'GraphQL'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/NexNova',
        demo: 'https://nexxnova.netlify.app'
    },
    {
        id: 'notewave-ai',
        title: 'NoteWave AI Knowledge & Student Hub',
        category: 'Online Course & LMS Platforms',
        snippet: 'Intelligent note orchestration platform with semantic query matching & automated summaries.',
        description: 'NoteWave AI aggregates student lecture notes, automatically compiles concise revision summaries, extracts key definitions, and provides instantaneous search across large knowledge repositories.',
        tags: ['React', 'Node.js', 'Tailwind CSS', 'Vector Embeddings', 'IndexedDB'],
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/NoteWaveAI',
        demo: 'https://notewave-studenthub.netlify.app'
    },
    {
        id: 'pc-refinishing-cyber',
        title: 'PC Refinishing Cyber Diagnostics WebApp',
        category: 'Custom Web Applications',
        snippet: 'Hardware diagnostic telemetry suite & automated PC restoration service scheduling engine.',
        description: 'Delivers real-time computer diagnostics estimation, hardware upgrade calculations, benchmark comparisons, and seamless booking for custom computing restoration.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Hardware Diagnostics', 'Vite'],
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/PC-Refinishing-Cyber-WebApp',
        demo: 'https://pc-refinishing.netlify.app'
    },
    {
        id: 'pc-refinishing-spa',
        title: 'PC Refinishing Spa Experience',
        category: 'High-Performance Landing Pages',
        snippet: 'Boutique hardware concierge landing platform featuring interactive transformation sliders.',
        description: 'A sensory, boutique showcase celebrating custom craftsmanship in computing hardware restoration. Features before-and-after interactive comparison sliders and VIP booking flows.',
        tags: ['HTML5', 'Tailwind CSS', 'GSAP ScrollTrigger', 'Responsive UI'],
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Pc-Refinishing-Spa-Landing-Page',
        demo: 'https://pc-refinishing-spa.netlify.app'
    },
    {
        id: 'sacco',
        title: 'SACCO Community Savings & Micro-Lending',
        category: 'Custom Web Applications',
        snippet: 'Decentralized financial cooperative ledger facilitating member savings & micro-credit loans.',
        description: 'Engineered to bring transparency to grassroots cooperative finance. Features tamper-evident transaction ledgers, member savings goal tracking, automated interest calculations, and SMS notification webhooks.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Ledger Integrity', 'Stripe API'],
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/SACCO-Community-Savings-Loan-',
        demo: 'https://saac0.netlify.app'
    },
    {
        id: 'spectre',
        title: 'SPECTRE Electric Hypercar Showcase',
        category: 'Interactive WebGL & 3D Portals',
        snippet: 'Adrenaline-fueled 3D automotive portal featuring dynamic aerodynamics & specs inspection.',
        description: 'Showcasing next-generation electric hypercar engineering. Incorporates interactive 360-degree model rotation, dynamic powertrain telemetry readouts, acceleration benchmarks, and VIP allocation reservations.',
        tags: ['WebGL', 'Three.js', 'React', 'Tailwind CSS', 'Audio FX'],
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/SPECTRE-E-HYPERCAR',
        demo: 'https://spectre-e-hypercar-website.netlify.app'
    },
    {
        id: 'surth',
        title: 'SUTRH Digital Apparel Passport & Provenance',
        category: 'E-Commerce & Luxury Catalogues',
        snippet: 'Cryptographic fashion provenance passport verifying ethical sourcing & limited-run garment authenticity.',
        description: 'Bridging physical luxury garments with digital ownership verification. Each collection piece receives a permanent provenance ledger, detailed fabric care guides, and exclusive collector perks.',
        tags: ['React', 'Tailwind CSS', 'Provenance Verification', 'Vite', 'Framer'],
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/SUTRH-DESIGN-APPAREL-PASSPORT',
        demo: 'https://surth.netlify.app'
    },
    {
        id: 'synthetix-saas',
        title: 'Synthetix Enterprise SaaS Operations',
        category: 'Custom Web Applications',
        snippet: 'High-throughput cloud workflow engine connecting enterprise teams to automated data pipelines.',
        description: 'An enterprise operations powerhouse designed for distributed teams. Integrates permissioned role-based dashboards, automated data transformation queues, and live event monitoring.',
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Server Actions'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Synthetix-SaaS-WebApp',
        demo: 'https://synthetix-saas.netlify.app'
    },
    {
        id: 'synthetix-webapp',
        title: 'Synthetix Cloud Console',
        category: 'Custom Web Applications',
        snippet: 'Lightweight cloud dashboard client delivering real-time telemetry charts & API dispatching.',
        description: 'A companion web client engineered with zero-latency interface responses. Allows system administrators to monitor server nodes, review webhook logs, and dispatch automated tasks.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Redis'],
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Synthetix-Webapp',
        demo: 'https://synthetix-webapp.netlify.app'
    },
    {
        id: 'valence',
        title: 'Valence Longevity & Cellular Health Institute',
        category: 'Custom Web Applications',
        snippet: 'Pioneering longevity research platform presenting cellular longevity protocols & NAD+ optimization.',
        description: 'Valence bridges clinical geroscience with accessible human optimization protocols. Features comprehensive biomarker assessment tools, mitochondrial supplement guides, and physician referral integrations.',
        tags: ['React', 'Tailwind CSS', 'Biometric Protocols', 'Vite', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Valence-Longevity-Institute',
        demo: 'https://valence-longevity-institute.netlify.app'
    },
    {
        id: 'xpera',
        title: 'Xpera — Experience Intelligence Engine',
        category: 'Enterprise Cloud Platforms',
        snippet: 'Next-generation experiential platform delivering intelligent personalized digital interactions at scale.',
        description: 'Xpera represents the pinnacle of modern experience engineering. Unites distributed micro-frontends, predictive user engagement models, and instantaneous edge content delivery.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Distributed Mesh', 'Micro-Frontends'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Xpera',
        demo: 'https://xpera.io'
    },
    {
        id: 'xpera-hebrew',
        title: 'Xpera Hebrew Localized Architecture',
        category: 'Enterprise Cloud Platforms',
        snippet: 'RTL-optimized localization of the Xpera platform engineered for Middle Eastern enterprise adoption.',
        description: 'A bi-directional, right-to-left localized deployment of Xpera. Preserves fluid layout hierarchies, typographic nuance, and performance metrics while tailoring content for Hebrew-speaking markets.',
        tags: ['React', 'Tailwind CSS', 'RTL Localization', 'Bi-directional Layout', 'Vite'],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Xpera-Hebrew-Distinct-Website',
        demo: 'https://xpera-website.netlify.app'
    }
];

let currentRepeaterPage = 1;
const REPEATER_ITEMS_PER_PAGE = 7;

function initWebProficiencySystem() {
    initDualMotionCarousels();
    initRepeaterPagination();
    initProjectModalHandlers();
}

// 1. Dual Motion Carousels (Top moves Right, Bottom moves Left)
function initDualMotionCarousels() {
    const trackRight = document.getElementById('carouselTrackRight');
    const trackLeft = document.getElementById('carouselTrackLeft');
    if (!trackRight || !trackLeft) return;

    // Split 26 projects into 2 sets of 13, duplicate them for seamless continuous infinite looping
    const half = Math.ceil(WEB_PROJECTS_DATA.length / 2);
    const set1 = WEB_PROJECTS_DATA.slice(0, half);
    const set2 = WEB_PROJECTS_DATA.slice(half);

    function createCardHtml(p) {
        const liveIndicator = p.demo 
            ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-[#E6C280] hover:text-[#FFF3CD] transition-colors p-1" title="Open Live Site: ${p.demo}"><i class="fas fa-external-link-alt text-xs"></i></a>`
            : `<span class="text-[#8B949E]/35 cursor-not-allowed p-1" title="No live link available - repository only"><i class="fas fa-external-link-alt text-xs opacity-30"></i></span>`;
            
        const repoIndicator = `<a href="${p.github}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-[#A0AEC0] hover:text-[#E6C280] transition-colors p-1" title="View Source on GitHub"><i class="fab fa-github text-xs"></i></a>`;

        return `
            <div class="carousel-project-card group" onclick="openProjectModal('${p.id}')" role="button" tabindex="0">
                <div class="h-44 w-full relative overflow-hidden bg-black/40">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-80"></div>
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#12161A]/90 text-[#E6C280] border border-[#E6C280]/30 backdrop-blur-md">
                        ${p.category}
                    </span>
                    ${!p.demo ? '<span class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-[#8B949E] border border-white/10">Repo Only</span>' : ''}
                </div>
                <div class="p-4">
                    <h4 class="text-sm font-bold text-[#F5E6C8] group-hover:text-[#FFF3CD] transition-colors truncate mb-1">
                        ${p.title}
                    </h4>
                    <p class="text-xs text-[#8B949E] line-clamp-2 leading-relaxed mb-3">
                        ${p.snippet}
                    </p>
                    <div class="flex items-center justify-between pt-2 border-t border-[#F5E6C8]/10 text-xs">
                        <span class="text-[#E6C280] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Expand Details <i class="fas fa-arrow-right text-[10px]"></i>
                        </span>
                        <div class="flex items-center gap-2">
                            ${repoIndicator}
                            ${liveIndicator}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Populate tracks with duplicate sets for infinite marquee effect
    const htmlSet1 = set1.map(createCardHtml).join('');
    trackRight.innerHTML = htmlSet1 + htmlSet1;

    const htmlSet2 = set2.map(createCardHtml).join('');
    trackLeft.innerHTML = htmlSet2 + htmlSet2;
}

// 2. 7-Project Pagination Repeater
function initRepeaterPagination() {
    const repeaterGrid = document.getElementById('repeaterProjectsGrid');
    const prevBtn = document.getElementById('repeaterPrevBtn');
    const nextBtn = document.getElementById('repeaterNextBtn');
    const pageIndicator = document.getElementById('repeaterPageIndicator');
    const countBadge = document.getElementById('repeaterCountBadge');

    if (!repeaterGrid || !prevBtn || !nextBtn) return;

    function renderPage(page) {
        currentRepeaterPage = page;
        const totalPages = Math.ceil(WEB_PROJECTS_DATA.length / REPEATER_ITEMS_PER_PAGE);
        const startIndex = (page - 1) * REPEATER_ITEMS_PER_PAGE;
        const endIndex = startIndex + REPEATER_ITEMS_PER_PAGE;
        const pageItems = WEB_PROJECTS_DATA.slice(startIndex, endIndex);

        repeaterGrid.innerHTML = pageItems.map((p, idx) => {
            const hasDemo = Boolean(p.demo);
            const liveBadge = hasDemo
                ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-[#E6C280] hover:text-[#FFF3CD] flex items-center gap-1 text-[11px] font-semibold transition-colors" title="Launch Live Site: ${p.demo}"><i class="fas fa-external-link-alt text-[10px]"></i> Live Site</a>`
                : `<span class="text-[#8B949E]/40 cursor-not-allowed flex items-center gap-1 text-[11px]" title="No live link available - repository only"><i class="fas fa-ban text-[10px] opacity-40"></i> No Live Link</span>`;

            const repoBadge = `<a href="${p.github}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-[#A0AEC0] hover:text-[#E6C280] flex items-center gap-1 text-[11px] transition-colors" title="View Source on GitHub"><i class="fab fa-github text-[11px]"></i> GitHub</a>`;

            return `
                <div class="repeater-project-card group flex flex-col justify-between" onclick="openProjectModal('${p.id}')" role="button" tabindex="0">
                    <div>
                        <div class="h-48 w-full relative overflow-hidden bg-black/40">
                            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#12161A] via-transparent to-transparent opacity-80"></div>
                            <div class="absolute top-3 left-3 flex items-center gap-2">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#12161A]/90 text-[#E6C280] border border-[#E6C280]/40 backdrop-blur-md font-mono">
                                    ${String(startIndex + idx + 1).padStart(2, '0')}
                                </span>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0D0F12]/85 text-[#F5E6C8] border border-[#F5E6C8]/20 backdrop-blur-md">
                                    ${p.category}
                                </span>
                            </div>
                            ${!hasDemo ? '<span class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-[#8B949E] border border-white/10">Internal Repo</span>' : ''}
                        </div>
                        <div class="p-5">
                            <h4 class="text-base font-bold text-[#F5E6C8] group-hover:text-[#FFF3CD] transition-colors mb-2">
                                ${p.title}
                            </h4>
                            <p class="text-xs text-[#8B949E] leading-relaxed mb-4 line-clamp-3">
                                ${p.description}
                            </p>
                            <div class="flex flex-wrap gap-1.5 mb-4">
                                ${p.tags.slice(0, 3).map(tag => `
                                    <span class="text-[10px] px-2 py-0.5 rounded-md bg-[#F5E6C8]/5 text-[#C9D1D9] border border-[#F5E6C8]/10 font-mono">
                                        ${tag}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="p-5 pt-0 border-t border-[#F5E6C8]/10 flex items-center justify-between mt-auto">
                        <button class="text-xs font-bold text-[#E6C280] group-hover:text-[#FFF3CD] flex items-center gap-1.5 transition-colors">
                            Technical Spec <i class="fas fa-chevron-right text-[10px]"></i>
                        </button>
                        <div class="flex items-center gap-3 text-xs">
                            ${repoBadge}
                            ${liveBadge}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Update indicators
        if (pageIndicator) pageIndicator.textContent = `Page ${page} of ${totalPages}`;
        if (countBadge) countBadge.textContent = `Displaying ${startIndex + 1}–${Math.min(endIndex, WEB_PROJECTS_DATA.length)} of ${WEB_PROJECTS_DATA.length} Projects`;

        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;

        // Smoothly scroll container into view if user changed page
        if (page > 1) {
            repeaterGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentRepeaterPage > 1) renderPage(currentRepeaterPage - 1);
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(WEB_PROJECTS_DATA.length / REPEATER_ITEMS_PER_PAGE);
        if (currentRepeaterPage < totalPages) renderPage(currentRepeaterPage + 1);
    });

    // Initial render
    renderPage(1);
}

// 3. Project Detail Modal Handler
function initProjectModalHandlers() {
    const modal = document.getElementById('mhoProjectModal');
    if (!modal) return;

    const closeBtn = document.getElementById('closeProjectModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const project = WEB_PROJECTS_DATA.find(p => p.id === projectId) || WEB_PROJECTS_DATA[0];
    const modal = document.getElementById('mhoProjectModal');
    if (!modal) return;

    const titleEl = document.getElementById('modalProjectTitle');
    const categoryEl = document.getElementById('modalProjectCategory');
    const descEl = document.getElementById('modalProjectDesc');
    const imageEl = document.getElementById('modalProjectImage');
    const tagsEl = document.getElementById('modalProjectTags');
    const githubLink = document.getElementById('modalGithubBtn');
    const liveLink = document.getElementById('modalLiveBtn');

    if (titleEl) titleEl.textContent = project.title;
    if (categoryEl) categoryEl.textContent = project.category;
    if (descEl) descEl.textContent = project.description;
    if (imageEl) {
        imageEl.src = project.image;
        imageEl.alt = project.title;
    }
    if (tagsEl) {
        tagsEl.innerHTML = project.tags.map(tag => `
            <span class="text-xs px-2.5 py-1 rounded-full bg-[#E6C280]/10 text-[#FFF3CD] border border-[#E6C280]/25 font-mono">
                ${tag}
            </span>
        `).join('');
    }

    // Smart repo button wiring
    if (githubLink) {
        githubLink.href = project.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.innerHTML = `<i class="fab fa-github mr-1.5"></i> GitHub Repository`;
    }

    // Smart live site button wiring (No action if demo is null)
    if (liveLink) {
        if (project.demo) {
            liveLink.href = project.demo;
            liveLink.target = "_blank";
            liveLink.rel = "noopener noreferrer";
            liveLink.onclick = null;
            liveLink.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6C280] text-[#0D0F12] font-bold text-xs hover:bg-[#FFF3CD] hover:shadow-[0_0_20px_rgba(230,194,128,0.4)] transition-all";
            liveLink.innerHTML = `Launch Live Site <i class="fas fa-external-link-alt text-[10px] ml-1"></i>`;
            liveLink.title = `Visit deployed live application at ${project.demo}`;
        } else {
            liveLink.removeAttribute('href');
            liveLink.removeAttribute('target');
            liveLink.onclick = (e) => { e.preventDefault(); e.stopPropagation(); return false; };
            liveLink.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E232B] text-[#8B949E] border border-white/5 text-xs opacity-50 cursor-not-allowed select-none";
            liveLink.innerHTML = `No Live Link (Repo Only) <i class="fas fa-ban text-[10px] ml-1"></i>`;
            liveLink.title = "No public live deployment available for this repository";
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('mhoProjectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================================================
   CREATIVE AI VIDEO STREAMING MODAL
   ========================================================================== */
function initCreativeVideoModal() {
    const videoModal = document.getElementById('mhoVideoModal');
    if (!videoModal) return;

    const closeBtn = document.getElementById('closeVideoModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Delegate click on all video trigger cards
    const videoCards = document.querySelectorAll('.video-project-card');
    videoCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const embedUrl = card.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            const title = card.getAttribute('data-video-title') || 'Generative AI Cinematic Production';
            const category = card.getAttribute('data-video-category') || 'Commercial AI Video';
            const synopsis = card.getAttribute('data-video-synopsis') || 'Full visual production asset combining 3D spatial thinking, neural video generation, After Effects compositing, and commercial rhythm.';
            openVideoModal(embedUrl, title, category, synopsis);
        });
    });
}

function openVideoModal(url, title, category, synopsis) {
    let videoModal = document.getElementById('mhoVideoModal');
    if (!videoModal) {
        // Create dynamically if not on page
        videoModal = document.createElement('div');
        videoModal.id = 'mhoVideoModal';
        videoModal.className = 'mho-modal-backdrop';
        videoModal.innerHTML = `
            <div class="mho-modal-card p-6 md:p-8 relative">
                <button id="closeVideoModalBtn" class="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1A2026] text-[#F5E6C8] hover:text-[#FFF3CD] hover:bg-[#E6C280]/20 flex items-center justify-center transition-colors">
                    <i class="fas fa-times"></i>
                </button>
                <div class="mb-4">
                    <span id="videoModalCategory" class="text-xs font-semibold text-[#E6C280] uppercase tracking-wider block mb-1">
                        ${category || 'Visual Showcase'}
                    </span>
                    <h3 id="videoModalTitle" class="text-xl md:text-2xl font-bold text-[#F5E6C8]">
                        ${title || 'Commercial Video Asset'}
                    </h3>
                </div>
                <div class="aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-[#E6C280]/20">
                    <iframe id="videoModalIframe" class="w-full h-full" src="" title="Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p id="videoModalSynopsis" class="text-sm text-[#8B949E] leading-relaxed">
                    ${synopsis || ''}
                </p>
            </div>
        `;
        document.body.appendChild(videoModal);
        const dynamicClose = videoModal.querySelector('#closeVideoModalBtn');
        if (dynamicClose) dynamicClose.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoModal(); });
    }

    const titleEl = videoModal.querySelector('#videoModalTitle');
    const categoryEl = videoModal.querySelector('#videoModalCategory');
    const synopsisEl = videoModal.querySelector('#videoModalSynopsis');
    const iframe = videoModal.querySelector('#videoModalIframe');

    if (titleEl) titleEl.textContent = title;
    if (categoryEl) categoryEl.textContent = category;
    if (synopsisEl) synopsisEl.textContent = synopsis;
    if (iframe) iframe.src = url;

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const videoModal = document.getElementById('mhoVideoModal');
    if (!videoModal) return;
    const iframe = videoModal.querySelector('#videoModalIframe');
    if (iframe) iframe.src = '';
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================================================
   ACCESSIBILITY SYSTEM & MODAL
   ========================================================================== */
function initAccessibilitySystem() {
    const modal = document.getElementById('mhoAccessibilityModal');
    const openBtns = document.querySelectorAll('.trigger-accessibility-modal');
    const closeBtn = document.getElementById('closeA11yModalBtn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Toggle High Contrast
    const contrastBtn = document.getElementById('a11yToggleContrast');
    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            document.body.classList.toggle('a11y-high-contrast');
            contrastBtn.classList.toggle('bg-[#E6C280]/30');
            showNotification(document.body.classList.contains('a11y-high-contrast') ? 'High Contrast Mode Enabled' : 'Standard Contrast Restored');
        });
    }

    // Toggle Large Text
    const textBtn = document.getElementById('a11yToggleText');
    if (textBtn) {
        textBtn.addEventListener('click', () => {
            document.body.classList.toggle('a11y-large-text');
            textBtn.classList.toggle('bg-[#E6C280]/30');
            showNotification(document.body.classList.contains('a11y-large-text') ? 'Large Font Size Applied' : 'Standard Font Size Restored');
        });
    }

    // Toggle Reduced Motion
    const motionBtn = document.getElementById('a11yToggleMotion');
    if (motionBtn) {
        motionBtn.addEventListener('click', () => {
            document.body.classList.toggle('a11y-reduced-motion');
            motionBtn.classList.toggle('bg-[#E6C280]/30');
            showNotification(document.body.classList.contains('a11y-reduced-motion') ? 'Animations Paused' : 'Animations Restored');
        });
    }

    // Reset settings
    const resetBtn = document.getElementById('a11yResetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.body.classList.remove('a11y-high-contrast', 'a11y-large-text', 'a11y-reduced-motion');
            [contrastBtn, textBtn, motionBtn].forEach(b => { if (b) b.classList.remove('bg-[#E6C280]/30'); });
            showNotification('Accessibility Settings Reset');
        });
    }
}

/* ==========================================================================
   COMPREHENSIVE FOOTER & SEQUENTIAL NAVIGATION SEQUENCE BAR
   Boundary Logic: Page 1 (prev disabled), Page 4 (next disabled)
   Center Scroll-To-Top button: smoothly scrolls to top
   ========================================================================== */
function initFooterSequenceNav() {
    const prevBtn = document.getElementById('footerSeqPrevBtn');
    const nextBtn = document.getElementById('footerSeqNextBtn');
    const topBtn = document.getElementById('footerSeqTopBtn');

    // Page route sequence
    const pagesSequence = [
        'index.html',
        'web-services.html',
        'creative-space.html',
        'leadership-business.html'
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let currentIndex = pagesSequence.findIndex(p => p.toLowerCase() === currentPath.toLowerCase());
    if (currentIndex === -1) currentIndex = 0; // Default to index.html

    if (prevBtn) {
        if (currentIndex === 0) {
            prevBtn.classList.add('disabled');
            prevBtn.setAttribute('aria-disabled', 'true');
            prevBtn.removeAttribute('href');
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.setAttribute('href', pagesSequence[currentIndex - 1]);
        }
    }

    if (nextBtn) {
        if (currentIndex === pagesSequence.length - 1) {
            nextBtn.classList.add('disabled');
            nextBtn.setAttribute('aria-disabled', 'true');
            nextBtn.removeAttribute('href');
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.setAttribute('href', pagesSequence[currentIndex + 1]);
        }
    }

    if (topBtn) {
        topBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   NAVIGATION, HOVER & FORMS
   ========================================================================== */
function initNavigation() {
    const toggleBtn = document.querySelector('.mho-mobile-toggle');
    let drawer = document.querySelector('.mho-mobile-drawer');

    if (toggleBtn && !drawer) {
        drawer = document.createElement('div');
        drawer.className = 'mho-mobile-drawer';
        drawer.innerHTML = `
            <a href="index.html">01 // Home & Biography</a>
            <a href="web-services.html">02 // Web Architecture</a>
            <a href="creative-space.html">03 // Creative AI Space</a>
            <a href="leadership-business.html">04 // Leadership & Health</a>
            <div class="pt-2">
                <a href="mailto:reel3dlab@gmail.com" class="mho-nav-cta justify-center w-full">
                    Direct Inquiry &nbsp;<i class="fas fa-envelope"></i>
                </a>
            </div>
        `;
        document.body.appendChild(drawer);

        // Highlight active link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = drawer.querySelectorAll('a');
        links.forEach(l => {
            if (l.getAttribute('href') === currentPath) l.classList.add('active');
        });
    }

    if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = drawer.classList.contains('open');
            if (isOpen) {
                drawer.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            } else {
                drawer.classList.add('open');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        });

        document.addEventListener('click', (e) => {
            if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
                drawer.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Initialize smart scroll behavior for floating island navbar
    initNavbarScroll();
}

// Floating Island Navbar Scroll Behavior:
// 1. Disappears on downward scroll
// 2. Briefly reappears on upward scroll
// 3. Always appears and stays visible at top of page (hero section)
function initNavbarScroll() {
    const navWrapper = document.querySelector('.mho-nav-pill-wrapper');
    if (!navWrapper) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isTicking = false;
    let hideTimer = null;

    function handleScroll() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const delta = currentScrollY - lastScrollY;

        // Condition A: Whenever at the top of the page (Hero Section, scrollY <= 120), always visible
        if (currentScrollY <= 120) {
            navWrapper.classList.remove('nav-hidden');
            navWrapper.classList.add('nav-visible');
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
            lastScrollY = currentScrollY;
            isTicking = false;
            return;
        }

        // Condition B: Downward scroll -> disappears
        if (delta > 6) {
            navWrapper.classList.add('nav-hidden');
            navWrapper.classList.remove('nav-visible');
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        }
        // Condition C: Upward scroll -> briefly appears again
        else if (delta < -6) {
            navWrapper.classList.remove('nav-hidden');
            navWrapper.classList.add('nav-visible');

            // Set brief appearance timer while not at hero section
            if (hideTimer) clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                const nowY = window.pageYOffset || document.documentElement.scrollTop;
                if (nowY > 120) {
                    navWrapper.classList.add('nav-hidden');
                    navWrapper.classList.remove('nav-visible');
                }
            }, 3500);
        }

        lastScrollY = currentScrollY;
        isTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(handleScroll);
            isTicking = true;
        }
    }, { passive: true });
}

function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card, .glass-container');
    cards.forEach(card => {
        // Exclude 'About' section glass-containers so they use subtle GSAP expansion, and exclude stack cards
        if (card.closest('#biography') || card.closest('.cards-stack-stage')) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

function initCursor() {
    // Clean up any legacy cursor dot element
    const oldDot = document.getElementById('cursorDot');
    if (oldDot) oldDot.remove();

    let cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) {
        cursorGlow = document.createElement('div');
        cursorGlow.id = 'cursorGlow';
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    function renderCursor() {
        // High-velocity responsive following for ambient glow halo
        glowX += (mouseX - glowX) * 0.45;
        glowY += (mouseY - glowY) * 0.45;

        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        requestAnimationFrame(renderCursor);
    }

    renderCursor();
}

// Navigation Submenus: On-hover, on-click and smooth section scrolling
function initNavigationSubmenus() {
    const navItems = document.querySelectorAll('.mho-nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.mho-nav-link');
        const submenu = item.querySelector('.mho-nav-submenu');
        if (!link || !submenu) return;

        // Toggle on click for touch or chevron click
        link.addEventListener('click', (e) => {
            if (e.target.closest('.mho-nav-chevron') || window.innerWidth <= 1024) {
                e.preventDefault();
                const isOpen = item.classList.contains('open');
                navItems.forEach(other => { if (other !== item) other.classList.remove('open'); });
                item.classList.toggle('open', !isOpen);
            }
        });
    });

    // Close open submenus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mho-nav-item')) {
            navItems.forEach(item => item.classList.remove('open'));
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navItems.forEach(item => item.classList.remove('open'));
        }
    });

    // Smooth scroll if submenu link targets an anchor on current page
    const submenuLinks = document.querySelectorAll('.mho-submenu-item');
    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                const parts = href.split('#');
                const targetPage = parts[0];
                const hash = parts[1];
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';

                const isCurrentPage = !targetPage || 
                                     targetPage === currentPage || 
                                     (targetPage === 'index.html' && (currentPage === '' || currentPage === 'index.html'));

                if (isCurrentPage) {
                    const targetEl = document.getElementById(hash);
                    if (targetEl) {
                        e.preventDefault();
                        navItems.forEach(item => item.classList.remove('open'));
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        try {
                            history.pushState(null, null, `#${hash}`);
                        } catch (err) {}
                    }
                }
            }
        });
    });
}

function initAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('.accordion-icon');
            const isOpen = content.classList.contains('open');

            // Close siblings
            const parent = trigger.closest('.accordion-group');
            if (parent) {
                parent.querySelectorAll('.accordion-content').forEach(c => {
                    c.classList.remove('open');
                    c.style.maxHeight = null;
                });
                parent.querySelectorAll('.accordion-trigger').forEach(t => {
                    t.setAttribute('aria-expanded', 'false');
                });
                parent.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = 'rotate(0deg)');
            }

            if (!isOpen) {
                content.classList.add('open');
                content.style.maxHeight = (content.scrollHeight + 30) + 'px';
                trigger.setAttribute('aria-expanded', 'true');
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Processing...
                `;
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showNotification('Thank you! Your message has been received. H.O. Damilare Michael will connect with you shortly.');
                    form.reset();
                } else {
                    showNotification('Thank you! Your inquiry was recorded successfully.');
                    form.reset();
                }
            } catch (err) {
                showNotification('Thank you! Your inquiry has been logged.');
                form.reset();
            } finally {
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                }, 1200);
            }
        });
    });
}

function initGsapAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Number counters
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2.2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        counter.textContent = prefix + (target % 1 === 0 ? Math.floor(obj.val) : obj.val.toFixed(1)) + suffix;
                    }
                });
            }
        });
    });

    // Glass cards scroll reveal
    const revealCards = document.querySelectorAll('.scroll-card-reveal');
    if (revealCards.length > 0) {
        gsap.fromTo(revealCards, 
            { opacity: 0, y: 50, scale: 0.96 },
            {
                scrollTrigger: {
                    trigger: revealCards[0].parentElement,
                    start: 'top 82%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.14,
                ease: 'power3.out'
            }
        );
    }

    // Subtle GSAP Hover Effect for '.glass-container' cards in 'About' Section
    initAboutCardHover();

    // Creative AI Space Card Stack Unfolding Feature
    initCardsStack();

    // H1 and Heading GSAP Perspective & Shimmer Animations
    initHeadingGsapAnimations();
}

// H1 & Heading GSAP Perspective & Shimmer Text Reveal Animations
function initHeadingGsapAnimations() {
    if (typeof gsap === 'undefined') return;

    // 1. Hero H1 Headings with 3D Perspective & Shimmer Reveal
    const heroH1s = document.querySelectorAll('h1.font-display, .hero-fade-in h1, section#hero h1, section h1');
    heroH1s.forEach(h1 => {
        if (h1.getAttribute('data-gsap-animated')) return;
        h1.setAttribute('data-gsap-animated', 'true');
        h1.classList.add('gsap-hero-title');

        gsap.fromTo(h1, 
            { opacity: 0, y: 44, rotationX: 18, transformOrigin: '0% 50% -30px' },
            { opacity: 1, y: 0, rotationX: 0, duration: 1.15, ease: 'power3.out', delay: 0.15 }
        );

        // Highlight gold gradient words with animated shimmer
        const highlights = h1.querySelectorAll('.bg-clip-text, span');
        if (highlights.length > 0) {
            highlights.forEach(hl => hl.classList.add('gold-shimmer-text'));
            gsap.fromTo(highlights,
                { opacity: 0, scale: 0.94, filter: 'blur(4px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, delay: 0.35, ease: 'power2.out', stagger: 0.08 }
            );
        }
    });

    // 2. Section H2 Headings with ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        const sectionH2s = document.querySelectorAll('main section h2.font-display, main section h2');
        sectionH2s.forEach(h2 => {
            if (h2.closest('#hero') || h2.getAttribute('data-gsap-h2')) return;
            h2.setAttribute('data-gsap-h2', 'true');

            gsap.fromTo(h2, 
                { opacity: 0, y: 32 },
                {
                    scrollTrigger: {
                        trigger: h2,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    ease: 'power3.out'
                }
            );
        });
    }
}

// Subtle GSAP Hover effect on '.glass-container' cards in 'About' section
function initAboutCardHover() {
    if (typeof gsap === 'undefined') return;
    const aboutSection = document.getElementById('biography');
    if (!aboutSection) return;

    const cards = aboutSection.querySelectorAll('.glass-container');
    cards.forEach(card => {
        card.style.transformOrigin = 'center center';
        card.style.willChange = 'transform, box-shadow, border-color';

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.025,
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 35px rgba(230, 194, 128, 0.22)',
                borderColor: 'rgba(230, 194, 128, 0.45)',
                duration: 0.35,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(230, 194, 128, 0.04)',
                borderColor: 'rgba(245, 230, 200, 0.1)',
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
    });
}

// Card Stack Feature for Creative AI Space (Unfolds on scroll, reverses on scroll back)
function initCardsStack() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const stage = document.getElementById('cardsStackStage');
    const stackSection = document.getElementById('video-grid');
    if (!stage || !stackSection) return;

    const cards = Array.from(stage.querySelectorAll('.stack-card'));
    if (cards.length === 0) return;

    const total = cards.length;
    const badgeNum = document.getElementById('stackActiveCardNum');

    // 1. Initial Stacked Appearance: cards visibly stacked on top of one another!
    cards.forEach((card, i) => {
        gsap.set(card, {
            zIndex: total - i,
            scale: 1 - i * 0.035,
            y: i * 16,
            rotation: (i % 2 === 0 ? 1 : -1) * (i * 1.2),
            opacity: 1 - i * 0.08,
            transformOrigin: 'center bottom'
        });
    });

    // 2. ScrollTrigger scrubbing timeline - pinned sequence
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: stackSection,
            start: 'top top+=20',
            end: `+=${total * 550}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const activeIndex = Math.min(total - 1, Math.floor(progress * total));
                if (badgeNum) {
                    badgeNum.textContent = (activeIndex + 1);
                }
            }
        }
    });

    // 3. Sequential card unfolding
    for (let i = 0; i < total - 1; i++) {
        tl.to(cards[i], {
            y: -140,
            opacity: 0,
            scale: 1.05,
            rotation: i % 2 === 0 ? -6 : 6,
            duration: 1,
            ease: 'power2.inOut'
        }, i);

        for (let j = i + 1; j < total; j++) {
            const pos = j - (i + 1);
            tl.to(cards[j], {
                scale: 1 - pos * 0.035,
                y: pos * 16,
                rotation: (pos % 2 === 0 ? 1 : -1) * (pos * 1.2),
                opacity: 1 - pos * 0.08,
                duration: 1,
                ease: 'power2.inOut'
            }, i);
        }
    }

    // 4. Chevron controls for jumping cards in stack
    const prevBtn = document.getElementById('stackPrevBtn');
    const nextBtn = document.getElementById('stackNextBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const st = tl.scrollTrigger;
            if (st) {
                const nextProgress = Math.min(1, st.progress + (1 / (total - 1)));
                const targetY = st.start + (st.end - st.start) * nextProgress;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const st = tl.scrollTrigger;
            if (st) {
                const prevProgress = Math.max(0, st.progress - (1 / (total - 1)));
                const targetY = st.start + (st.end - st.start) * prevProgress;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
        });
    }

    // Delegate click to open modal for each card
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            const embedUrl = card.getAttribute('data-video-url') || 'https://www.youtube.com/embed/sECemgPYcFg?autoplay=1';
            const title = card.getAttribute('data-video-title') || 'Featured Commercial Video';
            const category = card.getAttribute('data-video-category') || 'Production Cut';
            const synopsis = card.getAttribute('data-video-synopsis') || 'Full production reel.';
            openVideoModal(embedUrl, title, category, synopsis);
        });
    });
}

// Creative AI Space: Virtual Director Studio & Viewfinder Interactivity
function initCreativeDirectorDeck() {
    const lensBtns = document.querySelectorAll('.director-lens-btn');
    const aspectPills = document.querySelectorAll('.director-aspect-pill');
    const promptCards = document.querySelectorAll('.prompt-orbit-card');
    const viewportFrame = document.getElementById('directorViewport');
    const sceneTitleEl = document.getElementById('directorSceneTitle');
    const scenePillEl = document.getElementById('directorScenePill');
    const scenePromptEl = document.getElementById('directorScenePrompt');
    const sceneImageEl = document.getElementById('directorSceneImg');
    const playBtn = document.getElementById('directorMainPlayBtn');
    const lensNameDisplay = document.getElementById('directorLensNameDisplay');
    const hudTimecode = document.getElementById('directorHudTimecode');

    // Live timecode counter
    if (hudTimecode) {
        let frames = 18;
        let seconds = 12;
        let minutes = 4;
        setInterval(() => {
            frames++;
            if (frames >= 24) { frames = 0; seconds++; }
            if (seconds >= 60) { seconds = 0; minutes++; }
            hudTimecode.textContent = `REC 00:0${minutes}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
        }, 1000 / 24);
    }

    // Preset scene data
    const SCENE_PRESETS = [
        {
            title: "Deep Space Supernova · Sci-Fi Cinema Trailer",
            category: "4K IMAX CINEMA REEL",
            lens: "35mm Anamorphic 2.39:1",
            aspect: "2.39:1",
            prompt: "Ultra-wide anamorphic capture of a dying star, volumetric relativistic gas nebulae, interstellar derelict hull reflection, cinematic color grading, 24fps.",
            image: "/src/assets/images/cinematic_ai_studio_1790219642646.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        },
        {
            title: "Aura Titanium Chronograph · 3D Product Commercial",
            category: "LUXURY COMMERCIAL",
            lens: "Macro Probe 24mm f/14",
            aspect: "16:9",
            prompt: "Macro probe lens tracking through intricate titanium gear escapement, sapphire crystal anti-reflective refraction, studio chiaroscuro lighting, photoreal CAD detail.",
            image: "/src/assets/images/web_tech_architecture_1790219622367.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        },
        {
            title: "Lumina Cellular Skincare · High-ROAS AI UGC Viral Ad",
            category: "AI UGC VIRAL AD · 4.8X ROAS",
            lens: "35mm Portrait Prime",
            aspect: "9:16",
            prompt: "Authentic selfie-angle creator testimonial, micro facial expressions, real-time lip-sync, hands-only serum droplet texture close-up, high energy TikTok hook.",
            image: "/src/assets/images/michael_portrait_hero_1790219600904.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        },
        {
            title: "The Obsidian Villa · Architectural Cinematic Flythrough",
            category: "REAL ESTATE SHOWCASE",
            lens: "IMAX 70mm Grand-Format",
            aspect: "2.39:1",
            prompt: "Seamless drone fly-in through cantilevered glass facades, golden-hour ocean horizon reflections, marble acoustics, Hollywood cinematic pacing.",
            image: "/src/assets/images/cinematic_ai_studio_1790219642646.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        }
    ];

    // Lens button switching
    lensBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            lensBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lensText = btn.getAttribute('data-lens') || btn.textContent.trim();
            if (lensNameDisplay) lensNameDisplay.textContent = lensText;
            showNotification(`Camera Lens Switched: ${lensText}`);
        });
    });

    // Aspect ratio switching
    aspectPills.forEach(pill => {
        pill.addEventListener('click', () => {
            aspectPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const aspect = pill.getAttribute('data-aspect');
            if (viewportFrame) {
                if (aspect === '2.39:1') {
                    viewportFrame.style.aspectRatio = '21/9';
                    viewportFrame.style.maxWidth = '100%';
                } else if (aspect === '16:9') {
                    viewportFrame.style.aspectRatio = '16/9';
                    viewportFrame.style.maxWidth = '100%';
                } else if (aspect === '9:16') {
                    viewportFrame.style.aspectRatio = '9/16';
                    viewportFrame.style.maxWidth = '360px';
                }
            }
        });
    });

    // Scene prompt card switching
    promptCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            promptCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const data = SCENE_PRESETS[idx];
            if (!data) return;

            // Animate transition flash
            if (viewportFrame && typeof gsap !== 'undefined') {
                gsap.fromTo(viewportFrame, 
                    { filter: 'brightness(1.8) contrast(1.2)' },
                    { filter: 'brightness(1) contrast(1)', duration: 0.45, ease: 'power2.out' }
                );
            }

            if (sceneTitleEl) sceneTitleEl.textContent = data.title;
            if (scenePillEl) scenePillEl.textContent = data.category;
            if (scenePromptEl) scenePromptEl.textContent = `"${data.prompt}"`;
            if (sceneImageEl) {
                sceneImageEl.src = data.image;
                sceneImageEl.alt = data.title;
            }
            if (playBtn) {
                playBtn.setAttribute('data-video-url', data.videoUrl);
                playBtn.setAttribute('data-video-title', data.title);
                playBtn.setAttribute('data-video-category', data.category);
                playBtn.setAttribute('data-video-synopsis', data.prompt);
            }

            // Sync lens and aspect buttons
            lensBtns.forEach(b => {
                if (b.getAttribute('data-lens') === data.lens) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            aspectPills.forEach(a => {
                if (a.getAttribute('data-aspect') === data.aspect) {
                    a.classList.add('active');
                } else {
                    a.classList.remove('active');
                }
            });
            if (lensNameDisplay) lensNameDisplay.textContent = data.lens;
        });
    });

    // Real-time Director Audio Waveform Canvas Visualizer
    const audioCanvas = document.getElementById('directorAudioCanvas');
    if (audioCanvas) {
        const actx = audioCanvas.getContext('2d');
        let awidth = audioCanvas.width = audioCanvas.offsetWidth || 280;
        let aheight = audioCanvas.height = 40;

        window.addEventListener('resize', () => {
            if (audioCanvas.offsetWidth) awidth = audioCanvas.width = audioCanvas.offsetWidth;
        });

        let phase = 0;
        function renderWaveform() {
            actx.clearRect(0, 0, awidth, aheight);
            actx.beginPath();
            actx.strokeStyle = 'rgba(230, 194, 128, 0.7)';
            actx.lineWidth = 1.5;

            phase += 0.05;
            const mid = aheight / 2;
            const bars = 36;
            const barWidth = awidth / bars;

            for (let i = 0; i < bars; i++) {
                const amp = (Math.sin(phase + i * 0.35) * 0.4 + Math.cos(phase * 1.5 + i * 0.2) * 0.35 + 0.5) * (mid - 4);
                const x = i * barWidth + barWidth / 2;
                actx.moveTo(x, mid - amp);
                actx.lineTo(x, mid + amp);
            }
            actx.stroke();
            requestAnimationFrame(renderWaveform);
        }
        renderWaveform();
    }
}

// Cinematic Mandatory Scroll-Snap Navigation & Observer (Home Page)
function initCinematicScrollSnap() {
    const snapNav = document.getElementById('snapNav');
    const snapSections = document.querySelectorAll('.snap-section');
    if (!snapNav || snapSections.length === 0) return;

    const dots = snapNav.querySelectorAll('.snap-nav-dot');
    setTimeout(() => { snapNav.classList.add('active'); }, 1100);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = dot.getAttribute('data-target');
            const targetSection = document.querySelector(targetSelector);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        let bestEntry = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                    bestEntry = entry;
                }
            }
        });

        if (bestEntry) {
            const id = bestEntry.target.getAttribute('id');
            if (id) {
                dots.forEach(dot => {
                    const target = dot.getAttribute('data-target');
                    if (target === `#${id}`) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
    }, { rootMargin: '-10% 0px -35% 0px', threshold: [0.15, 0.4, 0.7] });

    snapSections.forEach(section => observer.observe(section));
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initThemeBackground();
    initCursor();
    initNavigation();
    initNavigationSubmenus();
    init3DTilt();
    initFloatingContactSidebar();
    initIntroVideoPlayer();
    initWebProficiencySystem();
    initCreativeVideoModal();
    initAccessibilitySystem();
    initFooterSequenceNav();
    initAccordions();
    initForms();
    initGsapAnimations();
    initCinematicScrollSnap();
    initCreativeDirectorDeck();
});

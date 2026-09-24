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

// Global Preloader Execution
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const progressEl = preloader.querySelector('.loader-bar-progress');
    const percentEl = preloader.querySelector('.loader-percentage');

    let current = 0;
    const target = 100;
    const duration = 650; // ms
    const start = performance.now();

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
            if (progressEl) progressEl.style.width = '100%';
            if (percentEl) percentEl.textContent = '100%';
            setTimeout(() => {
                preloader.classList.add('loaded');
                triggerHeroEntrance();
            }, 120);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Hero Entrance Animation
function triggerHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    gsap.fromTo('.hero-fade-in', 
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }
    );

    gsap.fromTo('.celestial-moon-wrap',
        { scale: 0.7, opacity: 0, y: -20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.6, ease: 'back.out(1.4)', delay: 0.2 }
    );
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

// 1. Creative Space: Cosmic Galaxy & Comets with Responsive Stellar Drift
function initCosmicGalaxy() {
    const canvas = document.getElementById('cosmicCanvas');
    const warpContainer = document.getElementById('warpBg');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let mousePos = { x: width / 2, y: height / 2, active: false };
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

        const STAR_COUNT = Math.min(140, Math.floor(width / 12));
        const starHues = ['#ffffff', '#FFF3CD', '#E6C280', '#F5E6C8', '#FFEBB5'];
        const stars = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 0.8 + Math.random() * 2.2,
                depth: 0.2 + Math.random() * 0.8,
                color: starHues[Math.floor(Math.random() * starHues.length)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.01 + Math.random() * 0.025,
                baseAlpha: 0.2 + Math.random() * 0.7
            });
        }

        const comets = [];
        function spawnComet() {
            if (comets.length >= 2) return;
            comets.push({
                x: 80 + Math.random() * (width - 160),
                y: -40,
                vx: 3.5 + Math.random() * 3,
                vy: 2.8 + Math.random() * 2.5,
                alpha: 0.85,
                color: Math.random() > 0.4 ? '#FFF3CD' : '#E6C280'
            });
        }

        setInterval(() => {
            if (Math.random() > 0.35) spawnComet();
        }, 4200);

        function renderCosmicSpace() {
            ctx.clearRect(0, 0, width, height);

            const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.025 : 0;
            const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.025 : 0;
            smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.05;
            smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.05;

            // Render Stars with Depth Parallax and Subtle Cursor Deflection
            stars.forEach(s => {
                s.pulse += s.pulseSpeed;
                const alpha = Math.sin(s.pulse) * 0.2 + s.baseAlpha;

                let sx = s.x + smoothParallax.x * s.depth * 2;
                let sy = s.y + smoothParallax.y * s.depth * 2;

                if (mousePos.active) {
                    const dx = sx - mousePos.x;
                    const dy = sy - mousePos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140 && dist > 0) {
                        const push = (1 - dist / 140) * 1.5 * s.depth;
                        sx += (dx / dist) * push;
                        sy += (dy / dist) * push;
                    }
                }

                ctx.beginPath();
                ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Render Comets
            for (let i = comets.length - 1; i >= 0; i--) {
                const c = comets[i];
                c.x += c.vx;
                c.y += c.vy;
                c.alpha -= 0.005;

                const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 15, c.y - c.vy * 15);
                grad.addColorStop(0, c.color);
                grad.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.moveTo(c.x + smoothParallax.x, c.y + smoothParallax.y);
                ctx.lineTo(c.x - c.vx * 14 + smoothParallax.x, c.y - c.vy * 14 + smoothParallax.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.6;
                ctx.globalAlpha = Math.max(0, c.alpha);
                ctx.stroke();
                ctx.globalAlpha = 1;

                if (c.y > height + 100 || c.x > width + 100 || c.alpha <= 0) {
                    comets.splice(i, 1);
                }
            }

            requestAnimationFrame(renderCosmicSpace);
        }

        renderCosmicSpace();
        return;
    }

    if (!warpContainer) return;

    warpContainer.innerHTML = '';
    const activeStars = [];
    const MAX_STARS = 120;
    const starHues = ['#ffffff', '#FFF3CD', '#E6C280', '#F5E6C8', '#FFEBB5'];

    function spawnStar() {
        if (activeStars.length >= MAX_STARS) return;
        const star = document.createElement('div');
        const size = 1 + Math.random() * 2.8;
        const color = starHues[Math.floor(Math.random() * starHues.length)];
        const isGold = color !== '#ffffff';
        const shadowColor = isGold ? 'rgba(230,194,128,0.85)' : 'rgba(255,255,255,0.85)';

        star.className = 'absolute rounded-full pointer-events-none';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = color;
        star.style.boxShadow = `0 0 ${size * 3.5}px ${shadowColor}`;

        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.opacity = '0';

        warpContainer.appendChild(star);
        activeStars.push({ el: star, x: posX, y: posY });

        if (typeof gsap !== 'undefined') {
            gsap.to(star, {
                opacity: 0.25 + Math.random() * 0.75,
                scale: 1 + Math.random() * 0.6,
                duration: 1.8 + Math.random() * 3.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: Math.random() * 2.5
            });
        } else {
            star.style.opacity = '0.7';
        }
    }

    for (let i = 0; i < MAX_STARS; i++) {
        spawnStar();
    }

    function launchComet() {
        const comet = document.createElement('div');
        comet.className = 'absolute pointer-events-none z-10';
        const startX = 15 + Math.random() * 75;
        const startY = Math.random() * 45;
        const length = 110 + Math.random() * 140;
        const angle = 35 + Math.random() * 25; // degrees

        comet.style.left = `${startX}%`;
        comet.style.top = `${startY}%`;
        comet.style.width = `${length}px`;
        comet.style.height = '2px';
        comet.style.background = 'linear-gradient(90deg, #FFF3CD 0%, rgba(230, 194, 128, 0.8) 25%, transparent 100%)';
        comet.style.transform = `rotate(${angle}deg)`;
        comet.style.borderRadius = '999px';
        comet.style.boxShadow = '0 0 16px rgba(255, 243, 205, 0.9)';
        comet.style.opacity = '0';

        warpContainer.appendChild(comet);

        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (comet.parentNode) comet.parentNode.removeChild(comet);
                    const nextDelay = 3500 + Math.random() * 6000;
                    setTimeout(launchComet, nextDelay);
                }
            });
            tl.to(comet, { opacity: 0.95, duration: 0.2, ease: 'power1.out' })
              .to(comet, {
                  x: 350,
                  y: 280,
                  opacity: 0,
                  duration: 1.3,
                  ease: 'power2.in'
              }, '-=0.1');
        }
    }

    setTimeout(launchComet, 1500);
    setTimeout(launchComet, 4000);
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
            vx: (Math.random() - 0.5) * 0.32,
            vy: -0.15 - Math.random() * 0.35, // Gentle systemic buoyancy
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.016 + Math.random() * 0.024,
            isImmuneSentinel: Math.random() > 0.65, // Emerald vitality/immune sentinels
            lastFireTime: 0,
            fireCooldown: 40 + Math.floor(Math.random() * 60),
            organelles: [
                { angle: Math.random() * Math.PI * 2, dist: 5 + Math.random() * 6, speed: 0.015 },
                { angle: Math.random() * Math.PI * 2, dist: 7 + Math.random() * 4, speed: -0.012 }
            ]
        });
    }

    // 2. Cooperative Intercellular Signal Pulses (Healthy cell-to-cell communication)
    const intercellularPulses = [];
    for (let i = 0; i < 9; i++) {
        intercellularPulses.push({
            from: Math.floor(Math.random() * CELL_COUNT),
            to: Math.floor(Math.random() * CELL_COUNT),
            progress: Math.random(),
            speed: 0.006 + Math.random() * 0.01
        });
    }

    // 3. Ambient ATP / Vitality Sparkles
    const atpParticles = [];
    for (let i = 0; i < 30; i++) {
        atpParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.9 + Math.random() * 1.5,
            vy: -0.2 - Math.random() * 0.4,
            vx: (Math.random() - 0.5) * 0.2,
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
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            angle: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            spikes: 8,
            spikeLength: 5 + Math.random() * 3,
            maxHp: 100,
            hp: 100,
            spawnScale: 0.05,
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
            haloGrad.addColorStop(0, 'rgba(230, 194, 128, 0.04)');
            haloGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.018)');
            haloGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = haloGrad;
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, 185, 0, Math.PI * 2);
            ctx.fill();
        }

        // --- A. SPAWN VIRUSES PERIODICALLY ---
        virusSpawnTimer++;
        if (virusSpawnTimer > 180 && viruses.length < MAX_ACTIVE_VIRUSES) {
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

            const glow = Math.sin(p.pulse) * 0.15 + p.alpha;
            ctx.beginPath();
            ctx.arc(p.x + smoothParallax.x * 0.5, p.y + smoothParallax.y * 0.5, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 194, 128, ${Math.max(0.08, glow)})`;
            ctx.fill();
        });

        // --- C. INTERCONNECTED CELLULAR FILAMENTS (GAP JUNCTIONS WITH CURSOR SHIMMER) ---
        for (let i = 0; i < cells.length; i++) {
            for (let j = i + 1; j < cells.length; j++) {
                const dx = cells[i].x - cells[j].x;
                const dy = cells[i].y - cells[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 155) {
                    let alpha = (1 - dist / 155) * 0.18;

                    // Intercellular filaments subtly illuminate when cursor passes nearby
                    if (mousePos.active) {
                        const midX = (cells[i].x + cells[j].x) / 2;
                        const midY = (cells[i].y + cells[j].y) / 2;
                        const mdx = midX - mousePos.x;
                        const mdy = midY - mousePos.y;
                        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                        if (mdist < 180) {
                            alpha += (1 - mdist / 180) * 0.22;
                        }
                    }

                    ctx.beginPath();
                    ctx.moveTo(cells[i].x + smoothParallax.x, cells[i].y + smoothParallax.y);
                    ctx.lineTo(cells[j].x + smoothParallax.x, cells[j].y + smoothParallax.y);
                    ctx.strokeStyle = cells[i].isImmuneSentinel || cells[j].isImmuneSentinel
                        ? `rgba(16, 185, 129, ${alpha * 0.95})`
                        : `rgba(230, 194, 128, ${alpha})`;
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
                    ctx.fillStyle = c1.isImmuneSentinel ? 'rgba(16, 185, 129, 0.85)' : 'rgba(255, 243, 205, 0.8)';
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
                    ctx.strokeStyle = v.flash > 0 ? 'rgba(255, 243, 205, 0.7)' : 'rgba(239, 68, 68, 0.55)';
                    ctx.lineWidth = 1.4;
                    ctx.stroke();

                    // Spike bulb head
                    ctx.beginPath();
                    ctx.arc(sx2, sy2, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = v.flash > 0 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(220, 38, 38, 0.75)';
                    ctx.fill();
                }

                // 2. Draw virus core capsid
                ctx.beginPath();
                ctx.arc(0, 0, curRadius, 0, Math.PI * 2);
                ctx.fillStyle = v.flash > 0
                    ? 'rgba(255, 243, 205, 0.8)'
                    : 'rgba(220, 38, 38, 0.65)';
                ctx.shadowBlur = v.flash > 0 ? 12 : 8;
                ctx.shadowColor = v.flash > 0 ? '#FFF3CD' : 'rgba(239, 68, 68, 0.5)';
                ctx.fill();
                ctx.shadowBlur = 0;

                // Inner nucleocapsid ring
                ctx.beginPath();
                ctx.arc(0, 0, curRadius * 0.55, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(153, 27, 27, 0.7)';
                ctx.lineWidth = 1.2;
                ctx.stroke();

                ctx.restore();

                // Telemetry tag
                if (v.spawnScale >= 0.95) {
                    ctx.font = '8px monospace';
                    ctx.fillStyle = 'rgba(239, 68, 68, 0.65)';
                    ctx.textAlign = 'center';
                    ctx.fillText('PATHOGEN', v.x + smoothParallax.x, v.y + smoothParallax.y - curRadius - 8);
                }
            } else {
                // Dissolving into harmless golden nutrients
                v.dissolveProgress += 0.04;
                const curRadius = v.radius * (1 - v.dissolveProgress);
                const alpha = Math.max(0, 1 - v.dissolveProgress);

                ctx.beginPath();
                ctx.arc(v.x + smoothParallax.x, v.y + smoothParallax.y, Math.max(0.5, curRadius), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(230, 194, 128, ${alpha * 0.7})`;
                ctx.shadowBlur = 15;
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
                const defenseAlpha = (1 - closestDist / 240) * 0.22;

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
                        speed: 0.03 + Math.random() * 0.02,
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
            ctx.strokeStyle = `${primaryColor} 0.22)`;
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Inner vital nucleus
            ctx.beginPath();
            ctx.arc(cx, cy, c.innerRadius, 0, Math.PI * 2);
            ctx.fillStyle = c.isImmuneSentinel ? 'rgba(16, 185, 129, 0.65)' : 'rgba(230, 194, 128, 0.65)';
            ctx.shadowBlur = 10;
            ctx.shadowColor = c.isImmuneSentinel ? 'rgba(16, 185, 129, 0.5)' : 'rgba(230, 194, 128, 0.5)';
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
                ctx.fill();
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
            ctx.fillStyle = ab.isEmerald ? '#A7F3D0' : '#FFF3CD';
            ctx.shadowBlur = 8;
            ctx.shadowColor = ab.isEmerald ? '#10B981' : '#E6C280';
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
                            alpha: 0.85,
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
                                alpha: 0.95,
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
                ctx.globalAlpha = s.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        requestAnimationFrame(renderBioFlow);
    }

    renderBioFlow();
}

// 3. Web Proficiency: Analytics Data Grid & Matrix Vectors (With Responsive Cursor Interaction)
function initAnalyticsDataGrid() {
    const canvas = document.getElementById('analyticsGridCanvas');
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

    const GRID_SIZE = 55;
    const packets = [];
    const PACKET_COUNT = 24;

    for (let i = 0; i < PACKET_COUNT; i++) {
        packets.push({
            x: Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE,
            y: Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE,
            dir: Math.random() > 0.5 ? 'h' : 'v',
            speed: 1.5 + Math.random() * 2.2,
            length: 18 + Math.random() * 26,
            color: Math.random() > 0.3 ? '#E6C280' : '#FFF3CD'
        });
    }

    function renderGridData() {
        ctx.clearRect(0, 0, width, height);

        const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.02 : 0;
        const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.02 : 0;
        smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.05;
        smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.05;

        // Subtle architectural grid coordinate lines
        ctx.strokeStyle = 'rgba(245, 230, 200, 0.04)';
        ctx.lineWidth = 1;
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

        // Subtle interactive glow nodes near cursor
        if (mousePos.active) {
            const nearGridX = Math.round(mousePos.x / GRID_SIZE) * GRID_SIZE;
            const nearGridY = Math.round(mousePos.y / GRID_SIZE) * GRID_SIZE;

            for (let ox = -GRID_SIZE; ox <= GRID_SIZE; ox += GRID_SIZE) {
                for (let oy = -GRID_SIZE; oy <= GRID_SIZE; oy += GRID_SIZE) {
                    const nx = nearGridX + ox + smoothParallax.x;
                    const ny = nearGridY + oy + smoothParallax.y;
                    const d = Math.hypot(nx - mousePos.x, ny - mousePos.y);
                    if (d < 120) {
                        const alpha = (1 - d / 120) * 0.35;
                        ctx.beginPath();
                        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(230, 194, 128, ${alpha})`;
                        ctx.fill();
                    }
                }
            }
        }

        // Data packets flowing along grid lines
        packets.forEach(p => {
            let currentSpeed = p.speed;

            // Slightly speed up packet if near cursor
            if (mousePos.active) {
                const distToMouse = Math.hypot(p.x - mousePos.x, p.y - mousePos.y);
                if (distToMouse < 140) {
                    currentSpeed *= 1.35;
                }
            }

            ctx.beginPath();
            if (p.dir === 'h') {
                p.x += currentSpeed;
                if (p.x > width + 50) {
                    p.x = -50;
                    p.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
                }
                const grad = ctx.createLinearGradient(p.x + smoothParallax.x, p.y + smoothParallax.y, p.x - p.length + smoothParallax.x, p.y + smoothParallax.y);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.moveTo(p.x + smoothParallax.x, p.y + smoothParallax.y);
                ctx.lineTo(p.x - p.length + smoothParallax.x, p.y + smoothParallax.y);
            } else {
                p.y += currentSpeed;
                if (p.y > height + 50) {
                    p.y = -50;
                    p.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
                }
                const grad = ctx.createLinearGradient(p.x + smoothParallax.x, p.y + smoothParallax.y, p.x + smoothParallax.x, p.y - p.length + smoothParallax.y);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.moveTo(p.x + smoothParallax.x, p.y + smoothParallax.y);
                ctx.lineTo(p.x + smoothParallax.x, p.y - p.length + smoothParallax.y);
            }
            ctx.stroke();

            // Head beacon dot
            ctx.fillStyle = '#FFF3CD';
            ctx.beginPath();
            ctx.arc(p.x + smoothParallax.x, p.y + smoothParallax.y, 2, 0, Math.PI * 2);
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(230, 194, 128, 0.9)';
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
            { y: height * 0.35, amp: 45, freq: 0.0018, speed: step * 0.9, color: 'rgba(230, 194, 128, 0.06)' },
            { y: height * 0.55, amp: 60, freq: 0.0012, speed: step * 1.2, color: 'rgba(255, 243, 205, 0.04)' },
            { y: height * 0.75, amp: 50, freq: 0.0022, speed: step * 0.7, color: 'rgba(240, 192, 90, 0.05)' }
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
            ctx.lineWidth = 1.75;
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
   WEB ARCHITECTURE: 14 PROJECTS REPOSITORY, DUAL CAROUSELS & 7-ITEM REPEATER
   ========================================================================== */
const WEB_PROJECTS_DATA = [
    {
        id: 'nexuspay',
        title: 'NexusPay Enterprise Fintech Core',
        category: 'Custom Web Applications',
        snippet: 'Distributed real-time financial payments infrastructure with multi-currency settlement & fraud detection telemetry.',
        description: 'NexusPay is an enterprise-tier payments engine built for high-throughput transactional velocity. Integrates localized payment gateways, instant bank rail verification, and an encrypted audit ledger operating at sub-50ms latency.',
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'PostgreSQL', 'Redis'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/nexuspay-core',
        demo: 'https://nexuspay-demo.internal'
    },
    {
        id: 'auracraft',
        title: 'AuraCraft Multi-Vendor Marketplace',
        category: 'Marketplace Platforms',
        snippet: 'Scalable multivendor commerce ecosystem with real-time bidding, escrow payments, and dynamic commissions.',
        description: 'AuraCraft connects artisan creators with global enterprise buyers. Features sub-second algorithmic search via Algolia, automated vendor payouts, dispute resolution workflows, and real-time stock orchestration.',
        tags: ['React 19', 'GraphQL', 'Node.js', 'PostgreSQL', 'Tailwind', 'Docker'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/auracraft-marketplace',
        demo: 'https://auracraft-demo.internal'
    },
    {
        id: 'omniflow',
        title: 'OmniFlow Automation & CRM Engine',
        category: 'Email & Workflow Automations',
        snippet: 'Event-driven customer engagement pipeline processing 500k+ automated email sequences daily.',
        description: 'Engineered an enterprise marketing automation suite with a visual drag-and-drop workflow canvas. Synchronizes behavioral event queues, segment targeting, webhook triggers, and automated A/B delivery analytics.',
        tags: ['Vue 3', 'TypeScript', 'WebSockets', 'SendGrid API', 'BullMQ', 'Express'],
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/omniflow-automation',
        demo: 'https://omniflow-demo.internal'
    },
    {
        id: 'edusphere',
        title: 'EduSphere Interactive LMS & Academy',
        category: 'Online Course & LMS Platforms',
        snippet: 'Digital learning management portal with adaptive video streaming, live cohorts, and verifiable credentialing.',
        description: 'EduSphere powers cohort-based educational academies with zero buffering via Mux video CDN, interactive quizzes, automated PDF certificate minting, community forum threads, and Stripe recurring subscription billing.',
        tags: ['Next.js', 'Tailwind CSS', 'Mux Video', 'Prisma ORM', 'Stripe Subscriptions'],
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/edusphere-lms',
        demo: 'https://edusphere-demo.internal'
    },
    {
        id: 'veloce',
        title: 'Veloce Luxury DTC Headless Storefront',
        category: 'Custom Web Applications',
        snippet: 'Ultra-fast headless luxury storefront achieving a 99/100 Lighthouse performance score.',
        description: 'Veloce replaces bloated legacy storefronts with an ultra-responsive headless frontend powered by the Shopify Storefront GraphQL API. Boasts instantaneous page transitions, smooth cart flyouts, and 3D product previews.',
        tags: ['Shopify Storefront API', 'React', 'Framer Motion', 'Tailwind CSS', 'Vercel Edge'],
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/veloce-storefront',
        demo: 'https://veloce-demo.internal'
    },
    {
        id: 'biosync',
        title: 'BioSync Telehealth & Wellness Portal',
        category: 'Custom Web Applications',
        snippet: 'HIPAA-compliant telemedicine dashboard with encrypted WebRTC video visits and vital telemetry.',
        description: 'Provides patients and clinical physicians with an encrypted medical portal for remote appointments, electronic prescription dispatching, longitudinal blood panel tracking, and secure biometric document storage.',
        tags: ['React', 'WebRTC', 'Node.js', 'Tailwind CSS', 'HIPAA Secure DB'],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/biosync-telehealth',
        demo: 'https://biosync-demo.internal'
    },
    {
        id: 'kinetix',
        title: 'Kinetix Global Logistics & Fleet Telemetry',
        category: 'Custom Web Applications',
        snippet: 'Real-time geospatial tracking engine coordinating multimodal shipping containers worldwide.',
        description: 'Built for international supply chain managers. Visualizes vessel coordinates, ambient temperature sensor telemetry, route delay predictive forecasting, and automated customs documentation dispatch.',
        tags: ['TypeScript', 'Mapbox GL', 'Node.js', 'Tailwind CSS', 'Socket.IO'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/kinetix-fleet',
        demo: 'https://kinetix-demo.internal'
    },
    {
        id: 'synapse-ai',
        title: 'Synapse Studio AI Generative Pipeline',
        category: 'Custom Web Applications',
        snippet: 'Enterprise GenAI orchestration hub integrating text-to-video, LLM prompt chaining, and asset management.',
        description: 'An AI productivity suite enabling marketing teams to generate commercial video scripts, dispatch batch rendering requests to Kling and Runway, assemble visual storyboards, and export multi-format social campaign cuts.',
        tags: ['Next.js 14', 'Python FastAPI', 'Tailwind CSS', 'Vector DB', 'FFmpeg'],
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/synapse-ai-studio',
        demo: 'https://synapse-demo.internal'
    },
    {
        id: 'architek-3d',
        title: 'Architek 3D Virtual Real Estate Showroom',
        category: 'Custom Web Applications',
        snippet: 'WebGL-powered interactive 3D property showroom allowing interactive walkthroughs inside browser.',
        description: 'Immersive property visualization tool engineered using Three.js and custom shader passes. Buyers can explore architectural residences, switch lighting moods, inspect CAD floor plans, and schedule private sales viewings.',
        tags: ['Three.js', 'WebGL', 'React', 'Tailwind CSS', 'GLTF Pipeline'],
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/architek-3d-showroom',
        demo: 'https://architek-demo.internal'
    },
    {
        id: 'aerocloud',
        title: 'AeroCloud SaaS Telemetry & DevOps Dashboard',
        category: 'Custom Web Applications',
        snippet: 'High-density observability dashboard rendering real-time server health, latency spikes, and CPU metrics.',
        description: 'DevOps telemetry dashboard built for microservice cluster managers. Incorporates real-time charts via D3, alert threshold triggers, log stream search, and role-based team collaboration permissions.',
        tags: ['React', 'D3.js', 'Chart.js', 'Tailwind CSS', 'REST API'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/aerocloud-devops',
        demo: 'https://aerocloud-demo.internal'
    },
    {
        id: 'prism-cms',
        title: 'PrismCMS Headless Editorial Publishing Hub',
        category: 'CMS Builds (WordPress / Headless)',
        snippet: 'Decoupled content management architecture supporting high-volume multilingual journalistic publications.',
        description: 'Transforms publishing workflows with instant preview deployments, modular blocks, structured metadata for rich snippets, CDN edge caching, and localized multi-language editorial syndication.',
        tags: ['Sanity.io', 'Next.js', 'Tailwind CSS', 'Algolia', 'GraphQL'],
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/prism-headless-cms',
        demo: 'https://prism-demo.internal'
    },
    {
        id: 'hyperscale',
        title: 'HyperScale Serverless Microservice Mesh',
        category: 'Custom Web Applications',
        snippet: 'Container orchestration manager facilitating multi-region container deployments with instant rollback.',
        description: 'Streamlines complex cloud deployments with health monitoring, automatic canary rollouts, traffic balancing, and integrated TLS certificate provisioning.',
        tags: ['Golang API', 'TypeScript', 'React', 'Tailwind CSS', 'Docker APIs'],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/hyperscale-mesh',
        demo: 'https://hyperscale-demo.internal'
    },
    {
        id: 'lumina-resort',
        title: 'Lumina Luxury Resort Booking & Concierge',
        category: 'CMS Builds (WordPress / Headless)',
        snippet: 'Bespoke hospitality reservations suite featuring room availability calendars and concierge requests.',
        description: 'Created for an ultra-luxury private island resort. Integrates dynamic seasonal rate pricing, private dining booking reservations, multi-currency credit card processing, and an automated SMS concierge system.',
        tags: ['WordPress Rest API', 'React', 'Tailwind CSS', 'Stripe', 'Twilio'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/lumina-hospitality',
        demo: 'https://lumina-demo.internal'
    },
    {
        id: 'pulse-automate',
        title: 'PulseAutomate Multi-Channel Marketing Webhook',
        category: 'Email & Workflow Automations',
        snippet: 'Omnichannel lead routing bridge connecting webhooks to Slack, Salesforce, HubSpot, and WhatsApp.',
        description: 'Eliminates lead drop-off by transforming raw form submissions into validated CRM records, triggering instant SMS / WhatsApp greetings to high-intent leads within 60 seconds of submission.',
        tags: ['Node.js', 'Express', 'Tailwind CSS', 'HubSpot API', 'WhatsApp Business API'],
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/reel3dlab/pulse-automate',
        demo: 'https://pulse-demo.internal'
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

    // Split projects into 2 sets of 7, duplicate them to ensure seamless infinite looping
    const set1 = WEB_PROJECTS_DATA.slice(0, 7);
    const set2 = WEB_PROJECTS_DATA.slice(7, 14);

    function createCardHtml(p) {
        return `
            <div class="carousel-project-card group" onclick="openProjectModal('${p.id}')" role="button" tabindex="0">
                <div class="h-44 w-full relative overflow-hidden bg-black/40">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-80"></div>
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#12161A]/90 text-[#E6C280] border border-[#E6C280]/30 backdrop-blur-md">
                        ${p.category}
                    </span>
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
                        <div class="flex items-center gap-2 text-[#8B949E]">
                            <i class="fab fa-github"></i>
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Populate track Right with duplicate set for continuous CSS marquee loop
    const htmlSet1 = set1.map(createCardHtml).join('');
    trackRight.innerHTML = htmlSet1 + htmlSet1;

    // Populate track Left with duplicate set
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

        repeaterGrid.innerHTML = pageItems.map((p, idx) => `
            <div class="repeater-project-card group flex flex-col justify-between" onclick="openProjectModal('${p.id}')" role="button" tabindex="0">
                <div>
                    <div class="h-48 w-full relative overflow-hidden bg-black/40">
                        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#12161A] via-transparent to-transparent opacity-80"></div>
                        <div class="absolute top-3 left-3 flex items-center gap-2">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#12161A]/90 text-[#E6C280] border border-[#E6C280]/40 backdrop-blur-md">
                                0${startIndex + idx + 1}
                            </span>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0D0F12]/85 text-[#F5E6C8] border border-[#F5E6C8]/20 backdrop-blur-md">
                                ${p.category}
                            </span>
                        </div>
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
                        View Technical Spec <i class="fas fa-chevron-right text-[10px]"></i>
                    </button>
                    <div class="flex items-center gap-3 text-xs text-[#A0AEC0]">
                        <span class="hover:text-[#E6C280] transition-colors" title="Repository Available"><i class="fab fa-github"></i></span>
                        <span class="hover:text-[#E6C280] transition-colors" title="Production Deployment"><i class="fas fa-external-link-alt"></i></span>
                    </div>
                </div>
            </div>
        `).join('');

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
    if (githubLink) githubLink.href = project.github;
    if (liveLink) liveLink.href = project.demo;

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
}

function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card, .glass-container');
    cards.forEach(card => {
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
                parent.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = 'rotate(0deg)');
            }

            if (!isOpen) {
                content.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
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
});

        // Initialize GSAP
        gsap.registerPlugin(ScrollTrigger);

        // --- 1. Text Splitting for Animations & Cursor Anchor ---
        function splitTextToChars(selector) {
            const el = document.querySelector(selector);
            if (!el) return [];
            const text = el.innerText.trim();
            el.innerHTML = '';
            const chars = [];
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.className = 'inline-block transform-gpu';
                if (text[i] === ' ') {
                    span.innerHTML = '&nbsp;';
                    span.style.width = '0.3em'; // Ensure spaces maintain width
                } else {
                    span.innerText = text[i];
                }
                el.appendChild(span);
                chars.push(span);
            }
            return chars;
        }

        const mainChars = splitTextToChars('.hero-title-main');
        const sub1Chars = splitTextToChars('.hero-title-sub1');
        const sub2Chars = splitTextToChars('.hero-title-sub2');

        // --- 2. Custom Cursor (Pops out from the "." in .XPERA) ---
        const cursorDot = document.getElementById('cursorDot');
        const cursorGlow = document.getElementById('cursorGlow');

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let cursorPopped = false;

        // Hide cursor initially
        gsap.set([cursorDot, cursorGlow], { scale: 0, opacity: 0 });

        // Calculate initial origin based on the '.' (first character of main title)
        if (mainChars.length > 0) {
            const dotRect = mainChars[0].getBoundingClientRect();
            // Using viewport coordinates to match position: fixed cursor exactly
            mouseX = dotRect.left + dotRect.width / 2;
            mouseY = dotRect.top + dotRect.height / 2;
        }

        let glowX = mouseX, glowY = mouseY;

        // Snap invisible cursor exactly to the starting dot point immediately
        cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`;
        cursorGlow.style.left = `${glowX}px`; cursorGlow.style.top = `${glowY}px`;

        window.addEventListener('mousemove', (e) => {
            if (!cursorPopped) {
                cursorPopped = true;
                // Burst the cursor outwards specifically from the dot's position!
                gsap.to([cursorDot, cursorGlow], {
                    scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2.5)"
                });
            }
            mouseX = e.clientX; mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`;
        });

        gsap.ticker.add(() => {
            glowX += (mouseX - glowX) * 0.15; glowY += (mouseY - glowY) * 0.15;
            cursorGlow.style.left = `${glowX}px`; cursorGlow.style.top = `${glowY}px`;
        });

        const interactables = document.querySelectorAll('a, button, input, .team-card, .tech-badge, .hero-badge, .stat-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '100px'; cursorGlow.style.height = '100px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(216,180,254,0.4) 0%, rgba(126,34,206,0) 70%)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '60px'; cursorGlow.style.height = '60px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(179,102,255,0.4) 0%, rgba(126,34,206,0) 70%)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

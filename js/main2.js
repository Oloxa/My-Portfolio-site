                                document.getElementById('growth-lead-form').addEventListener('submit', async function(e) {
                                    e.preventDefault();
                                    
                                    const form = this;
                                    const btn = form.querySelector('button[type="submit"]');
                                    const btnText = form.querySelector('.btn-text');
                                    const originalText = btnText.innerText;
                                    
                                    // UI Feedback: Loading state
                                    btn.disabled = true;
                                    btnText.innerText = 'שולח...';

                                    // Prepare Lead Data
                                    const formData = new FormData(form);
                                    const data = Object.fromEntries(formData.entries());

                                    try {
                                        const response = await fetch("https://hook.eu2.make.com/jzsfva1frhs1ry71bj9hljm28ohaenoz", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(data)
                                        });

                                        if (response.ok) {
                                            // Success Feedback
                                            btnText.innerText = 'תודה! נשלח';
                                            form.reset();
                                        } else {
                                            btnText.innerText = 'אירעה שגיאה';
                                        }
                                    } catch (error) {
                                        console.error("Webhook Error:", error);
                                        btnText.innerText = 'שגיאת חיבור';
                                    } finally {
                                        setTimeout(() => {
                                            btn.disabled = false;
                                            btnText.innerText = originalText;
                                        }, 3000);
                                    }
                                });
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

        // --- 3. Boiling Water Effect for Premium Buttons ---
        document.querySelectorAll('.btn-premium').forEach(btn => {
            // Elevate the text and icon so they float above the boiling liquid
            Array.from(btn.children).forEach(child => {
                child.style.position = 'relative';
                child.style.zIndex = '10';
            });
            
            // Create the boiling container
            const boilCont = document.createElement('div');
            boilCont.className = 'absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 overflow-hidden rounded-full z-0 group-hover:opacity-100';
            
            // Generate multiple bubbling elements
            for(let i=0; i<15; i++) {
                const bubble = document.createElement('div');
                const size = 6 + Math.random() * 14;
                bubble.style.cssText = `
                    position: absolute;
                    bottom: -20px;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    animation: boil-rise ${0.4 + Math.random() * 0.6}s infinite ease-in ${Math.random() * 0.5}s;
                `;
                boilCont.appendChild(bubble);
            }
            btn.appendChild(boilCont);
        });

        // --- Scroll Velocity Skew ---
        let proxy = { skew: 0 };
        let skewSetter = gsap.quickSetter(".skew-elem", "skewY", "deg");
        let clamp = gsap.utils.clamp(-5, 5); 
        let skewActive = true;

        let skewTrigger = ScrollTrigger.create({
            onUpdate: (self) => {
                if (!skewActive) return; 
                let skew = clamp(self.getVelocity() / -400); 
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                        skew: 0, duration: 1, ease: "power3", overwrite: true, 
                        onUpdate: () => skewSetter(proxy.skew),
                        onComplete: () => {
                            if (window.scrollY > window.innerHeight * 0.3) {
                                skewActive = false; skewTrigger.kill(); 
                            }
                        }
                    });
                }
            }
        });

        // --- INNOVATIVE HERO INTERACTIONS ---

        const dimGlow = "0 0 20px rgba(179,102,255,0.4)"; // Much softer, sophisticated glow
        const baseGlow = "0 0 15px rgba(126,34,206,0.3)";

        let isHoveringMain = false;
        let isHoveringSub1 = false;
        let isHoveringSub2 = false;

        // .XPERA (Sequential 360 Flip)
        const titleMain = document.querySelector('.hero-title-main');
        if (titleMain) {
            gsap.set(titleMain, { perspective: 800 });
            titleMain.addEventListener('mouseenter', () => {
                isHoveringMain = true;
                gsap.to(titleMain, { textShadow: dimGlow, duration: 0.4 });
                gsap.fromTo(mainChars, 
                    { rotationX: 0 }, 
                    { rotationX: 360, duration: 1.5, stagger: 0.12, ease: "power2.out", overwrite: "auto" }
                );
            });
            titleMain.addEventListener('mouseleave', () => {
                isHoveringMain = false;
                gsap.to(titleMain, { textShadow: baseGlow, duration: 0.6 });
            });
        }

        // Auto-Trigger logic for .XPERA
        function autoTriggerMain() {
            if(!titleMain || isHoveringMain) return;
            gsap.to(titleMain, { textShadow: dimGlow, duration: 0.4 });
            gsap.fromTo(mainChars, 
                { rotationX: 0 }, 
                { 
                    rotationX: 360, duration: 1.5, stagger: 0.12, ease: "power2.out", overwrite: "auto",
                    onComplete: () => { if(!isHoveringMain) gsap.to(titleMain, { textShadow: baseGlow, duration: 0.6 }); }
                }
            );
        }

        // Subtitle 1 (Premium Quick Pop-in Wave)
        const titleSub1 = document.querySelector('.hero-title-sub1');
        if (titleSub1) {
            titleSub1.addEventListener('mouseenter', () => {
                isHoveringSub1 = true;
                gsap.to(titleSub1, { textShadow: dimGlow, duration: 0.4 });
                gsap.fromTo(sub1Chars, 
                    { scale: 1, y: 0, color: "#d8b4fe" },
                    { scale: 1.25, y: -6, color: "#ffffff", duration: 0.25, stagger: 0.04, yoyo: true, repeat: 1, ease: "power1.inOut", overwrite: "auto" }
                );
            });
            titleSub1.addEventListener('mouseleave', () => {
                isHoveringSub1 = false;
                gsap.to(titleSub1, { textShadow: baseGlow, duration: 0.6 });
            });
        }

        // Auto-Trigger logic for Subtitle 1
        function autoTriggerSub1() {
            if(!titleSub1 || isHoveringSub1) return;
            gsap.to(titleSub1, { textShadow: dimGlow, duration: 0.4 });
            gsap.fromTo(sub1Chars, 
                { scale: 1, y: 0, color: "#d8b4fe" },
                { 
                    scale: 1.25, y: -6, color: "#ffffff", duration: 0.25, stagger: 0.04, yoyo: true, repeat: 1, ease: "power1.inOut", overwrite: "auto",
                    onComplete: () => { if(!isHoveringSub1) gsap.to(titleSub1, { textShadow: baseGlow, duration: 0.6 }); }
                }
            );
        }

        // Subtitle 2 (Skewy Color Change)
        const titleSub2 = document.querySelector('.hero-title-sub2');
        if (titleSub2) {
            titleSub2.addEventListener('mouseenter', () => {
                isHoveringSub2 = true;
                gsap.to(titleSub2, { textShadow: dimGlow, duration: 0.4 });
                gsap.fromTo(sub2Chars, 
                    { skewX: 0, color: "#b366ff" },
                    { skewX: -25, color: (i) => i % 2 === 0 ? "#f3e8ff" : "#d8b4fe", duration: 0.2, stagger: 0.03, yoyo: true, repeat: 1, ease: "power1.inOut", overwrite: "auto" }
                );
            });
            titleSub2.addEventListener('mouseleave', () => {
                isHoveringSub2 = false;
                gsap.to(titleSub2, { textShadow: baseGlow, duration: 0.6 });
            });
        }

        // Auto-Trigger logic for Subtitle 2
        function autoTriggerSub2() {
            if(!titleSub2 || isHoveringSub2) return;
            gsap.to(titleSub2, { textShadow: dimGlow, duration: 0.4 });
            gsap.fromTo(sub2Chars, 
                { skewX: 0, color: "#b366ff" },
                { 
                    skewX: -25, color: (i) => i % 2 === 0 ? "#f3e8ff" : "#d8b4fe", duration: 0.2, stagger: 0.03, yoyo: true, repeat: 1, ease: "power1.inOut", overwrite: "auto",
                    onComplete: () => { if(!isHoveringSub2) gsap.to(titleSub2, { textShadow: baseGlow, duration: 0.6 }); }
                }
            );
        }

        // Auto-Trigger logic for Badge
        const heroBadge = document.querySelector('.hero-badge');
        let isHoveringBadge = false;
        if(heroBadge) {
            heroBadge.addEventListener('mouseenter', () => isHoveringBadge = true);
            heroBadge.addEventListener('mouseleave', () => isHoveringBadge = false);
        }
        function autoTriggerBadge() {
            if(!heroBadge || isHoveringBadge) return;
            heroBadge.classList.add('simulate-hover');
            setTimeout(() => {
                if(!isHoveringBadge) heroBadge.classList.remove('simulate-hover');
            }, 2200); // Allow ample time for the premium draggy eruption before retracting
        }

        // Dedicated, more frequent loop for the Badge
        function triggerBadgeLoop() {
            autoTriggerBadge();
            // Reduced time difference (runs every 3.5 to 5.5 seconds)
            setTimeout(triggerBadgeLoop, 3500 + Math.random() * 2000);
        }
        // Start the badge loop shortly after page load
        setTimeout(triggerBadgeLoop, 3000);

        // Random Interval Loop for Main Titles
        function triggerRandomHeroAnimation() {
            const anims = [autoTriggerMain, autoTriggerSub1, autoTriggerSub2];
            const randomAnim = anims[Math.floor(Math.random() * anims.length)];
            randomAnim();
            
            // Queue the next random trigger between 2.5 and 5 seconds
            setTimeout(triggerRandomHeroAnimation, 2500 + Math.random() * 2500);
        }
        
        // Start the random loop after the initial page load animations finish
        setTimeout(triggerRandomHeroAnimation, 5000);


        // Magnetic CTA Button
        const heroBtn = document.querySelector('.hero-cta-btn');
        if(heroBtn) {
            heroBtn.addEventListener('mousemove', (e) => {
                const rect = heroBtn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(heroBtn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
            });
            heroBtn.addEventListener('mouseleave', () => {
                gsap.to(heroBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            });
        }

        // --- Hero Entrance & Word Animations ---
        const descEl = document.querySelector('.hero-desc-text');
        const descTextStr = descEl ? descEl.innerText.trim() : "";
        const descWordsArr = descTextStr.split(' ');
        const descCharsTyping = [];
        const descWordsElements = []; // For random word animations
        const unanimatedWords = []; // Track un-colored words
        
        // Prepare bracket text for typing effect & word-level animation
        if (descEl) {
            descEl.innerHTML = '';
            descWordsArr.forEach((wordStr, wIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'inline-block transform-gpu';
                wordSpan.style.whiteSpace = 'nowrap'; 
                
                for(let i = 0; i < wordStr.length; i++) {
                    const charSpan = document.createElement('span');
                    charSpan.innerText = wordStr[i];
                    charSpan.style.opacity = 0;
                    wordSpan.appendChild(charSpan);
                    descCharsTyping.push(charSpan);
                }
                
                descEl.appendChild(wordSpan);
                descWordsElements.push(wordSpan);
                unanimatedWords.push(wordSpan); // Add to unanimated pool

                if (wIndex < descWordsArr.length - 1) {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.innerHTML = '&nbsp;';
                    spaceSpan.style.opacity = 0;
                    descEl.appendChild(spaceSpan);
                    descCharsTyping.push(spaceSpan);
                }
            });
        }

        // Random idle animations for words inside brackets
        function randomWordAnimation() {
            if (unanimatedWords.length === 0) return; // Stop when all words are permanently colored
            
            // Pick a random un-animated word
            const rIndex = Math.floor(Math.random() * unanimatedWords.length);
            const word = unanimatedWords[rIndex];
            unanimatedWords.splice(rIndex, 1); // Remove from pool so it stays consistently glowing
            
            const animType = Math.floor(Math.random() * 4); 
            // Slower, more premium duration (1.5s to 2s)
            const duration = 1.5 + Math.random() * 0.5; 
            
            // Continuous looping bright purple color pulse
            gsap.to(word.children, { 
                color: "#d8b4fe", 
                textShadow: "0 0 15px rgba(216,180,254,0.7)", 
                duration: 2.5, 
                repeat: -1, 
                yoyo: true, 
                ease: "sine.inOut" 
            });

            switch(animType) {
                case 0: // Drop-in (Premium Elastic)
                    gsap.fromTo(word, { y: -12 }, { y: 0, duration, ease: "elastic.out(1, 0.5)" });
                    break;
                case 1: // Pop-in (Premium Elastic)
                    gsap.fromTo(word, { scale: 0.8 }, { scale: 1, duration, ease: "elastic.out(1, 0.5)" });
                    break;
                case 2: // Slide-in
                    gsap.fromTo(word, { x: 15 }, { x: 0, duration, ease: "power3.out" });
                    break;
                case 3: // Roll-in
                    gsap.fromTo(word, { rotationZ: -15, y: -8 }, { rotationZ: 0, y: 0, duration, ease: "power3.out" });
                    break;
            }

            // Schedule next animation. Duration is ~1.5-2.0s, so waiting 2.2s to 2.8s guarantees 
            // 1 animation at a time with a shorter, more noticeable slight gap.
            setTimeout(randomWordAnimation, 2200 + Math.random() * 600);
        }

        // Start random word animations after the typing finishes (~4s)
        setTimeout(randomWordAnimation, 5000);

        // Hero Main Entrance
        const tlHero = gsap.timeline();
        tlHero.from('.hero-badge', { x: -30, opacity: 0, duration: 0.8, ease: "back.out(1.7)" })
              .from('.hero-title-main', { 
                  scale: 0.3, opacity: 0, filter: "blur(20px)",
                  duration: 1.5, ease: "elastic.out(1, 0.6)" 
              }, "-=0.4")
              .from('.hero-bracket', { scale: 0.6, opacity: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.8")
              .from('.hero-cta-btn', { scale: 0.8, opacity: 0, y: 30, duration: 0.8, ease: "back.out(1.5)" }, "-=0.6")
              .to(descCharsTyping, { opacity: 1, duration: 0.01, stagger: 0.015, ease: "none" }, "-=0.2");

        // Majestic Left and Right Slide Animations
        gsap.from('.hero-title-sub1', {
            x: -250, opacity: 0, duration: 1.5, ease: "power4.out",
            scrollTrigger: { trigger: '.hero-title-sub1', start: "top 95%" }
        });
        gsap.from('.hero-title-sub2', {
            x: 250, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2,
            scrollTrigger: { trigger: '.hero-title-sub2', start: "top 95%" }
        });

        // Milky Way Starry Sky & Downward Asteroid Animation
        const warpContainer = document.getElementById('warpBg');
        if(warpContainer) {
            let activeDots = [];
            let movingAsteroidDots = []; // Track up to 2 simultaneous asteroids
            const MAX_STARS = 120; // Increased to create a full galaxy feel across the entire site

            function spawnStar() {
                if (activeDots.length >= MAX_STARS) return; 
                
                const dot = document.createElement('div');
                
                // Varied sizes (1px to 3.5px) for depth, and mix of white/purple
                const size = 1 + Math.random() * 2.5;
                const isPurple = Math.random() > 0.75;
                const bgColor = isPurple ? '#d8b4fe' : '#ffffff';
                const shadowColor = isPurple ? 'rgba(216,180,254,0.8)' : 'rgba(255,255,255,0.8)';

                dot.className = 'absolute rounded-full';
                dot.style.width = `${size}px`;
                dot.style.height = `${size}px`;
                dot.style.backgroundColor = bgColor;
                dot.style.boxShadow = `0 0 ${size * 4}px ${shadowColor}`;
                
                const startX = Math.random() * 100;
                const startY = Math.random() * 100; // Spread across the entire hero sky
                
                dot.style.left = `${startX}%`;
                dot.style.top = `${startY}%`;
                dot.style.opacity = 0;
                warpContainer.appendChild(dot);
                
                const dotObj = { el: dot };
                activeDots.push(dotObj);

                // Twinkle effect (noticeable and dynamic)
                gsap.to(dot, {
                    opacity: 0.3 + Math.random() * 0.7,
                    scale: 1 + Math.random() * 0.5,
                    duration: 1.5 + Math.random() * 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: Math.random() * 2 // Randomize when they start twinkling
                });
            }

            // Initialize the starry background
            for(let i=0; i<MAX_STARS; i++) spawnStar(); 

            function shootAsteroid() {
                if (movingAsteroidDots.length >= 2 || activeDots.length === 0) {
                    setTimeout(shootAsteroid, 500); 
                    return;
                }
                
                let selectedIndex = -1;
                // Pick a star that is far from current asteroids and high enough to fall
                for (let attempts = 0; attempts < 20; attempts++) {
                    let i = Math.floor(Math.random() * activeDots.length);
                    const candidate = activeDots[i].el;
                    const cx = parseFloat(candidate.style.left);
                    const cy = parseFloat(candidate.style.top);
                    
                    let isFarEnough = true;
                    for (const movingDot of movingAsteroidDots) {
                        const mx = parseFloat(movingDot.dataset.startX);
                        const my = parseFloat(movingDot.dataset.startY);
                        const dist = Math.sqrt(Math.pow(cx - mx, 2) + Math.pow(cy - my, 2));
                        if (dist < 30) { 
                            isFarEnough = false;
                            break;
                        }
                    }
                    
                    // cy < 80 ensures the asteroid has vertical room to visually shoot downwards
                    if (isFarEnough && cy < 80) {
                        selectedIndex = i;
                        break;
                    }
                }

                if (selectedIndex === -1) {
                    setTimeout(shootAsteroid, 500);
                    return;
                }
                
                const dotObj = activeDots[selectedIndex];
                const dot = dotObj.el;
                dot.isAsteroid = true;
                
                dot.dataset.startX = dot.style.left;
                dot.dataset.startY = dot.style.top;
                
                activeDots.splice(selectedIndex, 1); 
                movingAsteroidDots.push(dot); 

                const isRight = Math.random() > 0.5;
                const angle = isRight ? 45 + Math.random() * 35 : 100 + Math.random() * 35; 
                const radians = angle * (Math.PI / 180);
                const distance = 1000 + Math.random() * 800;
                
                gsap.killTweensOf(dot); 
                
                dot.className = 'absolute bg-gradient-to-r from-transparent via-[#a855f7] to-[#ffffff] rounded-full';
                
                gsap.set(dot, {
                    width: `${40 + Math.random() * 60}px`,
                    height: '2px',
                    rotation: angle,
                    opacity: 0.9,
                    boxShadow: "0 0 15px rgba(179,102,255,0.9)",
                    backgroundColor: 'transparent' // Override star color for beam
                });

                gsap.to(dot, {
                    x: `+=${Math.cos(radians) * distance}`,
                    y: `+=${Math.sin(radians) * distance}`,
                    duration: 1 + Math.random() * 1.5,
                    ease: "power2.in",
                    onComplete: () => {
                        if (warpContainer.contains(dot)) dot.remove();
                        movingAsteroidDots = movingAsteroidDots.filter(d => d !== dot); 
                        spawnStar(); // Immediately replenish the galaxy with a new star
                        setTimeout(shootAsteroid, 1000 + Math.random() * 2000);
                    }
                });
            }

            setTimeout(shootAsteroid, 1500); 
            setTimeout(shootAsteroid, 2500); 
        }

        // Hero Planet Fold Animation
        gsap.set("#hero-section", { clipPath: "circle(100% at 50% 50%)", transformOrigin: "center center" });
        gsap.to("#hero-section", {
            clipPath: "circle(0% at 50% 50%)",
            scale: 0.4,
            rotation: 30,
            opacity: 0,
            scrollTrigger: {
                trigger: "#hero-section",
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        // --- Kinetic Text Illumination (Why XPERA) ---
        const illumText = document.getElementById('illuminate-text');
        const words = illumText.innerText.split(' ');
        illumText.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            span.className = 'word-illuminate';
            illumText.appendChild(span);
        });

        gsap.to('.word-illuminate', {
            color: '#f3e8ff',
            textShadow: '0 0 20px rgba(179,102,255,0.9)',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '#why-section',
                start: 'top 60%', end: 'bottom 70%', scrub: 1, 
            }
        });

        // --- NEW: Why XPERA Title Typewriter Reveal & Pill Style ---
        function splitHTMLForTyping(selector) {
            const el = document.querySelector(selector);
            if (!el) return [];
            
            const nodes = Array.from(el.childNodes);
            el.innerHTML = '';
            const animElements = [];
            
            nodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const words = node.nodeValue.split(/(\s+)/);
                    words.forEach(word => {
                        if (word === '') return;
                        if (word.trim() === '') {
                            const span = document.createElement('span');
                            span.innerHTML = word.replace(/ /g, '&nbsp;'); // Preserve exact spaces
                            el.appendChild(span);
                        } else {
                            const wordSpan = document.createElement('span');
                            wordSpan.className = 'inline-block';
                            wordSpan.dir = 'auto'; // Fixes BIDI scrambling for mixed text
                            
                            for (let i = 0; i < word.length; i++) {
                                const charSpan = document.createElement('span');
                                charSpan.className = 'opacity-0'; 
                                charSpan.innerText = word[i];
                                wordSpan.appendChild(charSpan);
                                animElements.push(charSpan);
                            }
                            el.appendChild(wordSpan);
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const wrapper = document.createElement('span');
                    wrapper.className = 'inline-block opacity-0 align-middle mx-1';
                    wrapper.appendChild(node);
                    el.appendChild(wrapper);
                    animElements.push(wrapper);
                }
            });
            
            return animElements;
        }

        const whyTitleEls = splitHTMLForTyping('.why-title-type');
        if (whyTitleEls.length > 0) {
            const typeStagger = 0.05;
            
            // Base typing effect for all characters & elements
            gsap.to(whyTitleEls, {
                opacity: 1,
                duration: 0.1,
                stagger: typeStagger,
                ease: "none",
                scrollTrigger: {
                    trigger: '.why-header',
                    start: 'top 85%',
                }
            });
            
            // Add a synced, premium "Pop" scale effect exclusively for the pill wrapper
            const pillIndex = whyTitleEls.findIndex(el => el.childNodes.length > 0 && el.childNodes[0].nodeType === 1);
            if (pillIndex !== -1) {
                gsap.fromTo(whyTitleEls[pillIndex], 
                    { scale: 0 }, 
                    { 
                        scale: 1, 
                        duration: 0.6, 
                        ease: "back.out(2)", 
                        delay: pillIndex * typeStagger,
                        scrollTrigger: {
                            trigger: '.why-header',
                            start: 'top 85%',
                        }
                    }
                );
            }
        }

        // --- Extravagant Team Section On-Scroll Sequence ---
        const teamTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#team-section',
                start: 'top 75%',
                toggleActions: "play none none reverse"
            }
        });

        // 1. Headers fly in with advanced elasticity
        teamTl.from('.team-header h2', { y: 60, scale: 0.8, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)" })
              .from('.team-header h3', { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
              .from('.team-header p', { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
              // 2. Animate the new english pill badges specifically
              .from('.team-pill', { scale: 0, rotationZ: 15, opacity: 0, duration: 0.7, stagger: 0.2, ease: "back.out(2)" }, "-=0.4")
              // 3. Cards mind-blowing 3D cascade sweep
              .from('.team-card', { 
                  y: 150, z: -400, rotationX: 25, rotationY: -15, opacity: 0, 
                  duration: 1.2, stagger: 0.15, ease: "expo.out"
              }, "-=0.3")
              // 4. Inner elements explode and sequence beautifully
              .from('.team-avatar-wrap', { scale: 0, rotationZ: -180, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.8")
              .from('.team-badge', { scale: 0, y: 30, opacity: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" }, "-=0.6")
              .from('.team-name', { x: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.6") // RTL slide-in
              .from('.team-role', { x: -30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.5")
              .from('.team-divider', { scaleX: 0, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.inOut" }, "-=0.5")
              .from('.team-desc', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.5")
              // 5. Reveal the Inline Conversion Hook dynamically
              .from('.team-conversion-hook', { y: 40, scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.2");
              
        // --- Continuous Mind-Blowing Cosmic Pulse to the Avatars (Non-conflicting) ---
        teamTl.eventCallback("onComplete", () => {
            gsap.to('.team-avatar-wrap', {
                boxShadow: "0 0 25px 8px rgba(179,102,255,0.4), inset 0 0 15px rgba(179,102,255,0.3)",
                borderColor: "rgba(216, 180, 254, 0.8)",
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.4
            });
        });


        // --- SECTION 4: Scrubbed Entrance (Slide from Right) ---
        gsap.from('.tech-card-bg', {
            x: "100vw", // Start off-screen to the right
            rotationY: -15, // Slight 3D rotation during slide
            opacity: 0,
            ease: "none", // Linear scrub mapped exactly to your mouse scroll
            scrollTrigger: {
                trigger: '#tech-section',
                start: 'top 90%', // Starts when section enters view
                end: 'top 20%', // Completes when section is near top of screen
                scrub: 1 // Buttery smooth 1-second delay catch-up
            }
        });

        // Extravagant inner elements for Section 4 (trigger normally when in view)
        const techTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#tech-section',
                start: 'top 50%',
                toggleActions: "play none none reverse"
            }
        });
        
        techTl.from('.tech-pre-badge', { y: -20, opacity: 0, scale: 0.5, duration: 0.6, ease: "back.out(2)" })
              .from('.tech-main-title', { y: 40, opacity: 0, rotationX: -30, duration: 1, ease: 'back.out(1.2)' }, "-=0.4")
              .from('.tech-sub-text', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
              .from('.tech-note-wrapper', { y: 20, opacity: 0, scale: 0.9, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, "-=0.6")
              .from('.marquee-container', { x: (i) => i % 2 === 0 ? 100 : -100, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.4");

        // 3D Tilt Hover Effect for the entire Tech Card
        const techCard = document.querySelector('.tech-card-bg');
        if (techCard) {
            techCard.addEventListener('mousemove', (e) => {
                const rect = techCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                gsap.to(techCard, {
                    transform: `perspective(1200px) rotateX(${(centerY - y) / 40}deg) rotateY(${(x - centerX) / 40}deg)`,
                    duration: 0.5, 
                    ease: "power2.out", 
                    boxShadow: "0 30px 60px rgba(126,34,206,0.3)"
                });
            });
            techCard.addEventListener('mouseleave', () => {
                gsap.to(techCard, {
                    transform: `perspective(1200px) rotateX(0deg) rotateY(0deg)`,
                    duration: 0.8, 
                    ease: "elastic.out(1, 0.5)", 
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
                });
            });
        }


        const cards = gsap.utils.toArray('.team-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left, y = e.clientY - rect.top;
                const centerX = rect.width/2, centerY = rect.height/2;
                gsap.to(card, {
                    transform: `perspective(1000px) rotateX(${(y - centerY) / 15}deg) rotateY(${(centerX - x) / 15}deg) scale(1.05)`,
                    duration: 0.4, ease: "power2.out", boxShadow: "0 20px 40px rgba(179,102,255,0.5)"
                });
            });
            card.addEventListener('mouseleave', () => {
                const dancingEl = card.querySelector('.stat-dance');
                if(dancingEl) {
                    gsap.to(dancingEl, { y: 0, scale: 1, rotationZ: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
                }
            });
        });

        // --- Extravagant Galactic CTA Sequence ---
        // Deep space 3D tumble reveal
        gsap.from('.cta-container', {
            scale: 0.8, opacity: 0, y: 100, duration: 1.2, ease: "back.out(1.2)",
            scrollTrigger: { trigger: '#contact-cta', start: 'top 80%' }
        });

        // --- ACCESSIBILITY LOGIC ---
        const a11yToggle = document.getElementById('a11yToggle');
        const a11yMenu = document.getElementById('a11yMenu');
        const closeA11y = document.getElementById('closeA11y');
        
        let a11yState = {
            textSize: 100,
            contrast: false,
            links: false,
            animationsPaused: false
        };

        function toggleA11yMenu() {
            a11yMenu.classList.toggle('active');
        }

        a11yToggle.addEventListener('click', toggleA11yMenu);
        closeA11y.addEventListener('click', toggleA11yMenu);

        document.querySelectorAll('.a11y-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                switch(action) {
                    case 'textSize':
                        // Cycle through 100% -> 120% -> 140% -> back to 100%
                        a11yState.textSize = a11yState.textSize >= 140 ? 100 : a11yState.textSize + 20;
                        document.documentElement.style.fontSize = `${a11yState.textSize}%`;
                        // Trigger ScrollTrigger refresh in case resizing breaks layout triggers
                        setTimeout(() => ScrollTrigger.refresh(), 200);
                        break;
                    case 'contrast':
                        a11yState.contrast = !a11yState.contrast;
                        document.body.classList.toggle('a11y-high-contrast', a11yState.contrast);
                        break;
                    case 'highlightLinks':
                        a11yState.links = !a11yState.links;
                        document.body.classList.toggle('a11y-highlight-links', a11yState.links);
                        break;
                    case 'pauseAnimations':
                        a11yState.animationsPaused = !a11yState.animationsPaused;
                        document.body.classList.toggle('a11y-pause-animations', a11yState.animationsPaused);
                        // Pause/Play global GSAP timelines
                        if(a11yState.animationsPaused) {
                            gsap.globalTimeline.pause();
                        } else {
                            gsap.globalTimeline.play();
                        }
                        break;
                    case 'reset':
                        a11yState = { textSize: 100, contrast: false, links: false, animationsPaused: false };
                        document.documentElement.style.fontSize = '100%';
                        document.body.classList.remove('a11y-high-contrast', 'a11y-highlight-links', 'a11y-pause-animations');
                        gsap.globalTimeline.play();
                        setTimeout(() => ScrollTrigger.refresh(), 200);
                        break;
                }
            });
        });


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

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
            scrollTrigger: { trigger: '/#contact-cta', start: 'top 80%' }
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

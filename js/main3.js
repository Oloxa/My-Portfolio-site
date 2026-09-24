        document.addEventListener('DOMContentLoaded', () => {
            gsap.registerPlugin(ScrollTrigger);

            // --- 1. Initial Page Load Animations ---
            const tl = gsap.timeline();
            
            // Fade in Hero Title
            tl.fromTo('.anim-fade-in', 
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
            )
            // Slide up Glass Panel
            .fromTo('.anim-slide-up',
                { opacity: 0, y: 50, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out' },
                "-=0.7"
            )
            // Pop in floating buttons
            .fromTo('.anim-floater', 
                { opacity: 0, scale: 0.5, y: 20 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.8)' },
                "-=0.5"
            );

            // --- 2. Scroll Triggered Content Animations ---
            const headings = gsap.utils.toArray('.policy-content h2');
            
            headings.forEach((heading) => {
                // Animate Section Heading
                gsap.fromTo(heading,
                    { opacity: 0, x: 30 },
                    {
                        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: heading,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // Find and animate siblings (Paragraphs & Lists) immediately following the heading
                let nextEl = heading.nextElementSibling;
                const pTags = [];
                const lists = [];

                while(nextEl && nextEl.tagName !== 'H2') {
                    if (nextEl.tagName === 'P') pTags.push(nextEl);
                    if (nextEl.tagName === 'UL') lists.push(nextEl);
                    nextEl = nextEl.nextElementSibling;
                }

                if (pTags.length > 0) {
                    gsap.fromTo(pTags,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                            scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none reverse' }
                        }
                    );
                }

                if (lists.length > 0) {
                    lists.forEach(ul => {
                        const lis = ul.querySelectorAll('li');
                        gsap.fromTo(lis,
                            { opacity: 0, x: -20 },
                            {
                                opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)',
                                scrollTrigger: { trigger: ul, start: 'top 85%', toggleActions: 'play none none reverse' }
                            }
                        );
                    });
                }
            });

            // --- 3. Parallax Background Glow ---
            gsap.to('.premium-center-glow', {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1
                }
            });

            // --- 4. ACCESSIBILITY LOGIC ---
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

            if(a11yToggle) a11yToggle.addEventListener('click', toggleA11yMenu);
            if(closeA11y) closeA11y.addEventListener('click', toggleA11yMenu);

            document.querySelectorAll('.a11y-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const action = e.currentTarget.dataset.action;
                    switch(action) {
                        case 'textSize':
                            a11yState.textSize = a11yState.textSize >= 140 ? 100 : a11yState.textSize + 20;
                            document.documentElement.style.fontSize = `${a11yState.textSize}%`;
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
        });

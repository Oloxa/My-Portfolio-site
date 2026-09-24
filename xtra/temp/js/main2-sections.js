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

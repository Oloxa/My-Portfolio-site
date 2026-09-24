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

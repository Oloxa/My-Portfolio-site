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

function initAnimationsScatter() {
    const iconsData = [
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-1.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-2.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-3.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-4.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-5.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-6.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-7.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-8.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-9.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-10.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-11.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-12.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-13.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-14.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-15.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-16.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-17.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-18.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-19.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-20.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-21.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-22.png',
        'http://new.xpera.io/wp-content/uploads/2026/04/scatter-icon-23.png'
    ];
    const iconContainer = document.getElementById('icon-container');

    if (iconContainer) {
        const iconWrappers = [];
        const radius = window.innerWidth > 768 ? 293 : 147;

        iconsData.forEach((icon, i) => {
            let wrapper = document.createElement('div');
            wrapper.className = 'floating-icon-wrapper';

            let el = document.createElement('div');
            el.className = 'floating-icon';
            el.innerHTML = '<img src="' + icon + '" alt="Icon" class="w-full h-full object-contain scale-[0.6] drop-shadow-[0_0_12px_rgba(179,102,255,0.8)]" />';

            wrapper.appendChild(el);
            iconContainer.appendChild(wrapper);
            iconWrappers.push({ wrapper, el });

            gsap.to(el, {
                x: () => (Math.random() - 0.5) * 40,
                y: () => (Math.random() - 0.5) * 40,
                rotation: () => (Math.random() - 0.5) * 20,
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        let tlCircle = gsap.timeline({
            scrollTrigger: {
                trigger: "#scatter-circle-section",
                start: "top top",
                end: "+=800",
                pin: true,
                scrub: 0.5
            }
        });

        gsap.set("#purple-reveal-text", { opacity: 0, scale: 0.4, y: 40 });

        tlCircle.to("#purple-reveal-text", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.5)"
        }, 0);

        iconWrappers.forEach((item, i) => {
            const angle = (i / iconsData.length) * Math.PI * 2;

            const scatterXIn = (Math.random() - 0.5) * (window.innerWidth * 0.8);
            const scatterYIn = (Math.random() - 0.5) * (window.innerHeight * 0.7);

            const circleX = Math.cos(angle) * radius;
            const circleY = Math.sin(angle) * radius;

            gsap.set(item.wrapper, { x: scatterXIn, y: scatterYIn, rotation: Math.random() * 180, opacity: 0.4 });

            tlCircle.to(item.wrapper, { x: circleX, y: circleY, rotation: 0, opacity: 1, duration: 1, ease: "power1.inOut" }, 0);
        });

        gsap.to(iconContainer, {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "none"
        });
    }
}

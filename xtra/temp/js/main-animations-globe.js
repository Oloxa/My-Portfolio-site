function initAnimationsGlobe() {
    const popupContainers = document.querySelectorAll(".globe-popup-container");
    if (popupContainers.length > 0) {
        gsap.set(popupContainers, { opacity: 0, scale: 0.85, y: 20 });

        const popupLoopTl = gsap.timeline({ repeat: -1, paused: true });

        popupLoopTl
            .to(popupContainers[0], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" })
            .to(popupContainers[1], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.25")
            .to(popupContainers[2], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.25")
            .to(popupContainers[3], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.25")
            .to({}, { duration: 3.5 })
            .to(popupContainers, { opacity: 0, y: -15, scale: 0.9, duration: 0.4, stagger: 0.08, ease: "power2.in" })
            .to({}, { duration: 0.5 });

        ScrollTrigger.create({
            trigger: "#globe-popups-section",
            start: "top 65%",
            onEnter: () => popupLoopTl.play(),
            onLeave: () => popupLoopTl.pause(),
            onEnterBack: () => popupLoopTl.play(),
            onLeaveBack: () => popupLoopTl.pause()
        });
    }

    const impactCards = document.querySelectorAll(".impact-card");
    if(impactCards.length > 0) {
        gsap.set(impactCards, { xPercent: -100, opacity: 0 });

        let impactTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#globe-popups-section",
                start: "top 50%",
                toggleActions: "play none none reverse"
            }
        });

        impactTl.to(impactCards, {
            xPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.1)"
        });

        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            let target = parseInt(counter.getAttribute('data-target'));
            let zero = { val: 0 };

            impactTl.to(zero, {
                val: target,
                duration: 2,
                onUpdate: function() {
                    counter.innerText = Math.floor(zero.val);
                },
                ease: "power2.out"
            }, "-=1");
        });
    }

    gsap.fromTo(".global-cta-reveal",
        { opacity: 0, y: 50, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: ".global-cta-reveal",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.5)"
        }
    );
}

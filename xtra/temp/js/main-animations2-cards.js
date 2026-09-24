function initAnimationsCards() {
    const cards = document.querySelectorAll('.testimonial-card');

    if (cards.length >= 3) {
        if (window.innerWidth >= 768) {
            gsap.set(cards, {
                y: 50,
                scale: 0.9,
                opacity: 0,
                rotation: () => (Math.random() - 0.5) * 10
            });

            let stackTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#testimonials-section",
                    start: "top 60%",
                    end: "bottom 40%",
                    scrub: 2.5
                }
            });

            stackTl.to(cards[0], { x: 380, y: 0, scale: 1, opacity: 1, rotation: 5, zIndex: 1, duration: 1 }, 0);
            stackTl.to(cards[1], { x: 0, y: 0, scale: 1.05, opacity: 1, rotation: 0, zIndex: 2, duration: 1 }, 0);
            stackTl.to(cards[2], { x: -380, y: 0, scale: 1, opacity: 1, rotation: -5, zIndex: 1, duration: 1 }, 0);
        } else {
            gsap.set(cards, { y: 40, opacity: 0 });

            gsap.to(cards, {
                scrollTrigger: {
                    trigger: "#cards-container",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }
    }

    gsap.fromTo(".stats-banner-reveal",
        { opacity: 0, y: 50, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: ".stats-banner-reveal",
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

    const serviceCards = document.querySelectorAll(".service-card");

    const servicesTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#services-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    servicesTl.fromTo(".services-heading-pop",
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
    );

    servicesTl.fromTo(serviceCards,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        },
        "-=0.2"
    );

    gsap.set(".vintage-horizontal-form", { transformOrigin: "bottom center" });
    gsap.fromTo(".vintage-horizontal-form",
        {
            y: 250,
            opacity: 0,
            scaleY: 0.7,
            scaleX: 0.9,
            filter: "blur(20px)"
        },
        {
            scrollTrigger: {
                trigger: ".vintage-horizontal-form",
                start: "top 85%",
                once: true
            },
            y: 0,
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            filter: "blur(0px)",
            duration: 1.44,
            ease: "power3.out"
        }
    );
}

let animationsInitialized = false;

function initAnimations() {
    if (animationsInitialized) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof ScrollToPlugin === 'undefined') {
        setTimeout(initAnimations, 50);
        return;
    }
    animationsInitialized = true;
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initAnimationsHeroWorkflow();
    initAnimationsGlobe();
    initAnimationsScatter();
    initAnimationsOwners();
    initAnimationsCards();
}

document.addEventListener("DOMContentLoaded", initAnimations);
window.addEventListener("load", initAnimations);
initAnimations();

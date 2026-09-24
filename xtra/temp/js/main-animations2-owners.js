function initAnimationsOwners() {
    gsap.fromTo(".owner-card-purple",
        { x: -200, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#owners-section",
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            x: 0,
            opacity: 1,
            duration: 3.6,
            ease: "back.out(1.2)"
        }
    );

    gsap.fromTo(".owner-card-green",
        { x: 200, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#owners-section",
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            x: 0,
            opacity: 1,
            duration: 3.6,
            ease: "back.out(1.2)"
        }
    );

    const textRevealContainer = document.querySelector('.scroll-reveal-container');
    if (textRevealContainer) {
        const headings = textRevealContainer.querySelectorAll('h2');

        headings.forEach((heading) => {
            let spans;

            if (heading.classList.contains('pre-split')) {
                spans = heading.querySelectorAll('span');
            } else {
                const text = heading.textContent.trim();
                heading.innerHTML = '';
                heading.style.perspective = '800px';

                const words = text.split(/\s+/);
                words.forEach((word) => {
                    const span = document.createElement('span');
                    span.textContent = word + '\u00A0';
                    span.style.display = 'inline-block';
                    span.style.opacity = '0';
                    heading.appendChild(span);
                });
                spans = heading.children;
            }

            gsap.fromTo(spans,
                {
                    y: 60,
                    opacity: 0,
                    rotationX: -90,
                    scale: 0.5,
                    color: "#7e22ce",
                    textShadow: "0 0 20px rgba(179,102,255,1)"
                },
                {
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    scale: 1,
                    color: (index, target) => target.dataset.finalColor || "#f3e8ff",
                    textShadow: "0 0 15px rgba(179,102,255,0.4)",
                    duration: 1.8,
                    stagger: 0.15,
                    ease: "back.out(2)"
                }
            );
        });

        const subtextSpans = textRevealContainer.querySelectorAll('p span');
        if(subtextSpans.length) {
            gsap.fromTo(subtextSpans,
                { opacity: 0, scale: 0.5 },
                {
                    scrollTrigger: {
                        trigger: textRevealContainer.querySelector('p'),
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.22,
                    ease: "back.out(1.5)"
                }
            );
        }
    }
}

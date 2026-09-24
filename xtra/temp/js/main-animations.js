function initAnimationsHeroWorkflow() {
    const warpContainer = document.querySelector('.automation-warp-premium');
    if (warpContainer) {
        const linesCount = 100;
        for (let i = 0; i < linesCount; i++) {
            const line = document.createElement('div');
            line.className = 'warp-line-elegant';

            const angle = Math.random() * 360;
            const delay = Math.random() * -5;
            const duration = 3 + Math.random() * 4;
            const opacity = 0.2 + Math.random() * 0.6;
            const width = 80 + Math.random() * 50;
            const hue = 270 + Math.random() * 20;

            line.style.setProperty('--angle', `${angle}deg`);
            line.style.setProperty('--delay', `${delay}s`);
            line.style.setProperty('--duration', `${duration}s`);
            line.style.setProperty('--max-opacity', opacity);
            line.style.width = `${width}vmax`;
            line.style.background = `linear-gradient(90deg, transparent, hsl(${hue}, 80%, 70%), white, transparent)`;

            if (Math.random() > 0.7) {
                line.style.filter = 'blur(1.5px)';
            }

            warpContainer.appendChild(line);
        }
    }

    gsap.fromTo(".phone-mockup",
        { x: 150, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#phone-section",
                start: "top 75%",
            },
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out"
        }
    );

    gsap.fromTo(".bounce-text",
        { x: -150, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#phone-section",
                start: "top 75%",
            },
            x: 0,
            opacity: 1,
            duration: 1.4,
            delay: 0.15,
            ease: "power3.out"
        }
    );

    const wfSection = document.getElementById('solution');
    const wfCanvas = document.getElementById('automation-canvas');
    const automationContainer = document.getElementById('automation-canvas-container');

    if (wfSection && wfCanvas && automationContainer) {
        function scaleCanvas() {
            const scale = Math.min(1, automationContainer.clientWidth / 1200);
            wfCanvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
        window.addEventListener('resize', scaleCanvas);
        scaleCanvas();

        const torch = document.getElementById('torchlight');
        if (torch) {
            wfSection.addEventListener('mousemove', (e) => {
                const rect = wfSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                gsap.to(torch, { x: x - 245, y: y - 245, opacity: 1, duration: 0.1 });

                const trace = document.createElement('div');
                trace.className = 'jet-trace';
                wfSection.appendChild(trace);

                gsap.set(trace, { x: x, y: y, xPercent: -50, yPercent: -50, scale: 1, opacity: 0.8 });
                gsap.to(trace, {
                    y: y - 20,
                    scale: 0.1,
                    opacity: 0,
                    duration: 2,
                    ease: "power2.out",
                    onComplete: () => trace.remove()
                });
            });

            wfSection.addEventListener('mouseleave', () => {
                gsap.to(torch, { opacity: 0, duration: 0.5 });
            });
        }

        const animPaths = document.querySelectorAll('.flow-path-anim');
        animPaths.forEach(path => {
            const len = path.getTotalLength();
            path.style.strokeDasharray = len;
            path.style.strokeDashoffset = len;
        });

        let loopTl = gsap.timeline({ repeat: -1, paused: true });
        loopTl.to("#fn-1", { "--lit": 1, duration: 0.3 }, 0)
              .to("#fn-1", { "--lit": 0.1, duration: 0.5 }, 0.5)
              .to("#fn-2", { "--lit": 1, duration: 0.3 }, 0.8)
              .to("#fn-2", { "--lit": 0.1, duration: 0.5 }, 1.5)
              .to(".fn-group-2, #fn-3", { "--lit": 1, duration: 0.3 }, 1.8)
              .to(".fn-group-2, #fn-3", { "--lit": 0.1, duration: 0.5 }, 2.5)
              .to(".fn-group-4", { "--lit": 1, duration: 0.3 }, 2.8)
              .to(".fn-group-4", { "--lit": 0.1, duration: 0.5 }, 3.5)
              .to({}, { duration: 0.5 }, 3.5);

        function startInfiniteLoop() {
            gsap.to('.flow-path-anim', { opacity: 0.3, duration: 0.5 });
            gsap.to('.flow-node', { '--lit': 0.1, duration: 0.5 });
            gsap.to('.data-packets', { opacity: 1, duration: 0.5 });
            loopTl.play(0);
        }

        function stopInfiniteLoop() {
            loopTl.pause();
            gsap.to('.data-packets', { opacity: 0, duration: 0.3 });
            gsap.to('.flow-path-anim', { opacity: 1, duration: 0.3 });
        }

        let scrubTl = gsap.timeline({
            scrollTrigger: {
                trigger: wfSection,
                start: "top top",
                end: "+=1250",
                scrub: 1,
                pin: true,
                onLeave: () => startInfiniteLoop(),
                onEnterBack: () => stopInfiniteLoop()
            }
        });

        scrubTl.to("#fn-1", { "--lit": 1, duration: 0.1 })
           .to("#path-anim-1", { strokeDashoffset: 0, duration: 0.5 })
           .to("#fn-2", { "--lit": 1, duration: 0.1 })
           .to(".path-group-2, #path-anim-3", { strokeDashoffset: 0, duration: 0.6 })
           .to(".fn-group-2, #fn-3", { "--lit": 1, duration: 0.1 })
           .to(".path-group-4", { strokeDashoffset: 0, duration: 0.5 })
           .to(".fn-group-4", { "--lit": 1, duration: 0.1 })
           .to({}, { duration: 0.5 });
    }
}

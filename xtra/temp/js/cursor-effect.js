(function() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var dot = document.getElementById('cursorDot');
    var glow = document.getElementById('cursorGlow');
    if (!dot || !glow) {
        dot = document.createElement('div');
        dot.id = 'cursorDot';
        dot.className = 'cursor-dot';
        glow = document.createElement('div');
        glow.id = 'cursorGlow';
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
        document.body.appendChild(dot);
    }

    var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    var glowX = mouseX, glowY = mouseY;
    var shown = false;

    gsap.set([dot, glow], { scale: 0, opacity: 0 });
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
    glow.style.left = glowX + 'px'; glow.style.top = glowY + 'px';

    window.addEventListener('mousemove', function(e) {
        if (!shown) {
            shown = true;
            gsap.to([dot, glow], { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2.5)" });
        }
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
    });

    gsap.ticker.add(function() {
        glowX += (mouseX - glowX) * 0.15; glowY += (mouseY - glowY) * 0.15;
        glow.style.left = glowX + 'px'; glow.style.top = glowY + 'px';
    });

    var interactables = document.querySelectorAll('a, button, input, .team-card, .tech-badge, .hero-badge, .stat-card');
    interactables.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            glow.style.width = '100px'; glow.style.height = '100px';
            glow.style.background = 'radial-gradient(circle, rgba(216,180,254,0.4) 0%, rgba(126,34,206,0) 70%)';
            dot.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        el.addEventListener('mouseleave', function() {
            glow.style.width = '60px'; glow.style.height = '60px';
            glow.style.background = 'radial-gradient(circle, rgba(179,102,255,0.4) 0%, rgba(126,34,206,0) 70%)';
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
})();

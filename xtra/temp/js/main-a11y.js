        // --- ACCESSIBILITY LOGIC ---
        document.addEventListener('DOMContentLoaded', () => {
            const a11yBtn = document.getElementById('a11yBtn');
            const a11yMenu = document.getElementById('a11yMenu');

            if (a11yBtn && a11yMenu) {
                a11yBtn.addEventListener('click', () => {
                    const isOpen = !a11yMenu.classList.contains('opacity-0');
                    if (isOpen) {
                        a11yMenu.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
                        a11yMenu.classList.remove('opacity-100', 'scale-100');
                    } else {
                        a11yMenu.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
                        a11yMenu.classList.add('opacity-100', 'scale-100');
                    }
                });
            }
        });

        let currentTextScale = 1;

        function toggleA11y(type) {
            if (type === 'contrast') {
                document.body.classList.toggle('a11y-high-contrast');
            } else if (type === 'focus') {
                document.body.classList.toggle('a11y-highlight-focus');
            }
        }

        function changeTextSize(step) {
            currentTextScale += step;
            // Limit scale between 0.8 and 1.5
            if (currentTextScale < 0.8) currentTextScale = 0.8;
            if (currentTextScale > 1.5) currentTextScale = 1.5;

            document.documentElement.style.fontSize = `${currentTextScale * 100}%`;
        }

        function resetA11y() {
            document.body.classList.remove('a11y-high-contrast', 'a11y-highlight-focus');
            currentTextScale = 1;
            document.documentElement.style.fontSize = '100%';
        }

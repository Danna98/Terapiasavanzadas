document.addEventListener('DOMContentLoaded', (event) => {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section, index) => {
        observer.observe(section);
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // Efecto de ondulación al hacer clic en las secciones
    sections.forEach(section => {
        section.addEventListener('click', function(e) {
            let ripple = document.createElement('div');
            this.appendChild(ripple);
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.addEventListener('animationend', function() {
                ripple.remove();
            });
        });
    });
});

// Añadir esta animación al CSS
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    0% {
        width: 0;
        height: 0;
        opacity: 0.5;
    }
    100% {
        width: 500px;
        height: 500px;
        opacity: 0;
    }
}

.section {
    position: relative;
    overflow: hidden;
}

.section div {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}
`;
document.head.appendChild(style);

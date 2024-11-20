document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.parallax');
    const navbar = document.getElementById('menu');
    const menuToggle = document.getElementById('menu-toggle');

    const counters = document.querySelectorAll('.stat h4');
    const speed = 1000; // Ajusta la velocidad de la animación


    // Desplazamiento suave al hacer clic en el menú
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) { // Solo manejar desplazamiento si es un ID
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
    
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Elemento con id "${targetId}" no encontrado.`);
                }
            }
        });
    });


    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });

    // Mostrar contenido con animación al hacer scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Cambiar el color de fondo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#2e02f3'; // Cambia el color al hacer scroll
        } else {
            navbar.style.backgroundColor = '#150070'; // Color original
        }
    });

    // Alternar visibilidad del menú en pantallas pequeñas
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
});
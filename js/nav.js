document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.parallax');
    const navbar = document.getElementById('menu');
    const menuToggle = document.getElementById('menu-toggle');

    // Desplazamiento suave al hacer clic en el menú
    document.querySelectorAll('#menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Ocultar el menú después de hacer clic en un enlace
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
            }
        });
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
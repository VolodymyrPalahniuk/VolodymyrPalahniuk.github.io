function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('expanded');
}

function resetMenuOnResize() {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth >= 481 && navbar.classList.contains('expanded')) {
        navbar.classList.remove('expanded');
    }
}

window.addEventListener('resize', resetMenuOnResize);

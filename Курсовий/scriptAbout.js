document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');

    function toggleMenu() {
        navbar.classList.toggle('expanded');
    }

    function resetMenuOnResize() {
        if (window.innerWidth >= 769 && navbar.classList.contains('expanded')) {
            navbar.classList.remove('expanded');
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    window.addEventListener('resize', resetMenuOnResize);
});

let testimonialsData = [];

async function loadTestimonials() {
    try {
        const response = await fetch('testimonials.json');
        testimonialsData = await response.json();
        renderTestimonial();
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

function renderTestimonial() {
    const container = document.getElementById('testimonial-container');
    container.innerHTML = "";

    testimonialsData.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('article');
        testimonialElement.classList.add('coment');

        if (index > 0 && window.innerWidth < 1024) {
            testimonialElement.classList.add('hide-m');
        }

        testimonialElement.innerHTML = `
            <div class="coment-container">
                <div class="coment-heading">
                    <span class="name">${testimonial.name}</span>
                    <span class="country">${testimonial.country}</span>
                </div>
                
                <div class="about-socials-container">
                    <div class="about-social-buttons">
                        <button class="about-social-button">
                            <div class="about-social-icon">
                                <i class="fa-brands fa-facebook fa-lg"></i>
                            </div>
                        </button>
                        <button class="about-social-button">
                            <div class="about-social-icon">
                                <i class="fa-brands fa-twitter fa-lg"></i>
                            </div>
                        </button>
                        <button class="about-social-button">
                            <div class="about-social-icon">
                                <i class="fa-brands fa-linkedin fa-lg"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="evaluation">
                ${'<i class="star"></i>'.repeat(testimonial.rating)}
            </div>
            
            <span class="coment-text">
                ${testimonial.text}
            </span>
        `;

        container.appendChild(testimonialElement);
    });
}

function moveToNextTestimonial() {
    const firstTestimonial = testimonialsData.shift();
    testimonialsData.push(firstTestimonial);
    renderTestimonial();
}

function moveToPrevTestimonial() {
    const lastTestimonial = testimonialsData.pop();
    testimonialsData.unshift(lastTestimonial);
    renderTestimonial();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadTestimonials();

    document.getElementById('next-comment-coment-1').addEventListener('click', moveToNextTestimonial);
    document.getElementById('prev-comment-coment-1').addEventListener('click', moveToPrevTestimonial);
    document.getElementById('next-comment-coment-2').addEventListener('click', moveToNextTestimonial);
    document.getElementById('prev-comment-coment-2').addEventListener('click', moveToPrevTestimonial);
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("open-modal");
    const closeModal = document.getElementById("close-modal");
    const confirmClose = document.getElementById("confirm-close");

    openModal.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        if (confirm("Ви впевнені, що хочете закрити це вікно?")) {
            modal.style.display = "none";
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            if (confirm("Ви впевнені, що хочете закрити це вікно?")) {
                modal.style.display = "none";
            }
        }
    });

    confirmClose.addEventListener("click", () => {
        modal.style.display = "none";
    });
});

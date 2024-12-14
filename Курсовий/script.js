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

let servicesData = [];
let portfolioData = [];
let testimonialsData = [];

async function loadServices() {
    const response = await fetch('services.json');
    servicesData = await response.json();
    updateServiceById(servicesData[0].id);
}

function updateServiceById(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) {
        console.error("Послуга з таким ID не знайдена:", serviceId);
        return;
    }

    document.getElementById('service-title').textContent = service.title;
    document.getElementById('service-description').textContent = service.description;

    const serviceImage = document.getElementById('service-image');
    serviceImage.src = service.image.src;
    serviceImage.alt = service.image.alt;

    const highlightsContainer = document.getElementById('service-highlights');
    highlightsContainer.innerHTML = "";
    service.highlights.forEach(highlight => {
        const highlightElement = document.createElement('div');
        highlightElement.classList.add('s-h-sub-containers');
        highlightElement.innerHTML = `
            <div class="s-h-icon">
                <div class="s-h-vector"></div>
            </div>
            <span class="s-h-text">${highlight}</span>
        `;
        highlightsContainer.appendChild(highlightElement);
    });
}

let currentServiceIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
    await loadServices();

    document.getElementById('prev-service-1').addEventListener('click', () => {
        currentServiceIndex = (currentServiceIndex - 1 + servicesData.length) % servicesData.length;
        updateServiceById(servicesData[currentServiceIndex].id);
    });

    document.getElementById('next-service-1').addEventListener('click', () => {
        currentServiceIndex = (currentServiceIndex + 1) % servicesData.length;
        updateServiceById(servicesData[currentServiceIndex].id);
    });
    
    document.getElementById('prev-service-2').addEventListener('click', () => {
        currentServiceIndex = (currentServiceIndex - 1 + servicesData.length) % servicesData.length;
        updateServiceById(servicesData[currentServiceIndex].id);
    });
    
    document.getElementById('next-service-2').addEventListener('click', () => {
        currentServiceIndex = (currentServiceIndex + 1) % servicesData.length;
        updateServiceById(servicesData[currentServiceIndex].id);
    });
});

async function loadPortfolio() {
    const response = await fetch('portfolio.json');
    portfolioData = await response.json();
    renderPortfolioCards();
}

function renderPortfolioCards() {
    const container = document.getElementById('portfolio-container');
    container.innerHTML = "";

    portfolioData.forEach((item, index) => {
        const card = document.createElement('article');
        card.classList.add('card');

        if (index > 0 && window.innerWidth < 1024) {
            card.classList.add('hide-m');
        }

        card.innerHTML = `
            <img class="case-image" src="${item.image.src}" alt="${item.image.alt}">
            <div class="case-container">
                <div class="case-text-container">
                    <span class="case-name">${item.title}</span>
                    <span class="case-date">${item.date}</span>
                </div>
                <div class="case-button">
                    <span class="case-button-text">${item.buttonText}</span>
                    <div class="case-button-icon"><i class="case-button-vector"></i></div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function moveToNextCard() {
    const firstCard = portfolioData.shift();
    portfolioData.push(firstCard);
    renderPortfolioCards();
}

function moveToPrevCard() {
    const lastCard = portfolioData.pop();
    portfolioData.unshift(lastCard);
    renderPortfolioCards();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadPortfolio();

    document.getElementById('next-card-case-1').addEventListener('click', moveToNextCard);
    document.getElementById('prev-card-case-1').addEventListener('click', moveToPrevCard);
    document.getElementById('next-card-case-2').addEventListener('click', moveToNextCard);
    document.getElementById('prev-card-case-2').addEventListener('click', moveToPrevCard);
});

async function loadTestimonials() {
    const response = await fetch('testimonials.json');
    testimonialsData = await response.json();
    renderTestimonial();
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

document.getElementById('about-btn').addEventListener('click', () => {
    window.location.href = 'About.html';
});

document.getElementById('services-btn').addEventListener('click', () => {
    window.location.href = 'Services.html';
});

document.getElementById('portfolio-btn').addEventListener('click', () => {
    window.location.href = 'Portfolio.html';
});

const faqButtons = document.querySelectorAll('.faq-button');

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.closest('.faq-item');

        const answer = faqItem.querySelector('.faq-container-a');

        const icon = button.querySelector('.faq-icon i');

        const isHidden = answer.classList.contains('hide');

        if (isHidden) {
            answer.classList.remove('hide');
            icon.classList.remove('faq-vector-close');
            icon.classList.add('faq-vector-open');
        } else {
            answer.classList.add('hide');
            icon.classList.remove('faq-vector-open');
            icon.classList.add('faq-vector-close');
        }
    });
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
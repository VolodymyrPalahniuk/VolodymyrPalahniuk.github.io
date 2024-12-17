document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navbar && menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('expanded');
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 769 && navbar.classList.contains('expanded')) {
                navbar.classList.remove('expanded');
            }
        });
    }

const loadPortfolioData = async (category, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Контейнер з ID "${containerId}" не знайдено.`);
        return;
    }
    container.innerHTML = "";

    try {
        const response = await fetch(`${category}.json`);
        const data = await response.json();

        container.dataset.portfolioData = JSON.stringify(data);

        renderPortfolioCards(data, container);
    } catch (error) {
        console.error(`Помилка завантаження даних для категорії "${category}":`, error);
    }
};

const renderPortfolioCards = (data, container) => {
    container.innerHTML = ""; 

    data.forEach((item, index) => {
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
                <div class="case-button" data-id="${item.id}">
                    <span class="case-button-text">${item.buttonText}</span>
                    <div class="case-button-icon"><i class="case-button-vector"></i></div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    addModalListeners(container);
};

const moveToNextCard = (container) => {
    const data = JSON.parse(container.dataset.portfolioData); 
    const firstCard = data.shift();
    data.push(firstCard); 
    container.dataset.portfolioData = JSON.stringify(data); 
    renderPortfolioCards(data, container); 
};

const moveToPrevCard = (container) => {
    const data = JSON.parse(container.dataset.portfolioData);
    const lastCard = data.pop();
    data.unshift(lastCard);
    container.dataset.portfolioData = JSON.stringify(data); 
    renderPortfolioCards(data, container); 
};

const initializePortfolio = async () => {
    const categories = [
        { category: 'portraits', containerId: 'portfolio-portet-container' },
        { category: 'events', containerId: 'portfolio-event-container' },
        { category: 'commercials', containerId: 'portfolio-commercial-container' },
    ];

    for (const { category, containerId } of categories) {
        await loadPortfolioData(category, containerId);
    }

    const buttons = [
        { next: 'next-card-case-1', prev: 'prev-card-case-1', containerId: 'portfolio-portet-container' },
        { next: 'next-card-case-2', prev: 'prev-card-case-2', containerId: 'portfolio-portet-container' },
        { next: 'next-card-case-3', prev: 'prev-card-case-3', containerId: 'portfolio-event-container' },
        { next: 'next-card-case-4', prev: 'prev-card-case-4', containerId: 'portfolio-event-container' },
        { next: 'next-card-case-5', prev: 'prev-card-case-5', containerId: 'portfolio-commercial-container' },
        { next: 'next-card-case-6', prev: 'prev-card-case-6', containerId: 'portfolio-commercial-container' },
    ];

    buttons.forEach(({ next, prev, containerId }) => {
        const nextButton = document.getElementById(next);
        const prevButton = document.getElementById(prev);
        const container = document.getElementById(containerId);

        if (nextButton && prevButton && container) {
            nextButton.addEventListener('click', () => moveToNextCard(container));
            prevButton.addEventListener('click', () => moveToPrevCard(container));
        }
    });
};

document.addEventListener('DOMContentLoaded', initializePortfolio);

    const initializeFAQ = () => {
        const faqButtons = document.querySelectorAll('.faq-button');

        faqButtons.forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.closest('.faq-item');
                const answer = faqItem.querySelector('.faq-container-a');
                const icon = button.querySelector('.faq-icon i');

                if (answer) {
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
                }
            });
        });
    };

    initializePortfolio();
    initializeFAQ();
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
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

const servicesData = [
    {
        id: "events",
        title: "Події",
        description: "Наша послуга фотозйомки подій присвячена тому, щоб закарбувати магію ваших особливих подій. Будь то весілля, корпоративний захід чи святкування важливої події, ми завжди готові задокументувати кожну сердечну мить.",
        highlights: [
            "Висвітлення весіль, вечірок, корпоративів та і не тільки.",
            "Кваліфіковані фотографи, які знають, як зловити момент.",
            "Поєднання відвертих і позованих знімків для вичерпної історії.",
            "Швидка реакція, щоб ви могли знову пережити найяскравіші моменти дня."
        ],
        image: {
            src: "./assets/images/Photo-of-a-man-at-a-concert.webp",
            alt: "Photo of a man at a concert"
        }
    },
    {
        id: "portraits",
        title: "Портрети",
        description: "Індивідуальні портретні зйомки, що розкривають вашу унікальність і стиль. Ми допомагаємо створити фотографії, які залишають враження.",
        highlights: [
            "Індивідуальний підхід до кожного клієнта.",
            "Використання професійного освітлення для ідеального результату.",
            "Креативні локації для зйомки.",
            "Редагування фотографій для досягнення найкращого вигляду."
        ],
        image: {
            src: "./assets/images/Photo-of-a-woman-at-a-studio.webp",
            alt: "Photo of a woman at a studio"
        }
    }
];

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

document.addEventListener('DOMContentLoaded', () => {
    updateServiceById(servicesData[currentServiceIndex].id);
});

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

let portfolioData = [
    {
        id: "case-1",
        title: "Faces of Resilience",
        date: "Березень 2022",
        image: {
            src: "assets/images/case-1.webp",
            alt: "Portrait of a woman on an orange canvas"
        },
        buttonText: "Переглянути проект"
    },
    {
        id: "case-2",
        title: "A Wedding Tale",
        date: "Січень 2020",
        image: {
            src: "assets/images/case-2.webp",
            alt: "Woman with jewelry sits in front of the camera"
        },
        buttonText: "Переглянути проект"
    },
    {
        id: "case-3",
        title: "Product Elegance",
        date: "Січень 2020",
        image: {
            src: "assets/images/case-3.webp",
            alt: "A box with the brand's inscription: burberry"
        },
        buttonText: "Переглянути проект"
    }
];

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

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolioCards();

    document.getElementById('next-card-case-1').addEventListener('click', moveToNextCard);
    document.getElementById('prev-card-case-1').addEventListener('click', moveToPrevCard);
    document.getElementById('next-card-case-2').addEventListener('click', moveToNextCard);
    document.getElementById('prev-card-case-2').addEventListener('click', moveToPrevCard);
});

const testimonialsData = [
    {
        id: "testimonial-1",
        name: "Емілі Джонсон",
        country: "США, Каліфорнія",
        text: "Фотографії Дем'єна не просто фіксують моменти, вони фіксують емоції. Його роботи просто заворожують.",
        rating: 5
    },
    {
        id: "testimonial-2",
        name: "Джон Сміт",
        country: "США, Каліфорнія",
        text: "Дем'єн має неймовірний талант робити кожну подію легкою та невимушеною, а результати говорять самі за себе.",
        rating: 5
    },
    {
        id: "testimonial-3",
        name: "Саманта Девіс",
        country: "США, Каліфорнія",
        text: "Я була вражена здатністю Дем'єна вловити суть нашого весільного дня. Його фотографії - це наші спогади.",
        rating: 5
    }
];

let currentTestimonialIndex = 0;

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

document.addEventListener('DOMContentLoaded', () => {
    renderTestimonial();

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

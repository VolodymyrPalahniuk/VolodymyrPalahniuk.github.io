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
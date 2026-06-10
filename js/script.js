(function () {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const rootElement = document.documentElement;

  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem('misegbahia-theme');

      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    } catch (error) {
      // The theme still works when browser storage is unavailable.
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    rootElement.dataset.theme = theme;

    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
      themeToggle.title = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';
    }
  }

  applyTheme(getPreferredTheme());

  themeToggle?.addEventListener('click', () => {
    const nextTheme = rootElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);

    try {
      localStorage.setItem('misegbahia-theme', nextTheme);
    } catch (error) {
      // Ignore storage errors without blocking the visual theme change.
    }
  });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      const target = targetId && document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  function createCarousel(carousel) {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    let activeIndex = 0;

    if (!track || slides.length === 0 || !dotsContainer) {
      return;
    }

    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Ir para o item ${index + 1}`);
      dot.addEventListener('click', () => updateCarousel(index));
      dotsContainer.appendChild(dot);
      return dot;
    });

    function updateCarousel(nextIndex) {
      activeIndex = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translateX(-${activeIndex * 100}%)`;

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    }

    prevButton?.addEventListener('click', () => updateCarousel(activeIndex - 1));
    nextButton?.addEventListener('click', () => updateCarousel(activeIndex + 1));

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        updateCarousel(activeIndex - 1);
      }

      if (event.key === 'ArrowRight') {
        updateCarousel(activeIndex + 1);
      }
    });

    updateCarousel(0);
  }

  document.querySelectorAll('[data-carousel]').forEach(createCarousel);

  document.querySelectorAll('[data-feedback-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('#depoimentos')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  document.querySelectorAll('.faq__question').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      question.setAttribute('aria-expanded', String(!isOpen));

      if (answer) {
        answer.hidden = isOpen;
      }
    });
  });

  const revealElements = document.querySelectorAll(
    '.section-heading, .solution-card, .carousel, .testimonial-card, .client-showcase, .process-step, .about__content, .whatsapp-card, .trust-item'
  );

  revealElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      rootMargin: '-4% 0px -8% 0px',
      threshold: 0.1
    });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }
})();

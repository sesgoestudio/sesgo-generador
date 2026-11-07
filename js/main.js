/* =========================================
   RUMAA 888 — INTERACTIONS
========================================= */

document.addEventListener('DOMContentLoaded', () => {

  const preloader = document.querySelector('.preloader');
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');

  // PRELOADER

  window.addEventListener('load', () => {
    preloader?.classList.add('loaded');
  });

  // RESPALDO PARA EVITAR PANTALLA DE CARGA
  // SI ALGÚN RECURSO TARDA DEMASIADO.

  setTimeout(() => {
    preloader?.classList.add('loaded');
  }, 2500);


  // HEADER DINÁMICO

  const updateHeader = () => {
    header?.classList.toggle(
      'scrolled',
      window.scrollY > 40
    );
  };

  window.addEventListener('scroll', updateHeader, {
    passive: true
  });

  updateHeader();


  // MENÚ MÓVIL

  const closeMenu = () => {
    menuToggle?.classList.remove('active');
    navigation?.classList.remove('active');

    menuToggle?.setAttribute('aria-expanded', 'false');

    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {

    const isOpen =
      menuToggle.classList.toggle('active');

    navigation?.classList.toggle('active', isOpen);

    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    document.body.classList.toggle('menu-open', isOpen);

  });


  // CERRAR MENÚ AL NAVEGAR

  document.querySelectorAll('.navigation a').forEach(link => {

    link.addEventListener('click', closeMenu);

  });


  // CERRAR MENÚ CON ESCAPE

  document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
      closeMenu();
    }

  });


  // SCROLL REVEAL

  const revealElements =
    document.querySelectorAll('.reveal');

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {

    revealElements.forEach(element => {
      element.classList.add('visible');
    });

  } else {

    const observer = new IntersectionObserver((entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          obs.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });

  }


  // AÑO AUTOMÁTICO

  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // CERRAR MENÚ AL CAMBIAR A ESCRITORIO

  window.addEventListener('resize', () => {

    if (window.innerWidth > 768) {
      closeMenu();
    }

  });

});

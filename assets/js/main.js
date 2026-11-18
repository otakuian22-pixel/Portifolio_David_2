/* ============ CURSOR CUSTOMIZADO ============ */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (dot) dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .card, .skill-list span').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

/* ============ HEADER SCROLL ============ */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ============ BARRA DE PROGRESSO ============ */
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ============ SCROLL REVEAL ============ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ============ NAVEGAÇÃO SUAVE ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
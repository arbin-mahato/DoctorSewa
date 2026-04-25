// ─────────────────────────────────────────────
// DoctorSewa v2 — GSAP Animation Library
// ─────────────────────────────────────────────
// Import and call these in components via useEffect.
// All durations 0.2–0.5s, easing for premium feel.
// ─────────────────────────────────────────────

import gsap from 'gsap';

export const animations = {
  // ── Page / component entrance ─────────────────
  fadeIn: (element: HTMLElement, delay = 0) => {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.3, delay, ease: 'power2.out' });
  },

  slideUp: (element: HTMLElement, delay = 0) => {
    gsap.fromTo(element, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay, ease: 'power2.out' });
  },

  slideDown: (element: HTMLElement, delay = 0) => {
    gsap.fromTo(element, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay, ease: 'power2.out' });
  },

  scaleIn: (element: HTMLElement, delay = 0) => {
    gsap.fromTo(element, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, delay, ease: 'back.out(1.7)' });
  },

  // ── List stagger animation ────────────────────
  staggerChildren: (container: HTMLElement, staggerAmount = 0.1) => {
    const children = gsap.utils.toArray(container.children) as HTMLElement[];
    gsap.fromTo(children, {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: staggerAmount,
      ease: 'power2.out',
    });
  },

  // ── Hover interactions ────────────────────────
  buttonHover: (button: HTMLElement) => {
    const onEnter = () => gsap.to(button, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
    const onLeave = () => gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
    button.addEventListener('mouseenter', onEnter);
    button.addEventListener('mouseleave', onLeave);
    // Return cleanup function
    return () => {
      button.removeEventListener('mouseenter', onEnter);
      button.removeEventListener('mouseleave', onLeave);
    };
  },

  cardHover: (card: HTMLElement) => {
    const onEnter = () => gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
    const onLeave = () => gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  },

  // ── Feedback animations ───────────────────────
  success: (element: HTMLElement) => {
    gsap.fromTo(element, { scale: 0.8 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  },

  shake: (element: HTMLElement) => {
    const tl = gsap.timeline();
    tl.to(element, { x: -6, duration: 0.06, ease: 'power2.inOut' })
      .to(element, { x: 6, duration: 0.06, ease: 'power2.inOut' })
      .to(element, { x: -3, duration: 0.06, ease: 'power2.inOut' })
      .to(element, { x: 3, duration: 0.06, ease: 'power2.inOut' })
      .to(element, { x: 0, duration: 0.06, ease: 'power2.inOut' });
  },

  // ── Loading animations ────────────────────────
  spin: (element: HTMLElement) => {
    return gsap.to(element, {
      rotation: 360,
      duration: 1,
      ease: 'none',
      repeat: -1,
    });
  },

  pulse: (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0.5,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  },

  // ── Toast / notification ──────────────────────
  toastSlideIn: (element: HTMLElement) => {
    gsap.fromTo(element, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
  },

  toastSlideOut: (element: HTMLElement) => {
    return gsap.to(element, { x: 100, opacity: 0, duration: 0.3, ease: 'power2.in' });
  },

  // ── Modal / dialog ────────────────────────────
  modalScaleIn: (element: HTMLElement) => {
    gsap.fromTo(element, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
  },

  overlayFadeIn: (element: HTMLElement) => {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
  },
};

export default animations;

// ─────────────────────────────────────────────
// DoctorSewa v2 — Design Token System
// ─────────────────────────────────────────────
// Single source of truth for all design decisions.
// CSS variables in globals.css mirror these tokens.
// ─────────────────────────────────────────────

export const designSystem = {
  // ── COLOR TOKENS ──────────────────────────────
  colors: {
    primary: {
      50: '#e8f4ef',
      100: '#d0e8de',
      200: '#a8d1bd',
      400: '#52b380',
      600: '#2d9966',
      700: '#1a6b4a',
      800: '#0f4a32',
      900: '#082b1f',
    },
    secondary: {
      teal: '#006580',
      blue: '#1a4580',
      gold: '#7a5c00',
      coral: '#d85a30',
    },
    semantic: {
      success: '#2d9966',
      warning: '#b35c00',
      error: '#a02020',
      info: '#1a4580',
    },
    neutral: {
      50: '#f9f8f6',
      100: '#f0ede8',
      200: '#e0dcd4',
      300: '#d0ccc2',
      400: '#b8b3a8',
      500: '#8a8680',
      600: '#5a5850',
      700: '#3d3d3a',
      800: '#2c2c2a',
      900: '#1a1916',
    },
  },

  // ── TYPOGRAPHY TOKENS ─────────────────────────
  typography: {
    fontFamily: {
      sans: '"Inter", "-apple-system", "BlinkMacSystemFont", sans-serif',
      serif: '"Merriweather", serif',
      mono: '"Fira Code", monospace',
    },
    fontSize: {
      xs: { size: '11px', lineHeight: '1.3' },
      sm: { size: '12px', lineHeight: '1.4' },
      base: { size: '14px', lineHeight: '1.5' },
      lg: { size: '16px', lineHeight: '1.6' },
      xl: { size: '20px', lineHeight: '1.4' },
      '2xl': { size: '24px', lineHeight: '1.3' },
      '3xl': { size: '32px', lineHeight: '1.2' },
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },

  // ── SPACING TOKENS (4px base grid) ────────────
  spacing: {
    0: '0',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  } as Record<string, string>,

  // ── BORDER RADIUS ─────────────────────────────
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // ── ANIMATION PRESETS (GSAP configs) ──────────
  animations: {
    fadeIn: { duration: 0.3, opacity: 0, ease: 'power2.out' },
    slideUp: { duration: 0.4, y: 20, opacity: 0, ease: 'power2.out' },
    slideDown: { duration: 0.4, y: -20, opacity: 0, ease: 'power2.out' },
    slideLeft: { duration: 0.4, x: 20, opacity: 0, ease: 'power2.out' },
    slideRight: { duration: 0.4, x: -20, opacity: 0, ease: 'power2.out' },
    scaleIn: { duration: 0.3, scale: 0.95, opacity: 0, ease: 'back.out(1.7)' },

    buttonHover: { duration: 0.2, scale: 1.02, ease: 'power2.out' },
    cardHover: { duration: 0.3, y: -4, ease: 'power2.out' },

    success: { duration: 0.6, scale: 0.8, ease: 'elastic.out(1, 0.5)' },
    shake: { duration: 0.3, x: [-6, 6, -3, 3, 0], ease: 'power2.inOut' },
    pulse: { duration: 1.5, opacity: 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true },
    spin: { duration: 1, rotation: 360, ease: 'none', repeat: -1 },
  },

  // ── SHADOW TOKENS ─────────────────────────────
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    focus: '0 0 0 3px rgba(26, 107, 74, 0.1)',
  },

  // ── RESPONSIVE BREAKPOINTS ────────────────────
  breakpoints: {
    mobile: '375px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },

  // ── COMPONENT BASE STYLES ─────────────────────
  components: {
    button: {
      base: {
        padding: '10px 18px',
        fontSize: '14px',
        fontWeight: 500,
        borderRadius: '8px',
        cursor: 'pointer',
        border: '1px solid',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      },
      variants: {
        primary: {
          bg: '#1a6b4a',
          color: '#fff',
          border: '#1a6b4a',
          hoverBg: '#2d9966',
          hoverBorder: '#2d9966',
        },
        secondary: {
          bg: 'transparent',
          color: '#1a6b4a',
          border: '#d0e8de',
          hoverBg: '#e8f4ef',
          hoverBorder: '#a8d1bd',
        },
        danger: {
          bg: '#a02020',
          color: '#fff',
          border: '#a02020',
          hoverBg: '#c23333',
          hoverBorder: '#c23333',
        },
        ghost: {
          bg: 'transparent',
          color: '#1a6b4a',
          border: 'transparent',
          hoverBg: '#e8f4ef',
        },
      },
    },
    input: {
      base: {
        padding: '10px 12px',
        fontSize: '14px',
        borderRadius: '6px',
        border: '1px solid #d0ccc2',
      },
      focus: {
        border: '#1a6b4a',
        boxShadow: '0 0 0 3px rgba(26, 107, 74, 0.1)',
        outline: 'none',
      },
    },
    card: {
      base: {
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e0dcd4',
      },
      hover: {
        y: '-4px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
} as const;

export default designSystem;

# DoctorSewa v2 — Design System Reference

> Source of truth for all components, tokens, and patterns.
> Preview: `npm run dev` → [localhost:3000/design](http://localhost:3000/design)

---

## Quick Start

```tsx
// 1. Import tokens (for JS logic / dynamic styles)
import { designSystem } from '@/lib/designSystem';

// 2. Import animations (for GSAP effects)
import { animations } from '@/lib/animations';

// 3. Import components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// 4. Use CSS variables anywhere (no import needed)
// var(--color-primary-700), var(--spacing-lg), var(--radius-md), etc.
```

---

## Colors

### CSS Variables (use these in styles)

| Token | Light | Dark | When to use |
|-------|-------|------|-------------|
| `--color-primary-700` | `#1a6b4a` | `#a8d1bd` | Primary buttons, links, brand elements |
| `--color-primary-600` | `#2d9966` | `#52b380` | Hover states, secondary brand |
| `--color-primary-50` | `#e8f4ef` | `#082b1f` | Subtle backgrounds, hover fills |
| `--color-primary-200` | `#a8d1bd` | `#1a6b4a` | Light accents, selected states |
| `--bg-page` | `#f9f8f6` | `#1a1916` | Page background |
| `--bg-surface` | `#f0ede8` | `#2c2c2a` | Cards, panels, elevated surfaces |
| `--text-primary` | `#1a1916` | `#f9f8f6` | Headings, body text |
| `--text-secondary` | `#5a5850` | `#d0ccc2` | Descriptions, labels |
| `--text-tertiary` | `#b8b3a8` | `#8a8680` | Placeholders, captions |
| `--border-default` | `#e0dcd4` | `#3d3d3a` | Card borders, dividers |
| `--color-semantic-success` | `#2d9966` | `#52b380` | Success alerts, confirmations |
| `--color-semantic-warning` | `#b35c00` | `#d4903a` | Warning messages |
| `--color-semantic-error` | `#a02020` | `#d44040` | Error states, destructive actions |
| `--color-semantic-info` | `#1a4580` | `#4a7acc` | Info badges, help text |

### Secondary Accents

| Token | Value | When to use |
|-------|-------|-------------|
| `--color-secondary-teal` | `#006580` | Telemedicine features |
| `--color-secondary-blue` | `#1a4580` | Information, links |
| `--color-secondary-gold` | `#7a5c00` | Premium features, ratings |
| `--color-secondary-coral` | `#d85a30` | Urgent notifications |

---

## Typography

Headings and body text are set globally in `globals.css`. No extra classes needed.

```html
<h1>Page Title</h1>        <!-- 32px, semibold, -0.02em -->
<h2>Section Title</h2>     <!-- 24px, semibold, -0.01em -->
<h3>Subsection</h3>        <!-- 20px, medium -->
<h4>Card Title</h4>        <!-- 16px, medium -->
<p>Body text</p>            <!-- 14px, regular -->
<small>Caption</small>      <!-- 12px, secondary color -->
```

### Fonts

| Variable | Stack | Usage |
|----------|-------|-------|
| `--font-sans` | Inter, system | Primary — all UI text |
| `--font-serif` | Merriweather | Rare — patient testimonials |
| `--font-mono` | Fira Code | Code, IDs, data values |

---

## Spacing

Based on a **4px grid**. Use CSS variables:

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 4px | Icon gaps, tight padding |
| `--spacing-sm` | 8px | Between related elements |
| `--spacing-md` | 12px | Default component padding |
| `--spacing-lg` | 16px | Section padding, card padding |
| `--spacing-xl` | 24px | Between sections |
| `--spacing-2xl` | 32px | Major section gaps |
| `--spacing-3xl` | 48px | Page-level spacing |

---

## Components

### Button

```tsx
import { Button } from '@/components/ui/Button';

// Variants
<Button variant="primary">Book Appointment</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete Account</Button>
<Button variant="ghost">Learn More</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Processing...</Button>
<Button disabled>Unavailable</Button>

// With onClick
<Button variant="primary" onClick={() => handleSubmit()}>
  Submit
</Button>
```

**When to use which variant:**

| Variant | Use for |
|---------|---------|
| `primary` | Main CTA: "Book", "Submit", "Confirm", "Sign up" |
| `secondary` | Secondary actions: "Cancel", "Back", "View Details" |
| `danger` | Destructive: "Delete", "Remove", "Revoke" |
| `ghost` | Tertiary: "Learn more", "Skip", inline actions |

---

### Input

```tsx
import { Input } from '@/components/ui/Input';

// Default
<Input label="Email" placeholder="arbin@example.com" required />

// Error with shake
<Input
  label="Email"
  variant="error"
  errorMessage="Invalid email address"
  shake={hasError}
/>

// Success
<Input
  label="Email"
  variant="success"
  successMessage="Email is available"
/>

// Password with toggle
<Input
  label="Password"
  type="password"
  showPasswordToggle
  required
/>

// With helper text
<Input
  label="Phone"
  type="tel"
  helperText="We'll never share your phone number"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Visual state |
| `label` | `string` | — | Label above input |
| `helperText` | `string` | — | Helper text below input |
| `errorMessage` | `string` | — | Error text (shown when variant is error) |
| `successMessage` | `string` | — | Success text (shown when variant is success) |
| `showPasswordToggle` | `boolean` | `false` | Eye icon toggle for password fields |
| `shake` | `boolean` | `false` | Trigger shake animation |
| `wrapperClassName` | `string` | — | Class on outer wrapper |

---

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

// Default card (hover lift)
<Card variant="default">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Elevated (pre-shadowed, no border)
<Card variant="elevated">
  <CardContent>Premium content</CardContent>
</Card>

// Static (no hover)
<Card hoverable={false}>
  <CardContent>Info panel</CardContent>
</Card>

// With entrance animation
<Card animate>
  <CardContent>Fades in on mount</CardContent>
</Card>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated'` | `'default'` | Visual style |
| `hoverable` | `boolean` | `true` | Enable hover lift |
| `animate` | `boolean` | `false` | Fade-in on mount |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Inner padding |

---

## Animations

```tsx
import { animations } from '@/lib/animations';

// In a component with useEffect:
useEffect(() => {
  if (!ref.current) return;

  // Entrance animations (run once)
  animations.fadeIn(ref.current);
  animations.slideUp(ref.current, 0.1);  // 0.1s delay
  animations.scaleIn(ref.current);

  // Stagger children (lists, grids)
  animations.staggerChildren(containerRef.current, 0.08);

  // Hover effects (return cleanup!)
  const cleanup = animations.buttonHover(ref.current);
  return cleanup;
}, []);
```

### Available Animations

| Function | Duration | Use for |
|----------|----------|---------|
| `fadeIn(el, delay?)` | 0.3s | General entrance |
| `slideUp(el, delay?)` | 0.4s | Cards, content blocks |
| `slideDown(el, delay?)` | 0.4s | Dropdowns, menus |
| `scaleIn(el, delay?)` | 0.3s | Modals, popovers |
| `staggerChildren(container, stagger?)` | 0.4s each | Lists, grids |
| `buttonHover(el)` | 0.2s | Buttons (scale 1.02) |
| `cardHover(el)` | 0.3s | Cards (lift -4px) |
| `success(el)` | 0.6s | Success feedback (elastic) |
| `shake(el)` | 0.3s | Error feedback |
| `spin(el)` | 1s loop | Loading spinners |
| `pulse(el)` | 1.5s loop | Skeleton loading |
| `toastSlideIn(el)` | 0.3s | Toast notifications |
| `toastSlideOut(el)` | 0.3s | Toast dismiss |
| `modalScaleIn(el)` | 0.3s | Modal entrance |
| `overlayFadeIn(el)` | 0.2s | Backdrop overlay |

> **Important:** `buttonHover` and `cardHover` return cleanup functions. Always return them from `useEffect`.

---

## Shadows

Use CSS variables:

```css
box-shadow: var(--shadow-sm);    /* Subtle: inputs, small cards */
box-shadow: var(--shadow-md);    /* Default: cards, dropdowns */
box-shadow: var(--shadow-lg);    /* Elevated: modals, popovers */
box-shadow: var(--shadow-xl);    /* Hero: floating elements */
box-shadow: var(--shadow-focus); /* Focus rings on inputs */
```

---

## Border Radius

```css
border-radius: var(--radius-sm);   /* 4px — tags, badges */
border-radius: var(--radius-md);   /* 8px — buttons, inputs */
border-radius: var(--radius-lg);   /* 12px — cards, panels */
border-radius: var(--radius-xl);   /* 16px — modals, hero sections */
```

---

## Dark Mode

Dark mode is **automatic** — no toggle needed. It follows `prefers-color-scheme: dark`.

**How it works:**
- All CSS variables auto-invert via the `@media (prefers-color-scheme: dark)` block in `globals.css`
- Use CSS variables (`var(--color-primary-700)`) instead of hardcoded hex values
- Never hardcode `#1a6b4a` directly — always use the variable

**Testing dark mode:**
- macOS: System Settings → Appearance → Dark
- DevTools: Rendering → Emulate `prefers-color-scheme: dark`

---

## Sprint Usage Guide

### Sprint 1 — Doctor Onboarding & Profiles

| Component | Where |
|-----------|-------|
| `Button primary` | "Complete Profile", "Save Changes" |
| `Button secondary` | "Skip for Now", "Back" |
| `animations.slideUp` | Form step transitions |
| `animations.staggerChildren` | Specialty selection grid |
| `--color-secondary-gold` | Verified doctor badge |
| `--shadow-md` | Profile cards |

### Sprint 2 — Appointments & Booking

| Component | Where |
|-----------|-------|
| `Button primary` | "Book Now", "Confirm" |
| `Button danger` | "Cancel Appointment" |
| `animations.scaleIn` | Booking confirmation modal |
| `animations.success` | Payment success animation |
| `animations.shake` | Validation errors |
| `--color-semantic-success` | Confirmed status |
| `--color-semantic-warning` | Pending status |
| `--color-secondary-teal` | Telemedicine badge |

### Sprint 3 — Telemedicine & Messaging

| Component | Where |
|-----------|-------|
| `Button ghost` | In-chat actions |
| `animations.toastSlideIn` | New message notification |
| `animations.modalScaleIn` | Video call modal |
| `animations.pulse` | "Doctor is typing..." indicator |
| `--color-secondary-teal` | Video call UI accents |
| `--color-secondary-blue` | Chat bubbles |

---

## File Map

```
lib/
  designSystem.ts      ← Token definitions (JS object)
  animations.ts        ← GSAP animation helpers (fromTo pattern)

app/
  globals.css          ← CSS variables, dark mode, base styles
  layout.tsx           ← Root layout with PageTransition wrapper
  page.tsx             ← Landing page (animated hero + stagger)
  design/page.tsx      ← /design showcase route
  auth/login/page.tsx  ← Login page
  auth/signup/page.tsx ← Signup page
  patient/page.tsx     ← Patient dashboard (stagger stats)
  doctor/page.tsx      ← Doctor dashboard (stagger stats)

components/
  ui/
    Button.tsx         ← Button component + CSS module
    Input.tsx          ← Input component + CSS module
    Card.tsx           ← Card component + CSS module
  shared/
    PageTransition.tsx ← GSAP fadeIn wrapper for layout
    DashboardLayout.tsx ← Dashboard shell with fadeIn
  dashboard/
    DashboardContent.tsx ← Animated dashboard panels
  design/
    DesignTokens.tsx   ← Token showcase component
```

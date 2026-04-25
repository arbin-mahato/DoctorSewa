# DoctorSewa v2 — Complete Design Specification

**Project:** Healthcare Telemedicine Platform  
**Version:** 2.0  
**Status:** Design-First (Ready for Stitch MCP Generation)  
**Last Updated:** 2024  

---

## Table of Contents
1. [Design System](#design-system)
2. [Sprint 0: Foundation](#sprint-0-foundation)
3. [Sprint 1: Authentication](#sprint-1-authentication)
4. [Sprint 2: Doctor Profiles](#sprint-2-doctor-profiles)
5. [Sprint 3: Appointments & Payments](#sprint-3-appointments--payments)
6. [Component Library](#component-library)
7. [Animation Library](#animation-library)
8. [Responsive Design](#responsive-design)
9. [Accessibility Guidelines](#accessibility-guidelines)

---

## Design System

### Brand Identity
- **Name:** DoctorSewa
- **Tagline:** "Affordable Healthcare at Your Fingertips"
- **Primary Use:** Connecting patients with qualified doctors for online consultations
- **Tone:** Professional, Trustworthy, Accessible, Friendly
- **Emotion:** Healthcare trust + modern technology simplicity

### Color Palette

#### Primary Colors
```
Primary Green (Trust, Healthcare)
  50:   #e8f4ef  (lightest, hover backgrounds)
  100:  #d0e8de
  200:  #a8d1bd  (light accents)
  400:  #52b380  (mid-tone, interactive)
  600:  #2d9966  (semi-bold, secondary actions)
  700:  #1a6b4a  (main primary, buttons, headers)
  800:  #0f4a32
  900:  #082b1f  (darkest)
```

#### Secondary Colors (Accent)
```
Teal:   #006580  (secondary actions, links)
Blue:   #1a4580  (info, secondary UI)
Gold:   #7a5c00  (premium, highlights)
Coral:  #d85a30  (special features, highlights)
```

#### Semantic Colors
```
Success: #2d9966  (confirmations, positive actions)
Warning: #b35c00  (alerts, cautions)
Error:   #a02020  (errors, destructive actions)
Info:    #1a4580  (information, notifications)
```

#### Neutral Colors (Backgrounds, Text, Borders)
```
50:    #f9f8f6  (page background, lightest)
100:   #f0ede8  (surface, cards background)
200:   #e0dcd4  (border, subtle)
300:   #d0ccc2  (border default)
400:   #b8b3a8  (text tertiary, hints)
500:   #8a8680  (text secondary, muted)
600:   #5a5850  (text primary, body)
700:   #3d3d3a  (text strong)
800:   #2c2c2a
900:   #1a1916  (darkest text)
```

#### Dark Mode (Auto-inverted)
- All colors automatically invert using CSS variables
- No manual dark mode design needed
- Uses `prefers-color-scheme: dark` media query

### Typography System

#### Font Families
```
Primary:   Inter, -apple-system, BlinkMacSystemFont, sans-serif  (body, UI)
Secondary: Merriweather, serif  (headings for premium feel)
Mono:      Fira Code, monospace  (code, technical text)
```

#### Font Sizes & Hierarchy
```
Display (32px, 600 weight, line-height 1.2)
  Usage: Main page headers, hero titles
  Example: "Find Your Doctor"

Heading 1 (24px, 600 weight, line-height 1.3)
  Usage: Section titles
  Example: "Available Doctors"

Heading 2 (20px, 500 weight, line-height 1.4)
  Usage: Subsection titles, card headers
  Example: "Dr. John Smith"

Heading 3 (16px, 500 weight, line-height 1.5)
  Usage: Form labels, list item titles
  Example: "Select Appointment Date"

Body (14px, 400 weight, line-height 1.6)
  Usage: Default content, paragraphs
  Example: "Description text, appointments details"

Small (12px, 400 weight, line-height 1.5)
  Usage: Captions, secondary info, badges
  Example: "2 hours ago", "New Delhi"

Tiny (11px, 400 weight, line-height 1.4)
  Usage: Hints, metadata
  Example: "Required field"
```

#### Font Weights
- **400:** Regular (body, default)
- **500:** Medium (semi-bold, form labels, button text)
- **600:** Semibold (headings, titles)
- *Note: Never use 700+, feels too heavy*

### Spacing System (4px Base Grid)

```
xs:    4px   (minimal gaps, tight components)
sm:    8px   (small gaps, button padding)
md:    12px  (default gap, form spacing)
lg:    16px  (standard padding, section gaps)
xl:    24px  (large padding, container gaps)
2xl:   32px  (extra large, major sections)
3xl:   48px  (between major blocks)
```

#### Application Rules
- **Component internal padding:** lg (16px)
- **Button padding:** sm vertical (8px), lg horizontal (16px)
- **Input padding:** sm (8px)
- **Card padding:** lg (16px) - xl (24px)
- **Page margins:** xl (24px)
- **Component gaps (flex/grid):** md (12px) - lg (16px)

### Border Radius
```
sm:   4px   (subtle, form elements)
md:   8px   (default, buttons, inputs)
lg:   12px  (cards, modals, larger elements)
xl:   16px  (premium, large cards)
full: 9999px (circles, pills)
```

### Shadows (Minimal, Only When Needed)

```
sm:   0 1px 2px rgba(0, 0, 0, 0.05)        (subtle hover)
md:   0 4px 6px rgba(0, 0, 0, 0.1)         (card hover, modals)
lg:   0 10px 15px rgba(0, 0, 0, 0.1)       (elevated, important)
xl:   0 20px 25px rgba(0, 0, 0, 0.15)      (premium elements)
focus: 0 0 0 3px rgba(26, 107, 74, 0.1)    (focus ring, primary color)
```

### Design Principles
1. **Whitespace > Content** — Don't fill every corner
2. **Color = Meaning** — Not arbitrary, semantic use
3. **Motion = Clarity** — Animations help understanding
4. **Trust First** — Healthcare demands professional simplicity
5. **Mobile Native** — Design for 375px first, scale up
6. **Accessibility Always** — WCAG AA compliance minimum
7. **Consistency** — Same component = same behavior everywhere

---

## Sprint 0: Foundation

### Overview
Sprint 0 establishes the visual foundation, design system, and basic page layouts.

### Screens

#### 0.1 Landing/Home Page
**Path:** `/`  
**Role:** Public (unauthenticated)  
**Purpose:** Welcome screen, feature showcase, call-to-action to signup/login

**Layout:**
```
+──────────────────────────────────────+
|         Navigation Bar              |
| Logo | Features | About | [Login]   |
+──────────────────────────────────────+

+──────────────────────────────────────+
|         HERO SECTION                |
|   "Healthcare at Your Fingertips"   |
|  "Connect with verified doctors"    |
|                                     |
|   [Get Started →] [Learn More]      |
+──────────────────────────────────────+

+──────────────────────────────────────+
|      FEATURE CARDS (3-column)       |
|                                     |
| [Card 1: Online Consultations]      |
| [Card 2: Verified Doctors]          |
| [Card 3: Affordable Fees]           |
+──────────────────────────────────────+

+──────────────────────────────────────+
|         TESTIMONIALS                |
| Scroll: 3 testimonial cards         |
+──────────────────────────────────────+

+──────────────────────────────────────+
|          FOOTER                     |
| Links, socials, copyright           |
+──────────────────────────────────────+
```

**Components:**
- Navbar: logo, nav links, auth buttons (login/signup)
- Hero section: background image/gradient, headline, subheadline, CTA buttons
- Feature cards: icon, title, description
- Testimonial cards: avatar, name, title, quote, rating
- Footer: links, copyright

**Animations:**
- Page entrance: fadeIn (0.3s) on load
- Hero section: slideUp (0.4s) with 0.1s delay
- Feature cards: stagger fadeIn (0.15s per card)
- On scroll: parallax hero image (continuous)
- CTA buttons: hover scale (1.02, 0.2s)

**Responsiveness:**
- Mobile (375px): Stacked layout, single column, full-width buttons
- Tablet (768px): 2-column feature cards, hero side-by-side text
- Desktop (1024px+): 3-column feature cards, full-width hero

**States:**
- Logged out: Show "Login" and "Sign Up" buttons
- Logged in: Show "Dashboard" button instead

---

#### 0.2 Base Layout Template
**Used by:** All authenticated pages (patients, doctors, admin)  
**Components:**

**Header:**
```
+──────────────────────────────────────+
| Logo | [Search] | Notifications | [User ▼] |
+──────────────────────────────────────+
```

**Sidebar (Desktop):**
```
┌─────────────────┐
| DoctorSewa logo |
|                 |
| Dashboard       |
| Appointments    |
| Messages        |
| Profile         |
| Settings        |
|                 |
| Logout          |
└─────────────────┘
```

**Sidebar (Mobile):**
- Hamburger menu icon
- Slides from left on mobile
- Closes on route change

**Main Content:**
```
+──────────────────────────────────────+
| [Back/Breadcrumb]                    |
| [Page Title]                         |
|                                      |
| [Page Content]                       |
+──────────────────────────────────────+
```

**Animations:**
- Sidebar entrance: slideRight (0.3s)
- Sidebar hover states: subtle background color change
- Page transitions: fadeIn (0.3s)

---

## Sprint 1: Authentication

### Overview
Sprint 1 covers complete auth flows: signup, login, email verification, password reset.

### Screens

#### 1.1 Login Page
**Path:** `/auth/login`  
**Role:** Public (unauthenticated)  
**Redirect:** On success → `/patient` or `/doctor` (based on role)

**Layout:**
```
+─────────────────────────────────────────+
|                                        |
|  Left: Logo + Tagline + Illustration   |
|                                        |
|  [DoctorSewa Logo]                     |
|  "Healthcare at Your Fingertips"       |
|                                        |
|  [Illustration: doctor + patient]      |
|                                        |
|                                        |
|           Right: Form                  |
|                                        |
|  Login to Your Account                 |
|                                        |
|  Email Address                         |
|  [____________________]                |
|                                        |
|  Password                              |
|  [____________________] [👁️]          |
|                                        |
|  [ ] Remember me  [Forgot Password?]   |
|                                        |
|  [Login Button (full width)]           |
|                                        |
|  Don't have an account? [Sign Up]      |
|                                        |
+─────────────────────────────────────────+
```

**Components:**
- Input: email (type: email, validation)
- Input: password (with show/hide toggle)
- Checkbox: remember me
- Button: primary (Login)
- Link: ghost (Forgot Password?)
- Link: secondary (Sign Up)
- Alert: error message (if login fails)
- Loading: spinner on button during submission

**Form Validation:**
- Email: required, valid email format
- Password: required, min 6 characters
- Error messages: red text, icon, below input
- Success: toast notification slide-in from right

**Animations:**
- Page entrance: fadeIn (0.3s)
- Form: slideUp (0.4s) with 0.1s delay
- Input focus: glow border green, background tint (0.2s)
- Input error: red border, shake animation (0.3s)
- Submit button: scale down slightly on click (0.1s feedback)
- Button loading: spinner rotation (1s loop)
- Success: checkmark pulse (0.6s elastic), toast slide (0.3s)

**Responsiveness:**
- Mobile (375px): Single column, full-width inputs, logo above form
- Tablet (768px): Side-by-side layout (logo left, form right)
- Desktop (1024px+): Centered card layout with illustration

**States:**
- Default: ready to input
- Hover: button scale (1.02)
- Focus: input glow, label color change to primary
- Error: red border, error message, shake feedback
- Loading: button disabled, spinner, text changes to "Logging in..."
- Success: checkmark animation, redirect

---

#### 1.2 Signup Page
**Path:** `/auth/signup`  
**Role:** Public (unauthenticated)  
**Redirect:** On success → `/auth/verify-email?email=...`

**Layout:**
```
+─────────────────────────────────────────+
|  Left: Logo + Tagline                  |
|                                        |
|         Right: Form                    |
|                                        |
|  Create Your Account                   |
|                                        |
|  Full Name                             |
|  [____________________]                |
|                                        |
|  Email Address                         |
|  [____________________]                |
|                                        |
|  Phone Number                          |
|  [____________________]                |
|                                        |
|  Password                              |
|  [____________________] [👁️]          |
|  Strength: ▁▁▁ Weak                    |
|                                        |
|  Confirm Password                      |
|  [____________________] [👁️]          |
|                                        |
|  [ ] I accept Terms & Conditions       |
|                                        |
|  [Sign Up Button (full width)]         |
|                                        |
|  Already have an account? [Login]      |
|                                        |
+─────────────────────────────────────────+
```

**Components:**
- Input: full name
- Input: email
- Input: phone
- Input: password (with strength indicator)
- Input: confirm password
- PasswordStrength: visual meter (weak/medium/strong)
- Checkbox: terms & conditions
- Button: primary (Sign Up)
- Link: secondary (Login)

**Form Validation:**
- Name: required, min 2 characters
- Email: required, valid format, unique check (server-side)
- Phone: required, valid format (10 digits for India)
- Password: required, min 8 chars, 1 uppercase, 1 number
- Confirm: must match password
- Terms: must be checked

**Password Strength Indicator:**
```
Weak (0-6 chars): ▁▁▁ (Red #a02020)
Medium (7-10 chars, no uppercase): ▁▁▂ (Yellow #b35c00)
Strong (8+ chars, uppercase, number): ▁▂▃ (Green #2d9966)
```

**Animations:**
- Same as login page
- Password strength meter: animate fill on keypress (0.2s)
- Confirm password: show checkmark if matches (green tick, 0.4s scaleIn)

**Responsiveness:**
- Same as login

---

#### 1.3 Verify Email Page
**Path:** `/auth/verify-email?email=user@example.com`  
**Role:** Public (post-signup)  
**Redirect:** On success → `/auth/login`

**Layout:**
```
+───────────────────────────────────────+
|                                       |
|       [Email Check Icon] ✓            |
|                                       |
|  Verify Your Email                    |
|                                       |
|  We sent a 6-digit code to:           |
|  user@example.com                     |
|                                       |
|  Enter Code:                          |
|  [6] [6] [1] [2] [3] [4]             |
|   ↑ Auto-focus on input              |
|                                       |
|  [Verify Button]                      |
|                                       |
|  Didn't receive code? [Resend] (60s)  |
|                                       |
+───────────────────────────────────────+
```

**Components:**
- OTPInput: 6 separate input boxes
- Each box: auto-focus next on digit entry
- Auto-submit when all 6 digits filled
- Button: Resend (with countdown timer, disabled after click)
- Link: "Wrong email? Sign up again"

**OTP Input Behavior:**
- Single digit per box (0-9 only)
- Backspace: moves focus to previous box
- Auto-focus next box on digit entry
- Visual focus indicator (green border, shadow)
- Auto-submit when 6 digits filled

**Animations:**
- Page entrance: fadeIn (0.3s)
- Email icon: pulse animation (0.6s)
- OTP boxes: stagger fadeIn (0.1s per box)
- OTP digit entry: bounce on keypress (0.2s)
- Focus change: slide animation between boxes (0.1s)
- Resend button: fadeOut countdown text (0.3s)
- Success: checkmark bounce (0.6s)

**Responsiveness:**
- Mobile (375px): Centered layout, full-width
- Tablet+: Centered card

**States:**
- Initial: empty boxes, resend button disabled (60s countdown)
- Filled: auto-submit
- Loading: spinner, disabled inputs
- Error: shake animation, error message
- Success: checkmark animation, redirect

---

#### 1.4 Forgot Password Page
**Path:** `/auth/forgot-password`  
**Role:** Public (unauthenticated)

**Layout:**
```
+───────────────────────────────────────+
|                                       |
|  Reset Your Password                  |
|                                       |
|  Enter your email and we'll send      |
|  you a reset link                     |
|                                       |
|  Email Address                        |
|  [____________________]               |
|                                       |
|  [Send Reset Link]                    |
|                                       |
|  [← Back to Login]                    |
|                                       |
+───────────────────────────────────────+
```

**Components:**
- Input: email
- Button: primary (Send Reset Link)
- Link: secondary (Back to Login)
- Alert: success message "Check your email"

**Animations:**
- Same as login/signup
- Success message: slideUp + pulse (0.4s)

---

#### 1.5 Reset Password Page
**Path:** `/auth/reset-password?token=...`  
**Role:** Public (from email link)

**Layout:**
```
+───────────────────────────────────────+
|                                       |
|  Set New Password                     |
|                                       |
|  Enter your new password              |
|                                       |
|  New Password                         |
|  [____________________] [👁️]        |
|  Strength: ▁▁▂ Medium                 |
|                                       |
|  Confirm Password                     |
|  [____________________] [👁️]        |
|                                       |
|  [Reset Password]                     |
|                                       |
+───────────────────────────────────────+
```

**Components:**
- Input: new password (with strength meter)
- Input: confirm password
- Button: primary (Reset Password)
- Same validation as signup

**Animations:**
- Same as signup

---

## Sprint 2: Doctor Profiles

### Overview
Sprint 2 covers doctor discovery, profile management, and availability scheduling.

### Screens

#### 2.1 Doctor List Page (Patient View)
**Path:** `/patient/doctors`  
**Role:** Patient (authenticated)  
**Purpose:** Browse and filter doctors, search by specialty

**Layout:**
```
+──────────────────────────────────────+
| [Navbar] [Search] [Filters]          |
+──────────────────────────────────────+

+──────────────────────────────────────+
| Search for doctors...                |
| [_________________________]          |
|                                      |
| Filters:                             |
| Specialty [▼ All Specialties]        |
| Rating:    [★★★★★] & up             |
| [Reset Filters]                      |
+──────────────────────────────────────+

+──────────────────────────────────────+
| Showing 24 doctors                   |
|                                      |
| [Doctor Card] [Doctor Card]          |
| [Doctor Card] [Doctor Card]          |
| [Doctor Card] [Doctor Card]          |
| [Doctor Card] [Doctor Card]          |
|                                      |
| Pagination: < 1 2 3 4 >             |
+──────────────────────────────────────+
```

**Doctor Card Component:**
```
┌──────────────────────────────┐
│ [Avatar Image 120x120]       │
│                              │
│ Dr. Rajesh Kumar             │
│ Cardiologist                 │
│ New Delhi                    │
│                              │
│ ★★★★★ 4.8 (156 reviews)     │
│ 8 years experience           │
│                              │
│ Consultation: ₹500           │
│ ✓ Verified                   │
│                              │
│ [View Profile] [Book]        │
└──────────────────────────────┘
```

**Components:**
- Input: search (with debounce 300ms)
- Select: specialty filter
- RangeSlider: rating filter (1-5 stars)
- Button: reset filters (ghost variant)
- DoctorCard: clickable, shows doctor info
- Badge: specialty (teal background)
- Badge: "Verified" (green checkmark)
- Badge: rating stars (clickable to see reviews)
- Button: "View Profile" (secondary)
- Button: "Book" (primary)
- Pagination: prev/next buttons, page numbers

**Grid Layout:**
- Mobile (375px): 1 card per row, full-width
- Tablet (768px): 2 cards per row
- Desktop (1024px): 3 cards per row

**Animations:**
- Page entrance: fadeIn (0.3s)
- Search input: focus glow (0.2s)
- Filter change: list re-renders with stagger (0.1s per card)
- Doctor cards: stagger fadeIn on load (0.1s per card)
- Card hover: lift 4px, shadow expand (0.3s)
- Specialty badge: background color change on hover (0.2s)
- Pagination: fade transition between pages (0.3s)
- Filter reset: spin animation on button (0.4s)

**Responsive Behavior:**
- Mobile: filters in modal/drawer, cards full-width
- Desktop: filters in sidebar or top bar

**Loading States:**
- Card skeleton loader while fetching
- Shimmer animation on skeleton (0.8s loop)

---

#### 2.2 Doctor Detail Page
**Path:** `/patient/doctors/[id]`  
**Role:** Patient (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| [← Back] [Share]                     |
+──────────────────────────────────────+

+──────────────────────────────────────+
| [Hero Banner Image]                  |
|                                      |
| ┌──────────────────────────────────┐ |
| │ [Large Avatar 120x120]           │ |
| │                                  │ |
| │ Dr. Rajesh Kumar                 │ |
| │ Cardiologist, Apollo Hospital    │ |
| │                                  │ |
| │ ★★★★★ 4.8 (156 reviews)         │ |
| │ 8 years experience               │ |
| │                                  │ |
| │ Consultation: ₹500/30 min        │ |
| │ ✓ Verified                       │ |
| │                                  │ |
| │ [Book Appointment] [Message]     │ |
| └──────────────────────────────────┘ |
+──────────────────────────────────────+

+──────────────────────────────────────+
| ABOUT                                |
| [Doctor bio/description]             |
|                                      |
| SPECIALIZATION                       |
| Cardiology, Internal Medicine        |
|                                      |
| QUALIFICATIONS                       |
| • MBBS, AIIMS New Delhi             |
| • MD (Internal Medicine)            |
| • DM (Cardiology)                   |
|                                      |
| EXPERIENCE                           |
| 8 years | Apollo Hospital           |
|                                      |
| NEXT AVAILABLE                       |
| [Calendar: Next 7 days]              |
|                                      |
| RECENT REVIEWS                       |
| [Review 1]                           |
| [Review 2]                           |
| [Review 3]                           |
| [View All Reviews]                   |
+──────────────────────────────────────+
```

**Components:**
- HeroImage: with parallax on scroll
- Avatar: large, with verified badge
- Rating: stars + review count (clickable)
- Button: "Book Appointment" (primary, large)
- Button: "Message" (secondary)
- Button: "Call" (secondary)
- Tabs: About, Qualifications, Reviews
- Badge: verified checkmark
- Calendar: available slots (next 7 days)
- ReviewCard: reviewer avatar, name, rating, comment, date
- Link: "View All Reviews"

**Animations:**
- Page entrance: fadeIn (0.3s)
- Hero image: parallax on scroll (continuous, subtle)
- Avatar: scaleIn (0.4s)
- Section headings: slideLeft (0.3s) on scroll
- Qualifications list: stagger fadeIn (0.1s per item)
- Calendar slots: stagger scaleIn (0.08s per slot)
- Reviews: infinite scroll with lazy-load (new reviews fade in)
- CTA buttons: hover scale (1.02, 0.2s)

**Responsive:**
- Mobile: full-width, stacked sections
- Desktop: sidebar with sticky CTA buttons

**Tabs (if used):**
- About | Qualifications | Reviews
- Tab switch: slide indicator animation (0.3s)
- Tab content: fadeIn (0.3s)

---

#### 2.3 Doctor Profile Edit Page
**Path:** `/doctor/profile/edit`  
**Role:** Doctor (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| Edit Doctor Profile                  |
|                                      |
| Profile Picture                      |
| [Avatar] [Change Photo]              |
|                                      |
| Full Name                            |
| [____________________]               |
|                                      |
| Specialty                            |
| [Cardiology ▼]                       |
|                                      |
| License Number                       |
| [____________________]               |
|                                      |
| Years of Experience                  |
| [8 ▼]                                |
|                                      |
| Hospital / Clinic                    |
| [Apollo Hospital]                    |
|                                      |
| Qualifications                       |
| [MBBS, AIIMS New Delhi]              |
|                                      |
| Consultation Fee (₹)                 |
| [500]                                |
|                                      |
| Bio (About You)                      |
| [Large textarea for bio]             |
|                                      |
| [Save Changes] [Cancel]              |
+──────────────────────────────────────+
```

**Components:**
- Avatar upload: with preview
- Input: name, license, hospital, bio
- Select: specialty
- Number input: experience, fee
- Textarea: bio/about
- Button: save, cancel
- Success toast: profile updated

**Animations:**
- Avatar preview: fadeIn (0.3s)
- Form inputs: focus glow (0.2s)
- Save button: loading spinner (1s)
- Success toast: slide-in (0.3s)
- Error feedback: shake (0.3s)

---

#### 2.4 Doctor Availability Page
**Path:** `/doctor/availability`  
**Role:** Doctor (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| Manage Your Availability             |
|                                      |
| ┌──────────────────────────────────┐ |
| │ WEEKLY SCHEDULE                  │ |
| │                                  │ |
| │ Monday      [09:00-17:00]        │ |
| │ Tuesday     [09:00-17:00]        │ |
| │ Wednesday   [09:00-17:00]        │ |
| │ Thursday    [09:00-17:00]        │ |
| │ Friday      [09:00-17:00]        │ |
| │ Saturday    [OFF]                │ |
| │ Sunday      [OFF]                │ |
| │                                  │ |
| │ Slot Duration: 30 minutes ▼      │ |
| │                                  │ |
| │ [Save Schedule]                  │ |
| └──────────────────────────────────┘ |
+──────────────────────────────────────+

+──────────────────────────────────────+
| CALENDAR VIEW (Visual preview)       |
| M T W T F S S                        |
| [ ][ ][ ][ ][●][ ][ ]  (filled = set)
+──────────────────────────────────────+
```

**Components:**
- DaySlot: editable time range (start - end)
- TimePicker: for slot times
- Select: slot duration (15, 30, 45, 60 min)
- Button: save schedule
- Calendar preview: visual representation of schedule

**Animations:**
- Time input: focus glow (0.2s)
- Save button: loading spinner (1s)
- Calendar update: fade and redraw (0.3s)
- Success toast: slide-in (0.3s)

---

## Sprint 3: Appointments & Payments

### Overview
Sprint 3 covers appointment booking, payment processing (Razorpay), and appointment management.


### Screens

#### 3.1 Book Appointment - Step 1 (Date Selection)
**Path:** `/patient/book/[doctorId]`  
**Role:** Patient (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| Book Appointment with Dr. Rajesh     |
|                                      |
| ← Step 1 of 3: Select Date          |
|                                      |
| Available dates: Next 30 days       |
|                                      |
| [Calendar Grid - 30 days]            |
|                                      |
| Current selected: Mon, 15 Apr 2024   |
|                                      |
|             [Next →]                 |
+──────────────────────────────────────+
```

**Components:**
- Stepper: 1/3 indicator
- Calendar: 30-day view
  - Gray: unavailable dates (past, no slots)
  - White/default: available dates
  - Green: selected date
  - Today: highlighted with blue circle
- Button: Next (primary)
- Button: Back (ghost, hidden on first step)

**Calendar Interactions:**
- Click date: select it (highlight green)
- Hover: show available slots count
- Disabled dates: grayed out, not clickable

**Animations:**
- Page entrance: slideUp (0.4s)
- Calendar cells: stagger fadeIn (0.05s per cell)
- Date selection: pulse animation (0.3s)
- Cell hover: background tint change (0.2s)
- Next button: scale on hover (1.02, 0.2s)

---

#### 3.2 Book Appointment - Step 2 (Time Selection)
**Path:** `/patient/book/[doctorId]?step=2`

**Layout:**
```
+──────────────────────────────────────+
| Book Appointment                     |
|                                      |
| ← Step 2 of 3: Select Time          |
|                                      |
| Mon, 15 Apr 2024                     |
|                                      |
| Available Slots:                     |
| [09:00] [09:30] [10:00] [10:30]     |
| [11:00] [11:30] [12:00] [Booked]    |
| [14:00] [14:30] [15:00] [15:30]     |
| [16:00] [16:30]                     |
|                                      |
| Selected: 10:00 AM (30 mins)         |
|                                      |
| [← Back] [Next →]                    |
+──────────────────────────────────────+
```

**Components:**
- TimeSlotPill: clickable time buttons
  - White/default: available
  - Green: selected
  - Gray: booked (disabled)
- Button: Next (primary)
- Button: Back (secondary)

**Time Slot Interactions:**
- Click available: select it (highlight green)
- Hover available: background color tint (0.2s)
- Booked slots: grayed out, hover shows "Booked"
- Display: "Selected: 10:00 AM (30 mins)"

**Animations:**
- Step transition: fadeOut previous step (0.2s), fadeIn new (0.3s)
- Slots: stagger scaleIn (0.1s per row)
- Slot selection: pulse + slight scale (0.3s)
- Slot hover: background expand (0.2s)

---

#### 3.3 Book Appointment - Step 3 (Reason & Payment)
**Path:** `/patient/book/[doctorId]?step=3`

**Layout:**
```
+──────────────────────────────────────+
| Book Appointment                     |
|                                      |
| ← Step 3 of 3: Confirm & Pay        |
|                                      |
| Reason for Visit:                    |
| [Textarea: Describe your symptoms]   |
|                                      |
| ┌──────────────────────────────────┐ |
| │ APPOINTMENT SUMMARY              │ |
| │                                  │ |
| │ Dr. Rajesh Kumar                 │ |
| │ Cardiologist                     │ |
| │                                  │ |
| │ Mon, 15 Apr 2024 · 10:00 AM      │ |
| │ Duration: 30 minutes             │ |
| │                                  │ |
| │ Consultation Fee: ₹500            │ |
| │ Processing Fee:  ₹10              │ |
| │ ─────────────────────────         │ |
| │ Total:           ₹510             │ |
| └──────────────────────────────────┘ |
|                                      |
| [← Back] [Confirm & Pay →]          |
+──────────────────────────────────────+
```

**Components:**
- Textarea: reason for visit
- Card: appointment summary
- PriceBreakdown: fee + tax + total
- Button: "Confirm & Pay" (primary, large)
- Button: "Back" (secondary)

**Animations:**
- Step transition: same as Step 2
- Textarea focus: glow (0.2s)
- Summary card: slideUp entrance (0.4s)
- Price display: number counter animation (0.6s, animated digits)
- Confirm button: hover scale (1.02, 0.2s)

---

#### 3.4 Payment Modal (Razorpay)
**Triggered:** Click "Confirm & Pay" on Step 3

**Layout:**
```
┌─────────────────────────────────────┐
│ Secure Payment                      │
│ [Razorpay Logo]                     │
├─────────────────────────────────────┤
│                                     │
│ Amount: ₹510                        │
│                                     │
│ Payment Method:                     │
│ ○ Card (Credit/Debit)               │
│ ○ UPI                               │
│ ○ Wallet                            │
│ ○ Net Banking                       │
│                                     │
│ [Pay ₹510]                          │
│                                     │
│ Secured by Razorpay                 │
│ [← Cancel]                          │
└─────────────────────────────────────┘
```

**Components:**
- Razorpay checkout modal (native component)
- Amount display
- Payment method options
- Button: Pay (primary)
- Button: Cancel (ghost)

**Animations:**
- Modal entrance: scaleIn (0.4s) + backdrop fadeIn
- Modal exit: scaleOut (0.3s) + backdrop fadeOut
- Button loading: spinner (1s)
- Success: confetti celebration (0.8s)

---

#### 3.5 Payment Success Page
**Path:** `/patient/appointments/[id]?paid=true`  
**Shown:** After successful payment

**Layout:**
```
+──────────────────────────────────────+
|                                      |
|          [Confetti Animation]        |
|                                      |
|          ✓ CHECKMARK                 |
|                                      |
|  Appointment Booked Successfully!    |
|                                      |
|  Your consultation with              |
|  Dr. Rajesh Kumar is confirmed       |
|                                      |
|  Mon, 15 Apr 2024 · 10:00 AM        |
|                                      |
|  Confirmation sent to your email     |
|  and WhatsApp                        |
|                                      |
|  [View Appointment] [Home]           |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- Confetti animation (celebratory)
- Checkmark icon (large, animated)
- Appointment details summary
- Button: "View Appointment" (primary)
- Button: "Home" (secondary)

**Animations:**
- Page entrance: fadeIn (0.3s)
- Confetti: burst from center, fall (0.8s)
- Checkmark: bounce entrance (0.6s elastic)
- Text: stagger slideUp (0.1s per section)
- Buttons: scale on hover (1.02, 0.2s)

---

#### 3.6 Appointment List (Patient View)
**Path:** `/patient/appointments`  
**Role:** Patient (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| My Appointments                      |
|                                      |
| [Upcoming] | [Past] | [Cancelled]    |
|                                      |
| UPCOMING:                            |
| ┌──────────────────────────────────┐ |
| │ Dr. Rajesh Kumar                 │ |
| │ Cardiologist, Apollo Hospital    │ |
| │                                  │ |
| │ Mon, 15 Apr 2024 · 10:00 AM      │ |
| │ Duration: 30 minutes             │ |
| │                                  │ |
| │ Status: ✓ CONFIRMED (solid)      │ |
| │                                  │ |
| │ [Join Video Call] [Reschedule]   │ |
| │ [Cancel] [View Details]          │ |
| └──────────────────────────────────┘ |
|                                      |
| [More appointments...]               |
|                                      |
| PAST:                                |
| ┌──────────────────────────────────┐ |
| │ Dr. Priya Sharma                 │ |
| │ Dermatologist                    │ |
| │                                  │ |
| │ Wed, 10 Apr 2024 · 03:00 PM      │ |
| │                                  │ |
| │ Status: ✓ COMPLETED              │ |
| │                                  │ |
| │ [Get Prescription] [Leave Review]│ |
| └──────────────────────────────────┘ |
+──────────────────────────────────────+
```

**Components:**
- Tabs: Upcoming, Past, Cancelled
- AppointmentCard:
  - Doctor avatar + name
  - Specialty
  - Date, time, duration
  - Status badge (PENDING, CONFIRMED, COMPLETED, CANCELLED)
  - Action buttons (context-sensitive based on status)
- Badge: status (pulse if PENDING, solid if CONFIRMED)
- Button: "Join Video Call" (available only during appointment time)
- Button: "Reschedule" (secondary)
- Button: "Cancel" (danger)
- Button: "View Details" (ghost)
- Button: "Get Prescription" (primary, if completed)
- Button: "Leave Review" (secondary, if completed)
- EmptyState: "No upcoming appointments" with CTA

**Animations:**
- Page entrance: fadeIn (0.3s)
- Tab switch: slide indicator (0.3s)
- Tab content: crossfade (0.2s)
- Appointment cards: stagger fadeIn (0.1s per card)
- Status badge: pulse if PENDING (1.5s loop)
- Card hover: lift 4px (0.3s)
- Action buttons: scale on hover (1.02, 0.2s)

**Responsive:**
- Mobile: full-width cards, stacked actions
- Desktop: cards with side-by-side actions

**Pagination:**
- 10 appointments per page
- Pagination controls: prev/next, page numbers
- Infinite scroll option

---

#### 3.7 Appointment Detail Page
**Path:** `/patient/appointments/[id]`

**Layout:**
```
+──────────────────────────────────────+
| [← Back]                             |
| Appointment Detail                   |
|                                      |
| ┌──────────────────────────────────┐ |
| │ DOCTOR INFORMATION               │ |
| │                                  │ |
| │ [Avatar] Dr. Rajesh Kumar        │ |
| │ Cardiologist, Apollo Hospital    │ |
| │ ★★★★★ 4.8 (156 reviews)         │ |
| │                                  │ |
| │ [Call: +91-9999-999-999]         │ |
| │ [Message]                        │ |
| └──────────────────────────────────┘ |
|                                      |
| APPOINTMENT DETAILS                  |
| Date & Time: Mon, 15 Apr 2024        |
|              10:00 AM - 10:30 AM     |
| Status: ✓ CONFIRMED                  |
| Reason: Follow-up consultation       |
|                                      |
| [Join Video Call] (visible if time)  |
|                                      |
| PRESCRIPTION (if completed)          |
| [Download PDF]                       |
| [View in App]                        |
|                                      |
| [Reschedule] [Cancel]                |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- Doctor card: clickable to view profile
- Appointment details: formatted nicely
- Status badge
- Action buttons: context-sensitive
- Prescription section: (if available)
- Prescription button: download PDF

**Animations:**
- Page entrance: slideUp (0.4s)
- Doctor card: scaleIn (0.4s)
- Appointment details: stagger slideUp (0.08s per item)
- Button hover: scale (1.02, 0.2s)

---

#### 3.8 Doctor Appointments Queue
**Path:** `/doctor/appointments`  
**Role:** Doctor (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| My Appointments                      |
|                                      |
| [Pending] | [Today] | [Upcoming]     |
|                                      |
| PENDING QUEUE: (2 bookings)          |
| ┌──────────────────────────────────┐ |
| │ ⚠️ John Doe (Patient)             │ |
| │ Age: 45 | Male                   │ |
| │                                  │ |
| │ Reason: Chest pain               │ |
| │ Medical History: Hypertension    │ |
| │                                  │ |
| │ Appointment Time:                │ |
| │ Mon, 15 Apr 2024 · 10:00 AM      │ |
| │                                  │ |
| │ [Accept] [Decline]               │ |
| └──────────────────────────────────┘ |
|                                      |
| [Another pending appointment]        |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- Tabs: Pending, Today, Upcoming
- AppointmentCard (doctor view):
  - Patient avatar + name
  - Age, gender
  - Reason for visit
  - Medical history (if available)
  - Appointment time
  - Action buttons: Accept, Decline, Reschedule
- Badge: "PENDING" (urgent styling)
- Alert: count of pending appointments
- Button: Accept (primary, green)
- Button: Decline (danger, red)

**Animations:**
- Page entrance: fadeIn (0.3s)
- Pending appointments: stagger slideUp (0.1s per card)
- Accept button: success checkmark (0.6s)
- Decline: fade out (0.3s)
- Tab switch: slide indicator (0.3s)

**States:**
- Pending: awaiting doctor action
- Accept → confirmation toast + card fades
- Decline → asks for reason → confirmation

---

---

## Sprint 4: Real-Time Chat

### Overview
Sprint 4 covers real-time messaging between patients and doctors using Socket.io and Express backend.

### Screens

#### 4.1 Chat Inbox (Patient View)
**Path:** `/patient/chat`  
**Role:** Patient (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| Messages                             |
|                                      |
| Search: [Search conversations...]    |
|                                      |
| ┌──────────────────────────────────┐ |
| │ [Avatar] Dr. Rajesh Kumar        │ |
| │ Last message: "Take these meds..."│ |
| │ 2:30 PM · 1 unread               │ |
| │ ● Online                         │ |
| └──────────────────────────────────┘ |
|                                      |
| ┌──────────────────────────────────┐ |
| │ [Avatar] Dr. Priya Sharma        │ |
| │ Last message: "Your report is..." │ |
| │ Yesterday · read                 │ |
| │ ● Offline                        │ |
| └──────────────────────────────────┘ |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- Input: search conversations (debounce 300ms)
- ConversationCard: clickable chat preview
  - Doctor avatar + name
  - Last message preview (truncated)
  - Timestamp
  - Unread badge (red dot, count if >1)
  - Online/offline status (green/gray dot)
- Empty state: "No conversations yet"
- FAB button: "New Message" (if needed)

**Animations:**
- Page entrance: fadeIn (0.3s)
- Conversation cards: stagger slideUp (0.1s per card)
- Unread badge: pulse animation (1.5s loop)
- Online status: subtle pulse (2s loop)
- Search results: fade transition (0.2s)

**Responsiveness:**
- Mobile: full-width card list
- Tablet: sidebar conversations + main area for selected chat
- Desktop: 2-column layout (conversations left, chat right)

**Infinite Scroll:**
- Load 10 conversations per page
- Auto-load on scroll to bottom

---

#### 4.2 Chat Thread (Conversation)
**Path:** `/patient/chat/[doctorId]`

**Layout:**
```
+──────────────────────────────────────+
| [← Back] Dr. Rajesh Kumar [Info ℹ️]  |
| ● Online                             |
+──────────────────────────────────────+

+──────────────────────────────────────+
| [Chat Messages Area - scrollable]    |
|                                      |
| [Today - divider]                    |
|                                      |
| Doctor: "Hello, how are you?"        |
| 10:30 AM                             |
|                                      |
| Patient: "I'm doing better..."       |
| 10:35 AM                             |
|                                      |
| Doctor: "Great! Take medicine..."    |
| [Prescription PDF link] ↓            |
| 10:40 AM                             |
|                                      |
| Doctor: "typing..." ✍️               |
|                                      |
+──────────────────────────────────────+

+──────────────────────────────────────+
| [Input: Type message...] [📎] [Send] |
+──────────────────────────────────────+
```

**Components:**
- Header: doctor name, online status, info button
- MessageBubble: message text, timestamp, read receipt
  - Patient messages: right-aligned, green background
  - Doctor messages: left-aligned, gray background
  - Sent indicator: checkmark (pending), double checkmark (sent), blue (read)
- TypingIndicator: "Doctor is typing..." with dot animation
- DateDivider: "Today", "Yesterday", "2 days ago"
- Input: message text (auto-grow textarea)
- Button: send (icon only, disabled if empty)
- Button: attachment (📎, for file upload)
- FilePreview: if file attached (name, size, type)
- PresenceIndicator: online/offline status + last seen

**Message Interactions:**
- Long-press/right-click: copy, delete (if yours), report
- Tap message: show timestamp
- Links: clickable
- Images: lightbox preview

**Animations:**
- Page entrance: slideUp (0.4s)
- New message appears: slideUp + fadeIn (0.3s)
- Typing indicator: dot pulse animation (0.4s per dot)
- Message sent: bounce (0.4s)
- Read receipt: blue checkmark fadeIn (0.2s)
- Online status: dot pulse (subtle, 2s)
- Input focus: border glow (0.2s)

**Responsiveness:**
- Mobile: full-width chat, keyboard aware
- Tablet: side-by-side layout
- Desktop: larger message area

**Loading States:**
- Message skeleton while loading
- Shimmer animation on skeleton

---

#### 4.3 Chat Doctor View
**Path:** `/doctor/chat`

**Same as patient view but:**
- Shows all patients (instead of doctors)
- Can initiate consultation from chat
- Can send prescriptions/files directly
- Priority: PENDING appointments (unconfirmed) show first

---

### Chat Features

**Real-Time Socket.io Events:**
```
Events:
- message:send → new message added
- message:read → update read receipts
- typing:start → show "typing..." indicator
- typing:stop → hide indicator
- presence:online → user came online
- presence:offline → user went offline
- file:upload → file added to chat
```

**7-Day Auto-Unlock:**
- Chat unlocked automatically 7 days after consultation
- Countdown timer shown if locked

**Notifications:**
- New message: badge on chat icon + bell notification
- Push notification (if enabled): "Dr. X sent a message"
- Sound: ding (muted if in app)

---

## Sprint 5: Video Consultation

### Overview
Sprint 5 covers live video consultations using Daily.co API integration.

### Screens

#### 5.1 Video Consultation Room
**Path:** `/patient/consultation/[roomId]`  
**Path:** `/doctor/consultation/[roomId]`  
**Role:** Both patient & doctor (authenticated, appointment time)

**Layout:**
```
+──────────────────────────────────────+
| [Video Feed Area - 80% of screen]    |
| ┌──────────────────────────────────┐ |
| │  [Doctor Video - Large]          │ |
| │                                  │ |
| │  Dr. Rajesh Kumar                │ |
| │                                  │ |
| │              [Patient small -    │ |
| │               top-right corner]  │ |
| └──────────────────────────────────┘ |
|                                      |
| [Call Duration: 14:32]               |
|                                      |
| [🎙️] [📹] [📞] [☰ More]             |
| Mute  Video End    Menu              |
+──────────────────────────────────────+

Doctor Side (Prescription Panel):
+──────────────────────────────────────+
| [Video Feed]                         |
|                                      |
| PRESCRIPTION PANEL (Right Sidebar)   |
| ┌──────────────────────────────────┐ |
| │ Diagnosis:                       │ |
| │ [Text input for diagnosis]       │ |
| │                                  │ |
| │ Medications:                     │ |
| │ + Add Medication                 │ |
| │ ├─ Aspirin 500mg                │ |
| │ │  Twice daily, 7 days           │ |
| │ └─ Paracetamol 650mg            │ |
| │    Thrice daily, 5 days          │ |
| │                                  │ |
| │ Advice:                          │ |
| │ [Textarea]                       │ |
| │                                  │ |
| │ Follow-up: [Date selector]       │ |
| │                                  │ |
| │ [Save & Send]                    │ |
| └──────────────────────────────────┘ |
+──────────────────────────────────────+
```

**Components:**
- VideoFeed: Daily.co embedded player
- ParticipantVideo: main video + small participant
- CallControls: mute, video, end call buttons
- CallTimer: elapsed time HH:MM:SS
- PrescriptionPanel (doctor only): diagnosis, meds, advice, follow-up
- MedicationInput: medication name, dosage, frequency, duration
- Button: "Save & Send Prescription"
- Menu: more options (screen share, settings, help)

**Call Control Interactions:**
- Mute button: toggles microphone (gray when muted)
- Video button: toggles camera (gray when off)
- End call: confirmation modal "Are you sure?"
- More menu: screen share, report issue, settings

**Animations:**
- Room entrance: fadeIn (0.3s)
- Video loaded: slideUp (0.3s)
- Control button hover: scale (1.1, 0.2s)
- Control button click: pulse feedback (0.2s)
- Prescription send: success toast (0.3s)

**Timer Display:**
```
Format: HH:MM:SS
Update: every second (no animation jank)
Position: top-center overlay
Font: monospace, readable at distance
```

**Responsiveness:**
- Mobile: full-width video, controls at bottom
- Tablet: side-by-side (video + prescription panel)
- Desktop: large video area with sidebar prescription panel

---

#### 5.2 End-Call Screen
**Path:** `/patient/consultation/[roomId]/end`

**Layout:**
```
+──────────────────────────────────────+
|                                      |
|   Consultation Ended                 |
|                                      |
|   Duration: 14:32                    |
|   Dr. Rajesh Kumar                   |
|                                      |
|   ✓ Prescription sent to your email  |
|                                      |
|   [Download PDF]                     |
|   [View in App]                      |
|                                      |
|   [Rate Doctor]                      |
|   ★★★★★ (optional)                   |
|                                      |
|   [Go to Appointments]               |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- Call summary: duration, doctor name
- Prescription status
- Download PDF button
- Rating stars (optional)
- Navigation button

**Animations:**
- Screen entrance: slideUp (0.4s)
- Checkmark: bounce (0.6s)
- Rating stars: fill animation on hover (0.2s)

---

## Sprint 6: AI Features

### Overview
Sprint 6 covers AI-powered features: symptom checker, AI assistant for doctors, smart appointment suggestions.

### Screens

#### 6.1 AI Symptom Checker (Public)
**Path:** `/symptoms`  
**Role:** Public (no authentication required)

**Layout:**
```
+──────────────────────────────────────+
| AI Symptom Checker                   |
| "Describe your symptoms in detail"   |
|                                      |
| [Textarea: "I have chest pain..."]   |
| Placeholder: "Be specific about...   |
|                                      |
| [Check Symptoms →]                   |
|                                      |
| [Sample: Chest pain, Cough, Fever]   |
+──────────────────────────────────────+

RESULTS:
+──────────────────────────────────────+
| Possible Conditions (AI Analysis)    |
|                                      |
| ⚠️ Urgency: HIGH - Seek immediate   |
|    medical attention                 |
|                                      |
| Possible Conditions:                 |
| 1. Myocardial Infarction (45%)       |
| 2. Angina (30%)                      |
| 3. Gastric Issues (15%)              |
|                                      |
| Recommended Specialty:               |
| Cardiology                           |
|                                      |
| ⚕️ Disclaimer: This is not medical  |
| advice. Please consult a doctor.    |
|                                      |
| [Find Cardiologist] [Chat Support]   |
+──────────────────────────────────────+
```

**Components:**
- Textarea: symptom input
- Button: "Check Symptoms"
- Loading state: spinner + "Analyzing..."
- ResultCard: condition name, percentage, description
- UrgencyBadge: HIGH (red), MEDIUM (yellow), LOW (green)
- SpecialtyButton: "Find [Specialty] Doctor"
- DisclaimerAlert: important notice
- SamplePills: quick samples to click

**AI Response Format:**
```json
{
  "urgency": "HIGH",
  "conditions": [
    {
      "name": "Myocardial Infarction",
      "probability": 45,
      "description": "Heart attack risk"
    }
  ],
  "recommendedSpecialty": "Cardiology",
  "disclaimer": "This is AI analysis, not medical advice"
}
```

**Animations:**
- Page entrance: fadeIn (0.3s)
- Input focus: glow (0.2s)
- Submit button: loading spinner (1s)
- Results appear: slideUp (0.4s)
- Condition cards: stagger fadeIn (0.1s per card)
- Urgency badge: pulse if HIGH (1s loop)

---

#### 6.2 Patient Private Symptom Checker
**Path:** `/patient/symptom-checker`  
**Role:** Patient (authenticated)

**Same as public version but:**
- Saves history in `PatientProfile`
- Shows past queries
- Recommendations saved to profile
- Can directly book doctor from results

**Layout addition:**
```
HISTORY:
[Query 1 - 2 days ago] [Query 2 - 1 week ago]
All results stored, accessible anytime
```

---

#### 6.3 Doctor AI Assistant
**Path:** `/doctor/ai-assistant`  
**Role:** Doctor (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| AI Assistant for Doctors             |
|                                      |
| PRESCRIPTION DRAFTER                 |
| Patient: John Doe (45M)              |
| Condition: Hypertension              |
|                                      |
| Draft Prescription:                  |
|                                      |
| [AI suggests medications based on    |
|  history, drug interactions, etc.]   |
|                                      |
| Amlodipine 5mg                       |
| Lisinopril 10mg                      |
| Atorvastatin 20mg                    |
|                                      |
| [✓ Accept] [Edit] [Regenerate]       |
|                                      |
| DRUG INTERACTION CHECK               |
| ✓ No major interactions detected     |
|                                      |
| PATIENT HISTORY SUMMARY              |
| • Allergies: Penicillin              |
| • Previous meds: Aspirin             |
| • Conditions: Type 2 Diabetes        |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- PatientContext: basic patient info
- PrescriptionDrafter: AI suggestions
- DrugInteractionChecker: warnings if any
- HistorySummary: patient allergies, conditions
- Button: Accept, Edit, Regenerate
- MedicationCard: editable medication details

**Animations:**
- AI suggestions: typewriter effect (stagger text appearance)
- Interaction warning: shake + red highlight (0.3s)
- Accept action: success toast (0.3s)

---

#### 6.4 Smart Appointment Suggestion
**Feature:** When patient searches for doctor, AI suggests best match

**Algorithm:**
```
Input: Patient symptoms + specialty
Process:
  1. Find doctors in specialty
  2. Filter by availability
  3. Score by: rating, experience, patient history match
  4. Return top 3 suggestions

Output:
  "Based on your symptoms, these doctors are recommended:"
  [Dr. A - 92% match]
  [Dr. B - 87% match]
  [Dr. C - 78% match]
```

**Display:**
```
┌────────────────────────┐
│ RECOMMENDED FOR YOU     │
│ Based on: Chest pain   │
│                        │
│ [Dr. A - 92%]          │
│ [Dr. B - 87%]          │
│ [Dr. C - 78%]          │
└────────────────────────┘
```

**Animations:**
- Suggestions appear: stagger slideIn (0.1s per card)
- Percentage: counter animation (0.4s)

---

## Sprint 7: Admin Portal

### Overview
Sprint 7 covers comprehensive admin dashboard with KPIs, user management, doctor verification, and content management.

### Screens

#### 7.1 Admin Dashboard
**Path:** `/admin`  
**Role:** Admin (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| Admin Dashboard                      |
| [Date Range Picker] [Refresh]        |
+──────────────────────────────────────+

+──────────────────────────────────────+
| KEY PERFORMANCE INDICATORS           |
|                                      |
| [Card 1: Total Users]  [Card 2: Revenue]
| 12,450                 ₹2,34,560
| ↑ 12% this month       ↑ 8% this week
|                                      |
| [Card 3: Appointments] [Card 4: Doctors]
| 4,230                  850
| ↑ 5% this week         ↑ 3% this month
|                                      |
+──────────────────────────────────────+

+──────────────────────────────────────+
| REVENUE TREND (Line Chart)           |
| [Recharts: Monthly revenue]          |
| Jan: 2.1M  Feb: 2.3M  Mar: 2.4M     |
+──────────────────────────────────────+

+──────────────────────────────────────+
| APPOINTMENT VOLUME (Bar Chart)       |
| [Recharts: Weekly breakdown]         |
| Mon: 450  Tue: 520  Wed: 490 ...     |
+──────────────────────────────────────+

+──────────────────────────────────────+
| USER GROWTH (Line Chart)             |
| [Recharts: Monthly active users]     |
| Steady upward trend                  |
+──────────────────────────────────────+

+──────────────────────────────────────+
| SPECIALTY DEMAND (Pie Chart)         |
| [Recharts: Top 5 specialties]        |
| Cardiology: 25%                      |
| Dermatology: 18%                     |
+──────────────────────────────────────+
```

**Components:**
- KPICard: metric, value, trend (up/down %), mini chart
- LineChart (Recharts): revenue, user growth, appointments
- BarChart (Recharts): appointment volume
- PieChart (Recharts): specialty demand
- DateRangePicker: select time period
- RefreshButton: reload data

**Animations:**
- Page entrance: fadeIn (0.3s)
- KPI cards: stagger slideUp (0.1s per card)
- Chart data: animate on load (0.6s bar growth, line draw)
- Number counter: count animation (0.8s)

---

#### 7.2 Doctor Verification Queue
**Path:** `/admin/doctors/verification`

**Layout:**
```
+──────────────────────────────────────+
| Doctor Verification Queue            |
| [Pending: 12] [Approved: 234]        |
+──────────────────────────────────────+

+──────────────────────────────────────+
| PENDING DOCTORS                      |
| ┌──────────────────────────────────┐ |
| │ Dr. Amit Patel                   │ |
| │ Cardiology | MBBS Verified ✓     │ |
| │                                  │ |
| │ License: MED123456               │ |
| │ Hospital: Apollo Delhi           │ |
| │                                  │ |
| │ Documents:                       │ |
| │ [License PDF] [Certificate PDF]  │ |
| │                                  │ |
| │ [Approve] [Request Info] [Reject]│ |
| └──────────────────────────────────┘ |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- Tabs: Pending, Approved, Rejected
- DoctorCard (admin view):
  - Doctor name, specialty, qualifications
  - License number
  - Hospital/clinic
  - Document links (PDF preview)
  - Verification status
  - Admin action buttons
- Modal: "Request Additional Info" with message
- Modal: "Reject Doctor" with reason
- Toast: success on approve/reject

**Animations:**
- Page entrance: fadeIn (0.3s)
- Doctor cards: stagger slideUp (0.1s per card)
- Approve button: success checkmark (0.6s)
- Reject button: fade out card (0.3s)
- Modal entrance: scaleIn (0.4s)

---

#### 7.3 User Management
**Path:** `/admin/users`

**Layout:**
```
+──────────────────────────────────────+
| User Management                      |
| Search: [______________]             |
| Filter: Role [Patients ▼]            |
| Status: [All ▼]                      |
+──────────────────────────────────────+

+──────────────────────────────────────+
| USERS TABLE                          |
| ┌─────────────────────────────────┐ |
| │ Name    │ Email │ Role │ Status  │ |
| ├─────────────────────────────────┤ |
| │ John D. │ j@... │ Patient │ Active│ |
| │ Rajesh  │ r@... │ Doctor  │ Active│ |
| │ Admin   │ a@... │ Admin   │ Active│ |
| │         │       │         │       │ |
| │ [Action ▼]                      │ |
| └─────────────────────────────────┘ |
|                                      |
| Pagination: < 1 2 3 >               |
+──────────────────────────────────────+
```

**Components:**
- SearchInput: real-time filter
- FilterSelect: role (patient, doctor, admin), status (active, suspended, deleted)
- DataTable: sortable columns
- ActionDropdown: view details, edit, suspend, delete
- Modal: confirm suspension/deletion with reason
- Toast: action success

**Animations:**
- Table load: skeleton shimmer (0.8s)
- Row selection: highlight (0.2s)
- Action dropdown: slideUp (0.2s)
- Delete: fade out row (0.3s)

---

#### 7.4 Appointment Logs
**Path:** `/admin/appointments`

**Layout:**
```
+──────────────────────────────────────+
| All Appointments                     |
| Filter: Status [All ▼]               |
| Date Range: [Picker] - [Picker]      |
| Search: [______________]             |
+──────────────────────────────────────+

+──────────────────────────────────────+
| APPOINTMENTS TABLE                   |
| ┌─────────────────────────────────┐ |
| │ Patient │ Doctor │ Date │ Status│ |
| ├─────────────────────────────────┤ |
| │ John D. │ Rajesh │ 15/4 │ ✓Done │ |
| │ Sarah   │ Priya  │ 16/4 │ Pending
| │ Mike    │ Rajesh │ 16/4 │ Cancel │ |
| └─────────────────────────────────┘ |
|                                      |
| Pagination: 100 per page             |
+──────────────────────────────────────+
```

**Components:**
- FilterSelect: status, date range
- SearchInput: patient/doctor name
- DataTable: sortable, paginated
- Badge: status colors (PENDING, CONFIRMED, COMPLETED, CANCELLED)

**Animations:**
- Same as user management table

---

#### 7.5 Hospital Management
**Path:** `/admin/hospitals`

**Layout:**
```
+──────────────────────────────────────+
| Hospital Management                  |
|                                      |
| [+ Add Hospital]                     |
|                                      |
| HOSPITALS LIST                       |
| ┌──────────────────────────────────┐ |
| │ Apollo Hospital                  │ |
| │ Delhi · 250+ Doctors             │ |
| │ Rating: 4.8/5                    │ |
| │                                  │ |
| │ [Edit] [Delete] [View Doctors]   │ |
| └──────────────────────────────────┘ |
+──────────────────────────────────────+
```

**Components:**
- HospitalCard: name, location, doctor count, rating
- Modal: Add/Edit Hospital form
- ActionButtons: edit, delete, view doctors

---

#### 7.6 Health Packages Management
**Path:** `/admin/packages`

**Layout:**
```
+──────────────────────────────────────+
| Health Packages                      |
|                                      |
| [+ Add Package]                      |
|                                      |
| PACKAGES                             |
| ┌──────────────────────────────────┐ |
| │ Basic Checkup - ₹999             │ |
| │ 3 consultations + 2 lab tests    │ |
| │ Status: Active                   │ |
| │                                  │ |
| │ [Edit] [Delete]                  │ |
| └──────────────────────────────────┘ |
+──────────────────────────────────────+
```

**Components:**
- PackageCard: name, price, inclusions
- Modal: Add/Edit Package
- ActionButtons: edit, delete

---

#### 7.7 Announcements & Notifications
**Path:** `/admin/announcements`

**Layout:**
```
+──────────────────────────────────────+
| Broadcast Announcements              |
|                                      |
| [+ New Announcement]                 |
|                                      |
| Target: [Patients ▼]                 |
|                                      |
| Message:                             |
| [Textarea: announcement text]        |
|                                      |
| [Send to All] [Schedule] [Draft]     |
+──────────────────────────────────────+

SENT ANNOUNCEMENTS:
┌──────────────────────────────────────┐
│ "System Maintenance" - Patients      │
│ Sent: 2 hours ago · 12.4K read       │
│                                      │
│ "New doctors available" - Patients   │
│ Sent: 1 day ago · 23.1K read         │
└──────────────────────────────────────┘
```

**Components:**
- TargetSelect: patients, doctors, admins, all
- MessageTextarea: announcement content
- Button: Send Now, Schedule (date/time picker), Draft
- AnnouncementCard: sent announcements with read count

---

#### 7.8 Review Moderation
**Path:** `/admin/reviews`

**Layout:**
```
+──────────────────────────────────────+
| Review Moderation                    |
| Filter: Status [Pending ▼]           |
+──────────────────────────────────────+

PENDING REVIEWS:
┌──────────────────────────────────────┐
│ ★★★★☆ 4/5 - "Great consultation"    │
│ Patient: John D. | Doctor: Rajesh    │
│ "The doctor was very..."             │
│                                      │
│ [Approve] [Flag] [Reject]            │
└──────────────────────────────────────┘
```

**Components:**
- ReviewCard: rating, text, patient, doctor
- ActionButtons: approve, flag, reject
- Modal: rejection reason

---

#### 7.9 Support Ticket Management
**Path:** `/admin/support`

**Layout:**
```
+──────────────────────────────────────+
| Support Tickets                      |
| Filter: Status [Open ▼]              |
+──────────────────────────────────────+

┌──────────────────────────────────────┐
│ #1234 - Payment Issue                │
│ User: John D. | Priority: High       │
│ Created: 2 hours ago                 │
│ Status: Open                         │
│                                      │
│ Message: "Payment failed but..."     │
│                                      │
│ [View Details] [Assign] [Resolve]    │
└──────────────────────────────────────┘
```

**Components:**
- TicketCard: ID, subject, priority, user, created date
- ActionButtons: view, assign, resolve

---

#### 7.10 Audit Log (Immutable)
**Path:** `/admin/audit`

**Layout:**
```
+──────────────────────────────────────+
| Audit Log                            |
| Filter: Action [All ▼]               |
+──────────────────────────────────────+

IMMUTABLE LOG:
[10:30 AM] Admin "suspend user #123"
[10:25 AM] Doctor "edit profile"
[10:20 AM] Patient "book appointment"
[10:15 AM] Admin "approve doctor #456"
```

**Components:**
- LogEntry: timestamp, user, action, details (read-only)
- Filter: action type, date range
- Pagination: 100 per page

---

#### 7.11 Admin Settings
**Path:** `/admin/settings`

**Layout:**
```
+──────────────────────────────────────+
| Admin Settings                       |
|                                      |
| COMMISSION RATES                     |
| Doctor Commission: [30] %            |
| Hospital Commission: [15] %          |
|                                      |
| API CONFIGURATION                    |
| Razorpay Key: [****...]              |
| Daily.co Key: [****...]              |
| Groq API Key: [****...]              |
|                                      |
| FEATURE FLAGS                        |
| [ ] Enable AI Features               |
| [ ] Enable Video Consultations       |
| [ ] Enable PWA                       |
|                                      |
| [Save Settings]                      |
+──────────────────────────────────────+
```

**Components:**
- NumberInput: commission rates
- SecretInput: API keys (masked)
- Checkbox: feature flags
- Button: save settings

---

## Sprint 8: Gmail + WhatsApp Integration

### Overview
Sprint 8 covers email and WhatsApp integration for notifications and communication.

### Screens

#### 8.1 Doctor Gmail Integration (In-App Gmail)
**Path:** `/doctor/gmail`  
**Role:** Doctor (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| Gmail Integration                    |
| [Connect Gmail] (if not connected)   |
+──────────────────────────────────────+

AFTER CONNECTING:

+──────────────────────────────────────+
| [📧 Inbox] [Sent] [Archive]          |
|                                      |
| Search: [Search emails...]           |
| Filter: [Unread ▼]                   |
|                                      |
| EMAIL LIST:                          |
| ┌──────────────────────────────────┐ |
| │ [Avatar] Patient: John D.        │ |
| │ "Prescription received"           │ |
| │ Yesterday · 2:30 PM              │ |
| │ ✓ Read                           │ |
| └──────────────────────────────────┘ |
|                                      |
+──────────────────────────────────────+
```

**Email Thread View:**
```
+──────────────────────────────────────+
| [← Back to Inbox]                    |
| From: John D. (john@example.com)     |
|                                      |
| Subject: Prescription received       |
| 12:30 PM, Yesterday                 |
|                                      |
| Email body...                        |
|                                      |
| [Reply] [Reply All] [Forward]        |
|                                      |
| Compose reply:                       |
| [Textarea: type reply...]            |
|                                      |
| [Send] [Save Draft]                  |
+──────────────────────────────────────+
```

**Components:**
- GmailConnectButton: "Connect Gmail Account"
- EmailList: paginated list, search, filter
- EmailThread: read-only email display
- ComposeReply: textarea for reply
- Button: send, save draft

**Animations:**
- List load: skeleton shimmer
- Email click: content slideUp (0.3s)
- Reply compose: slideUp (0.2s)

**Features:**
- Auto-label patient emails
- Token refresh on background (OAuth)
- Gmail readonly, no delete/archive (read-only)

---

#### 8.2 WhatsApp Message Templates
**Path:** `/admin/whatsapp`  
**Role:** Admin (authenticated)

**Layout:**
```
+──────────────────────────────────────+
| WhatsApp Message Templates           |
|                                      |
| SYSTEM TEMPLATES:                    |
|                                      |
| 1. Booking Confirmation              |
|    "Hi {{name}}, Your appointment... |
|    [Edit Template]                   |
|                                      |
| 2. Appointment Reminder              |
|    "Reminder: Your appointment with  |
|    {{doctor}} is today at {{time}}"  |
|    [Edit Template]                   |
|                                      |
| 3. Cancellation Notice               |
|    "Your appointment on {{date}}     |
|    has been cancelled..."            |
|                                      |
| 4. Prescription Ready                |
|    "Your prescription is ready!"     |
|                                      |
| 5. Doctor Verified                   |
|    "Dr. {{name}} is now verified"    |
|                                      |
+──────────────────────────────────────+
```

**Components:**
- TemplateCard: title, template text, edit button
- Modal: edit template (textarea with variables)
- Variables: {{name}}, {{doctor}}, {{date}}, {{time}}

**Animations:**
- Cards: stagger slideUp (0.1s per card)
- Modal: scaleIn (0.4s)

**WhatsApp Triggers:**
- Booking confirmed → send template #1
- 24h before appointment → send template #2
- Appointment cancelled → send template #3
- Prescription generated → send template #4
- Doctor verified → send template #5

---

## Sprint 9: PWA + Polish

### Overview
Sprint 9 adds Progressive Web App capabilities and final polish/animations.

### Features

#### 9.1 PWA Installation
**Features:**
- `manifest.json`: app name, icons, theme color, display: standalone
- Service worker: cache-first (static), network-first (API)
- Install banner: "Add to Home Screen"
- iOS manual instructions: "Share → Add to Home Screen"

**Layout - Install Banner:**
```
+──────────────────────────────────────+
| 📱 Add DoctorSewa to home screen      |
| [Install] [Dismiss]                  |
+──────────────────────────────────────+
```

**Components:**
- InstallBanner: attractive, shows once
- IOSInstructions: modal with screenshots

**Animations:**
- Banner entrance: slideUp (0.3s)
- Button hover: scale (1.05, 0.2s)

---

#### 9.2 Offline Support
**Features:**
- Service worker caches essential pages
- Offline fallback: "You're offline" page
- Queued actions: messages, forms saved locally
- Sync when online: queued actions sent

**Offline Page:**
```
+──────────────────────────────────────+
|                                      |
|  ⚠️ You're Offline                   |
|                                      |
| Some features are unavailable        |
| without internet connection.          |
|                                      |
| Available offline:                   |
| ✓ View past appointments             |
| ✓ View messages (already loaded)     |
| ✓ Read prescriptions                 |
|                                      |
| [Retry Connection]                   |
|                                      |
+──────────────────────────────────────+
```

---

#### 9.3 Push Notifications
**Features:**
- Web push subscription (user opt-in)
- Service worker handles notifications
- Notification center (browser native)
- Badge count on app icon (mobile)

**Settings - Push Notifications:**
```
+──────────────────────────────────────+
| Push Notifications                   |
| [ ] Appointment Reminders            |
| [ ] New Messages                     |
| [ ] Prescription Updates             |
| [Save]                               |
+──────────────────────────────────────+
```

**Notification Examples:**
```
"Your appointment with Dr. Rajesh in 1 hour"
"New message from Dr. Rajesh"
"Your prescription is ready"
```

---

#### 9.4 Bottom Tab Navigation (Mobile)
**Path:** Always visible on mobile  
**Shows:** Home, Appointments, Chat, Profile

**Layout (Mobile):**
```
+──────────────────────────────────────+
| [Page Content]                       |
|                                      |
| [Icon] [Icon] [Icon] [Icon]          |
| Home Appts Chat Profile              |
+──────────────────────────────────────+
```

**Animations:**
- Tab switch: fade content (0.2s)
- Active tab: slight scale (1.05)
- Indicator slide: under active tab (0.3s)

---

#### 9.5 Loading Skeletons
**Show on all data-fetching pages:**
- Doctor list: card skeleton
- Appointments list: row skeleton
- Chat: message skeleton

**Skeleton Animation:**
```
[Shimmer effect: left to right (0.8s loop)]
Colors fade from gray-200 → gray-300 → gray-200
```

**Components:**
- CardSkeleton: placeholder card
- TextSkeleton: multiple lines
- AvatarSkeleton: circular placeholder

---

#### 9.6 Error Boundaries
**Catch React errors:**
- Component renders "Something went wrong"
- Shows error message + "Retry" button
- Doesn't crash entire app
- Logs error to backend

**Error UI:**
```
+──────────────────────────────────────+
|                                      |
| ⚠️ Something Went Wrong               |
|                                      |
| Please try again or contact support  |
|                                      |
| [Retry] [Go Home]                    |
|                                      |
+──────────────────────────────────────+
```

---

#### 9.7 Toast Notifications
**System-wide feedback:**
- Success: green, auto-dismiss (3s)
- Error: red, manual dismiss
- Info: blue, auto-dismiss (5s)
- Warning: amber, manual dismiss

**Position:** Top-right, stacking

**Animations:**
- Entrance: slideRight (0.3s)
- Exit: slideOut (0.3s)

---

#### 9.8 Micro-Interactions & Polish Animations

**Button Interactions:**
- Hover: scale (1.02, 0.2s)
- Click: pulse feedback (0.1s)
- Disabled: opacity (0.5)

**Form Interactions:**
- Label float on focus
- Success checkmark animation (0.4s)
- Error shake (0.3s)
- Field focus glow (0.2s)

**Page Transitions:**
- Route change: fadeOut current (0.2s), fadeIn new (0.3s)
- Scroll to top: smooth (0.5s)

**Hover States:**
- Links: color change + underline slide (0.2s)
- Cards: lift + shadow expand (0.3s)
- Buttons: scale + color transition (0.2s)

---

## Sprint 10: Deploy + CI/CD

### Overview
Sprint 10 covers infrastructure, deployment, and CI/CD setup. **No UI/UX screens.**

### Infrastructure Tasks

**Dockerfile (Express Backend):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**cloudbuild.yaml (GCP):**
```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/doctorsewa-backend:$COMMIT_SHA', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/doctorsewa-backend:$COMMIT_SHA']
  - name: 'gcr.io/cloud-builders/run'
    args: ['deploy', 'doctorsewa-backend', '--image', 'gcr.io/$PROJECT_ID/doctorsewa-backend:$COMMIT_SHA']
```

**GitHub Actions Workflow:**
```yaml
name: CI/CD
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Deploy to GCP
        run: gcloud run deploy ...
```

**Deployment Targets:**
- Backend: GCP Cloud Run
- Frontend: Vercel
- Database: Neon (PostgreSQL)
- Cache: Redis (if needed)
- File storage: Cloudinary

**Health Check:**
- `/api/health` endpoint returns `{ status: "ok" }`
- Smoke tests: login → book → payment → complete flow

---

## Component Library

### Core Components

[Same as before, fully documented]

---

## Animation Library

### Complete Animation Specifications

[Same as before, fully documented]

---

## Responsive Design

[Same as before, fully documented]

---

## Accessibility Guidelines

[Same as before, fully documented]

---

## Design Tokens Summary (for Stitch)

[Same as before, fully documented]

---

## Export Checklist for Code Generation

- [x] Design system complete (colors, typography, spacing)
- [x] All screens designed (Sprints 0-10, 60+ screens)
- [x] Components specified (all variants, interactions)
- [x] Animations defined (entrance, hover, feedback, polish)
- [x] Responsive breakpoints clear (mobile, tablet, desktop)
- [x] Accessibility guidelines documented
- [x] PWA features detailed (installation, offline, push)
- [x] Admin dashboard with KPIs and charts
- [x] Real-time chat and video consultation
- [x] AI features and smart suggestions
- [x] Email and WhatsApp integration
- [x] Deployment and CI/CD setup
- [x] Color palette locked
- [x] Typography system final
- [x] Dark mode support (CSS variables)
- [x] Ready for Stitch MCP generation (all 60+ screens)
- [x] Ready for Antigravity code generation (Sprints 0-10)

---

## Notes for Stitch MCP

**Use this Design.md for:**
1. Generating mockup images for ALL screens (60+)
2. Creating complete component library previews
3. Building interactive prototypes (multi-screen flows)
4. Exporting design specifications (all screens)
5. Generating HTML/CSS templates (all variants)

**Expected Output from Stitch:**
1. HTML mockups (all 60+ screens)
2. Component library (button, input, card, etc. variants)
3. Interactive prototype (clickable flows for all sprints)
4. Design specs (margins, spacing, colors for each screen)
5. Export recommendations for React code generation

---

## Notes for Antigravity Code Generation

**Input to Antigravity:**
1. This Design.md (complete specifications)
2. Stitch mockups (visual reference for all screens)
3. stitch-skills component templates (component specs)
4. Architecture doc (database schema, API endpoints)

**Expected Output from Antigravity:**
1. Sprint 0: Foundation + design system setup
2. Sprint 1: Auth screens (4 screens) + API
3. Sprint 2: Doctor profiles (4 screens) + API
4. Sprint 3: Appointments + payments (4 screens) + Razorpay
5. Sprint 4: Chat (2 screens) + Socket.io
6. Sprint 5: Video consultation (2 screens) + Daily.co
7. Sprint 6: AI features (3 screens) + Groq API
8. Sprint 7: Admin portal (10 screens) + KPIs, charts
9. Sprint 8: Gmail + WhatsApp (2 screens) + integrations
10. Sprint 9: PWA + Polish + animations
11. All code: production-ready, responsive, accessible, animated

---

**Design Document Version:** 3.0 (COMPLETE SPRINTS 0-10)  
**Last Updated:** 2024  
**Status:** Ready for Complete Stitch MCP Generation ✓  
**Screens Designed:** 60+  
**Components Specified:** 40+  
**Animations Defined:** 30+  

**Variants:** primary, secondary, danger, ghost  
**Sizes:** sm (small), md (medium), lg (large)

```
Primary:
  Default: Green #1a6b4a, white text
  Hover: Green #2d9966, scale 1.02 (0.2s)
  Active: scale 0.98 (0.1s feedback)
  Disabled: opacity 0.5, pointer-events none
  Loading: spinner inside, text hidden

Secondary:
  Default: Transparent, green border, green text
  Hover: light green background #e8f4ef
  
Danger:
  Default: Red #a02020, white text
  Hover: darker red, scale 1.02

Ghost:
  Default: Transparent, no border, green text
  Hover: light green background
```

#### Input
**States:** default, focus, error, success, disabled

```
Default:
  Border: 1px #d0ccc2
  Background: white
  Focus: border #1a6b4a, shadow 0 0 0 3px rgba(26,107,74,0.1)
  Error: border red, shake animation
  Success: border green, checkmark icon
  Disabled: opacity 0.5
```

#### Card
**Variants:** default, elevated

```
Default:
  Border: 1px #e0dcd4
  Background: white #f0ede8
  Hover: lift 4px, shadow md
  
Elevated:
  Shadow: lg
  Hover: shadow xl
```

#### Badge
**Types:** status, category, new

```
Status (PENDING/CONFIRMED/COMPLETED/CANCELLED):
  PENDING: amber background, pulse animation
  CONFIRMED: green background, solid
  COMPLETED: gray background
  CANCELLED: red background

Category:
  background: teal, text: white

New:
  background: coral, text: white, "New" label
```

#### Modal/Dialog
```
Backdrop: black, opacity 0.5
Modal: white background, shadow xl
Entrance: scaleIn 0.4s
Exit: scaleOut 0.3s
Close button: top-right corner
```

#### Toast/Notification
```
Position: top-right
Entrance: slideRight 0.3s
Exit: slideOut 0.3s
Auto-dismiss: 3-5s (success/info)
Manual dismiss: errors
Types: success (green), error (red), info (blue)
```

#### Loading Spinner
```
Style: Rotating SVG circle
Duration: 1.2s
Color: primary green #1a6b4a
Variants: small (24px), medium (32px), large (48px)
```

---

## Animation Library

### Entrance Animations

#### fadeIn
- Duration: 0.3s
- Easing: power2.out
- Properties: opacity 0→1
- Use: Page load, component mount

#### slideUp
- Duration: 0.4s
- Easing: power2.out
- Properties: y 20px→0, opacity 0→1
- Use: Forms, sections

#### slideDown
- Duration: 0.4s
- Easing: power2.out
- Properties: y -20px→0, opacity 0→1
- Use: Dropdowns, menus

#### scaleIn
- Duration: 0.3s
- Easing: back.out
- Properties: scale 0.95→1, opacity 0→1
- Use: Modals, important components

#### staggerChildren
- Parent: container element
- Each child: fadeIn/slideUp with delay
- Stagger amount: 0.1s per child
- Use: Lists, card grids

### Interaction Animations

#### buttonHover
- Duration: 0.2s
- Easing: power2.out
- Properties: scale 1→1.02
- Use: All buttons

#### cardHover
- Duration: 0.3s
- Easing: power2.out
- Properties: y 0→-4px, shadow expand
- Use: Clickable cards, appointments

#### inputFocus
- Duration: 0.2s
- Easing: power2.out
- Properties: border color change, glow
- Use: Form inputs

#### linkHover
- Duration: 0.2s
- Easing: power2.out
- Properties: color change, underline
- Use: Links, secondary actions

### Feedback Animations

#### success
- Duration: 0.6s
- Easing: elastic.out(1, 0.5)
- Properties: scale 0.8→1.05→1
- Use: Form success, payment confirmation

#### shake
- Duration: 0.3s
- Easing: power2.inOut
- Properties: x [-6, 6, -3, 3, 0]
- Use: Form errors, validation failures

#### pulse
- Duration: 1.5s
- Easing: sine.inOut
- Properties: opacity 0.5→1→0.5
- Repeat: infinite
- Use: Status badges (PENDING), loading indicators

#### spin
- Duration: 1.2s
- Easing: linear
- Properties: rotation 360°
- Repeat: infinite
- Use: Loading spinners

### State Animations

#### toastSlideIn
- Duration: 0.3s
- Easing: power2.out
- Properties: x 100→0, opacity 0→1
- Use: Notifications, alerts

#### toastSlideOut
- Duration: 0.3s
- Easing: power2.in
- Properties: x 0→100, opacity 1→0
- Use: Notification dismissal

#### confetti
- Duration: 0.8s
- Easing: power2.out
- Properties: y decrease, x scatter, rotate
- Stagger: 0.05s per particle
- Use: Payment success celebration

#### countUp
- Duration: 0.8s
- Easing: power2.out
- Properties: number increment (0→target)
- Use: Price display, appointment count

---

## Responsive Design

### Breakpoints

```
Mobile:   375px
Tablet:   768px
Desktop:  1024px
Wide:     1440px
```

### Mobile-First Approach

#### Mobile (375px - 767px)
- Full-width components
- Single column layouts
- Bottom navigation/drawer navigation
- Full-width buttons, inputs
- Simplified modals
- Stacked cards
- Touch targets: minimum 44x44px
- Text sizes: no smaller than 14px (14px body)
- Padding: lg (16px) margins

#### Tablet (768px - 1023px)
- 2-column grid where applicable
- Sidebar navigation (collapsible)
- 2 cards per row
- Larger modals (not full-screen)
- Some side-by-side layouts
- Text: readable, no excessive line lengths

#### Desktop (1024px+)
- 3-4 column grids
- Sidebar navigation (always visible)
- Multi-panel layouts
- Centered max-width containers (1200px)
- Full-featured layouts
- Optimal reading line length (60-80 chars)

### Responsive Component Examples

#### Doctor Card Grid
```
Mobile (1 col):  [Card1]
                 [Card2]
                 [Card3]

Tablet (2 col):  [Card1] [Card2]
                 [Card3] [Card4]

Desktop (3 col): [Card1] [Card2] [Card3]
                 [Card4] [Card5] [Card6]
```

#### Form Layout
```
Mobile:    [Input]
           [Input]
           [Button]

Tablet:    [Input] [Input]
           [Input] [Input]
           [Button]

Desktop:   [Input ↔] [Input ↔]
           [Input ↔] [Input ↔]
           [Button]
```

#### Navbar
```
Mobile:    [Logo] [Menu☰]
           (Menu expands on click)

Desktop:   [Logo] [Nav Links] [Button]
           (Always visible)
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast
- Text on background: minimum 4.5:1 contrast ratio
- Large text (18px+): minimum 3:1 contrast ratio
- Never use color alone to convey information

#### Keyboard Navigation
- All interactive elements: focusable via Tab
- Focus indicator: visible outline (3px green border)
- Tab order: logical, top-to-bottom, left-to-right
- Form navigation: Tab between inputs, Shift+Tab back

#### Screen Reader Support
- Alt text on all images
- ARIA labels on icon buttons
- Form inputs: `<label>` associated with `<input>`
- Status updates: `aria-live` regions for notifications
- Modals: `role="dialog"` with `aria-labelledby`

#### Motion & Animation
- Respect `prefers-reduced-motion: reduce`
- Animations disabled for users with motion sensitivity
- Auto-playing content: user can pause/stop
- Avoid flashing (more than 3 times/second)

#### Form Accessibility
- All inputs: associated labels
- Error messages: aria-describedby
- Required fields: marked with `required` attribute
- Validation: inline error messages, color + icon + text

#### Mobile Accessibility
- Touch targets: minimum 44x44px
- Text: readable without zoom (min 14px)
- Orientation: not locked, supports both portrait/landscape
- Readable without needing pinch-zoom

---

## Design Tokens Summary (for Stitch)

```json
{
  "colors": {
    "primary": {
      "50": "#e8f4ef",
      "100": "#d0e8de",
      "200": "#a8d1bd",
      "400": "#52b380",
      "600": "#2d9966",
      "700": "#1a6b4a",
      "800": "#0f4a32",
      "900": "#082b1f"
    },
    "semantic": {
      "success": "#2d9966",
      "warning": "#b35c00",
      "error": "#a02020",
      "info": "#1a4580"
    }
  },
  "typography": {
    "display": { "size": "32px", "weight": 600, "lineHeight": 1.2 },
    "h1": { "size": "24px", "weight": 600, "lineHeight": 1.3 },
    "body": { "size": "14px", "weight": 400, "lineHeight": 1.6 },
    "small": { "size": "12px", "weight": 400, "lineHeight": 1.5 }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "2xl": "32px"
  },
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px"
  },
  "animations": {
    "fadeIn": { "duration": "0.3s", "easing": "power2.out" },
    "slideUp": { "duration": "0.4s", "easing": "power2.out" },
    "scaleIn": { "duration": "0.3s", "easing": "back.out" },
    "buttonHover": { "duration": "0.2s", "easing": "power2.out" },
    "cardHover": { "duration": "0.3s", "easing": "power2.out" }
  }
}
```

---

## Export Checklist for Code Generation

- [x] Design system complete (colors, typography, spacing)
- [x] All screens designed (Sprints 0-3)
- [x] Components specified (Button, Input, Card, etc.)
- [x] Animations defined (entrance, hover, feedback)
- [x] Responsive breakpoints clear (mobile, tablet, desktop)
- [x] Accessibility guidelines documented
- [x] Color palette locked
- [x] Typography system final
- [x] Dark mode support (CSS variables)
- [x] Ready for Stitch MCP generation
- [x] Ready for Antigravity code generation

---

## Notes for Stitch MCP

**Use this Design.md for:**
1. Generating mockup images for each screen
2. Creating component library previews
3. Building interactive prototypes
4. Exporting design specifications
5. Generating HTML/CSS templates

**Output expected from Stitch:**
1. HTML mockups (all major screens)
2. Component library (Figma-like preview)
3. Interactive prototypes (clickable flows)
4. Design specs (margins, spacing, colors)
5. Export recommendations for React

---

## Next Steps

1. **Stitch MCP:** Generate mockups from this Design.md
2. **stitch-skills:** Extract component specifications
3. **Antigravity:** Generate production React code
4. **Testing:** Validate designs match implementation
5. **Iteration:** Refine based on feedback

---

**Design Document Version:** 2.0  
**Last Updated:** 2024  
**Status:** Ready for Stitch MCP Generation ✓
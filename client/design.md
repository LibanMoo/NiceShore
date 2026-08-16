---
name: Coastal Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#43474f'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#00bdfd'
  on-secondary-container: '#004964'
  tertiary: '#1b1f21'
  on-tertiary: '#ffffff'
  tertiary-container: '#303436'
  on-tertiary-container: '#999c9f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#c3e8ff'
  secondary-fixed-dim: '#7ad0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-padding: 120px
---

## Brand & Style
The design system embodies a premium "Coastal Tech" aesthetic, blending the reliability of high-end SaaS with the airy, expansive feeling of a shoreline. The brand personality is professional, serene, and highly organized.

The style leverages **Modern Minimalism** with a **Glassmorphic** touch. It prioritizes vast whitespace to represent the horizon, using subtle depth and soft lighting to create a UI that feels both grounded and weightless. The emotional response should be one of immediate clarity and calm confidence, moving away from cluttered "corporate" layouts toward a more editorial, breathable experience.

## Colors
The palette is rooted in a "Deep Ocean" primary for authority and a "Clear Sky" cyan for action and energy. 

- **Primary (#003366):** Used for headlines, primary buttons, and heavy branding elements.
- **Secondary (#00BFFF):** Reserved for high-priority calls to action, focus states, and accent iconography.
- **Tertiary/Surface (#F5F7FA):** A soft sandy gray used for section backgrounds and card surfaces to prevent stark white-on-black eye strain.
- **Neutral (#4A5568):** A balanced slate for body text and secondary labels, ensuring high legibility without the harshness of pure black.
- **Background (#FFFFFF):** The canvas remains crisp white to maintain the high-end SaaS feel.

## Typography
This design system utilizes **Plus Jakarta Sans** across all levels to maintain a cohesive, modern, and friendly geometric feel. 

Headlines use tighter letter-spacing and heavier weights to command attention against the generous whitespace. Body text is set with comfortable line heights to ensure long-form readability. For small captions or categories, an uppercase label style with slight tracking (letter spacing) is used to add a touch of sophisticated "editorial" flair.

## Layout & Spacing
The layout follows a **Fluid Grid** model with strict vertical rhythm. 

- **Desktop:** 12-column grid with 24px gutters. Use large section padding (120px+) to create the "Coastal" sense of scale.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 20px margins.

Content should be centered in a max-width container for landing pages, while dashboard views may utilize a fixed left-hand navigation sidebar (280px) and a fluid content area.

## Elevation & Depth
Depth is created through **Ambient Shadows** and **Tonal Layering** rather than heavy borders.

- **Low Elevation:** Use a 1px border in a very light neutral (e.g., #E2E8F0) for static cards.
- **Mid Elevation:** Used for hover states and dropdowns. A soft, diffused shadow: `0 10px 25px -5px rgba(0, 51, 102, 0.08)`. Note the subtle blue tint in the shadow to maintain color harmony.
- **High Elevation:** Used for modals. A multi-layered shadow to simulate significant lift: `0 20px 50px -12px rgba(0, 51, 102, 0.12)`.
- **Glassmorphism:** For navigation bars and floating headers, use a background blur (12px) with a semi-transparent white fill (80% opacity).

## Shapes
In alignment with the "NiceShore" aesthetic, shapes are notably **Rounded (12px/0.5rem base)**. This softens the technical nature of the SaaS platform and mirrors the organic curves of the coast. 

- **Buttons & Inputs:** Use the base 12px rounding.
- **Cards & Containers:** Use `rounded-lg` (16px) or `rounded-xl` (24px) for larger surface areas.
- **Status Pills:** Use fully rounded (pill-shaped) corners.

## Components
- **Buttons:** Primary buttons use the Deep Ocean blue with white text. Secondary buttons use a Sky Cyan ghost style (border only) or a light Cyan tint with dark text. Apply a subtle lift (shadow) on hover.
- **Input Fields:** Large 12px rounded corners with a soft sandy gray background. On focus, the border transitions to Sky Cyan with a subtle outer glow.
- **Cards:** White backgrounds with the Mid Elevation shadow. Avoid heavy borders; use internal padding (32px) to let content breathe.
- **Chips/Badges:** Small, pill-shaped components. Use a light Sky Cyan background with 15% opacity for "Active" states.
- **Progress Indicators:** Use the Sky Cyan for the progress bar to provide a "Clear Water" visual metaphor for completion.
- **Iconography:** Use a light-weight (2pt) stroke icon set. Icons should be dual-tone, utilizing both Primary and Secondary colors to add visual depth.
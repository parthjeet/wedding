# Wedding Website — Implementation Plan

> **Project**: Parth & Anu Wedding Invitation Website
> **Type**: Groom's side invitation, shared via WhatsApp
> **Goal**: Maximum cinema. Maximum animation. Make people say "wow."
> **Created**: 2026-03-14

---

## Available Tools

- **context7 MCP**: Available for fetching up-to-date library documentation (Motion, GSAP, Tailwind, Lenis, tsParticles, etc.) during implementation
- **Playwright MCP**: Available for end-to-end testing, visual regression, mobile viewport testing, and screenshot capture during QA

---

## Creative Direction

### Color Palette: "Midnight Gold & Ember"

| Role              | Color             | Hex       |
|-------------------|-------------------|-----------|
| Deep Background   | Rich Black        | `#0A0A0F` |
| Section Background| Midnight Navy     | `#0F1123` |
| Primary Accent    | Burnished Gold    | `#C9A84C` |
| Secondary Accent  | Warm Gold Light   | `#E8D5A3` |
| Tertiary          | Deep Rose/Ember   | `#8B2252` |
| Highlight         | Champagne         | `#F5E6C8` |
| Body Text         | Soft Cream        | `#E8E0D0` |
| Muted Text        | Warm Gray         | `#9B9485` |

Film grain texture overlay on all dark backgrounds. Subtle radial gold glow spots at section transitions.

### Typography

| Role                  | Font                  | Style                                      |
|-----------------------|-----------------------|--------------------------------------------|
| Display / Names       | `Cinzel`              | Roman-inscriptional, powerful, regal       |
| Section Headings      | `Cormorant Garamond`  | Elegant serif, literary, Sanskrit-friendly |
| Body / UI             | `Outfit`              | Geometric sans, modern, clean              |
| Decorative Accent     | `Tangerine`           | Calligraphic script for "&" and flourishes |

### Signature Motif

One elaborate **mandala SVG** that draws itself during loading, then fragments and disperses into decorative elements throughout the page. **Paisley vine borders** grow along section edges on scroll.

---

## Technical Architecture

### Stack

| Layer            | Technology                                              |
|------------------|---------------------------------------------------------|
| Framework        | React 18 + TypeScript + Vite                            |
| Styling          | Tailwind CSS v4                                         |
| Smooth Scroll    | Lenis (`lenis/react`)                                   |
| Scroll Animations| GSAP + ScrollTrigger + SplitText + DrawSVG + MotionPath |
| UI Animations    | Motion (Framer Motion) — whileInView, AnimatePresence   |
| Particles        | @tsparticles/react + @tsparticles/slim                  |
| Confetti         | canvas-confetti                                         |
| GSAP React       | @gsap/react (useGSAP hook)                              |

### Animation Division of Labor

- **Motion**: Component mount/unmount, hover/tap states, `whileInView` reveals, scroll progress transforms, `AnimatePresence` for lightbox, layout animations, mouse parallax via `useMotionValue`
- **GSAP**: Pinned scroll sections, complex timelines, SplitText character reveals, SVG path drawing (DrawSVG), horizontal scroll pinning, loading choreography, MotionPath dot-following

### Key Principle: Separation of DOM Ownership

Never let both Motion and GSAP animate the same DOM element simultaneously. Partition by component or by CSS property.

---

## Page Sections (7 Sections — Single Continuous Scroll)

### Section 1: Loading Screen — "The Overture"

**Visual**: Dark void. A golden mandala SVG draws itself stroke-by-stroke from the center outward. A percentage counter pulses in the center. On completion, the mandala fills with gold, pulses once, then shatters into floating particles that become the hero's ambient atmosphere.

**Animation Sequence** (GSAP Timeline):
1. Mandala strokes draw in via `DrawSVG` (0% → 100%), staggered by ring layer
2. Counter animates 0 → 100 in sync
3. Mandala fills with gold (opacity on fill elements)
4. Brief pulse (scale 1 → 1.05 → 1)
5. Mandala paths fragment outward (individual path transforms)
6. Curtain panels (3 vertical slices) slide apart with stagger
7. Hero content begins entrance animation

**Tech**: GSAP Timeline, DrawSVG plugin, SplitText, tsParticles for shatter-to-ambient transition
**Duration**: ~3.5 seconds

---

### Section 2: Hero / Grand Opening — "The First Breath"

**Visual**: Full `100dvh` dark canvas. Floating gold particles drift lazily. Sanskrit invocation ("श्री गणेशाय नम:") fades in from gaussian blur at top. Below, the names "PARTH" in Cinzel at massive scale, a flowing "&" in Tangerine script, and "ANU" — each revealed character-by-character with gold shimmer. Below the names: "Are Getting Married" in Cormorant Garamond italic. Date "5th May 2026" and "Ranchi" fade up last with subtle parallax offset. Decorative SVG paisley corners draw themselves in from the four edges.

**Animations**:
- Sanskrit text: blur(20px) → blur(0) + opacity 0 → 1 (Motion)
- Names: GSAP SplitText char-by-char, each char slides up from y:80 with rotation, gold color wash follows left-to-right
- "&" in Tangerine: scales from 0 with elastic ease, slight continuous float animation
- Date/City: fade up with y offset, staggered (Motion whileInView)
- Paisley corners: GSAP DrawSVG, triggered after names resolve
- Gold particles: tsParticles with mouse-repel interaction (desktop)
- Mouse parallax: decorative elements shift with cursor position (Motion useMotionValue + useTransform + useSpring), disabled on mobile
- Film grain: CSS background noise texture overlay at low opacity
- Scroll cue: golden chevron with breathing scale + y bounce (Motion animate with repeat: Infinity)

**Tech**: GSAP SplitText + Timeline, Motion for component reveals, tsParticles, custom `useMouseParallax` hook

---

### Section 3: Family Blessings — "Sacred Reverence"

**Visual**: Centered elegant text block on deep background. An ornate SVG frame (floral/paisley border) draws itself around the text as you scroll into the section. Two decorative diya (oil lamp) SVGs at the top corners that "light up" with animated flame glow. The formal invitation text is typeset in Cormorant Garamond with careful letter-spacing.

**Content**:
```
With the blessings of the Almighty and the love of our families

Dr. Sanjay Kumar Pandey & Mrs. Bandana Pandey
cordially invite you to celebrate the wedding of their beloved son
PARTH
with
Anu
Daughter of Mr. Anil Kumar Singh & Mrs. Mridula Singh
```

**Animations**:
- SVG ornate frame: draws from top-center, splits left and right, traces down both sides, meets at bottom (GSAP DrawSVG + ScrollTrigger scrub)
- Diya flames: CSS keyframe flicker + radial gradient glow that intensifies on scroll
- Text lines: GSAP SplitText word-level reveal with blur(8px) → blur(0) + opacity stagger, scrubbed to scroll
- "PARTH" and "Anu": scale emphasis with gold color treatment, slight glow (`text-shadow`)
- Parents' names: subtle gold underline that draws itself left-to-right
- Background: very subtle radial warm glow (CSS radial-gradient) centered behind the text block, opacity tied to scroll progress

**Transition to next section**: golden horizontal line extends from center outward, acting as a divider that becomes the first event card's top border

---

### Section 4: Wedding Events — "The Grand Journey" (SHOWPIECE SECTION)

**Visual**: **Pinned horizontal scroll on desktop** — the section pins in place while 5 event panels slide through horizontally as the user scrolls vertically. Each panel is a full-viewport experience with its own color mood, background SVG pattern, and themed particle effect. On mobile: stacked vertical cards with scroll-triggered reveals.

**Desktop Mechanics**:
- Outer container pins via GSAP ScrollTrigger `pin: true`
- Inner track translates `x` from 0 to `-(4 * 100vw)` with `scrub: 1`
- Total scroll distance: 5x viewport height (one screenful of scroll per event)
- Progress dots at bottom showing current panel (1-5)
- Snap to nearest panel on scroll end

**Event Panels**:

#### Panel 1: Haldi — "Golden Beginnings"
- **Mood**: Warm turmeric yellow (#E8B931) accent on dark bg
- **Background SVG**: Marigold garland pattern, loosely drawn, drawing in from edges
- **Particles**: Floating turmeric/yellow petal shapes drifting downward
- **Layout**: Event name in large Cinzel, date + venue below in Outfit, warm description in Cormorant Garamond italic
- **Unique animation**: A turmeric splash SVG that "splatters" on entry (scale + opacity burst)

#### Panel 2: Mehendi — "Intricate Stories"
- **Mood**: Deep emerald green (#2D6A4F) accent
- **Background SVG**: Henna/mehndi paisley pattern drawing itself in real-time (DrawSVG scrubbed to panel position)
- **Particles**: Tiny green leaf shapes floating upward
- **Unique animation**: A hand silhouette SVG with mehndi pattern filling in progressively

#### Panel 3: Sangeet — "Rhythm & Joy"
- **Mood**: Vibrant magenta/purple (#9B2335) accent
- **Background SVG**: Musical notes and dancing figure silhouettes
- **Particles**: Musical note shapes bouncing with slight gravity
- **Unique animation**: Equalizer bars that pulse with a rhythm animation (CSS keyframes), text bounces in with elastic ease

#### Panel 4: Wedding Ceremony (Pheras) — "Sacred Fire"
- **Mood**: Sacred fire orange-gold (#D4760A) accent — THE grandest panel
- **Background SVG**: Elaborate mandala backdrop (the largest, most detailed SVG), draws concentrically
- **Particles**: Ember/spark particles floating upward (like fireflies rising from a fire)
- **Layout**: Largest text treatment, most spacing, most reverence
- **Unique animation**: Sacred fire SVG at bottom with animated flame (CSS gradient animation + particle embers), golden radial glow that intensifies as you scroll deeper into this panel

#### Panel 5: Reception — "Champagne Evening"
- **Mood**: Champagne/silver (#C0B283) accent, most elegant
- **Background SVG**: Art deco geometric patterns, clean lines
- **Particles**: Tiny sparkle/glitter dots twinkling (opacity oscillation)
- **Unique animation**: Champagne glass clink SVG with sparkle burst, text reveals with sophistication (slower, more deliberate staggers)

**Each Panel Contains**:
- Event emoji (large, animated on entry)
- Event name (Cinzel, large, SplitText reveal)
- 1-2 line warm description (Cormorant Garamond italic)
- Date (Outfit, clear)
- Venue name (Outfit semibold)
- Full address (Outfit, smaller)
- Themed SVG motif
- Mood-specific particles

**Mobile Alternative**: Vertically stacked cards with generous spacing. Each card has its mood color as a left border accent. Cards reveal with staggered slide-up + opacity (Motion whileInView). Simplified SVG motifs (fewer paths). No particles on low-end devices.

---

### Section 5: Photo Gallery — "Captured Moments"

**Visual**: Asymmetric editorial CSS Grid layout. 6-8 photo placeholder spots arranged like a magazine spread — one large hero image spanning 2 columns and 2 rows, surrounded by smaller images at varying sizes. Slight rotation offsets (-2deg to 2deg) for an organic scattered feel. Thin gold borders.

**Animations**:
- **Scroll reveal**: Images enter with staggered scale(0.85) → scale(1) + opacity 0 → 1 (Motion whileInView, staggerChildren: 0.15)
- **Parallax within grid**: Each image moves at a slightly different scroll speed (Motion useScroll + useTransform per image, with varying output ranges)
- **Desktop hover** (scoped to `@media (hover: hover) and (pointer: fine)`):
  - Image lifts: translateY(-8px), shadow deepens
  - Slight rotation correction toward 0deg
  - Gold border brightens
  - Custom cursor shows "View" text
- **Tap/Click → Lightbox**:
  - Motion `layoutId` shared element transition — image smoothly expands from grid position to full-screen center
  - Backdrop blur (backdrop-filter: blur(20px)) fades in
  - Navigation: swipe on mobile, arrow keys on desktop, arrow buttons
  - Close: tap backdrop, press Escape, or close button
  - Motion `AnimatePresence` handles mount/unmount animation

**Placeholder Design**: Gray gradient rectangles with a subtle camera icon SVG centered, gold border, aspect ratios matching intended photo orientation (mix of portrait and landscape)

**Tech**: CSS Grid with `grid-template-areas`, Motion whileInView + AnimatePresence + layoutId, custom lightbox component

---

### Section 6: Venue Details — "Find Your Way"

**Visual**: 3 venue cards arranged vertically with generous spacing. Each card has: venue name, which events happen there, full address, and a Google Maps embed. Connected by a decorative SVG travel path (dotted golden line with tiny ornamental markers).

**Venue Cards**:

1. **D-12 Moon City** — Haldi, Mehendi, Sangeet
   - Mango, Jamshedpur, Jharkhand
   - Google Maps embed

2. **Ramada by Wyndham Ranchi** — Wedding Ceremony (Pheras)
   - Bariatu Rd, Rameshwaram, Sarhul Nagar, Ranchi, Jharkhand
   - Google Maps embed (largest card — primary venue)

3. **NH Hills** — Reception
   - NH-33, Pardih Chowk, Kumrum, Mango, Jamshedpur, Jharkhand
   - Google Maps embed

**Animations**:
- Cards reveal with staggered slide-up + opacity (Motion whileInView, stagger: 0.2)
- SVG dotted path between venues draws on scroll (GSAP DrawSVG + ScrollTrigger)
- Small ornamental markers (diya, mandala fragment) appear at each venue node
- Map embeds lazy-load with IntersectionObserver (iframe loads only when card is near viewport)
- Card hover: subtle lift + gold border glow (desktop only)
- "Get Directions" link with magnetic button effect on desktop

**Mobile**: Cards stack naturally, full-width. Maps load smaller. SVG path simplified to simple golden dots between cards.

---

### Section 7: Closing / Save the Date — "The Grand Finale"

**Visual**: Return to the ceremonial tone of the hero. Large "Save the Date" heading. The wedding date "5th May 2026" displayed prominently. Contact information. "With love, The Pandey Family" as the sign-off. The mandala from the loading screen reappears as a final visual bookend, drawing itself one more time.

**Animations**:
- "Save the Date": GSAP SplitText char reveal with gold shimmer
- Date display: large, cinematic number reveal (each digit slides up from behind a mask)
- Contact info: simple fade-up (Motion whileInView)
- Family sign-off: elegant fade with warm gold glow
- **Confetti burst**: canvas-confetti fires from both bottom corners when section reaches center viewport — gold, champagne, and cream colored shapes
- **Golden particle shower**: tsParticles briefly intensifies with downward-falling gold sparkles
- Mandala redraw: the loading mandala SVG draws itself one final time as the closing ornament, smaller, centered below the sign-off
- After confetti settles: gentle ambient floating particles continue indefinitely
- Subtle "Made with love" footer at very bottom

**Tech**: canvas-confetti, GSAP SplitText, DrawSVG, tsParticles burst mode

---

## Global Systems

### Custom Cursor (Desktop Only)
- Small golden dot (8px) + larger ring follower (32px, gold border, transparent fill)
- Follower trails with 0.6s GSAP `quickTo` elastic follow
- **Hover states**: ring scales up 1.5x on links/buttons, shows "View" text on gallery images, shows "Scroll" on events section
- `mix-blend-mode: difference` for guaranteed visibility
- Scoped behind `@media (hover: hover) and (pointer: fine)`

### Scroll Progress Indicator
- 2px golden line at very top of viewport
- Width: 0% → 100% mapped to page scroll progress
- Uses Motion `useScroll` + `useTransform` for `scrollYProgress` → `scaleX`

### Floating Music Toggle
- Fixed position, bottom-right corner, 44px minimum tap target
- Muted by default (respects autoplay policy)
- Icon: animated sound wave bars (CSS keyframes when playing, static when muted)
- First visit: subtle "Tap for music" tooltip (auto-dismisses after 5 seconds or on any scroll)
- Audio: placeholder URL or Web Audio API ambient pad
- iOS: `audioContext.resume()` called on first user interaction event

### WebView Detection & Prompt
- Detect via `navigator.userAgent` for `WhatsApp`, `Instagram`, `FBAN`, `FBAV`
- If WebView: show floating banner "Open in browser for the full experience" with external link icon
- Graceful degradation in WebView:
  - No pinned horizontal scroll (use vertical cards)
  - No custom cursor
  - Reduced particles
  - Simpler transitions

### Performance Tiers

```
Tier 1 — High-End Desktop/Phone:
  All animations, particles (50+), custom cursor, full parallax, horizontal scroll pin

Tier 2 — Mid-Range Phone (hardwareConcurrency >= 4):
  Reduced particles (20), simpler parallax, no cursor, still has horizontal scroll

Tier 3 — Low-End Phone (hardwareConcurrency < 4) or WebView:
  Basic fade reveals only, no particles, native scroll (Lenis disabled),
  no pinned sections, no SplitText (full text appears), minimal SVG
```

Detection hook: `useDeviceCapability()` returns `'high' | 'medium' | 'low'`

### Accessibility
- `prefers-reduced-motion: reduce` → all animations disabled, content shown immediately, no particles
- Keyboard: Tab through interactive elements with visible gold focus ring, Escape closes lightbox, arrow keys navigate gallery
- Semantic HTML: `<main>`, `<section>`, `<header>`, `<footer>`, `<nav>`, `<figure>`
- ARIA: `aria-label` on all buttons, `role="dialog"` on lightbox, `aria-hidden` on decorative SVGs
- Color contrast: all text meets WCAG AA against dark backgrounds

---

## Data Architecture

**Single file: `src/data/weddingData.ts`**

Contains all wedding-specific content:
- Couple names, date, city, hashtag
- Sanskrit invocation text
- Family names and invitation text
- All 5 events (name, emoji, date, venue, address, description, mood color)
- Photo gallery placeholder entries
- All 3 venues with coordinates and map embed URLs
- Contact info (phone, email — placeholder)
- Closing message text

Clean TypeScript interfaces, well-commented, easy to customize without touching components.

---

## Folder Structure

```
src/
├── components/
│   ├── Loading/
│   │   └── Loading.tsx             # SVG mandala draw + curtain reveal
│   ├── Hero/
│   │   └── Hero.tsx                # Grand opening with particles + parallax
│   ├── FamilyBlessings/
│   │   └── FamilyBlessings.tsx     # Formal invitation with SVG frame
│   ├── Events/
│   │   ├── Events.tsx              # Horizontal scroll container
│   │   ├── EventPanel.tsx          # Individual event card
│   │   └── EventsMobile.tsx        # Vertical stack alternative
│   ├── Gallery/
│   │   ├── Gallery.tsx             # Editorial grid layout
│   │   └── Lightbox.tsx            # Fullscreen image viewer
│   ├── Venues/
│   │   └── Venues.tsx              # Venue cards with maps
│   ├── Closing/
│   │   └── Closing.tsx             # Save the date + confetti finale
│   ├── ui/
│   │   ├── MusicToggle.tsx         # Floating audio button
│   │   ├── ScrollProgress.tsx      # Top progress bar
│   │   ├── CustomCursor.tsx        # Golden dot + ring follower
│   │   ├── WebViewPrompt.tsx       # "Open in browser" banner
│   │   ├── FilmGrain.tsx           # Noise texture overlay
│   │   └── ParticleBackground.tsx  # Global ambient particles
│   └── svg/
│       ├── Mandala.tsx             # Main mandala SVG component
│       ├── PaisleyCorner.tsx       # Corner decoration
│       ├── PaisleyFrame.tsx        # Full ornate frame
│       ├── Diya.tsx                # Oil lamp with flame
│       ├── MehndiHand.tsx          # Henna hand silhouette
│       ├── SacredFire.tsx          # Agni/fire illustration
│       ├── FloralBorder.tsx        # Marigold garland border
│       └── DecorativeDivider.tsx   # Section separator ornament
├── hooks/
│   ├── useSmoothScroll.ts          # Lenis initialization + GSAP sync
│   ├── useGSAPScrollTrigger.ts     # ScrollTrigger setup/cleanup helper
│   ├── useMediaQuery.ts            # Responsive breakpoint detection
│   ├── useDeviceCapability.ts      # Performance tier detection (high/medium/low)
│   ├── useWebViewDetection.ts      # WhatsApp/Instagram WebView sniffing
│   ├── useReducedMotion.ts         # prefers-reduced-motion detection
│   ├── useMouseParallax.ts         # Cursor-position parallax (desktop only)
│   └── useAudioPlayer.ts           # Audio playback with iOS restrictions
├── data/
│   └── weddingData.ts              # ALL wedding content — single source of truth
├── styles/
│   └── index.css                   # Tailwind directives + custom properties + grain texture + cursor styles
├── App.tsx                         # Section orchestrator + global providers
└── main.tsx                        # Entry point
```

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Vite + React 18 + TypeScript scaffold
- [ ] Tailwind CSS v4 config with custom color palette
- [ ] Google Fonts (Cinzel, Cormorant Garamond, Outfit, Tangerine)
- [ ] Install GSAP, @gsap/react, Motion, Lenis, tsParticles, canvas-confetti
- [ ] Lenis smooth scroll setup with GSAP ScrollTrigger sync
- [ ] `weddingData.ts` — complete data file
- [ ] All custom hooks (scaffold with basic implementations)
- [ ] Basic section structure (7 sections, placeholder content)
- [ ] Film grain CSS overlay
- [ ] Performance tier detection
- [ ] WebView detection

### Phase 2: Loading + Hero
- [ ] Mandala SVG component (hand-crafted, multi-layer paths)
- [ ] Loading screen GSAP timeline (draw → fill → shatter → curtain)
- [ ] Hero section layout and typography
- [ ] GSAP SplitText name reveals
- [ ] tsParticles ambient floating gold particles
- [ ] Mouse parallax on hero decorative elements (desktop)
- [ ] Paisley corner SVGs with DrawSVG entrance
- [ ] Scroll-down cue animation
- [ ] Mobile optimization pass for hero

### Phase 3: Family Blessings + Events
- [ ] Ornate SVG frame component (PaisleyFrame)
- [ ] Frame draw animation on scroll (DrawSVG + ScrollTrigger scrub)
- [ ] Diya SVG with flame animation
- [ ] Text reveal animations (SplitText word-level blur reveal)
- [ ] Events horizontal scroll container (GSAP pin + horizontal translate)
- [ ] 5 event panel components with individual mood theming
- [ ] Per-event SVG motifs (marigold, mehndi, music, fire, deco)
- [ ] Per-event particle themes
- [ ] Mobile: vertical card layout alternative
- [ ] Progress dots indicator

### Phase 4: Gallery + Venues
- [ ] Editorial CSS Grid layout for gallery
- [ ] Photo placeholders with gold borders
- [ ] Staggered scroll reveal animations
- [ ] Per-image parallax at different speeds
- [ ] Desktop hover effects (lift, shadow, rotation)
- [ ] Lightbox component with layoutId transitions
- [ ] Lightbox navigation (swipe, arrows, keyboard)
- [ ] Venue cards layout
- [ ] Google Maps iframe embeds (lazy-loaded)
- [ ] SVG dotted path between venues
- [ ] Card reveal animations

### Phase 5: Closing + Global Systems
- [ ] Save the Date typography and reveals
- [ ] Confetti burst on section entry (canvas-confetti)
- [ ] Mandala redraw as closing bookend
- [ ] Golden particle shower
- [ ] Custom cursor component (GSAP quickTo)
- [ ] Scroll progress bar (Motion useScroll)
- [ ] Music toggle with iOS audio handling
- [ ] WebView prompt banner

### Phase 6: Polish + Testing
- [ ] `prefers-reduced-motion` pass across all components
- [ ] Mobile optimization (375px iPhone SE baseline)
- [ ] `100dvh` for all fullscreen sections
- [ ] Tap targets ≥ 44px
- [ ] Font sizes ≥ 16px
- [ ] Hover scoping behind `@media (hover: hover)`
- [ ] `env(safe-area-inset-*)` for notched phones
- [ ] CPU throttling test (4x slowdown)
- [ ] WebView graceful degradation test
- [ ] Cross-browser check (Chrome, Safari, Firefox, Edge)
- [ ] Lighthouse mobile score target > 85
- [ ] Animation choreography timing refinement
- [ ] Final performance pass (will-change discipline, lazy loading)

---

## Quality Checklist

- [ ] Lighthouse Mobile > 85
- [ ] Works: iPhone Safari, Android Chrome, Desktop (Chrome/Safari/Firefox/Edge)
- [ ] Works acceptably: WhatsApp WebView, Instagram WebView
- [ ] Clean TypeScript — no `any`, proper GSAP `gsap.context()` cleanup
- [ ] No memory leaks (all ScrollTriggers and timelines cleaned up on unmount)
- [ ] `prefers-reduced-motion` respected everywhere
- [ ] 375px (iPhone SE) — nothing overflows or clips
- [ ] 44px minimum tap targets
- [ ] Semantic HTML + ARIA labels
- [ ] The "wow factor" — genuinely impressive when opened

---

## The Experience

A guest gets a WhatsApp message with a link. They tap it. A golden mandala draws itself on a dark canvas — something beautiful is loading. The mandala shatters into floating particles as curtains part to reveal the hero. Names appear character by character in gold. As they scroll, a sacred invitation unfolds within an ornate frame. The events section sweeps them through five celebrations — each with its own world, its own mood, its own atmosphere. Photos reveal like a curated editorial. Venues show them exactly where to go. The finale bursts with confetti. They reach the end and think:

*"This is going to be an incredible wedding."*

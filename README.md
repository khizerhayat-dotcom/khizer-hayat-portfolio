# Portfolio Landing Page — Spotlight Hero + Full Site

A one-page portfolio site built with React 19 + TypeScript + Vite + Tailwind CSS.
The hero is a pixel-accurate recreation of the original reference design, with
a cursor-following "spotlight reveal" effect; the rest of the page extends the
same design system (Space Grotesk / Inter, black-white-orange, generous
whitespace) into a full, minimal, Apple-style one-pager.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
npm run lint       # oxlint
```

Requires Node 18+ (developed and verified on Node 22).

## Page structure

```
Navbar        fixed, site-wide pill nav (logo, links, "Get in Touch")
Hero          full-bleed portrait, spotlight reveal, headline, stats
NameBand      signature edge-to-edge "Khizer" display band bridging the red
              hero into the dark editorial body
TrustedBy     dark product strip
About         dark "I am Khizer" statement + real stat cards (3+/15+/7M+)
Work          "Selected work" — 4 case-study cards in a 2-column grid
Services      "What I do" — 4 service offerings
Process       "Four stages, every project" — the one place numbered steps
              earn their keep, since it's a genuine sequence
Approach      3 principle cards (how I work), dark
CTA           full-bleed black closing section, id="contact"
Footer        sitemap, social links, copyright
```

```
src/
  assets/                 base/reveal/background images (WebP, optimized)
  components/
    Navbar.tsx             fixed pill navbar, scrolls to each section by id
    Hero.tsx               hero layout orchestrator
    HeroContent.tsx         eyebrow, heading, paragraph, "Explore Projects" CTA
    Stats.tsx               the three stat callouts (desktop absolute + mobile row)
    SpotlightReveal.tsx     the cursor-spotlight image reveal (see below)
    RingDecoration.tsx      decorative concentric arcs, desktop only
    Reveal.tsx              shared scroll-reveal wrapper used by every section below the hero
    TrustedBy.tsx, About.tsx, Work.tsx, Services.tsx, Process.tsx,
    Approach.tsx, CTA.tsx, Footer.tsx
  hooks/
    usePrefersReducedMotion.ts
```

Hero measurements (colors, gradient, type scale, spacing, button and stat
positions) were taken directly from the supplied reference image/assets, so
the hero matches the original to within a few pixels. Sections below it are
original design work in the same system, not measured from a reference.

## How the spotlight reveal works

`SpotlightReveal.tsx` layers two images:

1. `base-image` — always visible, fills the section (`object-fit: cover`).
2. `reveal-image` — stacked on top, clipped by a CSS `mask-image` so it's only
   visible inside a soft circle around the pointer.

The mask's *shape* (a soft, feathered radial gradient) is drawn once into an
off-screen `<canvas>` that is never attached to the DOM, then exported via
`canvas.toDataURL()` and set as `mask-image` / `-webkit-mask-image`. That part
only needs to happen once (or if the spotlight radius / device pixel ratio
changes) — the bitmap itself never changes.

What *does* change every frame is `mask-position`, driven by a
`requestAnimationFrame` loop that lerps the smoothed pointer position toward
the raw pointer position:

```ts
smoothX += (rawX - smoothX) * 0.1;
smoothY += (rawY - smoothY) * 0.1;
```

This is the deliberate performance trade-off: regenerating and re-encoding a
canvas bitmap 60 times a second is expensive and unnecessary here, since only
the gradient's *position* changes, not its shape. Moving a mask is cheap;
re-rasterizing a PNG every frame is not. Pointer input is captured once in a
ref inside the `pointermove` listener and never touches React state, so the
whole effect runs without a single re-render.

`prefers-reduced-motion: reduce` disables the effect entirely (the reveal
layer isn't even mounted); the base portrait is shown as-is. The same
preference also disables every `Reveal`/`Navbar` entrance and scroll animation
site-wide, via Framer Motion's `<MotionConfig reducedMotion="user">` wrapping
the whole app in `App.tsx`.

## Responsive behavior

The desktop (≥1024px) hero mirrors the reference exactly, with stats and copy
absolutely positioned at the measured coordinates. Below that:

- The navbar collapses its link list, keeping the logo and CTA.
- The heading/paragraph/CTA move into normal document flow in the hero.
- The stat callouts switch from an absolute right-hand column to a wrapped
  row beneath the CTA.
- A soft dark scrim appears behind the hero copy only below `lg`, since it
  sits directly over the portrait there instead of beside it.

Every section below the hero is built mobile-first with Tailwind's responsive
grid utilities (2/3/4-column grids collapse to 1–2 columns on small screens),
so no separate mobile layout code is needed outside the hero.

`100dvh` is used instead of `100vh` throughout so mobile browser chrome
doesn't clip content.

The hero portrait uses split framing: `object-position` / `background-position`
are `40% 0%` below `lg` (subject upper-right, copy over the darker jacket area,
with a deepened bottom scrim) and the original measured `76% 9%` at `lg+`, so
the desktop composition is untouched. Verified with zero horizontal overflow at
320 / 360 / 390 / 768 / 1024 / 1440 px.

## Dark editorial theme

Everything below the hero uses a dark editorial system derived from the hero's
red/orange palette: `ink #0A0400` background, `coal #161009` cards,
`accent #D8480F` / `flame #F4620A` orange accents, `white/55–60` body text.
The signature element is the full-width "Khizer" NameBand after the hero.
Section headers are uppercase Space Grotesk with a small flame eyebrow.
Stats shown are real (3+ years, 15+ products, 7M+ downloads) — no invented
client counts or satisfaction percentages.

## Content

The site is personalized with real information from Khizer Hayat's CV and
Behance profile:

- **Hero, About, stats** - real bio, location (Lahore, Pakistan), UI/UX role,`r`n  and real product metrics.
- **Work** uses real case study cover images (`src/assets/work/`): Aspire
  (AI creative platform), Voicify (AI voice changer), Aurum (Web3
  mining/wallet app), and HD Camera (Android camera app). Each card is a
  straight `object-cover` `<img>` at a `4:3` aspect ratio matching the
  covers' native proportions exactly, so nothing gets cropped.
- **MoreWork** (`src/components/MoreWork.tsx`) lists five additional
  shipped products from the CV — eShaafi, ZM Player, Snaptune, goQR Code
  Scanner, WallHub — as a CV-style list with colored monogram badges
  (deliberately not real app icons, to avoid misattributing a logo that
  wasn't confirmed).
- **TrustedBy** shows the same real shipped product names instead of
  fictional client logos.
- **Footer / CTA** link to the real LinkedIn, Behance, and email
  (`khizer8743@gmail.com`). All "Project Link" / case study links point to
  the Behance profile (`behance.net/khizerhayat8743`) since individual
  project URLs weren't provided.

The former testimonials block was removed to avoid presenting fabricated
named quotes/metrics as real client feedback. It was replaced with an honest,
self-authored **Approach** section (`src/components/Approach.tsx`) describing
how Khizer works — no invented names, clients, or numbers. Drop in a real
testimonials section whenever verified client quotes are available.

## Fonts

Space Grotesk (display/heading) and Inter (everything else) are loaded from
Google Fonts in `index.html` with `preconnect` hints.


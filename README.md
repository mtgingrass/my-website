# markgingrass.com

Personal portfolio for Mark Gingrass, positioned for senior technical program management and solutions architecture work in GovTech and DefenseTech.

## Stack

- Astro 7 in static output mode
- TypeScript
- Bespoke CSS design system; no UI framework or portfolio template
- Netlify continuous deployment
- Netlify Function for the newsletter feed remains available at `/.netlify/functions/newsletter-feed`

## Local development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:4321` by default.

## Validation and production build

```bash
npm run build
npm run preview
```

The build runs `astro check` before creating the static site in `dist/`.

## Structure

- `src/pages/` — routes
- `src/layouts/` — shared document shell
- `src/components/` — shared navigation and section components
- `src/styles/global.css` — design system and responsive behavior
- `images/` — source portraits imported through Astro's image pipeline
- `netlify/functions/` — serverless newsletter feed proxy
- `*.qmd`, `_quarto.yml`, and `_quarto.scss` — retained legacy Quarto source for content reference; not used by the active build

The old `Learn`/book-list navigation has intentionally been removed. Current writing lives on the newsletter.

## Career film

The homepage opens with `src/components/CareerFilm.astro`. The 60-second film plays muted on arrival, with pause, restart, seeking, chapter navigation, and fullscreen controls. Reduced motion and data-saving preferences use the poster until the visitor presses play. Playback pauses outside the viewport or in a hidden tab.

`public/media/career/` contains an optimized 1920×1080 desktop film and a separately composed 720×1280 vertical mobile film, each with a WebP poster. Sources are `Career Film-desktop.mp4` and `Career Film Mobile.mp4`. The web exports use FFmpeg with `libx264`, `-preset slow`, CRF 23, `yuv420p`, and `-movflags +faststart`. Screens below 768px receive the vertical composition. Crossing that breakpoint switches sources while preserving playback position. Both cuts are 60 seconds and share chapter timings.

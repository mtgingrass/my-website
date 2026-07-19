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

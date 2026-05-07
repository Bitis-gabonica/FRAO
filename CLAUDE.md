# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **FRAO** (Fondation Rurale de l'Afrique de l'Ouest), a West African rural development foundation. Built with vanilla HTML, CSS, and JavaScript — no build tools, no framework, no dependencies.

## Local Development

```bash
python -m http.server 8000
# or: npx http-server
# Visit http://localhost:8000
```

No build, lint, or test commands exist.

## Architecture

### Data Layer
All content is hardcoded in two JavaScript data files:
- [js/data.js](js/data.js) — 6 projects (`projectsData` array), each with `id`, `title`, `image`, `type`, `zone`, `secteur`, `description`, `full_content`
- [js/actualites-data.js](js/actualites-data.js) — 30+ news articles (`actualitesData` array), each with `id`, `title`, `slug`, `date`, `year`, `category`, `image`, `excerpt`, `read_time_min`

### Page Routing
No router. Detail pages use URL query parameters (`?id=X`) to look up data client-side:
- [projet.html](projet.html) + [js/projet-detail.js](js/projet-detail.js) — renders a single project by `id`
- [actualite-detail.html](actualite-detail.html) — renders a single news article by `id`

Both redirect to the listing page if the ID is missing or invalid.

### JavaScript Files
| File | Purpose |
|------|---------|
| [js/main.js](js/main.js) | Homepage: renders flip-card project grid from `projectsData` |
| [js/projets.js](js/projets.js) | Projects page: renders non-flip project grid |
| [js/actualites.js](js/actualites.js) | News page: featured articles, category/year filtering, pagination (6/page) |
| [js/animations.js](js/animations.js) | Scroll-triggered Intersection Observer animations + hero word-reveal |

### CSS
Single stylesheet [styles.css](styles.css) (~1,840 lines). Uses CSS custom properties defined at the top:
- `--primary-green: #176b2f`, `--secondary-amber: #e69d00`
- Fonts: Montserrat (headings) and Work Sans (body), loaded from Google Fonts
- Icons: Iconify CDN v1.0.7 (lucide icon set)

## Key Conventions

- Language is **French** throughout (`<html lang="fr">`)
- Flip cards on the homepage (`.program-card`) differ from non-flip cards on [projets.html](projets.html) — they share class names but different JS generates them
- When adding projects or articles, also update [sitemap.xml](sitemap.xml) with the new detail page URLs
- The `full_content` field in `projectsData` is rendered as raw HTML via `innerHTML`

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
- [js/data.js](js/data.js) — 9 projects (`projectsData` array). IDs are 1–9 but appear in non-sequential order in the array (7,8,9,1,2,…,6). Fields: `id`, `title`, `image`, `type`, `zone`, `secteur`, `description`, `full_content`. **Note:** `full_content` is currently dead data — no page renders it. If you need long-form project copy on [projet.html](projet.html), wire it up in [js/projet-detail.js](js/projet-detail.js).
- [js/actualites-data.js](js/actualites-data.js) — ~50 news articles (`actualitesData` array). Fields: `id`, `title`, `slug`, `date`, `year`, `category`, `image`, `excerpt`, `read_time_min`. **There is no body field** — see Page Routing below.

### Page Routing
No router. Detail pages use URL query parameters to look up data client-side:
- [projet.html](projet.html) + [js/projet-detail.js](js/projet-detail.js) — renders a single project by `?id=`. Redirects to [projets.html](projets.html) if `id` is missing; sets the title to "Projet introuvable." if the id doesn't match (does *not* redirect).
- [actualite-detail.html](actualite-detail.html) — renders a single news article by `?id=` *or* `?slug=`. **All page logic (lookup, SEO meta, body generation, related articles, share buttons) is inlined** inside the HTML's `<script>` block — there is no separate JS file in [js/](js/). On a missing/unknown id, it falls back to `actualitesData[0]` rather than redirecting.
- The article body is **procedurally generated** by `generateRichContent(post)` inside [actualite-detail.html](actualite-detail.html) from the `category`, `title`, `excerpt`, and `date` fields plus a category→description lookup table. To customize an article's body, you currently must edit that template (or extend the data model with a `full_content` field and render it).

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

- Language is **French** throughout (`<html lang="fr">`); user-facing strings (including those built in JS) must stay French.
- Flip cards on the homepage (`.program-card` from [js/main.js](js/main.js)) and the cards on [projets.html](projets.html) (from [js/projets.js](js/projets.js)) share class names but are produced by different JS — edit the right file for the page you're touching.
- When adding projects or articles, also update [sitemap.xml](sitemap.xml) with the new detail page URLs.
- Article slugs in `actualitesData` are stored with a leading `/` (e.g. `"/atelier-..."`). The lookup `p.slug === slugParam` is exact, so any new entries must follow the same convention.
- Both [actualite-detail.html](actualite-detail.html) and [projet.html](projet.html) use `innerHTML` to render strings derived from data files — when adding entries, treat `description`, `excerpt`, `title`, and any HTML in `full_content` as trusted, hand-authored content.

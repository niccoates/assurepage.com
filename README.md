# Assurepage

A production-ready, framework-free static landing page built with semantic HTML and modern CSS.

## Project structure

- `index.html` — landing page, metadata and structured data
- `styles.css` — responsive design system and page styles
- `404.html` — custom not-found page
- `images/` — supplied logo and favicon assets
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — discovery and install metadata

## Preview locally

From the project directory:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

The repository is ready for Cloudflare Pages and requires no build process.

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `.` (repository root)

Configure the Pages project to deploy the repository root. The included `404.html` is used as the static not-found page.

## SEO and assets

The canonical URL is `https://assurepage.com/`. Metadata includes Open Graph, Twitter Card, and SoftwareApplication JSON-LD. Favicons and the Apple touch icon reuse the supplied files in `images/`.

No Open Graph image was supplied. Metadata references `/images/assurepage-og.png`; add a 1200×630 production social image at that path before launch.

## Lighthouse

Serve the site locally, open it in Chrome, then run Lighthouse from Developer Tools for Performance, Accessibility, Best Practices, and SEO. For meaningful performance results, use an incognito window and disable extensions.

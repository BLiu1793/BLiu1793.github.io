# Project 1 — Academic Website

Personal academic website of **Bo Liu**, Assistant Professor of Electrical Engineering,
Washington State University Tri-Cities. Built with [Astro](https://astro.build) and
[Tailwind CSS](https://tailwindcss.com), to be hosted on GitHub Pages.

> **Status:** Phase 3 (owner review and revisions). **Not published.** Nothing is pushed to
> GitHub until the site owner explicitly approves deployment (Phase 4).

## Objectives

- A fast, accessible, mobile-friendly academic site: Home (with CV PDF and professional
  service), Research, Publications, Teaching, Students, Contact.
- Content kept in plain data files (YAML/Markdown), so you can update it without writing code.
- Every build checks content against a schema, and the HTML and links are validated.

## Quick start (local preview)

Everything runs in this project's own Docker container (`node:24-bookworm-slim`). It does
not use or change `container_qc` or the Node.js installed in WSL.

```bash
cd Project_1_Academic_Website   # this folder
docker compose up -d          # start the preview server (installs packages on first run)
```

Open **http://localhost:4321** in your Windows browser. Saved edits appear automatically.

```bash
docker compose logs -f web               # watch the server log (Ctrl+C to stop watching)
docker compose run --rm web npm run check  # full check: types/content, build, HTML, links
docker compose down                      # stop the preview server
```

## Structure

| Path | What it is |
|---|---|
| `src/config.ts` | Name, title, email, office, profile links, feature switches |
| `src/content/bio.md` | Home-page biography |
| `src/content/publications.yaml` | All publications (one entry per paper) |
| `src/content/news/*.md` | News items (one file each) |
| `src/content/research.yaml` | Research highlight cards on the Home page |
| `src/content/projects/*.md` | Funded projects (Research page) |
| `src/content/service.yaml` | Professional service (shown on Home) |
| `src/content/students.yaml`, `teaching.yaml`, `awards.yaml` | Other page content |
| `src/content.config.ts` | Schemas: the rules every content file must follow |
| `src/pages/` | One file per page (`index.astro` = Home) |
| `src/components/`, `src/layouts/` | Shared page parts (header, footer, publication entry, …) |
| `src/styles/global.css` | Colors (WSU crimson accent), fonts, light/dark mode |
| `src/assets/headshot.jpg` | Home-page photo (optimized automatically) |
| `public/` | Files served as-is: `cv/Bo_Liu_CV.pdf` (linked from Home), `papers/*.pdf`, `favicon.svg` |
| `docs/MAINTENANCE.md` | **How to update the site**, step by step |
| `compose.yaml` | The project's Docker container |
| `notes/` | *Local only, never published:* plan, content review checklist, AI work log |
| `source_materials/`, `File/` | *Local only, never published:* original CV files, photo, and project brief |

## Dependencies

Node.js 24 LTS (in Docker), Astro 7, Tailwind CSS 4, `@astrojs/sitemap`. Development checks use
`@astrojs/check`, `typescript`, `html-validate`, and `linkinator`. Exact versions are locked in
`package-lock.json`.

`npm audit` reports 0 vulnerabilities in the site's own packages. It reports 3 moderate
advisories in `linkinator`'s dependencies (`glob`, `minimatch`). `linkinator` is a dev-only
link checker that runs only against the local build output and is never shipped. Revisit
this when `linkinator` releases an update.

## Updating content

See **[docs/MAINTENANCE.md](docs/MAINTENANCE.md)**: adding a paper, news item, student, or
course; replacing the CV PDF or headshot; checking; deploying; upgrading.

## Project-specific notes

- This project runs in its **own** Node.js container instead of `container_qc`, because the
  workspace container has no Node.js and must not be modified. The site owner approved this
  on 2026-11-18.
- AI assistance: the code, structure, and first-draft text were produced with Claude (AI).
  WSU guidance requires the byline "Developed with Claude (AI)" and a short statement of the
  AI's role. Both appear in the footer (`aiAttribution` and `aiRole` in `src/config.ts`); keep them.

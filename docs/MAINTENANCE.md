# Maintaining the website

This guide covers routine updates. Most changes mean editing one text file in `src/content/`
or `src/config.ts`; no programming is needed.

**Workflow for every change**

1. Start the preview: `docker compose up -d`, then open http://localhost:4321.
2. Edit the file in VS Code and save. The browser refreshes on its own.
3. Run the full check: `docker compose run --rm web npm run check`.
   It must finish without errors. A content mistake, such as a missing field or a misspelled
   type, makes it stop with a message that names the file and the field.
4. Commit: `git add -A && git commit -m "Add 2027 TSG paper"`.
   After deployment (Phase 4), also run `git push`. The site rebuilds itself in about 2 minutes.

> **YAML tips.** Indentation matters: use two spaces, never tabs. Wrap a value in
> `"double quotes"` if it contains a colon (`:`) or starts with a special character.

---

## Add a publication

Open `src/content/publications.yaml` and copy an existing entry. Entries can go anywhere in
the file, because the site sorts them by year.

```yaml
- id: tsg-2027-short-name          # unique, lowercase, no spaces
  type: journal                    # journal | conference | thesis | preprint
  title: "Full Title of the Paper"
  authors: [B. Liu, H. Wu]         # your name (B. Liu) is bolded automatically
  venue: IEEE Transactions on Smart Grid
  volume: 18
  issue: 1
  pages: 100–112
  year: 2027
  doi: 10.1109/TSG.2027.1234567    # without https://doi.org/
  # status: early-access           # or accepted; leave out once published
  # openAccess: true               # shows an "Open access" link
  # pdf: /papers/tsg-2027-short-name.pdf
  # arxiv: "2701.01234"
  # selected: true                 # also show under "Selected publications" on Home
  # corresponding: true            # you are corresponding author: shows B. Liu*
```

For conference papers, use the full conference name as `venue`, e.g.
`2027 IEEE Power & Energy Society General Meeting (PESGM)`. The page adds "in" automatically.

**PDF links.** Put the file in `public/papers/` and set `pdf: /papers/<file>.pdf`. For IEEE
journals, post only your **author-accepted manuscript**, never the publisher's final PDF.
IEEE's copyright policy allows the accepted version on a personal site, with the IEEE notice
and DOI on the first page. Open-access papers (IEEE Access, MDPI, JMPSCE, IET CPS) only need
`openAccess: true`.

**Tip:** You can get exact metadata from https://api.crossref.org/works/DOI (replace DOI with
the paper's DOI).

## Add a news item

Create a file in `src/content/news/`, named `YYYY-MM-short-name.md`:

```markdown
---
date: 2027-01-15
title: Paper accepted at IEEE PES General Meeting 2027.
link: https://doi.org/10.1109/...       # optional
---
```

The home page shows the 5 newest items, labeled by month and year.

## Students

Edit `src/content/students.yaml`.

- **Only list people who have agreed to be on a public website.** For current WSU students,
  also make sure they have no FERPA non-disclosure hold. Add `now:` (an alumnus's current job)
  only with that person's permission.
- When a student graduates, change `status: current` to `status: alumni` and add `years:`
  (e.g. `"2024–2028"`).
- To show a "Prospective students" note, set `showProspectiveStudents: true` in `src/config.ts`.

## Openings (Home page)

The "Openings" box below the introduction on the Home page shows the text in
`src/content/openings.md` (Markdown; write a link as `[text](url)`). Edit that file to change the
wording. To hide the box when positions are filled, set `showOpenings: false` in `src/config.ts`.

## Courses

Edit `src/content/teaching.yaml`. Add a term to `terms: [...]` or add a new entry. Use the
official catalog titles.

## Projects, service, awards

Edit the matching file in `src/content/`: `projects/*.md` (Research page), `service.yaml`
(the "Professional service" section on the Home page), or `awards.yaml` (Research page).

**Funded project details.** Each project is one file in `src/content/projects/`. The part
between the `---` lines holds the title, sponsor, role, and period. Everything **below** the
second `---` is the description shown on the Research page. Write it as ordinary paragraphs
(leave a blank line between paragraphs); Markdown such as `**bold**` and `[links](https://…)` works.

**Home page research cards** (title + one sentence each) are in `src/content/research.yaml`.

**Hidden entries.** Entries marked `confirmed: false` stay in the file but do not appear on
the site. They are CV items that had not been verified when the site was built (see
`notes/CONTENT_REVIEW.md`). To show one, delete that line or change it to `confirmed: true`.

Grant dollar amounts are stored but hidden. To show them, set `showFundingAmounts: true` in
`src/config.ts`.

## CV PDF

The **CV (PDF)** button on the Home page opens `public/cv/Bo_Liu_CV.pdf`.

1. In Word: **File → Save As → PDF**. Before saving, check **File → Info → Properties → Author**,
   because PDFs keep that field.
2. Save it as `public/cv/Bo_Liu_CV.pdf`, replacing the old one.

If the file is missing, the button is hidden. The PDF is public once the site is deployed,
so remove anything you don't want online (e.g. a personal phone number).

## Headshot

The photo is `src/assets/headshot.jpg`. To replace it, save a new portrait photo under the
same name (`.png` and `.webp` also work). The site compresses it and never enlarges it, so
an original at least 600 px wide looks sharper on high-resolution screens than the current
218 px one. If you delete the file, an initials badge appears instead.

## Title, contact details, profile links

- The Home page has no biography paragraphs (removed at the owner's request on 2026-11-18).
- Name, title, office, address, email, research interests, profile links: `src/config.ts`.
  To hide a profile link without deleting it, set `show: false`. ORCID and LinkedIn are currently hidden.
- Menu items: `nav` at the bottom of `src/config.ts`.

## Look and feel

Colors are defined at the top of `src/styles/global.css`. The site color is WSU crimson
`#A60F2D` (brand.wsu.edu), used for the header bar, section rules, card edges, buttons, and
links. The site always uses this light theme; there is no automatic dark mode, so every
visitor sees the same design. To change a color, edit its value in `:root`.

---

## Deployment (GitHub Pages) — only after the owner's approval

Not done yet. When approved (Phase 4):

1. Create a public repository named `USERNAME.github.io` on GitHub. GitHub Pages on a free
   account requires a public repository.
2. Add the GitHub Actions workflow `.github/workflows/deploy.yml` (official
   `withastro/action` → `actions/deploy-pages`) and set the site address
   (`SITE_URL=https://USERNAME.github.io`).
3. Check what will be published: `git ls-files`. `notes/` and `source_materials/` must **not**
   appear. Also check that every commit uses the GitHub noreply email, not a personal or WSU
   address: `git log --format='%ae %ce' | sort -u`.
4. `git remote add origin …` then `git push -u origin main`.
5. On GitHub: **Settings → Pages → Source: GitHub Actions**.

After that, every push to `main` rebuilds and republishes the site. For small text changes
you can also edit files on github.com directly ("Edit this file" → Commit), with no local
setup needed.

## Upgrading dependencies (about twice a year)

```bash
docker compose run --rm web npm outdated     # see what is newer
docker compose run --rm web npm update       # minor/patch updates
docker compose run --rm web npm run check    # must pass before committing
```

Major upgrades (e.g. Astro 8) can change how things work. Read the release notes first and
test on a separate git branch. To change the Node.js version, edit the `image:` line in
`compose.yaml`, then run `docker compose pull`.

## Troubleshooting

| Problem | Fix |
|---|---|
| `port is already allocated` | Something else uses 4321. Stop it, or change the left number in `compose.yaml` (`127.0.0.1:4322:4321`) and open :4322. |
| A new field (e.g. `corresponding:`) is ignored in the preview | The preview caches content rules; run `docker compose restart web`. The full check and the published site are not affected. |
| Page does not refresh after saving | `docker compose restart web`. If that keeps happening, add `WATCH_POLLING: "true"` under `environment:` in `compose.yaml`. |
| `InvalidContentEntryDataError` | The message names the file, entry, and field. Fix the typo or missing field in that file. |
| Packages seem broken | `rm -rf node_modules` then `docker compose up -d` (reinstalls). |
| Check fails on `html-validate` | It lists the page and line. Usually a missing `alt`, a duplicate `id`, or a stray tag. |

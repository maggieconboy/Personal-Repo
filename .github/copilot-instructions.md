# GitHub Copilot Instructions

## Repository Summary

This is Maggie Conboy's personal professional portfolio — a Jekyll-based GitHub Pages site showcasing her work as a Senior Product Manager at GitHub across AI products, enterprise platforms, Revenue Systems, and product operations. It includes HTML pages, custom CSS/JS, GitHub Actions workflows for issue automation and Pages deployment, and issue templates.

## Project Layout

```
/
├── index.html               # Homepage
├── portfolio.html           # Project portfolio
├── resume.html              # Resume page
├── research.html            # Research page
├── current-impact.html      # Current impact page
├── txrh-case-study.html     # Case study page
├── zendesk-personas.html    # Zendesk personas page
├── 404.html                 # Error page
├── css/styles.css           # Single main stylesheet (all responsive/component CSS)
├── js/
│   ├── main.js              # Core JS: nav active state, general interactivity
│   ├── mobile-menu.js       # Mobile hamburger menu logic
│   └── zendesk-carousel.js  # Swiper.js carousel for Zendesk personas
├── assets/                  # Images and media files
├── _config.yml              # Jekyll config (theme: jekyll-theme-primer)
├── README.md                # GitHub profile content (public-facing)
└── .github/
    ├── copilot-instructions.md
    ├── ISSUE_TEMPLATE/
    │   ├── engineer-sizing.yml   # Semester planning sizing form
    │   └── general-issue.yml     # General issue template
    └── workflows/
        ├── issue-refinement.yml  # Auto-labels/enriches issues on open/edit (Node.js 20)
        └── jekyll-gh-pages.yml   # Builds and deploys the GitHub Pages site
```

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript — no npm, no build step, no framework
- **External library**: Swiper.js (loaded via CDN in HTML files)
- **Site generator**: Jekyll (GitHub Pages); theme `jekyll-theme-primer` via `_config.yml`
- **Automation**: GitHub Actions using `actions/github-script@v7` with Node.js 20 and Octokit

## Build & Deployment

There is **no local build step** required for HTML/CSS/JS changes — files are source files.

**GitHub Pages deploys automatically** on every push to `main`. No manual deploy needed.

To optionally preview with Jekyll locally:
```bash
bundle install
bundle exec jekyll serve
# Visit http://localhost:4000
```

**There are no automated tests.** Validate changes manually:
1. Open the changed HTML file directly in a browser
2. Check console for JS errors
3. Verify responsive layout at mobile/tablet/desktop widths
4. Confirm navigation active state updates correctly (set by `js/main.js`)
5. For workflow changes, run manually: `gh workflow run issue-refinement.yml` or `gh workflow run jekyll-gh-pages.yml`

## CI / GitHub Actions

No CI pipeline runs on pull requests. There are two scheduled/event-driven workflows:

| Workflow | Trigger | What it does |
|---|---|---|
| `issue-refinement.yml` | Issue opened/edited | Auto-applies labels and enriches issue body via Copilot AI |
| `jekyll-gh-pages.yml` | Push to `main` / manual | Builds the Jekyll site and deploys it to GitHub Pages |

Workflow permissions are explicitly scoped in each workflow file.

## Code Conventions

- **JavaScript**: Use `const`/`let` and arrow functions (no `var`)
- **CSS**: All styles live in `css/styles.css`; follow existing BEM-style class names
- **HTML**: Semantic markup; include ARIA labels on interactive elements
- **Content tone**: Professional, outcome-focused, data-driven; use emoji consistently with existing pages
- **GitHub Actions YAML**: Keep permissions minimal; document non-obvious logic with inline comments

## Key Notes

- Profile text lives in `README.md` (rendered on the GitHub profile page)
- The `css/styles.css` file is large; search for existing component classes before adding new ones
- Active nav link state is set client-side in `js/main.js` by matching `href` to `location.pathname`
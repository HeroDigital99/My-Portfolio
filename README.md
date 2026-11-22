# Hussein Seliman - Portfolio

A static, multi-page professional portfolio for Hussein Seliman, Digital Marketing Specialist and Co-Founder at Hero Digital. The site name is **Hussein Seliman - Portfolio**. The implementation uses semantic HTML5, CSS3, vanilla JavaScript, reusable header/footer/project-card components, responsive layouts, accessible navigation, SEO metadata, project case studies, insights, and contact-ready placeholders.

## Local setup

Because the header and footer are loaded from `components/` with `fetch()`, run the site through an HTTP server rather than opening `index.html` directly:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000/`.

## Structure

`index.html` is the homepage. Top-level pages are in `pages/`, with project case studies in `pages/projects/` and insight articles in `pages/insights/`. Shared styles live in `css/`, shared behavior in `js/`, and reusable HTML fragments in `components/`. The supplied mark is stored in `assets/hero-logo.png`; evidence-ready folders include notes explaining what verified materials can be added.

## Replace placeholders before production

Update the canonical URL, Open Graph URLs, `robots.txt`, and `sitemap.xml` from `https://your-domain.example` to the final domain. The supplied verified CV is stored at `assets/documents/Hussein-Seliman-CV.pdf`. The current contact details are `Husseinseliman1@gmail.com` and WhatsApp `+20 10 2849 8510`; LinkedIn remains an explicitly labeled placeholder until a profile URL is supplied. Add approved project screenshots and creative evidence under `assets/projects/`, then replace the labeled gallery placeholders in the matching case studies. Add a real form endpoint or form service and replace the local-only notice in `js/main.js` before using the form in production.

Do not add campaign budgets, results, client names, testimonials, certifications, or tool claims unless they are verified and approved for publication. The Shaheen EGP 60,000 figure is intentionally excluded until its meaning and period are confirmed.

## Cloudflare Pages

Deploy the repository as a static site with the repository root as the output directory. The included `_redirects` file maps clean URLs such as `/about` and `/projects` to the corresponding HTML files. Replace the domain placeholders, confirm the redirects, and set the production domain in Cloudflare Pages.

## GitHub Pages

Publish the repository from the root using GitHub Pages. GitHub Pages will serve the `.html` files and the existing internal links. For clean URLs, use the provided `.html` links or add a repository-specific Pages redirect strategy. Replace all canonical and sitemap placeholders before submitting the site to search engines.

## Content and design notes

The Midnight Silver Glassmorphism system uses a dark navy foundation, metallic silver hierarchy, restrained ice-blue accents, translucent panels, and subtle motion. It does not fabricate performance evidence and it respects reduced-motion preferences. `manus-routes.json` lists the requested logical routes for Preview and hosting tooling.


## Madina Clinics project page

The client page is `pages/projects/madina-clinics.html`. The supplied logo and nine full-size design previews are stored in `assets/projects/madina/`; source Drive file IDs and original names are recorded in `assets/projects/madina/README.md`. Each gallery image preserves its supplied proportions and opens in the on-site image viewer.

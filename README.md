# Obsidian Studio

Premium websites and landing pages for local service businesses such as contractors, renovation companies, landscapers, barbershops, salons, realtors, mortgage brokers, and clinics.

This repo is a static site built to be hosted on GitHub Pages.

## Project structure

```text
obsidian-site/
├── index.html                  # Main site
├── example/
│   ├── contractor.html         # Renovation / contractor demo
│   ├── barber.html             # Barbershop booking demo
│   └── realtor.html            # Realtor / advisor demo
├── assets/
│   └── logo.png
├── CNAME                       # Custom domain for GitHub Pages
├── .github/workflows/pages.yml # GitHub Pages deployment
├── scripts/
│   └── dev-server.mjs          # Local static preview server
├── package.json
├── env.example
└── README.md
```

## GitHub Pages deploy

1. Push changes to the `main` branch.
2. Open the repository settings on GitHub.
3. Go to **Pages**.
4. Set **Source** to **GitHub Actions**.
5. Wait for the workflow to deploy the site.
6. Visit the GitHub Pages URL shown in the repository settings.
7. The custom domain `obsidianstudios.online` is declared in `CNAME`.
8. Point your DNS to GitHub Pages when you are ready to switch the domain.

## Hosting note

- GitHub Pages is the intended host for this repo.
- The site is static, so there is no backend runtime.
- The contact form opens the user's email app with a prefilled message.

## Environment variables

This static GitHub Pages version does not require runtime environment variables.

## Notes

- The logo is stored in `assets/logo.png`.
- The demo pages live in `example/`.
- Run `npm run dev` if you want a local preview server.
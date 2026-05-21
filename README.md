# Obsidian Studio

Premium websites and landing pages for local service businesses such as contractors, renovation companies, landscapers, barbershops, salons, realtors, mortgage brokers, and clinics.

This repo is a static site.

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
├── netlify/
│   └── functions/
│       └── contact.js          # Legacy backend file kept for reference
├── netlify.toml                # Legacy Netlify config kept for reference
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

## Important note

- GitHub Pages does not run Netlify Functions.
- The contact form now opens the user's email app with a prefilled message.
- If you want automated form delivery again later, connect a real form provider or move back to a host with server-side functions.

## Environment variables

This static GitHub Pages version does not require runtime environment variables.

## Notes

- The logo is stored in `assets/logo.png`.
- The demo pages live in `example/`.
- The live domain can be switched to GitHub Pages after DNS is updated.

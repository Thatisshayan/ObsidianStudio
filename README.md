# Obsidian Studio

Premium websites and landing pages for local service businesses such as contractors, renovation companies, landscapers, barbershops, salons, realtors, mortgage brokers, and clinics.

This repo is a static site with a Netlify Functions contact backend. No build step is required.

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
├── netlify/
│   └── functions/
│       └── contact.js          # Form handler (email + HubSpot + webhook)
├── netlify.toml
├── package.json
├── env.example
└── README.md
```

## Run locally

1. Install dependencies with `npm install`.
2. Run `npm run dev` to start Netlify Dev.
3. Open the local URL shown in the terminal.

## Deploy on Netlify

1. Create a new Netlify site and connect this repo.
2. Set the publish directory to `.`.
3. Set the functions directory to `netlify/functions`.
4. Add the environment variables below in Site settings > Environment variables.
5. Deploy.
6. Test the contact form at `/api/contact`.

## Environment variables

- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `RESEND_API_KEY`
- `HUBSPOT_PRIVATE_APP_TOKEN`
- `HUBSPOT_CREATE_DEAL`
- `CRM_WEBHOOK_URL`

## Notes

- The logo is stored in `assets/logo.png`.
- The demo pages live in `example/`.
- The public domain is `obsidianstudios.online`.

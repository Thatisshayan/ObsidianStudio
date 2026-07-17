# ObsidianStudio — Agent Rules

This file is the first-stop instruction set for any agent working in this repository.

## Mandatory Read Order

Before planning, editing, or reporting completion, every agent must read:

1. [README.md](./README.md)
2. [BRAND.md](./BRAND.md) — brand guidelines and visual identity
3. The site structure (see below)
4. The latest implementation notes (check for phase documents)

## Repo Structure

```
ObsidianStudio/
├── index.html                      # Main landing page
├── assets/                         # Images, logos, icons
│   ├── logo.svg
│   ├── hero-image.png
│   └── ...
├── styles/                         # CSS files (if separate)
├── scripts/                        # JavaScript files (if separate)
├── env.example                     # Example environment (if needed)
├── BRAND.md                        # Brand guidelines
├── pricing.html                    # Pricing page (if exists)
├── pricing-and-tiers.md            # Pricing documentation
├── README.md                       # Documentation
├── package.json                    # Dependencies (if using build tools)
├── .github/                        # GitHub configuration
├── .gitignore
├── CNAME                           # Custom domain (if deployed)
└── ...
```

## Project Type

**ObsidianStudio** is a **brand and portfolio website** — likely for a design/creative studio. The site showcases:

- Brand identity and values
- Portfolio/case studies
- Services offered
- Pricing and tiers
- Contact/CTA

## Key Conventions

- **Branding**: Follow BRAND.md for colors, typography, voice, and visual guidelines
- **Static or minimal**: Likely HTML/CSS/JS or a minimal framework
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG 2.1 AA standards (accessible to all users)
- **Performance**: Fast load times, optimized assets

## Development Workflow

### Local Development

1. Install dependencies (if any): `npm install` or `bun install`
2. Start dev server (if applicable): `npm run dev`
3. Edit files and refresh browser
4. Use browser DevTools (F12) to debug

### Building for Production

```bash
npm run build        # If build tool exists
npm run deploy       # If deployment script exists
```

### Asset Management

- **Images**: Keep in `assets/images/` with descriptive names
- **Logos**: `assets/logos/` (SVG for scalability)
- **Icons**: `assets/icons/` (SVG preferred)
- **Optimization**: Compress images before committing (TinyPNG, ImageOptim, etc.)

## Brand Guidelines (Reference)

Key items from BRAND.md (customize as needed):

- **Primary colors**: [Check BRAND.md]
- **Typography**: [Check BRAND.md]
- **Logo usage**: [Check BRAND.md]
- **Voice/tone**: [Check BRAND.md]
- **Spacing/layout**: [Check BRAND.md]

When making changes:

1. Refer to BRAND.md first
2. Maintain consistency with existing elements
3. Follow the established color palette and typography
4. Use brand-approved imagery and icons

## Common Tasks

### Update Homepage Content

1. Edit `index.html`
2. Update text, images, or sections as needed
3. Verify links and images load correctly
4. Test on mobile (use DevTools device emulation)

### Add a New Page

1. Create `new-page.html` in the root
2. Copy structure from `index.html` (keep header/footer consistent)
3. Add navigation link pointing to the new page
4. Follow BRAND.md for styling and layout

### Update Pricing

1. Edit `pricing.html` or update pricing section in `index.html`
2. Verify pricing structure matches `pricing-and-tiers.md` documentation
3. Test form submissions (if any)

### Add Testimonials/Case Studies

1. Create structured HTML for testimonial/case study cards
2. Use consistent styling (follow BRAND.md)
3. Include images, quotes, and source attribution
4. Ensure all images are optimized

## Deployment

### If Using GitHub Pages (Most Common)

1. Repo name should match domain (e.g., `obsidian-studio.github.io`)
2. Files in repo root or `/docs` folder are served automatically
3. CNAME file contains custom domain (if using one)
4. Push to `main`/`master` and GitHub auto-publishes

### If Using Vercel/Netlify

1. Connect GitHub repo to Vercel or Netlify
2. Set build command: `npm run build` (if applicable)
3. Set publish directory: `.` (root) or `dist/` (if build tool)
4. Push to main branch and auto-deploy triggers

### Custom Domain (CNAME)

If using a custom domain:

1. Add CNAME file with your domain: `example.com`
2. Update DNS records at domain registrar:
   - For GitHub Pages: Point to `username.github.io`
   - For Vercel: Point to Vercel's nameservers
   - For Netlify: Point to Netlify's nameservers

## SEO Optimization

### Essential Meta Tags

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Obsidian Studio — Creative design and branding...">
  <meta name="keywords" content="design, branding, studio, creative">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Obsidian Studio">
  <meta property="og:description" content="...">
  <meta property="og:image" content="assets/og-image.png">
  <meta property="og:url" content="https://obsidian-studio.com">
  
  <title>Obsidian Studio — Creative Design & Branding</title>
</head>
```

### Structured Data (JSON-LD)

Add schema for better search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Obsidian Studio",
  "url": "https://obsidian-studio.com",
  "logo": "https://obsidian-studio.com/assets/logo.svg",
  "description": "Creative design and branding studio"
}
</script>
```

## Performance Optimization

- **Images**: Use modern formats (WebP) with fallbacks
- **Lazy loading**: `<img loading="lazy">`
- **CSS**: Minify in production
- **JavaScript**: Defer non-critical scripts
- **Fonts**: Use system fonts or limit web fonts to 2-3
- **Caching**: Set appropriate cache headers for static assets

## Accessibility (A11y)

- All images have descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for text
- Keyboard navigation works (Tab key)
- Form labels associated with inputs
- Skip links for keyboard navigation
- Headings in logical order (h1 → h2 → h3)

## Completion Standard

An agent must not mark work complete until:

- All changes are applied and visible in dev environment
- All links work (internal and external)
- All images load and are optimized
- Mobile responsiveness verified (test on 3+ devices)
- BRAND.md guidelines are followed
- No console errors in DevTools
- SEO meta tags are present (if changed)
- Changes committed with clear messages
- The final report distinguishes completed work, deferred work, and pre-existing issues

## Known Gaps & Deferred Items

- [ ] **CMS integration**: Currently static; Headless CMS (Contentful, Sanity) for content management is deferred
- [ ] **Contact form backend**: Forms not wired to backend service
- [ ] **Analytics**: No Google Analytics or event tracking
- [ ] **Blog/News**: Content management for blog posts not implemented
- [ ] **Multilingual**: Currently single language only
- [ ] **A/B testing**: No variant testing or analytics

## Support & Troubleshooting

- **"Styles don't match BRAND.md"**: Review BRAND.md again; use exact colors/fonts specified
- **"Page looks broken on mobile"**: Test with DevTools device emulation; verify viewport meta tag
- **"Images not showing"**: Check file paths; ensure images are in `assets/` folder
- **"Fonts look wrong"**: Verify font files are loaded; check BRAND.md for font stack
- **"Site slow to load"**: Compress images; minimize CSS/JS; check for unoptimized assets

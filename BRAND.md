# Obsidian Studios - Design Philosophy

## Design Direction: Faceted Precision

### Brand Essence
**Positioning:** A boutique web design studio that builds fully custom, premium websites for small and local businesses — not templates with a logo swapped in.
**Personality:** Premium, Precise, Quietly Confident

### Design Movement
Editorial minimalism meets geometric brand systems — drawing directly from the studio's own mark (a faceted prism/diamond) rather than a generic "agency dark mode" look. The facets of the logo become the site's core visual language: every accent, divider, and hover state is built from the same triangular geometry as the icon itself.

### Core Principles
1. **Faceted Geometry** - The diamond mark isn't just a logo in the corner; its triangle facets recur as section dividers, card corners, and hover reveals.
2. **Earned Gold** - Gold is used sparingly and only for outcomes and actions (CTAs, results, client names) — never as background decoration.
3. **Quiet Confidence** - No hype copy, no fake urgency. The portfolio does the convincing.
4. **Built, Not Templated** - The site itself is the studio's proof of craft — it must not look like anything a page builder could produce.

### Color Philosophy
- Background: `#12151a` (near-black with a navy bias, not pure black — ties to the logo's ink)
- Ink/secondary surface: `#1c212a`
- Text: `#e7e6ea` (cool-tinted off-white, matches the logo's silver facet)
- Secondary text: `#90909c` (the logo's slate facet, used as-is)
- Accent (gold): `#cc9c24`, brightened to `#e0b64a` for text-on-dark use — the exact gold from the logo, not a generic amber
- Rationale: every color in the palette is sampled directly from the studio's own logo. Nothing was invented — the brand system *is* the mark, extended.

### Layout Paradigm
**Faceted Hero + Editorial Case Studies** — hero uses an oversized, semi-abstract triangle-facet construction (built in CSS, echoing the diamond mark) behind the headline. Portfolio section is case-study-led (one large feature per project, not a uniform 3-column grid) since the studio has few, high-quality projects rather than many small ones.

### Signature Elements
1. **Facet Dividers** - angled, triangle-clipped section transitions instead of straight horizontal lines
2. **Gold Corner Facet** - a small triangular gold accent clipped into the corner of cards/case studies, echoing the logo's gold facet specifically (not the whole diamond)
3. **Tracked-Out Caps** - display headings set in wide letter-spaced uppercase, matching the "OBSIDIAN" wordmark treatment already established
4. **Mono Meta Labels** - small monospace eyebrow labels/tags (ties visual identity to the studio's own proposal documents, which use the same device)

### Interaction Philosophy
- Hover: card lift + gold corner facet grows slightly, no color-flood hover states
- Buttons: scale to 0.97 on press
- Scroll reveals: fade + 12px rise, staggered ~0.08s between siblings
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` throughout

### Animation Guidelines
- Entrance: 0.5s, staggered
- Hover: 0.25s
- Respects `prefers-reduced-motion` fully (durations collapse to near-zero)
- No parallax/scroll-jacking — this is a trust-building B2B site, not a flashy consumer landing page

### Typography System
**Display:** system uppercase sans, wide tracking (`0.08em`+), medium weight — mirrors the existing "OBSIDIAN" wordmark rather than introducing a new unrelated display face
**Body:** system humanist sans, regular weight, comfortable line-height for longer case-study copy
**Meta/labels:** `ui-monospace` stack, small size, uppercase, tracked — ties to the proposal-document identity
**Scale:** fluid `clamp()` from h1 to body, no fixed breakpoint jumps

### Brand Voice
**Headlines:** Direct, specific, no hype — "Websites built for the business you actually run," not "Take Your Business to the Next Level"
**CTAs:** "Book a Call", "See the Work" — never "Learn More" or "Submit"
**Microcopy:** Confident and plain — "Three projects. Three industries. Same standard." not "We are passionate about design excellence"

### Signature Brand Color
Gold `#cc9c24` — appears only on: primary CTA, the corner-facet accent, and client-result numbers. Nowhere else.

### Visual Assets
- Real logo (prism mark + wordmark), transparent icon-only crop for light contexts
- Real portfolio screenshots: Tooka Door Artisans, Donya Kavoosi
- No stock photography — if a section would need a generic stock image, redesign the section instead

### Accessibility Standards
- WCAG AA contrast verified against the exact palette above (gold text use restricted to sizes/weights that clear 4.5:1 on the dark background)
- Focus-visible states in gold, visible against dark background
- Full keyboard nav, semantic landmarks, alt text on all real images
- `prefers-reduced-motion` respected

### Performance Targets
- Static HTML/CSS/JS, no framework/build step — matches this repo's existing GitHub Pages hosting, loads instantly
- LCP < 1.5s (no hero image, CSS-only hero construction)
- Fonts: system stack only, zero webfont requests

### Responsive Breakpoints
Mobile-first, fluid `clamp()` scaling throughout — no breakpoint-jump layout, single-column below 720px

### Style Decisions
1. **No stock photography anywhere** — if there's no real asset, the section is redesigned rather than filled with a placeholder image.
2. **Bright Star Auto excluded from portfolio** — that engagement hasn't closed yet; only shipped, client-approved work is shown.
3. **Static HTML, not React** — deviates from the general skill's default stack because this repo is already a working static GitHub Pages site with zero backend needs; introducing a build step would add maintenance cost with no benefit for a 4-section marketing page.
4. **No numbered process steps unless the content is genuinely sequential** — the "how we work" section only gets numbering because it's a real, ordered process; the portfolio and services sections are not sequences, so they don't get numbers.

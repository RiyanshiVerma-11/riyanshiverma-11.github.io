# Modular Styles Architecture

This directory contains the modular source code for the portfolio's stylesheets.

## Directory Structure

```text
styles/
├── 01-variables.css       # Design tokens, color palettes, fonts, spacing, shadows
├── 02-base.css            # Reset, utilities, typography, container, buttons, glass cards
├── 03-nav.css             # Header, logo, desktop navigation, mobile drawer overlay
├── 04-hero.css            # Hero section, photo showcase, floating badges, stats dock, glowing ranks
├── 05-about.css           # Academic editorial showcase, CGPA card, bento metrics, target roles
├── 06-skills.css          # Skills grid, category tabs, skill cards
├── 07-projects.css        # 3D tilt project cards, case studies, tags
├── 08-experience.css      # Chronological experience timeline, multi-colored spine rail, metric cells
├── 09-honors.css          # Competitive victories list, GCP diamond league block, verified credentials
├── 10-sandbox.css         # AI Lab System Sandbox, dual-deck layout, console, flow map
├── 11-contact.css         # Contact card, form, alternatives, footer
├── 12-modals.css          # Architecture modal inspector, recruiter quick-hire modal, command palette
├── 13-chatbot.css         # AI persona chatbot widget, floating trigger button, dialog
├── 14-features.css        # System boot preloader, theme switcher, typography polish, print styles
├── 15-animations.css      # Global keyframes, breathing aura pulses, scroll reveals
└── 16-light-theme.css     # Consolidated light mode and classic light theme system overrides
```

## How to Work with Styles

Instead of editing the 10,000+ line `style.css` directly:
1. Open and edit the specific component file in `styles/` (e.g. `05-about.css` for education/bento, `08-experience.css` for timeline).
2. Run the bundler to compile into production `style.css`:
   ```bash
   node build-css.js
   # or
   npm run build:css
   ```
3. To auto-rebuild on every save during development:
   ```bash
   node build-css.js --watch
   # or
   npm run watch:css
   ```

## Production Deployment
GitHub Pages serves the compiled root `style.css`. Because the bundler outputs a single, clean stylesheet:
- Zero extra HTTP roundtrips.
- Zero Flash of Unstyled Content (FOUC).
- Instant First Contentful Paint (FCP) on mobile and desktop.


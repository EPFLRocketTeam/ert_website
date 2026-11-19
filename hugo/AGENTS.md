# AGENTS.md - EPFL Rocket Team Website

## Project Overview

This is a **Hugo static site** with **TinaCMS** for content management. The site is multilingual (English, French, German) and uses a custom theme `EPFL-Rocket-Team`.

## Build Commands

### Hugo Development Server
```bash
hugo server -D
```
Starts the Hugo development server with drafts enabled at `http://localhost:1313`.

### Hugo Production Build
```bash
hugo
```
Generates the static site to the `public/` directory.

### TinaCMS Development
```bash
npx tina-dev dev
```
Starts the TinaCMS dev server (requires `.env` with `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`).

### TinaCMS Production Build
```bash
npx tina build
```
Builds the TinaCMS admin panel.

### Node Dependencies
```bash
yarn install   # Install dependencies
```

### Image Optimization
```bash
./convert_to_webp.sh
```
Converts images to WebP format.

## Project Structure

```
hugo/
├── content/           # English content (Markdown)
├── content.fr/        # French translations
├── content.de/       # German translations
├── tina/
│   └── config.ts      # TinaCMS content schema definition
├── themes/
│   └── EPFL-Rocket-Team/  # Custom theme
├── static/            # Static assets (images, icons)
├── hugo.toml          # Hugo configuration
└── package.json       # Node dependencies (TinaCMS)
```

## Content Guidelines

### Frontmatter Format

All content files use YAML frontmatter:

```yaml
---
title: "Page Title"
subtitle: "OPTIONAL SUBTITLE"
header_title: "HEADER TITLE"
header_text: "Header description text"
header_background: "/images/path.jpg"
date: 2025-03-12T20:54:33+01:00
layout: single
padding: 30px
callToAction:
    text: "Button text"
    action: "BUTTON LINK"
specs:
  - key: "Label"
    value: "Value"
highlights:
  - key: "Label"
    value: "Value"
---
```

### Content Collections (TinaCMS)

Defined in `tina/config.ts`:
- `post` - Blog posts (`content/posts/`)
- `about` - About pages (`content/about/`)
- `contact` - Contact pages (`content/contact/`)
- `join_us` - Join us pages (`content/join-us/`)
- `projects` - Project pages (`content/projects/`)
- `shop` - Shop pages (`content/shop/`)
- `sponsors` - Sponsor pages (`content/sponsors/`)
- `privacy_policy` - Privacy policy (`content/privacy-policy/`)
- `space_race` - Space race pages (`content/space-race/`)
- `board` - Board pages (`content/about/board/`)

### Available Shortcodes

The theme provides many shortcodes. See `themes/EPFL-Rocket-Team/layouts/shortcodes/`:

- `{{< flexbox >}}` - Flexbox container
- `{{< specs >}}` - Specifications table
- `{{< highlights >}}` - Highlights section
- `{{< component-section >}}` - Rocket component section
- `{{< video >}}` - Video player
- `{{< gallery >}}` - Image gallery
- `{{< card >}}` - Card component
- `{{< accordion >}}` - Collapsible sections
- `{{< grid >}}` - Grid layout
- `{{< pdf-report src="/reports/report.pdf" title="Technical report" size="98 MB" >}}` - Scrollable PDF.js reader

### PDF Reports

Store reports in `static/reports/`. The `pdf-report` shortcode loads its styles and script only on pages that use it,
and loads the document automatically. All pages are continuously scrollable, but only pages near the reader's
viewport are rendered; offscreen canvases are released to limit memory use. Open/download links also work
without JavaScript. The original PDF remains available for text selection and assistive document readers.
Byte-range-capable hosting avoids fetching the entire PDF for a preview.
The toolbar includes page navigation, zoom, and a fullscreen toggle where the browser supports the Fullscreen API.
Visitors can leave fullscreen with the same button or Escape.

PDF.js 5.4.394 is self-hosted in `static/vendor/pdfjs/` with its Apache-2.0 license. When updating it, replace
`pdf.min.mjs` and `pdf.worker.min.mjs` together from the same `pdfjs-dist` release, along with `cmaps/`,
`standard_fonts/`, `wasm/`, and their licenses. No Node build step or external CDN is needed for the reader.

### Multilingual Content

- Add content to `content.fr/` for French
- Add content to `content.de/` for German
- Frontmatter and body content should be translated
- Keep file names consistent across language directories

## Code Style Guidelines

### TypeScript (TinaCMS config)

- Use **ES modules** (`import`/`export`)
- Use **TypeScript** types from `@tinacms/cli`
- Follow standard TypeScript naming: `PascalCase` for types, `camelCase` for variables
- Use explicit return types for functions

### Hugo Templates

- Use Hugo's built-in functions and template syntax
- Follow Go template conventions
- Use partials for reusable components in `layouts/partials/`

### Markdown Content

- Use ATX-style headers (`#`, `##`, `###`)
- Use fenced code blocks with language identifiers
- Keep lines under 120 characters when practical
- Use descriptive link text

### CSS/ Styling

- Theme uses two styles: `original` and `herman` (set in `hugo.toml`)
- Page-specific CSS can be defined in frontmatter: `css: "page.css"`
- Put custom CSS in `static/css/` directory

### Images

- Place images in `static/images/`
- Use WebP format when possible
- Keep original quality images in `static/images/originalQuality/`
- Reference images with absolute paths from static (e.g., `/images/path.jpg`)

## Development Workflow

1. Create/edit content in `content/` directory
2. Run `hugo server -D` to preview changes
3. For TinaCMS: Set environment variables and run `npx tina-dev dev`
4. Build for production with `hugo`
5. Commit changes to git

## Environment Variables

For TinaCMS development, create a `.env` file:
```
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

## No Tests

This project does not have automated tests configured. The `package.json` test script is a placeholder.

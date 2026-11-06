# Customization Guide

Use this guide when adapting Relay for a real publication.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the site name, default metadata, canonical domain, language and date locale, contact details, social links, newsletter form settings, and navigation labels.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

## Categories

Categories live in one place: [src/config/categories.ts](./src/config/categories.ts). Add, remove, or rename categories there, then update demo posts so every `category` frontmatter value still matches the allowed list.

The `categoryLayouts` map in the same file controls how each category archive presents its posts. Every category must use one of three layouts:

- `featured` shows the newest post as a large overlay lead, followed by a card grid.
- `grid` uses the standard image-card grid.
- `list` displays one image-led editorial post per row.

Change a category’s value in the map to switch its layout; no route or component duplication is required.

`categorySlug` derives URLs from the category name, lowercasing it and turning spaces and ampersands into hyphens — so `Apps & Tools` becomes `/category/apps-tools/`.

Header and footer navigation are generated from that same category list in [src/config/site.ts](./src/config/site.ts). You do not edit navigation labels or URLs separately unless you customize the layout components.

## Newsletter

The newsletter form is intentionally provider-neutral. Configure it in `siteConfig.newsletter`:

```ts
newsletter: {
  enabled: true,
  action: "https://example.com/newsletter",
  method: "post",
  emailFieldName: "email",
}
```

The form submits only when `enabled` is `true` and `action` is non-empty. Otherwise the theme renders a clearly disabled preview. For production, connect it to your email provider or replace [src/components/NewsletterSignup.astro](./src/components/NewsletterSignup.astro) with provider-specific markup.

## Contact Form

The contact form follows the same safe-default pattern. Configure `siteConfig.contact` with `enabled: true`, a form endpoint in `action`, and the appropriate method. Until then, every control is disabled and no visitor data can be submitted. Contact email, office lines, and response time also live in `siteConfig`.

The default email, office, and social links are presentation-friendly examples. Replace them with real publication details before production; contact and newsletter form submission remain disabled until real endpoints are explicitly enabled.

## Post Frontmatter

Every post is validated by the schema in [src/content.config.ts](./src/content.config.ts). Beyond the obvious fields, a few are worth knowing about:

- Read time is not a frontmatter field. It is counted from the post body at build time, ignoring code blocks and Markdown syntax, at the reading speed set by `siteConfig.wordsPerMinute` (225 by default).
- `trending: true` promotes a post into the homepage trending rail and the "Most read" sidebar. Falls back to newest-first when too few posts are flagged.
- `draft: true` hides a post from every listing, feed, search index, and route.
- `cover.showInPost: false` keeps the cover for cards, rails, and social images but omits it from the article itself, so a post can run as a text-only document.
- `updatedDate` renders an "Updated" line under the article body and drives `dateModified` in the article's JSON-LD.

## Images

Posts keep images next to each Markdown file. Each cover needs useful alt text and a credit URL. Astro optimizes theme-controlled images during build, but source images should still be reasonably sized before shipping a production site.

## Code Blocks

Fenced code blocks are highlighted at build time by Shiki using the light and dark theme pair in [src/config/code.ts](./src/config/code.ts). Both themes are emitted into the same markup and swapped by CSS, so code follows the reader's colour mode with no flash and no client-side highlighter. Change `codeThemes` to any [Shiki theme](https://shiki.style/themes) name to restyle code without touching a component.

A copy button is added to each block by a small script in [src/pages/post/\[slug\].astro](./src/pages/post/[slug].astro).

## Icons

Social and share icons are hosted locally in [src/icons/bootstrap](./src/icons/bootstrap) and rendered through [src/components/LocalIcon.astro](./src/components/LocalIcon.astro). To add a new social network, add its SVG to that folder, register it in the `icons` map in `LocalIcon.astro`, then map the `siteConfig.socials` label to that icon name in [src/lib/socials.ts](./src/lib/socials.ts). Labels with no mapping fall back to a generic link glyph.

The bundled SVGs come from Bootstrap Icons and include their MIT license notice in the icon folder.

Editorial UI icons — arrows, chevron, search, theme toggle, menu, close, link — are drawn inline by [src/components/ui/Icon.astro](./src/components/ui/Icon.astro) instead, so no icon font or sprite is requested.

## Pages

Core static pages live in [src/pages](./src/pages):

- `about.astro`
- `contact.astro`
- `privacy.astro`

Replace the starter copy with publication-specific masthead, advertising, privacy, and legal information.

## Search

Relay includes static, client-side search with no database or hosted search service. The search button in [src/components/SiteHeader.astro](./src/components/SiteHeader.astro) opens a command palette, while [src/pages/search.astro](./src/pages/search.astro) provides the full `/search/?q=...` results page.

At build time, [src/pages/search-index.json.ts](./src/pages/search-index.json.ts) generates `/search-index.json` from every published post. The index contains the post title, excerpt, category, author, tags, date, and URL; it does not contain the full article body. Opening the command palette loads this index on demand, ranks title matches ahead of supporting metadata matches, and displays up to seven results. The full search page reads the `q` URL parameter and renders all matching posts.

Search can be opened from the header or with `Ctrl + K` on Windows and Linux, `Command + K` on macOS, or `/` while focus is outside a form control. Use the arrow keys to move through command-palette results and `Escape` to close it.

This approach is a good fit for publications with a few hundred posts and should remain comfortable around 1,000 posts. Filtering that amount of metadata in the browser is inexpensive, and the command palette limits the number of rendered results. For a large archive, consider limiting or paginating the full search page because a broad query can otherwise render many result cards at once.

For several thousand pages, full-body search, multilingual search, or richer filtering, consider replacing the built-in index with [Pagefind](https://pagefind.app/). Pagefind indexes the generated `dist` HTML after `astro build`, splits its static index into chunks, and does not require a search server. It is intentionally not included as a default dependency; adopting it requires adding Pagefind to the build and deployment pipeline and connecting its API to the existing search interface.

Because Relay's built-in index is generated statically, newly published or edited posts become searchable after the next site build.

## Theme Tokens

Global colors, typography, borders, focus styles, dark mode, and motion rules live in [src/styles/global.css](./src/styles/global.css). Prefer editing tokens near the top of that file before changing individual components.

## Fonts

Relay self-hosts [Geist](https://vercel.com/font) (variable weight, OFL-licensed) from `public/fonts/geist`. `--font-sans` covers headings and body; `--font-mono` uses Geist Mono for code. Sizes come from the `--fs-*` scale in `:root`, which steps up at the `40rem` and `64rem` breakpoints — change the scale there rather than per component. To swap typefaces, replace the `@font-face` rules and font tokens at the top of [src/styles/global.css](./src/styles/global.css) and drop your own font files in `public/fonts`.

## Scroll Reveal

Add the `reveal` class to any section to have it fade and rise into view as it scrolls into the viewport. Elements are fully visible without JavaScript or when the visitor has `prefers-reduced-motion` set; the reveal only activates progressively via a small IntersectionObserver script in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro). Avoid adding it to hero or above-the-fold content, since it delays first paint of content visitors already see on load.

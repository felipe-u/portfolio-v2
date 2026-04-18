# Portfolio v2 — Architecture & Rules

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Folder Structure

```
portfolio-v2/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx       ← sets <html lang>, wraps providers
│   │   └── page.tsx         ← assembles sections, passes dict props
│   ├── globals.css
│   └── layout.tsx           ← minimal root layout
│
├── sections/                ← one subfolder per section
│   ├── hero/
│   ├── experience/
│   ├── projects/
│   ├── skills/
│   └── contact/
│
├── components/              ← reusable UI (Navbar, ProjectCard, SkillIcon, etc.)
│
├── dictionaries/            ← all translatable content
│   ├── en.json
│   └── es.json
│
└── lib/
    └── getDictionary.ts     ← loads the right JSON by lang
```

## i18n Rules

- URL-based routing: `/en` and `/es`
- `proxy.js` (NOT `middleware.ts`) handles browser language detection and redirects `/` to `/en` or `/es`
- `generateStaticParams` in `app/[lang]/layout.tsx` returns `[{ lang: 'en' }, { lang: 'es' }]`
- All translatable strings live in `dictionaries/en.json` and `dictionaries/es.json`
- `app/[lang]/page.tsx` loads the dictionary and passes content as props to each section

## Server vs Client Components

- Sections are **Server Components** by default — they receive content as props and render static HTML
- Animated sections use a thin **Client Component wrapper** that adds Framer Motion — the section itself stays a Server Component
- **Navbar** is a **Client Component** — needs `useRouter` for the language toggle
- Add `'use client'` only where state, events, or browser APIs are needed

## Design

- Background: `#0a0f1e`
- Theme colors defined as CSS custom properties in `globals.css`
- Single-page, scroll-based layout
- Navbar: fixed/sticky at top with anchor links to each section
- Language toggle in Navbar: EN / ES

## Sections (in order)

1. Hero / About Me
2. Experience
3. Projects
4. Skills
5. Contact

## Content Policy

- **Never invent content.** Bio, experience descriptions, project details, URLs, and asset paths are added by the developer later.
- Use `// TODO: add content` comments as placeholders where real content goes.
- Content stubs should be obviously fake (e.g. `"Title goes here"`) so they're never mistaken for real copy.

## Stack Gotchas

- **Next.js 16**: `params` is a `Promise` — always `await params` before destructuring
- **Tailwind v4**: use `@import 'tailwindcss'` in CSS, no `tailwind.config.js`, theme via CSS custom properties
- **Framer Motion**: must be in a `'use client'` component
- **TypeScript**: use `PageProps<'/[lang]'>` and `LayoutProps<'/[lang]'>` for route prop types (globally available helpers in Next.js 16)

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
│   │   ├── layout.tsx       ← sets <html lang>, wraps providers, renders Navbar
│   │   └── page.tsx         ← merges dict + data, passes props to each section
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
├── dictionaries/            ← translatable strings only
│   ├── en.json
│   └── es.json
│
├── data/                    ← lang-agnostic facts (TypeScript, not JSON)
│   ├── experience.ts        ← company, dates, tech used
│   ├── projects.ts          ← repo/demo URLs, tech stack, image paths
│   └── skills.ts            ← skill names, icon identifiers
│
└── lib/
    └── getDictionary.ts     ← loads the right JSON by lang, exports Dictionary type
```

## i18n Rules

- URL-based routing: `/en` and `/es`
- `proxy.ts` (NOT `middleware.ts`) handles browser language detection and redirects `/` to `/en` or `/es`
- `generateStaticParams` in `app/[lang]/layout.tsx` returns `[{ lang: 'en' }, { lang: 'es' }]`
- All translatable strings live in `dictionaries/en.json` and `dictionaries/es.json`
- `app/[lang]/page.tsx` merges the dictionary (text) with `data/` (facts) and passes both as props to each section

## Server vs Client Components

- Sections are **Server Components** by default — they receive content as props and render static HTML
- Animated sections use a thin **Client Component wrapper** that adds Framer Motion — the section itself stays a Server Component
- **Navbar** uses a server/client split: `components/Navbar/index.tsx` (server) fetches the dictionary and renders `NavbarClient.tsx` (client) which handles interactivity (`useRouter`, mobile menu state)
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

## Content Strategy

Two-layer split — each layer has a single responsibility:

### Layer 1 — Dictionaries (`dictionaries/en.json`, `es.json`)

Translatable strings only:

- Nav labels, section titles, button copy, UI strings ("View project", "Download CV", etc.)
- Bio, tagline, role descriptions, project descriptions, skill category labels
- `en.json` is the source of truth for structure — `es.json` must mirror its keys exactly

### Layer 2 — Data (`data/*.ts`)

Lang-agnostic facts, written in TypeScript (not JSON):

- Company names, employment dates, tech used per role
- Project repo/demo URLs, tech stacks, image/asset paths
- Skill names, icon identifiers

### How they meet in `page.tsx`

```ts
const dict = await getDictionary(lang)   // translatable text
const projects = getProjects()           // structured facts, no async needed

<ProjectsSection content={dict.projects} data={projects} />
```

Each section receives two props: `content` (translated strings) and `data` (the facts).

## Content Policy

- **Never invent content.** Real bio, URLs, and asset paths are added by the developer — use obvious stub values (`"Title goes here"`, `"https://todo"`) so placeholders are never mistaken for real copy.
- Placeholder comments (`// TODO: fill in`) belong in `data/*.ts` files, not in component files. Components render whatever they receive — stubs live in the data layer.
- Dictionaries follow the same rule: stub strings in JSON, never in JSX.

## Stack Gotchas

- **Next.js 16**: `params` is a `Promise` — always `await params` before destructuring
- **Tailwind v4**: use `@import 'tailwindcss'` in CSS, no `tailwind.config.js`, theme via CSS custom properties
- **Framer Motion**: must be in a `'use client'` component
- **TypeScript**: use `PageProps<'/[lang]'>` and `LayoutProps<'/[lang]'>` for route prop types (globally available helpers in Next.js 16)

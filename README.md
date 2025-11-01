# ResumeAI Frontend

A React + TypeScript + Vite project styled with Tailwind CSS v4. This repo includes a set of product screens (modals) and a clean indexing approach using barrel files for easy imports.

## Quick Start

- Prerequisites
  - Node.js v18+ (recommended). On Windows, you can use nvm-windows or install from nodejs.org.
  - Git.
- Clone and install
  - `git clone <repo-url>`
  - `cd resume-ai-frontend`
  - `npm install`
- Run dev server
  - `npm run dev`
  - Opens on `http://localhost:5173/` (Vite may pick another port if busy).
- Build and preview
  - `npm run build`
  - `npm run preview`
- Lint
  - `npm run lint`

## Tech Stack

- `React 19`, `TypeScript`, `Vite 7`
- Styling: `Tailwind CSS v4`, `tw-animate-css`
- Icons: `lucide-react`, `react-icons` (optional in some screens)
- Utilities: `class-variance-authority`, `tailwind-merge`

## New Dependencies

This project uses the following additional UI libraries:

- `lucide-react` — icon set used across the dashboard.
- `react-icons` — brand logos used on the Signup screen (Google, LinkedIn, GitHub, Facebook).

If you are installing manually:

- `npm install lucide-react`
- `npm install react-icons`

## Project Structure

```
resume-ai-frontend/
├─ src/
│  ├─ components/
│  │  ├─ index.ts            # Root aggregator
│  │  ├─ modal/              # Screens & modals
│  │  │  ├─ index.ts         # Barrel exports
│  │  ├─ admin/
│  │  │  └─ index.ts         # Barrel exports
│  │  ├─ layout/
│  │  │  └─ index.ts         # Barrel exports
│  │  └─ ui/
│  │     └─ index.ts         # Barrel exports (named exports)
│  ├─ main.tsx               # App entry
│  ├─ App.tsx                # Renders a screen (Tailoring)
│  └─ index.css              # Global Tailwind + theme vars
├─ package.json              # Scripts & deps
├─ vite.config.ts            # Vite config
├─ tsconfig*.json            # TS config with '@/'
└─ README.md
```

## Indexing Approach (Barrel Files)

To simplify imports, we re-export components through index files:

- `src/components/modal/index.ts` exports all screens (e.g., `TailoringScreen`, `InterviewScreen`).
- `src/components/ui/index.ts` re-exports `Button` and `buttonVariants` as named exports.
- `src/components/index.ts` aggregates `modal`, `admin`, `layout`, and `ui`.

Usage example:

```tsx
import { TailoringScreen, InterviewScreen, Button } from "./components";
```

## Common Imports

Use the root aggregator for most imports. A few common patterns:

```tsx
// Screens (via components/index.ts → modal/index.ts)
import {
  TailoringScreen,
  ResumeBuilderScreen,
  InterviewScreen,
  TemplatesScreen,
  PricingScreen,
  DocumentationScreen,
  HelpCenterScreen,
  Dashboard,
} from "./components";

// UI (named exports)
import { Button, buttonVariants } from "./components";

// Admin + Layout
import { AdminDashboard, SiteFooter } from "./components";

// Utilities (path alias)
import { cn } from "@/lib/utils";
```

Note: Many more screens are exported. See `src/components/modal/index.ts` for the full list (e.g., `FAQScreen`, `PrivacyPolicyScreen`, `TermsOfServiceScreen`, `TestimonialsScreen`, `LandingPageScreen`, `LoginScreen`, `UserProfileScreen`, `NotFound`, etc.).

## TypeScript Path Alias

- `@/*` maps to `./src/*` (configured in `tsconfig.app.json`).
- Example: `import { cn } from "@/lib/utils"`.

## Styling & Theme Notes

- Global styles live in `src/index.css` and apply base colors via CSS variables.
- Pages typically use `min-h-svh` and a dark background (`bg-[#0b1220]`).
- Tailwind CLI helpers are available:
  - `npm run tw:build` (outputs `src/tw.css`)
  - `npm run tw:watch`

## Adding a New Screen

1. Create your screen in `src/components/modal/<your-screen>.tsx` and export default.
2. Add it to `src/components/modal/index.ts`:
   - `export { default as YourScreen } from "./your-screen";`
3. Import from the root aggregator:
   - `import { YourScreen } from "./components";`
4. Render in `src/App.tsx` to preview.

## Troubleshooting

- If you see module errors for UI exports: `Button` is a named export.
  - Import via `import { Button } from "./components"`.
- If the dev server fails to start, try:
  - `rm -rf node_modules && npm install` (Windows: delete `node_modules` folder in Explorer)
  - `npm run dev`
- Icons not showing or an `net::ERR_ABORTED` in the console:
  - Ensure dependencies are installed: `npm install`
  - Restart the dev server.

## Contributing & Code Style

- Use TypeScript and React function components.
- Keep screens focused and style with Tailwind classes.
- Run `npm run lint` before PRs.
- Prefer imports from `./components` to keep files tidy.

## License

Proprietary project. Do not redistribute without permission.

# Resume AI Frontend

## Prerequisites

- Docker Desktop
- Git access to this repo

## Running with Docker

```bash
# Clone (you already have access)
git clone <private-repo-url>
cd resume-ai-frontend

# One command to run everything
docker-compose up
```

Access at: http://localhost:3000

## Development Without Docker

```bash
npm install
npm run dev
```

Access at: http://localhost:5173

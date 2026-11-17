# KHOA'S ISLAND

An interactive, board-game-inspired developer portfolio for Nguyen Anh Khoa. Visitors explore an original hex-tile island to discover projects, experience, skills and contact details. A classic **Quick View** (`/#quick-view`) is always one click away.

Built with React 19, Vite, TypeScript (strict), Tailwind CSS v4, Framer Motion and Lucide React. No backend: all content lives in `src/data`, and progress is saved in `localStorage`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
npm run lint
npm test           # unit tests (Vitest)
```

## Where to edit content

| What | File |
| --- | --- |
| **GitHub / LinkedIn URLs**, email, name | `src/config/site.ts` (`githubUrl`, `linkedinUrl`) |
| Project write-ups, `repoUrl` / `demoUrl` | `src/data/projects.ts` |
| Island tile names, teasers, summaries | `src/data/locations.ts` |
| Experience & education | `src/data/experience.ts` |
| Skills | `src/data/skills.ts` |
| About text | `src/data/profile.ts` |
| Island shape (hex coordinates) | `src/data/islandLayout.ts` |

Links are hidden until they hold a real `http(s)` URL, so nothing fake is ever shown.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, then import the repository. Vercel detects Vite; `vercel.json` already sets `npm run build` and the `dist` output.
3. Click **Deploy**. (Or use the CLI: `npm i -g vercel && vercel --prod`.)
4. Once you have the final domain, change the `og:image` / `twitter:image` values in `index.html` to absolute URLs (for example `https://your-domain/og-image.png`) so link previews work everywhere.

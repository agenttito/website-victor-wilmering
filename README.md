# Victor Wilmering — Portfolio

A premium, editorial portfolio for Victor Wilmering, graphic designer in Amsterdam. Built with React + Vite, GSAP ScrollTrigger and Lenis for a scroll-controlled hero video.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Before launch

A few placeholders need real values — search for them or edit directly:

- **Contact links** — `src/data/content.js` (`contactLinks`): replace the placeholder email, LinkedIn and Instagram URLs with Victor's real ones.
- **Selected Work** — `src/data/projects.js`: six placeholder projects with generative artwork stand in for real case studies. Swap in real photography via each project's `image` field and update `ProjectArt`/`SelectedWork` to render it, or replace `ProjectArt` entirely.
- **Domain** — `index.html`: canonical URL and Open Graph URL currently point to `victorwilmering.com`; update if the real domain differs.

## Hero video

`public/video/victor-wilmering-hero.mp4` is scroll-scrubbed (see `src/hooks/useScrollHeroVideo.js` and `src/components/Hero.jsx`). It was re-encoded from the original source for the web: downscaled, stripped of audio, and re-keyframed every 12 frames (`-g 12 -sc_threshold 0`) so seeking during scroll stays smooth. If the source video is ever replaced, re-encode with the same settings rather than dropping in an arbitrary file — a normal long-GOP encode will seek noticeably less smoothly.

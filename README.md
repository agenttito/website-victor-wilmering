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

## Language (EN / NL)

The site ships bilingual. `src/i18n/translations.js` holds all UI copy per language; `src/data/content.js` and `src/data/projects.js` carry per-field `{ en, nl }` translations for nav links, services, contact links and the six placeholder projects. `LanguageProvider` (`src/i18n/LanguageContext.jsx`) auto-detects the visitor's browser language on first visit, remembers their choice in `localStorage` afterwards, and updates `<html lang>`, the page `<title>` and meta description on every switch. The EN / NL toggle lives in the desktop nav and in the mobile fullscreen menu.

To add a new language: add a key to `translations` and to every `{ en, nl }` field in `content.js` / `projects.js`, then list it in `LANGUAGES` in `LanguageContext.jsx`.

## Hero video

`public/video/victor-wilmering-hero.mp4` is scroll-scrubbed (see `src/hooks/useScrollHeroVideo.js` and `src/components/Hero.jsx`). It was re-encoded from the original source for the web: downscaled, stripped of audio, and re-keyframed every 12 frames (`-g 12 -sc_threshold 0`) so seeking during scroll stays smooth. If the source video is ever replaced, re-encode with the same settings rather than dropping in an arbitrary file — a normal long-GOP encode will seek noticeably less smoothly.

`public/video/victor-wilmering-hero-mobile.mp4` is a lighter 1280px-wide encode of the same file, served automatically to viewports ≤768px via a `<source media="(max-width: 768px)">` in `Hero.jsx` — smaller download and easier to decode on phones. Re-encode both whenever the source video changes:

```bash
ffmpeg -i source.mp4 -vf "scale=2560:-2" -an -c:v libx264 -preset slow -crf 23 \
  -profile:v high -bf 0 -pix_fmt yuv420p -g 12 -keyint_min 12 -sc_threshold 0 \
  -movflags +faststart victor-wilmering-hero.mp4

ffmpeg -i source.mp4 -vf "scale=1280:-2" -an -c:v libx264 -preset slow -crf 24 \
  -profile:v high -bf 0 -pix_fmt yuv420p -g 12 -keyint_min 12 -sc_threshold 0 \
  -movflags +faststart victor-wilmering-hero-mobile.mp4
```

**Mobile scrubbing note:** `useScrollHeroVideo.js` fires a muted play/pause cycle as soon as the video element mounts. This isn't decorative — mobile Safari and Chrome often don't actually fetch new byte ranges for a `<video>` that's never been asked to play, so `currentTime` seeks can silently do nothing until that happens. Don't remove it without testing scroll-scrubbing on a real phone afterward.

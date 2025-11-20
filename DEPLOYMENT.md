# Quick Deployment Guide

## Project Overview

This is a React-based birthday website that compiles to static files, making it perfect for hosting on GitHub Pages, Netlify, or any static hosting service.

## File Structure Summary

```
birthday-zho/
├── public/
│   ├── images/        # Replace with your photos (photo-1.jpg, photo-2.jpg, photo-3.jpg)
│   └── audio/         # Add your voice memos (voice-1.mp3, voice-2.mp3, voice-3.mp3)
├── src/
│   └── pages/         # Main page components
└── README.md          # Full documentation
```

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

Opens at http://localhost:8080

## Building for Production

```bash
npm run build
```

Creates optimized static files in `dist/` directory.

## Deployment Options

### Option 1: Netlify (Easiest - Drag & Drop)

1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder
4. Done! Your site is live

### Option 2: GitHub Pages

1. Push code to GitHub repository
2. Edit `vite.config.ts`, add: `base: '/your-repo-name/',`
3. Set up GitHub Actions (see README.md for workflow file)
4. Enable Pages in repository Settings
5. Site live at `https://username.github.io/repo-name/`

### Option 3: Netlify (Git Integration)

1. Push code to GitHub/GitLab
2. Connect repository in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Automatic deploys on every push

## Before Deploying Checklist

- [ ] Replace placeholder photos in `public/images/`
- [ ] Add voice memo MP3 files in `public/audio/`
- [ ] Update text content in page components if desired
- [ ] Test locally with `npm run dev`
- [ ] Test built version with `npm run build && npx serve dist`
- [ ] Test on mobile devices (especially audio playback)

## Customizing Content

### Photos
- Location: `public/images/photo-{1,2,3}.jpg`
- Recommended: 800-1200px wide, 4:3 or 16:9 aspect ratio
- Format: .jpg or .webp

### Audio
- Location: `public/audio/voice-{1,2,3}.mp3`
- Recommended: 128-192 kbps, MP3 format
- Update captions in `src/pages/Voice.tsx`

### Text Content
- Landing headline: `src/pages/Index.tsx`
- Photo captions: `src/pages/Photos.tsx`
- Voice memo titles: `src/pages/Voice.tsx`
- Birthday message: `src/pages/Final.tsx`

## Need Help?

See the main README.md file for:
- Detailed deployment instructions
- Testing checklist
- Troubleshooting guide
- Customization options
- Technical documentation

---

Built with React + Vite + TypeScript + Tailwind CSS

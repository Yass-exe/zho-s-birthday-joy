# Birthday Website for Zho ❤️

A personal, multi-page birthday celebration website featuring photos, voice memos, and heartfelt messages. Built with React, TypeScript, and Tailwind CSS for optimal mobile experience.

## Project Purpose

This website creates an intimate digital experience to celebrate Zho's birthday. It guides visitors through a journey of memories and messages across four distinct pages:

1. **Welcome** - Personalized greeting with elegant animation
2. **Photos** - Curated photo gallery with keyboard navigation
3. **Voice Memos** - Audio messages with custom controls and color themes
4. **Birthday Message** - Celebratory finale with animated hearts

## File Structure

```
birthday-zho/
├── public/
│   ├── images/                    # Photo assets directory
│   │   ├── photo-1.jpg           # Gallery image 1 (800-1200px wide recommended)
│   │   ├── photo-2.jpg           # Gallery image 2
│   │   └── photo-3.jpg           # Gallery image 3
│   ├── audio/                     # Voice memo assets directory
│   │   ├── voice-1.mp3           # Audio file 1 (128-192 kbps mp3 recommended)
│   │   ├── voice-2.mp3           # Audio file 2
│   │   └── voice-3.mp3           # Audio file 3
│   └── robots.txt
├── src/
│   ├── components/ui/             # Reusable UI components (buttons, etc.)
│   ├── pages/
│   │   ├── Index.tsx             # Landing page - welcome message
│   │   ├── Photos.tsx            # Photo gallery with slider
│   │   ├── Voice.tsx             # Voice memos with audio player
│   │   ├── Final.tsx             # Birthday message finale
│   │   └── NotFound.tsx          # 404 error page
│   ├── App.tsx                    # Main app component with routing
│   ├── index.css                  # Design system & animations
│   └── main.tsx                   # Application entry point
├── index.html                     # HTML template with metadata
├── tailwind.config.ts             # Tailwind CSS configuration
├── vite.config.ts                 # Vite build configuration
└── README.md                      # This file
```

## How to Replace Assets

### Images (Photos Page)

1. **Prepare your images:**
   - Recommended dimensions: 800-1200px wide
   - Aspect ratio: 4:3 or 16:9 for best display
   - Format: .jpg or .webp (webp provides better compression)
   - Keep file sizes under 500KB each for fast loading

2. **Place images in `public/images/` directory:**
   - Rename files to: `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`
   - Or update the `photos` array in `src/pages/Photos.tsx` with your custom filenames

3. **Update alt text in `src/pages/Photos.tsx`:**
   ```typescript
   const photos = [
     {
       src: '/images/photo-1.jpg',
       alt: 'Meaningful description of what the photo shows',
       caption: 'Short caption describing the moment',
     },
     // Add more photos by copying this structure
   ];
   ```

4. **To add more photos:**
   - Add image files to `public/images/`
   - Add corresponding entries to the `photos` array
   - Progress indicator will update automatically

### Audio Files (Voice Memos Page)

1. **Prepare your audio files:**
   - Format: .mp3 (best compatibility)
   - Bitrate: 128-192 kbps (mono or stereo)
   - Keep files under 5MB each for reasonable loading times
   - Test on iOS Safari to ensure compatibility

2. **Place audio files in `public/audio/` directory:**
   - Rename files to: `voice-1.mp3`, `voice-2.mp3`, `voice-3.mp3`
   - Or update the `voiceMemos` array in `src/pages/Voice.tsx`

3. **Update memo details in `src/pages/Voice.tsx`:**
   ```typescript
   const voiceMemos = [
     {
       src: '/audio/voice-1.mp3',
       title: 'Caption for this voice memo',
       transcript: 'Full text transcript for accessibility',
     },
     // Add more memos by copying this structure
   ];
   ```

4. **To add more voice memos:**
   - Add .mp3 files to `public/audio/`
   - Add entries to the `voiceMemos` array
   - Transcripts improve accessibility and SEO

## Running Locally

### Prerequisites
- Node.js 18+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm))

### Steps

1. **Navigate to project directory:**
   ```bash
   cd birthday-zho
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:8080` (or URL shown in terminal)
   - Site will hot-reload as you make changes

### Alternative: Static File Server

If you just want to view the built site without development features:

```bash
npm run build
npx serve dist
```

## Deployment Instructions

### GitHub Pages

**Requirements:** GitHub account, repository for this project

**Steps:**

1. **Push code to GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Birthday website for Zho"
   git remote add origin https://github.com/YOUR_USERNAME/birthday-zho.git
   git push -u origin main
   ```

2. **Configure Vite for GitHub Pages:**
   
   Edit `vite.config.ts` and add base path:
   ```typescript
   export default defineConfig({
     base: '/birthday-zho/', // Replace with your repo name
     // ... rest of config
   });
   ```

3. **Build the site:**
   ```bash
   npm run build
   ```

4. **Deploy using GitHub Actions:**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Wait 1-2 minutes for deployment

6. **Access your site:**
   - URL: `https://YOUR_USERNAME.github.io/birthday-zho/`

### Netlify

**Requirements:** Netlify account (free tier works perfectly)

**Method 1: Drag & Drop (Easiest)**

1. **Build the site locally:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `dist` folder onto the upload area
   - Wait for deployment to complete
   - Site will be live at a random Netlify URL (e.g., `random-name-123.netlify.app`)

3. **Custom domain (optional):**
   - In Netlify dashboard: Site settings → Domain management
   - Add custom domain or change subdomain

**Method 2: Git Integration (Automatic Deploys)**

1. **Push code to GitHub/GitLab:**
   ```bash
   git init
   git add .
   git commit -m "Birthday website for Zho"
   git push
   ```

2. **Connect repository to Netlify:**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider and repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Automatic updates:**
   - Any push to main branch triggers automatic redeployment
   - Changes go live in 1-2 minutes

**Netlify Configuration File (Optional):**

Create `netlify.toml` in project root for advanced config:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Testing Checklist

Before sharing the site, verify these items work correctly:

### Functional Testing

- [ ] All pages load without errors (/, /photos, /voice, /final)
- [ ] Navigation buttons work (Continue, Back, etc.)
- [ ] Images display correctly and are sharp/clear
- [ ] Audio files play and pause reliably
- [ ] Audio progress bars update during playback
- [ ] Keyboard navigation works on photos page (left/right arrows)
- [ ] Color theme selector changes accent colors on voice page
- [ ] All links are working (no broken routes)

### Mobile Testing

- [ ] Test on iOS Safari (iPhone)
- [ ] Test on Android Chrome
- [ ] Audio playback works on mobile (user-initiated)
- [ ] Touch interactions work smoothly (no lag)
- [ ] Text is readable without zooming
- [ ] Buttons are easy to tap (min 44×44px)

### Accessibility Testing

- [ ] Tab navigation works through all interactive elements
- [ ] Focus indicators are visible
- [ ] Images have meaningful alt text
- [ ] Audio players have ARIA labels
- [ ] Color contrast meets WCAG AA standards (use WebAIM contrast checker)
- [ ] Site works with reduced motion enabled (animations removed/simplified)

### Performance Testing

- [ ] Pages load in under 3 seconds on 3G connection
- [ ] Animations are smooth (60fps or using reduced motion fallback)
- [ ] No console errors in browser developer tools
- [ ] Audio files load progressively (not all at once)
- [ ] Images use lazy loading (don't load all immediately)

### Cross-Browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Safari (macOS and iOS)
- [ ] Firefox
- [ ] Verify consistent appearance across browsers

### Visual Testing

- [ ] Animations respect `prefers-reduced-motion` setting
- [ ] Layout doesn't break at any screen size (test 320px to 1920px wide)
- [ ] Text remains readable on all backgrounds
- [ ] Hover states work on desktop
- [ ] Active states work on mobile (touch feedback)

## Customization Guide

### Changing Colors

Edit `src/index.css` CSS custom properties:

```css
:root {
  --primary: 340 75% 65%;        /* Main brand color (HSL format) */
  --primary-glow: 340 85% 75%;   /* Lighter version for glows */
  --secondary: 25 85% 75%;       /* Accent color (warm tone) */
  /* ... more color tokens ... */
}
```

### Adding More Theme Colors

Edit `src/pages/Voice.tsx`:

```typescript
const themeColors = [
  { name: 'Rose', value: '340 75% 65%' },
  { name: 'Coral', value: '25 85% 65%' },
  { name: 'Lavender', value: '270 60% 70%' },
  { name: 'Your Color', value: 'H S% L%' }, // Add new color in HSL format
];
```

### Adjusting Animations

Animation timing is configured in `tailwind.config.ts`:

```typescript
animation: {
  "reveal-text": "reveal-text 1.2s ease-out", // Adjust duration here
  "fade-in": "fade-in 0.8s ease-out",
  // ... more animations ...
}
```

To disable animations for `prefers-reduced-motion`, they're automatically handled in `src/index.css`.

### Changing Text Content

All text content is in the page components:

- **Landing headline:** `src/pages/Index.tsx` (line ~72)
- **Photo captions:** `src/pages/Photos.tsx` (photos array)
- **Voice memo titles:** `src/pages/Voice.tsx` (voiceMemos array)
- **Birthday message:** `src/pages/Final.tsx` (line ~86)

## Technical Details

### Built With

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **shadcn/ui** - Accessible component primitives

### Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

### Performance Characteristics

- **First Load:** ~100-200KB (gzipped)
- **Page Transitions:** Instant (client-side routing)
- **Image Loading:** Lazy + progressive
- **Audio Loading:** On-demand per track
- **Animation Performance:** 60fps (GPU-accelerated)

## Troubleshooting

### Images not loading

- Verify files are in `public/images/` directory
- Check file names match exactly (case-sensitive)
- Ensure image paths start with `/` (e.g., `/images/photo-1.jpg`)

### Audio not playing on mobile

- iOS Safari requires user interaction to start audio (autoplay blocked)
- Check file format is .mp3 (best compatibility)
- Verify audio files aren't corrupted (test in VLC or similar)

### Animations not working

- Check browser developer console for JavaScript errors
- Verify `prefers-reduced-motion` is not enabled (System Preferences → Accessibility)
- Some browsers may disable animations in low power mode

### Build errors

- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is 18 or higher: `node --version`
- Clear Vite cache: `rm -rf node_modules/.vite`

## Credits & License

Created with love for Zho's birthday celebration.

Built using open-source technologies:
- React (MIT License)
- Tailwind CSS (MIT License)
- Vite (MIT License)

Feel free to adapt this template for your own celebrations! 🎉

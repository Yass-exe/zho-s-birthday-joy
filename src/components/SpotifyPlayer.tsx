/**
 * SpotifyPlayer.tsx - Persistent Spotify Player with Route-Aware Display
 * 
 * Purpose: Embed Spotify playlist that persists across all routes
 * Mounted in App.tsx to maintain playback during navigation
 * 
 * Key features:
 * - Always mounted (never unmounts, so playback never stops)
 * - Visible inline on /zho-spotify page (part of page flow)
 * - Hidden on all other pages (but still playing)
 * - Route-aware display using React Router's useLocation
 */

import { useLocation } from 'react-router-dom';

const SpotifyPlayer = () => {
  const location = useLocation();
  const isSpotifyPage = location.pathname === '/zho-spotify';

  // When not on Spotify page, render hidden but keep mounted for playback persistence
  if (!isSpotifyPage) {
    return (
      <div 
        className="fixed bottom-0 left-0 w-[352px] h-[200px] opacity-0 pointer-events-none -z-50"
        aria-hidden="true"
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/0KpPNg7XZCb477yDW2UnQI?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist for Zho"
        />
      </div>
    );
  }

  // On Spotify page - render nothing here, the page component handles display
  // This allows the iframe to be positioned in the page flow
  return null;
};

export default SpotifyPlayer;

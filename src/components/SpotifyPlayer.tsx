/**
 * SpotifyPlayer.tsx - Persistent Spotify Player with Route-Aware Display
 * 
 * Purpose: Embed Spotify playlist that persists across all routes
 * Mounted in App.tsx above BrowserRouter to maintain playback during navigation
 * 
 * Key features:
 * - Always mounted (never unmounts, so playback never stops)
 * - Visible and prominent on /zho-spotify page
 * - Hidden on all other pages (but still playing)
 * - Route-aware display using React Router's useLocation
 * 
 * To customize:
 * - Replace the playlist URL in the src attribute
 * - Adjust visibility styling per route
 * - Modify theme preference (theme=0 for light, theme=1 for dark)
 */

import { useLocation } from 'react-router-dom';

const SpotifyPlayer = () => {
  const location = useLocation();
  const isSpotifyPage = location.pathname === '/zho-spotify';

  return (
    <div 
      className={`fixed z-50 transition-opacity duration-500 ${
        isSpotifyPage 
          ? 'inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-100' 
          : 'opacity-0 pointer-events-none -z-10'
      }`}
    >
      <div 
        className={`${
          isSpotifyPage 
            ? 'w-full max-w-md mx-4' 
            : 'w-[1px] h-[1px]'
        }`}
        style={{
          borderRadius: isSpotifyPage ? 'var(--radius)' : '0',
          overflow: 'hidden',
          boxShadow: isSpotifyPage ? 'var(--shadow-elevated)' : 'none',
        }}
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/0KpPNg7XZCb477yDW2UnQI?utm_source=generator&theme=0"
          width="100%"
          height={isSpotifyPage ? "352" : "1"}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist for Zho"
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer;

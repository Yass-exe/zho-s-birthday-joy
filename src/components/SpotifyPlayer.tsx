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

import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SpotifyPlayer = () => {
  const location = useLocation();
  const isSpotifyPage = location.pathname === '/zho-spotify';

  return (
    <div 
      className={`fixed transition-opacity duration-500 ${
        isSpotifyPage 
          ? 'inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-100 z-50 overflow-y-auto' 
          : 'bottom-0 left-0 w-[352px] h-[200px] opacity-0 pointer-events-none -z-50'
      }`}
    >
      <div className={`${isSpotifyPage ? 'py-12 px-4' : ''}`}>
        <div 
          className="w-full max-w-md mx-auto"
          style={{
            borderRadius: isSpotifyPage ? 'var(--radius)' : '0',
            overflow: 'hidden',
            boxShadow: isSpotifyPage ? 'var(--shadow-elevated)' : 'none',
          }}
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
        
        {/* Continue button - only visible on Spotify page */}
        {isSpotifyPage && (
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/photos">
              <Button size="lg" className="min-w-[200px]">
                Continue
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyPlayer;

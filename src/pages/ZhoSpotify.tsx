/**
 * ZhoSpotify.tsx - Dedicated Spotify Playlist Page
 * 
 * Purpose: Dedicated page where user can start the Spotify playlist
 * Features:
 * - The persistent SpotifyPlayer component shows here (managed in App.tsx)
 * - Music continues playing when navigating away
 * - Player persists across all routes (never unmounts)
 * - Simple, focused interface
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ZhoSpotify = () => {
  return (
    <div className="min-h-screen animated-bg flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Page header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Music for You
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            A playlist I made just for you, Zho
          </p>
        </div>

        {/* 
          Note: Spotify player and Continue button are rendered globally in App.tsx (SpotifyPlayer component)
          They appear prominently on this route with the button positioned below the player
          The player stays mounted on other routes (hidden) to persist playback
        */}

        {/* Instructions */}
        <div 
          className="text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="leading-relaxed">
            Press play above, then continue browsing. The music will keep playing as you explore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZhoSpotify;

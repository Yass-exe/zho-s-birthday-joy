/**
 * SpotifyPlayer.tsx - Persistent Spotify Player Component
 * 
 * Purpose: Displays a floating Spotify playlist that persists across route changes
 * Mounted at the top level (in App.tsx above BrowserRouter) to prevent unmounting
 * 
 * External dependencies:
 * - React: Component framework
 * 
 * Styling approach:
 * - Fixed positioning in bottom-right corner
 * - Rounded borders using design system border-radius
 * - Shadow for elevation
 * - Responsive: hidden on very small screens to avoid covering content
 */

import React from 'react';

const SpotifyPlayer = () => {
  return (
    <div 
      className="fixed bottom-4 right-4 z-50 hidden sm:block"
      style={{
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-elevated)',
      }}
    >
      <iframe
        src="https://open.spotify.com/embed/playlist/0KpPNg7XZCb477yDW2UnQI?utm_source=generator&theme=0"
        width="320"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist for Zho"
      />
    </div>
  );
};

export default SpotifyPlayer;

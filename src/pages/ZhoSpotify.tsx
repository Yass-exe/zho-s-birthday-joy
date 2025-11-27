/**
 * ZhoSpotify.tsx - Dedicated Spotify Playlist Page
 * 
 * Purpose: Dedicated page where user can start the Spotify playlist
 * Features:
 * - Playlist displayed inline at top of content
 * - Continue button clearly separated below
 * - Pixel-art styled with hover animations
 * - Mobile-friendly responsive layout
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ZhoSpotify = () => {
  return (
    <div className="min-h-screen animated-bg flex flex-col items-center px-4 py-16 md:py-20">
      {/* Page header */}
      <div className="text-center mb-6 md:mb-8 animate-fade-in">
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">
          Music for You
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xs">
          A playlist I made just for you, Zho
        </p>
      </div>

      {/* Playlist container - inline in page flow */}
      <div 
        className="w-full max-w-md animate-fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        {/* Pixel-art styled wrapper */}
        <div 
          className="relative bg-card rounded-lg overflow-hidden"
          style={{
            boxShadow: 'var(--shadow-elevated)',
            border: '3px solid hsl(var(--border))',
            imageRendering: 'pixelated',
          }}
        >
          {/* Pixel corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-primary" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary" />
          
          <iframe
            src="https://open.spotify.com/embed/playlist/0KpPNg7XZCb477yDW2UnQI?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist for Zho"
            className="block"
          />
        </div>
      </div>

      {/* Pixel-art separator */}
      <div 
        className="flex items-center justify-center gap-2 my-6 md:my-10 animate-fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="w-2 h-2 bg-primary/40" style={{ imageRendering: 'pixelated' }} />
        <div className="w-1 h-1 bg-primary/30" style={{ imageRendering: 'pixelated' }} />
        <div className="w-2 h-2 bg-primary/40" style={{ imageRendering: 'pixelated' }} />
      </div>

      {/* Instructions */}
      <p 
        className="text-xs text-muted-foreground text-center max-w-xs mb-6 md:mb-8 animate-fade-in leading-relaxed"
        style={{ animationDelay: '0.5s' }}
      >
        Press play above, then continue. The music keeps playing as you explore.
      </p>

      {/* Continue button - clearly separated */}
      <div 
        className="animate-fade-in"
        style={{ animationDelay: '0.6s' }}
      >
        <Link to="/photos">
          <Button 
            size="lg" 
            className="min-w-[180px] md:min-w-[200px] relative overflow-hidden group transition-transform duration-150 active:scale-95 hover:scale-105"
            style={{
              imageRendering: 'pixelated',
              boxShadow: '4px 4px 0 hsl(var(--primary) / 0.3)',
            }}
          >
            {/* Pixel hover effect */}
            <span className="absolute inset-0 bg-primary-foreground/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
            <span className="relative">Continue</span>
          </Button>
        </Link>
      </div>

      {/* Back to home link */}
      <div 
        className="mt-6 animate-fade-in"
        style={{ animationDelay: '0.8s' }}
      >
        <Link 
          to="/" 
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          Back to start
        </Link>
      </div>
    </div>
  );
};

export default ZhoSpotify;

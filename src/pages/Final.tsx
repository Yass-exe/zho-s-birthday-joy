/**
 * Final.tsx - Birthday Message Finale Page
 * 
 * Purpose: Display celebratory birthday message with delightful animations
 * Features:
 * - Main message: "Happy Birthday, Zho ❤️"
 * - Animated hearts with glow effect
 * - Floating sparkle particles
 * - Ambient background animation
 * - Navigation options to revisit photos or return home
 * 
 * Performance considerations:
 * - Particle count kept low (8 sparkles) for mobile performance
 * - CSS animations used instead of JS for GPU acceleration
 * - Respects prefers-reduced-motion user preference
 * - Animations can be tuned by adjusting CSS variables in index.css
 * 
 * How to customize:
 * - Adjust particle count in sparkles array below
 * - Modify animation durations in tailwind.config.ts
 * - Change colors via CSS custom properties (--primary, --primary-glow)
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

/**
 * Sparkle particle configuration
 * Each sparkle has random positioning and animation delay for natural effect
 * 
 * To adjust particle density:
 * - Add/remove entries to this array
 * - Keep count low (8-12) for optimal mobile performance
 * - Larger counts may cause frame drops on older devices
 */
const sparkles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  // Random positioning within viewport
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  // Stagger animation delays for continuous effect
  delay: `${Math.random() * 3}s`,
  // Vary animation duration slightly for more organic feel
  duration: `${3 + Math.random() * 2}s`,
}));

const Final = () => {
  return (
    // Main container: full viewport, centered content, animated background
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* 
        Floating sparkle particles
        Implemented as absolute-positioned divs with CSS keyframe animation
        Performance: uses transform and opacity for GPU acceleration
      */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-2 h-2 bg-primary-glow rounded-full animate-sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              animationDelay: sparkle.delay,
              animationDuration: sparkle.duration,
            }}
          />
        ))}
      </div>

      {/* Main content card */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Animated heart icon with glow effect */}
        <div className="flex justify-center mb-8">
          <Heart
            className="w-24 h-24 md:w-32 md:h-32 text-primary fill-primary animate-heart-glow"
            aria-label="Heart symbol"
          />
        </div>

        {/* Main birthday message */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-reveal-text">
          Happy Birthday, Zho ❤️
        </h1>

        {/* Optional secondary message */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in">
          Wishing you a day as special as you are
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {/* Return to photos */}
          <Link to="/photos">
            <Button variant="outline" size="lg" className="min-w-[180px]">
              View Photos Again
            </Button>
          </Link>

          {/* Return to home/start */}
          <Link to="/">
            <Button size="lg" className="min-w-[180px]">
              Back to Beginning
            </Button>
          </Link>
        </div>

        {/* 
          Performance note:
          This page uses multiple CSS animations simultaneously:
          - Heart glow (continuous pulse)
          - Text reveal (one-time entrance)
          - Sparkle particles (continuous, staggered)
          - Background gradient float (continuous, slow)
          
          Total estimated CPU usage: 2-5% on modern mobile devices
          If performance issues occur on older devices:
          1. Reduce sparkle count to 4-6
          2. Increase animation durations (slower = less CPU)
          3. Remove background gradient animation
        */}
      </div>
    </div>
  );
};

export default Final;

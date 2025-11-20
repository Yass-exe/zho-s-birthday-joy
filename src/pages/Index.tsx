/**
 * Index.tsx - Landing / Welcome Page
 * 
 * Purpose: First page visitors see - sets emotional tone for the experience
 * Features:
 * - Headline message with smooth fade-in animation
 * - Animated gradient background with floating effect
 * - Optional floating particles for ambient decoration
 * - Responsive typography and layout
 * - Accessible "Continue" CTA linking to photos page
 * 
 * Design rationale:
 * - Minimal content to avoid overwhelming user
 * - Warm, romantic color palette established in design system
 * - Animation draws attention to headline without being distracting
 * - Mobile-first approach ensures great experience on all devices
 * 
 * How to customize:
 * - Update headline text below (exact text per requirements)
 * - Modify empty <p> placeholder for additional warm message
 * - Adjust animation timings in tailwind.config.ts
 * - Change colors via CSS custom properties in index.css
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Optional floating particles for ambient decoration
 * Creates gentle floating animation across the background
 * 
 * Performance note:
 * - 6 particles provide good visual effect with minimal CPU usage
 * - Pure CSS animation via transform (GPU accelerated)
 * - Adjust count here if experiencing performance issues on low-end devices
 */
const FloatingParticles = () => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4, // 4-10px diameter
    left: `${Math.random() * 100}%`, // Random horizontal position
    animationDelay: `${Math.random() * 6}s`, // Stagger start times
    animationDuration: `${6 + Math.random() * 4}s`, // 6-10s cycle
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: '100%',
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

const Index = () => {
  return (
    // Hero section: full viewport height, centered content, animated background
    // CSS classes reference design system in index.css
    <div className="hero-container animated-bg relative">
      {/* Optional ambient decoration */}
      <FloatingParticles />

      {/* Main content container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* 
          Main headline - exact text per requirements
          Animation: reveal-text provides smooth fade-in with subtle scale
          Fallback: users with prefers-reduced-motion see instant appearance
        */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 animate-reveal-text leading-tight">
          For my only beloved girl I knew and ever knew, Zho.
        </h1>

        {/* 
          Secondary message placeholder
          Instructions: Add warm, personal message here
          Recommended: 1-2 sentences, keep it heartfelt and concise
          Animation: fades in after headline (0.5s delay)
        */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.5s' }}>
          {/* Empty placeholder - add your personal message here */}
          Today is a day to celebrate you, and all the joy you bring.
        </p>

        {/* 
          Call-to-action button
          Links to photos page (next step in journey)
          ARIA label improves accessibility for screen readers
          Animation: fades in after text (1s delay)
        */}
        <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <Link to="/photos">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 min-w-[200px]"
              aria-label="Continue to photos"
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

/**
 * ProgressIndicator.tsx - Pixel-Art Animated Progress Indicator
 * 
 * Purpose: Visual progress tracker for multi-page birthday site
 * Features:
 * - Pixel-art circular progress bar
 * - Inner message "muah my love" that emphasizes on final page
 * - Smooth pixel-style animations
 * - Accessibility support with aria attributes
 * - Respects prefers-reduced-motion
 */

import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

// Page order for progress calculation
const PAGE_ORDER = ['/', '/zho-spotify', '/photos', '/voice', '/message', '/final'];

const ProgressIndicator = () => {
  const location = useLocation();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showSparkle, setShowSparkle] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Calculate current progress
  const currentPageIndex = PAGE_ORDER.indexOf(location.pathname);
  const totalPages = PAGE_ORDER.length;
  const isValidPage = currentPageIndex !== -1;
  const targetProgress = isValidPage ? (currentPageIndex + 1) / totalPages : 0;
  const isFinalPage = location.pathname === '/final';

  // Animate progress changes
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedProgress(targetProgress);
      return;
    }

    const duration = 350;
    const startTime = performance.now();
    const startProgress = animatedProgress;
    const delta = targetProgress - startProgress;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedProgress(startProgress + delta * eased);
      
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetProgress, prefersReducedMotion]);

  // Trigger sparkle on final page
  useEffect(() => {
    if (isFinalPage && !prefersReducedMotion) {
      setShowSparkle(true);
      const timer = setTimeout(() => setShowSparkle(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isFinalPage, prefersReducedMotion]);

  // Don't show on invalid pages
  if (!isValidPage) return null;

  // Calculate visual properties
  const circumference = 2 * Math.PI * 28; // radius = 28
  const strokeDashoffset = circumference * (1 - animatedProgress);
  const messageScale = isFinalPage ? 1.15 : 0.85 + animatedProgress * 0.15;
  const messageOpacity = 0.6 + animatedProgress * 0.4;

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 md:top-6"
      role="progressbar"
      aria-valuenow={currentPageIndex + 1}
      aria-valuemin={1}
      aria-valuemax={totalPages}
      aria-label={`Progress: ${currentPageIndex + 1} of ${totalPages}${isFinalPage ? ' — final message: muah my love' : ''}`}
    >
      <div 
        className="relative"
        style={{
          imageRendering: 'pixelated',
          width: '72px',
          height: '72px',
        }}
      >
        {/* Pixel-art outer ring */}
        <svg 
          width="72" 
          height="72" 
          viewBox="0 0 72 72"
          className="transform -rotate-90"
        >
          {/* Background track - pixelated appearance */}
          <circle
            cx="36"
            cy="36"
            r="28"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            strokeLinecap="square"
            style={{ 
              strokeDasharray: '4 2',
              opacity: 0.5 
            }}
          />
          
          {/* Progress fill */}
          <circle
            cx="36"
            cy="36"
            r="28"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="square"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-colors duration-300"
            style={{
              filter: isFinalPage ? 'drop-shadow(0 0 4px hsl(var(--primary)))' : 'none',
            }}
          />
          
          {/* Pixel accent dots at progress points */}
          {PAGE_ORDER.map((_, i) => {
            const angle = ((i + 1) / totalPages) * 2 * Math.PI - Math.PI / 2;
            const x = 36 + 28 * Math.cos(angle);
            const y = 36 + 28 * Math.sin(angle);
            const isPassed = (i + 1) / totalPages <= animatedProgress;
            return (
              <rect
                key={i}
                x={x - 2}
                y={y - 2}
                width="4"
                height="4"
                fill={isPassed ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                opacity={isPassed ? 1 : 0.3}
              />
            );
          })}
        </svg>

        {/* Inner message */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${messageScale})`,
            opacity: messageOpacity,
            transition: prefersReducedMotion ? 'none' : 'transform 0.4s ease-out, opacity 0.4s ease-out',
          }}
        >
          <span 
            className={`text-[8px] font-bold text-center leading-tight select-none ${
              isFinalPage ? 'text-primary' : 'text-foreground'
            }`}
            style={{
              fontFamily: '"Press Start 2P", "Courier New", monospace',
              textShadow: isFinalPage ? '0 0 8px hsl(var(--primary))' : 'none',
              animation: isFinalPage && !prefersReducedMotion ? 'pulse-gentle 2s ease-in-out infinite' : 'none',
            }}
          >
            muah<br/>my<br/>love
          </span>
        </div>

        {/* Sparkle effect on final page */}
        {showSparkle && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${15 + (i % 2) * 55}%`,
                  animation: `sparkle-pixel 0.6s ease-out ${i * 0.1}s forwards`,
                  imageRendering: 'pixelated',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Screen reader text */}
      <span className="sr-only">
        Page {currentPageIndex + 1} of {totalPages}
        {isFinalPage && ' — muah my love'}
      </span>
    </div>
  );
};

export default ProgressIndicator;

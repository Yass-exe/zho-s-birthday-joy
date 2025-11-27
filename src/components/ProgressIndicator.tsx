/**
 * ProgressIndicator.tsx - Pixel-Art Animated Progress Indicator
 * 
 * Purpose: Visual progress tracker for multi-page birthday site
 * Features:
 * - Compact pixel-art circular progress bar (48-56px)
 * - Positioned in top-right corner, never overlapping content
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

  // Responsive sizes: 48px on mobile, 56px on desktop
  const size = { mobile: 48, desktop: 56 };
  const radius = { mobile: 18, desktop: 22 };
  const strokeWidth = { mobile: 4, desktop: 5 };
  
  // Calculate visual properties
  const circumferenceMobile = 2 * Math.PI * radius.mobile;
  const circumferenceDesktop = 2 * Math.PI * radius.desktop;
  const strokeDashoffsetMobile = circumferenceMobile * (1 - animatedProgress);
  const strokeDashoffsetDesktop = circumferenceDesktop * (1 - animatedProgress);
  const messageScale = isFinalPage ? 1.1 : 0.9 + animatedProgress * 0.1;
  const messageOpacity = 0.7 + animatedProgress * 0.3;

  return (
    <div 
      className="fixed top-3 right-3 z-30 md:top-4 md:right-4"
      role="progressbar"
      aria-valuenow={currentPageIndex + 1}
      aria-valuemin={1}
      aria-valuemax={totalPages}
      aria-label={`Progress: ${currentPageIndex + 1} of ${totalPages}${isFinalPage ? ' — final message: muah my love' : ''}`}
    >
      {/* Mobile version (48px) */}
      <div 
        className="relative md:hidden"
        style={{
          imageRendering: 'pixelated',
          width: `${size.mobile}px`,
          height: `${size.mobile}px`,
        }}
      >
        <svg 
          width={size.mobile} 
          height={size.mobile} 
          viewBox={`0 0 ${size.mobile} ${size.mobile}`}
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size.mobile / 2}
            cy={size.mobile / 2}
            r={radius.mobile}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth.mobile}
            strokeLinecap="square"
            style={{ strokeDasharray: '3 2', opacity: 0.4 }}
          />
          
          {/* Progress fill */}
          <circle
            cx={size.mobile / 2}
            cy={size.mobile / 2}
            r={radius.mobile}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth.mobile}
            strokeLinecap="square"
            strokeDasharray={circumferenceMobile}
            strokeDashoffset={strokeDashoffsetMobile}
            style={{
              filter: isFinalPage ? 'drop-shadow(0 0 3px hsl(var(--primary)))' : 'none',
            }}
          />
          
          {/* Progress point markers */}
          {PAGE_ORDER.map((_, i) => {
            const angle = ((i + 1) / totalPages) * 2 * Math.PI - Math.PI / 2;
            const x = size.mobile / 2 + radius.mobile * Math.cos(angle);
            const y = size.mobile / 2 + radius.mobile * Math.sin(angle);
            const isPassed = (i + 1) / totalPages <= animatedProgress;
            return (
              <rect
                key={i}
                x={x - 1.5}
                y={y - 1.5}
                width="3"
                height="3"
                fill={isPassed ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                opacity={isPassed ? 1 : 0.3}
              />
            );
          })}
        </svg>

        {/* Inner message - mobile */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${messageScale})`,
            opacity: messageOpacity,
            transition: prefersReducedMotion ? 'none' : 'transform 0.4s ease-out, opacity 0.4s ease-out',
          }}
        >
          <span 
            className={`text-[5px] font-bold text-center leading-tight select-none ${
              isFinalPage ? 'text-primary' : 'text-foreground'
            }`}
            style={{
              fontFamily: '"Press Start 2P", "Courier New", monospace',
              textShadow: isFinalPage ? '0 0 4px hsl(var(--primary))' : 'none',
              animation: isFinalPage && !prefersReducedMotion ? 'pulse-gentle 2s ease-in-out infinite' : 'none',
            }}
          >
            muah<br/>my<br/>love
          </span>
        </div>
      </div>

      {/* Desktop version (56px) */}
      <div 
        className="relative hidden md:block"
        style={{
          imageRendering: 'pixelated',
          width: `${size.desktop}px`,
          height: `${size.desktop}px`,
        }}
      >
        <svg 
          width={size.desktop} 
          height={size.desktop} 
          viewBox={`0 0 ${size.desktop} ${size.desktop}`}
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size.desktop / 2}
            cy={size.desktop / 2}
            r={radius.desktop}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth.desktop}
            strokeLinecap="square"
            style={{ strokeDasharray: '3 2', opacity: 0.4 }}
          />
          
          {/* Progress fill */}
          <circle
            cx={size.desktop / 2}
            cy={size.desktop / 2}
            r={radius.desktop}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth.desktop}
            strokeLinecap="square"
            strokeDasharray={circumferenceDesktop}
            strokeDashoffset={strokeDashoffsetDesktop}
            style={{
              filter: isFinalPage ? 'drop-shadow(0 0 4px hsl(var(--primary)))' : 'none',
            }}
          />
          
          {/* Progress point markers */}
          {PAGE_ORDER.map((_, i) => {
            const angle = ((i + 1) / totalPages) * 2 * Math.PI - Math.PI / 2;
            const x = size.desktop / 2 + radius.desktop * Math.cos(angle);
            const y = size.desktop / 2 + radius.desktop * Math.sin(angle);
            const isPassed = (i + 1) / totalPages <= animatedProgress;
            return (
              <rect
                key={i}
                x={x - 1.5}
                y={y - 1.5}
                width="3"
                height="3"
                fill={isPassed ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                opacity={isPassed ? 1 : 0.3}
              />
            );
          })}
        </svg>

        {/* Inner message - desktop */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${messageScale})`,
            opacity: messageOpacity,
            transition: prefersReducedMotion ? 'none' : 'transform 0.4s ease-out, opacity 0.4s ease-out',
          }}
        >
          <span 
            className={`text-[6px] font-bold text-center leading-tight select-none ${
              isFinalPage ? 'text-primary' : 'text-foreground'
            }`}
            style={{
              fontFamily: '"Press Start 2P", "Courier New", monospace',
              textShadow: isFinalPage ? '0 0 6px hsl(var(--primary))' : 'none',
              animation: isFinalPage && !prefersReducedMotion ? 'pulse-gentle 2s ease-in-out infinite' : 'none',
            }}
          >
            muah<br/>my<br/>love
          </span>
        </div>

        {/* Sparkle effect on final page */}
        {showSparkle && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary"
                style={{
                  left: `${15 + i * 25}%`,
                  top: `${10 + (i % 2) * 60}%`,
                  animation: `sparkle-pixel 0.6s ease-out ${i * 0.15}s forwards`,
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

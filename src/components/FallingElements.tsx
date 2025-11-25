/**
 * FallingElements.tsx - Ambient Falling Hearts and Stars
 * 
 * Purpose: Add subtle, decorative falling elements across the screen
 * Features:
 * - Low density to avoid content obstruction
 * - Slow, soft falling animation
 * - Randomized size and position
 * - Performance optimized for mobile
 * - Respects reduced motion preferences
 */

import { Heart, Star } from 'lucide-react';

interface FallingElement {
  id: number;
  type: 'heart' | 'star';
  left: string;
  size: number;
  duration: number;
  delay: number;
}

/**
 * Generate random falling elements
 * Low density: only 8 elements total for subtle effect
 */
const generateElements = (): FallingElement[] => {
  const elements: FallingElement[] = [];
  
  // Create 8 elements total (4 hearts, 4 stars)
  for (let i = 0; i < 8; i++) {
    elements.push({
      id: i,
      type: i % 2 === 0 ? 'heart' : 'star',
      left: `${Math.random() * 90 + 5}%`, // 5-95% to avoid edges
      size: Math.random() * 12 + 12, // 12-24px
      duration: Math.random() * 10 + 15, // 15-25 seconds (slow)
      delay: Math.random() * 10, // 0-10s delay for staggered effect
    });
  }
  
  return elements;
};

const elements = generateElements();

const FallingElements = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-fall opacity-20"
          style={{
            left: element.left,
            top: '-50px',
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}s`,
          }}
        >
          {element.type === 'heart' ? (
            <Heart 
              size={element.size} 
              fill="hsl(var(--primary))"
              className="text-primary"
            />
          ) : (
            <Star 
              size={element.size} 
              fill="hsl(var(--accent))"
              className="text-accent"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FallingElements;

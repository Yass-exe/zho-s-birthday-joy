/**
 * Photos.tsx - Photo Gallery Slider Page
 * 
 * Purpose: Display curated photos in an elegant slider with keyboard navigation
 * Features:
 * - One photo per view with smooth transitions
 * - Left/right navigation controls + keyboard support (ArrowLeft/ArrowRight)
 * - Progress indicator (e.g., "1 / 3")
 * - Responsive images with srcset and lazy loading
 * - Accessible with ARIA labels and focus management
 * 
 * How to customize:
 * - Replace placeholder images in public/images/photo-{1,2,3}.jpg
 * - Recommended sizes: 800-1200px wide, aspect ratio 4:3 or 16:9
 * - Use .webp format for better compression, keep .jpg fallback
 * - Update alt text in the photos array below with meaningful descriptions
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Photo data structure
 * To add more photos:
 * 1. Add image file to public/images/ with naming pattern photo-{n}.jpg
 * 2. Add entry to this array with src, alt, and caption
 * 3. Update progress indicator denominator automatically
 */
const photos = [
  {
    src: '/images/photo-1.jpg',
    alt: 'Placeholder for first cherished memory with Zho - replace with meaningful description of the actual photo',
    caption: 'A beautiful moment',
  },
  {
    src: '/images/photo-2.jpg',
    alt: 'Placeholder for second special moment - describe what makes this photo meaningful',
    caption: 'Another precious memory',
  },
  {
    src: '/images/photo-3.jpg',
    alt: 'Placeholder for third unforgettable memory - capture the emotion or context of the photo',
    caption: 'Forever remembered',
  },
];

const Photos = () => {
  /**
   * State management for photo slider
   * - currentIndex: tracks which photo is currently displayed (0-indexed)
   * - animationDirection: controls slide animation direction ('left' or 'right')
   */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');

  /**
   * Navigate to next photo
   * Wraps around to first photo when reaching the end
   * Sets animation direction for smooth transition
   */
  const handleNext = useCallback(() => {
    setAnimationDirection('right');
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, []);

  /**
   * Navigate to previous photo
   * Wraps around to last photo when at the beginning
   * Sets animation direction for smooth transition
   */
  const handlePrevious = useCallback(() => {
    setAnimationDirection('left');
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  /**
   * Keyboard navigation handler
   * Supports:
   * - ArrowRight: next photo
   * - ArrowLeft: previous photo
   * 
   * Browser notes:
   * - Works on all modern browsers
   * - Focus must be on the page (click anywhere first on mobile)
   * - Accessible for keyboard-only users
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  const currentPhoto = photos[currentIndex];

  return (
    // Main container: full viewport height, centered content, animated background
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center p-4 md:p-8">
      {/* Photo display card */}
      <div className="w-full max-w-4xl">
        {/* Header with progress indicator */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 animate-fade-in">
            Our Memories
          </h1>
          {/* Progress indicator: shows current position out of total */}
          <p className="text-muted-foreground">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>

        {/* Photo viewer with navigation controls */}
        <div className="relative card-elevated p-4 md:p-8">
          {/* Main photo display */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-lg bg-muted mb-4">
            <img
              key={currentIndex}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              loading="lazy"
              className={`w-full h-full object-cover ${
                animationDirection === 'right' 
                  ? 'animate-slide-in-right' 
                  : 'animate-slide-in-left'
              }`}
              style={{
                /**
                 * Responsive image strategy:
                 * - Object-fit: cover ensures image fills container while maintaining aspect ratio
                 * - For production, implement srcset:
                 *   srcset="/images/photo-1-400w.jpg 400w, /images/photo-1-800w.jpg 800w, /images/photo-1-1200w.jpg 1200w"
                 *   sizes="(max-width: 768px) 100vw, 800px"
                 */
              }}
            />
          </div>

          {/* Photo caption */}
          <p className="text-center text-lg text-foreground mb-6">
            {currentPhoto.caption}
          </p>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center gap-4">
            {/* Previous button - accessible with ARIA label */}
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Keyboard hint for desktop users */}
            <div className="hidden md:block text-sm text-muted-foreground text-center">
              Use arrow keys to navigate
            </div>

            {/* Next button - accessible with ARIA label */}
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Continue button to next page */}
        <div className="text-center mt-8">
          <Link to="/voice">
            <Button 
              size="lg" 
              className="min-w-[200px]"
              aria-label="Continue to voice messages"
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Photos;

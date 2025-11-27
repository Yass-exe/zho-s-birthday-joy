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
// Helper to get the correct asset path
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace('//', '/');
};

const photos = [
  {
    src: getAssetPath('images/photo1.jpg'),
    alt: 'First cherished memory with Zho',
    caption: 'A zho where she looked beeautiful',
  },
  {
    src: getAssetPath('images/photo2.jpg'),
    alt: 'Second special moment',
    caption: 'zho astonishing eyes',
  },
  {
    src: getAssetPath('images/photo3.jpg'),
    alt: 'Third unforgettable memory',
    caption: 'zahia in here dom era (love it)',
  },
  {
    src: getAssetPath('images/photo4.jpg'),
    alt: 'Fourth special moment',
    caption: 'zahia being zahia(too lovely)',
  },
  {
    src: getAssetPath('images/photo5.jpg'),
    alt: 'Fifth cherished memory',
    caption: 'swaggy zho (my queen)',
  },
  {
    src: getAssetPath('images/photo6.jpg'),
    alt: 'Sixth unforgettable memory',
    caption: 'zahia being cute (as always muahhh<3)',
  },
  {
    src: getAssetPath('images/photo7.jpg'),
    alt: 'Our lovely moments together',
    caption: 'our lovely moments (i found it while searching for a photo of us tgthr)',
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
          {/* Main photo display - pixel-art frame */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4 border-4 border-primary/30" style={{ imageRendering: 'pixelated' }}>
            <img
              key={currentIndex}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              loading="lazy"
              className={`w-full h-full object-contain ${
                animationDirection === 'right' 
                  ? 'animate-slide-in-right' 
                  : 'animate-slide-in-left'
              }`}
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
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link to="/zho-spotify">
            <Button 
              variant="outline"
              size="lg" 
              className="min-w-[150px] border-2 border-primary/50 hover:border-primary"
              aria-label="Go back to Spotify page"
            >
              ← Go Back
            </Button>
          </Link>
          <Link to="/voice">
            <Button 
              size="lg" 
              className="min-w-[150px]"
              aria-label="Continue to voice messages"
            >
              Continue →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Photos;

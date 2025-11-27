/**
 * Message.tsx - Personal Message Page
 * 
 * Purpose: Allow space for a long personal message with pixel-art styling
 * Features:
 * - Large textarea for extended writing
 * - Pixel-art aesthetic consistent with project theme
 * - Mobile-friendly with proper text input handling
 * - Smooth animations and transitions
 * - Auto-cycling theme support inherited from design system
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Message = () => {
  // Pre-written message for the recipient
  const message = `My dearest Zho,

Happy Birthday to the most amazing person I know! 🎂

Every moment with you feels like a beautiful dream I never want to wake up from. Your smile lights up my world, your laugh is my favorite sound, and your presence makes everything better.

Thank you for being you. Thank you for all the joy, love, and happiness you bring into my life. I am so grateful to have you.

Here's to celebrating you today and always!

With all my love,
Forever yours ❤️`;

  return (
    <div className="min-h-screen animated-bg py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            A Message for You
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Words from the heart, written just for you
          </p>
        </div>

        {/* Message display card - pixel-art styled */}
        <div 
          className="card-elevated p-6 md:p-8 mb-8 animate-fade-in border-4 border-primary/30"
          style={{ animationDelay: '0.2s', imageRendering: 'pixelated' }}
        >
          <div className="min-h-[300px] md:min-h-[400px] text-base md:text-lg leading-relaxed whitespace-pre-wrap text-foreground">
            {message}
          </div>
        </div>

        {/* Navigation buttons */}
        <div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <Link to="/voice">
            <Button 
              variant="outline"
              size="lg" 
              className="min-w-[150px] border-2 border-primary/50 hover:border-primary"
              aria-label="Go back to voice memos"
            >
              ← Go Back
            </Button>
          </Link>
          <Link to="/final">
            <Button size="lg" className="min-w-[150px]">
              Continue →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Message;

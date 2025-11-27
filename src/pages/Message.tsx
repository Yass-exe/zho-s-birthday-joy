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
  const message = `if i was asked if i had a person to love deeply i wouldve said smth like my fam or i love everyone but in diffrent ways , the usual thing any person would say , but when i met you the awnser to that question changed entirely

i'd tell everyone that i love u and u only because with u i got to experience what does it mean to have a companion , a lover , a person who actually wants you however u were , from the literal start i enjoyed every moment spent with you and i will cherrish every upcoming one because u were the nicest , loveliest , the most fun to watch even staring or hearing u talk at literally anything , no matter how unserious it was felt like a fun activity that i could never feel bored of

and that if it wasnt the greatest thing a man can have then id enjoy resting there for the rest of my life , having you as my eternal other part , my soulmate , my best girl i ever met , MY GIRL , and the one that i understood why god made heaven for

the one i got to understand why we would look for the ones we once loved there , zahia , happy birthday with all my feelings ❤️`;

  return (
    <div className="min-h-screen animated-bg py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Message for You
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Words from the heart, written just for you
          </p>
        </div>

        {/* Message display card - pixel-art styled, scrollable */}
        <div 
          className="card-elevated p-6 md:p-8 mb-8 animate-fade-in border-4 border-primary/30"
          style={{ animationDelay: '0.2s', imageRendering: 'pixelated' }}
        >
          <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto text-base md:text-lg leading-relaxed whitespace-pre-wrap text-foreground scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent pr-2">
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

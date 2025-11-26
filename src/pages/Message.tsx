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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Message = () => {
  const [message, setMessage] = useState('');

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

        {/* Message display card */}
        <div 
          className="card-elevated p-6 md:p-8 mb-8 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message will appear here..."
            className="min-h-[300px] md:min-h-[400px] resize-none text-base md:text-lg leading-relaxed font-pixel"
            readOnly
          />
        </div>

        {/* Continue button */}
        <div 
          className="text-center animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <Link to="/final">
            <Button size="lg" className="min-w-[200px]">
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Message;

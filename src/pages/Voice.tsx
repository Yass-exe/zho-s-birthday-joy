/**
 * Voice.tsx - Voice Memos Page with Auto-Cycling Theme
 * 
 * Purpose: Display all voice memos with custom audio controls and automatic theme cycling
 * Features:
 * - List all voice memos vertically with captions
 * - Custom audio player UI (play/pause, progress bar, duration display)
 * - Auto-cycling theme colors (Lavender → Pink → Coral) every 12 seconds
 * - Smooth fade transitions between themes
 * - Animated background with motion preference support
 * - Accessible with transcripts/summaries in expandable details
 * 
 * How to customize:
 * - Add audio files to public/audio/ directory (mp3, 128-192 kbps recommended)
 * - Add entries to voiceMemos array below with src, title, and transcript
 * - Adjust theme cycling interval by changing THEME_CYCLE_INTERVAL constant
 * 
 * Mobile audio restrictions:
 * - Audio playback must be user-initiated (autoplay not allowed)
 * - Each memo requires explicit play button interaction
 * - iOS Safari may have additional restrictions on background playback
 */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Voice memo data structure
 * To add more memos:
 * 1. Place audio file in public/audio/ with naming pattern voice-{n}.mp3
 * 2. Add entry here with src (path), title (caption), and transcript (accessibility)
 * 3. Recommended audio specs: mp3 format, 128-192 kbps, mono or stereo
 */
// Helper to get the correct asset path
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace('//', '/');
};

const voiceMemos = [
  {
    src: getAssetPath('audio/audio-1.mp3'),
    title: 'The first thing I wanted to say',
    transcript: 'Voice memo 1',
  },
  {
    src: getAssetPath('audio/audio-2.mp3'),
    title: 'What I should have told you sooner',
    transcript: 'Voice memo 2',
  },
  {
    src: getAssetPath('audio/audio-3.mp3'),
    title: 'The words from my heart',
    transcript: 'Voice memo 3',
  },
  {
    src: getAssetPath('audio/audio-4.mp3'),
    title: 'Something special',
    transcript: 'Voice memo 4',
  },
  {
    src: getAssetPath('audio/audio-5.mp3'),
    title: 'Just for you',
    transcript: 'Voice memo 5',
  },
  {
    src: getAssetPath('audio/audio-6.mp3'),
    title: 'With all my love',
    transcript: 'Voice memo 6',
  },
  {
    src: getAssetPath('audio/rec5z.mp3'),
    title: 'A special recording',
    transcript: 'Special voice memo',
  },
  {
    src: getAssetPath('audio/recnz.mp3'),
    title: 'One more thing',
    transcript: 'Final voice memo',
  },
];

/**
 * Theme color options for auto-cycling
 * Cycles through: Lavender → Pink → Coral
 * Each color updates the --accent CSS variable which affects:
 * - Button backgrounds
 * - Progress bars
 * - Interactive element highlights
 * 
 * Colors in HSL format for consistency with design system
 */
const themeColors = [
  { name: 'Lavender', value: '270 60% 70%' }, // Soft purple
  { name: 'Pink', value: '340 75% 65%' }, // Romantic rose/pink
  { name: 'Coral', value: '25 85% 65%' },  // Warm coral/peach
];

// Theme cycling interval in milliseconds (12 seconds for smooth experience)
const THEME_CYCLE_INTERVAL = 12000;

/**
 * Custom Audio Player Component
 * 
 * Purpose: Provides consistent, accessible audio controls across all browsers
 * Native <audio> element has inconsistent styling - this component wraps it
 * with custom UI while maintaining semantic HTML and ARIA support
 * 
 * Props:
 * - src: audio file path
 * - title: caption displayed above player
 * - transcript: text alternative for accessibility
 * 
 * State management:
 * - isPlaying: tracks play/pause state
 * - currentTime: current playback position in seconds
 * - duration: total audio length in seconds
 * 
 * Browser notes:
 * - Mobile Safari requires user interaction to start playback (no autoplay)
 * - Progress bar updates continuously during playback
 * - Seeking is supported via progress bar click (desktop) or drag (mobile)
 */
interface AudioPlayerProps {
  src: string;
  title: string;
  transcript: string;
}

const AudioPlayer = ({ src, title, transcript }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * Toggle play/pause
   * Side effects: updates audio element playback state
   * Browser restriction: must be called from user interaction (button click)
   */
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Handle potential autoplay restrictions
      audioRef.current.play().catch((error) => {
        console.warn('Audio playback failed:', error);
        // Could show toast notification to user here if desired
      });
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * Seek to specific time in audio
   * Input: progress (0-1) representing percentage through audio
   * Side effects: updates audio currentTime
   */
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const newTime = percent * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /**
   * Format seconds into MM:SS display
   * Input: time in seconds (float)
   * Output: string like "2:34" or "0:05"
   */
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  /**
   * Set up audio element event listeners
   * Tracks: duration loaded, time updates, playback ended
   * Cleanup: removes listeners on component unmount
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="card-elevated p-6 mb-6">
      {/* Hidden native audio element - provides actual playback functionality */}
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Caption/title of the voice memo */}
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      
      {/* Custom audio controls */}
      <div className="flex items-center gap-4 mb-3">
        {/* Play/Pause button with icon */}
        <Button
          onClick={togglePlayPause}
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {/* Progress bar container - clickable to seek */}
        <div className="flex-1">
          <div
            onClick={handleSeek}
            className="h-2 bg-muted rounded-full cursor-pointer relative overflow-hidden"
            role="progressbar"
            aria-valuenow={currentTime}
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-label="Audio progress"
          >
            {/* Filled progress indicator - uses accent color from theme */}
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                backgroundColor: `hsl(var(--accent))`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Time display: current / total duration */}
      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Expandable transcript for accessibility */}
      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer hover:text-foreground transition-colors">
          View transcript
        </summary>
        <p className="mt-2 pl-4 border-l-2 border-border">
          {transcript}
        </p>
      </details>
    </div>
  );
};

/**
 * Voice page main component with auto-cycling theme
 */
const Voice = () => {
  /**
   * Current theme index for auto-cycling
   * Cycles through themeColors array automatically
   */
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  /**
   * Apply theme color to CSS custom property with smooth transition
   * Updates --accent which cascades to all themed elements
   */
  useEffect(() => {
    const currentColor = themeColors[currentThemeIndex].value;
    document.documentElement.style.setProperty('--accent', currentColor);
    
    // Add transition for smooth color changes
    document.documentElement.style.transition = 'all 1.5s ease-in-out';
    
    return () => {
      document.documentElement.style.transition = '';
    };
  }, [currentThemeIndex]);

  /**
   * Auto-cycle through themes
   * Changes theme every THEME_CYCLE_INTERVAL milliseconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % themeColors.length);
    }, THEME_CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    // Main container with animated gradient background
    <div className="min-h-screen animated-bg py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            What I couldn't tell you
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Listen to these messages meant just for you
          </p>
        </div>

        {/* Voice memos list */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {voiceMemos.map((memo, index) => (
            <AudioPlayer
              key={index}
              src={memo.src}
              title={memo.title}
              transcript={memo.transcript}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/photos">
            <Button 
              variant="outline"
              size="lg" 
              className="min-w-[150px] border-2 border-primary/50 hover:border-primary"
              aria-label="Go back to photos"
            >
              ← Go Back
            </Button>
          </Link>
          <Link to="/message">
            <Button size="lg" className="min-w-[150px]">
              Continue →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Voice;

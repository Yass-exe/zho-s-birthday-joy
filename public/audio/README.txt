AUDIO FILES PLACEHOLDER
========================

This directory should contain your voice memo audio files.

REQUIRED FILES:
--------------
- voice-1.mp3
- voice-2.mp3  
- voice-3.mp3

AUDIO SPECIFICATIONS:
--------------------
Format: MP3
Bitrate: 128-192 kbps recommended
Channels: Mono or Stereo
Max file size: 5MB per file (for reasonable loading times)

HOW TO ADD YOUR AUDIO FILES:
---------------------------
1. Convert your audio recordings to MP3 format (use online converters or tools like Audacity)
2. Name them exactly as: voice-1.mp3, voice-2.mp3, voice-3.mp3
3. Place them in this directory (public/audio/)
4. Update the captions and transcripts in src/pages/Voice.tsx

MOBILE COMPATIBILITY NOTES:
--------------------------
- iOS Safari requires user interaction to start audio playback (no autoplay)
- Test audio files on actual mobile devices before deploying
- MP3 format provides the best cross-browser compatibility

TO ADD MORE VOICE MEMOS:
-----------------------
1. Add more MP3 files to this directory
2. Edit src/pages/Voice.tsx and add entries to the voiceMemos array
3. Include meaningful titles and transcripts for accessibility

For detailed instructions, see the main README.md file in the project root.

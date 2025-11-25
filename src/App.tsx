/**
 * App.tsx - Application Root Component
 * 
 * Purpose: Sets up routing, providers, and global configuration
 * External dependencies:
 * - react-router-dom: Client-side routing for multi-page experience
 * - @tanstack/react-query: State management (minimal usage in this static site)
 * - shadcn/ui: Toast notifications and tooltips
 * 
 * Routing structure:
 * / (Index) -> /photos -> /voice -> /final
 * All routes accessible via direct URL for bookmarking
 * 
 * How this connects to the multi-page experience:
 * - BrowserRouter enables navigation without page reloads
 * - Each route renders a distinct page component
 * - Routes support browser back/forward buttons
 * - Direct URL access works for any page
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ZhoSpotify from "./pages/ZhoSpotify";
import Photos from "./pages/Photos";
import Voice from "./pages/Voice";
import Final from "./pages/Final";
import NotFound from "./pages/NotFound";
import SpotifyPlayer from "./components/SpotifyPlayer";
import FallingElements from "./components/FallingElements";

// React Query client - minimal configuration for this static site
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notification components - available globally */}
      <Toaster />
      <Sonner />
      
      {/* Ambient falling hearts and stars */}
      <FallingElements />
      
      {/* Persistent Spotify player - mounted above BrowserRouter to persist across routes */}
      <SpotifyPlayer />
      
      {/* 
        Client-side routing
        Note: Works perfectly for development and with proper server config:
        - Netlify: Automatically handles client-side routing
        - GitHub Pages: May need hash routing or redirect rules
        - See README.md for deployment instructions
      */}
      <BrowserRouter>
        <Routes>
          {/* Landing page - warm welcome message */}
          <Route path="/" element={<Index />} />
          
          {/* Dedicated Spotify playlist page */}
          <Route path="/zho-spotify" element={<ZhoSpotify />} />
          
          {/* Photo gallery with slider */}
          <Route path="/photos" element={<Photos />} />
          
          {/* Voice memos with auto-cycling theme */}
          <Route path="/voice" element={<Voice />} />
          
          {/* Birthday message finale */}
          <Route path="/final" element={<Final />} />
          
          {/* Catch-all for invalid URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

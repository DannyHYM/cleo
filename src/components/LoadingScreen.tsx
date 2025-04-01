"use client";

import { useEffect, useState, useRef } from "react";
import { 
  initImageCache, 
  generateFrameUrls, 
  preloadImageBatch 
} from "@/utils/imageOptimizer";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  framesToLoad?: number;
}

const LoadingScreen = ({ onLoadingComplete, framesToLoad = 192 }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState<'initializing' | 'loading' | 'finalizing'>('initializing');
  const loadingAttempted = useRef(false);
  
  useEffect(() => {
    // Prevent duplicate loading attempts
    if (loadingAttempted.current) return;
    loadingAttempted.current = true;
    
    const loadFrames = async () => {
      try {
        // Initialize the image cache system
        initImageCache();
        setLoadingStage('loading');
        
        // Generate frame URLs
        const frameUrls = generateFrameUrls('frame-anim-1', framesToLoad, 0);
        
        // Split loading into chunks for better UX feedback
        const chunkSize = 32; // Load in chunks of 32 frames
        for (let i = 0; i < frameUrls.length; i += chunkSize) {
          const chunk = frameUrls.slice(i, Math.min(i + chunkSize, frameUrls.length));
          const chunkWeight = chunk.length / frameUrls.length;
          const chunkStartProgress = (i / frameUrls.length) * 100;
          
          // Preload this chunk of images
          await preloadImageBatch(
            chunk,
            (chunkProgress) => {
              // Calculate overall progress including previous chunks
              const overallProgress = chunkStartProgress + (chunkProgress * chunkWeight);
              setLoadingProgress(Math.min(Math.floor(overallProgress), 99)); // Cap at 99% until completely done
            },
            5 // 5 images at a time in each batch
          );
          
          // Give the browser a moment to breathe between chunks
          if (i + chunkSize < frameUrls.length) {
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
        
        // Add small delay for smoother UX
        setLoadingStage('finalizing');
        setLoadingProgress(100);
        
        // Notify completion after a short delay
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Still complete loading to prevent getting stuck
        onLoadingComplete();
      }
    };
    
    // Start loading with a small delay to let the component mount properly
    setTimeout(loadFrames, 100);
  }, [onLoadingComplete, framesToLoad]);
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-12">
        {/* Logo with CLEO text */}
        <div className="flex items-center mb-8">
          <div className="mr-4">
            <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0" width="80" height="24" fill="white" />
              <rect y="32" width="48" height="16" fill="white" />
              <rect y="56" width="80" height="24" fill="white" />
            </svg>
          </div>
          <h1 className="text-white text-4xl font-bold tracking-wider">CLEO</h1>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        
        {/* Loading status - removed 'frames' from the text */}
        <div className="text-white text-sm font-light">
          {loadingStage === 'initializing' && 'Preparing...'}
          {loadingStage === 'loading' && `Loading: ${loadingProgress}%`}
          {loadingStage === 'finalizing' && 'Finalizing...'}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 
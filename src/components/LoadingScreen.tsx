"use client";

import { useEffect, useState, useRef } from "react";
import { 
  initImageCache, 
  generateFrameUrls, 
  preloadImageBatch,
  preloadImage 
} from "@/utils/imageOptimizer";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  framesToLoad?: number;
}

const LoadingScreen = ({ onLoadingComplete, framesToLoad = 192 }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState<'initializing' | 'loading-critical' | 'loading-remaining' | 'finalizing'>('initializing');
  const loadingAttempted = useRef(false);
  
  useEffect(() => {
    // Prevent duplicate loading attempts
    if (loadingAttempted.current) return;
    loadingAttempted.current = true;
    
    const loadFrames = async () => {
      try {
        // Initialize the image cache system
        initImageCache();
        setLoadingStage('loading-critical');
        
        // Generate frame URLs
        const frameUrls = generateFrameUrls('frame-anim-1', framesToLoad, 0);
        
        // First load critical frames (keyframes) for immediate display
        const criticalFrames = [
          frameUrls[0],                                // First frame
          frameUrls[Math.floor(frameUrls.length * 0.25)], // 25% through
          frameUrls[Math.floor(frameUrls.length * 0.5)],  // Middle frame
          frameUrls[Math.floor(frameUrls.length * 0.75)], // 75% through
          frameUrls[frameUrls.length - 1]              // Last frame
        ];

        // Preload critical frames first (10% of progress)
        await preloadImageBatch(
          criticalFrames,
          (progress) => {
            setLoadingProgress(Math.floor(progress * 0.1)); // First 10% of progress
          },
          3 // 3 at a time
        );
        
        setLoadingStage('loading-remaining');

        // Create adaptive batches - smaller near the beginning and end
        const createAdaptiveBatches = (urls: string[]): string[][] => {
          const batches: string[][] = [];
          const totalFrames = urls.length;
          
          // Already loaded critical frames, filter them out
          const remainingFrames = urls.filter(url => !criticalFrames.includes(url));
          
          // Create batches based on position in the animation
          const batchSize = 12; // Default batch size
          
          // Prioritize beginning, middle and end segments of the animation
          // by loading them in specific order
          
          // Beginning segment (first 25%)
          const beginningFrames = remainingFrames.filter((_, i) => 
            i < Math.floor(remainingFrames.length * 0.25)
          );
          
          // End segment (last 25%)
          const endFrames = remainingFrames.filter((_, i) => 
            i >= Math.floor(remainingFrames.length * 0.75)
          );
          
          // Middle segment (remaining 50%)
          const middleFrames = remainingFrames.filter((_, i) => 
            i >= Math.floor(remainingFrames.length * 0.25) && i < Math.floor(remainingFrames.length * 0.75)
          );
          
          // Create beginning batches (high priority)
          for (let i = 0; i < beginningFrames.length; i += batchSize) {
            batches.push(beginningFrames.slice(i, i + batchSize));
          }
          
          // Create end batches (second priority)
          for (let i = 0; i < endFrames.length; i += batchSize) {
            batches.push(endFrames.slice(i, i + batchSize));
          }
          
          // Create middle batches (lower priority)
          for (let i = 0; i < middleFrames.length; i += batchSize) {
            batches.push(middleFrames.slice(i, i + batchSize));
          }
          
          return batches;
        };
        
        // Get adaptive batches
        const batches = createAdaptiveBatches(frameUrls);
        
        // Load all batches
        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          const batchWeight = batch.length / frameUrls.length;
          const batchStartProgress = 10 + ((i / batches.length) * 89); // 10-99% progress range
          
          // Preload this batch
          await preloadImageBatch(
            batch,
            (batchProgress) => {
              // Calculate overall progress
              const overallProgress = batchStartProgress + (batchProgress * batchWeight);
              setLoadingProgress(Math.min(Math.floor(overallProgress), 99));
            },
            8 // Load 8 at a time for better performance
          );
          
          // Give the browser a moment to breathe between batches
          if (i < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 10));
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
        
        {/* Loading status text - more informative */}
        <div className="text-white text-sm font-light">
          {loadingStage === 'initializing' && 'Preparing...'}
          {loadingStage === 'loading-critical' && `Loading: ${loadingProgress}%`}
          {loadingStage === 'loading-remaining' && `Loading: ${loadingProgress}%`}
          {loadingStage === 'finalizing' && 'Finalizing...'}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 
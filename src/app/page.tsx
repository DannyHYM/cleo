"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FrameAnimation from "@/components/sections/FrameAnimation";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import TechnicalSpecs from "@/components/sections/TechnicalSpecs";
import UseCases from "@/components/sections/UseCases";
import Testimonials from "@/components/sections/Testimonials";
import FounderStory from "@/components/sections/FounderStory";
import FinalCTA from "@/components/sections/FinalCTA";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const loadingAttempts = useRef(0);
  const [failedLoading, setFailedLoading] = useState(false);
  
  // Track load time for analytics
  const loadStartTime = useRef(Date.now());
  
  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; // Also lock html element
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      // Log load completion time
      const loadTime = Date.now() - loadStartTime.current;
      console.log(`Total loading time: ${loadTime}ms`);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isLoading]);
  
  // Handler for loading completion
  const handleLoadingComplete = () => {
    // Small delay to ensure browser has processed everything
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  // Handle loading retry
  const handleRetry = () => {
    loadingAttempts.current += 1;
    setFailedLoading(false);
    setIsLoading(true);
    loadStartTime.current = Date.now();
  };
  
  // Handle loading failure (timeout after 60s)
  useEffect(() => {
    if (!isLoading) return;
    
    const timeoutId = setTimeout(() => {
      if (isLoading && loadingAttempts.current < 2) {
        console.warn('Loading timed out, offering retry option');
        setFailedLoading(true);
      } else if (isLoading) {
        // After 2 attempts, just proceed anyway
        console.warn('Multiple loading attempts failed, proceeding anyway');
        setIsLoading(false);
      }
    }, 60000); // 60 second timeout
    
    return () => clearTimeout(timeoutId);
  }, [isLoading]);
  
  // Preload non-animation critical assets
  useEffect(() => {
    // We'll load non-critical assets after the animation frames
    if (!isLoading) {
      const criticalAssets = [
        '/images/hero-bg.jpg',
        '/images/feature-bg.jpg',
        // Add more critical paths here
      ];
      
      // Preload these in the background after main loading is done
      criticalAssets.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    }
  }, [isLoading]);

  // Handle network connection changes
  useEffect(() => {
    const handleConnectionChange = () => {
      if (navigator.onLine === false && isLoading) {
        setFailedLoading(true);
      }
    };
    
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          
          {/* Loading failure overlay */}
          {failedLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
              <div className="bg-gray-900 p-8 rounded-lg max-w-md text-center">
                <h2 className="text-white text-xl font-bold mb-4">
                  Loading is taking longer than expected
                </h2>
                <p className="text-gray-300 mb-6">
                  This could be due to a slow connection or network issue.
                </p>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={handleRetry}
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                  >
                    Retry Loading
                  </button>
                  <button
                    onClick={() => setIsLoading(false)}
                    className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:bg-opacity-10 transition-colors"
                  >
                    Continue Anyway
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <main className="min-h-screen flex flex-col">
          {/* <Header /> */}
          <Hero />
          <FrameAnimation />
          <FeatureShowcase />
          <TechnicalSpecs />
          <UseCases />
          {/* <Testimonials />
          <FounderStory /> */}
          <FinalCTA />
          <Footer />
        </main>
      )}
    </>
  );
}

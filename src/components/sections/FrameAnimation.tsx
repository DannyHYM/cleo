"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  formatFrameNumber, 
  generateFrameUrls, 
  getImageFromCache 
} from "@/utils/imageOptimizer";

// Custom type for our window with preloaded images
declare global {
  interface Window {
    __PRELOADED_IMAGES?: Record<string, HTMLImageElement>;
  }
}

const FrameAnimation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const prevImageRef = useRef<HTMLImageElement>(null);
  const lastFrameIndexRef = useRef<number>(-1);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames] = useState(192);
  const [progress, setProgress] = useState(0);
  const frameUrlsRef = useRef<string[]>([]);
  
  useEffect(() => {
    // Register ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    const container = containerRef.current;
    const image = imageRef.current;
    const prevImage = prevImageRef.current;

    if (!section || !container || !image || !prevImage) return;

    // Create frame URLs array if not already created
    if (frameUrlsRef.current.length === 0) {
      frameUrlsRef.current = generateFrameUrls('frame-anim-1', totalFrames, 0);
    }

    // Hide the previous image initially
    gsap.set(prevImage, { opacity: 0 });
    
    // Set first frame
    const firstFrameUrl = frameUrlsRef.current[0];
    image.src = firstFrameUrl;

    // Optimal pinning duration
    const pinnedDuration = "500%";

    // Debounce frame updates
    let frameUpdateTimeout: NodeJS.Timeout | null = null;
    
    // Function to update the frame
    const updateFrame = (frameIndex: number) => {
      // Only update if frame has changed
      if (frameIndex !== lastFrameIndexRef.current) {
        // Clear any pending updates
        if (frameUpdateTimeout) {
          clearTimeout(frameUpdateTimeout);
        }
        
        const nextFrameUrl = frameUrlsRef.current[frameIndex];
        
        // Only update if image source needs to change
        if (image.src !== nextFrameUrl) {
          // Use the previous image to create a crossfade effect
          prevImage.src = image.src;
          gsap.to(prevImage, { opacity: 1, duration: 0.1 });
          
          // Set new image
          image.src = nextFrameUrl;
          gsap.set(image, { opacity: 0 });
          
          // Fade in the new image
          frameUpdateTimeout = setTimeout(() => {
            gsap.to(image, { opacity: 1, duration: 0.15 });
            gsap.to(prevImage, { opacity: 0, duration: 0.15 });
          }, 30);
        }
        
        // Update state and refs
        lastFrameIndexRef.current = frameIndex;
        setCurrentFrame(frameIndex);
      }
    };
    
    // Calculate which frame to show based on scroll position
    const scrubFrames = (progress: number) => {
      // Calculate frame index based on progress
      const frameIndex = Math.min(
        Math.max(Math.floor(progress * frameUrlsRef.current.length), 0),
        frameUrlsRef.current.length - 1
      );
      
      updateFrame(frameIndex);
      setProgress(progress);
    };

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Create scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${pinnedDuration}`,
      pin: container,
      anticipatePin: 1,
      scrub: 0.3, // Smooth scrub for better performance
      onUpdate: (self) => {
        scrubFrames(self.progress);
      },
      onLeave: (self) => {
        // Show last frame when leaving
        if (currentFrame !== frameUrlsRef.current.length - 1) {
          updateFrame(frameUrlsRef.current.length - 1);
        }
      },
      onEnterBack: (self) => {
        // Show first frame when re-entering
        if (self.progress === 0) {
          updateFrame(0);
        }
      },
      markers: false,
    });

    // Adjust section height
    section.style.height = pinnedDuration;

    // Clean up
    return () => {
      scrollTrigger.kill();
      if (frameUpdateTimeout) {
        clearTimeout(frameUpdateTimeout);
      }
    };
  }, [totalFrames]);

  return (
    <section 
      ref={sectionRef}
      id="frame-animation"
      className="relative w-full"
      style={{ height: "500vh" }}
    >
      <div 
        ref={containerRef} 
        className="w-full h-screen flex items-center justify-center bg-black"
      >
        <div className="relative w-full h-full">
          {/* Previous image for crossfade */}
          <img 
            ref={prevImageRef}
            src=""
            alt="Previous frame"
            className="absolute inset-0 w-full h-full object-contain opacity-0"
            style={{ zIndex: 1 }}
            loading="eager"
          />
          
          {/* Current image */}
          <img 
            ref={imageRef}
            src={`/frame-anim-1/${formatFrameNumber(currentFrame)}.png`}
            alt={`Cleo glasses animation frame`}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ zIndex: 2 }}
            loading="eager"
          />
        </div>
        
        {/* Debug info - uncomment for debugging */}
        {/* <div className="absolute bottom-4 left-4 bg-black/80 text-white p-2 rounded text-sm z-10">
          Frame: {currentFrame}/{totalFrames-1} | Progress: {Math.round(progress * 100)}%
        </div> */}
      </div>
    </section>
  );
};

export default FrameAnimation; 
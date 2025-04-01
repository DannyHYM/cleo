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
  const frameBufferRef = useRef<number[]>([]); // Buffer to smooth frame transitions
  const animationFrameRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  
  // Initialize frame URLs once
  useEffect(() => {
    if (frameUrlsRef.current.length === 0) {
      frameUrlsRef.current = generateFrameUrls('frame-anim-1', totalFrames, 0);
    }
  }, [totalFrames]);
  
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

    // Hide the previous image initially
    gsap.set(prevImage, { opacity: 0 });
    
    // Set first frame (use cached version if available)
    const firstFrameUrl = frameUrlsRef.current[0];
    const cachedFirstFrame = window.__PRELOADED_IMAGES?.[firstFrameUrl];
    if (cachedFirstFrame) {
      image.src = cachedFirstFrame.src;
    } else {
      image.src = firstFrameUrl;
    }

    // Optimal pinning duration
    const pinnedDuration = "500%";
    
    // Function to update the frame with better transitions
    const updateFrame = (frameIndex: number) => {
      // Add to frame buffer for smoother transitions
      if (!frameBufferRef.current.includes(frameIndex)) {
        frameBufferRef.current.push(frameIndex);
        // Keep buffer limited to avoid memory issues
        if (frameBufferRef.current.length > 5) {
          frameBufferRef.current = frameBufferRef.current.slice(-5);
        }
      }
      
      // If not currently updating frames, start the update process
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        processNextFrame();
      }
    };
    
    // Process frames from the buffer
    const processNextFrame = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (frameBufferRef.current.length === 0) {
        isScrollingRef.current = false;
        return;
      }
      
      const nextFrameIndex = frameBufferRef.current.shift()!;
      
      // Only process if it's a new frame
      if (nextFrameIndex !== lastFrameIndexRef.current) {
        const nextFrameUrl = frameUrlsRef.current[nextFrameIndex];
        
        // Try to get image from cache first
        const cachedImage = window.__PRELOADED_IMAGES?.[nextFrameUrl];
        
        // Set previous image for smoother transition
        prevImage.src = image.src;
        gsap.to(prevImage, { opacity: 1, duration: 0.05 });
        
        // Set new image (use cached version if available)
        if (cachedImage) {
          image.src = cachedImage.src;
        } else {
          image.src = nextFrameUrl;
        }
        
        // Fade in new image with requestAnimationFrame for smoother transition
        gsap.set(image, { opacity: 0 });
        
        // Use a single frame delay for better transitions
        requestAnimationFrame(() => {
          gsap.to(image, { opacity: 1, duration: 0.2 });
          gsap.to(prevImage, { opacity: 0, duration: 0.2 });
          
          // Update state and refs
          lastFrameIndexRef.current = nextFrameIndex;
          setCurrentFrame(nextFrameIndex);
          
          // Process next frame if available
          if (frameBufferRef.current.length > 0) {
            animationFrameRef.current = requestAnimationFrame(processNextFrame);
          } else {
            isScrollingRef.current = false;
          }
        });
      } else {
        // If it's the same frame, skip to next in buffer
        if (frameBufferRef.current.length > 0) {
          animationFrameRef.current = requestAnimationFrame(processNextFrame);
        } else {
          isScrollingRef.current = false;
        }
      }
    };
    
    // Calculate which frame to show based on scroll position with improved smoothing
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

    // Create scroll trigger with optimized settings
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${pinnedDuration}`,
      pin: container,
      anticipatePin: 1,
      scrub: 0.3, // Keep scrub consistent
      onUpdate: (self) => {
        // Use a more efficient approach to updates
        requestAnimationFrame(() => {
          scrubFrames(self.progress);
        });
      },
      onLeave: (self) => {
        // Show last frame when leaving
        updateFrame(frameUrlsRef.current.length - 1);
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      frameBufferRef.current = [];
      isScrollingRef.current = false;
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
            src={`/frame-anim-1/${formatFrameNumber(0)}.png`}
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
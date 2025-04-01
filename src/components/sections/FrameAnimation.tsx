"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameIndexRef = useRef<number>(-1);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames] = useState(192);
  const [progress, setProgress] = useState(0);
  const [useCanvas, setUseCanvas] = useState(true);
  const frameUrlsRef = useRef<string[]>([]);
  const frameImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  
  // Set up canvas rendering
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    
    // Set canvas size to match container
    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;
    
    // Set initial canvas background to black to match section background
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Draw frame to canvas function
  const drawFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false }); // non-alpha for better performance
    
    if (!canvas || !context || frameIndex >= frameImagesRef.current.length) return;
    
    const img = frameImagesRef.current[frameIndex];
    if (!img) return;
    
    // Clear canvas
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Get aspect ratio of the image
    const imgAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;
    
    // Calculate dimensions to maintain aspect ratio while filling the canvas
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasAspect > imgAspect) {
      // Canvas is wider than the image
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than the image
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgAspect;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    // Draw the image centered - use low-level drawing for better performance
    try {
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } catch (e) {
      console.error("Error drawing to canvas:", e);
    }
  }, []);

  // Handle window resize for canvas
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    
    // Adjust for high-DPI displays for sharper images
    const scale = window.devicePixelRatio;
    
    // Set canvas size to match container with device pixel ratio
    canvas.width = containerRef.current.clientWidth * scale;
    canvas.height = containerRef.current.clientHeight * scale;
    
    // Set display size
    canvas.style.width = `${containerRef.current.clientWidth}px`;
    canvas.style.height = `${containerRef.current.clientHeight}px`;
    
    // Scale context
    const context = canvas.getContext('2d', { alpha: false });
    if (context) {
      context.scale(scale, scale);
    }
    
    // Redraw current frame
    if (lastFrameIndexRef.current >= 0) {
      drawFrameToCanvas(lastFrameIndexRef.current);
    }
  }, [drawFrameToCanvas]);

  useEffect(() => {
    // Register ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    const container = containerRef.current;
    const image = imageRef.current;
    const prevImage = prevImageRef.current;
    const canvas = canvasRef.current;

    if (!section || !container || (!(image && prevImage) && !canvas)) return;

    // Create frame URLs array if not already created
    if (frameUrlsRef.current.length === 0) {
      frameUrlsRef.current = generateFrameUrls('frame-anim-1', totalFrames, 0);
    }

    // Set up canvas if using canvas mode
    if (canvas && useCanvas) {
      // Initialize canvas size
      setupCanvas();
      handleResize();
      
      // Add resize listener
      window.addEventListener('resize', handleResize);
    } else if (image && prevImage) {
      // Hide the previous image initially if using image mode
      gsap.set(prevImage, { opacity: 0 });
      
      // Set first frame
      const firstFrameUrl = frameUrlsRef.current[0];
      image.src = firstFrameUrl;
    }
    
    // Get preloaded images from global cache
    if (frameImagesRef.current.length === 0) {
      console.log("Loading images from cache for animation");
      frameImagesRef.current = frameUrlsRef.current.map(url => {
        return getImageFromCache(url);
      });
    }
    
    // Show first frame
    if (useCanvas && canvas) {
      drawFrameToCanvas(0);
    }

    // Optimal pinning duration
    const pinnedDuration = "500%";

    // Debounce frame updates
    let frameUpdateTimeout: NodeJS.Timeout | null = null;
    
    // Use request animation frame for smoother transitions
    let rafId: number | null = null;
    
    // Keeps track of requested frame index for animation
    let requestedFrameIndex = -1;
    
    // Function to apply frame update with RAF
    const applyFrameUpdate = (frameIndex: number) => {
      // If the same frame is already requested, do nothing
      if (requestedFrameIndex === frameIndex) return;
      
      requestedFrameIndex = frameIndex;
      
      // Cancel existing RAF
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      
      // Use RAF for smoother animation
      rafId = requestAnimationFrame(() => {
        if (useCanvas) {
          drawFrameToCanvas(frameIndex);
        } else if (image && prevImage) {
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
            if (frameUpdateTimeout) {
              clearTimeout(frameUpdateTimeout);
            }
            
            frameUpdateTimeout = setTimeout(() => {
              gsap.to(image, { opacity: 1, duration: 0.15 });
              gsap.to(prevImage, { opacity: 0, duration: 0.15 });
            }, 30);
          }
        }
        
        // Update state and refs
        lastFrameIndexRef.current = frameIndex;
        setCurrentFrame(frameIndex);
      });
    };
    
    // Calculate which frame to show based on scroll position
    const scrubFrames = (progress: number) => {
      // Calculate frame index based on progress
      const frameIndex = Math.min(
        Math.max(Math.floor(progress * frameUrlsRef.current.length), 0),
        frameUrlsRef.current.length - 1
      );
      
      // Only update if frame has changed
      if (frameIndex !== lastFrameIndexRef.current) {
        // Clear any pending updates
        if (frameUpdateTimeout) {
          clearTimeout(frameUpdateTimeout);
        }
        
        // Apply the frame update with RAF
        applyFrameUpdate(frameIndex);
        
        // Update progress state
        setProgress(progress);
      }
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
      scrub: 0.3, // Lower for better performance
      onUpdate: (self) => {
        scrubFrames(self.progress);
      },
      onLeave: (self) => {
        // Show last frame when leaving
        if (currentFrame !== frameUrlsRef.current.length - 1) {
          applyFrameUpdate(frameUrlsRef.current.length - 1);
        }
      },
      onEnterBack: (self) => {
        // Show first frame when re-entering
        if (self.progress === 0) {
          applyFrameUpdate(0);
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
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [formatFrameNumber, handleResize, useCanvas, drawFrameToCanvas, setupCanvas, totalFrames]);

  // Auto-detect if canvas is better (e.g., mobile)
  useEffect(() => {
    // Check if device might benefit from canvas rendering
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    // Check for low memory conditions - safe type checking for deviceMemory
    let isLowMemory = false;
    try {
      // Check if the property exists on navigator and is accessible
      // @ts-ignore - deviceMemory is not in all TypeScript navigator types
      const memory = navigator.deviceMemory;
      isLowMemory = typeof memory === 'number' && memory < 4;
    } catch (e) {
      // Property not available, default to false
      isLowMemory = false;
    }
    
    // High DPI screens can benefit from canvas rendering too
    const isHighDPI = window.devicePixelRatio > 1.5;
    
    // Set canvas mode based on device capabilities
    setUseCanvas(isMobileDevice || isLowMemory || isHighDPI || useCanvas);
  }, []);

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
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Canvas renderer (more performant especially on mobile) */}
          {useCanvas && (
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
              style={{ zIndex: 2 }}
            />
          )}
          
          {/* Image fallback for browsers without good canvas support */}
          {!useCanvas && (
            <>
              {/* Previous image for crossfade */}
              <img 
                ref={prevImageRef}
                src=""
                alt="Previous frame"
                className="absolute w-full h-full object-contain opacity-0"
                style={{ zIndex: 1 }}
                loading="eager"
              />
              
              {/* Current image */}
              <img 
                ref={imageRef}
                src={`/frame-anim-1/${formatFrameNumber(currentFrame)}.png`}
                alt={`Cleo glasses animation frame`}
                className="w-full h-full object-contain"
                style={{ zIndex: 2 }}
                loading="eager"
              />
            </>
          )}
        </div>
        
        {/* Debug info - uncomment for debugging */}
        {/* <div className="absolute bottom-4 left-4 bg-black/80 text-white p-2 rounded text-sm z-10">
          Frame: {currentFrame}/{totalFrames-1} | Progress: {Math.round(progress * 100)}%
          <br/>Renderer: {useCanvas ? 'Canvas' : 'Image'}
        </div> */}
      </div>
    </section>
  );
};

export default FrameAnimation; 
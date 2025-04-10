"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Spotlight } from '@/components/ui/spotlight';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Ripple class
    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      color: string;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.maxRadius = Math.random() * 120 + 80;
        this.opacity = 1;
        this.color = `rgba(14, 165, 233, ${this.opacity})`; // sky-500 color
      }
      
      update() {
        if (this.radius < this.maxRadius) {
          this.radius += 1.2;
          this.opacity = 1 - (this.radius / this.maxRadius);
          this.color = `rgba(14, 165, 233, ${this.opacity * 0.4})`;
          return true;
        }
        return false;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
    }

    // Ripples array and animation
    let ripples: Ripple[] = [];
    let animationFrameId: number;

    // Add ripples on cursor move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCursorPos({ x, y });
      
      // Only add ripple occasionally to avoid too many
      if (Math.random() > 0.85) {
        ripples.push(new Ripple(x, y));
      }
    };

    // Add ripple on click
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add multiple ripples on click
      for (let i = 0; i < 3; i++) {
        const offset = Math.random() * 20 - 10;
        ripples.push(new Ripple(x + offset, y + offset));
      }
    };

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw ripples
      ripples = ripples.filter(ripple => {
        ripple.draw(ctx);
        return ripple.update();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();
    
    // Add mouse events
    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background AR render image - full screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/frontrender.png"
          alt="Cleo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'brightness(1.1)' }} // Darken the image slightly to improve text visibility
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>
      
      {/* Ripple effect canvas - above the image */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10"
      />
      
      {/* Hero content */}
      <div className="relative flex flex-col z-20 w-full h-full min-h-screen">
        {/* Combined Title and Description */}
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div 
            className="text-center z-10 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              World's <span className="text-sky-500">First</span> AR Workout Glasses 
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-2xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              View your reps, heart rate, and muscle data in real-time. Revolutionizing workouts.
            </motion.p>
          </motion.div>
        </div>

        {/* Down arrow indicator */}
        <div className="w-full px-4 absolute bottom-[120px]">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <motion.div
              animate={{ 
                y: [0, 10, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut" 
              }}
              className="flex items-center justify-center"
              onClick={() => {
                // Scroll to the FrameAnimation section
                const frameAnimationSection = document.getElementById("frame-animation");
                if (frameAnimationSection) {
                  frameAnimationSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <svg 
                width="40" 
                height="20" 
                viewBox="0 0 40 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <path 
                  d="M2 2L20 20L38 2" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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

    // Add automatic ripples
    const autoRippleInterval = setInterval(() => {
      if (canvas.width > 0 && canvas.height > 0) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ripples.push(new Ripple(x, y));
      }
    }, 1500);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      clearInterval(autoRippleInterval);
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
          src="/ARRender.png"
          alt="Cleo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'brightness(1.1)' }} // Darken the image slightly to improve text visibility
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>
      
      {/* Ripple effect canvas - above the image */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10"
      />
      
      {/* Hero content */}
      <div className="flex flex-col items-center justify-center z-20 w-full px-4 py-24 pt-50">
        {/* Text content */}
        <motion.div 
          className="text-center z-10 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-70 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            The Future is in <span className="text-sky-500">Sight</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience reality enhanced with our precisely engineered Cleo glasses. Clean design meets revolutionary technology.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center relative mb-12"
          >
            <Button 
              variant="primary" 
              size="lg"
              className="rounded-full px-10 py-6 text-base font-medium tracking-wide bg-sky-600 hover:bg-sky-700"
              onClick={() => {
                const featuresSection = document.getElementById("features");
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Discover
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 
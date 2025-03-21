"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (clientX - centerX) / 25;
      const moveY = (clientY - centerY) / 25;
      
      const elements = containerRef.current.querySelectorAll('[data-parallax]');
      
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const speedX = parseFloat(htmlEl.dataset.speedX || "1");
        const speedY = parseFloat(htmlEl.dataset.speedY || "1");
        
        htmlEl.style.transform = `translate(${moveX * speedX}px, ${moveY * speedY}px)`;
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 left-[15%] w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-[15%] w-72 h-72 bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[25%] w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-[35%] left-[30%] w-32 h-32 bg-orange-500/10 rounded-full blur-xl" />
      </div>
      
      {/* Product image */}
      <motion.div 
        className="relative w-full max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        data-parallax
        data-speed-x="1.5"
        data-speed-y="1.5"
      >
        <div className="w-full h-[300px] md:h-[380px] bg-neutral-100 dark:bg-neutral-900 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Product elements */}
            <div className="absolute w-[380px] h-[2px] bg-neutral-200 dark:bg-neutral-800 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute w-[2px] h-[380px] bg-neutral-200 dark:bg-neutral-800 left-1/2 transform -translate-x-1/2"></div>
            
            {/* Main lens circle */}
            <div className="absolute w-[180px] h-[180px] rounded-full border-[12px] border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-full bg-neutral-300 dark:bg-neutral-700 shadow-inner"></div>
              <div className="absolute w-[140px] h-[140px] rounded-full border border-orange-500 opacity-20"></div>
              <div className="absolute w-[100px] h-[100px] rounded-full border border-orange-600 opacity-30"></div>
            </div>
            
            {/* Side controls */}
            <div className="absolute right-[30%] top-[35%] w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-lg">
              <div className="absolute inset-[3px] rounded-full bg-white dark:bg-neutral-950">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-[2px] bg-orange-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="absolute left-[30%] bottom-[35%] w-8 h-8 rounded-sm bg-neutral-200 dark:bg-neutral-800 shadow-md">
              <div className="absolute inset-[2px] rounded-sm bg-white dark:bg-neutral-950">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-600"></div>
              </div>
            </div>
            
            {/* Subtle lighting effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
            
            {/* Product label - more subtle */}
            <div className="absolute bottom-5 right-5 text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-600">VISION AR.01</div>
          </div>
        </div>
      </motion.div>
      
      {/* Hero content */}
      <motion.div 
        className="text-center z-10 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          The Future Is In <span className="text-orange-600">Sight</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience reality enhanced with our precisely engineered AR glasses. Clean design meets revolutionary technology.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 relative"
        >
          {/* Remove animated glow effect */}
          
          <Button 
            variant="primary" 
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium tracking-wide"
            onClick={() => {
              const waitlistSection = document.getElementById("waitlist");
              if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Join the Waitlist
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium tracking-wide border-neutral-300 dark:border-neutral-700"
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <div className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-600 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-orange-600 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 
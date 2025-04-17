"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/POV/gym_squat_pov.png",
    alt: "Squat POV View",
    fit: "cover"
  },
  {
    src: "/POV/bench_press_pov.png",
    alt: "Bench Press POV View",
    fit: "cover"
  },
  {
    src: "/POV/back_pull_pov.png",
    alt: "Back Pull POV View",
    fit: "contain"
  },
  {
    src: "/POV/bicep_curl_pov.png",
    alt: "Bicep Curl POV View",
    fit: "contain"
  }
];

export const POVRender = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoCycleRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const isPausedRef = useRef<boolean>(false);

  const startAutoCycle = () => {
    if (autoCycleRef.current) {
      clearInterval(autoCycleRef.current);
    }

    autoCycleRef.current = setInterval(() => {
      const now = Date.now();
      // Only advance if it's been 3 seconds since the last interaction
      if (now - lastInteractionRef.current >= 3000) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        isPausedRef.current = false;
      }
    }, 5000);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    lastInteractionRef.current = Date.now();
    isPausedRef.current = true;

    // Clear existing interval
    if (autoCycleRef.current) {
      clearInterval(autoCycleRef.current);
    }

    // Start a new interval after 3 seconds
    setTimeout(() => {
      if (Date.now() - lastInteractionRef.current >= 3000) {
        startAutoCycle();
      }
    }, 3000);
  };

  // Initialize auto-cycle
  useEffect(() => {
    startAutoCycle();
    return () => {
      if (autoCycleRef.current) {
        clearInterval(autoCycleRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full bg-black py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-400 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          POV
        </motion.h2>

        <div className="relative w-full h-[80vh] max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className={`object-${images[currentIndex].fit}`}
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-sky-500 scale-125" 
                  : "bg-neutral-600 hover:bg-neutral-500"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type SpecPoint = {
  id: string;
  title: string;
  description: string;
  x: string;
  y: string;
  delay: number;
};

const specPoints: SpecPoint[] = [
  {
    id: "A",
    title: "Ultra-Wide HD Lens",
    description: "Take panoramic, high-quality photos and videos with the ultra-wide 12 megapixel lens.",
    x: "41%",
    y: "26%",
    delay: 0.1,
  },
  {
    id: "B",
    title: "UI Navigation",
    description: "Delicately crafted stainless steel knob for easy navigation.",
    x: "62%",
    y: "25%",
    delay: 0.3,
  },
  {
    id: "C",
    title: "Li-Ion Battery",
    description: "Custom-designed 1200mAh battery with fast charging capability via USB-C.",
    x: "67.5%",
    y: "60%",
    delay: 0.2,
  },
  {
    id: "D",
    title: "Neural Processor",
    description: "Custom 5nm SoC with dedicated AI cores for real-time processing.",
    x: "80%",
    y: "55%",
    delay: 0.5,
  },
  {
    id: "E",
    title: "Blue Light Protection Lenses",
    description: "99.9% UV protection and blue light filtering clear lenses. For every enviornemnt.",
    x: "20%",
    y: "55%",
    delay: 0.4,
  },
  
];

const TechnicalSpecs = () => {
  const [activeSpec, setActiveSpec] = useState<string | null>(null);

  return (
    <section id="specs" className="py-24 px-2 md:px-4 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwaDYwVjBoLTYweiIvPjxwYXRoIGQ9Ik0zMCA2MFYwIi8+PHBhdGggZD0iTTYwIDMwSDAiLz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <div className="max-w-[1440px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-neutral-600 dark:text-white"
          >
            Technical Specifications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-medium"
          >
            Built with precision for uncompromising performance
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Technical diagram */}
          <motion.div 
            className="relative lg:w-2/3 h-[700px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Product render image */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <Image
                src="/render.png"
                alt="Cleo AR Glasses"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Spec points only - no overlay */}
            <div className="relative w-full h-full">
              {specPoints.map((point) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: activeSpec === point.id ? 1 : 0,
                    scale: activeSpec === point.id ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute"
                  style={{ left: point.x, top: point.y }}
                >
                  <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      activeSpec === point.id 
                        ? 'bg-sky-600 scale-110' 
                        : 'bg-white dark:bg-neutral-800 hover:bg-sky-500 hover:text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent bubbling to parent elements
                      setActiveSpec(point.id === activeSpec ? null : point.id);
                    }}
                  >
                    <span className={`text-xs font-medium ${activeSpec === point.id ? 'text-white' : 'text-sky-600 dark:text-sky-400'}`}>{point.id.charAt(0).toUpperCase()}</span>
                  </button>
                  
                  {/* Connector line - conditionally point up for certain points */}
                  <div className={`absolute w-[2px] h-20 bg-sky-500/70 ${
                    // Make connector line point up for battery and processor
                    point.id === 'C' || point.id === 'D' 
                      ? '-top-20' // Position above the button
                      : 'top-8'  // Default position below the button
                  }`}></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Specifications detail */}
          <motion.div 
            className="lg:w-1/3 w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-neutral-600 dark:text-neutral-400">Key Components</h3>
              
              <div className="space-y-6">
                {specPoints.map((point) => (
                  <motion.div 
                    key={point.id}
                    className={`p-5 rounded-xl transition-all duration-300 cursor-pointer ${
                      activeSpec === point.id 
                        ? 'bg-neutral-100 dark:bg-neutral-800 shadow-sm border-l-4 border-sky-500' 
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                    initial={{ opacity: 0.7 }}
                    animate={{ 
                      opacity: 1,
                      scale: activeSpec === point.id ? 1.02 : 1
                    }}
                    onClick={() => setActiveSpec(point.id === activeSpec ? null : point.id)}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        activeSpec === point.id 
                          ? 'bg-sky-600' 
                          : 'bg-neutral-300 dark:bg-neutral-700'
                      }`}></div>
                      <h4 className="text-lg font-medium text-neutral-900 dark:text-white">{point.title}</h4>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 pl-7 font-light">{point.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
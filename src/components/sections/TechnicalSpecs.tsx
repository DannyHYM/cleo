"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    id: "display",
    title: "4K Micro-OLED Display",
    description: "Ultra-high resolution with 120Hz refresh rate for smooth visuals and text rendering.",
    x: "35%",
    y: "30%",
    delay: 0.1,
  },
  {
    id: "battery",
    title: "Li-Ion Battery",
    description: "Custom-designed 1200mAh battery with fast charging capability via USB-C.",
    x: "75%",
    y: "65%",
    delay: 0.2,
  },
  {
    id: "sensors",
    title: "Sensor Array",
    description: "Includes depth sensor, 6-axis motion tracking, and ambient light sensors.",
    x: "62%",
    y: "25%",
    delay: 0.3,
  },
  {
    id: "frame",
    title: "Titanium Frame",
    description: "Lightweight yet durable titanium alloy provides all-day comfort.",
    x: "20%",
    y: "55%",
    delay: 0.4,
  },
  {
    id: "processor",
    title: "Neural Processor",
    description: "Custom 5nm SoC with dedicated AI cores for real-time processing.",
    x: "80%",
    y: "42%",
    delay: 0.5,
  },
];

const TechnicalSpecs = () => {
  const [activeSpec, setActiveSpec] = useState<string | null>(null);

  return (
    <section id="specs" className="py-28 px-4 md:px-6 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwaDYwVjBoLTYweiIvPjxwYXRoIGQ9Ik0zMCA2MFYwIi8+PHBhdGggZD0iTTYwIDMwSDAiLz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
          >
            Technical Specifications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light"
          >
            Built with precision for uncompromising performance
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Technical diagram */}
          <motion.div 
            className="relative lg:w-1/2 h-[500px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Main product illustration */}
            <div className="relative w-full max-w-md h-80 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
              {/* Blueprint grid */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
              
              {/* Glass representation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[120px] rounded-[100px] border-2 border-neutral-300 dark:border-neutral-700"></div>
              
              {/* Left arm */}
              <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 w-[40px] h-[8px] bg-neutral-300 dark:bg-neutral-700 rounded-l-full"></div>
              
              {/* Right arm */}
              <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 w-[40px] h-[8px] bg-neutral-300 dark:bg-neutral-700 rounded-r-full"></div>
              
              {/* Left lens */}
              <div className="absolute top-1/2 left-[35%] transform -translate-y-1/2 w-[60px] h-[60px] rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800/50"></div>
              
              {/* Right lens */}
              <div className="absolute top-1/2 right-[35%] transform -translate-y-1/2 w-[60px] h-[60px] rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800/50"></div>
              
              {/* Bridge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px] h-[8px] bg-neutral-300 dark:bg-neutral-700"></div>
              
              {/* Detail element */}
              <div className="absolute top-[35%] right-[30%] w-[16px] h-[16px] rounded-full border border-orange-600/50 flex items-center justify-center">
                <div className="w-[8px] h-[8px] rounded-full bg-orange-600/30"></div>
              </div>
              
              {/* Spec points */}
              {specPoints.map((point) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: point.delay }}
                  className="absolute"
                  style={{ left: point.x, top: point.y }}
                >
                  <button
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeSpec === point.id 
                        ? 'bg-orange-600 scale-110' 
                        : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-orange-600/70'
                    }`}
                    onClick={() => setActiveSpec(point.id === activeSpec ? null : point.id)}
                  >
                    <span className="text-white text-xs font-medium">{point.id.charAt(0)}</span>
                  </button>
                  
                  {/* Connector line */}
                  <div className={`absolute w-px h-16 bg-orange-600/50 transition-opacity duration-300 ${
                    activeSpec === point.id ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Specifications detail */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8">
              <h3 className="text-2xl font-semibold mb-6">Key Components</h3>
              
              <div className="space-y-6">
                {specPoints.map((point) => (
                  <motion.div 
                    key={point.id}
                    className={`p-5 rounded-xl transition-all duration-300 ${
                      activeSpec === point.id 
                        ? 'bg-neutral-100 dark:bg-neutral-800 shadow-sm' 
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
                          ? 'bg-orange-600' 
                          : 'bg-neutral-300 dark:bg-neutral-700'
                      }`}></div>
                      <h4 className="text-lg font-medium">{point.title}</h4>
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
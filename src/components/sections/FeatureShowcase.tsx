"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Feature = {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  delay: number;
};

const features: Feature[] = [
  {
    id: "ar-display",
    title: "Ultra-Clear Display",
    description: "4K resolution micro-OLED displays with 120Hz refresh rate provide crystal clear augmented visuals with zero perceptible latency.",
    iconPath: "M12 7a.75.75 0 01-.75.75h-1.5a.75.75 0 110-1.5h1.5A.75.75 0 0112 7zM12 10a.75.75 0 01-.75.75h-7.5a.75.75 0 010-1.5h7.5A.75.75 0 0112 10zM12 13a.75.75 0 01-.75.75h-7.5a.75.75 0 010-1.5h7.5A.75.75 0 0112 13zM12 16a.75.75 0 01-.75.75h-7.5a.75.75 0 010-1.5h7.5A.75.75 0 0112 16zM16.5 6.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5zM16.5 13.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5z",
    delay: 0.1,
  },
  {
    id: "sensors",
    title: "Advanced Sensors",
    description: "6-axis motion tracking, depth sensors, and environment mapping create a seamless blend between digital and physical worlds.",
    iconPath: "M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v1A1.5 1.5 0 0118.5 8h-13A1.5 1.5 0 014 6.5v-1zM4 13.5A1.5 1.5 0 015.5 12h13a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 14.5v-1z",
    delay: 0.2,
  },
  {
    id: "battery",
    title: "All-Day Battery",
    description: "Advanced power management and custom silicon deliver 8+ hours of continuous use on a single charge.",
    iconPath: "M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15zM4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75H4.5z",
    delay: 0.3,
  },
  {
    id: "design",
    title: "Premium Design",
    description: "Precision-milled aluminum frame with adjustable titanium temples provides exceptional comfort for all-day wear.",
    iconPath: "M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z",
    delay: 0.4,
  },
  {
    id: "audio",
    title: "Spatial Audio",
    description: "Directional speakers and beamforming microphones create an immersive audio experience without isolating you from your surroundings.",
    iconPath: "M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z",
    delay: 0.5,
  },
  {
    id: "ai",
    title: "AI Companion",
    description: "Advanced neural processing unit provides intelligent contextual awareness and predictive assistance for your daily activities.",
    iconPath: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    delay: 0.6,
  },
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <section className="py-28 px-4 md:px-6 bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute h-px w-full top-0 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
        <div className="absolute h-px w-full bottom-0 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
        <div className="absolute w-px h-full left-1/4 bg-gradient-to-b from-transparent via-neutral-300/30 dark:via-neutral-800/30 to-transparent"></div>
        <div className="absolute w-px h-full right-1/4 bg-gradient-to-b from-transparent via-neutral-300/30 dark:via-neutral-800/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
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
            Advanced Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light"
          >
            Precision engineering meets cutting-edge technology
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="relative"
            >
              <div 
                className={`bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 h-full ${
                  activeFeature === feature.id ? 'scale-[1.02] shadow-lg' : 'hover:scale-[1.01] hover:shadow-md'
                }`}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <svg 
                      className="w-6 h-6 text-orange-600"
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      width="24" 
                      height="24"
                    >
                      <path d={feature.iconPath} />
                    </svg>
                  </div>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeFeature === feature.id ? 'bg-orange-600 rotate-180' : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  >
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 14 14" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-all duration-300 ${
                        activeFeature === feature.id ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      <path 
                        d="M7 3V11M3 7H11" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  activeFeature === feature.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase; 
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Feature = {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  delay: number;
};

const features: Feature[] = [
  {
    id: "feature-1",
    title: "Spatial Computing",
    description: "Interact with digital content naturally in your physical space with advanced object recognition and placement.",
    iconPath: "M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64",
    delay: 0.1,
  },
  {
    id: "feature-2",
    title: "Retina Display",
    description: "Experience stunning 4K resolution with 120Hz refresh rate and HDR support for crystal-clear visuals.",
    iconPath: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    delay: 0.2,
  },
  {
    id: "feature-3",
    title: "Contextual Awareness",
    description: "Our AI recognizes your environment and provides relevant information exactly when you need it.",
    iconPath: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    delay: 0.3,
  },
  {
    id: "feature-4",
    title: "Voice Control",
    description: "Control your experience with natural voice commands using our advanced speech recognition system.",
    iconPath: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
    delay: 0.4,
  },
  {
    id: "feature-5",
    title: "Adaptive Brightness",
    description: "Automatic brightness adjustment ensures optimal visibility in any lighting condition, day or night.",
    iconPath: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    delay: 0.5,
  },
  {
    id: "feature-6",
    title: "All-Day Battery",
    description: "Enjoy up to 8 hours of active use with our advanced power management and fast charging capability.",
    iconPath: "M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z",
    delay: 0.6,
  },
];

const FeatureShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  return (
    <section id="features" className="py-28 px-4 md:px-6 bg-white dark:bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-br from-sky-100/30 dark:from-sky-900/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-tr from-sky-100/30 dark:from-sky-900/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)]"></div>
      </div>
      
      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y }}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
          >
            Cutting-Edge Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light"
          >
            Your Personal AI Trainer. No Phones, No Interruptions, Just Results.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-800 hover:border-sky-200 dark:hover:border-sky-800 transition-colors shadow-sm group"
            >
              <div className="mb-5 relative">
                <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-200 dark:group-hover:bg-sky-900 transition-colors">
                  <svg 
                    className="w-6 h-6"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d={feature.iconPath} />
                  </svg>
                </div>
                
                {/* Line connector */}
                <div className="absolute w-8 h-px bg-neutral-200 dark:bg-neutral-700 right-0 top-1/2 transform translate-x-full group-hover:bg-sky-300 dark:group-hover:bg-sky-700 transition-colors hidden lg:block"></div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase; 
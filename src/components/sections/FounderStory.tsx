"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    id: "event-1",
    year: "2018",
    title: "The Initial Concept",
    description: "As an industrial designer, I became frustrated with the disconnect between digital and physical spaces. The initial sketches for Vision AR were born from a need to bridge this gap.",
  },
  {
    id: "event-2",
    year: "2020",
    title: "Research & Development",
    description: "After assembling a small team of engineers and designers, we spent two years refining our approach to spatial computing and overcoming the challenges of miniaturization.",
  },
  {
    id: "event-3",
    year: "2022",
    title: "First Prototype",
    description: "Our breakthrough moment came with the first working prototype - lightweight, comfortable, and with a display that finally delivered on the promise of seamless AR.",
  },
  {
    id: "event-4",
    year: "2023",
    title: "Vision Takes Shape",
    description: "We refined the user experience and built our first software ecosystem, focusing on the core experiences that would define what makes Vision AR special.",
  },
  {
    id: "event-5",
    year: "2024",
    title: "Preparing for Launch",
    description: "With production partnerships secured and our design finalized, we're preparing to bring Vision AR to the world, starting with a limited release to our early supporters.",
  },
];

const FounderStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  return (
    <section id="founder-story" className="py-28 px-4 md:px-6 bg-white dark:bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-600/5 rounded-full blur-3xl"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left side: Founder image and quote */}
          <motion.div
            style={{
              opacity,
              scale,
            }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden relative">
                {/* Placeholder for founder image */}
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Founder name */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-2xl font-medium mb-1">Alex Morgan</h3>
                  <p className="text-white/80 text-sm">Founder & CEO</p>
                </div>
              </div>
              
              {/* Quote */}
              <div className="absolute -bottom-12 -right-12 max-w-xs bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg z-20">
                <p className="text-neutral-600 dark:text-neutral-300 text-sm italic">
                  "We're not just building another tech gadget. We're creating a new way to see and interact with the world around us."
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full z-0"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 border border-orange-200 dark:border-orange-800 rounded-full z-0"></div>
          </motion.div>
          
          {/* Right side: Timeline */}
          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              Our Journey
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 font-light"
            >
              From concept to reality: how Vision AR came to be
            </motion.p>
            
            {/* Timeline */}
            <div className="relative pl-8 border-l border-neutral-200 dark:border-neutral-800">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="mb-12 last:mb-0 relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-white dark:bg-black border-4 border-orange-500 z-10"></div>
                  
                  {/* Year badge */}
                  <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium mb-3">
                    {event.year}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory; 
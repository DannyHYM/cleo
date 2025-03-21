"use client";

import { motion } from "framer-motion";

type UseCase = {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  benefits: string[];
  imagePosition: "left" | "right";
  bgColor: string;
  delay: number;
};

const useCases: UseCase[] = [
  {
    id: "productivity",
    title: "Enhanced Productivity",
    description: "Transform how you work with contextual information and hands-free computing.",
    iconPath: "M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z",
    benefits: [
      "Access real-time data while keeping your hands free",
      "Smart notifications filter only what matters now",
      "Contextual information based on what you're working on"
    ],
    imagePosition: "right",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    delay: 0.1,
  },
  {
    id: "navigation",
    title: "Intuitive Navigation",
    description: "Navigate unfamiliar environments with confidence using AR guidance overlays.",
    iconPath: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
    benefits: [
      "Turn-by-turn directions in your field of view",
      "Points of interest highlighted as you explore",
      "Offline maps for remote areas"
    ],
    imagePosition: "left",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    delay: 0.2,
  },
  {
    id: "communication",
    title: "Seamless Communication",
    description: "Stay connected without distractions through natural interaction with digital content.",
    iconPath: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    benefits: [
      "Spatial audio for natural conversation flow",
      "Real-time translation overlays for 12+ languages",
      "Facial recognition to never forget a name"
    ],
    imagePosition: "right",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    delay: 0.3,
  },
];

const UseCaseCard = ({ useCase }: { useCase: UseCase }) => {
  const isLeftImage = useCase.imagePosition === "left";
  
  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden mb-16 ${useCase.bgColor}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: useCase.delay }}
    >
      <div className={`flex flex-col ${isLeftImage ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
        {/* Image/illustration area */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <div className="h-[300px] rounded-xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Circular gradient */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-orange-500/20 to-transparent"></div>
              
              {/* Simple illustration */}
              <div className="relative">
                <svg 
                  className="w-20 h-20 text-orange-600/70"
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d={useCase.iconPath} />
                </svg>
              </div>
            </div>
            
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 font-light">{useCase.description}</p>
            
            <ul className="space-y-4">
              {useCase.benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: isLeftImage ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const UseCases = () => {
  return (
    <section id="use-cases" className="py-28 px-4 md:px-6 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
          >
            Transform Your Daily Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light"
          >
            Discover how Vision AR glasses seamlessly integrate into your life
          </motion.p>
        </motion.div>
        
        <div className="space-y-12">
          {useCases.map(useCase => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases; 
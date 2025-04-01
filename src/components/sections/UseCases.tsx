"use client";

import { motion } from "framer-motion";

type Benefit = {
  text: string;
  delay: number;
};

type UseCase = {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  benefits: Benefit[];
  imagePosition: "left" | "right";
  bgColor: string;
  delay: number;
  titleColor?: string;
};

const useCases: UseCase[] = [
  {
    id: "productivity",
    title: "Enhanced Productivity",
    description: "Transform how you work with hands-free computing and contextual information.",
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    benefits: [
      { text: "Hands-free task management", delay: 0.1 },
      { text: "Contextual information display", delay: 0.2 },
      { text: "Real-time collaboration tools", delay: 0.3 },
    ],
    imagePosition: "right",
    bgColor: "bg-sky-50 dark:bg-sky-950/20",
    delay: 0.1,
    titleColor: "text-gray-600 dark:text-gray-400",
  },
  {
    id: "navigation",
    title: "Intuitive Navigation",
    description: "Never get lost again with AR guidance overlays for indoor and outdoor navigation.",
    iconPath: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    benefits: [
      { text: "Turn-by-turn AR directions", delay: 0.1 },
      { text: "Location-based information", delay: 0.2 },
      { text: "Indoor mapping and guidance", delay: 0.3 },
    ],
    imagePosition: "left",
    bgColor: "bg-sky-400/20 dark:bg-sky900/10",
    delay: 0.3,
  },
  {
    id: "communication",
    title: "Seamless Communication",
    description: "Interact naturally with digital content and stay connected with immersive presence.",
    iconPath: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
    benefits: [
      { text: "Holographic video calling", delay: 0.1 },
      { text: "Shared AR experiences", delay: 0.2 },
      { text: "Visual message annotations", delay: 0.3 },
    ],
    imagePosition: "right",
    bgColor: "bg-sky-50 dark:bg-sky-950/20",
    delay: 0.5,
    titleColor: "text-gray-600 dark:text-gray-400",
  },
];

const UseCaseCard = ({ useCase }: { useCase: UseCase }) => {
  const isRightImage = useCase.imagePosition === "right";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: useCase.delay }}
      className={`flex flex-col ${isRightImage ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 p-6 md:p-8 rounded-2xl ${useCase.bgColor} mb-12 md:mb-20`}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center mr-4">
            <svg className="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={useCase.iconPath} />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold ${useCase.titleColor || ''}`}>{useCase.title}</h3>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">{useCase.description}</p>
        
        <ul className="space-y-3">
          {useCase.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: useCase.delay + benefit.delay }}
              className="flex items-start"
            >
              <svg className="w-5 h-5 text-sky-600 dark:text-sky-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-neutral-700 dark:text-neutral-300">{benefit.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      {/* Image */}
      <div className="flex-1">
        <div className="aspect-video rounded-xl bg-gradient-to-br from-sky-400/10 to-sky-600/20 p-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_70%)]"></div>
          
          {/* Simplified mockup of an AR interface */}
          <div className="w-full max-w-md relative">
            {/* AR interface frame */}
            <div className="absolute inset-0 border-2 border-sky-500/20 rounded-xl"></div>
            
            {/* UI Elements */}
            <div className="h-full flex flex-col">
              {/* Top bar */}
              <div className="h-10 border-b border-sky-500/20 flex items-center px-4">
                <div className="w-3 h-3 rounded-full bg-sky-500/30 mr-2"></div>
                <div className="w-20 h-2 bg-sky-500/20 rounded-full"></div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-8 h-2 bg-sky-500/20 rounded-full"></div>
                  <div className="w-2 h-2 rounded-full bg-sky-500/40"></div>
                </div>
              </div>
              
              {/* Content area */}
              <div className="flex-1 p-4 flex">
                {useCase.id === "productivity" && (
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div className="h-20 bg-sky-500/10 rounded-lg p-2">
                      <div className="w-12 h-2 bg-sky-500/30 rounded-full mb-2"></div>
                      <div className="w-full h-10 bg-sky-500/20 rounded-lg"></div>
                    </div>
                    <div className="h-20 bg-sky-500/5 rounded-lg p-2">
                      <div className="w-8 h-2 bg-sky-500/30 rounded-full mb-2"></div>
                      <div className="w-full h-10 bg-sky-500/10 rounded-lg"></div>
                    </div>
                    <div className="h-20 bg-sky-500/5 rounded-lg p-2">
                      <div className="w-10 h-2 bg-sky-500/30 rounded-full mb-2"></div>
                      <div className="w-full h-10 bg-sky-500/10 rounded-lg"></div>
                    </div>
                    <div className="h-20 bg-sky-500/10 rounded-lg p-2">
                      <div className="w-14 h-2 bg-sky-500/30 rounded-full mb-2"></div>
                      <div className="w-full h-10 bg-sky-500/20 rounded-lg"></div>
                    </div>
                  </div>
                )}
                
                {useCase.id === "navigation" && (
                  <div className="w-full relative">
                    <div className="absolute inset-0 bg-sky-500/5 rounded-lg"></div>
                    <div className="absolute left-1/2 top-1/4 w-4 h-4 bg-sky-500/40 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute right-1/4 bottom-1/3 w-3 h-3 bg-sky-500/30 rounded-full"></div>
                    <div className="absolute left-1/4 bottom-1/4 w-3 h-3 bg-sky-500/20 rounded-full"></div>
                    <div className="absolute left-1/3 top-1/2 w-16 h-2 bg-sky-500/40 rounded-full"></div>
                    <div className="absolute right-1/4 top-1/3 w-12 h-2 bg-sky-500/30 rounded-full"></div>
                  </div>
                )}
                
                {useCase.id === "communication" && (
                  <div className="w-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-sky-500/10 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-sky-500/30 flex items-center justify-center">
                          <svg className="w-8 h-8 text-sky-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Bottom bar */}
              <div className="h-10 border-t border-sky-500/20 flex items-center justify-center space-x-4 px-4">
                <div className="w-4 h-4 rounded-full bg-sky-500/30"></div>
                <div className="w-12 h-2 bg-sky-500/20 rounded-full"></div>
                <div className="w-4 h-4 rounded-full bg-sky-500/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UseCases = () => {
  return (
    <section id="use-cases" className="py-24 px-4 md:px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800A_1px,transparent_1px),linear-gradient(to_bottom,#8080800A_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases & Benefits</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover how Cleo glasses seamlessly integrate into your daily life, enhancing how you work, navigate, and communicate.
          </p>
        </motion.div>
        
        <div>
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases; 
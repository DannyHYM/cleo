"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  avatarSeed: string;
};

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Alex Chen",
    title: "Product Designer",
    company: "Designify",
    quote: "The Cleo glasses have completely transformed my workflow. I can visualize 3D models in real space while collaborating with my team remotely. The display quality is unmatched.",
    avatarSeed: "alex-chen",
  },
  {
    id: "testimonial-2",
    name: "Sarah Johnson",
    title: "Software Engineer",
    company: "TechVision",
    quote: "As a developer, having documentation and code references in my field of view while keeping my hands on the keyboard has boosted my productivity by at least 30%.",
    avatarSeed: "sarah-johnson",
  },
  {
    id: "testimonial-3",
    name: "Michael Keita",
    title: "Urban Architect",
    company: "MetroSpaces",
    quote: "Being able to overlay design concepts onto physical spaces in real-time has changed how we present to clients. The battery life is impressive - lasts through my entire workday.",
    avatarSeed: "michael-keita",
  },
  {
    id: "testimonial-4",
    name: "Elena Rodriguez",
    title: "Medical Researcher",
    company: "HealthInnovate",
    quote: "The precision of the spatial mapping and the clarity of visuals make these glasses perfect for medical visualization. My research team uses them daily for collaborative analysis.",
    avatarSeed: "elena-rodriguez",
  },
  {
    id: "testimonial-5",
    name: "David Park",
    title: "Creative Director",
    company: "Envision Studios",
    quote: "The form factor is what sold me. They're lightweight, comfortable for all-day wear, and don't scream 'tech' - I can wear them to client meetings without distraction.",
    avatarSeed: "david-park",
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial, index: number }) => {
  return (
    <motion.div 
      className="min-w-[350px] md:min-w-[400px] bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="flex items-start mb-6">
        <div className="relative">
          {/* Avatar circle */}
          <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            {/* Placeholder avatar using the seed for consistent generation */}
            <img 
              src={`https://api.dicebear.com/7.x/personas/svg?seed=${testimonial.avatarSeed}`} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-600 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
        
        <div className="ml-4">
          <h4 className="font-medium text-lg">{testimonial.name}</h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.title}, {testimonial.company}</p>
        </div>
      </div>
      
      <div className="relative mb-4">
        <div className="absolute -top-5 -left-1 text-5xl text-sky-600/20">"</div>
        <p className="text-neutral-600 dark:text-neutral-300 relative z-10 font-light">
          {testimonial.quote}
        </p>
        <div className="absolute -bottom-10 -right-1 text-5xl text-sky-600/20">"</div>
      </div>
      
      <div className="mt-auto pt-6 flex">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  // Handle horizontal scroll on mouse wheel
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && e.deltaY !== 0) {
        e.preventDefault();
        element.scrollLeft += e.deltaY;
      }
    };
    
    element.addEventListener('wheel', onWheel, { passive: false });
    
    return () => {
      element.removeEventListener('wheel', onWheel);
    };
  }, []);
  
  return (
    <section id="testimonials" className="py-28 px-4 md:px-6 bg-neutral-50 dark:bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
      <div className="absolute top-20 left-10 w-48 h-48 bg-sky-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-sky-600/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
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
            What Our Users Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light"
          >
            Early adopters share their experiences with Cleo
          </motion.p>
        </motion.div>
        
        {/* Quote mark */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-900/20 flex items-center justify-center text-sky-600">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
          </div>
        </div>
        
        {/* Cards container with horizontal scroll */}
        <div className="relative overflow-hidden">
          {/* Scroll shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-50 dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-50 dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            ref={containerRef}
            style={{ x }}
            className="flex space-x-6 pb-8 overflow-x-auto scrollbar-hide"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
            <span>Scroll to see more</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 
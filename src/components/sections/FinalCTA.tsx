"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/sections/WaitlistForm";

const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      
      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="waitlist" className="py-24 px-4 md:px-6 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950/20 dark:to-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-sky-300 dark:via-sky-700 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-sky-300 dark:via-sky-700 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-sky-400/10 to-sky-200/10 dark:from-sky-400/5 dark:to-sky-600/5 blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-sky-400/10 to-sky-200/10 dark:from-sky-400/5 dark:to-sky-600/5 blur-3xl"
        ></motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Limited Availability
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Be Among the First to <br className="hidden md:inline" />
              <span className="relative inline-block">
                <span className="relative z-10">Experience the Future</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-sky-200/50 dark:bg-sky-700/20 -z-10 transform -rotate-1"></span>
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Join our exclusive waitlist for early access to Cleo glasses and be part of shaping the future of everyday computing.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <WaitlistForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <div className="flex items-center text-neutral-500 dark:text-neutral-400">
              <svg className="w-5 h-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              <span className="text-sm">Limited first batch</span>
            </div>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400">
              <svg className="w-5 h-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Shipping Q4 2024</span>
            </div>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400">
              <svg className="w-5 h-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Early adopter benefits</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA; 
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    <section id="final-cta" className="py-32 px-4 md:px-6 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
      
      {/* Animated background shapes */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* Urgency indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Limited First Batch — Launching Soon
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Be Among the First to <br className="hidden md:block" />
            <span className="text-orange-600 dark:text-orange-500">Experience Vision AR</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 font-light"
          >
            Join our exclusive waitlist today. Early supporters will receive priority access
            and special pricing when we launch.
          </motion.p>
          
          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-4 mb-10"
          >
            <div className="flex flex-col items-center">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 min-w-[80px]">
                <span className="text-3xl font-bold">37</span>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 min-w-[80px]">
                <span className="text-3xl font-bold">12</span>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 min-w-[80px]">
                <span className="text-3xl font-bold">45</span>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Minutes</span>
            </div>
          </motion.div>
          
          {/* Signup form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting || isSubmitted}
                  className="flex-grow px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`px-6 py-3 font-medium text-white rounded-lg ${
                    isSubmitted
                      ? "bg-green-600"
                      : "bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
                  } transition-colors duration-200 ease-in-out flex items-center justify-center min-w-[120px]`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isSubmitted ? (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Joined
                    </span>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {isSubmitted && (
                <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                  Thank you! You've been added to our waitlist.
                </p>
              )}
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                By joining, you agree to our Terms of Service and Privacy Policy. We'll keep you updated on our progress.
              </p>
            </form>
          </motion.div>
        </div>
        
        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            JOINING THE COMMUNITY OF
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-neutral-400 dark:text-neutral-600 text-lg font-light">5,000+ early adopters</div>
            <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="text-neutral-400 dark:text-neutral-600 text-lg font-light">200+ developers</div>
            <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="text-neutral-400 dark:text-neutral-600 text-lg font-light">12 partner companies</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA; 
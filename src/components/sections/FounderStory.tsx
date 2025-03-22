"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FounderStory = () => {
  return (
    <section id="founder-story" className="py-24 px-4 md:px-6 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -right-40 top-1/4 w-96 h-96 rounded-full bg-sky-200/30 dark:bg-sky-900/20 blur-3xl"></div>
        <div className="absolute -left-40 bottom-1/3 w-96 h-96 rounded-full bg-sky-200/30 dark:bg-sky-900/20 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Founder image and quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/30 to-transparent mix-blend-overlay z-10"></div>
              <Image
                src="/founder.jpg"
                alt="Founder of Cleo"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-10 -right-10 md:right-auto md:-left-10 bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-xs transform rotate-1 md:rotate-2 border border-neutral-100 dark:border-neutral-800"
            >
              <div className="text-sky-600 dark:text-sky-400 text-4xl font-serif leading-none mb-2">"</div>
              <p className="italic text-neutral-700 dark:text-neutral-300 mb-4">
                We're building technology that enhances human potential rather than replacing it.
              </p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Alex Rivera, Founder & CEO</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Story content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Vision Behind<br />Our Company</h2>
            
            <div className="space-y-6 text-neutral-700 dark:text-neutral-300">
              <p>
                What began as a research project at Stanford in 2018 has evolved into a mission to redefine how humans interact with digital information. Our founder, Alex Rivera, experienced firsthand the limitations of existing interfaces when working on complex engineering projects.
              </p>
              <p>
                "Information should adapt to our lives, not the other way around," Alex often says. This philosophy drove our team to develop a more natural and intuitive computing platform that integrates seamlessly with your perception.
              </p>
              <p>
                After three years of R&D and $42M in funding, we're bringing this vision to life with our first consumer product - a revolutionary pair of Cleo glasses that feel as natural as wearing sunglasses, while offering capabilities that seemed like science fiction just a few years ago.
              </p>
            </div>
            
            {/* Timeline */}
            <div className="mt-12 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800"></div>
              
              {/* Timeline items */}
              {[
                { 
                  year: "2018", 
                  title: "Research Project", 
                  description: "Stanford research lab begins exploring AR interfaces",
                  delay: 0.1
                },
                { 
                  year: "2020", 
                  title: "Company Founded", 
                  description: "Cleo is founded with seed funding of $5M",
                  delay: 0.2
                },
                { 
                  year: "2022", 
                  title: "Prototype Developed", 
                  description: "First working prototype achieves 60° FOV",
                  delay: 0.3
                },
                { 
                  year: "2024", 
                  title: "Product Launch", 
                  description: "Cleo glasses ready for consumer market",
                  delay: 0.4
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                  className="ml-8 mb-8 relative"
                >
                  <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-sky-500 border-2 border-white dark:border-black"></div>
                  <span className="inline-block bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium px-3 py-1 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory; 
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const RenderShowcase = () => {
  return (
    <section className="relative h-[120vh] md:h-[140vh] lg:h-[160vh] w-full overflow-hidden bg-[#f5f2eb] dark:bg-[#0a0a0a]">
      {/* Full-screen background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/POV/cleo_app_mockup.png"
          alt="Cleo App Mockup"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
      </div>
      
      {/* Title Text */}
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute top-24 md:top-30 left-8 md:left-16 lg:left-24 text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            View Your Progress
            <br />
            Everytime
          </h2>
        </motion.div>
      </div>
      
      {/* Optional overlay and content */}
      {/* <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center px-4 md:px-6 max-w-xl backdrop-blur-sm bg-black/20 p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Sleek Design</h2>
          <p className="text-gray-200 text-lg">
            Minimal, lightweight, and designed to blend seamlessly into your daily life
          </p>
        </motion.div>
      </div> */}
    </section>
  );
};

export default RenderShowcase; 
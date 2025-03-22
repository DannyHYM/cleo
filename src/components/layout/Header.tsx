"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(true);
  
  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check if we're over the hero section (dark background) or a light section
      // Adjust this threshold based on your hero section height
      const heroThreshold = window.innerHeight * 0.8;
      setIsOverDarkSection(window.scrollY < heroThreshold);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navLinks = [
    { title: "Features", href: "#features" },
    { title: "Tech Specs", href: "#specs" },
    { title: "Use Cases", href: "#use-cases" },
    { title: "Testimonials", href: "#testimonials" },
    { title: "About", href: "#founder-story" },
  ];
  
  // Define text color classes based on scroll position
  const logoTextColorClass = isOverDarkSection 
    ? "text-white" 
    : "text-neutral-900 dark:text-white";
  
  const navLinkColorClass = isOverDarkSection 
    ? "text-neutral-200 hover:text-sky-400" 
    : "text-neutral-700 dark:text-neutral-300 hover:text-sky-500 dark:hover:text-sky-400";
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white overflow-hidden">
            <span className="absolute font-bold text-sm">C</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-600 to-sky-400 opacity-80"></div>
          </div>
          <span className={`ml-2 text-lg font-bold transition-colors duration-300 ${logoTextColorClass}`}>
            Cleo
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${navLinkColorClass}`}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="#waitlist"
            className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-full text-sm transition-colors"
          >
            Join Waitlist
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden flex items-center transition-colors duration-300 ${isOverDarkSection ? 'text-white' : 'text-neutral-900 dark:text-white'}`}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span 
              className={`absolute left-0 block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                isMobileMenuOpen ? "rotate-45 top-2" : "top-0"
              }`}
            />
            <span 
              className={`absolute left-0 block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100 top-2"
              }`}
            />
            <span 
              className={`absolute left-0 block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45 top-2" : "top-4"
              }`}
            />
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-black border-t border-neutral-100 dark:border-neutral-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.title}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    {link.title}
                  </Link>
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <Link
                  href="#waitlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-full text-sm transition-colors"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 
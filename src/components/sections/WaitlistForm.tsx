"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export const WaitlistForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      // Make an API call to our waitlist endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit to waitlist');
      }
      
      console.log("Waitlist submission successful:", result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError(
        error instanceof Error 
          ? error.message 
          : "There was an error submitting your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div id="waitlist-form" className="w-full">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-neutral-700 dark:text-neutral-200">You're on the list!</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Thank you for joining our waitlist. We'll keep you updated on our launch and early access opportunities.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name 
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500" 
                  : "border-neutral-300 dark:border-neutral-700 focus:ring-sky-500 focus:border-sky-500"
              } bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-colors`}
              disabled={isSubmitting}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email 
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500" 
                  : "border-neutral-300 dark:border-neutral-700 focus:ring-sky-500 focus:border-sky-500"
              } bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-colors`}
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 font-medium text-white rounded-lg bg-sky-600 hover:bg-sky-700 transition-colors duration-200 ease-in-out flex items-center justify-center`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Join Waitlist"
            )}
          </button>
          
          {serverError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{serverError}</p>
          )}
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
            By joining, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      )}
    </div>
  );
}; 
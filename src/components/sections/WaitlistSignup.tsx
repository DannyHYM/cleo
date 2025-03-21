"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const WaitlistSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupCount, setSignupCount] = useState(1283);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Success feedback
    toast.success("You've been added to our waitlist!", {
      description: "We'll notify you when we launch.",
    });
    
    setSignupCount(prev => prev + 1);
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="waitlist" className="py-28 px-4 md:px-6 bg-neutral-50 dark:bg-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-600/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Join the Waitlist</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light">
            Be among the first to experience the future of augmented reality. 
            <span className="block mt-2">Limited production run. Early access program opening soon.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-800 p-8 md:p-10 max-w-xl mx-auto relative"
        >
          {/* Design accent */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-orange-600"></div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm uppercase tracking-wider font-medium text-neutral-500 dark:text-neutral-400">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        {...field} 
                        className="bg-neutral-50 dark:bg-neutral-800 border-transparent focus-visible:border-neutral-300 dark:focus-visible:border-neutral-700 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm uppercase tracking-wider font-medium text-neutral-500 dark:text-neutral-400">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        {...field}
                        className="bg-neutral-50 dark:bg-neutral-800 border-transparent focus-visible:border-neutral-300 dark:focus-visible:border-neutral-700 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full h-14 rounded-full text-base font-medium tracking-wide" 
                disabled={isSubmitting}
              >
                {/* Remove animated glow effect */}
                
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-white/80 animate-pulse"></span>
                    <span>Processing</span>
                  </div>
                ) : "Join Waitlist"}
              </Button>
            </form>
          </Form>

          <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-600"></div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Limited availability
              </p>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              <span className="font-medium text-orange-600">{signupCount.toLocaleString()}</span> reservations
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center flex justify-center"
        >
          <div className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Private beta access for early members
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSignup; 
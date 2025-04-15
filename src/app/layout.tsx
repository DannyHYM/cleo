import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import MetaPixel from "@/components/MetaPixel";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cleo - World's First AR Workout Glasses",
  description: "View your reps, heart rate, and muscle data in real-time. Revolutionizing the next approach to workout.",
  keywords: ["Cleo glasses", "augmented reality", "wearable tech", "smart glasses", "future technology"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <MetaPixel />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}

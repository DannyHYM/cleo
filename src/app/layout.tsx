import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vision AR - Next Generation Augmented Reality Glasses",
  description: "Experience the future today with Vision AR glasses. Join the waitlist for our cutting-edge augmented reality technology designed for everyday use.",
  keywords: ["AR glasses", "augmented reality", "wearable tech", "smart glasses", "future technology"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

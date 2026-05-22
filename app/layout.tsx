import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SANY India — Innovative Construction Equipment",
  description: "Premium cinematic industrial website showcasing SANY India's advanced heavy construction equipment and engineering solutions.",
  authors: [{ name: "SANY India" }],
  keywords: ["SANY", "Construction", "EV Truck", "Excavator", "Heavy Industry", "Engineering"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="bg-[#050505] text-white overflow-x-hidden min-h-full">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

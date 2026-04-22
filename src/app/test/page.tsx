"use client";

import Image from "next/image";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";

export default function TestPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 relative overflow-hidden bg-background">
      {/* Background gradients for aesthetics */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <FadeInSection delay={100} className="text-center space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Asset Integration Test
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Verifying the visual fidelity of the Gemini SVG within the Fast Stack design system.
            </p>
          </header>
          
          <div className="glass-panel p-8 md:p-16 flex items-center justify-center relative group">
            {/* Subtle glow effect behind the asset */}
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
            
            <div className="relative w-64 h-64 md:w-[500px] md:h-[500px] transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/gemini-svg.svg" 
                alt="Gemini SVG" 
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                priority
              />
            </div>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              SVG Rendering Active
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}

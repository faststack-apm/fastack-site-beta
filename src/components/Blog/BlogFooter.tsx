"use client";

import Image from "next/image";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";

export function BlogFooter() {
  return (
    <footer className="mt-20 py-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-8">
        <FadeInSection delay={100}>
          <div className="relative group perspective-1000">
            {/* Glow effect behind the logo - kept but more subtle */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500 opacity-0 group-hover:opacity-100" />
            
            <div className="relative animate-alice-3d overflow-hidden rounded-full w-52 h-52 mx-auto">
              <Image 
                src="/alice-logo.png" 
                alt="Alice Logo" 
                width={208} 
                height={208} 
                className="opacity-90 transition-opacity drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] w-full h-full object-cover scale-110"
              />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
              Powered by Alice
            </p>
            <p className="text-xs text-muted-foreground/60 italic">
              Empowering the next generation of APM
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/40 font-mono">
            <span>© 2026 FAST STACK</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span>ALICE INFRASTRUCTURE</span>
          </div>
        </FadeInSection>
      </div>
      
      {/* Decorative side blurs */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
    </footer>
  );
}

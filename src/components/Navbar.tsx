"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-opacity"
        >
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:scale-110 transition-transform">
            <Rocket className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gradient">Fast Stack</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link 
            href="/about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
          </Link>

          <Link 
            href="/blog" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
          </Link>
          
          <Link 
            href="/#newsletter" 
            className="px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-blue-400 hover:bg-primary/20 transition-all"
          >
            Join Alpha
          </Link>
        </div>
      </div>
    </nav>
  );
}

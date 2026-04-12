"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Settings, Bell, ChevronDown, MessageCircle, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export function Header() {

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-foreground hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Fast Stack Logo" className="w-10 h-10 rounded-lg object-contain" />
          <span className="font-bold text-lg hidden sm:inline">Fast Stack (Onboarding)</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">

          <Link
            href="/learn-more"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Need Help?
          </Link>

        </nav>

        {/* Existing Customers / Login */}
        <div className="flex items-center gap-4">

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="cursor-pointer p-2 text-muted-foreground hover:text-primary transition-colors">
                <Link href="/login">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="z-[100]">
              <p>Existing Customer?</p>
            </TooltipContent>
          </Tooltip>
        </div>


      </div>
    </header>
  );
}

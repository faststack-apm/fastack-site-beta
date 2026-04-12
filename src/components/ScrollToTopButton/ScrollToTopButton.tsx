import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-40",
        "w-12 h-12 rounded-full",
        "bg-white text-background shadow-lg",
        "flex items-center justify-center",
        "hover:bg-gray-100 hover:shadow-xl",
        "transition-all duration-300",
        "hover:scale-110",
        isVisible ? "opacity-100 visible" : "opacity-0 invisible",
        "group",
      )}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
    </button>
  );
};

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopButtonProps {
  threshold?: number;
  className?: string;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  threshold = 300,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
            "bg-gradient-to-br from-elden-darkGold/90 via-elden-gold/80 to-elden-lightGold/90",
            "border-2 border-elden-gold/60 backdrop-blur-sm",
            "shadow-lg shadow-elden-gold/30",
            "hover:shadow-xl hover:shadow-elden-gold/50 hover:border-elden-gold",
            "focus:outline-none focus:ring-2 focus:ring-elden-gold/50",
            "transition-all duration-300",
            "group",
            className
          )}
          initial={{ 
            opacity: 0, 
            scale: 0.8, 
            y: 20,
            rotate: -180
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotate: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            y: 20,
            rotate: 180
          }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { 
              rotate: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-elden-gold/20 blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Inner decorative ring */}
          <div className="absolute inset-1 rounded-full border border-elden-gold/40" />
          
          {/* Main icon container */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ 
                y: [0, -2, 0],
                filter: [
                  "drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))",
                  "drop-shadow(0 0 8px rgba(255, 215, 0, 1))",
                  "drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))"
                ]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowUp 
                className="h-6 w-6 text-black group-hover:text-elden-charcoal transition-colors duration-200" 
                strokeWidth={2.5}
              />
            </motion.div>
          </div>

          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-elden-charcoal/90 text-elden-gold text-xs px-3 py-1 rounded-md border border-elden-gold/30 backdrop-blur-sm">
              <span className="font-elden tracking-wider">Return to Grace</span>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-elden-charcoal/90"></div>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton; 
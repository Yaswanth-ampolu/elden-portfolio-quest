import React from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface EldenRingScrollProgressProps {
  type?: "rune" | "bar";
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  showPercentage?: boolean;
  runeSize?: number;
}

const ScrollIndicator: React.FC<EldenRingScrollProgressProps> = ({
  type = "rune",
  position = "bottom-right",
  showPercentage = true,
  runeSize = 80,
}) => {
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [percentage, setPercentage] = React.useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  if (type === "bar") {
    return (
      <div className="fixed start-0 end-0 top-0 pointer-events-none z-50 h-1">
        <motion.div
          className="h-full bg-gradient-to-r from-elden-darkGold via-elden-gold to-elden-lightGold border-b border-elden-gold/50"
          style={{
            width: `${percentage}%`,
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("fixed flex items-center justify-center z-50 p-4", {
        "top-4 right-4": position === "top-right",
        "bottom-4 right-4": position === "bottom-right",
        "top-4 left-4": position === "top-left",
        "bottom-4 left-4": position === "bottom-left",
      })}
    >
      {percentage > 0 && (
        <motion.div 
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg 
            width={runeSize} 
            height={runeSize} 
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="rgba(0, 0, 0, 0.8)"
              strokeWidth="3"
              className="opacity-70"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="35"
              pathLength="1"
              stroke="#FFD700"
              fill="none"
              strokeDashoffset="0"
              strokeWidth="3"
              style={{ 
                pathLength: scrollYProgress,
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))"
              }}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
            
            {/* Decorative rune elements - outer */}
            <motion.g
              animate={{ rotate: percentage * 3.6 }}
              style={{ transformOrigin: "50px 50px" }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M50 8 L54 18 L46 18 Z"
                fill="#FFD700"
                className="opacity-90"
              />
              <path
                d="M50 92 L54 82 L46 82 Z"
                fill="#FFD700"
                className="opacity-90"
              />
              <path
                d="M8 50 L18 54 L18 46 Z"
                fill="#FFD700"
                className="opacity-90"
              />
              <path
                d="M92 50 L82 54 L82 46 Z"
                fill="#FFD700"
                className="opacity-90"
              />
            </motion.g>
          </svg>
          
          {/* Center flame icon */}
          <motion.div
            className="absolute"
            animate={{ 
              scale: [1, 1.1, 1],
              filter: [
                "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))",
                "drop-shadow(0 0 12px rgba(255, 215, 0, 1))",
                "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame 
              className="text-elden-gold" 
              size={runeSize * 0.25} 
            />
          </motion.div>
          
          {showPercentage && (
            <motion.div 
              className="absolute bottom-[-2rem] text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-xs font-elden text-elden-gold tracking-widest drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]">
                {percentage}%
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ScrollIndicator; 
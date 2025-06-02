import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

interface FloatingContactProps {
  className?: string;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contactLinks: ContactLink[] = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      href: 'mailto:ampoluyaswanth2002@gmail.com',
      color: 'hover:bg-blue-500/20 hover:border-blue-500'
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      href: 'tel:+916305151728',
      color: 'hover:bg-green-500/20 hover:border-green-500'
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      href: 'https://github.com/Yaswanth-ampolu',
      color: 'hover:bg-gray-500/20 hover:border-gray-500'
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/yaswanth-ampolu-a2b110238/',
      color: 'hover:bg-blue-600/20 hover:border-blue-600'
    }
  ];

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={cn("fixed bottom-24 right-6 z-50", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg",
                  "bg-elden-charcoal/90 border border-elden-gold/30",
                  "backdrop-blur-sm shadow-lg",
                  "text-elden-ash hover:text-elden-gold",
                  "transition-all duration-300",
                  "group min-w-[140px]",
                  link.color
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-elden-gold group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <span className="font-elden text-sm tracking-wider">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <motion.button
        onClick={toggleOpen}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full",
          "bg-gradient-to-br from-elden-darkGold via-elden-gold to-elden-lightGold",
          "border-2 border-elden-gold/60 backdrop-blur-sm",
          "shadow-lg shadow-elden-gold/40",
          "hover:shadow-xl hover:shadow-elden-gold/60 hover:border-elden-gold",
          "focus:outline-none focus:ring-2 focus:ring-elden-gold/50",
          "transition-all duration-300 group"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-elden-gold/30 blur-md"
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

        {/* Main icon */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-black" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-6 h-6 text-black" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-elden-charcoal/90 text-elden-gold text-xs px-3 py-1 rounded-md border border-elden-gold/30 backdrop-blur-sm whitespace-nowrap">
            <span className="font-elden tracking-wider">
              {isOpen ? 'Close Menu' : 'Contact Me'}
            </span>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-elden-charcoal/90"></div>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingContact; 
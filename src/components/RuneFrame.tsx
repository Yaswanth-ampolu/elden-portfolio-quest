
import React from 'react';

interface RuneFrameProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const RuneFrame: React.FC<RuneFrameProps> = ({ children, className = '', title }) => {
  return (
    <div className={`relative ${className} shadow-[0_0_15px_rgba(0,0,0,0.8)]`}>
      {/* Main content area with darker background and border */}
      <div className="relative border border-elden-gold/40 bg-black/80 overflow-hidden">
        {/* Top ornamental header if title is provided */}
        {title && (
          <div className="relative py-2 px-4 border-b border-elden-gold/30 bg-gradient-to-r from-elden-darkPurple via-elden-darkGold/10 to-elden-darkPurple">
            <h3 className="font-elden text-elden-gold text-center text-lg tracking-wider">
              {title}
            </h3>
            
            {/* Add ornamental elements on the sides of the title */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 border-t border-l border-elden-gold/60"></div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 border-t border-r border-elden-gold/60"></div>
          </div>
        )}
        
        {/* Enhanced corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-elden-gold/70"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-elden-gold/70"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-elden-gold/70"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-elden-gold/70"></div>
        
        {/* Diagonal corner lines for added Dark Souls flair */}
        <div className="absolute top-0 left-0 w-3 h-3 border-b border-r border-elden-gold/50 transform translate-x-6 translate-y-6"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-b border-l border-elden-gold/50 transform -translate-x-6 translate-y-6"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-t border-r border-elden-gold/50 transform translate-x-6 -translate-y-6"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-t border-l border-elden-gold/50 transform -translate-x-6 -translate-y-6"></div>
        
        {/* Content with inner padding */}
        <div className="p-6">
          {children}
        </div>
      </div>
      
      {/* Enhanced golden glow effect */}
      <div className="absolute inset-0 -z-10 bg-elden-gold/5 blur-md"></div>
    </div>
  );
};

export default RuneFrame;

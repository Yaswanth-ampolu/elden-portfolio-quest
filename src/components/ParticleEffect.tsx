
import React, { useEffect, useRef } from 'react';

const ParticleEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle', 'animate-particle-float');
      
      // Random position at the bottom
      const xPos = Math.random() * container.offsetWidth;
      particle.style.left = `${xPos}px`;
      particle.style.bottom = '10px';
      
      // Random size
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();
      
      container.appendChild(particle);
      
      // Remove particle after animation completes
      setTimeout(() => {
        particle.remove();
      }, 3000);
    };
    
    // Create particles at intervals
    const interval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        createParticle();
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0"></div>;
};

export default ParticleEffect;

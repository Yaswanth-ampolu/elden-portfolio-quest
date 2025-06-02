import React from 'react';
import RuneFrame from './RuneFrame';

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative min-h-screen flex items-center">
      {/* Enhanced Elden Ring style background with better responsiveness */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("data:image/svg+xml,%3Csvg width='1920' height='1080' viewBox='0 0 1920 1080' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='erdtree' cx='50%25' cy='30%25' r='70%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFD700;stop-opacity:0.3'/%3E%3Cstop offset='50%25' style='stop-color:%23B8860B;stop-opacity:0.2'/%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:0.9'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23erdtree)'/%3E%3Cg opacity='0.6'%3E%3Cpath d='M960 100 L980 500 L940 500 Z' fill='%23FFD700' opacity='0.4'/%3E%3Cpath d='M960 500 L1200 800 L720 800 Z' fill='%238B7355' opacity='0.3'/%3E%3C/g%3E%3Cg opacity='0.3'%3E%3Ccircle cx='200' cy='200' r='2' fill='%23FFD700'/%3E%3Ccircle cx='400' cy='150' r='1.5' fill='%23FFD700'/%3E%3Ccircle cx='1500' cy='300' r='2' fill='%23FFD700'/%3E%3Ccircle cx='1700' cy='250' r='1' fill='%23FFD700'/%3E%3Ccircle cx='300' cy='600' r='1.5' fill='%23FFD700'/%3E%3Ccircle cx='1600' cy='700' r='2' fill='%23FFD700'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <RuneFrame>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-elden text-elden-gold mb-6">
            <span className="block">YASWANTH</span>
            <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl">AMPOLU</span>
          </h1>
          
          <p className="text-lg md:text-xl text-elden-ash/90 font-lore my-8 max-w-3xl mx-auto leading-relaxed">
            A seasoned <span className="text-elden-gold">AI Engineer & Full Stack Developer</span> from Bengaluru, India. 
            Wielding the power of Machine Learning, Python, and modern web technologies to forge 
            <span className="text-elden-gold"> intelligent systems</span> and <span className="text-elden-gold">exceptional digital experiences</span>.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8 text-sm text-elden-ash/80">
            <span className="bg-elden-gold/20 px-3 py-1 rounded-full border border-elden-gold/30">Python</span>
            <span className="bg-elden-gold/20 px-3 py-1 rounded-full border border-elden-gold/30">Machine Learning</span>
            <span className="bg-elden-gold/20 px-3 py-1 rounded-full border border-elden-gold/30">React</span>
            <span className="bg-elden-gold/20 px-3 py-1 rounded-full border border-elden-gold/30">TypeScript</span>
            <span className="bg-elden-gold/20 px-3 py-1 rounded-full border border-elden-gold/30">AI/ML</span>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="elden-button"
            >
              View Quests
            </button>
            
            <a 
              href="https://github.com/Yaswanth-ampolu"
              target="_blank"
              rel="noopener noreferrer"
              className="elden-button"
            >
              GitHub Codex
            </a>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="elden-button"
            >
              Summon Me
            </button>
          </div>
        </RuneFrame>
      </div>
    </section>
  );
};

export default Hero;

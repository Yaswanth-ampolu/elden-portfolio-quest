import React, { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navigateToChatbot = () => {
    window.location.href = '/chatbot';
    setIsOpen(false);
  };
  
  return (
    <header className="py-4 relative z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-elden text-elden-gold">
          <span className="tracking-wider">Yaswanth Ampolu</span>
        </h1>
        
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection('about')}
            className="uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
          >
            about
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
          >
            skills
          </button>
          <button
            onClick={navigateToChatbot}
            className="flex items-center gap-1 uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
          >
            <Brain size={16} />
            wisdom keeper
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
          >
            projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
          >
            contact
          </button>
        </div>
        
        <button 
          className="md:hidden text-elden-gold" 
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-elden-darkPurple border-y border-elden-gold/30">
          <div className="flex flex-col py-4">
            <button
              onClick={() => scrollToSection('about')}
              className="py-3 uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
            >
              about
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="py-3 uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
            >
              skills
            </button>
            <button
              onClick={navigateToChatbot}
              className="py-3 flex items-center justify-center gap-2 uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
            >
              <Brain size={16} />
              wisdom keeper
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="py-3 uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
            >
              projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="py-3 uppercase font-elden text-sm tracking-wider text-elden-ash hover:text-elden-gold transition-colors duration-300"
            >
              contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;

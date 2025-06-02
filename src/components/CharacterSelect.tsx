
import React, { useState } from 'react';
import RuneFrame from './RuneFrame';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CharacterClass = {
  id: number;
  name: string;
  image: string;
  description: string;
  strengths: string[];
  attributes: {
    intelligence: number;
    dexterity: number;
    strength: number;
    faith: number;
    arcane: number;
  };
};

const characters: CharacterClass[] = [
  {
    id: 1,
    name: "AI Engineer",
    image: "/assets/characters/ai-engineer.png",
    description: "Versatile alchemist of algorithms and neural networks. Crafts intelligent systems that learn and adapt to solve complex problems.",
    strengths: ["Machine Learning", "Neural Networks", "Data Processing", "Model Training"],
    attributes: {
      intelligence: 15,
      dexterity: 10,
      strength: 8,
      faith: 7,
      arcane: 14
    }
  },
  {
    id: 2,
    name: "Frontend Mage",
    image: "/assets/characters/frontend-mage.png",
    description: "Conjurer of user interfaces. Weaves responsive designs and interactive experiences with precision and elegance.",
    strengths: ["React", "TypeScript", "CSS/Tailwind", "UI/UX Design"],
    attributes: {
      intelligence: 12,
      dexterity: 14,
      strength: 6,
      faith: 8,
      arcane: 10
    }
  },
  {
    id: 3,
    name: "Backend Sentinel",
    image: "/assets/characters/backend-sentinel.png",
    description: "Guardian of data realms and system architecture. Maintains order in the servers and safeguards information flow.",
    strengths: ["Python/Node.js", "Database Management", "API Integration", "Cloud Services"],
    attributes: {
      intelligence: 13,
      dexterity: 9,
      strength: 12,
      faith: 8,
      arcane: 8
    }
  }
];

const CharacterSelect: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number>(0);

  const nextCharacter = () => {
    setSelectedCharacter((prev) => (prev + 1) % characters.length);
  };

  const prevCharacter = () => {
    setSelectedCharacter((prev) => (prev - 1 + characters.length) % characters.length);
  };

  const character = characters[selectedCharacter];

  return (
    <section id="character-select" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 opacity-15 bg-[url('/assets/backgrounds/elden-dark.jpg')] bg-cover bg-center"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="elden-title text-3xl md:text-4xl mb-16">Character Select</h2>
        
        <div className="max-w-4xl mx-auto">
          <RuneFrame title="Select Character Class">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Character Selection Sidebar */}
              <div className="w-full md:w-2/5 flex flex-col bg-black/70 border border-elden-gold/30">
                <div className="relative w-full aspect-[3/4] border-b border-elden-gold/30">
                  <img 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 border-t border-elden-gold/30 py-2">
                    <h3 className="font-elden text-center text-elden-gold">
                      {character.name}
                    </h3>
                  </div>
                </div>
                
                {/* Character Navigation */}
                <div className="p-4 flex justify-between items-center border-t border-elden-gold/30 mt-auto">
                  <button 
                    onClick={prevCharacter}
                    className="text-elden-gold hover:text-elden-lightGold"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex gap-2">
                    {characters.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCharacter(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === selectedCharacter 
                            ? 'bg-elden-gold' 
                            : 'bg-elden-gold/30 hover:bg-elden-gold/50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextCharacter}
                    className="text-elden-gold hover:text-elden-lightGold"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              {/* Character Stats */}
              <div className="w-full md:w-3/5 flex flex-col bg-black/60 border border-elden-gold/30 p-5">
                <h4 className="font-elden text-elden-gold text-lg mb-4 pb-2 border-b border-elden-gold/30">Character Description</h4>
                <p className="font-lore text-elden-ash mb-6">{character.description}</p>
                
                <h4 className="font-elden text-elden-gold text-lg mb-4 pb-2 border-b border-elden-gold/30">Attributes</h4>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {Object.entries(character.attributes).map(([attr, value]) => (
                    <div key={attr} className="flex items-center justify-between">
                      <span className="font-elden text-sm capitalize text-elden-ash">{attr}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-elden-charcoal rounded-sm overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-elden-darkGold to-elden-gold"
                            style={{ width: `${(value / 20) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-elden-gold text-sm w-6 text-right">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-elden text-elden-gold text-lg mb-4 pb-2 border-b border-elden-gold/30">Strengths</h4>
                <div className="grid grid-cols-2 gap-2">
                  {character.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-elden-gold mr-2">•</span>
                      <span className="font-lore text-elden-ash">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bottom Control Hints - Similar to Elden Ring UI */}
            <div className="mt-6 pt-4 border-t border-elden-gold/20 flex justify-center">
              <div className="flex items-center text-xs text-elden-ash/70 mr-4">
                <span className="inline-block w-6 h-6 bg-elden-charcoal border border-elden-gold/30 rounded-full text-center flex items-center justify-center mr-1">◀</span>
                <span className="inline-block w-6 h-6 bg-elden-charcoal border border-elden-gold/30 rounded-full text-center flex items-center justify-center mr-1">▶</span>
                <span>Switch Class</span>
              </div>
              
              <div className="flex items-center text-xs text-elden-ash/70">
                <span className="inline-block w-6 h-6 bg-elden-charcoal border border-elden-gold/30 rounded-full text-center flex items-center justify-center mr-1">X</span>
                <span>Select</span>
              </div>
            </div>
          </RuneFrame>
        </div>
      </div>
    </section>
  );
};

export default CharacterSelect;

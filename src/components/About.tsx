import React from 'react';
import { Star, Shield, Trophy, Code, Database, Cpu, MapPin, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import RuneFrame from './RuneFrame';

const skills = [
  // AI Skills
  { name: 'Machine Learning', level: 90, category: 'ai', icon: <Cpu size={18} className="text-elden-gold" /> },
  { name: 'Data Science', level: 85, category: 'ai', icon: <Cpu size={18} className="text-elden-gold" /> },
  { name: 'Deep Learning', level: 78, category: 'ai', icon: <Cpu size={18} className="text-elden-gold" /> },
  { name: 'Computer Vision', level: 82, category: 'ai', icon: <Cpu size={18} className="text-elden-gold" /> },
  
  // Frontend Skills
  { name: 'React', level: 85, category: 'frontend', icon: <Code size={18} className="text-elden-gold" /> },
  { name: 'TypeScript', level: 80, category: 'frontend', icon: <Code size={18} className="text-elden-gold" /> },
  { name: 'JavaScript', level: 90, category: 'frontend', icon: <Code size={18} className="text-elden-gold" /> },
  { name: 'HTML/CSS', level: 85, category: 'frontend', icon: <Code size={18} className="text-elden-gold" /> },
  
  // Backend Skills
  { name: 'Python', level: 95, category: 'backend', icon: <Database size={18} className="text-elden-gold" /> },
  { name: 'Node.js', level: 75, category: 'backend', icon: <Database size={18} className="text-elden-gold" /> },
  { name: 'Express.js', level: 80, category: 'backend', icon: <Database size={18} className="text-elden-gold" /> },
  { name: 'MongoDB/SQL', level: 82, category: 'backend', icon: <Database size={18} className="text-elden-gold" /> },
];

const About: React.FC = () => {
  return (
    <>
      <section id="about" className="py-16 md:py-24 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/backgrounds/parchment-dark.jpg')] bg-cover bg-center"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="elden-title text-3xl md:text-4xl mb-16">The Chronicles</h2>
          
          <div className="elden-card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Character Portrait */}
              <div className="relative flex-shrink-0 mx-auto md:mx-0">
                <div className="w-40 h-40 md:w-48 md:h-48 border-2 border-elden-gold/40 rounded-full overflow-hidden bg-elden-darkPurple/90 p-1">
                  <Avatar className="w-full h-full border border-elden-gold/20">
                    <AvatarImage src="https://github.com/Yaswanth-ampolu.png" alt="Yaswanth Ampolu" className="object-cover" />
                    <AvatarFallback className="text-elden-gold bg-elden-darkPurple text-xl font-elden">YA</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute inset-0 rounded-full blur-md -z-10 bg-elden-gold/10"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-elden text-2xl text-elden-gold mb-4">Yaswanth Ampolu</h3>
                <p className="text-elden-ash/80 mb-4 font-lore">AI Engineer & Full Stack Developer</p>
                
                <div className="prose prose-sm md:prose-base prose-invert max-w-none text-elden-ash/90">
                  <p>
                    <span className="text-elden-gold text-lg">A skilled artisan of AI and modern web development,</span> with expertise in machine learning, data science, and full-stack development. Specializing in creating intelligent systems and crafting exceptional digital experiences.
                  </p>
                  
                  <p className="mt-4">
                    From Bengaluru, India, I've mastered both cutting-edge AI technologies and modern web development frameworks. I value clean, maintainable code and strive to build systems that combine the power of artificial intelligence with intuitive user experiences.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <MapPin className="text-elden-gold mr-2" size={18} />
                      <span className="text-sm">Bengaluru, India</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="text-elden-gold mr-2" size={18} />
                      <span className="text-sm">ampoluyaswanth2002@gmail.com</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="text-elden-gold mr-2" size={18} />
                      <span className="text-sm">+91 6305151728</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Code className="text-elden-gold mr-2" size={18} />
                      <a 
                        href="https://github.com/Yaswanth-ampolu" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm hover:text-elden-gold transition-colors"
                      >
                        GitHub Portfolio
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col md:flex-row gap-6 justify-between">
                    <div className="flex items-center">
                      <Star className="text-elden-gold mr-2" size={20} />
                      <span>20+ Repositories</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Shield className="text-elden-gold mr-2" size={20} />
                      <span>AI/ML Specialist</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Trophy className="text-elden-gold mr-2" size={20} />
                      <span>Full Stack Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chatbot Introduction */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-elden text-2xl text-elden-gold mb-4">Converse with the Wisdom Keeper</h3>
              <p className="text-elden-ash/80 max-w-2xl mx-auto mb-6">
                Seek knowledge about my skills, experience, and journey through the realms of AI and development. 
                The mystical sage awaits your queries and shall respond in the ancient tongue of the Lands Between.
              </p>
              <button
                onClick={() => window.location.href = '/chatbot'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-elden-darkGold to-elden-gold text-black rounded-lg font-elden hover:shadow-lg hover:shadow-elden-gold/40 transition-all"
              >
                <Star size={20} />
                <span>Enter the Sacred Chamber</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section id="skills" className="py-16 md:py-24 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/backgrounds/parchment-dark.jpg')] bg-cover bg-center"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="elden-title text-3xl md:text-4xl mb-16">Equipment & Attributes</h2>
          
          <RuneFrame title="Skills Inventory">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Skills */}
              <div>
                <h3 className="font-elden text-elden-gold text-center mb-6 border-b border-elden-gold/30 pb-2">AI Armaments</h3>
                <div className="grid grid-cols-1 gap-4">
                  {skills
                    .filter(skill => skill.category === 'ai')
                    .map((skill) => (
                      <div key={skill.name} className="border border-elden-gold/20 bg-black/50 p-3 hover:bg-black/70 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {skill.icon}
                            <span className="font-elden text-sm tracking-wider ml-2">{skill.name}</span>
                          </div>
                          <span className="text-xs text-elden-gold">{skill.level}</span>
                        </div>
                        <div className="h-1.5 bg-elden-charcoal rounded-sm overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-elden-darkGold to-elden-gold transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              {/* Frontend Skills */}
              <div>
                <h3 className="font-elden text-elden-gold text-center mb-6 border-b border-elden-gold/30 pb-2">Frontend Spells</h3>
                <div className="grid grid-cols-1 gap-4">
                  {skills
                    .filter(skill => skill.category === 'frontend')
                    .map((skill) => (
                      <div key={skill.name} className="border border-elden-gold/20 bg-black/50 p-3 hover:bg-black/70 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {skill.icon}
                            <span className="font-elden text-sm tracking-wider ml-2">{skill.name}</span>
                          </div>
                          <span className="text-xs text-elden-gold">{skill.level}</span>
                        </div>
                        <div className="h-1.5 bg-elden-charcoal rounded-sm overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-800 to-purple-500 transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              {/* Backend Skills */}
              <div>
                <h3 className="font-elden text-elden-gold text-center mb-6 border-b border-elden-gold/30 pb-2">Backend Armory</h3>
                <div className="grid grid-cols-1 gap-4">
                  {skills
                    .filter(skill => skill.category === 'backend')
                    .map((skill) => (
                      <div key={skill.name} className="border border-elden-gold/20 bg-black/50 p-3 hover:bg-black/70 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {skill.icon}
                            <span className="font-elden text-sm tracking-wider ml-2">{skill.name}</span>
                          </div>
                          <span className="text-xs text-elden-gold">{skill.level}</span>
                        </div>
                        <div className="h-1.5 bg-elden-charcoal rounded-sm overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-800 to-blue-500 transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            
            {/* Bottom Control Hints - Similar to Elden Ring UI */}
            <div className="mt-10 pt-4 border-t border-elden-gold/20 flex justify-center">
              <div className="flex items-center text-xs text-elden-ash/70 mr-4">
                <span className="inline-block w-5 h-5 bg-elden-charcoal border border-elden-gold/30 rounded-full text-center mr-1">R1</span>
                <span>View Details</span>
              </div>
              
              <div className="flex items-center text-xs text-elden-ash/70">
                <span className="inline-block w-5 h-5 bg-elden-charcoal border border-elden-gold/30 rounded-full text-center mr-1">⇧</span>
                <span>Compare Skills</span>
              </div>
            </div>
          </RuneFrame>
        </div>
      </section>
    </>
  );
};

export default About;

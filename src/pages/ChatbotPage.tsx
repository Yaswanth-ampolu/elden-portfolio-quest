import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Brain, Sparkles, Crown, ArrowLeft, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  provider?: string;
}

// Pattern-based responses (same as before)
const ELDEN_RESPONSES = {
  greeting: [
    "Greetings, noble seeker! I am the guardian of Yaswanth's knowledge. What wisdom dost thou seek?",
    "Ah, a visitor approaches! Welcome to the realm of the Code-Bearer. How may this humble sage assist thee?",
    "Hail and well met! Thou standest before the archives of Yaswanth's journey. Speak thy query!"
  ],
  skills: [
    "Ah, thou seekest knowledge of the Code-Bearer's arts! Yaswanth hath mastered Python (95%), Machine Learning (90%), React (85%), and TypeScript (80%). Each skill forged through countless battles with bugs and algorithms!",
    "The mystical powers include AI/ML engineering, full-stack development, and data science. His Python sorcery burns brightest, followed by React enchantments!",
    "Behold his arsenal: Python for AI magic, React for web crafting, Machine Learning for pattern divination, and TypeScript for structured spells!"
  ],
  experience: [
    "Currently, the Code-Bearer serves as AI Application Engineer at SierraEdge Pvt Ltd in Bengaluru since April 2024. A worthy quest indeed!",
    "His journey spans AI engineering at SierraEdge and freelance adventures since 2023. Each role honing his mastery of the mystical arts!",
    "At SierraEdge in Bengaluru, he weaves AI magic daily. Before this, freelance quests taught him the ways of independent coding!"
  ],
  projects: [
    "Witness his legendary works! MotivHater brings productivity with humor, Insurance Claim Prediction uses ML prophecy, and RentalTruth-Scrapper harvests data treasures!",
    "His GitHub realm holds 20+ sacred repositories, including facial emotion recognition and web scraping adventures!",
    "Notable quests include MotivHater for motivation, ML projects for predictions, and various web development conquests!"
  ],
  contact: [
    "To reach the Code-Bearer: ampoluyaswanth2002@gmail.com for scrolls, +91 6305151728 for urgent summons, or seek him on GitHub and LinkedIn!",
    "The mystical communication channels: email for formal discourse, phone for immediate contact, GitHub for code fellowship!",
    "Located in Bengaluru's realm, reachable through modern enchantments: email, phone, or professional networks!"
  ],
  education: [
    "He earned B.Tech in Information Technology from Aditya Institute with CGPA 7.5/10, completing his academic quest in 2024!",
    "His educational journey: B.Tech IT (7.5 CGPA, 2024), plus strong foundations in earlier studies!",
    "Formally trained at Aditya Institute of Technology, specializing in IT with honors in AI and software development!"
  ],
  // New conversational responses
  general: [
    "Ah, an interesting query! While I guard knowledge of Yaswanth's professional journey, I'm always ready for meaningful discourse, noble seeker.",
    "Thou speakest of matters beyond my primary domain, but I sense wisdom in thy words. Perhaps ask about the Code-Bearer's skills or projects?",
    "A thoughtful question indeed! Though my expertise lies in Yaswanth's realm, I welcome conversation. What brings thee to these mystical lands?"
  ],
  default: [
    "Thy words intrigue me, seeker. I am versed in Yaswanth's professional journey - his skills, work, projects, or contact details. What specific knowledge dost thou seek?",
    "An interesting query! Ask me about the Code-Bearer's expertise, experience, projects, or ways to reach him. I live to share this wisdom!",
    "Speak more clearly, noble visitor! I guard knowledge of Yaswanth's AI mastery, development skills, or professional path. What dost thou wish to know?"
  ]
};

// Updated AI Provider configurations with free models
const AI_PROVIDERS = {
  together: {
    name: 'Together AI',
    endpoint: '/api/ai/together', 
    models: ['deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free', 'meta-llama/Llama-Vision-Free'],
    fallbackIndex: 0
  },
  groq: {
    name: 'Groq',
    endpoint: '/api/ai/groq',
    models: ['gemma2-9b-it', 'llama-3.1-8b-instant'],
    fallbackIndex: 1
  },
  openrouter: {
    name: 'OpenRouter',
    endpoint: '/api/ai/openrouter',
    models: ['deepseek/deepseek-r1-0528-qwen3-8b:free', 'google/gemma-3n-e4b-it:free'],
    fallbackIndex: 2
  },
  huggingface: {
    name: 'Hugging Face',
    endpoint: '/api/ai/huggingface',
    models: ['microsoft/DialoGPT-medium'],
    fallbackIndex: 3
  }
};

class EldenChatbotEngine {
  private requestCounts: Record<string, number> = {};
  private dailyLimits: Record<string, number> = {
    together: 500,
    groq: 1000,
    openrouter: 300,
    huggingface: 800
  };

  constructor() {
    this.resetDailyCounters();
  }

  private resetDailyCounters() {
    const lastReset = localStorage.getItem('chatbot-last-reset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      this.requestCounts = { groq: 0, together: 0, openrouter: 0, huggingface: 0 };
      localStorage.setItem('chatbot-counts', JSON.stringify(this.requestCounts));
      localStorage.setItem('chatbot-last-reset', today);
    } else {
      const saved = localStorage.getItem('chatbot-counts');
      this.requestCounts = saved ? JSON.parse(saved) : { groq: 0, together: 0, openrouter: 0, huggingface: 0 };
    }
  }

  private saveRequestCounts() {
    localStorage.setItem('chatbot-counts', JSON.stringify(this.requestCounts));
  }

  private async callAIProvider(provider: string, userInput: string): Promise<{ response: string; provider: string }> {
    if (this.requestCounts[provider] >= this.dailyLimits[provider]) {
      throw new Error(`Daily limit reached for ${provider}`);
    }

    const config = AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS];
    const systemPrompt = this.buildSystemPrompt();
    const model = config.models[0]; // Use first model as default

    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model,
          prompt: userInput,
          systemPrompt: systemPrompt,
          maxTokens: 180,
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error(`${provider} API error`);
      
      const data = await response.json();
      this.requestCounts[provider]++;
      this.saveRequestCounts();
      
      return {
        response: this.styleResponse(data.response || ''),
        provider: provider
      };
    } catch (error) {
      console.log(`${provider} failed:`, error);
      throw error;
    }
  }

  private buildSystemPrompt(): string {
    return `You are an ancient mystical sage in the style of Elden Ring, a wise guardian with vast knowledge.

PERSONALITY: 
- Speak in mystical, medieval fantasy tone
- Use terms like "Tarnished," "seeker," "noble visitor," etc.
- Be conversational and engaging, not just informational
- Allow casual conversation while maintaining character

RESPONSE RULES:
1. Keep responses under 120 words for mobile readability
2. Answer ONLY what the user specifically asks - don't dump all information
3. Stay in character but be helpful and engaging
4. Allow general conversation topics but gently guide toward Yaswanth's professional info when relevant
5. Be more conversational and less robotic

YASWANTH'S PROFESSIONAL INFO (use only when specifically asked):
- Current Role: AI Application Engineer at SierraEdge Pvt Ltd (April 2024-Present) 
- Location: Bengaluru, India
- Skills: Python (95%), Machine Learning (90%), React (85%), TypeScript (80%)
- Education: B.Tech IT from Aditya Institute (CGPA 7.5/10, 2024)
- Contact: ampoluyaswanth2002@gmail.com, +91 6305151728
- GitHub: https://github.com/Yaswanth-ampolu (20+ repositories)
- Key Projects: MotivHater, Insurance Claim Prediction, RentalTruth-Scrapper

IMPORTANT: Answer precisely what is asked. If they ask for phone number, give ONLY phone number with mystical flair. Don't list everything unless they ask for a full overview.

Example:
User: "his contact number?"
Good: "Hearken, seeker! To reach the Code-Bearer Yaswanth, call upon +91 6305151728."
Bad: [Don't list email, location, and everything else]`;
  }

  private styleResponse(response: string): string {
    const eldenPrefixes = [
      "Ah, seeker of wisdom...",
      "By the sacred code...", 
      "Hearken to this truth...",
      "The ancient scrolls reveal...",
      "In the name of the Code-Bearer..."
    ];

    if (!response.toLowerCase().includes('tarnished') && 
        !response.toLowerCase().includes('seeker') &&
        !response.toLowerCase().includes('yaswanth')) {
      const prefix = eldenPrefixes[Math.floor(Math.random() * eldenPrefixes.length)];
      return `${prefix} ${response}`;
    }

    return response;
  }

  public async respond(userInput: string): Promise<{ response: string; provider: string }> {
    const input = userInput.toLowerCase().trim();
    
    // Try AI providers in order: Together -> Groq -> OpenRouter -> HuggingFace
    const providers = ['together', 'groq', 'openrouter', 'huggingface'];
    
    for (const provider of providers) {
      try {
        console.log(`Trying ${provider}...`);
        const result = await this.callAIProvider(provider, userInput);
        if (result.response && result.response.length > 10) {
          console.log(`Success with ${provider}`);
          return result;
        }
      } catch (error) {
        console.log(`${provider} failed, trying next...`);
        continue;
      }
    }

    // Final fallback: Pattern-based responses
    console.log('Using pattern-based fallback');
    return {
      response: this.getPatternBasedResponse(input),
      provider: 'pattern-fallback'
    };
  }

  private getPatternBasedResponse(input: string): string {
    const patterns = {
      greeting: /hello|hi|hey|greetings|welcome|start/i,
      skills: /skill|technology|programming|languages|python|react|ai|ml|machine learning|typescript/i,
      experience: /experience|work|job|career|employment|role|position|sierraedge|company/i,
      projects: /project|repository|github|code|portfolio|motivhater|insurance|rental/i,
      contact: /contact|email|phone|reach|linkedin|github|communication|number/i,
      education: /education|degree|study|college|university|b\.?tech|aditya/i,
      // More specific patterns
      phone: /phone|number|call|mobile|contact.*number/i,
      email: /email|mail|@/i,
      location: /where|location|city|place|bengaluru|bangalore/i,
      general: /how are you|what.*you|who.*you|tell me about yourself|nice|good|thank|cool|awesome/i
    };

    // Check for specific contact requests first
    if (patterns.phone.test(input)) {
      return "Hearken, seeker! To reach the Code-Bearer Yaswanth directly, call upon +91 6305151728.";
    }
    
    if (patterns.email.test(input)) {
      return "The sacred scroll address: ampoluyaswanth2002@gmail.com - send thy digital ravens to this realm!";
    }
    
    if (patterns.location.test(input)) {
      return "The Code-Bearer dwells in the bustling realm of Bengaluru, India, where he weaves AI magic at SierraEdge!";
    }

    // Check other patterns
    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(input)) {
        const responses = ELDEN_RESPONSES[category as keyof typeof ELDEN_RESPONSES];
        if (responses) {
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }

    const defaultResponses = ELDEN_RESPONSES.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatbotEngine = useRef(new EldenChatbotEngine());

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: "Greetings, noble visitor! I am the mystical guardian of Yaswanth's knowledge. Ask me about his skills, experience, projects, or how to reach him. What wisdom dost thou seek?",
        sender: 'ai',
        timestamp: new Date(),
        provider: 'system'
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await chatbotEngine.current.respond(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: result.response,
        sender: 'ai',
        timestamp: new Date(),
        provider: result.provider
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Forgive me, seeker... The mystical channels are disrupted. Please try thy query again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
        provider: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Focus back to input on mobile
      if (window.innerWidth <= 768) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Elden Ring Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/backgrounds/elden-ring-bg.png')`,
        }}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Additional mystical overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-elden-gold/5 via-transparent to-elden-darkPurple/20"></div>
      
      {/* Floating particles - reduced for mobile performance */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-elden-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-15, -30, -15],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header - Mobile optimized */}
      <div className="relative z-10 border-b border-elden-gold/30 backdrop-blur-sm bg-black/40">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={goBack}
                className="flex items-center gap-1 sm:gap-2 text-elden-ash hover:text-elden-gold transition-colors p-2 -ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                <span className="font-elden text-sm hidden sm:block">Return</span>
              </motion.button>
            </div>
            
            {/* Center title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Brain className="text-elden-gold w-6 h-6 sm:w-7 sm:h-7" />
              <div className="text-center">
                <h1 className="font-elden text-lg sm:text-2xl text-elden-gold">Wisdom Keeper</h1>
                <p className="text-xs sm:text-sm text-elden-ash/80 hidden sm:block">Guardian of Sacred Knowledge</p>
              </div>
              <Crown className="text-elden-gold w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            
            {/* Mobile menu toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-1 text-elden-ash/60 text-xs sm:text-sm p-2 -mr-2"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              <Sparkles size={14} className="animate-pulse hidden sm:block" />
            </motion.button>
          </div>
          
          {/* Mobile info panel */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-elden-gold/20"
              >
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="text-center">
                    <div className="text-elden-gold font-elden">Multi-AI Powered</div>
                    <div className="text-elden-ash/70">4 Provider Fallback</div>
                  </div>
                  <div className="text-center">
                    <div className="text-elden-gold font-elden">Mobile Optimized</div>
                    <div className="text-elden-ash/70">Touch Friendly</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Container - Mobile optimized */}
      <div className="relative z-10 flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex",
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-lg border backdrop-blur-sm",
                    message.sender === 'user'
                      ? "bg-gradient-to-br from-elden-gold/20 to-elden-gold/10 text-elden-ash border-elden-gold/40 rounded-br-sm"
                      : "bg-gradient-to-br from-elden-darkPurple/40 to-elden-charcoal/60 text-elden-ash border-elden-gold/30 rounded-bl-sm"
                  )}
                >
                  <div className="font-lore leading-relaxed text-sm sm:text-base mb-2">
                    {message.content}
                  </div>
                  <div className="flex items-center justify-between text-xs text-elden-ash/60">
                    <span className="flex items-center gap-1">
                      {message.sender === 'user' ? 'You' : 'Wisdom Keeper'}
                      {message.provider && message.provider !== 'system' && (
                        <span className="text-elden-gold/60 text-[10px]">
                          • {message.provider}
                        </span>
                      )}
                    </span>
                    <span>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-br from-elden-darkPurple/40 to-elden-charcoal/60 text-elden-ash border border-elden-gold/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm max-w-[85%] sm:max-w-[75%]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-elden-gold rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-elden-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-elden-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-elden-ash/80 font-lore text-sm">Consulting the ancient scrolls...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced AI Input Area - Mobile optimized with no blur or border */}
        <div className="p-3 sm:p-4 bg-black/20">
          <div className="max-w-4xl mx-auto mb-4">
            {/* Main Input Container - Less floating, more grounded */}
            <motion.div
              className="relative rounded-2xl border border-elden-gold/40 bg-gradient-to-br from-black/90 via-elden-darkPurple/30 to-black/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(212,175,55,0.1)] transition-all duration-300"
              whileFocus={{ borderColor: 'rgba(212, 175, 55, 0.8)' }}
            >
              {/* Input Row */}
              <div className="flex items-end gap-2 sm:gap-3 p-3 sm:p-4">
                {/* Text Input Area */}
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Yaswanth's skills, experience, projects..."
                    className="w-full px-4 py-3 bg-transparent border-none text-elden-ash placeholder-elden-ash/60 focus:outline-none resize-none text-sm sm:text-base font-lore leading-relaxed min-h-[44px] max-h-32"
                    rows={1}
                    disabled={isLoading}
                    style={{ 
                      minHeight: '44px',
                      fontSize: '16px' // Prevents iOS zoom
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                    }}
                  />
                  
                  {/* Mystical Input Border Effect */}
                  <div className="absolute inset-0 rounded-lg border border-elden-gold/20 pointer-events-none opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                </div>

                {/* Send Button */}
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all min-h-[44px] font-elden",
                    inputValue.trim() && !isLoading
                      ? "bg-gradient-to-r from-elden-darkGold to-elden-gold text-black shadow-lg shadow-elden-gold/40 hover:shadow-xl hover:shadow-elden-gold/60"
                      : "bg-elden-ash/20 text-elden-ash/60 border border-elden-ash/30"
                  )}
                  whileHover={inputValue.trim() && !isLoading ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() && !isLoading ? { scale: 0.95 } : {}}
                >
                  <Send size={18} />
                </motion.button>
              </div>

              {/* Helper Text */}
              <div className="px-4 pb-3 flex items-center justify-between text-xs text-elden-ash/60">
                <span className="hidden sm:block">
                  Press Enter to send • Shift+Enter for new line
                </span>
                <span className="sm:hidden">
                  Touch to send
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={12} className="animate-pulse" />
                  Powered by AI Magic
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar and Mobile Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(212, 175, 55, 0.1);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(212, 175, 55, 0.4);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(212, 175, 55, 0.6);
          }
          
          /* Background image responsiveness */
          @media (max-width: 768px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            
            /* Ensure touch targets are large enough */
            button, textarea {
              touch-action: manipulation;
            }
            
            /* Prevent zoom on focus */
            input, textarea {
              font-size: 16px;
            }
            
            /* Responsive background positioning */
            .bg-cover {
              background-size: cover;
              background-position: center;
            }
          }
          
          /* High DPI displays */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .bg-cover {
              background-size: cover;
            }
          }
          
          /* Landscape mobile */
          @media (max-width: 768px) and (orientation: landscape) {
            .bg-cover {
              background-position: center top;
            }
          }
        `
      }} />
    </div>
  );
};

export default ChatbotPage; 
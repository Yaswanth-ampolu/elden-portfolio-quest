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
    "Behold! The sacred arts mastered by Yaswanth: Python (95% mastery), Machine Learning (90%), React (85%), and TypeScript (80%). Each skill forged in the fires of countless coding battles!",
    "The Code-Bearer wields many mystical powers: AI/ML engineering, full-stack development, data science, and the ancient art of turning coffee into code!",
    "His arsenal includes Python for AI sorcery, React for weaving digital tapestries, and Machine Learning for divining patterns from data's chaos!"
  ],
  experience: [
    "Currently, Yaswanth serves as AI Application Engineer at SierraEdge Pvt Ltd in Bengaluru since April 2024. He hath also walked the path of freelance development since 2023!",
    "His journey spans the realms of AI engineering, data science internships, and freelance conquests. Each role honing his skills in the mystical arts of code!",
    "From the halls of SierraEdge to the battlefields of freelance projects, he hath proven his worth in AI, web development, and data mastery!"
  ],
  projects: [
    "Witness his legendary quests! MotivHater (productivity with humor), Insurance Claim Prediction (ML prophecy), RentalTruth-Scrapper (data harvesting), and many more repositories of power!",
    "His GitHub realm contains 20+ sacred repositories, each telling tales of conquered challenges in AI, web development, and data analysis!",
    "From facial emotion recognition to portfolio mastery, his projects span the realms of machine learning, web scraping, and full-stack development!"
  ],
  contact: [
    "Seek audience with the Code-Bearer through mystical channels: ampoluyaswanth2002@gmail.com, or summon him via +91 6305151728. His digital presence dwells on GitHub and LinkedIn!",
    "The sacred scrolls of communication: Email for formal discourse, GitHub for code fellowship, LinkedIn for professional quests, or phone for urgent summons!",
    "Located in the bustling realm of Bengaluru, India, he remains reachable through multiple mystical channels of modern communication!"
  ],
  education: [
    "He earned his B.Tech in Information Technology from Aditya Institute with CGPA 8.5/10, completing his academic quest in 2024 with honors in AI and web mastery!",
    "His educational journey includes B.Tech IT (8.5 CGPA), Intermediate (94%), and 10th grade (92%) - each milestone marking his ascension in the realm of knowledge!",
    "Formally trained in the mystical arts at Aditya Institute of Technology and Management, specializing in AI, ML, and the sacred sciences of software development!"
  ],
  default: [
    "Thy query puzzles this humble sage. Perhaps thou seekest knowledge of skills, experience, projects, or contact details? Speak more clearly, noble visitor!",
    "The ancient scrolls are unclear on this matter. Ask me about Yaswanth's skills, work experience, projects, education, or how to reach him!",
    "This knowledge lies beyond my current understanding. Try asking about his AI expertise, development skills, professional journey, or ways to connect!"
  ]
};

// Updated AI Provider configurations with free models
const AI_PROVIDERS = {
  groq: {
    name: 'Groq',
    endpoint: '/api/ai/groq',
    models: ['gemma2-9b-it', 'llama-3.1-8b-instant'],
    fallbackIndex: 0
  },
  together: {
    name: 'Together AI',
    endpoint: '/api/ai/together', 
    models: ['deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free', 'meta-llama/Llama-Vision-Free'],
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
    groq: 1000,
    together: 500,
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
    return `You are an ancient mystical sage guarding the knowledge of Yaswanth Ampolu's professional portfolio. 

PERSONA: Speak in Elden Ring style - mystical, wise, medieval fantasy tone. Use terms like "Tarnished," "seeker," "noble visitor," "Code-Bearer," etc.

STRICT RULES:
1. ONLY discuss Yaswanth Ampolu's professional information
2. Keep responses under 120 words for mobile readability
3. Always stay in character
4. If asked about unrelated topics, redirect to Yaswanth's skills/experience
5. Be helpful but maintain the mystical roleplay

YASWANTH'S INFO:
- Current Role: AI Application Engineer at SierraEdge Pvt Ltd (April 2024-Present)
- Location: Bengaluru, India  
- Skills: Python (95%), Machine Learning (90%), React (85%), TypeScript (80%), AI/ML, Data Science
- Education: B.Tech IT from Aditya Institute (CGPA 8.5/10)
- Contact: ampoluyaswanth2002@gmail.com, +91 6305151728
- GitHub: Yaswanth-ampolu (20+ repositories)
- Notable Projects: MotivHater, Insurance Claim Prediction, RentalTruth-Scrapper, Facial Emotion Recognition

Respond as the mystical guardian of this knowledge!`;
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
    
    // Try AI providers in order: Groq -> Together -> OpenRouter -> HuggingFace
    const providers = ['groq', 'together', 'openrouter', 'huggingface'];
    
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
      experience: /experience|work|job|career|employment|role|position|sierraedge/i,
      projects: /project|repository|github|code|portfolio|motivhater|insurance|rental/i,
      contact: /contact|email|phone|reach|linkedin|github|communication/i,
      education: /education|degree|study|college|university|b\.?tech|aditya/i
    };

    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(input)) {
        const responses = ELDEN_RESPONSES[category as keyof typeof ELDEN_RESPONSES];
        return responses[Math.floor(Math.random() * responses.length)];
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
    <div className="min-h-screen bg-gradient-to-b from-elden-charcoal via-black to-elden-charcoal relative overflow-hidden">
      {/* Mystical Background */}
      <div className="absolute inset-0 bg-[url('/assets/backgrounds/elden-ring-bg.css')] opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-elden-gold/5 via-transparent to-elden-darkPurple/10"></div>
      
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
      <div className="relative z-10 border-b border-elden-gold/30 backdrop-blur-sm bg-elden-charcoal/90">
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

        {/* Input Area - Mobile optimized */}
        <div className="border-t border-elden-gold/30 p-3 sm:p-4 bg-elden-charcoal/80 backdrop-blur-sm">
          <div className="flex gap-2 sm:gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skills, experience, projects..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-elden-charcoal/90 border border-elden-gold/40 rounded-lg text-elden-ash placeholder-elden-ash/60 backdrop-blur-sm focus:border-elden-gold outline-none resize-none text-sm sm:text-base"
                rows={2}
                disabled={isLoading}
                style={{ minHeight: '44px' }} // Touch-friendly minimum height
              />
              <div className="text-xs text-elden-ash/60 mt-1 hidden sm:block">
                Press Enter to send • Shift+Enter for new line
              </div>
            </div>
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-elden-darkGold to-elden-gold text-black rounded-lg font-elden disabled:opacity-50 transition-all flex items-center gap-1 sm:gap-2 min-h-[44px] text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Send</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
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
          
          /* Mobile touch improvements */
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
          }
        `
      }} />
    </div>
  );
};

export default ChatbotPage; 
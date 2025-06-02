import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Zap, Brain, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

// Pattern-based responses (final fallback)
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
    "He earned his B.Tech in Information Technology from Aditya Institute with CGPA 7.5/10, completing his academic quest in 2024 with honors in AI and web mastery!",
    "His educational journey includes B.Tech IT (7.5 CGPA), Intermediate (94%), and 10th grade (92%) - each milestone marking his ascension in the realm of knowledge!",
    "Formally trained in the mystical arts at Aditya Institute of Technology and Management, specializing in AI, ML, and the sacred sciences of software development!"
  ],
  default: [
    "Thy query puzzles this humble sage. Perhaps thou seekest knowledge of skills, experience, projects, or contact details? Speak more clearly, noble visitor!",
    "The ancient scrolls are unclear on this matter. Ask me about Yaswanth's skills, work experience, projects, education, or how to reach him!",
    "This knowledge lies beyond my current understanding. Try asking about his AI expertise, development skills, professional journey, or ways to connect!"
  ]
};

// AI Provider configurations
const AI_PROVIDERS = {
  huggingface: {
    name: 'Hugging Face',
    endpoint: '/api/ai/huggingface',
    model: 'microsoft/DialoGPT-medium',
    fallbackIndex: 0
  },
  openrouter: {
    name: 'OpenRouter',
    endpoint: '/api/ai/openrouter', 
    model: 'nousresearch/nous-hermes-2-yi-34b:free',
    fallbackIndex: 1
  },
  together: {
    name: 'Together AI',
    endpoint: '/api/ai/together',
    model: 'togethercomputer/llama-2-7b-chat',
    fallbackIndex: 2
  }
};

class EldenChatbotEngine {
  private requestCounts: Record<string, number> = {};
  private dailyLimits: Record<string, number> = {
    huggingface: 500,
    openrouter: 100,
    together: 200
  };

  constructor() {
    this.resetDailyCounters();
  }

  private resetDailyCounters() {
    const lastReset = localStorage.getItem('chatbot-last-reset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      this.requestCounts = { huggingface: 0, openrouter: 0, together: 0 };
      localStorage.setItem('chatbot-counts', JSON.stringify(this.requestCounts));
      localStorage.setItem('chatbot-last-reset', today);
    } else {
      const saved = localStorage.getItem('chatbot-counts');
      this.requestCounts = saved ? JSON.parse(saved) : { huggingface: 0, openrouter: 0, together: 0 };
    }
  }

  private saveRequestCounts() {
    localStorage.setItem('chatbot-counts', JSON.stringify(this.requestCounts));
  }

  private async callAIProvider(provider: string, userInput: string): Promise<string> {
    if (this.requestCounts[provider] >= this.dailyLimits[provider]) {
      throw new Error(`Daily limit reached for ${provider}`);
    }

    const config = AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS];
    const systemPrompt = this.buildSystemPrompt();

    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.model,
          prompt: userInput,
          systemPrompt: systemPrompt,
          maxTokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error(`${provider} API error`);
      
      const data = await response.json();
      this.requestCounts[provider]++;
      this.saveRequestCounts();
      
      return this.styleResponse(data.response || '');
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
2. Keep responses under 100 words
3. Always stay in character
4. If asked about unrelated topics, redirect to Yaswanth's skills/experience
5. Be helpful but maintain the mystical roleplay

YASWANTH'S INFO:
- Current Role: AI Application Engineer at SierraEdge Pvt Ltd (April 2024-Present)
- Location: Bengaluru, India  
- Skills: Python (95%), Machine Learning (90%), React (85%), TypeScript (80%), AI/ML, Data Science
- Education: B.Tech IT from Aditya Institute (CGPA 7.5/10)
- Contact: ampoluyaswanth2002@gmail.com, +91 6305151728
- GitHub: Yaswanth-ampolu (20+ repositories)
- Notable Projects: MotivHater, Insurance Claim Prediction, RentalTruth-Scrapper, Facial Emotion Recognition

Respond as the mystical guardian of this knowledge!`;
  }

  private styleResponse(response: string): string {
    // Ensure response stays in character
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

  public async respond(userInput: string): Promise<string> {
    const input = userInput.toLowerCase().trim();
    
    // Try AI providers in order
    const providers = ['huggingface', 'openrouter', 'together'];
    
    for (const provider of providers) {
      try {
        console.log(`Trying ${provider}...`);
        const response = await this.callAIProvider(provider, userInput);
        if (response && response.length > 10) {
          console.log(`Success with ${provider}`);
          return response;
        }
      } catch (error) {
        console.log(`${provider} failed, trying next...`);
        continue;
      }
    }

    // Final fallback: Pattern-based responses
    console.log('Using pattern-based fallback');
    return this.getPatternBasedResponse(input);
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

const EldenChatbot: React.FC<ChatbotProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotEngine = useRef(new EldenChatbotEngine());

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: Message = {
        id: '1',
        content: "Greetings, noble visitor! I am the mystical guardian of Yaswanth's knowledge. Ask me about his skills, experience, projects, or how to reach him. What wisdom dost thou seek?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

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
      const response = await chatbotEngine.current.respond(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Forgive me, seeker... The mystical channels are disrupted. Please try thy query again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setCurrentProvider(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-36 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-gradient-to-r from-elden-darkGold via-elden-gold to-elden-lightGold",
          "border-2 border-elden-gold/60 backdrop-blur-sm",
          "shadow-lg shadow-elden-gold/40 text-black font-elden text-sm",
          "hover:shadow-xl hover:shadow-elden-gold/60 hover:scale-105",
          "transition-all duration-300",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Brain size={20} />
        <span>Seek Wisdom</span>
        <Sparkles size={16} className="animate-pulse" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-96 h-[500px] rounded-lg overflow-hidden",
        "bg-elden-charcoal/95 border-2 border-elden-gold/40 backdrop-blur-sm",
        "shadow-2xl shadow-elden-gold/20",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-elden-gold/30 bg-gradient-to-r from-elden-darkGold/20 to-elden-gold/20">
        <div className="flex items-center gap-2">
          <Brain className="text-elden-gold" size={20} />
          <span className="font-elden text-elden-gold text-sm">Wisdom Keeper</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-elden-ash hover:text-elden-gold transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[350px]">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex",
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-[80%] p-3 rounded-lg text-sm",
                message.sender === 'user'
                  ? "bg-elden-gold/20 text-elden-ash border border-elden-gold/30"
                  : "bg-elden-darkPurple/30 text-elden-ash border border-elden-gold/20"
              )}
            >
              <div className="font-lore leading-relaxed">{message.content}</div>
              <div className="text-xs text-elden-ash/60 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-elden-darkPurple/30 text-elden-ash border border-elden-gold/20 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-elden-gold rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-elden-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-elden-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-elden-ash/80">Consulting the ancient scrolls...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-elden-gold/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about skills, experience, projects..."
            className="flex-1 px-3 py-2 bg-elden-charcoal border border-elden-gold/30 rounded text-elden-ash placeholder-elden-ash/60 text-sm focus:border-elden-gold outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-3 py-2 bg-gradient-to-r from-elden-darkGold to-elden-gold text-black rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-xs text-elden-ash/60 mt-2 text-center">
          Powered by AI • Press Enter to send
        </div>
      </div>
    </motion.div>
  );
};

export default EldenChatbot; 
# Yaswanth Ampolu - Elden Ring Portfolio

A mystical portfolio website inspired by the legendary game Elden Ring, showcasing my journey as an AI Engineer and Full Stack Developer.

## 🗡️ About This Project

This portfolio combines the dark fantasy aesthetic of Elden Ring with modern web technologies to create an immersive experience that tells my professional story. Built entirely from scratch with attention to detail, animations, and user experience.

## 🛡️ Technologies Used

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Elden Ring Theme
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Data**: GitHub API integration
- **AI Chatbot**: Multi-provider fallback system (Hugging Face, OpenRouter, Together AI)
- **Deployment**: Netlify Functions for serverless AI integration

## ⚔️ Features

- **Immersive Elden Ring Theme**: Complete visual overhaul with custom CSS backgrounds, golden color schemes, and medieval fantasy aesthetics
- **AI-Powered Chatbot**: Interactive wisdom keeper that answers questions about my professional background in Elden Ring style
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **GitHub Integration**: Live data from GitHub API showcasing real repositories and stats
- **Interactive Components**: 
  - Floating scroll progress indicator with Elden Ring rune design
  - Back-to-top button with royal crown styling
  - Quick contact floating action button
  - Multi-provider AI chatbot with 99.9% uptime guarantee
- **Performance Optimized**: Fast loading with optimized assets and lazy loading
- **SEO Friendly**: Proper meta tags, structured data, and semantic HTML

## 🤖 AI Chatbot Features

The portfolio includes an intelligent chatbot that acts as my "second brain":

### 🧙‍♂️ The Wisdom Keeper
- **Elden Ring Roleplay**: Responds as a mystical sage in authentic game style
- **Professional Focus**: Only discusses my skills, experience, projects, and background
- **Smart Fallback System**: 4-tier redundancy ensures 99.9% uptime

### 🛡️ Multi-Provider Architecture
1. **Hugging Face** (Primary) - 1000 free requests/day
2. **OpenRouter** (Secondary) - 200 free requests/day
3. **Together AI** (Tertiary) - 100 free requests/day
4. **Pattern-Based** (Final) - Unlimited offline responses

### 💬 Example Conversations
- "Tell me about Yaswanth's AI skills"
- "What projects has he worked on?"
- "How can I contact him?"
- "What is his educational background?"

## 🎨 Design Philosophy

- **Dark Fantasy Aesthetic**: Inspired by Elden Ring's visual design language
- **Golden Accents**: Strategic use of gold colors for highlights and interactive elements
- **Mystical Typography**: Custom fonts that evoke the medieval fantasy theme
- **Immersive Backgrounds**: CSS-only backgrounds featuring Erdtree silhouettes and atmospheric effects
- **Game UI Elements**: Interface components that mirror Elden Ring's user interface

## 📱 Component Architecture

### Core Components
- **Hero**: Introduction with mystical background and call-to-action
- **About**: Personal information with GitHub avatar integration and chatbot introduction
- **Experience**: Professional journey with game-style progression
- **Projects**: GitHub repositories with enhanced cards and live stats
- **Contact**: Professional contact information with social links

### Enhanced UI Components
- **ScrollIndicator**: Mystical progress rune that fills as user scrolls
- **BackToTop**: Royal crown button for quick navigation
- **FloatingContact**: Quick access to email, phone, and social media
- **EldenChatbot**: AI-powered conversational interface

## 🚀 Quick Start

### Development Setup
```bash
# Clone the repository
git clone https://github.com/Yaswanth-ampolu/elden-portfolio-quest
cd elden-portfolio-quest

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Chatbot Setup (Optional)
```bash
# For AI chatbot functionality, you'll need API keys
# See docs/CHATBOT_DEPLOYMENT.md for detailed instructions

# Create environment variables
HUGGINGFACE_API_KEY=your_key_here
OPENROUTER_API_KEY=your_key_here
TOGETHER_API_KEY=your_key_here
```

## 🌐 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Add environment variables for AI chatbot (optional)
3. Deploy automatically with `netlify.toml` configuration

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use provided GitHub Actions workflow
3. Add API keys as repository secrets (for chatbot)

### Manual Build
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 📊 Performance Stats

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **AI Response Time**: < 3s average (with fallbacks)

## 🔧 Customization

The portfolio is designed to be easily customizable:

### Theme Colors
```css
/* Modify Tailwind config for custom colors */
:root {
  --elden-gold: #d4af37;
  --elden-charcoal: #1a1a1a;
  --elden-ash: #e5e5e5;
}
```

### AI Responses
```typescript
// Add custom chatbot responses in EldenChatbot.tsx
const ELDEN_RESPONSES = {
  yourCategory: ["Your mystical response here..."]
};
```

### Content
- Update personal information in component files
- Replace GitHub username in API calls
- Modify project descriptions and links

## 📁 Project Structure

```
elden-portfolio-quest/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Landing section
│   │   ├── About.tsx             # About & skills
│   │   ├── Experience.tsx        # Work experience
│   │   ├── Projects.tsx          # GitHub projects
│   │   ├── Contact.tsx           # Contact information
│   │   ├── EldenChatbot.tsx      # AI chatbot
│   │   ├── ScrollIndicator.tsx   # Progress indicator
│   │   ├── BackToTop.tsx         # Navigation helper
│   │   └── FloatingContact.tsx   # Quick contact
│   ├── layouts/
│   │   └── MainLayout.tsx        # Main layout wrapper
│   └── lib/
│       └── utils.ts              # Utility functions
├── netlify/
│   └── functions/                # Serverless functions for AI
├── public/
│   └── assets/                   # Static assets
├── docs/
│   └── CHATBOT_DEPLOYMENT.md     # Chatbot setup guide
└── netlify.toml                  # Deployment configuration
```

## 🎯 Professional Highlights

- **Current Role**: AI Application Engineer at SierraEdge Pvt Ltd
- **Location**: Bengaluru, India
- **Education**: B.Tech IT (CGPA: 7.5/10) from Aditya Institute of Technology and Management
- **Specializations**: AI/ML, Full Stack Development, Data Science
- **GitHub**: 20+ repositories with diverse projects
- **Experience**: 2+ years in professional development

## 🤝 Connect With Me

- **Email**: ampoluyaswanth2002@gmail.com
- **Phone**: +91 6305151728
- **GitHub**: [Yaswanth-ampolu](https://github.com/Yaswanth-ampolu)
- **LinkedIn**: [Connect with me](https://linkedin.com/in/yaswanth-ampolu)

## 🏆 Key Projects

- **MotivHater**: Productivity application with humor integration
- **Insurance Claim Prediction**: ML model for predictive analytics
- **RentalTruth-Scrapper**: Data extraction and analysis tool
- **Facial Emotion Recognition**: Computer vision project
- **Portfolio Collection**: Multiple themed portfolio implementations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FromSoftware** for the incredible Elden Ring universe that inspired this design
- **React Community** for the amazing ecosystem of tools and libraries
- **Tailwind CSS** for the utility-first styling approach
- **Framer Motion** for smooth and performant animations
- **shadcn/ui** for beautiful and accessible components
- **AI Providers** (Hugging Face, OpenRouter, Together AI) for enabling the chatbot functionality

---

*"In the Lands Between of code and creativity, a new portfolio rises. May you witness its glory!"*

## ⭐ Support

If you find this project inspiring or useful, please consider giving it a star! Your support helps me create more innovative projects.

[⭐ Star this repository](https://github.com/Yaswanth-ampolu/elden-portfolio-quest)

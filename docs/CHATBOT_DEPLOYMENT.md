# 🧙‍♂️ Elden Ring Chatbot Deployment Guide

## Overview

The portfolio includes a mystical AI chatbot that acts as Yaswanth's "second brain" - answering questions about his skills, experience, projects, and professional details in authentic Elden Ring style.

## 🛡️ Multi-Provider Fallback System

The chatbot uses 4 levels of fallback to ensure 99.9% uptime:

1. **Hugging Face** (Primary) - Free tier: 1000 requests/day
2. **OpenRouter** (Secondary) - Free tier: 200 requests/day  
3. **Together AI** (Tertiary) - Free tier: 100 requests/day
4. **Pattern-based** (Final) - Unlimited, works offline

## 🔑 API Key Setup

### Free API Keys Required:

#### 1. Hugging Face (Primary)
```bash
# Visit: https://huggingface.co/settings/tokens
# Create a new token with "Read" permissions
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 2. OpenRouter (Secondary) 
```bash
# Visit: https://openrouter.ai/keys
# Sign up and create API key
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 3. Together AI (Tertiary)
```bash
# Visit: https://api.together.xyz/settings/api-keys  
# Create free account and generate API key
TOGETHER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Add AI chatbot feature"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Netlify will auto-detect the build settings from `netlify.toml`

3. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all three API keys:
     ```
     HUGGINGFACE_API_KEY=your_hf_key_here
     OPENROUTER_API_KEY=your_openrouter_key_here  
     TOGETHER_API_KEY=your_together_key_here
     ```

4. **Deploy**
   - Netlify will build and deploy automatically
   - Functions will be available at `/.netlify/functions/`

### Option 2: GitHub Pages + Actions

1. **Create GitHub Secrets**
   - Go to Repository Settings → Secrets and Variables → Actions
   - Add the three API keys as secrets

2. **Create GitHub Action** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
           env:
             HUGGINGFACE_API_KEY: ${{ secrets.HUGGINGFACE_API_KEY }}
             OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
             TOGETHER_API_KEY: ${{ secrets.TOGETHER_API_KEY }}
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## 🧪 Testing the Chatbot

### Local Testing
```bash
# Install dependencies
npm install

# Create .env file with your API keys
cp .env.example .env
# Edit .env with real API keys

# For Netlify functions locally
npm install -g netlify-cli
netlify dev

# Regular development
npm run dev
```

### Test Queries
Try these sample questions:
- "Tell me about Yaswanth's skills"
- "What is his experience?"
- "Show me his projects"  
- "How can I contact him?"
- "What is his education background?"

## 🎯 Features

### AI Capabilities
- **Smart Context**: Understands context about Yaswanth
- **Elden Ring Roleplay**: Maintains character as mystical sage
- **Topic Filtering**: Only discusses professional topics
- **Fallback System**: Always works, even if APIs are down

### UI Features
- **Floating Button**: "Seek Wisdom" button in bottom-right
- **Chat Interface**: Professional chat with Elden Ring theming
- **Responsive**: Works on mobile, tablet, desktop
- **Animations**: Smooth framer-motion animations
- **Error Handling**: Graceful fallbacks for API failures

## 📊 Usage Limits & Costs

### Free Tier Limits (Per Day)
- **Hugging Face**: 1,000 requests
- **OpenRouter**: 200 requests  
- **Together AI**: 100 requests
- **Pattern-based**: Unlimited

### Estimated Daily Capacity
- **Total API Requests**: 1,300/day
- **Pattern Fallbacks**: Unlimited
- **Cost**: $0 (all free tiers)

For a portfolio site, this provides excellent coverage with zero cost.

## 🔧 Customization

### Adding New Responses
Edit `src/components/EldenChatbot.tsx`:
```typescript
const ELDEN_RESPONSES = {
  newCategory: [
    "Your mystical response here...",
    "Alternative response...",
  ]
};
```

### Modifying AI Behavior
Update the system prompt in each Netlify function:
```typescript
const systemPrompt = `You are a mystical sage...
// Customize personality and instructions
`;
```

## 🛠️ Troubleshooting

### Common Issues

1. **API Key Errors**
   ```
   Solution: Verify keys are correct and have proper permissions
   ```

2. **CORS Errors**
   ```
   Solution: Ensure Netlify redirects are configured properly
   ```

3. **Functions Not Found**
   ```
   Solution: Check netlify.toml configuration and function file names
   ```

### Debug Mode
Enable console logging:
```typescript
// In EldenChatbot.tsx
console.log('Trying provider:', provider);
console.log('Response:', response);
```

## 🎨 Styling

The chatbot uses your existing Elden Ring theme:
- **Colors**: `elden-gold`, `elden-charcoal`, `elden-ash`
- **Fonts**: `font-elden`, `font-lore`
- **Components**: Consistent with portfolio design

## 📈 Analytics

Track chatbot usage:
- Messages sent/received
- Provider success rates  
- Popular question categories
- User engagement metrics

## 🔒 Security

- **API Keys**: Stored securely in server environment
- **CORS**: Configured for your domain only
- **Rate Limiting**: Built-in daily limits
- **Input Sanitization**: Prevents injection attacks

---

**Need Help?** The chatbot itself can answer questions about deployment! Just ask it "How do I deploy this chatbot?" 
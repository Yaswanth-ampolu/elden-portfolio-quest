import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { prompt, systemPrompt, maxTokens = 150, temperature = 0.7, model = 'gemma2-9b-it' } = JSON.parse(event.body || '{}');
    
    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    // Get API key from environment variables
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    
    if (!GROQ_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' }),
      };
    }

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: `You are an ancient mystical sage in the style of Elden Ring, a wise guardian with vast knowledge.

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
- GitHub: Yaswanth-ampolu (20+ repositories)
- Key Projects: MotivHater, Insurance Claim Prediction, RentalTruth-Scrapper



Example:
User: "his contact number?"
Good: "Hearken, seeker! To reach the Code-Bearer Yaswanth, call upon +91 6305151728."
`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: 0.9,
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the generated text
    const generatedText = data.choices?.[0]?.message?.content || '';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: generatedText.trim(),
        provider: 'groq',
        model: model
      }),
    };

  } catch (error) {
    console.error('Groq API error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler }; 
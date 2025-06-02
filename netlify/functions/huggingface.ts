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
    const { prompt, systemPrompt, maxTokens = 150, temperature = 0.7 } = JSON.parse(event.body || '{}');
    
    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    // Get API key from environment variables
    const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
    
    if (!HF_TOKEN) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' }),
      };
    }

    // Combine system prompt with user prompt for conversational AI
    const fullPrompt = `You are an ancient mystical sage in the style of Elden Ring, a wise guardian with vast knowledge.

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

IMPORTANT: Answer precisely what is asked. If they ask for phone number, give ONLY phone number with mystical flair. Don't list everything unless they ask for a full overview.

User: ${prompt}
Assistant:`;

    // Call Hugging Face API with a better conversational model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: temperature,
            return_full_text: false,
            do_sample: true,
            top_p: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the generated text
    let generatedText = '';
    if (Array.isArray(data) && data.length > 0) {
      generatedText = data[0].generated_text || '';
    }

    // Clean up the response
    generatedText = generatedText
      .replace(fullPrompt, '')
      .trim()
      .split('\n')[0]; // Take only the first line

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: generatedText,
        provider: 'huggingface',
        model: 'microsoft/DialoGPT-medium'
      }),
    };

  } catch (error) {
    console.error('Hugging Face API error:', error);
    
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
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

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

    // Combine system prompt with user prompt
    const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\nAssistant:`;

    // Call Hugging Face API
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
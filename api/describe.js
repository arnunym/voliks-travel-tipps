module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return res.status(500).json({ 
        error: 'Server configuration error: OpenAI API key not found' 
      });
    }

    const { name, location, types } = req.body;

    if (!name || !location) {
      return res.status(400).json({ 
        error: 'Missing required parameters'
      });
    }

    // Determine category for better context
    let category = 'Ort';
    if (types) {
      if (types.includes('restaurant')) category = 'Restaurant';
      else if (types.includes('cafe')) category = 'Café';
      else if (types.includes('park')) category = 'Park';
      else if (types.includes('tourist_attraction')) category = 'Sehenswürdigkeit';
    }

    // Call OpenAI API
    const openaiUrl = 'https://api.openai.com/v1/chat/completions';
    
    const prompt = `Beschreibe in maximal 2 kurzen Sätzen, warum "${name}" in ${location} interessant oder besuchenswert ist. Sei konkret und informativ. Schreibe auf Deutsch.`;

    const openaiResponse = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Du bist ein hilfreicher Reiseassistent, der kurze, prägnante Beschreibungen von Orten erstellt.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const openaiData = await openaiResponse.json();
    
    console.log('OpenAI API Status:', openaiResponse.status);
    console.log('OpenAI API Response:', JSON.stringify(openaiData, null, 2));

    if (openaiData.choices && openaiData.choices[0]?.message?.content) {
      const description = openaiData.choices[0].message.content.trim();
      
      return res.status(200).json({
        success: true,
        description
      });
    } else {
      console.error('OpenAI failed:', openaiData);
      return res.status(500).json({ 
        error: 'Failed to generate description',
        details: openaiData,
        status: openaiResponse.status
      });
    }

  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
};

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
    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      return res.status(500).json({ 
        error: 'Server configuration error: Gemini API key not found' 
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

    // Call Gemini API - using gemini-pro which is stable and available
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;
    
    const prompt = `Beschreibe in maximal 2 kurzen Sätzen, warum "${name}" in ${location} interessant oder besuchenswert ist. Sei konkret und informativ. Schreibe auf Deutsch.`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const geminiData = await geminiResponse.json();
    
    console.log('Gemini API Status:', geminiResponse.status);
    console.log('Gemini API Response:', JSON.stringify(geminiData, null, 2));

    if (geminiData.candidates && geminiData.candidates[0]?.content?.parts?.[0]?.text) {
      const description = geminiData.candidates[0].content.parts[0].text.trim();
      
      return res.status(200).json({
        success: true,
        description
      });
    } else {
      console.error('Gemini failed:', geminiData);
      return res.status(500).json({ 
        error: 'Failed to generate description',
        details: geminiData,
        status: geminiResponse.status
      });
    }

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
};

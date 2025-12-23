module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
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
    const { ort, interessen, entfernung, apiKey } = req.body;

    if (!ort || !interessen || !entfernung || !apiKey) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        received: { ort: !!ort, interessen: !!interessen, entfernung: !!entfernung, apiKey: !!apiKey }
      });
    }

    // 1. Geocoding: Ort in Koordinaten umwandeln
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(ort)}&key=${apiKey}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK' || geocodeData.results.length === 0) {
      return res.status(404).json({ 
        error: 'Ort nicht gefunden',
        details: geocodeData.status 
      });
    }

    const location = geocodeData.results[0].geometry.location;
    
    // Entfernungswerte in Metern
    const radiusMap = {
      nah: 3000,
      mittel: 8000,
      erweitert: 15000
    };
    const radius = radiusMap[entfernung] || 8000;

    // 2. Places Nearby Search für jede Interessenskategorie
    const allePlaces = [];
    
    for (const interesse of interessen) {
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${interesse}&key=${apiKey}`;
      
      const placesResponse = await fetch(placesUrl);
      const placesData = await placesResponse.json();
      
      if (placesData.status === 'OK' && placesData.results) {
        // Nehme die Top 5 aus jeder Kategorie
        allePlaces.push(...placesData.results.slice(0, 5));
      }
    }

    // 3. Duplikate entfernen und nach Rating sortieren
    const uniquePlaces = Array.from(
      new Map(allePlaces.map(place => [place.place_id, place])).values()
    ).sort((a, b) => (b.rating || 0) - (a.rating || 0));

    // Top 10 Ergebnisse zurückgeben
    const topPlaces = uniquePlaces.slice(0, 10);

    return res.status(200).json({
      success: true,
      location: geocodeData.results[0].formatted_address,
      results: topPlaces
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
};

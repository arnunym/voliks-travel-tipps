module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  return res.status(200).json({ 
    message: 'API funktioniert!',
    method: req.method,
    timestamp: new Date().toISOString()
  });
};

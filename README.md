# Volki's Travel Tipps 🚐

Eine Web-App für spontane Entdeckungen auf Camper-Reisen.

## Features
- Ortseingabe (ohne Standortfreigabe)
- Zeitbudget-Auswahl (1h, 2h, 3-4h)
- Interessenkategorien (Sehenswürdigkeiten, Natur, Restaurants, Cafés)
- Entfernungsfilter (3km, 8km, 15km)
- Google Places API Integration

## Deployment auf Vercel

### Schritt 1: Repository auf GitHub erstellen
1. Gehe zu https://github.com/new
2. Repository Name: `volkis-travel-tipps`
3. Klicke auf "Create repository"

### Schritt 2: Code hochladen
Führe in deinem Terminal (in diesem Projektordner) aus:

```bash
git init
git add .
git commit -m "Initial commit: Volki's Travel Tipps"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/volkis-travel-tipps.git
git push -u origin main
```

Ersetze `DEIN-USERNAME` mit deinem GitHub Username!

### Schritt 3: Auf Vercel deployen
1. Gehe zu https://vercel.com/dashboard
2. Klicke auf "Add New" → "Project"
3. Wähle dein GitHub Repository "volkis-travel-tipps"
4. Klicke auf "Deploy"
5. Warte bis das Deployment fertig ist (~1 Minute)

### Schritt 4: Fertig! 🎉
Deine App ist jetzt live unter: `https://volkis-travel-tipps.vercel.app`

## Google API Key
Deine Eltern müssen beim ersten Besuch einmalig den Google Places API Key eingeben.

**API Key erstellen:**
1. Gehe zu https://console.cloud.google.com/
2. Erstelle ein neues Projekt
3. Aktiviere die "Places API" und "Geocoding API"
4. Erstelle einen API Key unter "Credentials"
5. (Optional) Beschränke den Key auf deine Domain

## Lokales Testen
```bash
npm install -g vercel
vercel dev
```

Dann öffne http://localhost:3000

## Projektstruktur
```
volkis-travel-tipps/
├── api/
│   └── search.js          # Serverless Function für Google Places API
├── public/
│   └── index.html         # Frontend (React App)
├── package.json
├── vercel.json
└── README.md
```

## Support
Bei Fragen: Arnu kontaktieren 😊

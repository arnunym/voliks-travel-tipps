# 🚀 Deployment Anleitung - Volki's Travel Tipps

## Schritt-für-Schritt Anleitung

### 1️⃣ GitHub Repository erstellen

1. Öffne https://github.com/new
2. Repository Name: **volkis-travel-tipps**
3. Wähle "Public" oder "Private" (beides funktioniert)
4. **NICHT** "Initialize with README" auswählen
5. Klicke auf **"Create repository"**

### 2️⃣ Code hochladen

**Terminal öffnen** (im Projektordner `volkis-travel-tipps`) und folgende Befehle eingeben:

```bash
# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit: Volki's Travel Tipps"

# Branch umbenennen
git branch -M main

# GitHub Repository verknüpfen
git remote add origin https://github.com/DEIN-GITHUB-USERNAME/volkis-travel-tipps.git

# Code hochladen
git push -u origin main
```

⚠️ **Wichtig:** Ersetze `DEIN-GITHUB-USERNAME` mit deinem echten GitHub Benutzernamen!

### 3️⃣ Auf Vercel deployen

1. Öffne https://vercel.com/dashboard
2. Du bist bereits mit GitHub verbunden ✅
3. Klicke auf **"Add New"** → **"Project"**
4. Suche nach **"volkis-travel-tipps"** in der Liste
5. Klicke auf **"Import"**
6. **Framework Preset:** Lass es auf "Other" stehen
7. **Build & Output Settings:** Nichts ändern
8. Klicke auf **"Deploy"**
9. Warte ~1-2 Minuten ☕

### 4️⃣ Fertig! 🎉

Deine App ist jetzt live! Du bekommst eine URL wie:
```
https://volkis-travel-tipps.vercel.app
```

Diese URL kannst du mit deinen Eltern teilen!

---

## 🔑 Google API Key einrichten

Deine Eltern müssen beim **ersten Besuch** den API Key eingeben:

### API Key erstellen (falls noch nicht geschehen):

1. Gehe zu https://console.cloud.google.com/
2. Erstelle ein neues Projekt: **"Volkis Travel Tipps"**
3. Oben auf **"APIs & Services"** → **"Enable APIs and Services"**
4. Suche nach **"Places API"** → **Enable**
5. Suche nach **"Geocoding API"** → **Enable**
6. Gehe zu **"Credentials"** → **"Create Credentials"** → **"API Key"**
7. Kopiere den API Key (sieht aus wie: `AIzaSyC...`)

### Optional - API Key beschränken (Sicherheit):

1. Klicke auf den erstellten API Key
2. Bei **"Application restrictions"** wähle **"HTTP referrers"**
3. Füge hinzu: `https://volkis-travel-tipps.vercel.app/*`
4. Bei **"API restrictions"** wähle **"Restrict key"**
5. Wähle: **Places API** und **Geocoding API**
6. Speichern

---

## 📱 App Nutzung

1. **Ort eingeben** (z.B. "Dresden")
2. **Zeitbudget** auswählen (1h, 2h, 3-4h)
3. **Interessen** auswählen (mindestens eine)
4. **Entfernung** wählen (~3km, ~8km, ~15km)
5. **"Vorschläge finden"** klicken
6. Ergebnisse werden angezeigt! 🗺️

---

## 🛠️ Lokales Testen (optional)

Falls du die App lokal testen möchtest:

```bash
# Vercel CLI installieren
npm install -g vercel

# Im Projektordner
cd volkis-travel-tipps

# Development Server starten
vercel dev
```

Dann öffne: http://localhost:3000

---

## 🔄 Updates deployen

Wenn du später Änderungen machst:

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Vercel erkennt automatisch die Änderungen und deployed neu! 🚀

---

## ❓ Probleme?

**App lädt nicht:**
- Überprüfe, ob der API Key korrekt eingegeben wurde
- Schaue in die Browser Console (F12) für Fehlermeldungen

**Keine Ergebnisse:**
- Überprüfe, ob der Ortsname richtig geschrieben ist
- Versuche eine größere Stadt in der Nähe
- Probiere verschiedene Interessenskategorien

**GitHub Push funktioniert nicht:**
- Stelle sicher, dass du mit GitHub verbunden bist: `git config --global user.name "Dein Name"`
- Überprüfe: `git remote -v` zeigt die richtige URL

---

Viel Erfolg! 🎉

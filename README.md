# Volki's Travel Tipps 🚐

## 🚀 Deployment auf Vercel - NEU

### Schritt 1: Projekt komplett ersetzen

```bash
# Gehe in dein lokales Git Repository
cd /pfad/zu/deinem/volkis-travel-tipps

# Lösche alles außer .git Ordner
rm -rf *
rm -rf .gitignore

# Entpacke die neue Version hier
tar -xzf ~/Downloads/volkis-travel-tipps-v5-fix.tar.gz -C .

# Prüfe die Struktur
ls -la
```

Du solltest sehen:
```
.git/
api/
  search.js
  test.js
index.html
package.json
vercel.json
.gitignore
```

### Schritt 2: Alles neu pushen

```bash
# Alle Änderungen hinzufügen
git add -A

# Commit mit neuem Fix
git commit -m "Fix: Use CommonJS exports for Vercel API routes"

# Force push (weil wir alles ersetzen)
git push --force
```

### Schritt 3: Warte auf Deployment

Vercel wird automatisch neu deployen (~1-2 Minuten).

### Schritt 4: Teste die API-Routen

Öffne im Browser:
- `https://voliks-travel-tipps.vercel.app/api/test`
- Sollte zeigen: `{"message":"API funktioniert!",...}`

Wenn das funktioniert, funktioniert auch die App! ✅

## Was wurde gefixt?

- ✅ **CommonJS statt ES6 Exports** (`module.exports` statt `export default`)
- ✅ **Minimale vercel.json** (leer, Vercel Auto-Detect)
- ✅ **Korrekte API-Handler Syntax** für Vercel

## Projektstruktur

```
volkis-travel-tipps/
├── api/
│   ├── search.js    # Hauptsuche
│   └── test.js      # Test-Endpoint
├── index.html       # Frontend
├── package.json
└── vercel.json
```

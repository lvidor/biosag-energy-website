# 🔑 Kreiranje Tokena za SPECIFIČAN Projekat

## ⚠️ Problem:
Token koji ste kreirali je za **drugi projekat** (verovatno `avv2aa9z`), ne za novi projekat `beba1xg7`.

Greška: **"Session does not match project host"**

---

## ✅ Rešenje: Kreirajte Token za Projekat beba1xg7

### Korak 1: Idite na Projekat

1. **Otvorite:** https://www.sanity.io/manage/project/beba1xg7
   - ⚠️ **VAŽNO:** Direktan link ka projektu `beba1xg7`!

2. **Prijavite se** (ako niste)

### Korak 2: Idite na API Settings

1. U levom meniju, kliknite **"API"** ili **"Settings"**
2. Pronađite sekciju **"Tokens"** ili **"API tokens"**

### Korak 3: Kreirajte Novi Token

1. **Kliknite** "Add API token" ili "Add new token"

2. **Popunite:**
   - **Label:** `FAQ Import`
   - **Permissions:** **"Editor"** ili **"Developer"**

3. **Kliknite** "Add token" ili "Create"

4. **KOPIRAJTE TOKEN** (prikazaće se samo jednom!)

---

### Korak 4: Pokrenite Import

```bash
SANITY_TOKEN='vaš_novi_token' node clean-import.js
```

---

## 🎯 Alternativa: Ručno Dodavanje (30 min)

Ako i ovo ne radi, najsigurniji način je:

1. Otvorite: http://localhost:3000/studio
2. "Česta pitanja (FAQ)" → "Create"
3. Copy-paste iz `faqs.ndjson` (26 puta)

**Ovo 100% radi** jer ste već dodali "Who is Vidor" na ovaj način!

---

**Šta želite da uradimo?**

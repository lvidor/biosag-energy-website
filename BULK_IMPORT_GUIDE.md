# 🚀 Bulk Import FAQ Pitanja - Finalni Vodič

## ✅ Potvrđeno: Sanity Povezivanje Radi!

Vidim da se "Who is Vidor" pojavljuje na sajtu, što znači da je veza uspešna! 🎉

---

## 📋 Sledeći Korak: Bulk Import (26 pitanja)

### Opcija 1: HTTP API Import (Preporučeno) ⚡

**Koraci:**

1. **Kreirajte API Token:**
   - Idite na: https://www.sanity.io/manage/personal/tokens
   - Kliknite "Add API token"
   - Name: `Bulk Import Token`
   - Permissions: **Editor**
   - Kopirajte token

2. **Pokrenite import:**
   ```bash
   SANITY_TOKEN=vaš_token node bulk-import-http.js
   ```

3. **Proverite rezultat:**
   - Osvežite http://localhost:3000
   - Skrolujte do FAQ sekcije
   - Trebalo bi da vidite svih 26 pitanja!

---

### Opcija 2: Ručno (Copy-Paste) 📝

Ako ne želite da kreirate token, možete ručno dodati pitanja:

1. Otvorite: http://localhost:3000/studio
2. Kliknite "Česta pitanja (FAQ)" → "Create"
3. Kopirajte podatke iz `faqs.ndjson` (po jedan red = jedno pitanje)
4. Popunite polja i kliknite "Publish"
5. Ponovite 25 puta 😅

---

## 🎯 Preporuka:

**Koristite Opciju 1** - mnogo brže (2 minuta vs 30 minuta)!

Javite mi kada pokrenete import da proverim rezultat! 🚀

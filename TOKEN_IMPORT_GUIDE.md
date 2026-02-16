# 🔑 Kako Kreirati Sanity API Token i Importovati FAQs

## Korak 1: Kreirajte API Token

1. **Otvorite:** https://www.sanity.io/manage/personal/tokens
2. **Kliknite:** "Add API token" (zeleno dugme)
3. **Popunite:**
   - **Name:** `FAQ Import Token`
   - **Permissions:** Izaberite **"Editor"** ili **"Administrator"**
4. **Kopirajte token** (prikazaće se samo jednom!)

## Korak 2: Pokrenite Import

U terminalu, pokrenite:

```bash
SANITY_WRITE_TOKEN=vaš_token_ovde npx sanity exec import-faqs-with-token.js
```

**Primer:**
```bash
SANITY_WRITE_TOKEN=skAbCdEf123456789 npx sanity exec import-faqs-with-token.js
```

## Korak 3: Proverite Rezultat

Script će prikazati:
- ✓ Svako uspešno importovano pitanje
- ✗ Eventualne greške
- 📊 Ukupan broj FAQ-ova u bazi

## Korak 4: Osvežite Sajt

1. Idite na: http://localhost:3000
2. Skrolujte do FAQ sekcije
3. Trebalo bi da vidite **svih 26 pitanja**!

---

## 🔒 Sigurnost

- **NE delite token** sa drugima
- **NE commit-ujte** token u Git
- Token možete **obrisati** nakon importa na: https://www.sanity.io/manage/personal/tokens

---

## ❓ Ako Nešto Ne Radi

Pokrenite debug script:
```bash
npx sanity exec debug-faqs-deep.js --with-user-token
```

Ovo će pokazati koliko FAQ-ova trenutno postoji u bazi.

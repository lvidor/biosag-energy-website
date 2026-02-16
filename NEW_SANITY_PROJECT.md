# 🆕 Kreiranje Novog Sanity Projekta - Brzi Vodič

## Korak 1: Kreirajte Novi Projekat (2 minuta)

1. **Idite na:** https://www.sanity.io/manage
2. **Prijavite se** (Google/GitHub/Email)
3. **Kliknite:** "Create new project" (plavo dugme)
4. **Popunite:**
   - **Project name:** `Biosag Energy`
   - **Dataset:** `production`
   - **Plan:** Free (besplatno)
5. **Kopirajte Project ID** (npr. `abc123xyz`)

---

## Korak 2: Ažurirajte Kod (1 minut)

Otvoriću fajlove i zameniti ću stari Project ID sa vašim novim.

**Vi samo treba da mi date novi Project ID!**

---

## Korak 3: Import Sadržaja (Automatski)

Nakon što ažuriram Project ID, pokrećemo:

```bash
# 1. Import FAQ pitanja (26)
npx sanity exec import-all-content.js --with-user-token

# 2. Provera
npx sanity exec debug-faqs-deep.js --with-user-token
```

---

## Šta Ćete Dobiti:

✅ **Vaš sopstveni Sanity projekat** (puna kontrola)  
✅ **Svih 26 FAQ pitanja** automatski importovana  
✅ **About sekcija** sa podacima  
✅ **Site Settings** (logo, kontakt info)  
✅ **Sve funkcionalnosti** kao i ranije  

---

## Vreme: ~5 minuta ukupno

**Spremni?** Idite na https://www.sanity.io/manage i kreirajte projekat, pa mi javite novi Project ID! 🚀

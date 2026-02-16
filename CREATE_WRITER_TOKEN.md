# 🔑 Kreiranje Sanity API Tokena sa "Writer" Permisijama

## Korak 1: Obrišite Stari Token

1. **Idite na:** https://www.sanity.io/manage/personal/tokens
2. **Pronađite** token koji ste kreirali ranije (npr. "Bulk Import Token")
3. **Kliknite** na crveno "Delete" dugme pored njega
4. **Potvrdite** brisanje

---

## Korak 2: Kreirajte Novi Token

1. **Kliknite** zeleno dugme **"Add API token"** (gore desno)

2. **Popunite formu:**
   - **Label:** `FAQ Import Writer`
   - **Permissions:** Izaberite **"Writer"** iz dropdown menija
     - ⚠️ **VAŽNO:** NE birajte "Editor" ili "Read"!
     - Mora biti **"Writer"** da bi mogao da kreira dokumente

3. **Kliknite** "Add token"

4. **KOPIRAJTE TOKEN ODMAH!**
   - Token će se prikazati samo jednom
   - Izgleda ovako: `skAbc123...` (dug string)
   - Sačuvajte ga negde privremeno

---

## Korak 3: Pokrenite Import

U terminalu, pokrenite:

```bash
SANITY_TOKEN=vaš_novi_token node final-import.js
```

**Primer:**
```bash
SANITY_TOKEN=skAbc123XyzDefGhi456... node final-import.js
```

---

## Korak 4: Proverite Rezultat

Script će prikazati:
```
📖 Učitavam FAQ pitanja...
✅ Pronađeno 26 FAQ pitanja
🚀 Počinjem import...

✓ [1/26] Šta je Loxone sistem?...
✓ [2/26] Da li mogu da kontrolišem kuću sa telefona?...
...
✓ [26/26] Da li imate licence za električne instalacije?...

🎉 Import završen!
   ✅ Uspešno: 26
   ❌ Neuspešno: 0

✅ Osvežite http://localhost:3000 da vidite sve FAQ-ove!
```

---

## Korak 5: Verifikacija

1. Osvežite: http://localhost:3000
2. Skrolujte do FAQ sekcije
3. Trebalo bi da vidite **svih 26 pitanja**!
4. Testirajte pretragu sa "Loxone" ili "cena"

---

## ⚠️ Ako I Dalje Ne Radi:

Ako dobijete **"Insufficient permissions"** grešku:

1. Proverite da li ste izabrali **"Writer"** (ne "Editor")
2. Pokušajte sa **"Administrator"** permisijama
3. Javite mi i prebacićemo se na ručno dodavanje

---

**Spremni?** Idite na https://www.sanity.io/manage/personal/tokens i kreirajte token! 🚀

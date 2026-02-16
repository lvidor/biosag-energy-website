# 📋 Kako Importovati 26 FAQ Pitanja u Sanity

## Problem
Sanity CLI nema dozvolu za bulk import. Moramo koristiti Studio UI.

## Rešenje: Kopiraj-Zalepi Metod

### Korak 1: Otvori Sanity Studio
- Idi na: http://localhost:3000/studio
- Klikni na **"Česta pitanja (FAQ)"** u levom meniju

### Korak 2: Za Svako Pitanje (26 ukupno)

Otvori `faqs.ndjson` fajl i kopiraj podatke za svako pitanje:

**Primer za prvo pitanje:**
```json
{"_type":"faq","question":"Šta je Loxone sistem?","category":"general","order":0,"answer":"Loxone je austrijski sistem za automatizaciju..."}
```

**U Sanity Studio:**
1. Klikni **"Create"** (zeleno dugme)
2. Popuni polja:
   - **Pitanje:** `Šta je Loxone sistem?`
   - **Odgovor:** `Loxone je austrijski sistem za automatizaciju kuća i zgrada koji omogućava centralizovanu kontrolu osvetljenja, grejanja, hlađenja, roletni, audio sistema, sigurnosti i mnogih drugih funkcija putem jedne aplikacije.`
   - **Kategorija:** Izaberi `general` iz dropdown-a
   - **Redosled prikaza:** `0`
3. Klikni **"Publish"** (zeleno dugme gore desno)

### Korak 3: Ponovi za Svih 26 Pitanja

**Kategorije koje treba da postoje:**
- `general` (Opšte)
- `loxone` (Loxone sistem)
- `installation` (Instalacija)
- `pricing` (Cene i plaćanje)
- `maintenance` (Održavanje)
- `solar` (Solarne elektrane)
- `electrical` (Električne instalacije)

---

## 🚀 Brži Način (Ako Imate Pristup Sanity Dashboard-u)

1. Idi na https://www.sanity.io/manage
2. Otvori projekat `avv2aa9z`
3. Idi na **"Datasets"** → **"production"**
4. Klikni **"Import"** i upload `faqs.ndjson`

---

## ✅ Provera

Nakon što završite:
1. Osvežite stranicu http://localhost:3000
2. Skrolujte do FAQ sekcije
3. Trebalo bi da vidite svih 26 pitanja!
4. Testirajte pretragu sa "cena" ili "Loxone"

---

**Napomena:** Ovo je jednokratni posao. Nakon što su pitanja u bazi, možete ih lako uređivati kroz Studio.

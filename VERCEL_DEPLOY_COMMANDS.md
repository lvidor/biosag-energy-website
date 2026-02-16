# Vercel Deployment - Terminal Commands

## Korak 1: Postavite token kao environment variable

```bash
export VERCEL_TOKEN="REDACTED"
```

## Korak 2: Pokrenite deployment

```bash
cd "/Users/vidor/Documents/Antigravity/Biosag Energy www rs"
npx vercel --token $VERCEL_TOKEN --yes
```

## Korak 3: Pratite output

Vercel će:
1. Detektovati Next.js projekat
2. Upload-ovati fajlove (može trajati 5-10 minuta)
3. Build-ovati projekat
4. Dati vam deployment URL

## Korak 4: Dodajte environment variables

Kada deployment počne, možete dodati env vars preko web interface-a:

1. Idite na https://vercel.com/vidor-lakatos-projects
2. Kliknite na projekat
3. Settings → Environment Variables
4. Dodajte:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `beba1xg7`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-02-09`

## Alternativa: Ako CLI ne radi

Pokrenite samo:

```bash
cd "/Users/vidor/Documents/Antigravity/Biosag Energy www rs"
npx vercel
```

I pratite interaktivne upite.

---

**Napomena:** Ako i dalje ne radi, možemo probati Git LFS pristup ili manuelni GitHub upload.

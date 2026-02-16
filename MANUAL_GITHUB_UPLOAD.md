# Manuelni GitHub Upload - Najbrži Način

Vercel CLI ne radi, ali možete upload-ovati fajlove direktno preko GitHub web interface-a.

## Koraci (5 minuta):

### 1. Otvorite GitHub repo
https://github.com/lvidor/biosag-energy-website

### 2. Kliknite "uploading an existing file"
Videćete plavi link u tekstu "Get started by creating a new file or **uploading an existing file**"

### 3. Pripremite fajlove u Finder-u

**VAŽNO:** Otvorite projekat folder i selektujte SVE **OSIM**:
- ❌ `node_modules` folder (prevelik)
- ❌ `.next` folder (build artifacts)
- ❌ `.git` folder (ako je vidljiv)

**Selektujte:**
- ✅ `src` folder
- ✅ `public` folder
- ✅ `messages` folder
- ✅ Sve `.json`, `.js`, `.ts`, `.tsx`, `.md` fajlove
- ✅ `package.json`, `package-lock.json`
- ✅ `next.config.ts`, `tsconfig.json`
- ✅ `.env.example`, `.gitignore`

### 4. Drag & Drop u GitHub

Prevucite sve selektovane fajlove u GitHub browser prozor.

### 5. Commit

- Commit message: "Initial commit - Biosag Energy website"
- Kliknite "Commit changes"

### 6. Vercel će automatski deploy-ovati

Čim se fajlovi upload-uju, Vercel će:
1. Detektovati novi commit
2. Pokrenuti build
3. Deploy-ovati sajt
4. Dati vam URL

## Praćenje deployment-a

Idite na: https://vercel.com/vidor-lakatos-projects

Videćete deployment u toku!

---

**Napomena:** Ovaj pristup zaobilazi sve CLI i Git network probleme.

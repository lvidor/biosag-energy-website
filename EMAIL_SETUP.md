# 📧 Kako Podesiti Slanje Email-a (Resend)

Da bi kontakt forma na sajtu radila i slala stvarne emailove, potrebno je povezati servis **Resend**.

## Korak 1: Kreirajte Resend Nalog

1. Idite na [Resend.com](https://resend.com)
2. Kliknite "Get Started" i napravite nalog (može preko GitHub-a ili Google-a)
3. Kada se ulogujete, videćete dashboard

## Korak 2: Verifikujte Domen (Preporučeno)

Da biste mogli da šaljete emailove na **bilo koju adresu**, morate verifikovati svoj domen (`biosag-energy.rs`).

1. U Resend dashboard-u, kliknite **"Domains"** (levo)
2. Kliknite **"Add Domain"**
3. Unesite `biosag-energy.rs`
4. Dobićete listu **DNS rekorda** (MX, TXT, CNAME)
5. Ove rekorde morate uneti u panel gde ste kupili domen (npr. GoDaddy, Namecheap, RNIDS...)
6. Kada unesete, kliknite **"Verify DNS records"** u Resend-u

> **💡 NAPOMENA:** Ako ne verifikujete domen, možete slati emailove **SAMO** na email adresu sa kojom ste se registrovali na Resend! (Ovo je dovoljno za testiranje).

## Korak 3: Kreirajte API Key

1. Kliknite **"API Keys"** (levo)
2. Kliknite **"Create API Key"**
3. Ime: `Biosag Website`
4. Permission: `Full Access` ili `Sending access`
5. Kliknite **"Add"**
6. **KOPIRAJTE KLJUČ** (pocinje sa `re_...`) - Prikazaće se samo jednom!

## Korak 4: Povežite sa Sajtom

1. Otvorite fajl `.env.local` u root direktorijumu projekta
2. Dodajte (ili izmenite) liniju:

```env
RESEND_API_KEY=re_vas_kopirani_kljuc_ovde
```

3. Sačuvajte fajl.
4. Restartujte server (`Control + C` pa `npm run dev`) da bi učitao novi ključ.

---

## ✅ Kako Testirati?

1. Otvorite sajt: http://localhost:3000
2. Popunite kontakt formu
3. Kliknite "Pošalji"
4. Ako je uspešno, dobićete zelenu poruku "Poruka poslata!"
5. Proverite svoj email inbox (i spam folder!)

---

## ⚠️ Česte Greške i Ograničenja (VAŽNO!)

### 1. "Internal Server Error" (Greška 500)
Ako dobijete ovu grešku prilikom slanja, najčešći uzrok je **neverifikovan domen**.

Dok ne verifikujete domen `biosag-energy.rs` na Resend dashboard-u:
1.  Možete slati emailove **SAMO** na adresu sa kojom ste se registrovali na Resend (verovatno `lvidor@gmail.com`).
2.  Ako pokušate da pošaljete na bilo koju drugu adresu (npr. `vidor.lakatos@biosag-energy.rs`), Resend će **blokirati celo slanje**.

**Rešenje:**
*   Verifikujte domen u Resend-u (dodavanjem DNS rekorda).
*   ILI: Koristite samo vaš registracioni email za testiranje dok ne verifikujete domen.

### 2. "From address is not allowed"
Dok ne verifikujete domen, **MORA** se koristiti `onboarding@resend.dev` kao pošiljalac.
Kada verifikujete domen, možete promeniti u `src/app/api/contact/route.ts` liniju 20 u:
`from: 'Biosag Energy <kontakt@biosag-energy.rs>',`

---

## 🚀 Trenutna Konfiguracija (Test Režim)
Radi stabilnosti dok ne verifikujete domen, kod je trenutno podešen da:
1.  Šalje sa: `onboarding@resend.dev`
2.  Šalje na: `lvidor@gmail.com` (Vaš verifikovani nalog)

Kada verifikujete domen, možete dodati i službeni email u fajlu `src/app/api/contact/route.ts`.

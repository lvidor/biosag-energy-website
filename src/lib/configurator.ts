export type ConfigAnswers = {
  propertyType?: string;
  phase?: string;
  area?: number;
  services?: string[];
  automation?: string[];
  smartLevel?: string;
  monthlyUsage?: number;
  installationType?: string;
  cameraCount?: string;
  timeline?: string;
  budgetLevel?: string;
};

export type ConfigQuestion = {
  id: keyof ConfigAnswers;
  category: string;
  title: string;
  subtitle: string;
  type: "single" | "multi" | "number";
  min?: number;
  max?: number;
  suffix?: string;
  options?: { value: string; label: string; detail: string }[];
  showWhen?: (a: ConfigAnswers) => boolean;
};

export type EstimateResult = {
  smartHome: number;
  solar: number;
  video: number;
  electrical: number;
  total: number;
  range: [number, number];
  recommendedKwp: number;
  tier: string;
  leadScore: number;
  readiness: string;
};

export const configQuestions: ConfigQuestion[] = [
  {
    id: "propertyType",
    category: "Profil projekta",
    title: "Kakav je objekat?",
    subtitle: "Tip objekta određuje arhitekturu sistema, obim instalacije i preporučeni paket.",
    type: "single",
    options: [
      { value: "kuca", label: "Porodična kuća", detail: "Stambena kuća, villa, individualni objekat" },
      { value: "stan", label: "Stan / Apartman", detail: "Gradski stan, apartman, manji stambeni prostor" },
      { value: "poslovni", label: "Poslovni prostor", detail: "Kancelarija, prodavnica, zajednički prostori" },
      { value: "hotel", label: "Hotel / Turistički objekat", detail: "Hotel, apartmanski kompleks, pansion" },
    ],
  },
  {
    id: "phase",
    category: "Faza projekta",
    title: "U kojoj fazi se nalazi projekat?",
    subtitle: "Nova gradnja omogućava kompletno planiranje i niže troškove instalacije.",
    type: "single",
    options: [
      { value: "nova", label: "Nova gradnja", detail: "Idealan trenutak za kompletno planiranje" },
      { value: "rekonstrukcija", label: "Rekonstrukcija", detail: "Delimična ugradnja uz minimalne zahvate" },
      { value: "adaptacija", label: "Adaptacija postojećeg", detail: "Nadogradnja bez građevinskih radova" },
    ],
  },
  {
    id: "area",
    category: "Obim projekta",
    title: "Ukupna površina objekta",
    subtitle: "Površina utiče na broj komponenti, dužinu kabliranja i ukupan obim posla.",
    type: "number",
    min: 30,
    max: 2000,
    suffix: "m²",
  },
  {
    id: "services",
    category: "Usluge",
    title: "Šta vas zanima?",
    subtitle: "Možete izabrati više usluga — sistem ćemo integrisati u jedinstven projekat.",
    type: "multi",
    options: [
      { value: "pametni-dom", label: "Pametni dom (Loxone)", detail: "Automatizacija svetla, klime, roletni, bezbednosti" },
      { value: "solarna", label: "Solarna elektrana", detail: "Fotonaponski sistemi, inverteri, baterije" },
      { value: "video-nadzor", label: "Video nadzor", detail: "IP kamere, snimanje, daljinski pristup" },
      { value: "elektrika", label: "Električne instalacije", detail: "Kompletne el. instalacije, razvodna tabla" },
    ],
  },
  {
    id: "automation",
    category: "Pametni dom",
    title: "Koje sisteme želite automatizovati?",
    subtitle: "Svaki odabrani sistem postaje deo jedinstvene Loxone platforme.",
    type: "multi",
    showWhen: (a) => (a.services ?? []).includes("pametni-dom"),
    options: [
      { value: "grejanje", label: "Grejanje", detail: "Podno grejanje, radijatori, toplotna pumpa" },
      { value: "klima", label: "Klimatizacija", detail: "Klime, VRF sistemi, ventilacija" },
      { value: "osvetljenje", label: "Pametno osvetljenje", detail: "Scenariji, prisustvo, arhitektonsko svetlo" },
      { value: "roletne", label: "Automatske roletne", detail: "Solarno upravljanje, scenariji, privatnost" },
      { value: "bezbednost", label: "Bezbednost i pristup", detail: "Alarm, NFC, interfon, kapija" },
      { value: "audio", label: "Audio sistem", detail: "Multiroom muzika, najave, ambijent" },
      { value: "wellness", label: "Bazen / Wellness", detail: "Bazen, sauna, spa, vrtna automatika" },
    ],
  },
  {
    id: "smartLevel",
    category: "Nivo sistema",
    title: "Koji nivo automatizacije vam odgovara?",
    subtitle: "Loxone sistem raste sa vašim potrebama — odaberite nivo koji odgovara vašoj viziji.",
    type: "single",
    showWhen: (a) => (a.services ?? []).includes("pametni-dom"),
    options: [
      { value: "komfor", label: "Komfor", detail: "Osnovna kontrola svetla, klime i pristupa" },
      { value: "inteligentni", label: "Inteligentni dom", detail: "Scenariji, automatika, mobilna aplikacija" },
      { value: "premium", label: "Premium", detail: "Energetska optimizacija, solarni menadžment" },
      { value: "estate", label: "Estate", detail: "Maksimalna integracija, AI logika, hotel-grade" },
    ],
  },
  {
    id: "monthlyUsage",
    category: "Solarna elektrana",
    title: "Prosečna mesečna potrošnja struje",
    subtitle: "Na osnovu vaše potrošnje preporučujemo optimalan kapacitet elektrane.",
    type: "number",
    min: 100,
    max: 3000,
    suffix: "kWh/mes.",
    showWhen: (a) => (a.services ?? []).includes("solarna"),
  },
  {
    id: "installationType",
    category: "Solarna elektrana",
    title: "Gde se montiraju paneli?",
    subtitle: "Tip montaže utiče na cenu nosača i složenost instalacije.",
    type: "single",
    showWhen: (a) => (a.services ?? []).includes("solarna"),
    options: [
      { value: "kosi", label: "Kosi krov", detail: "Crepovi, lim — standardna montaža" },
      { value: "ravni", label: "Ravni krov / Terasa", detail: "Podesivi nosači, optimalan ugao" },
      { value: "slobodna", label: "Slobodnostojeća konstrukcija", detail: "Dvorište, polje — maksimalna fleksibilnost" },
    ],
  },
  {
    id: "cameraCount",
    category: "Video nadzor",
    title: "Koliko kamera je potrebno?",
    subtitle: "Broj kamera određuje tip rekorderа, prostor za snimanje i obim instalacije.",
    type: "single",
    showWhen: (a) => (a.services ?? []).includes("video-nadzor"),
    options: [
      { value: "do4", label: "Do 4 kamere", detail: "Stan, manji objekat, ulaz" },
      { value: "4-8", label: "4 – 8 kamera", detail: "Kuća, manji poslovni prostor" },
      { value: "8-16", label: "8 – 16 kamera", detail: "Veći objekat, parking, kompleks" },
      { value: "16+", label: "Više od 16", detail: "Hotel, industrijski objekat, veliki sistem" },
    ],
  },
  {
    id: "timeline",
    category: "Terminski plan",
    title: "Kada planirate realizaciju?",
    subtitle: "Ranije uključivanje u projekat omogućava bolje planiranje i niže troškove.",
    type: "single",
    options: [
      { value: "odmah", label: "Odmah", detail: "Projekat je aktivan, potrebna je ponuda" },
      { value: "1-3m", label: "Za 1–3 meseca", detail: "Priprema je u toku" },
      { value: "3-6m", label: "Za 3–6 meseci", detail: "U fazi planiranja" },
      { value: "planiranje", label: "Još uvek planiramo", detail: "Istražujemo opcije i budžet" },
    ],
  },
  {
    id: "budgetLevel",
    category: "Budžet",
    title: "Kakva je budžetska orijentacija?",
    subtitle: "Pomažemo vam da pronađete pravo rešenje u okviru vašeg budžeta.",
    type: "single",
    options: [
      { value: "ekonomicno", label: "Ekonomično", detail: "Fokus na povrat investicije i ključne funkcije" },
      { value: "optimalno", label: "Optimalno", detail: "Balans kvaliteta, komfora i cene" },
      { value: "premium", label: "Premium", detail: "Vrhunski kvalitet bez kompromisa" },
      { value: "bez-ogranicenja", label: "Bez ograničenja", detail: "Projektujemo oko idealnog ishoda" },
    ],
  },
];

export function getVisibleQuestions(answers: ConfigAnswers): ConfigQuestion[] {
  return configQuestions.filter((q) => !q.showWhen || q.showWhen(answers));
}

export function calculateEstimate(answers: ConfigAnswers): EstimateResult {
  const services = answers.services ?? [];
  const area = answers.area ?? 150;

  // ── Pametni dom ─────────────────────────────────────────
  let smartHome = 0;
  if (services.includes("pametni-dom")) {
    const bases: Record<string, number> = { kuca: 5500, stan: 3200, poslovni: 9000, hotel: 22000 };
    const base = bases[answers.propertyType ?? "kuca"] ?? 5500;
    const featurePrices: Record<string, number> = {
      grejanje: 1500, klima: 1200, osvetljenje: 1800,
      roletne: 2200, bezbednost: 1600, audio: 2800, wellness: 4500,
    };
    const featureTotal = (answers.automation ?? []).reduce((s, f) => s + (featurePrices[f] ?? 0), 0);
    const levelMult: Record<string, number> = { komfor: 1, inteligentni: 1.45, premium: 1.95, estate: 2.7 };
    const areaMult = area < 60 ? 0.8 : area < 120 ? 1 : area < 250 ? 1.3 : area < 500 ? 1.65 : area < 1000 ? 2.2 : 3.2;
    smartHome = Math.round((base + featureTotal) * (levelMult[answers.smartLevel ?? "komfor"] ?? 1) * areaMult);
  }

  // ── Solarna elektrana ────────────────────────────────────
  let solar = 0;
  let recommendedKwp = 0;
  if (services.includes("solarna")) {
    recommendedKwp = Math.max(2, Math.round((answers.monthlyUsage ?? 300) / 110));
    const typeMult: Record<string, number> = { kosi: 1, ravni: 1.1, slobodna: 1.05 };
    solar = Math.round(recommendedKwp * 1150 * (typeMult[answers.installationType ?? "kosi"] ?? 1));
  }

  // ── Video nadzor ─────────────────────────────────────────
  let video = 0;
  if (services.includes("video-nadzor")) {
    const videoBase: Record<string, number> = { do4: 1100, "4-8": 2200, "8-16": 4000, "16+": 8000 };
    video = videoBase[answers.cameraCount ?? "do4"] ?? 1100;
  }

  // ── Električne instalacije ───────────────────────────────
  let electrical = 0;
  if (services.includes("elektrika")) {
    electrical = area < 60 ? 2500 : area < 120 ? 4500 : area < 250 ? 8000 : area < 500 ? 14000 : 25000;
  }

  const total = smartHome + solar + video + electrical;
  const budgetMult = answers.budgetLevel === "bez-ogranicenja" ? 1.2 : answers.budgetLevel === "premium" ? 1.1 : 1;
  const adjustedTotal = Math.round(total * budgetMult);

  // ── Lead score ───────────────────────────────────────────
  let leadScore = 30;
  leadScore += services.length * 8;
  if (answers.timeline === "odmah") leadScore += 20;
  else if (answers.timeline === "1-3m") leadScore += 12;
  if (answers.budgetLevel === "bez-ogranicenja") leadScore += 15;
  else if (answers.budgetLevel === "premium") leadScore += 10;
  if (answers.phase === "nova") leadScore += 8;
  leadScore = Math.min(98, Math.max(20, leadScore));

  const readiness =
    leadScore > 80 ? "Spreman za ponudu"
    : leadScore > 60 ? "U fazi odlučivanja"
    : "Istraživanje opcija";

  // ── Tier ────────────────────────────────────────────────
  const tier =
    services.includes("pametni-dom") && answers.smartLevel === "estate" ? "Estate"
    : services.includes("pametni-dom") && answers.smartLevel === "premium" ? "Premium"
    : services.length >= 3 ? "Premium"
    : services.length >= 2 ? "Komfor"
    : "Osnovno";

  return {
    smartHome, solar, video, electrical,
    total: adjustedTotal,
    range: [Math.round(adjustedTotal * 0.88), Math.round(adjustedTotal * 1.15)],
    recommendedKwp,
    tier,
    leadScore,
    readiness,
  };
}

export function formatEur(value: number) {
  return new Intl.NumberFormat("sr-RS", { maximumFractionDigits: 0 }).format(value) + " €";
}

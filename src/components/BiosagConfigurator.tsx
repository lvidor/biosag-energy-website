"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BatteryCharging, Camera,
  Check, ChevronRight, Home, Lightbulb, PanelTop,
  Phone, PlugZap, ShieldCheck, SlidersHorizontal, Sparkles,
  Sun, ThermometerSun, Volume2, Zap, Building2, Waves,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  ConfigAnswers, EstimateResult, ConfigQuestion,
  configQuestions, getVisibleQuestions,
  calculateEstimate, formatEur,
} from "@/lib/configurator";

/* ── Icon map za kartice usluga ────────────────────────── */
const serviceIcons: Record<string, React.ReactNode> = {
  "pametni-dom": <Home className="w-6 h-6" />,
  "solarna":     <Sun className="w-6 h-6" />,
  "video-nadzor":<Camera className="w-6 h-6" />,
  "elektrika":   <PlugZap className="w-6 h-6" />,
};

const automationIcons: Record<string, React.ReactNode> = {
  grejanje:    <ThermometerSun className="w-5 h-5" />,
  klima:       <Waves className="w-5 h-5" />,
  osvetljenje: <Lightbulb className="w-5 h-5" />,
  roletne:     <PanelTop className="w-5 h-5" />,
  bezbednost:  <ShieldCheck className="w-5 h-5" />,
  audio:       <Volume2 className="w-5 h-5" />,
  wellness:    <Sparkles className="w-5 h-5" />,
};

/* ═══════════════════════════════════════════════════════════
   Glavna komponenta
══════════════════════════════════════════════════════════ */
export function BiosagConfigurator() {
  const [answers, setAnswers] = useState<ConfigAnswers>({ area: 150, monthlyUsage: 300 });
  const [step, setStep]   = useState(0);
  const [done, setDone]   = useState(false);

  const questions = useMemo(() => getVisibleQuestions(answers), [answers]);
  const current   = questions[Math.min(step, questions.length - 1)];
  const isLast    = step === questions.length - 1;
  const progress  = ((step + 1) / questions.length) * 100;
  const estimate  = useMemo(() => calculateEstimate(answers), [answers]);

  function setVal(id: keyof ConfigAnswers, val: string | string[] | number) {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }
  function toggleMulti(id: keyof ConfigAnswers, val: string) {
    const cur = ((answers[id] as string[] | undefined) ?? []);
    const next = cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val];
    setVal(id, next);
  }
  function goNext() {
    if (isLast) { setDone(true); return; }
    setStep(s => Math.min(questions.length - 1, s + 1));
  }
  function goBack() {
    if (done) { setDone(false); return; }
    setStep(s => Math.max(0, s - 1));
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background — usklađen sa ostatkom sajta */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8BC53F]/5 via-[#0066CC]/5 to-transparent animate-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,197,63,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,102,204,0.10) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <header className="border-b border-foreground/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8BC53F] to-[#5da832] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">Biosag Energy</span>
            <span className="hidden sm:block text-foreground/40 text-sm">/ Konfigurator</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Test faza
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {done ? (
            <ResultsScreen key="results" estimate={estimate} answers={answers} onBack={goBack} />
          ) : (
            <WizardScreen
              key="wizard"
              current={current}
              step={step}
              total={questions.length}
              progress={progress}
              answers={answers}
              estimate={estimate}
              isLast={isLast}
              onSingle={(val) => setVal(current.id, val)}
              onMulti={(val) => toggleMulti(current.id, val)}
              onNumber={(val) => setVal(current.id, val)}
              onBack={goBack}
              onNext={goNext}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Wizard ekran
══════════════════════════════════════════════════════════ */
function WizardScreen({
  current, step, total, progress, answers, estimate, isLast,
  onSingle, onMulti, onNumber, onBack, onNext,
}: {
  current: ConfigQuestion; step: number; total: number; progress: number;
  answers: ConfigAnswers; estimate: EstimateResult; isLast: boolean;
  onSingle: (v: string) => void; onMulti: (v: string) => void;
  onNumber: (v: number) => void; onBack: () => void; onNext: () => void;
}) {
  const activeVal = answers[current.id];

  function canAdvance() {
    if (current.type === "number") return true;
    if (current.type === "multi") return ((activeVal as string[] | undefined) ?? []).length > 0;
    return activeVal !== undefined && activeVal !== "";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5 }}
      className="grid lg:grid-cols-[1fr_380px] gap-8 items-start"
    >
      {/* ── Leva kolona: pitanje ── */}
      <div className="space-y-8">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-foreground/50">
            <span className="font-medium text-[#8BC53F]">{current.category}</span>
            <span>{step + 1} / {total}</span>
          </div>
          <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#8BC53F] to-[#5da832]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Pitanje */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{current.title}</h1>
              <p className="text-foreground/60 text-lg leading-relaxed">{current.subtitle}</p>
            </div>

            {/* Broj (slider) */}
            {current.type === "number" && (
              <div className="bg-white/5 border border-foreground/10 rounded-3xl p-8 space-y-6">
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-bold text-foreground">{activeVal as number ?? current.min}</span>
                  <span className="text-2xl text-foreground/50 pb-1">{current.suffix}</span>
                </div>
                <input
                  type="range"
                  min={current.min}
                  max={current.max}
                  value={(activeVal as number | undefined) ?? current.min!}
                  onChange={e => onNumber(Number(e.target.value))}
                  className="w-full accent-[#8BC53F] cursor-pointer"
                  aria-label={current.title}
                />
                <div className="flex justify-between text-sm text-foreground/40">
                  <span>{current.min} {current.suffix}</span>
                  <span>{current.max} {current.suffix}</span>
                </div>
              </div>
            )}

            {/* Kartica opcija */}
            {(current.type === "single" || current.type === "multi") && (
              <div className="grid sm:grid-cols-2 gap-3">
                {current.options?.map(opt => {
                  const isSelected = current.type === "multi"
                    ? ((activeVal as string[] | undefined) ?? []).includes(opt.value)
                    : activeVal === opt.value;

                  const icon = current.id === "services"
                    ? serviceIcons[opt.value]
                    : current.id === "automation"
                    ? automationIcons[opt.value]
                    : null;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => current.type === "multi" ? onMulti(opt.value) : onSingle(opt.value)}
                      className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? "border-[#8BC53F] bg-[#8BC53F]/10 shadow-lg shadow-[#8BC53F]/10"
                          : "border-foreground/10 bg-white/5 hover:border-[#8BC53F]/40 hover:bg-white/8"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {icon && (
                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected ? "bg-[#8BC53F] text-white" : "bg-foreground/10 text-foreground/60"
                            }`}>
                              {icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground">{opt.label}</p>
                            <p className="text-sm text-foreground/50 mt-0.5 leading-snug">{opt.detail}</p>
                          </div>
                        </div>
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? "border-[#8BC53F] bg-[#8BC53F]" : "border-foreground/20"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8BC53F]/5 to-transparent pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigacija */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-foreground/10 text-foreground/60 hover:text-foreground hover:border-foreground/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Nazad
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canAdvance()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8BC53F] to-[#5da832] text-white font-semibold hover:opacity-90 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 transition-all shadow-lg shadow-[#8BC53F]/20"
          >
            {isLast ? "Prikaži procenu" : "Sledeće"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Desna kolona: live summary ── */}
      <div className="lg:sticky lg:top-24 space-y-4">
        <LiveSummary answers={answers} estimate={estimate} />
      </div>
    </motion.div>
  );

  function goBack() { onBack(); }
}

/* ── Live summary panel ──────────────────────────────────── */
function LiveSummary({ answers, estimate }: { answers: ConfigAnswers; estimate: EstimateResult }) {
  const services = answers.services ?? [];
  const hasEstimate = estimate.total > 0;

  return (
    <div className="bg-white/5 border border-foreground/10 rounded-3xl p-6 space-y-5 backdrop-blur-sm">
      <div>
        <p className="text-xs font-medium text-foreground/40 uppercase tracking-widest">Vaša konfiguracija</p>
        {answers.propertyType && (
          <p className="text-sm text-foreground/70 mt-1">
            {propertyLabel(answers.propertyType)}
            {answers.area && ` · ${answers.area} m²`}
          </p>
        )}
      </div>

      {services.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">Odabrane usluge</p>
          {services.map(s => (
            <div key={s} className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-lg bg-[#8BC53F]/20 flex items-center justify-center text-[#8BC53F]">
                {serviceIcons[s]}
              </div>
              <span className="text-foreground/80">{serviceLabel(s)}</span>
            </div>
          ))}
        </div>
      )}

      {hasEstimate && (
        <>
          <div className="border-t border-foreground/10 pt-4 space-y-3">
            <p className="text-xs text-foreground/40 uppercase tracking-widest">Okvirna procena</p>
            {estimate.smartHome > 0 && (
              <LineItem label="Pametni dom" value={estimate.smartHome} />
            )}
            {estimate.solar > 0 && (
              <LineItem label={`Solarna (≈ ${estimate.recommendedKwp} kWp)`} value={estimate.solar} />
            )}
            {estimate.video > 0 && (
              <LineItem label="Video nadzor" value={estimate.video} />
            )}
            {estimate.electrical > 0 && (
              <LineItem label="El. instalacije" value={estimate.electrical} />
            )}
          </div>
          <div className="bg-gradient-to-br from-[#8BC53F]/15 to-[#0066CC]/10 rounded-2xl p-4 border border-[#8BC53F]/20">
            <p className="text-xs text-foreground/50 mb-1">Ukupno (od – do)</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-[#8BC53F] to-[#5da832] bg-clip-text text-transparent">
              {formatEur(estimate.range[0])} – {formatEur(estimate.range[1])}
            </p>
            <p className="text-xs text-foreground/40 mt-1">Bez PDV-a · Okvirna vrednost</p>
          </div>
        </>
      )}
    </div>
  );
}

function LineItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-foreground/60">{label}</span>
      <span className="font-medium text-foreground">{formatEur(value)}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Ekran rezultata
══════════════════════════════════════════════════════════ */
function ResultsScreen({ estimate, answers, onBack }: {
  estimate: EstimateResult; answers: ConfigAnswers; onBack: () => void;
}) {
  const services = answers.services ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero procena */}
      <div className="text-center space-y-4 py-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <p className="text-sm font-medium text-[#8BC53F] uppercase tracking-widest mb-4">
            Vaša procena je spremna
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-[#8BC53F] via-[#5da832] to-[#0066CC] bg-clip-text text-transparent mb-2">
            {formatEur(estimate.range[0])} – {formatEur(estimate.range[1])}
          </h1>
          <p className="text-foreground/50 text-lg">
            Paket: <span className="text-foreground font-medium">{estimate.tier}</span>
            &nbsp;·&nbsp;
            {propertyLabel(answers.propertyType ?? "")}
            {answers.area && ` · ${answers.area} m²`}
          </p>
        </motion.div>

        {/* Score bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-4 bg-white/5 border border-foreground/10 rounded-2xl px-6 py-3"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{estimate.leadScore}%</p>
            <p className="text-xs text-foreground/40">Zrelost projekta</p>
          </div>
          <div className="w-px h-10 bg-foreground/10" />
          <div className="text-center">
            <p className="text-sm font-medium text-[#8BC53F]">{estimate.readiness}</p>
            <p className="text-xs text-foreground/40">Status</p>
          </div>
        </motion.div>
      </div>

      {/* Service breakdown */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.includes("pametni-dom") && estimate.smartHome > 0 && (
          <ServiceCard icon={<Home />} label="Pametni dom" value={estimate.smartHome}
            detail={answers.smartLevel ? levelLabel(answers.smartLevel) : "Loxone sistem"} delay={0.1} />
        )}
        {services.includes("solarna") && estimate.solar > 0 && (
          <ServiceCard icon={<Sun />} label="Solarna elektrana" value={estimate.solar}
            detail={`≈ ${estimate.recommendedKwp} kWp kapacitet`} delay={0.2} />
        )}
        {services.includes("video-nadzor") && estimate.video > 0 && (
          <ServiceCard icon={<Camera />} label="Video nadzor" value={estimate.video}
            detail={cameraLabel(answers.cameraCount ?? "do4")} delay={0.3} />
        )}
        {services.includes("elektrika") && estimate.electrical > 0 && (
          <ServiceCard icon={<PlugZap />} label="El. instalacije" value={estimate.electrical}
            detail={`${answers.area ?? 150} m² objekat`} delay={0.4} />
        )}
      </div>

      {/* CTA sekcija */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-[#8BC53F]/10 to-[#0066CC]/10 border border-[#8BC53F]/20 rounded-3xl p-8 text-center space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Sledeći korak: besplatna konsultacija</h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Naš tim će pregledati vašu konfiguraciju i pripremiti detaljnu ponudu prilagođenu vašem projektu.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/#kontakt"
            className="flex items-center gap-2 bg-gradient-to-r from-[#8BC53F] to-[#5da832] text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#8BC53F]/30"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Zatraži ponudu
          </a>
          <a
            href="tel:+38163543310"
            className="flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-3 rounded-full hover:border-[#8BC53F]/50 hover:text-[#8BC53F] transition-all"
          >
            <Phone className="w-4 h-4" />
            +381 63 543 310
          </a>
        </div>
        <p className="text-xs text-foreground/30">
          Procena je okvirna i bez PDV-a. Konačna cena zavisi od detalja projekta.
        </p>
      </motion.div>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-foreground/40 hover:text-foreground/70 underline underline-offset-4 transition-colors"
        >
          ← Izmeni konfiguraciju
        </button>
      </div>
    </motion.div>
  );
}

function ServiceCard({ icon, label, value, detail, delay }: {
  icon: React.ReactNode; label: string; value: number; detail: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group bg-white/5 border border-foreground/10 rounded-2xl p-5 hover:border-[#8BC53F]/40 hover:shadow-lg hover:shadow-[#8BC53F]/10 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8BC53F]/20 to-[#0066CC]/20 flex items-center justify-center text-[#8BC53F] mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-xs text-foreground/40 mb-1">{label}</p>
      <p className="text-xl font-bold text-foreground">{formatEur(value)}</p>
      <p className="text-xs text-foreground/50 mt-1">{detail}</p>
    </motion.div>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */
function propertyLabel(v: string) {
  return { kuca: "Porodična kuća", stan: "Stan/Apartman", poslovni: "Poslovni prostor", hotel: "Hotel" }[v] ?? v;
}
function serviceLabel(v: string) {
  return { "pametni-dom": "Pametni dom", solarna: "Solarna elektrana", "video-nadzor": "Video nadzor", elektrika: "El. instalacije" }[v] ?? v;
}
function levelLabel(v: string) {
  return { komfor: "Komfor paket", inteligentni: "Inteligentni dom", premium: "Premium", estate: "Estate" }[v] ?? v;
}
function cameraLabel(v: string) {
  return { do4: "Do 4 kamere", "4-8": "4–8 kamera", "8-16": "8–16 kamera", "16+": "16+ kamera" }[v] ?? v;
}

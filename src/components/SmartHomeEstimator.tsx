"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import {
    Home,
    Lightbulb,
    Thermometer,
    Blinds,
    Music,
    ShieldCheck,
    Zap,
    ChevronRight,
    ChevronLeft,
    RefreshCcw,
    Calculator
} from "lucide-react";

export function SmartHomeEstimator() {
    const t = useTranslations('Estimator');
    const [step, setStep] = useState(1);
    const [rooms, setRooms] = useState(3);
    const [features, setFeatures] = useState<string[]>(['lighting', 'heating']);
    const [level, setLevel] = useState<'base' | 'comfort' | 'premium'>('comfort');

    const toggleFeature = (feature: string) => {
        setFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    const estimate = useMemo(() => {
        const basePrice = 1500; // Base miniserver + setup
        const roomMultiplier = 400; // Per room hardware + cabling
        const featureMultipliers: any = {
            lighting: 1.2,
            heating: 1.15,
            blinds: 1.25,
            audio: 1.4,
            security: 1.3
        };
        const levelMultipliers: any = {
            base: 1,
            comfort: 1.5,
            premium: 2.2
        };

        let total = basePrice + (rooms * roomMultiplier);

        let multiplier = features.reduce((acc, f) => acc * (featureMultipliers[f] || 1), 1);
        multiplier *= levelMultipliers[level];

        return Math.round(total * multiplier);
    }, [rooms, features, level]);

    const featureList = [
        { id: 'lighting', icon: Lightbulb },
        { id: 'heating', icon: Thermometer },
        { id: 'blinds', icon: Blinds },
        { id: 'audio', icon: Music },
        { id: 'security', icon: ShieldCheck },
    ];

    const currentStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-apple-blue/10 flex items-center justify-center text-apple-blue">
                                <Home size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('steps.rooms')}</h3>
                                <p className="text-sm text-foreground/40">{t('steps.roomsDesc')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => { setRooms(num); setStep(2); }}
                                    className={`py-4 rounded-2xl border transition-all ${rooms === num
                                        ? "bg-apple-blue text-white border-apple-blue shadow-lg shadow-apple-blue/20"
                                        : "glass border-foreground/10 hover:border-apple-blue/50"
                                        }`}
                                >
                                    <span className="text-2xl font-bold">{num}</span>
                                    <span className="block text-xs uppercase opacity-60">
                                        {t('roomLabel')}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-apple-blue/10 flex items-center justify-center text-apple-blue">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('steps.features')}</h3>
                                <p className="text-sm text-foreground/40">{t('steps.featuresDesc')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {featureList.map((f) => {
                                const Icon = f.icon;
                                const isSelected = features.includes(f.id);
                                return (
                                    <button
                                        key={f.id}
                                        onClick={() => toggleFeature(f.id)}
                                        className={`p-6 rounded-2xl border transition-all flex items-center gap-4 text-left ${isSelected
                                            ? "bg-apple-blue/10 border-apple-blue text-apple-blue"
                                            : "glass border-foreground/10 hover:border-apple-blue/50"
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-apple-blue text-white" : "bg-foreground/5"}`}>
                                            <Icon size={20} />
                                        </div>
                                        <span className="font-bold">{t(`features.${f.id}`)}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pt-6 flex justify-between">
                            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-foreground/40 hover:text-foreground">
                                <ChevronLeft size={20} />
                                {t('back')}
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="bg-apple-blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors"
                            >
                                {t('continue')}
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8 text-center"
                    >
                        <div className="max-w-md mx-auto p-1 bg-foreground/5 rounded-2xl flex mb-12">
                            {(['base', 'comfort', 'premium'] as const).map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLevel(l)}
                                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${level === l ? "bg-white text-apple-blue shadow-lg" : "text-foreground/40 hover:text-foreground"
                                        }`}
                                >
                                    {t(`levels.${l}`)}
                                </button>
                            ))}
                        </div>

                        <div className="py-12 glass rounded-[2.5rem] border border-apple-blue/20 bg-apple-blue/[0.02] relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-foreground/40 uppercase tracking-widest font-bold text-sm mb-2">
                                    {t('estimateTitle')}
                                </h4>
                                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-b from-apple-blue to-blue-600 bg-clip-text text-transparent mb-4">
                                    €{estimate.toLocaleString()}
                                </div>
                                <p className="text-foreground/40 text-xs px-8 max-w-sm mx-auto">
                                    {t('estimateNote')}
                                </p>
                            </div>

                            {/* Decorative background for the result */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-apple-blue/10 blur-[100px] pointer-events-none" />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setStep(1)}
                                className="glass px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                            >
                                <RefreshCcw size={20} />
                                {t('restart')}
                            </button>
                            <Link
                                href="/#kontakt"
                                className="bg-apple-blue text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-apple-blue/20"
                            >
                                {t('getProposal')}
                                <ChevronRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <section className="py-24 relative overflow-hidden" id="kalkulator">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex p-3 rounded-2xl bg-apple-blue/10 text-apple-blue mb-6"
                    >
                        <Calculator size={32} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        {t('title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground/60"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="glass p-8 md:p-12 rounded-[3rem] border border-foreground/10 relative">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-center gap-3 mb-12">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-300 ${step === s ? "w-12 bg-apple-blue" : "w-1.5 bg-foreground/10"
                                    }`}
                            />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {currentStep()}
                    </AnimatePresence>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-apple-blue/10 blur-[150px] -z-10" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8BC53F]/10 blur-[120px] -z-10" />
        </section>
    );
}

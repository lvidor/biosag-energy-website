/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ClipboardList, Cable, Settings, PlayCircle, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProcessSteps() {
    const t = useTranslations('ProcessSteps');

    const steps = [
        {
            title: t('step1.title'),
            description: t('step1.description'),
            icon: ClipboardList
        },
        {
            title: t('step2.title'),
            description: t('step2.description'),
            icon: Cable
        },
        {
            title: t('step3.title'),
            description: t('step3.description'),
            icon: Settings
        },
        {
            title: t('step4.title'),
            description: t('step4.description'),
            icon: PlayCircle
        },
        {
            title: t('step5.title'),
            description: t('step5.description'),
            icon: TrendingUp
        }
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8BC53F]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0066CC]/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-0 w-full h-1 bg-gradient-to-r from-[#8BC53F]/20 to-[#0066CC]/20 rounded-full" />

                    {/* Connecting Line (Mobile) */}
                    <div className="md:hidden absolute left-[28px] top-0 h-full w-1 bg-gradient-to-b from-[#8BC53F]/20 to-[#0066CC]/20 rounded-full" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative flex flex-col md:items-center md:text-center pl-20 md:pl-0"
                            >
                                {/* Icon Bubble */}
                                <div className="absolute left-0 top-0 md:static md:mb-6 w-14 h-14 md:w-32 md:h-32 rounded-2xl md:rounded-full bg-background border-4 border-background shadow-lg flex items-center justify-center z-10 group hover:scale-110 transition-transform duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#8BC53F]/10 to-[#0066CC]/10 rounded-2xl md:rounded-full" />
                                    <step.icon className="w-6 h-6 md:w-12 md:h-12 text-[#8BC53F]" />

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-2 -right-2 md:top-0 md:right-0 w-6 h-6 md:w-8 md:h-8 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-md">
                                        {index + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

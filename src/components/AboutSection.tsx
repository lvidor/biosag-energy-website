"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { PortableText } from "@portabletext/react";

interface AboutSectionProps {
    title?: string;
    subtitle?: string;
    description?: any; // Portable Text blocks
    stats?: { number: string; label: string }[];
}

export function AboutSection({
    title,
    subtitle,
    description,
    stats
}: AboutSectionProps) {
    const t = useTranslations('About');

    const defaultStats = [
        { number: "2016", label: t('stats.founded') },
        { number: "100+", label: t('stats.projects') },
        { number: "Loxone", label: t('stats.partner') },
    ];

    const features = [
        {
            icon: CheckCircle2,
            title: t('features.installation.title'),
            description: t('features.installation.description')
        },
        {
            icon: Award,
            title: t('features.partner.title'),
            description: t('features.partner.description')
        },
        {
            icon: Users,
            title: t('features.team.title'),
            description: t('features.team.description')
        },
        {
            icon: Zap,
            title: t('features.support.title'),
            description: t('features.support.description')
        },
    ];

    const displayTitle = title || t('title');
    const displaySubtitle = subtitle || t('subtitle');
    const displayDescription = description || t.raw('description');
    const displayStats = stats || defaultStats;

    return (
        <section id="o-nama" className="py-24 bg-gradient-to-b from-background to-apple-gray dark:to-apple-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                        {displayTitle}
                    </h2>
                    <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                        {displaySubtitle}
                    </p>
                </motion.div>

                {/* Main Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="max-w-4xl mx-auto mb-16 prose prose-lg prose-invert"
                >
                    {Array.isArray(displayDescription) && displayDescription.length > 0 && typeof displayDescription[0] === 'object' ? (
                        // Portable Text blocks from Sanity
                        <div className="text-lg text-foreground/80 leading-relaxed">
                            <PortableText value={displayDescription} />
                        </div>
                    ) : Array.isArray(displayDescription) ? (
                        // Plain string array (i18n fallback)
                        displayDescription.map((paragraph: string, index: number) => (
                            <p key={index} className="text-lg text-foreground/80 leading-relaxed mb-6">
                                {paragraph}
                            </p>
                        ))
                    ) : displayDescription ? (
                        // Single string
                        <p className="text-lg text-foreground/80 leading-relaxed">{displayDescription}</p>
                    ) : null}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
                >
                    {displayStats.map((stat: any, index: number) => (
                        <div key={index} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-foreground/10">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-foreground/70">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 1.2, delay: 0.1 * index }}
                            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-foreground/10 hover:border-[#8BC53F]/50 transition-all"
                        >
                            <feature.icon className="w-12 h-12 text-[#8BC53F] mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-foreground/70">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}

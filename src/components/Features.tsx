"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import * as LucideIcons from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface Feature {
    _id: string;
    title: string;
    titleHu?: string;
    description: string;
    descriptionHu?: string;
    icon?: string;
    image?: any;
}

interface FeaturesProps {
    features: Feature[];
}

export function Features({ features }: FeaturesProps) {
    const t = useTranslations('Features');
    const locale = useLocale();

    if (!features || features.length === 0) {
        return null;
    }

    return (
        <section id="usluge" className="py-24 bg-gradient-to-b from-background to-apple-gray dark:to-apple-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon && (LucideIcons as any)[feature.icon];
                        const title = locale === 'hu' && feature.titleHu ? feature.titleHu : feature.title;
                        const description = locale === 'hu' && feature.descriptionHu ? feature.descriptionHu : feature.description;

                        return (
                            <motion.div
                                key={feature._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="group relative bg-white/5 backdrop-blur-sm border border-foreground/10 rounded-3xl p-8 hover:border-[#8BC53F]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#8BC53F]/10"
                            >
                                {/* Icon or Image */}
                                <div className="mb-6">
                                    {feature.image ? (
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                            <img
                                                src={urlFor(feature.image).width(64).height(64).url()}
                                                alt={title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : IconComponent ? (
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8BC53F]/20 to-[#0066CC]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                            <IconComponent className="w-8 h-8 text-[#8BC53F]" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8BC53F]/20 to-[#0066CC]/20" />
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-[#8BC53F] transition-colors duration-300">
                                    {title}
                                </h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    {typeof description === 'string' ? description : ''}
                                </p>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8BC53F]/5 to-[#0066CC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

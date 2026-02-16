"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface TestimonialsSectionProps {
    testimonials: any[];
    locale: string;
}

export function TestimonialsSection({ testimonials, locale }: TestimonialsSectionProps) {
    const t = useTranslations('Testimonials');

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        {t('title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground/60 max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-3xl border border-foreground/10 relative group"
                        >
                            <Quote className="absolute top-6 right-8 text-apple-blue/10 w-12 h-12 group-hover:text-apple-blue/20 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < (testimonial.rating || 5) ? "fill-apple-blue text-apple-blue" : "text-foreground/10"}
                                    />
                                ))}
                            </div>

                            <p className="text-foreground/80 italic mb-8 relative z-10">
                                "{locale === 'hu' ? (testimonial.quoteHu || testimonial.quote) : testimonial.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                {testimonial.image && (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-apple-blue/20">
                                        <Image
                                            src={urlFor(testimonial.image).url()}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                    {testimonial.company && (
                                        <p className="text-xs text-foreground/40 uppercase tracking-wider">
                                            {testimonial.company}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

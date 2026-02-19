"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    category?: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
    const t = useTranslations('FAQ');
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("Opšte");

    const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category).filter((c): c is string => c !== undefined)))];

    const filteredFAQs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // JSON-LD for FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": filteredFAQs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-24 bg-gradient-to-b from-background to-apple-gray dark:to-apple-dark">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-foreground/70">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8BC53F] focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-[#8BC53F] to-[#0066CC] text-white'
                                    : 'bg-white/5 text-foreground/70 hover:bg-white/10'
                                    }`}
                            >
                                {category === 'all' ? t('categories.all') : t(`categories.${category}`)}
                            </button>
                        ))}
                    </div>
                )}

                {/* FAQ List */}
                <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                        <motion.div
                            key={faq._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white/5 backdrop-blur-sm border border-foreground/10 rounded-2xl overflow-hidden hover:border-[#8BC53F]/30 transition-all"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-semibold pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`flex-shrink-0 text-[#8BC53F] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    size={20}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-4 text-foreground/70">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {filteredFAQs.length === 0 && (
                    <div className="text-center py-12 text-foreground/50">
                        {t('noResults')}
                    </div>
                )}

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="mt-12 text-center p-8 bg-gradient-to-br from-green-400/10 to-blue-400/10 border border-[#8BC53F]/20 rounded-2xl"
                >
                    <h3 className="text-2xl font-bold mb-2">{t('cta.title')}</h3>
                    <p className="text-foreground/70 mb-4">
                        {t('cta.subtitle')}
                    </p>
                    <a
                        href="#kontakt"
                        className="inline-block bg-gradient-to-r from-[#8BC53F] to-[#0066CC] text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all"
                    >
                        {t('cta.button')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

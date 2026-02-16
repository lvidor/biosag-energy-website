"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BlogCard } from "./BlogCard";
import { ArrowRight } from "lucide-react";
import { Link } from "@/navigation";

interface BlogSectionProps {
    posts: any[];
    locale: string;
}

export function BlogSection({ posts, locale }: BlogSectionProps) {
    const t = useTranslations('Blog');

    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden bg-foreground/[0.02]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            {t('title')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-foreground/60"
                        >
                            {t('subtitle')}
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-apple-blue font-bold hover:underline group"
                        >
                            {t('categories.all') || 'Mutass mindent'}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(0, 3).map((post) => (
                        <BlogCard key={post._id} post={post} locale={locale} />
                    ))}
                </div>
            </div>
        </section>
    );
}

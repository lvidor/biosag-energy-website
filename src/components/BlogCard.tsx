"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogCardProps {
    post: any;
    locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
    const t = useTranslations('Blog');
    const date = new Date(post.publishedAt || post._createdAt).toLocaleDateString(
        locale === 'hu' ? 'hu-HU' : 'sr-RS',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
        >
            <Link href={`/blog/${post.slug.current}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl glass border border-foreground/10 group-hover:border-apple-blue/50 transition-all duration-500">
                    {post.mainImage && (
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-xs text-apple-blue font-bold uppercase tracking-wider mb-2">
                            <span>{t(`categories.${post.category}`)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-1">
                    <div className="flex items-center gap-2 text-xs text-foreground/40 mb-2">
                        <Calendar size={12} />
                        <span>{date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-apple-blue transition-colors mb-2 line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                        {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-apple-blue group-hover:gap-3 transition-all">
                        {t('readMore')}
                        <ArrowRight size={16} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

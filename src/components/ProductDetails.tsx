"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";
import { Check, ArrowLeft, Send, ShoppingCart } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

interface ProductDetailsProps {
    product: any;
    locale: string;
}

export function ProductDetails({ product, locale }: ProductDetailsProps) {
    const t = useTranslations('Shop');
    const addItem = useCartStore((state) => state.addItem);
    const [selectedImage, setSelectedImage] = useState(product.mainImage);

    const title = locale === 'hu' ? (product.titleHu || product.title) : product.title;
    const description = locale === 'hu' ? (product.descriptionHu || product.description) : product.description;

    const gallery = [product.mainImage, ...(product.gallery || [])].filter(Boolean);

    const handleAddToCart = () => {
        addItem(product);
    };

    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-foreground/60 hover:text-apple-blue transition-colors mb-8"
                >
                    <ArrowLeft size={18} />
                    {t('categories.all')}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Media Section */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square rounded-3xl overflow-hidden glass border border-foreground/10 flex items-center justify-center p-8"
                        >
                            <Image
                                src={urlFor(selectedImage).url()}
                                alt={title}
                                fill
                                className="object-contain p-12"
                                priority
                            />
                        </motion.div>

                        {/* Thumbnails */}
                        {gallery.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                                {gallery.map((img: any, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative w-24 h-24 rounded-xl overflow-hidden glass border transition-all shrink-0 ${selectedImage === img ? "border-apple-blue ring-2 ring-apple-blue/20" : "border-foreground/10 hover:border-foreground/30"
                                            }`}
                                    >
                                        <Image
                                            src={urlFor(img).url()}
                                            alt={`${title} thumbnail ${i}`}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="mb-6">
                            <span className="text-sm font-bold text-[#8BC53F] uppercase tracking-widest">
                                {t(`categories.${product.category}`)}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-foreground">
                                {title}
                            </h1>
                            <p className="text-2xl font-semibold text-apple-blue">
                                {product.price || t('priceOnRequest')}
                            </p>
                        </div>

                        <div className="prose prose-invert max-w-none text-foreground/70 mb-10">
                            <p className="whitespace-pre-wrap">{description}</p>
                        </div>

                        {/* Specifications */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Check className="text-[#8BC53F]" />
                                    {t('specifications')}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.specifications.map((spec: any, i: number) => (
                                        <div key={i} className="glass p-4 rounded-2xl border border-foreground/5">
                                            <span className="text-xs text-foreground/40 uppercase block mb-1">
                                                {locale === 'hu' ? (spec.labelHu || spec.label) : spec.label}
                                            </span>
                                            <span className="font-medium">
                                                {locale === 'hu' ? (spec.valueHu || spec.value) : spec.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-8 border-t border-foreground/10 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-apple-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl shadow-apple-blue/20"
                            >
                                <ShoppingCart size={20} />
                                {t('cart')}
                            </button>
                            <Link
                                href="/#kontakt"
                                className="flex-1 glass text-foreground py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
                            >
                                <Send size={20} />
                                {t('inquire')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

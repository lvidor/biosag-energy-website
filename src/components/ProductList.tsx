"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useTranslations } from "next-intl";

interface ProductListProps {
    initialProducts: any[];
}

export function ProductList({ initialProducts }: ProductListProps) {
    const t = useTranslations('Shop');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...Array.from(new Set(initialProducts.map(p => p.category)))];

    const filteredProducts = selectedCategory === 'all'
        ? initialProducts
        : initialProducts.filter(p => p.category === selectedCategory);

    return (
        <div>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                ? "bg-apple-blue text-white shadow-lg shadow-apple-blue/20 scale-105"
                                : "glass text-foreground/70 hover:text-foreground hover:bg-white/10"
                            }`}
                    >
                        {t(`categories.${cat}`)}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-foreground/50">{t('noProducts')}</p>
                </div>
            )}
        </div>
    );
}

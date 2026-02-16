"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";
import { ShoppingCart, Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
    product: any;
}

export function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations('Shop');
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="group"
        >
            <Link href={`/shop/${product.slug.current || product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-foreground/10 hover:border-[#8BC53F]/50 transition-all duration-500">
                    {product.mainImage && (
                        <Image
                            src={urlFor(product.mainImage).url()}
                            alt={product.title}
                            fill
                            className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                            onClick={handleAddToCart}
                            className="bg-apple-blue text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                            aria-label={`Add ${product.title} to cart`}
                        >
                            <Plus size={24} aria-hidden="true" />
                        </button>
                        <div className="bg-white text-black px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                            {t('readMore')}
                        </div>
                    </div>
                </div>
            </Link>

            <div className="mt-4 px-2">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8BC53F] font-bold">
                            {t(`categories.${product.category}`)}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-apple-blue transition-colors line-clamp-1">
                            {product.title}
                        </h3>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-medium text-foreground/80">
                            {product.price || t('priceOnRequest')}
                        </span>
                    </div>
                </div>
                {product.description && (
                    <p className="mt-1 text-sm text-foreground/60 line-clamp-2">
                        {product.description}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

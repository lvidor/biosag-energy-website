"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";

export function CartSidebar() {
    const t = useTranslations('Shop');
    const { items, isOpen, setOpen, removeItem, updateQuantity, clearCart } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-foreground/10 shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-foreground/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-apple-blue" />
                                <h2 className="text-xl font-bold">{t('title')}</h2>
                                <span className="bg-apple-blue/10 text-apple-blue text-xs font-bold px-2 py-1 rounded-full">
                                    {totalItems}
                                </span>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close shopping cart"
                                className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                                    <ShoppingBag size={64} strokeWidth={1} />
                                    <p>{t('noProducts')}</p>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="text-apple-blue font-medium hover:underline"
                                    >
                                        {t('categories.all')}
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item._id} className="flex gap-4 group">
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden glass border border-foreground/10 shrink-0">
                                            <Image
                                                src={urlFor(item.mainImage).url()}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    aria-label={`Remove ${item.title} from cart`}
                                                    className="p-1 text-foreground/40 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} aria-hidden="true" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-[#8BC53F] mb-2">{t(`categories.${item.category}`)}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center glass rounded-lg border border-foreground/10">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        aria-label="Decrease quantity"
                                                        className="p-1 hover:bg-foreground/5 transition-colors"
                                                    >
                                                        <Minus size={14} aria-hidden="true" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium" aria-label={`Quantity: ${item.quantity}`}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        aria-label="Increase quantity"
                                                        className="p-1 hover:bg-foreground/5 transition-colors"
                                                    >
                                                        <Plus size={14} aria-hidden="true" />
                                                    </button>
                                                </div>
                                                <span className="font-semibold text-sm">
                                                    {item.price || t('priceOnRequest')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-foreground/10 space-y-4">
                                <button
                                    onClick={clearCart}
                                    className="text-xs text-foreground/40 hover:text-foreground transition-colors"
                                >
                                    {t('clearCart') || 'Očisti korpu'}
                                </button>
                                <Link
                                    href="/#kontakt"
                                    onClick={() => setOpen(false)}
                                    className="w-full bg-apple-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all hover:scale-[1.02] shadow-xl shadow-apple-blue/20"
                                >
                                    {t('inquire')}
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

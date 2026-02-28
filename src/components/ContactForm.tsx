"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Phone, User, MessageSquare, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/useCartStore";

export function ContactForm() {
    const t = useTranslations('Contact');
    const ct = useTranslations('Shop');
    const cartItems = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    cartItems: cartItems.map(item => ({
                        title: item.title,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Hiba a küldés során');
            }

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error('Error:', error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="kontakt" className="py-24 bg-gradient-to-b from-apple-gray dark:from-apple-dark to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left side - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-foreground/70 mb-12">
                            {t('subtitle')}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#8BC53F]/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-[#8BC53F]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{t('info.phone')}</h3>
                                    <a href="tel:+38163543310" className="text-foreground/70 hover:text-[#8BC53F] transition-colors">
                                        +381 63 543 310
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-400/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{t('info.email')}</h3>
                                    <a href="mailto:vidor.lakatos@biosag-energy.rs" className="text-foreground/70 hover:text-blue-400 transition-colors">
                                        vidor.lakatos@biosag-energy.rs
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-400/10 flex items-center justify-center flex-shrink-0">
                                    <User className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{t('info.address')}</h3>
                                    <p className="text-foreground/70">
                                        Glavna 15<br />
                                        21220 Bečej, Srbija
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-green-400/10 to-blue-400/10 border border-[#8BC53F]/20">
                            <h3 className="font-semibold mb-2">{t('info.hours')}</h3>
                            <p className="text-foreground/70">
                                {t('info.monFri')}: 07:00 - 15:00<br />
                                {t('info.sat')}: {t('info.byAppt')}<br />
                                {t('info.sun')}: {t('info.closed')}
                            </p>
                        </div>

                        {/* Google Maps */}
                        <div className="mt-6 rounded-2xl overflow-hidden border border-foreground/10">
                            <iframe
                                src="https://maps.google.com/maps?q=Glavna%2015%2C%20Be%C4%8Dej%2C%20Srbija&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Biosag Energy Lokacija"
                            />
                        </div>
                    </motion.div>

                    {/* Right side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2 }}
                        className="bg-white/5 backdrop-blur-sm border border-foreground/10 rounded-3xl p-8"
                    >
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <CheckCircle2 className="w-16 h-16 text-[#8BC53F] mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">{t('form.success')}</h3>
                                <p className="text-foreground/70">{t('form.successSub')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        {t('form.name')} *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-background/50 border border-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8BC53F] focus:border-transparent transition-all"
                                            placeholder={t('form.namePlaceholder')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        {t('form.email')} *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-background/50 border border-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8BC53F] focus:border-transparent transition-all"
                                            placeholder={t('form.emailPlaceholder')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                        {t('form.phone')}
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-background/50 border border-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8BC53F] focus:border-transparent transition-all"
                                            placeholder={t('form.phonePlaceholder')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        {t('form.message')} *
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-foreground/40" />
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full pl-12 pr-4 py-3 bg-background/50 border border-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8BC53F] focus:border-transparent transition-all resize-none"
                                            placeholder={t('form.messagePlaceholder')}
                                        />
                                    </div>
                                </div>

                                {/* Cart Summary in Form */}
                                {cartItems.length > 0 && (
                                    <div className="p-6 rounded-2xl bg-apple-blue/5 border border-apple-blue/20">
                                        <div className="flex items-center gap-2 text-apple-blue mb-4">
                                            <ShoppingCart size={18} />
                                            <span className="font-bold text-sm uppercase tracking-wider">{ct('cart')}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {cartItems.map((item) => (
                                                <div key={item._id} className="flex justify-between items-center text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-6 h-6 rounded bg-apple-blue/10 flex items-center justify-center text-[10px] font-bold text-apple-blue">
                                                            {item.quantity}x
                                                        </span>
                                                        <span className="font-medium text-foreground/80">{item.title}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item._id)}
                                                        className="text-foreground/30 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full bg-gradient-to-r from-[#8BC53F] to-[#0066CC] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === "sending" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t('form.sending')}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t('form.send')}
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

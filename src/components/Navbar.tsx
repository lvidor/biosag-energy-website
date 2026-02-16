"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useCartStore } from "@/store/useCartStore";

const CartBadge = () => {
    const items = useCartStore((state) => state.items);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || items.length === 0) return null;

    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <span className="absolute -top-1 -right-1 bg-apple-blue text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-background animate-in zoom-in duration-300">
            {count}
        </span>
    );
};

export function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logo, setLogo] = useState<any>(null);

    const navLinks = [
        { name: t('home'), href: "/" },
        { name: t('services'), href: "#usluge" },
        { name: t('projects'), href: "#projekti" },
        { name: t('shop'), href: "/shop" },
        { name: t('blog'), href: "/blog" },
        { name: t('about'), href: "#o-nama" },
        { name: t('contact'), href: "#kontakt" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const data = await client.fetch(`*[_type == "siteSettings"][0]{ logo }`);
                if (data?.logo?.asset) {
                    setLogo(data.logo);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };
        fetchLogo();
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            if (pathname !== '/') {
                // If not on home page, let the default Link behavior navigate to home with hash
                setIsOpen(false);
                return;
            }
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsOpen(false);
            }
        }
    };

    const toggleLanguage = () => {
        const newLocale = locale === 'sr' ? 'hu' : 'sr';
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled || isOpen ? "glass" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 text-sm font-medium">
                    {/* Logo */}
                    <Link href="/" className="text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
                        {logo?.asset ? (
                            <Image
                                src={urlFor(logo).url()}
                                alt={logo.alt || "Biosag Energy"}
                                width={120}
                                height={64}
                                className="h-16 w-auto object-contain py-1"
                                priority
                            />
                        ) : (
                            <span className="text-xl font-bold bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                                Biosag Energy
                            </span>
                        )}
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8 text-foreground/80 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-foreground transition-colors cursor-pointer"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <button
                            onClick={toggleLanguage}
                            aria-label={`Switch language from ${locale}`}
                            className="flex items-center gap-1 hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-foreground/5"
                        >
                            <Globe size={16} aria-hidden="true" />
                            <span className="uppercase">{locale}</span>
                        </button>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4 ml-4">
                        <button
                            onClick={() => useCartStore.getState().toggleCart()}
                            aria-label="Open shopping cart"
                            className="relative p-2 hover:bg-foreground/5 rounded-full transition-colors group"
                        >
                            <ShoppingBag size={20} className="group-hover:text-apple-blue transition-colors" aria-hidden="true" />
                            <CartBadge />
                        </button>

                        <a
                            href="tel:+381635433310"
                            className="bg-apple-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-all hover:scale-105"
                        >
                            📞 {t('contact')}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={() => useCartStore.getState().toggleCart()}
                            aria-label="Open shopping cart"
                            className="relative p-2 hover:bg-foreground/5 rounded-full transition-colors group"
                        >
                            <ShoppingBag size={20} aria-hidden="true" />
                            <CartBadge />
                        </button>

                        <button
                            onClick={toggleLanguage}
                            aria-label="Toggle language"
                            className="flex items-center gap-1 hover:text-foreground transition-colors p-2"
                        >
                            <span className="uppercase font-bold">{locale}</span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            className="text-foreground hover:opacity-80 transition-opacity p-2"
                        >
                            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background absolute top-12 left-0 w-full overflow-hidden h-screen"
                    >
                        <div className="flex flex-col px-10 py-8 space-y-6 text-xl font-semibold text-foreground">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block hover:text-apple-blue transition-colors cursor-pointer"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

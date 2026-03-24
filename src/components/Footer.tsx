"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import pkg from '../../package.json';

export function Footer() {
    const t = useTranslations('Footer');

    const footerLinks = {
        [t('categories.services')]: [
            { name: t('links.home-automation'), href: '#usluge' },
            { name: t('links.loxone-systems'), href: '#usluge' },
            { name: t('links.electrical-installations'), href: '#usluge' },
            { name: t('links.video-surveillance'), href: '#usluge' },
            { name: t('links.access-control'), href: '#usluge' },
            { name: t('links.outdoor-automation'), href: '#usluge' }
        ],
        [t('categories.company')]: [
            { name: t('links.about'), href: "#o-nama" },
            { name: t('links.projects'), href: "#projekti" },
            { name: t('links.certificates'), href: "/sertifikati" },
            { name: t('links.contact'), href: "#kontakt" },
        ],
        [t('categories.support')]: [
            { name: t('links.documentation'), href: '#' },
            { name: t('links.maintenance'), href: '#' },
            { name: t('links.warranty'), href: '#' },
            { name: t('links.faq'), href: '#faq' },
        ],
        [t('categories.legal')]: [
            { name: t('links.privacy-policy'), href: '#' },
            { name: t('links.terms-of-use'), href: '#' },
            { name: t('links.iso'), href: '#' },
        ],
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <footer className="bg-apple-gray dark:bg-apple-dark text-foreground/70 text-sm py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 border-b border-foreground/10 pb-8">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-foreground mb-3">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="hover:underline hover:text-foreground transition-colors cursor-pointer"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold text-foreground mb-3">{t('links.contact')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="tel:+38163543310" className="hover:underline hover:text-foreground transition-colors">
                                    📞 +381 63 543 310
                                </a>
                            </li>
                            <li>
                                <a href="mailto:vidor.lakatos@biosag-energy.rs" className="hover:underline hover:text-foreground transition-colors">
                                    ✉️ vidor.lakatos@biosag-energy.rs
                                </a>
                            </li>
                            <li className="text-foreground/60">
                                📍 Glavna 15<br />
                                21220 Bečej, Srbija
                            </li>
                            <li className="text-foreground/60 pt-2">
                                🕒 {useTranslations('Contact')('info.hours')}:<br />
                                {useTranslations('Contact')('info.monFri')}: 07:00 - 15:00<br />
                                {useTranslations('Contact')('info.sat')}: {useTranslations('Contact')('info.byAppt')}<br />
                                {useTranslations('Contact')('info.sun')}: {useTranslations('Contact')('info.closed')}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-xs">
                    <p>Copyright © {new Date().getFullYear()} Biosag Energy DOO Bečej. {t('copyright')}</p>
                    <div className="flex space-x-4 mt-2 md:mt-0 items-center">
                        <span>{t('pib')}: 109648718</span>
                        <span className="text-foreground/20">|</span>
                        <span>{t('mb')}: 21217107</span>
                        <span className="text-foreground/20">|</span>
                        <Link href="#" className="hover:underline">{t('links.privacy-policy')}</Link>
                        <span className="text-foreground/20">|</span>
                        <span
                            title="Website version"
                            className="font-mono text-foreground/30 hover:text-foreground/50 transition-colors select-none"
                        >
                            v{pkg.version}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

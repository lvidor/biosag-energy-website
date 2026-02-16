import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "../animations.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CartSidebar } from "@/components/CartSidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: ["Loxone", "pametna kuća", "automatizacija", "smart home", "Srbija", "Bečej", "solarne elektrane", "električne instalacije", "video nadzor", "Biosag Energy"],
        authors: [{ name: "Biosag Energy" }],
        creator: "Biosag Energy",
        publisher: "Biosag Energy",
        metadataBase: new URL('https://biosag-energy.rs'),
        alternates: {
            canonical: '/',
        },
        openGraph: {
            title: t('ogTitle'),
            description: t('description'),
            url: 'https://biosag-energy.rs',
            siteName: 'Biosag Energy',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Biosag Energy - Loxone Smart Home',
                },
            ],
            locale: locale === 'hu' ? 'hu_HU' : 'sr_RS',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('description'),
            images: ['/og-image.jpg'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    // Ensure that the incoming `locale` is valid
    if (!['sr', 'hu'].includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return (
        <html lang={locale}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "Biosag Energy DOO",
                            "image": "https://biosag-energy.rs/biosag-logo.png",
                            "description": t('description'),
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Glavna 15",
                                "addressLocality": "Bečej",
                                "postalCode": "21220",
                                "addressCountry": "RS"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 45.6167,
                                "longitude": 20.0377
                            },
                            "telephone": "+381635433310",
                            "email": "vidor.lakatos@biosag-energy.rs",
                            "openingHoursSpecification": [
                                {
                                    "@type": "OpeningHoursSpecification",
                                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                    "opens": "07:00",
                                    "closes": "15:00"
                                }
                            ],
                            "priceRange": "€€",
                            "url": "https://biosag-energy.rs",
                            "sameAs": [
                                "https://www.facebook.com/biosagenergy",
                                "https://www.instagram.com/biosagenergy"
                            ]
                        })
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <CartSidebar />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

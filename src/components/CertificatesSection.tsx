"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useTranslations } from "next-intl";

interface Certificate {
    _id: string;
    title: string;
    issuer: string;
    issueDate: string;
    image: any;
    logo?: any;
    description?: string;
    category: string;
    featured: boolean;
}

interface CertificatesSectionProps {
    certificates: Certificate[];
    locale: string;
}

export function CertificatesSection({ certificates, locale }: CertificatesSectionProps) {
    const t = useTranslations('Certificates');
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    if (!certificates || certificates.length === 0) {
        return null;
    }

    // Sortiraj po featured, pa po datumu
    const sortedCerts = [...certificates].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
    });

    return (
        <section id="sertifikati" className="py-20 bg-gradient-to-b from-background to-apple-gray/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedCerts.map((cert) => (
                        <div
                            key={cert._id}
                            className={`group relative bg-white dark:bg-apple-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${cert.featured ? 'ring-2 ring-primary' : ''
                                }`}
                            onClick={() => setSelectedCert(cert)}
                        >
                            {/* Featured Badge */}
                            {cert.featured && (
                                <div className="absolute top-4 right-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    ⭐ {t('featured')}
                                </div>
                            )}

                            {/* Certificate Image */}
                            <div className="relative h-64 bg-gradient-to-br from-apple-gray/50 to-apple-gray/20">
                                {cert.image && (
                                    <Image
                                        src={urlFor(cert.image).width(600).height(400).url()}
                                        alt={cert.title}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Logo */}
                                {cert.logo && (
                                    <div className="mb-4 h-12 relative">
                                        <Image
                                            src={urlFor(cert.logo).width(200).height(80).url()}
                                            alt={cert.issuer}
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>
                                )}

                                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                    {cert.title}
                                </h3>

                                <p className="text-sm text-foreground/60 mb-2">
                                    {t('issuer')}: <span className="font-semibold text-foreground/80">{cert.issuer}</span>
                                </p>

                                {cert.issueDate && (
                                    <p className="text-sm text-foreground/60 mb-3">
                                        {t('date')}: {new Date(cert.issueDate).toLocaleDateString()}
                                    </p>
                                )}

                                {cert.description && (
                                    <p className="text-sm text-foreground/70 line-clamp-2">
                                        {cert.description}
                                    </p>
                                )}

                                {/* Category Badge */}
                                <div className="mt-4">
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                        {t(`categories.${cert.category}`)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for full certificate view */}
                {selectedCert && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                        onClick={() => setSelectedCert(null)}
                    >
                        <div
                            className="relative max-w-4xl w-full bg-white dark:bg-apple-dark rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="relative h-[70vh]">
                                {selectedCert.image && (
                                    <Image
                                        src={urlFor(selectedCert.image).width(1200).height(900).url()}
                                        alt={selectedCert.title}
                                        fill
                                        className="object-contain"
                                    />
                                )}
                            </div>

                            <div className="p-6 border-t border-foreground/10">
                                <h3 className="text-2xl font-bold mb-2">{selectedCert.title}</h3>
                                <p className="text-foreground/70">{t('issuer')}: {selectedCert.issuer}</p>
                                {selectedCert.description && (
                                    <p className="mt-3 text-foreground/80">{selectedCert.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

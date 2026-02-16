"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, User, Tag, ChevronLeft, Play, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface ProjectDetailsProps {
    project: any;
    locale: string;
}

export function ProjectDetails({ project, locale }: ProjectDetailsProps) {
    const t = useTranslations('Projects');
    const [lightboxImage, setLightboxImage] = useState<number | null>(null);

    const nextImage = () => {
        const total = (project.gallery?.length || 0) + (project.videos?.length || 0);
        setLightboxImage((prev) => (prev !== null ? (prev + 1) % total : 0));
    };

    const prevImage = () => {
        const total = (project.gallery?.length || 0) + (project.videos?.length || 0);
        setLightboxImage((prev) => (prev !== null ? (prev - 1 + total) % total : 0));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <Link
                    href="/#projekti"
                    className="inline-flex items-center text-apple-blue hover:underline gap-2 font-medium"
                >
                    <ChevronLeft size={20} />
                    {t('all')}
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-foreground/70 leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={project.mainImage}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />
                        </div>
                    </motion.div>

                    {/* Detailed Description */}
                    {project.fullDescription && (
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="prose prose-lg dark:prose-invert max-w-none"
                        >
                            {/* Simple text rendering as fallback if PortableText is not available */}
                            {Array.isArray(project.fullDescription) ? (
                                project.fullDescription.map((block: any, i: number) => (
                                    <p key={i} className="mb-4">
                                        {block.children?.[0]?.text}
                                    </p>
                                ))
                            ) : null}
                        </motion.section>
                    )}

                    {/* Gallery Grid */}
                    {((project.gallery?.length || 0) + (project.videos?.length || 0)) > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Galerija</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {project.gallery?.map((img: string, i: number) => (
                                    <div
                                        key={i}
                                        className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                                        onClick={() => setLightboxImage(i)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} gallery ${i}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                ))}
                                {project.videos?.map((video: string, i: number) => (
                                    <div
                                        key={`v-${i}`}
                                        className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-black"
                                        onClick={() => setLightboxImage((project.gallery?.length || 0) + i)}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <Play className="text-white fill-current w-12 h-12 opacity-80 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <video src={video} className="w-full h-full object-cover opacity-50" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-apple-gray dark:bg-apple-card-dark p-8 rounded-3xl sticky top-24 shadow-sm border border-black/5 dark:border-white/5"
                    >
                        <h3 className="text-xl font-bold mb-6">Informacije o projektu</h3>

                        <div className="space-y-6">
                            {project.category && (
                                <div className="flex items-start gap-4">
                                    <Tag className="w-5 h-5 text-apple-blue mt-1" />
                                    <div>
                                        <p className="text-sm text-foreground/50">Kategorija</p>
                                        <p className="font-medium">{t(`categories.${project.category}`)}</p>
                                    </div>
                                </div>
                            )}
                            {project.location && (
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-apple-blue mt-1" />
                                    <div>
                                        <p className="text-sm text-foreground/50">Lokacija</p>
                                        <p className="font-medium">{project.location}</p>
                                    </div>
                                </div>
                            )}
                            {project.completionDate && (
                                <div className="flex items-start gap-4">
                                    <Calendar className="w-5 h-5 text-apple-blue mt-1" />
                                    <div>
                                        <p className="text-sm text-foreground/50">Datum završetka</p>
                                        <p className="font-medium">
                                            {new Date(project.completionDate).toLocaleDateString(locale === 'hu' ? 'hu-HU' : 'sr-RS', { month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {project.client && (
                                <div className="flex items-start gap-4">
                                    <User className="w-5 h-5 text-apple-blue mt-1" />
                                    <div>
                                        <p className="text-sm text-foreground/50">Klijent</p>
                                        <p className="font-medium">{project.client}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Features List */}
                        {project.features && project.features.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
                                <h4 className="font-bold mb-4">Tehničke karakteristike</h4>
                                <ul className="space-y-2">
                                    {project.features.map((feat: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:p-12"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-6 right-6 text-white hover:text-apple-blue transition-colors z-50"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-6 text-white hover:text-apple-blue transition-colors z-50"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-6 text-white hover:text-apple-blue transition-colors z-50"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        {lightboxImage < (project.gallery?.length || 0) ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={project.gallery[lightboxImage]}
                                    alt={`${project.title} full view`}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />
                            </div>
                        ) : (
                            <video
                                src={project.videos?.[lightboxImage - (project.gallery?.length || 0)]}
                                controls
                                autoPlay
                                className="max-w-full max-h-full rounded-lg"
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

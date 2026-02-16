"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface Project {
    _id: string;
    title: string;
    slug: any;
    description: string;
    category: string;
    mainImage?: any;
    gallery?: any[];
    videos?: any[];
    videoLinks?: Array<{ url: string; title?: string }>;
    location?: string;
    completionDate?: string;
}

interface ProjectsGalleryProps {
    projects: Project[];
    locale: string;
}

export function ProjectsGallery({ projects, locale }: ProjectsGalleryProps) {
    const t = useTranslations('Projects');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [lightboxImage, setLightboxImage] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    const openLightbox = (project: Project, imageIndex: number = 0) => {
        setSelectedProject(project);
        setLightboxImage(imageIndex);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        setSelectedProject(null);
    };

    const nextImage = () => {
        if (selectedProject && lightboxImage !== null) {
            const totalMedia = (selectedProject.gallery?.length || 0) + (selectedProject.videos?.length || 0);
            setLightboxImage((lightboxImage + 1) % totalMedia);
        }
    };

    const prevImage = () => {
        if (selectedProject && lightboxImage !== null) {
            const totalMedia = (selectedProject.gallery?.length || 0) + (selectedProject.videos?.length || 0);
            setLightboxImage((lightboxImage - 1 + totalMedia) % totalMedia);
        }
    };

    return (
        <section id="projekti" className="py-24 bg-gradient-to-b from-apple-gray dark:from-apple-dark to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                ? 'bg-gradient-to-r from-[#8BC53F] to-[#0066CC] text-white'
                                : 'bg-white/5 text-foreground/70 hover:bg-white/10'
                                }`}
                        >
                            {category === 'all' ? t('all') : t(`categories.${category}`)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/projekti/${project.slug.current || project.slug}`}
                                className="block group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-foreground/10 hover:border-[#8BC53F]/50 transition-all h-full">
                                    {project.mainImage && (
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={project.mainImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="text-xs text-[#8BC53F] font-medium mb-2">
                                            {t(`categories.${project.category}`)}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                        <p className="text-foreground/70 text-sm line-clamp-2">{project.description}</p>
                                        <div className="mt-4 flex justify-between items-center">
                                            {project.location && (
                                                <p className="text-foreground/50 text-xs">📍 {t('location')}: {project.location}</p>
                                            )}
                                            <span className="text-[#8BC53F] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                {t('readMore')} →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12 text-foreground/50">
                        {t('noResults')}
                    </div>
                )}

                {/* Lightbox */}
                <AnimatePresence>
                    {lightboxImage !== null && selectedProject && selectedProject.gallery && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                            onClick={closeLightbox}
                        >
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 text-white hover:text-[#8BC53F] transition-colors"
                            >
                                <X size={32} />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 text-white hover:text-[#8BC53F] transition-colors"
                            >
                                <ChevronLeft size={48} />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 text-white hover:text-[#8BC53F] transition-colors"
                            >
                                <ChevronRight size={48} />
                            </button>

                            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                                {selectedProject.gallery && selectedProject.gallery[lightboxImage] ? (
                                    <div className="relative w-full h-[80vh]">
                                        <Image
                                            src={selectedProject.gallery[lightboxImage]}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-contain rounded-lg"
                                            sizes="100vw"
                                            priority
                                        />
                                    </div>
                                ) : selectedProject.videos && selectedProject.videos[lightboxImage - (selectedProject.gallery?.length || 0)] ? (
                                    <video
                                        src={selectedProject.videos[lightboxImage - (selectedProject.gallery?.length || 0)]}
                                        controls
                                        className="w-full h-auto max-h-[80vh] rounded-lg"
                                        autoPlay
                                    />
                                ) : null}
                                <div className="text-white text-center mt-4">
                                    <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                                    <p className="text-white/70">{selectedProject.description}</p>
                                    <p className="text-sm text-white/50 mt-2">
                                        {lightboxImage + 1} / {((selectedProject.gallery?.length || 0) + (selectedProject.videos?.length || 0))}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

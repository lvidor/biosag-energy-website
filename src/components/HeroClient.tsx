"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export function HeroClient({ data }: { data: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background with parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 bg-gradient-to-b from-background to-apple-gray dark:from-background dark:to-apple-dark"
            >
                {data?.backgroundImage && (
                    // Use Next/Image instead of CSS background-image so the browser
                    // can preload it and it counts as an optimised LCP candidate.
                    <div className="absolute inset-0 opacity-30 overflow-hidden">
                        <Image
                            src={urlFor(data.backgroundImage).width(1920).quality(80).url()}
                            alt="Biosag Energy hero background"
                            fill
                            className="object-cover"
                            priority
                            loading="eager"
                            sizes="100vw"
                        />
                    </div>
                )}
            </motion.div>

            <div className="z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[#8BC53F] via-[#5da832] to-[#0066CC]"
                >
                    {data?.title || "Biosag Energy"}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="text-2xl md:text-3xl font-medium text-foreground/80 mb-10"
                >
                    {data?.subtitle || "Smart Automation for Your Home & Business"}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    <a href="#kontakt" className="bg-gradient-to-r from-[#8BC53F] to-[#5da832] text-white rounded-full px-8 py-3 text-lg font-medium hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#8BC53F]/30">
                        {data?.cta || "Kontakt"}
                    </a>
                </motion.div>
            </div>

            {/* Decorative gradient orb */}
            <div
                className="absolute bottom-0 w-full h-[50vh] z-0 pointer-events-none opacity-50"
            >
                <div className="w-[700px] h-[700px] rounded-full absolute bottom-[-350px] left-1/2 -translate-x-1/2 transform-gpu will-change-transform" style={{ background: 'radial-gradient(circle, rgba(139, 197, 63, 0.2) 0%, transparent 70%)' }} />
            </div>
        </section>
    );
}

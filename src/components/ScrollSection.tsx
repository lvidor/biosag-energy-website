"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function ScrollSection({ children, className, delay = 0 }: ScrollSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={cn("py-24 md:py-32 px-4 max-w-7xl mx-auto", className)}
        >
            {children}
        </motion.section>
    );
}

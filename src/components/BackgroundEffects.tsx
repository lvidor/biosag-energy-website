"use client";

import { useEffect, useState } from "react";

export function BackgroundEffects() {
    const [particles, setParticles] = useState<Array<{ id: number; size: number; left: string; top: string; delay: number }>>([]);

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            size: Math.random() * 120 + 60,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 25,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8BC53F]/5 via-[#0066CC]/5 to-[#E30613]/5 animate-gradient" />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Floating particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: particle.left,
                        top: particle.top,
                        animationDelay: `${particle.delay}s`,
                        background: `radial-gradient(circle, rgba(139, 197, 63, ${Math.random() * 0.2 + 0.1}) 0%, transparent 70%)`,
                    }}
                />
            ))}

            {/* Large gradient orbs - Brand colors */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8BC53F]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#0066CC]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#E30613]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />

            {/* Diagonal light beams */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#8BC53F]/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#0066CC]/5 to-transparent" />
        </div>
    );
}

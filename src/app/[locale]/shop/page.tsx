import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { getTranslations } from "next-intl/server";

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Shop');

    const isHu = locale === 'hu';

    return (
        <main className="min-h-screen bg-background selection:bg-apple-blue/30 overflow-x-hidden">
            <BackgroundEffects />
            <Navbar />

            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative z-10">
                {/* Icon */}
                <div className="mb-8 w-24 h-24 rounded-full bg-gradient-to-br from-[#8BC53F]/20 to-[#0066CC]/20 flex items-center justify-center border border-[#8BC53F]/30">
                    <span className="text-5xl">🛒</span>
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] bg-clip-text text-transparent">
                    {isHu ? 'Hamarosan' : 'Uskoro'}
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-foreground/60 max-w-lg mb-10">
                    {isHu
                        ? 'Online áruházunk hamarosan megnyílik. Addig is lépjen kapcsolatba velünk!'
                        : 'Naša online prodavnica uskoro otvara vrata. Do tada, kontaktirajte nas!'}
                </p>

                {/* CTA */}
                <a
                    href={isHu ? '/hu#kontakt' : '/sr#kontakt'}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-[#8BC53F]/30 hover:scale-105 transition-all duration-300"
                >
                    {isHu ? '📞 Kapcsolatfelvétel' : '📞 Kontaktirajte nas'}
                </a>

                {/* Back to home */}
                <a
                    href={isHu ? '/hu' : '/sr'}
                    className="mt-6 text-foreground/50 hover:text-foreground/80 transition-colors text-sm underline underline-offset-4"
                >
                    {isHu ? '← Vissza a főoldalra' : '← Nazad na početnu'}
                </a>
            </div>

            <Footer />
        </main>
    );
}

import { client } from "@/sanity/lib/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { ProductList } from "@/components/ProductList";
import { getTranslations } from "next-intl/server";

async function getProducts() {
    return await client.fetch(`*[_type == "product"] | order(_createdAt desc) {
        _id,
        title,
        titleHu,
        description,
        descriptionHu,
        slug,
        price,
        category,
        mainImage,
        featured
    }`);
}

export default async function ShopPage({ params: { locale } }: { params: { locale: string } }) {
    const products = await getProducts();
    const t = await getTranslations('Shop');

    const localizedProducts = products.map((p: any) => ({
        ...p,
        title: locale === 'hu' ? (p.titleHu || p.title) : p.title,
        description: locale === 'hu' ? (p.descriptionHu || p.description) : p.description
    }));

    return (
        <main className="min-h-screen bg-background selection:bg-apple-blue/30 overflow-x-hidden">
            <BackgroundEffects />
            <Navbar />

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </header>

                <ProductList initialProducts={localizedProducts} />
            </div>

            <Footer />
        </main>
    );
}

import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetails } from "@/components/ProductDetails";
import { getTranslations } from "next-intl/server";

async function getProduct(slug: string, locale: string) {
    return await client.fetch(
        `*[_type == "product" && slug.current == $slug][0] {
            _id,
            title,
            titleHu,
            description,
            descriptionHu,
            slug,
            price,
            category,
            mainImage,
            gallery,
            specifications,
            featured
        }`,
        { slug }
    );
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const product = await getProduct(slug, locale);
    if (!product) return {};

    const title = locale === 'hu' ? (product.titleHu || product.title) : product.title;
    const description = locale === 'hu' ? (product.descriptionHu || product.description) : product.description;

    return {
        title: `${title} | Biosag Energy Shop`,
        description: description,
        openGraph: {
            images: product.mainImage ? [product.mainImage] : [],
        },
    };
}

export default async function ProductPage({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const product = await getProduct(slug, locale);
    if (!product) notFound();

    return (
        <main className="min-h-screen bg-background selection:bg-apple-blue/30 overflow-x-hidden">
            <BackgroundEffects />
            <Navbar />

            <ProductDetails product={product} locale={locale} />

            <Footer />
        </main>
    );
}

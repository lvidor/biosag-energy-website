import { client } from "@/sanity/lib/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { BlogCard } from "@/components/BlogCard";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'Blog' });
    const metaT = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `${t('title')} | Biosag Energy`,
        description: t('subtitle'),
        openGraph: {
            title: `${t('title')} | Biosag Energy`,
            description: t('subtitle'),
            locale: locale === 'hu' ? 'hu_HU' : 'sr_RS',
        }
    };
}

async function getPosts(locale: string) {
    const localized = (field: string) => locale === 'hu' ? `coalesce(${field}Hu, ${field})` : field;

    return await client.fetch(`*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
        _id,
        "title": ${localized('title')},
        "excerpt": ${localized('excerpt')},
        slug,
        mainImage,
        publishedAt,
        _createdAt,
        category
    }`);
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
    const posts = await getPosts(locale);
    const t = await getTranslations('Blog');

    return (
        <main className="min-h-screen bg-background selection:bg-apple-blue/30 overflow-x-hidden">
            <BackgroundEffects />
            <Navbar />

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="mb-16 text-center">
                    <MotionH1
                        className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                    >
                        {t('title')}
                    </MotionH1>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </header>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <BlogCard key={post._id} post={post} locale={locale} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass rounded-3xl border border-foreground/10">
                        <p className="text-xl text-foreground/40">{t('noPosts')}</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

// Special hack for framer motion in server components
function MotionH1({ children, className }: any) {
    return <h1 className={className}>{children}</h1>;
}

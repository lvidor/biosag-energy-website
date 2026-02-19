import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

async function getPost(slug: string, locale: string) {
    const localized = (field: string) => locale === 'hu' ? `coalesce(${field}Hu, ${field})` : field;

    return await client.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
            _id,
            "title": ${localized('title')},
            "body": ${localized('body')},
            mainImage,
            publishedAt,
            _createdAt,
            category,
            slug
        }`,
        { slug }
    );
}

export default async function BlogPostPage({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const post = await getPost(slug, locale);
    const t = await getTranslations('Blog');

    if (!post) notFound();

    const date = new Date(post.publishedAt || post._createdAt).toLocaleDateString(
        locale === 'hu' ? 'hu-HU' : 'sr-RS',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );

    return (
        <main className="min-h-screen bg-background selection:bg-apple-blue/30 overflow-x-hidden">
            <BackgroundEffects />
            <Navbar />

            <article className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-foreground/60 hover:text-apple-blue transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    {t('title')}
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm mb-6">
                        <span className="bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-2">
                            <Tag size={12} />
                            {t(`categories.${post.category}`)}
                        </span>
                        <span className="text-foreground/40 flex items-center gap-2">
                            <Calendar size={14} />
                            {date}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                        {post.title}
                    </h1>
                </header>

                {post.mainImage && (
                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-black/50 border border-foreground/10">
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-apple-blue prose-a:text-apple-blue hover:prose-a:underline">
                    <PortableText value={post.body} />
                </div>
            </article>

            <Footer />
        </main>
    );
}

import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/ProjectDetails";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

interface ProjectPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const localized = (field: string) => locale === 'hu' ? `coalesce(${field}Hu, ${field})` : field;

    const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0] {
        "title": ${localized('title')},
        "description": ${localized('description')},
        "image": mainImage.asset->url
    }`, { slug });

    if (!project) return {};

    return {
        title: `${project.title} | Biosag Energy`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.image ? [{ url: project.image }] : [],
        }
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { locale, slug } = await params;
    const localized = (field: string) => locale === 'hu' ? `coalesce(${field}Hu, ${field})` : field;

    const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0] {
        ...,
        "title": ${localized('title')},
        "description": ${localized('description')},
        "fullDescription": ${localized('fullDescription')},
        "category": ${localized('category')},
        "location": ${localized('location')},
        "features": ${localized('features')},
        "mainImage": mainImage.asset->url,
        "gallery": gallery[].asset->url,
        "videos": videos[].asset->url
    }`, { slug });

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-apple-blue selection:text-white">
            <BackgroundEffects />
            <Navbar />
            <div className="pt-20">
                <ProjectDetails project={project} locale={locale} />
            </div>
            <Footer />
        </main>
    );
}

export async function generateStaticParams() {
    const projects = await client.fetch(`*[_type == "project"] { "slug": slug.current }`);
    const locales = ['sr', 'hu'];

    return locales.flatMap((locale) =>
        projects.map((project: any) => ({
            locale,
            slug: project.slug,
        }))
    );
}

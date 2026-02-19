import { client } from "@/sanity/lib/client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AboutSection } from "@/components/AboutSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { CertificatesSection } from "@/components/CertificatesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BlogSection } from "@/components/BlogSection";
import { SmartHomeEstimator } from "@/components/SmartHomeEstimator";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { getTranslations } from 'next-intl/server';

async function getData(locale: string) {
  const localized = (field: string) => locale === 'hu' ? `coalesce(${field}Hu, ${field})` : field;

  const [hero, features, about, projects, faqs, certificates, testimonials, posts] = await Promise.all([
    client.fetch(`*[_type == "hero"][0]{
      ...,
      "title": ${localized('title')},
      "subtitle": ${localized('subtitle')},
      "cta": ${localized('cta')}
    }`),
    client.fetch(`*[_type == "feature"] | order(order asc){
      ...,
      "title": ${localized('title')},
      "description": ${localized('description')}
    }`),
    client.fetch(`*[_type == "about"][0]{
      "title": ${localized('title')},
      "subtitle": ${localized('subtitle')},
      "description": ${localized('description')},
      yearFounded,
      teamImage,
      "stats": stats[]{
        number,
        "label": ${localized('label')}
      },
      "certifications": certifications[]{
        "name": ${localized('name')},
        logo
      }
    }`),
    client.fetch(`*[_type == "project" && featured == true] | order(_createdAt desc) {
            ...,
            "title": ${localized('title')},
            "description": ${localized('description')},
            "category": ${localized('category')}
        }`),
    client.fetch(`*[_type == "faq"] | order(_createdAt desc){
      ...,
      "question": ${localized('question')},
      "answer": ${localized('answer')},
      "category": ${localized('category')}
    }`),
    client.fetch(`*[_type == "certificate"] | order(_createdAt desc)`),
    client.fetch(`*[_type == "testimonial" && featured == true] | order(_createdAt desc)`),
    client.fetch(`*[_type == "post"] | order(publishedAt desc, _createdAt desc)[0...3] {
            _id,
            "title": ${localized('title')},
            "excerpt": ${localized('excerpt')},
            slug,
            mainImage,
            publishedAt,
            _createdAt,
            category
        }`)
  ]);

  return { hero, features, about, projects, faqs, certificates, testimonials, posts };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await getData(locale);
  const t = await getTranslations('Hero');

  return (
    <main className="relative">
      <BackgroundEffects />
      <Navbar />

      <Hero {...data.hero} />
      <Features features={data.features} />
      <AboutSection
        title={data.about?.title}
        subtitle={data.about?.subtitle}
        description={data.about?.description}
        stats={data.about?.stats}
      />
      <ProcessSteps />

      <ProjectsGallery projects={data.projects} locale={locale} />
      <TestimonialsSection testimonials={data.testimonials} locale={locale} />
      <BlogSection posts={data.posts} locale={locale} />

      <CertificatesSection certificates={data.certificates} locale={locale} />
      <SmartHomeEstimator />
      <FAQSection faqs={data.faqs} />
      <ContactSection />

      <Footer />
    </main>
  );
}

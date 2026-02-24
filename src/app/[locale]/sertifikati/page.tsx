import { client } from "@/sanity/lib/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CertificatesSection } from "@/components/CertificatesSection";
import { getTranslations } from "next-intl/server";

export const metadata = {
    title: "Sertifikati i Licence | Biosag Energy",
    description: "Zvanični sertifikati i licence kompanije Biosag Energy.",
};

export default async function SertifikatiPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const certificates = await client.fetch(`*[_type == "certificate"] | order(_createdAt desc) {
      ...,
      "pdfUrl": pdfDocument.asset->url
  }`);

    return (
        <main className="min-h-screen flex flex-col pt-20">
            <Navbar />

            <div className="flex-grow">
                {certificates && certificates.length > 0 ? (
                    <CertificatesSection certificates={certificates} locale={locale} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Sertifikati i Licence
                        </h1>
                        <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
                            Ova stranica je u pripremi. Uskoro ćemo dodati naše zvanične sertifikate.
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#8BC53F] to-[#0066CC] rounded-full mx-auto opacity-50"></div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

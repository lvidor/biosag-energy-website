import { client } from "@/sanity/lib/client";
import { NavbarClient } from "./NavbarClient";

async function getLogoUrl() {
    try {
        const data = await client.fetch(`*[_type == "siteSettings"][0]{ logo }`);
        if (data?.logo?.asset?._ref) {
            const ref: string = data.logo.asset._ref;
            // Convert Sanity asset ref to CDN URL
            // Format: image-{id}-{dimensions}-{format}
            const [, id, dimensions, format] = ref.split("-");
            return `https://cdn.sanity.io/images/beba1xg7/production/${id}-${dimensions}.${format}`;
        }
    } catch (e) {
        console.error("Failed to fetch logo for Navbar:", e);
    }
    return "/logo-transparent.png";
}

export async function Navbar() {
    const initialLogoUrl = await getLogoUrl();
    return <NavbarClient initialLogoUrl={initialLogoUrl} />;
}

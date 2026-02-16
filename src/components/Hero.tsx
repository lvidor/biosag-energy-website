import { client } from "@/sanity/lib/client";
import { HeroClient } from "./HeroClient";

interface HeroProps {
    title: string;
    subtitle: string;
    cta: string;
    backgroundImage?: any;
}

export function Hero({ title, subtitle, cta, backgroundImage }: HeroProps) {
    return <HeroClient data={{ title, subtitle, cta, backgroundImage }} />;
}

import type { Metadata } from "next";
import { BiosagConfigurator } from "@/components/BiosagConfigurator";

export const metadata: Metadata = {
  title: "Konfigurator | Biosag Energy",
  description: "Konfigurišite vaš pametni dom, solarnu elektranu ili video nadzor i dobijte okvirnu procenu investicije.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdvisorPage() {
  return <BiosagConfigurator />;
}

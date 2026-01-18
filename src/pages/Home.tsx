import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import BenefitsSection from "@/pages/home/BenefitsSection";
import FinalCtaSection from "@/pages/home/FinalCtaSection";
import HomeHero from "@/pages/home/HomeHero";
import HowItWorksSection from "@/pages/home/HowItWorksSection";
import SocialProofSection from "@/pages/home/SocialProofSection";

export default function Home() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-[#0B1020] dark:text-slate-100">
      <SiteHeader />

      <main>
        <HomeHero />
        <BenefitsSection />
        <SocialProofSection />
        <HowItWorksSection />
        <FinalCtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}

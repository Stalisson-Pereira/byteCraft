import { Code2, Globe2, MessageSquare, Shield, Sparkles, Zap } from "lucide-react";

import Container from "@/components/Container";
import FeatureCard from "@/pages/home/FeatureCard";
import SectionHeading from "@/pages/home/SectionHeading";

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-slate-50 py-16 dark:bg-[#0B1020]">
      <Container>
        <SectionHeading
          kicker="Benefícios"
          title="Tudo o que uma landing precisa para performar"
          description="Blocos curtos, boa hierarquia, interação sutil e foco total no CTA."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Sparkles}
            title="Visual moderno"
            description="Tema dark com acentos violet/cyan, efeitos discretos e ótima legibilidade."
          />
          <FeatureCard
            icon={Globe2}
            title="Estrutura escaneável"
            description="Seções bem separadas e texto curto para leitura rápida sem cansar."
          />
          <FeatureCard
            icon={Shield}
            title="Consistência"
            description="Tokens de cor e componentes reaproveitáveis para manter o design coeso."
          />
          <FeatureCard
            icon={MessageSquare}
            title="Contato sem fricção"
            description="Formulário simples com validação e envio via mailto, sem backend."
          />
          <FeatureCard
            icon={Code2}
            title="Apego dev"
            description="Cards e padrões inspirados em UI de código para reforçar posicionamento."
          />
          <FeatureCard
            icon={Zap}
            title="Pronto para evoluir"
            description="Você pode conectar um backend depois sem refazer a UI ou as rotas."
          />
        </div>
      </Container>
    </section>
  );
}

import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionNavbar from "@/components/AccordionNavbar";

gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!h1Ref.current) return;
    const split = new SplitType(h1Ref.current, { types: "chars" });
    gsap.from(split.chars, {
      rotationY: -90,
      opacity: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: "back.out(1.4)",
      transformOrigin: "50% 50% -20px",
      delay: 0.5,
    });
    return () => split.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h1 ref={h1Ref} className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium mb-6 leading-tight text-black">
          Manuel Herrera
        </h1>
        <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-4 font-light">
          Impulsando el crecimiento mediante la intersección del diseño estratégico y la automatización inteligente.
        </p>
        <div className="flex items-center justify-center gap-2 text-foreground/40 text-sm mb-10 font-body">
          <MapPin size={14} />
          <span>Ciudad de México, México</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
          <a href="#connect" className="inline-flex items-center justify-center px-10 py-4 bg-black text-white font-heading font-medium rounded-full hover:scale-[1.02] transition-all text-sm shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            Trabajemos Juntos
          </a>
          <a href="#features" className="inline-flex items-center justify-center px-10 py-4 border border-border text-black font-heading font-medium rounded-full hover:bg-secondary transition-all text-sm">
            Explorar
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const Vision = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!h2Ref.current) return;
    const split = new SplitType(h2Ref.current, { types: "chars" });
    gsap.from(split.chars, {
      rotationY: -90,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "back.out(1.4)",
      transformOrigin: "50% 50% -20px",
      scrollTrigger: {
        trigger: h2Ref.current,
        start: "top 85%",
      }
    });
    return () => split.revert();
  }, []);

  return (
    <section id="about" className="py-32 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-10 tracking-tight text-black">Mi Visión</h2>
          <div className="space-y-8 max-w-2xl">
            <p className="text-black/80 leading-relaxed text-xl font-light">
              Manuel Herrera es la síntesis de la estrategia comercial y el algoritmo creativo. Creo firmemente que el futuro de las marcas reside en la integración fluida de la intuición humana con la precisión de la IA.
            </p>
            <p className="text-black/60 leading-relaxed text-lg font-light">
              Mi misión es ayudar a las empresas a escalar mediante el branding de alto impacto y sistemas de ventas automatizados que evolucionan con el mercado.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const capabilities = [
  { category: "Estrategia de Ventas", items: ["Funnels de IA", "Automatización CRM", "Lead Generation", "Revenue Ops"] },
  { category: "Branding con IA", items: ["Identidad Pro", "Generación de Media", "Diseño Estratégico", "Vibe Coding"] },
  { category: "Soluciones de IA", items: ["Agentes Autónomos", "Workflows Zapier/Make", "Chatbots Avanzados", "Prompt Engineering"] },
  { category: "Marketing Tech", items: ["Google & Meta Ads", "Analítica Predictiva", "A/B Testing Pro", "Email Marketing IA"] },
  { category: "Innovación Creativa", items: ["Copywriting con IA", "Media Dinámica", "Ecosistemas Sociales", "Community Loops"] },
  { category: "Escalamiento GTM", items: ["Go-To-Market Pros", "Retención y Lifecycle", "Alineación de Ventas", "Sistemas de Crecimiento"] },
];

const Capabilities = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!h2Ref.current) return;
    const split = new SplitType(h2Ref.current, { types: "chars" });
    gsap.from(split.chars, {
      rotationY: -90,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "back.out(1.4)",
      transformOrigin: "50% 50% -20px",
      scrollTrigger: {
        trigger: h2Ref.current,
        start: "top 85%",
      }
    });
    return () => split.revert();
  }, []);

  return (
    <section id="features" className="py-24 px-6 bg-secondary/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-4 tracking-tight text-black">Mis Capacidades</h2>
          <p className="text-black/50 font-light text-lg mb-12">Soluciones integrales para la era de la inteligencia artificial.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white border border-border/50 rounded-2xl p-8 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <h3 className="font-heading font-medium text-lg mb-6 group-hover:text-black transition-colors">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-[9px] font-medium px-3 py-1.5 rounded-md bg-secondary text-black/70">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const steps = [
  { title: "Define el Vibe", desc: "Comenzamos descubriendo la esencia central de tu marca y el ritmo de tu industria." },
  { title: "Teje la Estrategia", desc: "Diseñamos un ecosistema personalizado de IA, automatización y activos creativos." },
  { title: "Despliega y Optimiza", desc: "Lanzamos sistemas de alta fidelidad que escalan sin esfuerzo y evolucionan con tus necesidades." },
  { title: "Crecimiento Fluido", desc: "Refinamiento continuo para asegurar que tu presencia digital se mantenga a la vanguardia." },
];

const Process = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!h2Ref.current) return;
    const split = new SplitType(h2Ref.current, { types: "chars" });
    gsap.from(split.chars, {
      rotationY: -90,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "back.out(1.4)",
      transformOrigin: "50% 50% -20px",
      scrollTrigger: {
        trigger: h2Ref.current,
        start: "top 85%",
      }
    });
    return () => split.revert();
  }, []);

  return (
    <section id="process" className="py-32 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-4 tracking-tight text-black">El Proceso</h2>
          <p className="text-black/50 font-light text-lg">Cuatro pasos hacia la excelencia digital.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="text-4xl font-heading font-medium text-black/5 absolute -top-8 -left-2 select-none">0{i + 1}</span>
              <h3 className="font-heading font-medium text-xl mb-4 relative z-10 text-black">{step.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Connect = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!h2Ref.current) return;
    const split = new SplitType(h2Ref.current, { types: "chars" });
    gsap.from(split.chars, {
      rotationY: -90,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "back.out(1.4)",
      transformOrigin: "50% 50% -20px",
      scrollTrigger: {
        trigger: h2Ref.current,
        start: "top 85%",
      }
    });
    return () => split.revert();
  }, []);

  return (
    <section id="connect" className="py-32 px-6 bg-white">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 ref={h2Ref} className="text-5xl md:text-6xl font-heading font-medium mb-8 tracking-tight text-black leading-none">Hablemos Juntos</h2>
          <p className="text-black/60 mb-12 text-xl font-light max-w-xl mx-auto leading-relaxed">
            ¿Listo para manifestar la evolución digital de tu marca? Conectemos y comencemos a tejer tu futuro hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:contacto@manuelherrera.com"
              className="inline-flex items-center justify-center px-12 py-5 bg-black text-white font-heading font-medium rounded-full hover:scale-105 transition-all text-sm shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            >
              Iniciar Proyecto
            </a>
            <a
              href="https://www.linkedin.com/in/manuel-herrera-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-5 border border-border text-black font-heading font-medium rounded-full hover:bg-secondary transition-all text-sm"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border/30 bg-white text-center">
    <p className="text-xs text-black/40 font-light uppercase tracking-[0.2em]">
      © 2026 Manuel Herrera · Forjando el Futuro
    </p>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <AccordionNavbar />
      <Hero />
      <Vision />
      <Capabilities />
      <Process />
      <Connect />
      <Footer />
    </div>
  );
};

export default Index;

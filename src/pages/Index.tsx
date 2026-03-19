import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, FileText } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionNavbar from "@/components/AccordionNavbar";

gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    // Initial setup for the whole page background using the CSS variable
    gsap.set(document.documentElement, { "--color": "#154FD1" });

    if (h1Ref.current) {
      const split = new SplitType(h1Ref.current, { types: "chars" });
      gsap.from(split.chars, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      // Scrubbed Background and Text color transition
      gsap.to(document.documentElement, {
        "--color": "#ffffff", // Transition to White
        ease: "none",
        scrollTrigger: {
          trigger: "#vision-trigger",
          scrub: true,
          start: "top bottom",
          end: "top 20%",
        }
      });

      gsap.to(".dynamic-text", {
        color: "#000000", // Transition to Black
        ease: "none",
        scrollTrigger: {
          trigger: "#vision-trigger",
          scrub: true,
          start: "top bottom",
          end: "top 20%",
        }
      });

      ScrollTrigger.refresh();

      return () => {
        split.revert();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, []);

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <h1 ref={h1Ref} className="text-[12vw] md:text-[15vw] font-heading font-medium mb-12 leading-[0.85] tracking-tighter dynamic-text text-white">
          Soy Manu
        </h1>
        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-12">
          <a href="#connect" className="inline-flex items-center gap-3 justify-center px-12 py-5 bg-white text-black font-heading font-medium rounded-full hover:scale-[1.05] transition-all text-sm shadow-xl group">
            Descargar mi CV
            <FileText size={18} className="text-black/50 group-hover:text-black transition-colors" />
          </a>
        </div>
      </motion.div>
      <div id="vision-trigger" className="absolute bottom-0 w-full h-1" />
    </section>
  );
};

const Mission = () => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    // Split text into words
    const split = new SplitType(textRef.current, { types: "words" });

    // Set initial muted color
    gsap.set(split.words, { color: "rgba(0,0,0,0.1)" });

    // Word-by-word lighting reveal
    gsap.to(split.words, {
      color: "#000000",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      }
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <section id="about" className="py-64 px-6 flex items-center justify-center min-h-[60vh]">
      <div className="container mx-auto max-w-7xl">
        <p
          ref={textRef}
          className="font-heading font-medium text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-center"
        >
          Mi misión es ayudar a las personas a desarrollar su autenticidad y mejorar su productividad
        </p>
      </div>
    </section>
  );
};

const capabilities = [
  { category: "Estrategia de Ventas", items: ["Funnels de IA", "Automatización CRM", "Lead Generation", "Revenue Ops"] },
  { category: "Branding con IA", items: ["Creación de Identidad de Marca", "Generación de Media", "Diseño Estratégico", "Vibe Coding"] },
  { category: "Soluciones de IA", items: ["Agentes Autónomos", "Workflows Zapier/Make", "Chatbots Avanzados", "Prompt Engineering"] },
  { category: "Marketing Tech", items: ["Google & Meta Ads", "Analítica Predictiva", "AB Testing", "Email Marketing IA"] },
  { category: "Innovación Creativa", items: ["Copywriting", "Media Dinámica", "Ecosistemas Sociales", "Community Loops"] },
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
    <section id="features" className="py-64 px-6 bg-transparent">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-4 tracking-tight dynamic-text text-black">Mis Capacidades</h2>
          <p className="dynamic-text text-black/50 font-light text-lg mb-12">Soluciones integrales para la era de la inteligencia artificial.</p>
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
    <section id="process" className="py-64 px-6 bg-transparent">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-4 tracking-tight dynamic-text text-black">El Proceso</h2>
          <p className="dynamic-text text-black/50 font-light text-lg">Cuatro pasos hacia la excelencia digital.</p>
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
    <section id="connect" className="py-64 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 ref={h2Ref} className="text-5xl md:text-6xl font-heading font-medium mb-8 tracking-tight dynamic-text text-black leading-none">Hablemos Juntos</h2>
          <p className="dynamic-text text-black/60 mb-12 text-xl font-light max-w-xl mx-auto leading-relaxed">
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
    <div className="min-h-screen bg-transparent">
      <AccordionNavbar />
      <Hero />
      <Mission />
      <Capabilities />
      <Process />
      <Connect />
      <Footer />
    </div>
  );
};

export default Index;

import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Phone, FileText, Check, Copy } from "lucide-react";
import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionNavbar from "@/components/AccordionNavbar";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
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

      return () => {
        split.revert();
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
        <h1 ref={h1Ref} className="text-[12vw] md:text-[15vw] font-heading font-medium mb-12 leading-[0.85] tracking-tighter dynamic-text">
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

    const split = new SplitType(textRef.current, { types: "words" });
    gsap.set(split.words, { color: "rgba(0,0,0,0.15)" });

    gsap.to(split.words, {
      color: "#000000",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    return () => split.revert();
  }, []);

  return (
    <section id="vision" className="py-64 px-6 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <p
          ref={textRef}
          className="font-heading font-medium text-5xl md:text-7xl lg:text-8xl leading-[2] tracking-tight text-center dynamic-text"
        >
          Mi misión es ayudar a las personas a desarrollar su autenticidad y mejorar su productividad
        </p>
      </div>
    </section>
  );
};

const Focuses = () => {
  const focuses = [
    "Ventas", "Marketing", "Customer Experience", "Funnels",
    "CRM", "Vibe Coding", "Branding", "Automatización con IA"
  ];

  return (
    <section className="py-32 px-6 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-heading font-medium mb-16 text-center dynamic-text">Mis principales enfoques</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {focuses.map((focus, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[30px] border border-border/10 bg-secondary/5 dynamic-text text-center hover:bg-secondary/10 transition-colors flex items-center justify-center font-heading font-medium"
            >
              {focus}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const capabilitiesList = [
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
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-4 tracking-tight dynamic-text">Otras capacidades</h2>
          <p className="dynamic-text opacity-50 font-light text-lg mb-12">Soluciones integrales para la era de la inteligencia artificial.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilitiesList.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <h3 className="font-heading font-medium text-lg mb-6 dynamic-text transition-colors">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-[10px] font-medium px-3 py-1.5 rounded-md bg-white border border-border/10 text-black/70">{item}</span>
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
    <section id="process" className="py-64 px-6 bg-transparent relative">
      <div id="process-trigger" className="absolute top-0 left-0 w-full h-1" />
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-4 tracking-tight dynamic-text">El Proceso</h2>
          <p className="dynamic-text opacity-60 font-light text-lg">Cuatro pasos hacia la excelencia digital.</p>
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
              <span className="text-4xl font-heading font-medium opacity-10 absolute -top-8 -left-2 select-none dynamic-text">0{i + 1}</span>
              <h3 className="font-heading font-medium text-xl mb-4 relative z-10 dynamic-text">{step.title}</h3>
              <p className="dynamic-text opacity-70 text-sm leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactLink = ({ label, value, href, icon: Icon }: any) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <motion.a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={value.includes('http') ? undefined : (e) => { e.preventDefault(); handleCopy(); }}
        className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all border border-border/5 font-heading font-medium text-lg dynamic-text"
      >
        <Icon size={20} className="dynamic-text" />
        {label}
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
      </motion.a>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-xs rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-xl"
          >
            {copied ? "Copiado" : "Copiar"}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConnectingFooter = () => {
  const title = "Hagámoslo";
  const letters = title.split("");

  return (
    <section id="connect" className="py-64 px-6 relative bg-transparent overflow-hidden">
      <div id="connect-trigger" className="absolute top-0 left-0 w-full h-1" />
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-40 gap-12">
          <div className="flex flex-col gap-6 items-center md:items-start">
            <h3 className="text-xs uppercase tracking-[0.3em] font-medium opacity-40 dynamic-text mb-4">Hablemos pronto</h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <ContactLink
                label="LinkedIn"
                value="https://www.linkedin.com/in/manuel-herrera-perfil"
                href="https://www.linkedin.com/in/manuel-herrera-perfil"
                icon={Linkedin}
              />
              <ContactLink
                label="contmanuel77@gmail.com"
                value="contmanuel77@gmail.com"
                href="mailto:contmanuel77@gmail.com"
                icon={Mail}
              />
              <ContactLink
                label="5610168992"
                value="5610168992"
                href="tel:5610168992"
                icon={Phone}
              />
            </div>
          </div>
        </div>

        <div className="relative mt-20 flex justify-center md:justify-end">
          <h2 className="text-[12vw] md:text-[15vw] font-heading font-medium tracking-tighter leading-none dynamic-text select-none flex cursor-default">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -30, color: "#154FD1" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="mt-32 pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs opacity-40 font-light uppercase tracking-[0.2em] dynamic-text">
            © 2026 Manuel Herrera · Forjando el Futuro
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium opacity-30 dynamic-text">
            <span>IA Strategies</span>
            <span>Vibe Design</span>
            <span>Productivity</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  useLayoutEffect(() => {
    // 1. Initial State
    gsap.set(document.documentElement, { "--color": "#154FD1" });
    gsap.set(".dynamic-text", { color: "#ffffff" });

    const doc = document.documentElement;

    // DEFINITIVE COLOR TRIGGERS (Using state-based callbacks for 100% stability)

    // BLUE -> WHITE
    ScrollTrigger.create({
      trigger: "#vision",
      start: "top 80%",
      onEnter: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 1, ease: "power2.inOut" });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1, ease: "power2.inOut" });
      },
      onLeaveBack: () => {
        gsap.to(doc, { "--color": "#154FD1", duration: 1, ease: "power2.inOut" });
        gsap.to(".dynamic-text", { color: "#ffffff", duration: 1, ease: "power2.inOut" });
      }
    });

    // WHITE -> BLACK
    ScrollTrigger.create({
      trigger: "#process",
      start: "top 60%",
      onEnter: () => {
        gsap.to(doc, { "--color": "#000000", duration: 1, ease: "power2.inOut" });
        gsap.to(".dynamic-text", { color: "#ffffff", duration: 1, ease: "power2.inOut" });
      },
      onLeaveBack: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 1, ease: "power2.inOut" });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1, ease: "power2.inOut" });
      }
    });

    // BLACK -> WHITE (Footer)
    ScrollTrigger.create({
      trigger: "#connect",
      start: "top 60%",
      onEnter: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 1, ease: "power2.inOut" });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1, ease: "power2.inOut" });
      },
      onLeaveBack: () => {
        gsap.to(doc, { "--color": "#000000", duration: 1, ease: "power2.inOut" });
        gsap.to(".dynamic-text", { color: "#ffffff", duration: 1, ease: "power2.inOut" });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <AccordionNavbar />
      <Hero />
      <Mission />
      <Focuses />
      <Capabilities />
      <Process />
      <ConnectingFooter />
    </div>
  );
};

export default Index;

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, FileText, Check } from "lucide-react";
import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionNavbar from "@/components/AccordionNavbar";
import StickyProjectGrid from "@/components/StickyProjectGrid";

gsap.registerPlugin(ScrollTrigger);

// Custom Modern LinkedIn Icon (The "In" logo without square container)
const LinkedinModern = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.125 2.062 2.062 0 010 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

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

const experienceData = [
  {
    company: "Miiles Creative Studio",
    duration: "Contrato · 2 años 8 meses",
    roles: [
      {
        title: "Brand Manager",
        period: "Abril 2025 - Febrero 2026 · 11 meses",
        location: "México · Híbrido",
        details: [
          "Estrategia de Marketing con IA y Optimización de Funnels: Planificación y ejecución de funnels de marketing impulsados por IA, estrategias de posicionamiento y sistemas de conversión, integrando análisis de datos, flujos de trabajo de \"vibe coding\" y automatización con IA utilizando herramientas avanzadas como Lovable, Base44, Antigravity, Zapier, y Make.",
          "Posicionamiento de Producto con IA y Storytelling: Desarrollo de estrategias de posicionamiento y marcos narrativos para productos de IA, traduciendo capacidades complejas de IA en propuestas de valor claras a través de storytelling, insights basados en datos y estrategias de marketing enfocadas al crecimiento."
        ]
      },
      {
        title: "Marketing Project Manager",
        period: "Febrero 2024 - Abril 2025 · 1 año 3 meses",
        details: [
          "Gestión de Proyectos y Estrategias Digitales: Planificación y ejecución de estrategias de marketing digital, SEO & SEM, y growth marketing, usando Google Ads, Facebook Ads, y LinkedIn Ads.",
          "Análisis de Datos e Inteligencia de Negocios: Optimización de campañas con Google Analytics, SEMrush, Tableau, y Power BI. Implementación de pruebas A/B y estrategias de conversión.",
          "Contenido y Redes Sociales: Estrategias de marketing de contenidos e influencer marketing en Instagram, LinkedIn, TikTok, y YouTube."
        ],
        skills: "Customer Experience, Media Strategy y +4 habilidades"
      },
      {
        title: "Junior Marketer",
        period: "Julio 2023 - Enero 2024 · 7 meses",
        location: "Remoto",
        details: [
          "Estrategias de Retención: Implementación de flujos automatizados en Klaviyo y ActiveCampaign para aumentar el LTV y reducir el churn rate.",
          "Campañas Outbound: Desarrollo de campañas multicanal usando GoHighLevel e Instantly, optimizando la conversión de leads calificados (SQL).",
          "Entregabilidad: Configuración de registros DMARC, DKIM y TXT para asegurar la entrega en bandeja de entrada."
        ]
      }
    ]
  },
  {
    company: "Fiverr",
    duration: "5 años 7 meses",
    location: "Remoto",
    roles: [
      {
        title: "Digital Specialist",
        period: "Marzo 2020 - Septiembre 2024 · 4 años 7 meses",
        details: [
          "Branding y Estrategia: Creación de identidades visuales alineadas con la propuesta de valor, optimizando el posicionamiento en el mercado.",
          "Multimedia: Creación de contenido visual con Adobe Creative Suite, Figma, y Canva para campañas digitales.",
          "Growth Marketing: Desarrollo de estrategias de contenidos en Instagram, Facebook, LinkedIn, y TikTok."
        ],
        skills: "Digital Marketing Media, Google Analytics y +1 habilidad"
      },
      {
        title: "Branding Freelancer",
        period: "Marzo 2019 - Febrero 2020 · 1 año",
        details: [
          "Localización de Campañas: Adaptación de mensajes y experiencias de usuario para asegurar resonancia cultural en LATAM.",
          "Conciencia Orgánica: Activación de comunidades locales e influencers para aumentar el alcance sin inversión en medios pagados.",
          "Estética Minimalista: Supervisión de contenido narrativo con énfasis en branding emocional y storytelling visual."
        ]
      }
    ]
  },
  {
    company: "BRIX Agency",
    duration: "Jornada completa",
    roles: [
      {
        title: "Product Designer",
        period: "Febrero 2023 - Mayo 2023 · 4 meses",
        location: "Estados Unidos · Remoto",
        details: [
          "Diseño UX/UI: Creación y optimización de interfaces intuitivas en Figma para una experiencia fluida.",
          "Desarrollo Web: Colaboración técnica para asegurar la correcta implementación de diseños.",
          "Investigación: Análisis de usuarios y pruebas de usabilidad para mejorar accesibilidad y conversión."
        ],
        skills: "Customer Experience"
      }
    ]
  },
  {
    company: "Educación",
    roles: [
      {
        title: "Universidad Nacional Autónoma de México",
        period: "Administración, Marketing",
        location: "2022 – Presente",
        details: ["Segundo año académico."],
        skills: "Project Plans, Networking y +2 habilidades"
      }
    ]
  }
];

const Experience = () => {
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
    <section id="experience" className="py-64 px-6 bg-transparent relative">
      <div id="experience-trigger" className="absolute top-0 left-0 w-full h-1" />
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-24">
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-heading font-medium mb-4 tracking-tight dynamic-text text-center">Experiencia</h2>
          <p className="dynamic-text opacity-60 font-light text-lg text-center">Trayectoria profesional y formación académica.</p>
        </motion.div>

        <div className="space-y-32">
          {experienceData.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-white/10 pt-12">
                <div className="md:w-1/3">
                  <h3 className="text-2xl md:text-3xl font-heading font-medium dynamic-text mb-2">{exp.company}</h3>
                  {exp.duration && <p className="dynamic-text opacity-40 text-sm font-light mb-1">{exp.duration}</p>}
                  {exp.location && <p className="dynamic-text opacity-40 text-sm font-light">{exp.location}</p>}
                </div>

                <div className="md:w-2/3 space-y-16">
                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="space-y-6">
                      <div>
                        <h4 className="text-xl font-heading font-medium dynamic-text mb-1">{role.title}</h4>
                        <div className="flex flex-wrap gap-x-4 text-xs opacity-50 dynamic-text font-light">
                          <span>{role.period}</span>
                          {role.location && <span>· {role.location}</span>}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {role.details.map((detail, di) => (
                          <p key={di} className="dynamic-text opacity-70 text-sm leading-relaxed font-light">
                            {detail}
                          </p>
                        ))}
                      </div>

                      {role.skills && (
                        <p className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium dynamic-text opacity-60">
                          {role.skills}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactLink = ({ label, value, href, icon: Icon, showTooltip = true }: any) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    if (!showTooltip) return;
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
        onClick={showTooltip ? (e) => { e.preventDefault(); handleCopy(); } : undefined}
        className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all border border-border/5 font-heading font-medium text-lg dynamic-text"
      >
        <Icon size={20} className="dynamic-text" />
        {label}
        {copied && <Check size={16} className="text-green-500 ml-2" />}
      </motion.a>

      <AnimatePresence>
        {hovered && showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-xs rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-xl"
          >
            <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
            {copied ? "Copiado" : "Copiar"}
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
    <section id="connect" className="pt-64 pb-16 px-6 relative bg-transparent overflow-hidden">
      <div id="connect-trigger" className="absolute top-0 left-0 w-full h-1" />
      <div className="container mx-auto max-w-7xl flex flex-col items-center">

        <div className="flex flex-col gap-6 items-center text-center mb-16">
          <h3 className="text-sm font-medium opacity-60 dynamic-text">Hablemos pronto</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <ContactLink
              label="LinkedIn"
              value="https://www.linkedin.com/in/manuel-herrera-perfil"
              href="https://www.linkedin.com/in/manuel-herrera-perfil"
              icon={LinkedinModern}
              showTooltip={false}
            />
            <ContactLink
              label="contmanuel77@gmail.com"
              value="contmanuel77@gmail.com"
              href="mailto:contmanuel77@gmail.com"
              icon={Mail}
            />
            <ContactLink
              label="+52 5610168992"
              value="+52 5610168992"
              href="tel:+525610168992"
              icon={Phone}
            />
          </div>
        </div>

        <div className="relative flex justify-center w-full">
          <h2 className="text-[12vw] md:text-[15vw] font-heading font-medium tracking-tighter leading-none dynamic-text select-none flex cursor-default justify-center w-full">
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

        <div className="mt-24 pt-12 flex flex-col items-center gap-6 w-full text-center">
          <p className="text-xs opacity-40 font-light uppercase tracking-[0.2em] dynamic-text">
            © 2026 Manuel Herrera
          </p>
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
        gsap.to(doc, { "--color": "#ffffff", duration: 1 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1 });
      },
      onLeaveBack: () => {
        gsap.to(doc, { "--color": "#154FD1", duration: 1 });
        gsap.to(".dynamic-text", { color: "#ffffff", duration: 1 });
      }
    });

    // WHITE -> BLACK (Experience)
    ScrollTrigger.create({
      trigger: "#experience",
      start: "top 60%",
      onEnter: () => {
        gsap.to(doc, { "--color": "#000000", duration: 1 });
        gsap.to(".dynamic-text", { color: "#ffffff", duration: 1 });
      },
      onLeaveBack: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 1 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1 });
      }
    });

    // BLACK -> WHITE (Footer)
    ScrollTrigger.create({
      trigger: "#connect",
      start: "top 60%",
      onEnter: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 1 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1 });
      },
      onLeaveBack: () => {
        gsap.to(doc, { "--color": "#000000", duration: 1 });
        gsap.to(".dynamic-text", { color: "#ffffff", duration: 1 });
      }
    });

    // FINAL FALLBACK: Ensure white at the end of scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "bottom bottom",
      onEnter: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 0.5 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 0.5 });
      }
    });

    // REFRESH AFTER ALL COMPONENTS RENDER
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 2000);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <AccordionNavbar />
      <Hero />
      <Mission />
      <Focuses />
      <StickyProjectGrid />
      <Capabilities />
      <Experience />
      <ConnectingFooter />
    </div>
  );
};

export default Index;

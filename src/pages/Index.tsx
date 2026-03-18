import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Linkedin, Mail, MapPin } from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
    <div className="container mx-auto flex items-center justify-between py-4 px-6">
      <span className="font-heading text-xl font-bold text-gradient-gold">MH</span>
      <div className="hidden md:flex gap-8 font-body text-sm text-muted-foreground">
        <a href="#about" className="hover:text-primary transition-colors">Sobre mí</a>
        <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
        <a href="#experience" className="hover:text-primary transition-colors">Experiencia</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contacto</a>
      </div>
      <a href="https://www.linkedin.com/in/manuel-herrera-perfil" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        <Linkedin size={20} />
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 text-center px-6 max-w-4xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-body"
      >
        AI Marketing · Funnels · CRM · Vibe Coding
      </motion.div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
        Manuel<br />
        <span className="text-gradient-gold">Herrera</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
        AI Marketing | Customer Experience | Funnels | CRM | Vibe Coding
      </p>
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-10">
        <MapPin size={14} />
        <span>Ciudad de México, México</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-lg glow-gold hover:brightness-110 transition-all">
          <Mail size={18} /> Contáctame
        </a>
        <a href="#experience" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-heading font-semibold rounded-lg hover:bg-secondary transition-all">
          Ver experiencia
        </a>
      </div>
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Sobre <span className="text-gradient-gold">mí</span></h2>
        <div className="w-16 h-1 bg-primary rounded mb-8" />
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          Soy un profesional apasionado por el desarrollo de negocios, el marketing digital y el diseño creativo, con un enfoque flexible y proactivo. Me especializo en diseñar soluciones visuales y estrategias de marketing que generen un impacto duradero entre las marcas y su audiencia.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Mi capacidad para gestionar proyectos, analizar datos y optimizar campañas me permite contribuir al éxito de las empresas con las que colaboro. Intereses: AI Growth, Go-To-Market (GTM), Marketing Automation, RevOps, AI Product Marketing y AI Growth Systems.
        </p>
      </motion.div>
    </div>
  </section>
);

const skills = [
  { category: "Marketing Digital", items: ["SEO & SEM", "Google Ads", "Facebook Ads", "LinkedIn Ads", "Content Marketing", "Email Marketing"] },
  { category: "Data & Analytics", items: ["Google Analytics", "SEMrush", "Ahrefs", "Tableau", "Power BI", "A/B Testing"] },
  { category: "Diseño & UX", items: ["Figma", "Photoshop", "Illustrator", "After Effects", "Canva", "UX/UI Design"] },
  { category: "CRM & Automation", items: ["Salesforce", "HubSpot", "Zoho CRM", "Klaviyo", "ActiveCampaign", "GoHighLevel"] },
  { category: "AI & Vibe Coding", items: ["Lovable", "Zapier", "Make", "AI Funnels", "AI Automation", "Growth Systems"] },
  { category: "Social Media", items: ["Instagram", "LinkedIn", "TikTok", "YouTube", "Influencer Marketing", "Community"] },
];

const Skills = () => (
  <section id="skills" className="py-24 px-6 bg-card">
    <div className="container mx-auto max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Top <span className="text-gradient-gold">Skills</span></h2>
        <div className="w-16 h-1 bg-primary rounded mb-12" />
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-background border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
          >
            <h3 className="font-heading font-semibold text-primary mb-4">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const experiences = [
  {
    company: "Miiles Creative Studio",
    role: "AI Marketing Lead",
    period: "Abr 2025 – Feb 2026",
    desc: "Planificación y ejecución de funnels de marketing con IA, estrategias de posicionamiento y sistemas de conversión, integrando analytics, vibe coding y automatización con Lovable, Zapier y Make.",
  },
  {
    company: "Miiles Creative Studio",
    role: "Marketing Project Manager",
    period: "Feb 2024 – Abr 2025",
    desc: "Estrategias de marketing digital, SEO & SEM, y growth marketing. Optimización de campañas con Google Analytics, SEMrush, Tableau y Power BI.",
  },
  {
    company: "Miiles Creative Studio",
    role: "Junior Marketer",
    period: "Jul 2023 – Ene 2024",
    desc: "Estrategias de retención y lifecycle marketing. Campañas full-funnel y outbound. Optimización de deliverability con DMARC, DKIM y TXT records.",
  },
  {
    company: "Fiverr",
    role: "Digital Specialist",
    period: "Mar 2020 – Sep 2024",
    desc: "Branding, diseño gráfico y multimedia con Adobe Creative Suite. Estrategias de content marketing en Instagram, Facebook, LinkedIn y TikTok.",
  },
  {
    company: "BRIX Agency",
    role: "Product Designer",
    period: "Feb 2023 – May 2023",
    desc: "Diseño UX/UI en Figma, colaboración con equipos de desarrollo, investigación de usuarios y pruebas de usabilidad.",
  },
];

const Experience = () => (
  <section id="experience" className="py-24 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Experiencia <span className="text-gradient-gold">Profesional</span></h2>
        <div className="w-16 h-1 bg-primary rounded mb-12" />
      </motion.div>
      <div className="relative">
        <div className="absolute left-4 md:left-0 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-10 md:pl-8"
            >
              <div className="absolute left-2.5 md:left-[-4px] top-2 w-3 h-3 rounded-full bg-primary glow-gold" />
              <span className="text-xs text-primary font-heading font-medium">{exp.period}</span>
              <h3 className="font-heading font-bold text-lg mt-1">{exp.role}</h3>
              <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 px-6 bg-card">
    <div className="container mx-auto max-w-2xl text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Hablemos <span className="text-gradient-gold">juntos</span></h2>
        <div className="w-16 h-1 bg-primary rounded mb-8 mx-auto" />
        <p className="text-muted-foreground mb-10 text-lg">
          ¿Tienes un proyecto en mente? Estoy listo para colaborar y llevar tu estrategia digital al siguiente nivel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.linkedin.com/in/manuel-herrera-perfil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-lg glow-gold hover:brightness-110 transition-all"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="mailto:contacto@manuelherrera.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-heading font-semibold rounded-lg hover:bg-secondary transition-all"
          >
            <Mail size={18} /> Email
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 px-6 border-t border-border text-center">
    <p className="text-sm text-muted-foreground">
      © 2026 Manuel Herrera · Ciudad de México, México
    </p>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

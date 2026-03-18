import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin } from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/40">
    <div className="container mx-auto flex items-center justify-between py-6 px-10">
      <span className="font-heading text-lg font-bold tracking-tight uppercase">Vibe Weaver</span>
      <div className="hidden md:flex gap-12 font-body text-[11px] uppercase tracking-[0.2em] font-medium text-foreground/50">
        <a href="#about" className="hover:text-foreground transition-colors">Vision</a>
        <a href="#features" className="hover:text-foreground transition-colors">Capabilities</a>
        <a href="#process" className="hover:text-foreground transition-colors">Process</a>
        <a href="#connect" className="hover:text-foreground transition-colors">Connect</a>
      </div>
      <a href="https://www.linkedin.com/in/manuel-herrera-perfil" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        <Linkedin size={20} />
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
    <div className="absolute inset-0 pointer-events-none opacity-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 text-center px-6 max-w-4xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-block mb-8 px-5 py-2 rounded-full border border-border bg-secondary/50 text-foreground/80 text-[10px] uppercase tracking-[0.2em] font-medium"
      >
        AI Strategy · Creative Production · Development
      </motion.div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
        Vibe<br />
        <span className="text-gradient-gold">Weaver</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
        Weaving AI, Creativity, and Strategy into Seamless Digital Experiences.
      </p>
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-10">
        <MapPin size={14} />
        <span>Ciudad de México, México</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
        <a href="#connect" className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-heading font-medium rounded-full hover:scale-[1.02] transition-all text-sm uppercase tracking-wider">
          Work with us
        </a>
        <a href="#features" className="inline-flex items-center justify-center px-10 py-4 border border-border text-foreground font-heading font-medium rounded-full hover:bg-secondary transition-all text-sm uppercase tracking-wider">
          Explore
        </a>
      </div>
    </motion.div>
  </section>
);

const Vision = () => (
  <section id="about" className="py-32 px-6 bg-white">
    <div className="container mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-10 tracking-tight">Our <span className="text-primary italic">Vision</span></h2>
        <div className="space-y-8 max-w-2xl">
          <p className="text-foreground/80 leading-relaxed text-xl font-body">
            Vibe Weaver is a synthesis of art and algorithm. We believe that the future of digital experiences lies in the seamless weaving of human intuition with AI precision.
          </p>
          <p className="text-foreground/60 leading-relaxed text-lg font-body">
            Our mission is to help brands find their unique "vibe" and weave it into every touchpoint, from automated funnels to stunning visual identities.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const capabilities = [
  { category: "Digital Strategy", items: ["GTM Planning", "Growth Hacking", "Market Analysis", "Brand Positioning"] },
  { category: "AI & Automation", items: ["Lovable Development", "Zapier/Make Workflows", "AI Chatbots", "Custom Agents"] },
  { category: "Creative Design", items: ["Visual Identity", "UI/UX Design", "Motion Graphics", "3D Elements"] },
  { category: "Marketing Tech", items: ["Revenue Operations", "CRM Systems", "Predictive Analytics", "A/B Testing"] },
  { category: "Content Innovation", items: ["AI-Driven Copy", "Dynamic Media", "Social Ecosystems", "Community Building"] },
  { category: "Conversion Funnels", items: ["Lead Gen Systems", "Lifecycle Marketing", "Retention Loops", "Sales Alignment"] },
];

const Capabilities = () => (
  <section id="features" className="py-24 px-6 bg-card">
    <div className="container mx-auto max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Our <span className="text-gradient-gold">Capabilities</span></h2>
        <div className="w-16 h-1 bg-primary rounded mb-12" />
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
            <h3 className="font-heading font-bold text-lg mb-6 group-hover:text-primary transition-colors">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md bg-secondary/80 text-foreground/70 font-semibold">{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Process data moved to steps array

const steps = [
  { title: "Define the Vibe", desc: "We start by uncovering the core essence of your brand and the rhythm of your industry." },
  { title: "Weave the Strategy", desc: "Our experts design a custom ecosystem of AI, automation, and creative assets." },
  { title: "Deploy & Optimize", desc: "Launch with high-fidelity systems that scale effortlessly and evolve with your needs." },
  { title: "Seamless Growth", desc: "Continuous refinement ensuring your digital presence remains ahead of the curve." },
];

const Process = () => (
  <section id="process" className="py-32 px-6 bg-secondary/30">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">The <span className="text-primary italic">Process</span></h2>
        <p className="text-foreground/50 font-body text-lg">Four steps to digital excellence.</p>
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
            <span className="text-4xl font-heading font-bold text-primary/10 absolute -top-8 -left-2 select-none">0{i + 1}</span>
            <h3 className="font-heading font-bold text-xl mb-4 relative z-10">{step.title}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed font-body">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Connect = () => (
  <section id="connect" className="py-32 px-6 bg-white">
    <div className="container mx-auto max-w-3xl text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 tracking-tight italic">Let's <span className="text-primary">Weave</span></h2>
        <p className="text-foreground/60 mb-12 text-xl font-body max-w-xl mx-auto leading-relaxed">
          Ready to manifest your brand's digital evolution? Let's connect and start weaving your future today.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-12 py-5 bg-foreground text-background font-heading font-medium rounded-full hover:scale-105 transition-all text-sm uppercase tracking-widest"
          >
            Start Project
          </a>
          <a
            href="mailto:hello@vibeweaver.ai"
            className="inline-flex items-center justify-center px-12 py-5 border border-border text-foreground font-heading font-medium rounded-full hover:bg-secondary transition-all text-sm uppercase tracking-widest"
          >
            <Mail size={18} /> Get in Touch
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border/30 bg-white text-center">
    <p className="text-xs text-foreground/40 font-body uppercase tracking-[0.2em]">
      © 2026 Vibe Weaver · Weaving the Future
    </p>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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

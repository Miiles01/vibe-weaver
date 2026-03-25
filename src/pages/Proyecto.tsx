import { useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ── Project Data ── */
interface ProjectImage {
  src: string;
  alt: string;
  aspect?: "wide" | "tall" | "square"; // wide = 16:9, tall = 4:5, square = 1:1
}

interface ProjectContent {
  title: string;
  industry: { es: string; en: string };
  role: { es: string; en: string };
  description: { es: string; en: string };
  folder: string;
  images: ProjectImage[];
}

const projectData: Record<string, ProjectContent> = {
  miiles: {
    title: "Miiles",
    industry: {
      es: "Inteligencia Artificial y Consultoría de Ventas",
      en: "Artificial Intelligence & Sales Consulting",
    },
    role: {
      es: "Embudos de Ventas, Estrategia de Identidad de Marca y Automatización con IA",
      en: "Sales Funnels, Brand Identity Strategy & AI Automation",
    },
    description: {
      es: "Lideré la creación de esta marca en la frontera de la tecnología, enfocándome en el desarrollo de soluciones de venta escalables mediante Vibecoding y prospección en frío (Cold Outreach). Diseñé una arquitectura de embudos de alta conversión apoyada por agentes de IA conversacional que gestionan la interacción inicial con el prospecto. Mi rol fue integral: desde el branding completo y las relaciones públicas hasta la implementación de una red de afiliados para expansión en marketplaces. Apliqué estrategias de crecimiento orgánico y pagado mediante CTAs estratégicos, eventos de activación y campañas con influencers, logrando posicionar a Miiles como una solución innovadora en el mercado de la automatización comercial.",
      en: "I led the creation of this brand at the frontier of technology, focusing on developing scalable sales solutions through Vibecoding and Cold Outreach. I designed a high-conversion funnel architecture supported by conversational AI agents that manage the initial interaction with prospects. My role was integral: from complete branding and public relations to implementing an affiliate network for marketplace expansion. I applied organic and paid growth strategies through strategic CTAs, activation events, and influencer campaigns, successfully positioning Miiles as an innovative solution in the commercial automation market.",
    },
    folder: "Miiles",
    images: [
      { src: "portada-1.webp", alt: "Miiles — Cover", aspect: "wide" },
      { src: "about-miiles.webp", alt: "Miiles — About", aspect: "wide" },
      { src: "logo.webp", alt: "Miiles — Logo", aspect: "wide" },
      { src: "isotipo.webp", alt: "Miiles — Isotipo", aspect: "wide" },
      { src: "elementos-visuales.webp", alt: "Miiles — Visual Elements", aspect: "wide" },
      { src: "iconos.webp", alt: "Miiles — Iconography", aspect: "wide" },
      { src: "mockup-app-web.webp", alt: "Miiles — Web App Mockup", aspect: "wide" },
      { src: "mockup-app-web-2.webp", alt: "Miiles — Web App Mockup 2", aspect: "wide" },
      { src: "elementos-visuales-y-mockups-de-la-app-web.webp", alt: "Miiles — Visual Elements & Mockups", aspect: "wide" },
      { src: "miiles-3.webp", alt: "Miiles — Detail", aspect: "tall" },
    ],
  },
};

/* ── Fade-in animation variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ── Full-width image block ── */
const ProjectImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeUp}
    className="w-full overflow-hidden rounded-2xl md:rounded-3xl bg-secondary/5"
  >
    <img
      src={src}
      alt={alt}
      loading={index < 2 ? "eager" : "lazy"}
      decoding="async"
      className="w-full h-auto object-cover"
    />
  </motion.div>
);

/* ── Main Component ── */
const Proyecto = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const project = slug ? projectData[slug] : undefined;

  if (!project) return <Navigate to="/trabajo" replace />;

  const basePath = `/proyectos/${project.folder}/`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AccordionNavbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24">
        {/* Back link */}
        <div className="px-6 md:px-12 lg:px-20 container mx-auto mb-12">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/trabajo"
              className="inline-flex items-center gap-2 text-sm font-heading text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              {language === "es" ? "Volver a proyectos" : "Back to projects"}
            </Link>
          </motion.div>
        </div>

        {/* Header */}
        <header className="px-6 md:px-12 lg:px-20 container mx-auto mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl md:text-8xl lg:text-[8vw] font-heading font-medium tracking-tighter leading-none mb-8"
          >
            {project.title}
          </motion.h1>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-heading">
                {language === "es" ? "Industria" : "Industry"}
              </p>
              <p className="text-lg font-heading font-light leading-relaxed">
                {project.industry[language]}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-heading">
                {language === "es" ? "Qué hice" : "What I did"}
              </p>
              <p className="text-lg font-heading font-light leading-relaxed">
                {project.role[language]}
              </p>
            </div>
          </motion.div>
        </header>

        {/* Cover image — full bleed */}
        <div className="px-4 md:px-8 lg:px-12 mb-8">
          <ProjectImage src={basePath + project.images[0].src} alt={project.images[0].alt} index={0} />
        </div>

        {/* Description block */}
        <div className="px-6 md:px-12 lg:px-20 container mx-auto my-20 md:my-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-heading">
              {language === "es" ? "Descripción" : "Description"}
            </p>
            <p className="text-xl md:text-2xl font-heading font-light leading-relaxed text-foreground/80">
              {project.description[language]}
            </p>
          </motion.div>
        </div>

        {/* Image gallery — alternating layouts */}
        <div className="space-y-6 md:space-y-8">
          {project.images.slice(1).map((img, idx) => {
            const realIdx = idx + 1;

            // Alternate between full-width and side-by-side pairs
            // Every 3rd image after the first gets a text break
            if (idx % 4 === 2 && realIdx + 1 < project.images.length) {
              // Two images side by side
              const nextImg = project.images[realIdx + 1];
              return (
                <div key={realIdx} className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-8 lg:px-12">
                  <ProjectImage src={basePath + img.src} alt={img.alt} index={realIdx} />
                  <ProjectImage src={basePath + nextImg.src} alt={nextImg.alt} index={realIdx + 1} />
                </div>
              );
            }

            // Skip images already rendered in pairs
            if (idx % 4 === 3 && idx >= 3) return null;

            // Full-width image
            return (
              <div key={realIdx} className="px-4 md:px-8 lg:px-12">
                <ProjectImage src={basePath + img.src} alt={img.alt} index={realIdx} />
              </div>
            );
          })}
        </div>

        {/* Next project CTA */}
        <div className="px-6 md:px-12 lg:px-20 container mx-auto mt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/trabajo"
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-heading font-medium tracking-tight hover:opacity-60 transition-opacity"
            >
              {language === "es" ? "Ver todos los proyectos" : "View all projects"}
              <ArrowLeft size={24} className="rotate-180" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Proyecto;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
    {
        title: "Miiles",
        slug: "miiles",
        subtitleKey: "proj.miiles.subtitle",
        folder: "Miiles",
        cover: "portada-1.webp",
        secondary: ["mockup-app-web.webp", "miiles-3.webp"]
    },
    {
        title: "Naabi Kanabi",
        slug: "naabi-kanabi",
        subtitleKey: "proj.naabi.subtitle",
        folder: "Naabi-Kanabi",
        cover: "portada-1.webp",
        secondary: ["naabi-1.webp", "naabi-2.webp"]
    },
    {
        title: "Tularosa",
        slug: "tularosa",
        subtitleKey: "proj.tularosa.subtitle",
        folder: "Tularosa",
        cover: "portada-1.webp",
        secondary: ["tula-1.webp", "tula-2.webp"]
    },
    {
        title: "Erpxtender",
        slug: "erpxtender",
        subtitleKey: "proj.erp.subtitle",
        folder: "Erpxtender",
        cover: "portada-1.webp",
        secondary: ["erp-1.webp", "publicidad-exterior.webp"]
    },
    {
        title: "Mar & Vic",
        slug: "mar-vic",
        subtitleKey: "proj.marvic.subtitle",
        folder: "Mar-Vic",
        cover: "portada-1.webp",
        secondary: ["mar-1.webp", "mar-2.webp"]
    },
    {
        title: "Original",
        slug: "original",
        subtitleKey: "proj.original.subtitle",
        folder: "Original",
        cover: "portada-1.webp",
        secondary: ["original-1.webp", "original-2.webp"]
    },
    {
        title: "Colorfit",
        slug: "colorfit",
        subtitleKey: "proj.colorfit.subtitle",
        folder: "Colorfit",
        cover: "portada-1.webp",
        secondary: ["colorfit-2.webp", "mockup-ropa-2.webp"]
    },
    {
        title: "Jambú",
        slug: "jambu",
        subtitleKey: "proj.jambu.subtitle",
        folder: "Jambu",
        cover: "portada-1.webp",
        secondary: ["packaging.webp", "mockup-del-producto.webp"]
    }
];

const ProjectSection = ({ project, t }: { project: any, t: any }) => {
    const getPath = (img: string) => `/proyectos/${project.folder}/${img}`;

    return (
        <div className="mb-32">
            {/* Main Cover */}
            <Link to={`/proyecto/${project.slug}`} className="block w-full mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-secondary/5"
                >
                    <img
                        src={getPath(project.cover)}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>
            </Link>

            {/* Secondary Images & Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {project.secondary.map((img, idx) => (
                    <Link key={idx} to={`/proyecto/${project.slug}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 * (idx + 1) }}
                            className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary/5"
                        >
                            <img
                                src={getPath(img)}
                                alt={`${project.title} detail ${idx + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Info */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="px-4"
            >
                <Link to={`/proyecto/${project.slug}`} className="group">
                    <h3 className="text-3xl font-heading font-medium tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                </Link>
                <p className="text-lg font-heading font-light opacity-60 max-w-xl">{t(project.subtitleKey)}</p>
            </motion.div>
        </div>
    );
};

const Trabajo = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-white flex flex-col pt-32 md:pt-40">
            <AccordionNavbar />

            <main className="flex-1 px-6 md:px-12 lg:px-20 container mx-auto">
                {/* Header */}
                <section className="mb-24 md:mb-40">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-heading font-light tracking-tight max-w-2xl mb-8 opacity-80"
                    >
                        {t('work.subtitle')}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-7xl md:text-[10vw] font-heading font-medium tracking-tighter leading-none"
                    >
                        {t('work.title')}
                    </motion.h1>
                </section>

                {/* Project List */}
                <section className="pb-20">
                    {projects.map((project, idx) => (
                        <ProjectSection key={idx} project={project} t={t} />
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Trabajo;

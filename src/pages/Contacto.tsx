import { motion } from "framer-motion";
import AccordionNavbar from "@/components/AccordionNavbar";

const Contacto = () => {
    return (
        <div className="min-h-screen bg-white">
            <AccordionNavbar />
            <section className="pt-40 px-6">
                <div className="container mx-auto max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-heading font-medium tracking-tighter mb-12"
                    >
                        Contacto
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-heading font-light opacity-60 mb-12">
                        Hablemos sobre tu próximo proyecto.
                    </p>
                    <div className="flex flex-col gap-6">
                        <a href="mailto:contmanuel77@gmail.com" className="text-3xl md:text-5xl font-heading font-medium hover:text-blue-600 transition-colors">
                            contmanuel77@gmail.com
                        </a>
                        <a href="tel:+525610168992" className="text-3xl md:text-5xl font-heading font-medium hover:text-blue-600 transition-colors">
                            +52 5610168992
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contacto;

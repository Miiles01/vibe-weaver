import { motion } from "framer-motion";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";

const Trabajo = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AccordionNavbar />
            <section className="pt-40 px-6 pb-20 flex-1">
                <div className="container mx-auto max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-heading font-medium tracking-tighter mb-12"
                    >
                        Trabajo
                    </motion.h1>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* We can eventually map the projects from /public/proyectos here */}
                        <div className="aspect-[4/5] bg-secondary/5 rounded-3xl animate-pulse" />
                        <div className="aspect-[4/5] bg-secondary/5 rounded-3xl animate-pulse" />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Trabajo;

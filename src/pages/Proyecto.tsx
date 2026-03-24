import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";

const projectSlugs: Record<string, string> = {
  miiles: "Miiles",
  colorfit: "Colorfit",
  "naabi-kanabi": "Naabi Kanabi",
  jambu: "Jambú",
  tularosa: "Tularosa",
  erpxtender: "Erpxtender",
  "mar-vic": "Mar & Vic",
  original: "Original",
};

const Proyecto = () => {
  const { slug } = useParams();
  const title = slug ? projectSlugs[slug] : undefined;

  if (!title) return <Navigate to="/trabajo" replace />;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AccordionNavbar />
      <main className="flex-1 pt-40 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading font-medium tracking-tighter mb-12"
          >
            {title}
          </motion.h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Proyecto;

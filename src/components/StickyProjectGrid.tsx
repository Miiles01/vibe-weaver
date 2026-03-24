import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const images = [
    { folder: "Colorfit", img: "Portada 1.png" },
    { folder: "Erpxtender", img: "Portada 1.png" },
    { folder: "Jambú", img: "Portada 1.png" },
    { folder: "Mar & Vic", img: "Portada 1.png" },
    { folder: "Miiles", img: "Portada 1.png" },
    { folder: "Naabi Kanabi", img: "Portada 1.png" },
    { folder: "Original", img: "Portada 1.png" },
    { folder: "Tularosa", img: "Portada 1.png" },
    { folder: "Miiles", img: "Elementos visuales.png" },
];

const StickyProjectGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Animation values based on Codrops research
    // Scale from 1 to 2.05
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 2.05]);
    const springScale = useSpring(scale, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Outward expansion (xPercent +/- 40, etc)
    const xLeft = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-40%"]);
    const xRight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "40%"]);
    const yTop = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-40%"]);
    const yBottom = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "40%"]);

    // Opacity for the final text
    const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
    const textScale = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1]);

    const getPath = (item: typeof images[0]) => `/proyectos/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.img)}`;

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* The Grid */}
                <motion.div
                    style={{ scale: springScale }}
                    className="grid grid-cols-3 gap-4 md:gap-8 w-[90vw] md:w-[70vw] aspect-square md:aspect-video"
                >
                    {images.map((item, idx) => {
                        let x: any = "0%";
                        let y: any = "0%";

                        // Logic to move columns outward
                        if (idx % 3 === 0) x = xLeft; // Left col
                        if (idx % 3 === 2) x = xRight; // Right col

                        // Row logic (top/bottom)
                        if (idx < 3) y = yTop; // Top row
                        if (idx > 5) y = yBottom; // Bottom row

                        return (
                            <motion.div
                                key={idx}
                                style={{ x, y }}
                                className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-[2rem] bg-secondary/5"
                            >
                                <img
                                    src={getPath(item)}
                                    alt={`Project ${idx}`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Overlay Text */}
                <motion.div
                    style={{ opacity: textOpacity, scale: textScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                >
                    <div className="bg-white/80 backdrop-blur-md p-12 rounded-[3rem] shadow-2xl border border-white/20 text-center pointer-events-auto">
                        <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter mb-6">
                            Descubre mi trabajo
                        </h2>
                        <Link
                            to="/trabajo"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-heading font-medium hover:scale-110 transition-transform group"
                        >
                            Ver Proyectos
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default StickyProjectGrid;

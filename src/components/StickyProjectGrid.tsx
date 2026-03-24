import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const images = [
    { folder: "Colorfit", img: "Portada 1.png" },
    { folder: "Erpxtender", img: "Portada 1.png" },
    { folder: "Jambú", img: "Portada 1.png" },
    { folder: "Mar & Vic", img: "Portada 1.png" },
    { folder: "Miiles", img: "Portada 1.png" },
    { folder: "Naabi Kanabi", img: "Portada 1.png" },
    { folder: "Original", img: "Portada 1.png" },
    { folder: "Tularosa", img: "Portada 1.png" },
    { folder: "Miiles", img: "Mockup App Web.png" },
    { folder: "Jambú", img: "Packaging.png" },
    { folder: "Mar & Vic", img: "Fotos publicitarias.png" },
    { folder: "Colorfit", img: "Mockup tote bag.png" },
];

const StickyProjectGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Global scale from 1 to 4 for that deep zoom feeling
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 4]);
    const springScale = useSpring(scale, { stiffness: 80, damping: 25, restDelta: 0.001 });

    // Individual item translations for the "explosion" effect
    // We'll calculate x/y based on index to move outward from center
    const getTransforms = (idx: number) => {
        const col = idx % 3; // 0, 1, 2
        const row = Math.floor(idx / 3); // 0, 1, 2, 3

        // X Translation: Left column moves left (-150%), Right moves right (150%)
        let xTarget = "0%";
        if (col === 0) xTarget = "-150%";
        if (col === 2) xTarget = "150%";

        // Y Translation: Top rows move up, Bottom rows move down
        let yTarget = "0%";
        if (row === 0) yTarget = "-200%";
        if (row === 1) yTarget = "-100%";
        if (row === 2) yTarget = "100%";
        if (row === 3) yTarget = "200%";

        // Create motion transforms tied to scroll progress
        const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", xTarget]);
        const y = useTransform(scrollYProgress, [0.1, 0.9], ["0%", yTarget]);

        return { x, y };
    };

    // Central text animation
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.9], [0, 1, 0]);
    const textScale = useTransform(scrollYProgress, [0.4, 0.8], [0.5, 1.5]);
    const textBlur = useTransform(scrollYProgress, [0.4, 0.6], ["blur(10px)", "blur(0px)"]);

    const getPath = (item: typeof images[0]) => `/proyectos/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.img)}`;

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Main Grid Container */}
                <motion.div
                    style={{ scale: springScale }}
                    className="grid grid-cols-3 gap-[2vw] w-[80vw] max-w-[1200px] aspect-[3/4] md:aspect-video"
                >
                    {images.map((item, idx) => {
                        const { x, y } = getTransforms(idx);

                        return (
                            <motion.div
                                key={idx}
                                style={{ x, y }}
                                className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl bg-secondary/5"
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

                {/* Central "Mis Proyectos" Text */}
                <motion.div
                    style={{
                        opacity: textOpacity,
                        scale: textScale,
                        filter: textBlur
                    }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                >
                    <h2 className="text-[12vw] md:text-[8vw] font-heading font-medium tracking-[2vw] text-black uppercase text-center leading-none">
                        Mis<br />Proyectos
                    </h2>
                </motion.div>

            </div>
        </div>
    );
};

export default StickyProjectGrid;

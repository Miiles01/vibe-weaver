import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const blockRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        if (!blockRef.current || !gridRef.current || !titleRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".gallery__item");
            const columns: HTMLElement[][] = [[], [], []];

            // Group items by column (0, 1, 2)
            items.forEach((item, index) => {
                columns[index % 3].push(item);
            });

            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                }
            });

            // 1. Grid Reveal Timeline
            const revealTimeline = gsap.timeline();
            const wh = window.innerHeight;
            const dy = wh; // Simplified distance for entry

            columns.forEach((column, colIndex) => {
                const fromTop = colIndex % 2 === 0;
                revealTimeline.from(column, {
                    y: dy * (fromTop ? -1 : 1),
                    stagger: {
                        each: 0.06,
                        from: fromTop ? "end" : "start",
                    },
                    ease: "none",
                }, "grid-reveal");
            });

            // 2. Grid Zoom Timeline
            const zoomTimeline = gsap.timeline({
                defaults: { duration: 1, ease: "power3.inOut" }
            });

            zoomTimeline.to(gridRef.current, { scale: 2.05 })
                .to(columns[0], { xPercent: -40 }, "<") // Left col moves left
                .to(columns[2], { xPercent: 40 }, "<") // Right col moves right
                .to(columns[1], { // Central column items move vertically
                    yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
                    duration: 0.5,
                    ease: "power1.inOut",
                }, "-=0.5");

            // 3. Text Content Toggle
            const toggleContent = (isVisible: boolean) => {
                gsap.to(titleRef.current, {
                    yPercent: isVisible ? 0 : 100,
                    opacity: isVisible ? 1 : 0,
                    duration: 0.7,
                    ease: "power2.inOut",
                });
            };

            // Assemble Main Timeline
            mainTimeline
                .add(revealTimeline)
                .add(zoomTimeline, "-=0.2")
                .add(() => {
                    const isVisible = mainTimeline.scrollTrigger?.direction === 1;
                    toggleContent(isVisible);
                }, "-=0.3");

        }, blockRef);

        return () => ctx.revert();
    }, []);

    const getPath = (item: typeof images[0]) => `/proyectos/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.img)}`;

    return (
        <div id="sticky-grid" ref={blockRef} className="relative h-[425vh] bg-white overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Gallery Grid */}
                <div
                    ref={gridRef}
                    className="gallery__grid grid grid-cols-3 gap-[2vw] md:gap-[4vw] w-[90vw] max-w-[1400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform"
                >
                    {images.map((item, idx) => (
                        <div
                            key={idx}
                            className="gallery__item w-full aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-secondary/5 will-change-transform"
                        >
                            <img
                                src={getPath(item)}
                                alt={`Project ${idx}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Content Overlay */}
                <div
                    ref={contentRef}
                    className="content relative z-10 text-center flex flex-col items-center justify-center h-full pointer-events-none"
                >
                    <div className="overflow-hidden">
                        <h2
                            ref={titleRef}
                            className="text-[12vw] md:text-[8vw] font-heading font-medium tracking-tight text-black uppercase leading-none opacity-0 translate-y-full"
                        >
                            Mis<br />Proyectos
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StickyProjectGrid;

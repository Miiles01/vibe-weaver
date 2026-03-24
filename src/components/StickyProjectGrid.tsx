import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

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
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!blockRef.current || !gridRef.current || !titleRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".gallery__item");
            const columns: HTMLElement[][] = [[], [], []];

            // Group items into 3 columns
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

            // 1. Reveal Timeline
            const revealTl = gsap.timeline();
            const wh = window.innerHeight;

            columns.forEach((column, colIndex) => {
                const fromTop = colIndex % 2 === 0;
                revealTl.from(column, {
                    y: wh * (fromTop ? -1.2 : 1.2),
                    stagger: {
                        each: 0.08,
                        from: fromTop ? "end" : "start",
                    },
                    ease: "none",
                }, "reveal");
            });

            // 2. Zoom Timeline
            const zoomTl = gsap.timeline({
                defaults: { duration: 1, ease: "power3.inOut" }
            });

            zoomTl.to(gridRef.current, { scale: 2.05 })
                .to(columns[0], { xPercent: -40, ease: "power2.inOut" }, "<")
                .to(columns[2], { xPercent: 40, ease: "power2.inOut" }, "<")
                .to(columns[1], {
                    yPercent: (i) => (i < Math.floor(columns[1].length / 2) ? -40 : 40),
                    duration: 0.8,
                }, "-=0.6");

            // 3. Content Visibility Timeline
            const contentTl = gsap.timeline({
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top 20%",
                    end: "bottom 80%",
                    toggleActions: "play reverse play reverse"
                }
            });

            contentTl
                .to(titleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .to(subtitleRef.current, { y: 0, opacity: 0.6, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");

            // Assembly
            mainTimeline
                .add(revealTl)
                .add(zoomTl, "-=0.25");

        }, blockRef);

        return () => ctx.revert();
    }, []);

    const getPath = (item: typeof images[0]) => `/proyectos/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.img)}`;

    return (
        <section id="sticky-grid" ref={blockRef} className="relative h-[425vh] bg-white overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background Gallery Grid - Matching Tutorial Dimensions */}
                <div
                    ref={gridRef}
                    className="gallery__grid grid grid-cols-3 gap-[2.22vw] w-[51.11vw] max-w-[1200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform z-0"
                >
                    {images.map((item, idx) => (
                        <div
                            key={idx}
                            className="gallery__item w-full aspect-square overflow-hidden rounded-xl bg-secondary/5 will-change-transform shadow-sm"
                        >
                            <img
                                src={getPath(item)}
                                alt={`Project ${idx}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Foreground Content Content Section */}
                <div
                    ref={contentRef}
                    className="content relative z-10 text-center flex flex-col items-center justify-center max-w-2xl px-6"
                >
                    <h2
                        ref={titleRef}
                        className="text-[10vw] md:text-[6vw] font-heading font-medium tracking-tight text-black leading-none mb-6 opacity-0 translate-y-10"
                    >
                        Mis Proyectos
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl font-light text-black/60 mb-10 opacity-0 translate-y-10 max-w-md"
                    >
                        Selección de proyectos diseñados para impactar y elevar la experiencia digital.
                    </p>
                    <div ref={buttonRef} className="opacity-0 translate-y-10">
                        <Link
                            to="/trabajo"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-heading font-medium hover:scale-105 transition-all shadow-xl pointer-events-auto"
                        >
                            Ver todo mi trabajo
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StickyProjectGrid;

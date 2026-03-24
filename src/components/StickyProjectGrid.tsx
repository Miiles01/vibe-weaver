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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!blockRef.current || !wrapperRef.current || !gridRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".gallery__item");
            const columns: HTMLElement[][] = [[], [], []];

            items.forEach((item, index) => {
                columns[index % 3].push(item);
            });

            // Main Timeline
            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: wrapperRef.current,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // 1. Reveal
            const revealTl = gsap.timeline();
            const wh = window.innerHeight;

            columns.forEach((column, colIndex) => {
                const fromTop = colIndex % 2 === 0;
                revealTl.from(column, {
                    y: wh * (fromTop ? -1.2 : 1.2),
                    stagger: {
                        each: 0.1,
                        from: fromTop ? "end" : "start",
                    },
                    ease: "none",
                }, "reveal");
            });

            // 2. Zoom
            const zoomTl = gsap.timeline();
            zoomTl.to(gridRef.current, { scale: 2.05, ease: "power2.inOut" })
                .to(columns[0], { xPercent: -40, ease: "power2.inOut" }, "<")
                .to(columns[2], { xPercent: 40, ease: "power2.inOut" }, "<")
                .to(columns[1], {
                    yPercent: (i) => (i < Math.floor(columns[1].length / 2) ? -40 : 40),
                    ease: "power2.inOut",
                }, "<");

            // 3. UI Reveal
            const uiTl = gsap.timeline();
            uiTl.to([titleRef.current, subtitleRef.current, buttonRef.current], {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out"
            });

            mainTimeline
                .add(revealTl)
                .add(zoomTl, "-=0.2")
                .add(uiTl, "-=0.3");

        }, blockRef);

        return () => ctx.revert();
    }, []);

    const getPath = (item: typeof images[0]) => `/proyectos/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.img)}`;

    return (
        <section id="sticky-grid" ref={blockRef} className="relative h-[450vh] bg-white overflow-hidden">
            <div ref={wrapperRef} className="h-screen w-full flex items-center justify-center overflow-hidden relative">

                {/* Gallery Grid */}
                <div
                    ref={gridRef}
                    className="gallery__grid grid grid-cols-3 gap-[2.22vw] w-[51.11vw] max-w-[1200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 will-change-transform"
                >
                    {images.map((item, idx) => (
                        <div
                            key={idx}
                            className="gallery__item w-full aspect-square overflow-hidden rounded-xl bg-secondary/5"
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

                {/* Content Overlay */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center w-full max-w-2xl px-8 pointer-events-none">
                    <div className="overflow-hidden mb-6">
                        <h2
                            ref={titleRef}
                            className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-black leading-tight opacity-0 translate-y-12"
                        >
                            Mis Proyectos
                        </h2>
                    </div>

                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl font-light text-black/60 mb-12 opacity-0 translate-y-8 max-w-sm mx-auto leading-relaxed"
                    >
                        Estos han sido los proyectos en los que he participado.
                    </p>

                    <div ref={buttonRef} className="opacity-0 translate-y-8 pointer-events-auto">
                        <Link
                            to="/trabajo"
                            className="group inline-flex items-center gap-4 px-8 py-3.5 bg-white border border-black/10 text-black rounded-full font-heading font-medium hover:bg-black/5 transition-all text-sm md:text-base relative overflow-hidden"
                        >
                            Ver todo mi trabajo
                            <span className="p-2 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StickyProjectGrid;

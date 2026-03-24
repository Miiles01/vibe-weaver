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

            // 1. Reveal Timeline
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

            // 2. Zoom & Expansion Timeline
            const zoomTl = gsap.timeline();
            zoomTl.to(gridRef.current, { scale: 2.05, ease: "power2.inOut" })
                .to(columns[0], { xPercent: -40, ease: "power2.inOut" }, "<")
                .to(columns[2], { xPercent: 40, ease: "power2.inOut" }, "<")
                .to(columns[1], {
                    yPercent: (i) => (i < Math.floor(columns[1].length / 2) ? -40 : 40),
                    ease: "power2.inOut",
                }, "<");

            // 3. UI Content Timeline (Scrubbed with the rest)
            const contentTl = gsap.timeline();
            contentTl.to([titleRef.current, subtitleRef.current, buttonRef.current], {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power3.out"
            });

            // MAIN MASTER TIMELINE WITH PINNING
            gsap.timeline({
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: wrapperRef.current,
                    scrub: 1,
                    anticipatePin: 1,
                }
            })
                .add(revealTl)
                .add(zoomTl, "-=0.2")
                .add(contentTl, "-=0.4");

        }, blockRef);

        return () => ctx.revert();
    }, []);

    const getPath = (item: typeof images[0]) => `/proyectos/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.img)}`;

    return (
        <section id="sticky-grid" ref={blockRef} className="relative h-[450vh] bg-white overflow-hidden">
            {/* Pinned Wrapper managed by GSAP */}
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
                <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-4xl px-6 pointer-events-none">
                    <div className="overflow-hidden mb-4">
                        <h2
                            ref={titleRef}
                            className="text-[10vw] md:text-[7vw] font-heading font-medium tracking-tight text-black leading-none opacity-0 translate-y-20"
                        >
                            Mis Proyectos
                        </h2>
                    </div>

                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl font-light text-black/60 mb-10 opacity-0 translate-y-10 max-w-lg mx-auto"
                    >
                        Selección de proyectos diseñados para impactar y elevar la experiencia digital.
                    </p>

                    <div ref={buttonRef} className="opacity-0 translate-y-10 pointer-events-auto">
                        <Link
                            to="/trabajo"
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full font-heading font-medium hover:scale-[1.05] transition-all shadow-2xl"
                        >
                            Ver todo mi trabajo
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StickyProjectGrid;

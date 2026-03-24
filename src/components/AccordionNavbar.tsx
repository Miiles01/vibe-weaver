import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        className="text-sm md:text-base font-medium text-black/60 hover:text-black transition-colors px-4 py-2 block"
    >
        {children}
    </a>
);

const AccordionNavbar = () => {
    const { scrollY } = useScroll();

    // Transform width from 100% to 50% on scroll
    const widthRange = useTransform(scrollY, [0, 100], ["100%", "50%"]);
    const mobileWidthRange = useTransform(scrollY, [0, 100], ["100%", "95%"]);
    const borderRadiusRange = useTransform(scrollY, [0, 100], [0, 50]);
    const topRange = useTransform(scrollY, [0, 100], [0, 20]);
    const paddingRange = useTransform(scrollY, [0, 100], ["24px", "12px"]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const springConfig = { stiffness: 400, damping: 40 };
    const animatedWidth = useSpring(isMobile ? mobileWidthRange : widthRange, springConfig);
    const animatedRadius = useSpring(borderRadiusRange, springConfig);
    const animatedTop = useSpring(topRange, springConfig);
    const animatedPadding = useSpring(paddingRange, springConfig);

    return (
        <motion.header
            style={{
                width: animatedWidth,
                borderRadius: animatedRadius,
                top: animatedTop,
                paddingTop: animatedPadding,
                paddingBottom: animatedPadding,
            }}
            className="fixed left-1/2 -translate-x-1/2 z-[100] bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-between overflow-hidden px-8 md:px-12"
        >
            <a href="#" className="flex items-center gap-1 group">
                <span className="text-xl md:text-2xl font-bold tracking-tighter text-black">Ma</span>
                <span className="text-xl md:text-2xl font-medium tracking-tighter text-black/80">no</span>
            </a>

            <nav className="flex items-center h-full gap-4">
                <NavLink href="#vision">Sobre</NavLink>
                <NavLink href="#features">Trabajo</NavLink>
                <NavLink href="#connect">Contacto</NavLink>
            </nav>
        </motion.header>
    );
};

export default AccordionNavbar;


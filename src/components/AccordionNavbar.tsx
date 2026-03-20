import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        className="text-sm md:text-base font-medium text-black/60 hover:text-black transition-colors px-6 py-2 block"
    >
        {children}
    </a>
);

const AccordionNavbar = () => {
    const { scrollY } = useScroll();

    // Transform width from 100% to a compact version on scroll
    const widthRange = useTransform(scrollY, [0, 100], ["100%", "45%"]);
    const mobileWidthRange = useTransform(scrollY, [0, 100], ["100%", "90%"]);
    const borderRadiusRange = useTransform(scrollY, [0, 100], [0, 40]);
    const topRange = useTransform(scrollY, [0, 100], [0, 24]);
    const paddingRange = useTransform(scrollY, [0, 100], ["20px", "12px"]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const springConfig = { stiffness: 300, damping: 30 };
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
            className="fixed left-1/2 -translate-x-1/2 z-[100] bg-white/70 backdrop-blur-xl border border-white/20 shadow-sm flex items-center justify-center overflow-hidden px-4"
        >
            <nav className="flex items-center h-full">
                <div className="flex items-center h-full border-r border-black/10"><NavLink href="#work">Work</NavLink></div>
                <div className="flex items-center h-full border-r border-black/10"><NavLink href="#about">About</NavLink></div>
                <div className="flex items-center h-full border-r border-black/10"><NavLink href="#enfoques">Enfoques</NavLink></div>
                <div className="flex items-center h-full"><NavLink href="#contacto">Contacto</NavLink></div>
            </nav>
        </motion.header>
    );
};

export default AccordionNavbar;

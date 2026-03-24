import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const NavLink = ({ href, children, color }: { href: string; children: React.ReactNode, color: any }) => (
    <motion.a
        href={href}
        style={{ color }}
        className="text-sm md:text-base font-medium transition-colors px-4 py-2 block hover:opacity-100"
    >
        {children}
    </motion.a>
);

const AccordionNavbar = () => {
    const { scrollY } = useScroll();

    // Transform width from 100% to 50% on scroll
    const widthRange = useTransform(scrollY, [0, 100], ["100%", "50%"]);
    const mobileWidthRange = useTransform(scrollY, [0, 100], ["100%", "95%"]);
    const borderRadiusRange = useTransform(scrollY, [0, 100], [0, 50]);
    const topRange = useTransform(scrollY, [0, 100], [0, 20]);
    const paddingRange = useTransform(scrollY, [0, 100], ["24px", "12px"]);

    // Dynamic background and blur
    const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
    const blurAmount = useTransform(scrollY, [0, 50], [0, 20]);
    const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.2]);

    // Dynamic text colors
    const textColor = useTransform(scrollY, [20, 80], ["#ffffff", "#000000"]);
    const navLinkColor = useTransform(scrollY, [20, 80], ["rgba(255, 255, 255, 0.7)", "rgba(0, 0, 0, 0.6)"]);

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

    // Dynamic styles for background and blur
    const backgroundColor = useTransform(bgOpacity, (o) => `rgba(255, 255, 255, ${o})`);
    const backdropFilter = useTransform(blurAmount, (b) => `blur(${b}px)`);
    const borderColor = useTransform(borderOpacity, (o) => `rgba(255, 255, 255, ${o})`);

    return (
        <motion.header
            style={{
                width: animatedWidth,
                borderRadius: animatedRadius,
                top: animatedTop,
                paddingTop: animatedPadding,
                paddingBottom: animatedPadding,
                backgroundColor,
                backdropFilter,
                borderColor,
            }}
            className="fixed left-1/2 -translate-x-1/2 z-[100] border flex items-center justify-between overflow-hidden px-8 md:px-12"
        >
            <motion.a href="#" style={{ color: textColor }} className="flex items-center group">
                <span className="text-xl md:text-2xl font-bold tracking-tighter">Manu</span>
            </motion.a>

            <nav className="flex items-center h-full gap-4">
                <NavLink href="#vision" color={navLinkColor}>Sobre</NavLink>
                <NavLink href="#features" color={navLinkColor}>Trabajo</NavLink>
                <NavLink href="#connect" color={navLinkColor}>Contacto</NavLink>
            </nav>
        </motion.header>
    );
};

export default AccordionNavbar;


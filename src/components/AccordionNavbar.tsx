import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const NavLinkItem = ({ to, children, color }: { to: string; children: React.ReactNode; color: any }) => (
    <Link to={to} className="text-sm md:text-base font-medium transition-colors px-4 py-2 block hover:opacity-100">
        <motion.span style={{ color }}>{children}</motion.span>
    </Link>
);

const AccordionNavbar = () => {
    const { scrollY } = useScroll();

    const widthRange = useTransform(scrollY, [0, 100], ["100%", "50%"]);
    const mobileWidthRange = useTransform(scrollY, [0, 100], ["100%", "95%"]);
    const borderRadiusRange = useTransform(scrollY, [0, 100], [0, 50]);
    const topRange = useTransform(scrollY, [0, 100], [0, 20]);
    const paddingRange = useTransform(scrollY, [0, 100], ["24px", "12px"]);

    const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
    const blurAmount = useTransform(scrollY, [0, 50], [0, 20]);
    const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.2]);

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
            <Link to="/" className="flex items-center group">
                <motion.span style={{ color: textColor }} className="text-xl md:text-2xl font-bold tracking-tighter">Manu</motion.span>
            </Link>

            <nav className="flex items-center h-full gap-4">
                <NavLinkItem to="/" color={navLinkColor}>Sobre</NavLinkItem>
                <NavLinkItem to="/trabajo" color={navLinkColor}>Trabajo</NavLinkItem>
                <NavLinkItem to="/contacto" color={navLinkColor}>Contacto</NavLinkItem>
            </nav>
        </motion.header>
    );
};

export default AccordionNavbar;

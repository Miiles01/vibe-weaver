import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, color, isAnchor = false }: { to: string; children: React.ReactNode, color: any, isAnchor?: boolean }) => {
    if (isAnchor) {
        return (
            <motion.a
                href={to}
                style={{ color }}
                className="text-sm md:text-base font-medium transition-colors px-4 py-2 block hover:opacity-100"
            >
                {children}
            </motion.a>
        );
    }
    return (
        <motion.div style={{ color }}>
            <Link
                to={to}
                className="text-sm md:text-base font-medium transition-colors px-4 py-2 block hover:opacity-100"
            >
                {children}
            </Link>
        </motion.div>
    );
};

const AccordionNavbar = () => {
    const { scrollY } = useScroll();
    const location = useLocation();
    const isHome = location.pathname === "/" || location.pathname === "/sobre";

    // Transform width from 100% to 50% on scroll
    const widthRange = useTransform(scrollY, [0, 100], ["100%", "50%"]);
    const mobileWidthRange = useTransform(scrollY, [0, 100], ["100%", "95%"]);
    const borderRadiusRange = useTransform(scrollY, [0, 100], [0, 50]);
    const topRange = useTransform(scrollY, [0, 100], [0, 20]);
    const paddingRange = useTransform(scrollY, [0, 100], ["24px", "12px"]);

    // Dynamic background and blur (only for home)
    const bgOpacityBase = useTransform(scrollY, [0, 50], [0, 0.8]);
    const blurAmountBase = useTransform(scrollY, [0, 50], [0, 20]);
    const borderOpacityBase = useTransform(scrollY, [0, 50], [0, 0.2]);

    // Dynamic text colors (only for home)
    const textColorBase = useTransform(scrollY, [20, 80], ["#ffffff", "#000000"]);
    const navLinkColorBase = useTransform(scrollY, [20, 80], ["rgba(255, 255, 255, 0.7)", "rgba(0, 0, 0, 0.6)"]);

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

    // Final dynamic styles - override if not on home
    const backgroundColor = useTransform(bgOpacityBase, (o) => isHome ? `rgba(255, 255, 255, ${o})` : "rgba(255, 255, 255, 0.8)");
    const backdropFilter = useTransform(blurAmountBase, (b) => isHome ? `blur(${b}px)` : "blur(20px)");
    const borderColor = useTransform(borderOpacityBase, (o) => isHome ? `rgba(255, 255, 255, ${o})` : "rgba(255, 255, 255, 0.2)");
    const textColor = useTransform(textColorBase, (c) => isHome ? c : "#000000");
    const navLinkColor = useTransform(navLinkColorBase, (c) => isHome ? c : "rgba(0, 0, 0, 0.6)");

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
            <motion.div style={{ color: textColor }}>
                <Link to="/" className="flex items-center group">
                    <span className="text-xl md:text-2xl font-bold tracking-tighter">Manu</span>
                </Link>
            </motion.div>

            <nav className="flex items-center h-full gap-4">
                {isHome ? (
                    <>
                        <NavLink to="#vision" color={navLinkColor} isAnchor>Sobre</NavLink>
                        <NavLink to="/trabajo" color={navLinkColor}>Trabajo</NavLink>
                        <NavLink to="/contacto" color={navLinkColor}>Contacto</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/#vision" color={navLinkColor} isAnchor>Sobre</NavLink>
                        <NavLink to="/trabajo" color={navLinkColor}>Trabajo</NavLink>
                        <NavLink to="/contacto" color={navLinkColor}>Contacto</NavLink>
                    </>
                )}
            </nav>
        </motion.header>
    );
};

export default AccordionNavbar;

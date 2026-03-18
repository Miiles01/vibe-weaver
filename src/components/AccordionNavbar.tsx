import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Target, Zap, Waves, Mail, Linkedin } from "lucide-react";

interface MenuItemProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    href: string;
    onClick: () => void;
}

const MenuItem = ({ icon, title, desc, href, onClick }: MenuItemProps) => (
    <motion.a
        href={href}
        onClick={onClick}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary transition-colors group"
    >
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white group-hover:scale-110 transition-transform shadow-sm">
            {icon}
        </div>
        <div className="flex-grow text-left">
            <h4 className="font-heading font-medium text-sm text-black">{title}</h4>
            <p className="text-[10px] font-light text-black/50 leading-tight">{desc}</p>
        </div>
    </motion.a>
);

const AccordionNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: <Target size={18} />, title: "Visión", desc: "Mi enfoque estratégico.", href: "#about" },
        { icon: <Zap size={18} />, title: "Capacidades", desc: "Qué puedo construir.", href: "#features" },
        { icon: <Waves size={18} />, title: "Proceso", desc: "Nuestra forma de trabajo.", href: "#process" },
        { icon: <Mail size={18} />, title: "Contacto", desc: "Comencemos a crear.", href: "#connect" },
    ];

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[320px] px-6">
            <motion.div
                layout
                initial={{ borderRadius: 40 }}
                className="bg-white/95 backdrop-blur-md border border-border/40 overflow-hidden shadow-black-lg"
                style={{ borderRadius: isOpen ? 24 : 40 }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-4 focus:outline-none group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                            <span className="text-[10px] font-medium">MH</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-xs font-medium text-black leading-none">Explorar</span>
                            <span className="text-[9px] font-light text-black/40">Menú de Navegación</span>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-black/30 group-hover:text-black transition-colors"
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="px-2 pb-2"
                        >
                            <div className="h-[1px] bg-border/40 mx-2 mb-2" />
                            <div className="flex flex-col gap-1">
                                {menuItems.map((item, i) => (
                                    <MenuItem
                                        key={item.title}
                                        {...item}
                                        onClick={() => setIsOpen(false)}
                                    />
                                ))}
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-6 py-4 border-t border-border/40">
                                <a href="https://www.linkedin.com/in/manuel-herrera-perfil" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors">
                                    <Linkedin size={18} />
                                </a>
                                <a href="mailto:contacto@manuelherrera.com" className="text-black/40 hover:text-black transition-colors">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default AccordionNavbar;

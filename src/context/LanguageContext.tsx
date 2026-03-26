import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        // Navbar
        'nav.work': 'Trabajo',
        'nav.contact': 'Contacto',
        'nav.language': 'Idioma',
        'nav.home': 'Inicio',
        'nav.about': 'Sobre',
        'common.copy': 'Copiar',
        'common.copied': 'Copiado',

        // Contact
        'contact.title': 'Contacto',
        'contact.subtitle': 'Hablemos sobre tu próximo proyecto.',

        // Work
        'work.title': 'Proyectos',
        'work.subtitle': 'Pienso con propósito para marcas que buscan autenticidad y escalabilidad.',

        // Projects
        'proj.miiles.subtitle': 'Plataforma de gestión de talento y reclutamiento inteligente.',
        'proj.colorfit.subtitle': 'Identidad visual y branding para marca de moda contemporánea.',
        'proj.naabi.subtitle': 'Diseño de experiencia y branding para productos de bienestar natural.',
        'proj.jambu.subtitle': 'Rediseño de identidad y packaging inspirado en la selva amazónica.',
        'proj.tularosa.subtitle': 'Estrategia visual y comunicación para hospitality y gastronomía.',
        'proj.erp.subtitle': 'Consultoría de marca y diseño de interfaz para ERP de alto rendimiento.',
        'proj.marvic.subtitle': 'Branding sofisticado para servicios de consultoría estratégica.',
        'proj.original.subtitle': 'Dirección de arte y diseño web para agencia creativa digital.',

        // Hero
        'hero.title': 'Soy Manu',
        'hero.cv': 'Descargar mi CV',

        // Mission
        'mission.title': 'Mi Visión',
        'mission.text': 'Mi misión es ayudar a las personas a desarrollar su autenticidad y mejorar su productividad',

        // Focuses
        'focuses.title': 'Mis principales enfoques',
        'focuses.item1': 'Ventas',
        'focuses.item2': 'Redes Sociales',
        'focuses.item3': 'Customer Experience',
        'focuses.item4': 'Funnels',
        'focuses.item5': 'CRM',
        'focuses.item6': 'Vibe Coding',
        'focuses.item7': 'Branding',
        'focuses.item8': 'Automatización con IA',

        // Sticky Grid
        'grid.title': 'Mis Proyectos',
        'grid.subtitle': 'Estos han sido los proyectos en los que he participado.',
        'grid.button': 'Ver todo mi trabajo',

        // Capabilities
        'cap.title': 'Otras capacidades',
        'cap.subtitle': 'Soluciones integrales para la era de la inteligencia artificial.',
        'cap.cat1': 'Estrategia de Ventas',
        'cap.cat1.items': 'Funnels de IA, Automatización CRM, Lead Generation, Revenue Ops',
        'cap.cat2': 'Branding con IA',
        'cap.cat2.items': 'Creación de Identidad de Marca, Generación de Media, Diseño Estratégico, Vibe Coding',
        'cap.cat3': 'Soluciones de IA',
        'cap.cat3.items': 'Agentes Autónomos, Workflows Zapier/Make, Chatbots Avanzados, Prompt Engineering',
        'cap.cat4': 'Marketing Tech',
        'cap.cat4.items': 'Google & Meta Ads, Analítica Predictiva, AB Testing, Email Marketing IA',
        'cap.cat5': 'Innovación Creativa',
        'cap.cat5.items': 'Copywriting, Media Dinámica, Ecosistemas Sociales, Community Loops',
        'cap.cat6': 'Escalamiento GTM',
        'cap.cat6.items': 'Go-To-Market Pros, Retención y Lifecycle, Alineación de Ventas, Sistemas de Crecimiento',

        // Experience
        'exp.title': 'Experiencia',
        'exp.subtitle': 'Trayectoria profesional y formación académica.',
        'edu.title': 'Educación',
        'edu.unam': 'Universidad Nacional Autónoma de México',
        'edu.admin': 'Administración, Marketing',
        'edu.grade': 'Grado: Segundo año',
        'edu.skills': 'Planes de Proyecto, Networking y +2 habilidades',

        // Footer
        'footer.headline': 'Hagámoslo',
        'footer.subline': 'Hablemos pronto',
        'footer.linkedin': 'LinkedIn',
        'footer.copyright': '© 2026 Manuel Herrera',

        // NotFound
        'notfound.title': '404',
        'notfound.text': '¡Ups! Página no encontrada',
        'notfound.button': 'Volver al Inicio',
    },
    en: {
        // Navbar
        'nav.work': 'Work',
        'nav.contact': 'Contact',
        'nav.language': 'Language',
        'nav.home': 'Home',
        'nav.about': 'About',
        'common.copy': 'Copy',
        'common.copied': 'Copied',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Let\'s talk about your next project.',

        // Work
        'work.title': 'Projects',
        'work.subtitle': 'I think with purpose for brands seeking authenticity and scalability.',

        // Projects
        'proj.miiles.subtitle': 'Intelligent talent management and recruitment platform.',
        'proj.colorfit.subtitle': 'Visual identity and branding for a contemporary fashion brand.',
        'proj.naabi.subtitle': 'Experience design and branding for natural wellness products.',
        'proj.jambu.subtitle': 'Identity and packaging redesign inspired by the Amazon jungle.',
        'proj.tularosa.subtitle': 'Visual strategy and communication for hospitality and gastronomy.',
        'proj.erp.subtitle': 'Brand consultancy and interface design for high-performance ERP.',
        'proj.marvic.subtitle': 'Sophisticated branding for strategic consulting services.',
        'proj.original.subtitle': 'Art direction and web design for digital creative agency.',

        // Hero
        'hero.title': 'I\'m Manu',
        'hero.cv': 'Download CV',

        // Mission
        'mission.title': 'My Vision',
        'mission.text': 'My mission is to help people develop their authenticity and improve their productivity',

        // Focuses
        'focuses.title': 'My main focuses',
        'focuses.item1': 'Sales',
        'focuses.item2': 'Marketing',
        'focuses.item3': 'Customer Experience',
        'focuses.item4': 'Funnels',
        'focuses.item5': 'CRM',
        'focuses.item6': 'Vibe Coding',
        'focuses.item7': 'Branding',
        'focuses.item8': 'AI Automation',

        // Sticky Grid
        'grid.title': 'My Projects',
        'grid.subtitle': 'These are the projects I have participated in.',
        'grid.button': 'View all my work',

        // Capabilities
        'cap.title': 'Other capabilities',
        'cap.subtitle': 'Comprehensive solutions for the artificial intelligence era.',
        'cap.cat1': 'Sales Strategy',
        'cap.cat1.items': 'AI Funnels, CRM Automation, Lead Generation, Revenue Ops',
        'cap.cat2': 'AI Branding',
        'cap.cat2.items': 'Brand Identity Creation, Media Generation, Strategic Design, Vibe Coding',
        'cap.cat3': 'AI Solutions',
        'cap.cat3.items': 'Autonomous Agents, Zapier/Make Workflows, Advanced Chatbots, Prompt Engineering',
        'cap.cat4': 'Marketing Tech',
        'cap.cat4.items': 'Google & Meta Ads, Predictive Analytics, AB Testing, AI Email Marketing',
        'cap.cat5': 'Creative Innovation',
        'cap.cat5.items': 'Copywriting, Dynamic Media, Social Ecosystems, Community Loops',
        'cap.cat6': 'GTM Scaling',
        'cap.cat6.items': 'Go-To-Market Pros, Retention & Lifecycle, Sales Alignment, Growth Systems',

        // Experience
        'exp.title': 'Experience',
        'exp.subtitle': 'Professional background and academic training.',
        'edu.title': 'Education',
        'edu.unam': 'National Autonomous University of Mexico',
        'edu.admin': 'Business Administration, Marketing',
        'edu.grade': 'Grade: Second year',
        'edu.skills': 'Project Plans, Networking and +2 skills',

        // Footer
        'footer.headline': 'Let\'s do it',
        'footer.subline': 'Talk soon',
        'footer.linkedin': 'LinkedIn',
        'footer.copyright': '© 2026 Manuel Herrera',

        // NotFound
        'notfound.title': '404',
        'notfound.text': 'Oops! Page not found',
        'notfound.button': 'Return to Home',
    }
};

// More complex experience data needs careful mapping
export const experienceEs = [
    {
        company: "Miiles Creative Studio",
        duration: "Contrato · 2 años 8 meses",
        roles: [
            {
                title: "Brand Manager",
                period: "Abril 2025 - Febrero 2026 · 11 meses",
                location: "México · Híbrido",
                details: [
                    "Estrategia de Marketing con IA y Optimización de Funnels: Planificación y ejecución de funnels de marketing impulsados por IA, estrategias de posicionamiento y sistemas de conversión, integrando análisis de datos, flujos de trabajo de \"vibe coding\" y automatización con IA utilizando herramientas avanzadas como Lovable, Base44, Antigravity, Zapier, y Make.",
                    "Posicionamiento de Producto con IA y Storytelling: Desarrollo de estrategias de posicionamiento y marcos narrativos para productos de IA, traduciendo capacidades complejas de IA en propuestas de valor claras a través de storytelling, insights basados en datos y estrategias de marketing enfocadas al crecimiento."
                ]
            },
            {
                title: "Marketing Project Manager",
                period: "Febrero 2024 - Abril 2025 · 1 año 3 meses",
                details: [
                    "Gestión de Proyectos y Estrategias Digitales: Planificación y ejecución de estrategias de marketing digital, SEO & SEM, y growth marketing, usando Google Ads, Facebook Ads, y LinkedIn Ads.",
                    "Análisis de Datos e Inteligencia de Negocios: Optimización de campañas con Google Analytics, SEMrush, Tableau, y Power BI. Implementación de pruebas A/B y estrategias de conversión.",
                    "Contenido y Redes Sociales: Estrategias de marketing de contenidos e influencer marketing en Instagram, LinkedIn, TikTok, y YouTube."
                ],
                skills: "Customer Experience, Media Strategy y +4 habilidades"
            },
            {
                title: "Junior Marketer",
                period: "Julio 2023 - Enero 2024 · 7 meses",
                location: "Remoto",
                details: [
                    "Estrategias de Retención: Implementación de flujos automatizados en Klaviyo y ActiveCampaign para aumentar el LTV y reducir el churn rate.",
                    "Campañas Outbound: Desarrollo de campañas multicanal usando GoHighLevel e Instantly, optimizando la conversión de leads calificados (SQL).",
                    "Entregabilidad: Configuración de registros DMARC, DKIM y TXT para asegurar la entrega en bandeja de entrada."
                ]
            }
        ]
    },
    {
        company: "Fiverr",
        duration: "5 años 7 meses",
        location: "Remoto",
        roles: [
            {
                title: "Digital Specialist",
                period: "Marzo 2020 - Septiembre 2024 · 4 años 7 meses",
                details: [
                    "Branding y Estrategia: Creación de identidades visuales alineadas con la propuesta de valor, optimizando el posicionamiento en el mercado.",
                    "Multimedia: Creación de contenido visual con Adobe Creative Suite, Figma, y Canva para campañas digitales.",
                    "Growth Marketing: Desarrollo de estrategias de contenidos en Instagram, Facebook, LinkedIn, y TikTok."
                ],
                skills: "Digital Marketing Media, Google Analytics y +1 habilidad"
            },
            {
                title: "Branding Freelancer",
                period: "Marzo 2019 - Febrero 2020 · 1 año",
                details: [
                    "Localización de Campañas: Adaptación de mensajes y experiencias de usuario para asegurar resonancia cultural en LATAM.",
                    "Conciencia Orgánica: Activación de comunidades locales e influencers para aumentar el alcance sin inversión en medios pagados.",
                    "Estética Minimalista: Supervisión de contenido narrativo con énfasis en branding emocional y storytelling visual."
                ]
            }
        ]
    },
    {
        company: "BRIX Agency",
        duration: "Jornada completa",
        roles: [
            {
                title: "Product Designer",
                period: "Febrero 2023 - Mayo 2023 · 4 mos",
                location: "Estados Unidos · Remoto",
                details: [
                    "Diseño UX/UI: Creación y optimización de interfaces intuitivas en Figma para una experiencia fluida.",
                    "Desarrollo Web: Colaboración técnica para asegurar la correcta implementación de diseños.",
                    "Investigación: Análisis de usuarios y pruebas de usabilidad para mejorar accesibilidad y conversión."
                ],
                skills: "Customer Experience"
            }
        ]
    },
    {
        company: "Educación",
        roles: [
            {
                title: "Universidad Nacional Autónoma de México",
                period: "Administración, Marketing",
                location: "2022 – Presente",
                details: ["Segundo año académico."],
                skills: "Planes de Proyecto, Networking y +2 habilidades"
            }
        ]
    },
    {
        company: "Idiomas",
        roles: [
            {
                title: "Español",
                period: "Nativo"
            },
            {
                title: "Inglés",
                period: "Profesional"
            }
        ]
    }
];

export const experienceEn = [
    {
        company: "Miiles Creative Studio",
        duration: "Contract · 2 yrs 8 mos",
        roles: [
            {
                title: "Brand Manager",
                period: "Apr 2025 - Feb 2026 · 11 mos",
                location: "Mexico · Hybrid",
                details: [
                    "AI Marketing Strategy & Funnel Optimization: Planning and execution of AI-driven marketing funnels, positioning strategies and conversion systems, integrating data analytics, vibe coding workflows and AI-powered automation using advanced tools such as Lovable, Base44, Antigravity, Zapier, and Make.",
                    "AI Product Positioning & Storytelling: Development of positioning strategies and narrative frameworks for AI products, translating complex AI capabilities into clear value propositions through storytelling, data-driven insights and growth-focused marketing strategies."
                ]
            },
            {
                title: "Marketing Project Manager",
                period: "Feb 2024 - Apr 2025 · 1 yr 3 mos",
                details: [
                    "Project Management and Digital Strategies: Planning and execution of digital marketing strategies, SEO & SEM, and growth marketing, using Google Ads, Facebook Ads, and LinkedIn Ads.",
                    "Data Analysis and Business Intelligence: Campaign optimization with Google Analytics, SEMrush, Tableau, and Power BI. Implementation of A/B testing and conversion strategies.",
                    "Content Marketing and Social Media: Content marketing and influencer marketing strategies on Instagram, LinkedIn, TikTok, and YouTube."
                ],
                skills: "Customer Experience, Media Strategy and +4 skills"
            },
            {
                title: "Junior Marketer",
                period: "Jul 2023 - Jan 2024 · 7 mos",
                location: "Remote",
                details: [
                    "Execution of retention and lifecycle marketing strategies: Implementation of automated flows on platforms like Klaviyo and ActiveCampaign to increase LTV and reduce churn rate.",
                    "Management of full-funnel and outbound campaigns: Development of multichannel campaigns using platforms like GoHighLevel and Instantly, optimizing the conversion of qualified leads (SQL).",
                    "Domain reputation and deliverability optimization: Configuration of DMARC, DKIM, and TXT records to ensure proper inbox delivery of email campaigns."
                ]
            }
        ]
    },
    {
        company: "Fiverr",
        duration: "5 yrs 7 mos",
        location: "Remote",
        roles: [
            {
                title: "Digital Specialist",
                period: "Mar 2020 - Sep 2024 · 4 yrs 7 mos",
                details: [
                    "Branding and Brand Strategy: Creation of visual identities aligned with the client’s value proposition, optimizing their market positioning.",
                    "Graphic Design and Multimedia: Creation of visual content with Adobe Creative Suite, Figma, and Canva, including materials for digital campaigns and branding.",
                    "Content Management and Creation: Development of content marketing strategies and campaigns on Instagram, Facebook, LinkedIn, and TikTok, applying growth marketing techniques."
                ],
                skills: "Digital Marketing Media, Google Analytics and +1 skill"
            },
            {
                title: "Branding Freelancer",
                period: "Freelance · Mar 2019 - Feb 2020 · 1 yr",
                details: [
                    "Campaign localization for new markets: Adaptation of messaging, visual assets, and user experiences to ensure cultural resonance and brand positioning in specific regions such as LATAM.",
                    "Organic awareness and advocacy strategies: Activation of local communities and influencers through strategic collaborations to increase reach and engagement without relying on paid media.",
                    "Creative focused on minimalist aesthetics: Supervision of visual and narrative content with an emphasis on emotional branding, storytelling, and visual consistency across platforms like Instagram and TikTok."
                ]
            }
        ]
    },
    {
        company: "BRIX Agency",
        duration: "Full-time",
        roles: [
            {
                title: "Product Designer",
                period: "Feb 2023 - May 2023 · 4 mos",
                location: "United States · Remote",
                details: [
                    "UX/UI Design: Creation and optimization of intuitive and attractive interfaces in Figma, ensuring a smooth user experience.",
                    "Web Development: Collaboration with development teams to ensure the correct implementation of designs on digital platforms.",
                    "Research and Prototyping: User analysis and usability testing to improve accessibility and conversion."
                ],
                skills: "Customer Experience"
            }
        ]
    },
    {
        company: "Education",
        roles: [
            {
                title: "National Autonomous University of Mexico",
                period: "Business Administration, Marketing",
                location: "2022 – Present",
                details: ["Second year academic."],
                skills: "Project Plans, Networking and +2 skills"
            }
        ]
    },
    {
        company: "Languages",
        roles: [
            {
                title: "Spanish",
                period: "Native"
            },
            {
                title: "English",
                period: "Professional"
            }
        ]
    }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'es';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

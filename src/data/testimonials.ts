export interface Testimonial {
  name: string;
  role: { es: string; en: string };
  text: { es: string; en: string };
}

export const testimonials: Testimonial[] = [
  {
    name: "Carlos Rivera",
    role: { es: "Fundador de Original Barber", en: "Founder of Original Barber" },
    text: {
      es: "Manuel entendió exactamente lo que necesitábamos. Su diseño de embudo hizo que nuestras reservas aumentaran un 40% en semanas. La estética es de primer nivel.",
      en: "Manuel understood exactly what we needed. His funnel design boosted our bookings by 40% in weeks. The aesthetic is top-tier."
    }
  },
  {
    name: "Mariana & Víctor",
    role: { es: "CEOs de Mar & Vic", en: "CEOs of Mar & Vic" },
    text: {
      es: "La automatización en Shopify que implementó cambió nuestro negocio. Dejamos de perder carritos y la identidad visual le dio un aire súper premium a nuestra marca.",
      en: "The Shopify automation he implemented changed our business. We stopped losing carts, and the visual identity gave our brand a super premium feel."
    }
  },
  {
    name: "Dra. Sofía Valdés",
    role: { es: "Directora en Naabi Kanabi", en: "Director at Naabi Kanabi" },
    text: {
      es: "Integrar al Agente de IA Conversacional revolucionó cómo atendemos a nuestros pacientes online. Manuel combinó excelente diseño web con tecnología médica precisa.",
      en: "Integrating the Conversational AI Agent revolutionized how we serve our patients online. Manuel combined excellent web design with precise medical technology."
    }
  },
  {
    name: "Roberto Garza",
    role: { es: "Socio Fundador de Tularosa", en: "Founding Partner of Tularosa" },
    text: {
      es: "El impacto en la mesa fue inmediato. La interfaz gráfica nos ayuda a mostrar nuestra calidad gastronómica de una forma que hace imposible no querer reservar.",
      en: "The table impact was immediate. The graphic interface helps us showcase our gastronomic quality in a way that makes it impossible not to want to book."
    }
  },
  {
    name: "Elena Suárez",
    role: { es: "CMO de Jambú", en: "CMO of Jambú" },
    text: {
      es: "Nuestros empaques pasaron de verse genéricos a destacar en los anaqueles a metros de distancia. Su visión sobre la escalabilidad corporativa no tiene precio.",
      en: "Our packaging went from looking generic to standing out on shelves from meters away. His vision on corporate scalability is priceless."
    }
  },
  {
    name: "Daniela Ortiz",
    role: { es: "Co-fundadora de Colorfit", en: "Co-founder of Colorfit" },
    text: {
      es: "Nos alejamos de los clichés de la industria del fitness gracias a su psicología de color. La marca se siente fresca, seria y muy profesional.",
      en: "We moved away from fitness industry clichés thanks to his color psychology. The brand feels fresh, serious, and highly professional."
    }
  },
  {
    name: "Fernando López",
    role: { es: "CTO de ERPXtender", en: "CTO of ERPXtender" },
    text: {
      es: "Tradujo nuestra compleja oferta de software B2B en una plataforma simple, atractiva y orientada 100% a la conversión de leads. Un trabajo excepcional.",
      en: "He translated our complex B2B software offering into a simple, attractive, and 100% lead-conversion-oriented platform. Exceptional work."
    }
  },
  {
    name: "Andrés Silva",
    role: { es: "Prival Inmobiliaria", en: "Prival Real Estate" },
    text: {
      es: "Sus landing pages logran transmitir verdadera urgencia y exclusividad. Maneja el diseño UX con la psicología de ventas de forma maestra.",
      en: "His landing pages successfully convey true urgency and exclusivity. He masters UX design combined with sales psychology."
    }
  }
];

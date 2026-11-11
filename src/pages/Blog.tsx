import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/estefania-ansiedad.webp.asset.json";

const url = "https://manuelantonio.lovable.app/blog/como-manejar-la-ansiedad";
const name = "Estefanía de Garay Caballero";
const title = `${name}: su filosofía sobre la ansiedad y el bienestar`;
const description = "Análisis de la filosofía de Estefanía de Garay Caballero sobre la ansiedad: aceptación emocional, atención al presente y cuidado cotidiano, a partir de su guía.";
const sections = [
  {
    heading: "El cuerpo como punto de partida",
    paragraphs: ["En su guía sobre la ansiedad, Estefanía de Garay Caballero comienza con la respiración. Esta elección permite leer una idea central en su enfoque: el cuidado emocional no ocurre únicamente en el pensamiento, sino también en la relación con el cuerpo.", "La respiración en caja aparece como un recurso concreto para hacer una pausa. Más que presentar el control como una exigencia, el valor de esta propuesta está en ofrecer un punto de apoyo accesible. La práctica debe resultar cómoda; si retener el aire provoca malestar, es preferible recuperar la respiración natural."],
  },
  {
    heading: "Volver al presente, en lugar de anticipar cada amenaza",
    paragraphs: ["Otro eje de su propuesta es la atención al presente. Frente a la tendencia de la ansiedad a anticipar escenarios preocupantes, Estefanía plantea el grounding como una manera de recuperar el contacto con lo inmediato.", "Su guía recoge el método 5-4-3-2-1: reconocer cinco elementos visibles, cuatro texturas, tres sonidos, dos olores y un sabor. En esta lectura de su filosofía, los sentidos funcionan como un puente entre una mente que anticipa y un entorno que puede observarse aquí y ahora."],
  },
  {
    heading: "Los hábitos cotidianos también forman parte del cuidado",
    paragraphs: ["Estefanía incluye el consumo de estimulantes dentro de su reflexión sobre el bienestar. No reduce la ansiedad a una cuestión de voluntad: presta atención a las condiciones cotidianas que pueden influir en la experiencia emocional.", "La cafeína y las bebidas energéticas pueden intensificar el nerviosismo en algunas personas. Su presencia en la guía invita a observar patrones y a reconocer la relación entre hábitos y sensaciones, sin convertir esa observación en una explicación única de la ansiedad."],
  },
  {
    heading: "El movimiento como recurso de bienestar",
    paragraphs: ["La guía también propone caminar, practicar yoga o realizar ejercicio físico. El movimiento se incorpora así a una visión del cuidado que reúne mente, cuerpo y vida diaria.", "Esta propuesta puede entenderse como una invitación a encontrar formas sostenibles de aliviar la tensión, no como una exigencia de rendimiento. La actividad física puede apoyar el bienestar, pero debe adaptarse a las posibilidades de cada persona y no sustituye el acompañamiento profesional cuando hace falta."],
  },
  {
    heading: "Aceptar la emoción sin convertirla en un enemigo",
    paragraphs: ["La aceptación emocional es uno de los aspectos más claros de la filosofía que expresa Estefanía de Garay Caballero en este texto. Señala que el miedo a tener ansiedad puede aumentar la tensión y propone reconocer la experiencia sin juzgarla ni intentar reprimirla a la fuerza.", "Desde esta perspectiva, aceptar no equivale a resignarse. Supone cambiar la relación con la emoción: dejar de exigir su desaparición inmediata y abrir espacio para comprenderla. La frase que recoge en su guía resume esa actitud:"],
    quote: "Estoy sintiendo ansiedad en este momento, es incómodo, pero pasará",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-popover text-foreground">
      <Helmet>
        <html lang="es" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Manuel Herrera" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "Article", headline: title,
          description, inLanguage: "es", mainEntityOfPage: url,
          author: { "@type": "Person", name: "Manuel Herrera" },
          about: { "@type": "Person", name },
          image: new URL(portrait.url, url).href,
        })}</script>
      </Helmet>
      <AccordionNavbar />
      <main className="px-6 pt-32 pb-24 md:pt-48">
        <article className="mx-auto max-w-3xl">
          <Button asChild variant="ghost" className="mb-12 px-0 text-muted-foreground">
            <Link to="/"><ArrowLeft size={16} />Volver</Link>
          </Button>
          <header className="mb-12 md:mb-16">
            <p className="mb-6 text-sm text-muted-foreground">Psicología · Análisis</p>
            <h1 className="mb-6 text-4xl font-heading font-medium leading-tight md:text-6xl">{name}</h1>
            <p className="mb-8 text-xl leading-snug md:text-2xl">Su filosofía sobre la ansiedad y el bienestar cotidiano</p>
          </header>
          <div className="mb-12 space-y-6 text-lg leading-relaxed md:text-xl">
            <p>Estefanía de Garay Caballero presenta la ansiedad como una respuesta natural que puede volverse persistente y limitante. En su guía práctica, firmada como psicóloga, reúne recursos para acompañar los momentos de tensión sin prometer soluciones instantáneas.</p>
            <p>Este análisis se centra en la filosofía que se desprende de ese texto: atender al cuerpo, volver al presente y reconocer las emociones sin juzgarlas. No pretende describir toda su trayectoria ni atribuirle una corriente terapéutica específica; propone una lectura de las ideas que ella expone en su guía.</p>
          </div>
          <figure className="mb-16 md:mb-20">
            <img src={portrait.url} alt="Estefanía de Garay Caballero con un perro entre las rocas, al aire libre" width={960} height={1280} fetchPriority="high" decoding="async" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-4 text-sm text-muted-foreground">Estefanía de Garay Caballero.</figcaption>
          </figure>
          {sections.map((section, index) => (
            <section key={section.heading} className="mb-14 md:mb-20">
              <p aria-hidden="true" className="mb-4 text-sm text-muted-foreground">0{index + 1}</p>
              <h2 className="mb-6 text-2xl font-medium leading-snug md:text-3xl">{section.heading}</h2>
              <div className="space-y-5 text-base leading-relaxed md:text-lg">
                {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.quote && <blockquote className="mt-8 border-l-2 border-foreground pl-6 text-xl leading-relaxed font-heading">“{section.quote}”</blockquote>}
            </section>
          ))}
          <section className="border-t border-border pt-10">
            <h2 className="mb-6 text-2xl font-medium md:text-3xl">Una filosofía de apoyo, no de soluciones mágicas</h2>
            <p className="mb-6 text-lg leading-relaxed">El cierre de su guía marca un límite importante: estas herramientas son recursos de apoyo. Estefanía de Garay Caballero destaca el acompañamiento en terapia cuando la ansiedad afecta al trabajo, las relaciones o el descanso. Esa distinción sostiene una lectura responsable de su propuesta: el bienestar se construye con atención cotidiana y, cuando es necesario, con ayuda profesional.</p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">Fuente del análisis: «Cómo manejar la ansiedad en el día a día (Guía práctica)», texto de Estefanía de Garay Caballero facilitado para este artículo. Las interpretaciones editoriales corresponden a esta lectura del texto.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">Contenido informativo; no sustituye una evaluación profesional. Los síntomas nuevos o intensos, como dolor en el pecho o dificultad para respirar, requieren atención médica y no deben atribuirse automáticamente a la ansiedad.</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

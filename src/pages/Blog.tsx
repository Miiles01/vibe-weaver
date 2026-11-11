import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/estefania-ansiedad.webp.asset.json";

const url = "https://manuelantonio.lovable.app/blog/como-manejar-la-ansiedad";
const title = "Cómo manejar la ansiedad en el día a día (Guía práctica)";
const description = "Estefanía de Garay Caballero comparte cinco recursos para manejar la ansiedad cotidiana: respiración, grounding, hábitos, movimiento y aceptación emocional.";
const sections = [
  {
    heading: "Respiración en caja",
    paragraphs: ["Cuando sientas que la ansiedad sube, intenta respirar con suavidad y sin forzar. La respiración en caja propone cuatro tiempos: inhalar durante 4 segundos, sostener 4 segundos, exhalar lentamente durante 4 segundos y hacer una pausa de 4 segundos antes de comenzar de nuevo.", "Puedes repetir el ciclo hasta 5 veces, siempre que te resulte cómodo. Si retener el aire te genera malestar o mareo, vuelve a tu respiración natural. No necesitas completar el ejercicio a la fuerza."],
  },
  {
    heading: "Técnica de grounding: el método 5-4-3-2-1",
    paragraphs: ["La ansiedad puede llevar nuestra atención hacia escenarios preocupantes del futuro. Para regresar al aquí y ahora, utiliza tus sentidos y observa tu entorno sin prisa:"],
    senses: ["5 cosas que puedes ver a tu alrededor.", "4 objetos que puedes tocar: concéntrate en su textura.", "3 sonidos distintos que puedes escuchar.", "2 olores que puedes percibir en el ambiente.", "1 sabor que puedes notar en tu boca."],
  },
  {
    heading: "Reducción de estimulantes en tu dieta",
    paragraphs: ["Lo que consumes puede influir en cómo te sientes. La cafeína y las bebidas energéticas pueden aumentar el nerviosismo o provocar sensaciones como palpitaciones y temblores en algunas personas.", "Observa cómo responde tu cuerpo y considera reducir su consumo si notas que intensifica tu ansiedad. Se trata de reconocer tus propios patrones, no de imponerte una dieta rígida."],
  },
  {
    heading: "Movimiento físico y bienestar",
    paragraphs: ["Caminar, practicar yoga o realizar una actividad física que disfrutes puede ayudarte a aliviar la tensión y favorecer tu bienestar. No hace falta empezar con una rutina exigente: un paseo breve también puede ser un buen punto de partida.", "Elige un movimiento que se adapte a tu condición física y a tu energía del día. La intención es cuidarte, no añadir una nueva obligación."],
  },
  {
    heading: "Aceptación emocional: no luches contra el síntoma",
    paragraphs: ["El miedo a sentir ansiedad puede añadir más tensión a lo que ya estás viviendo. En lugar de intentar reprimir la emoción a la fuerza, prueba a reconocerla sin juzgarte.", "Aceptar lo que sientes no significa resignarte. Significa darte espacio para atravesar la emoción y buscar el apoyo que necesitas."],
    quote: "Estoy sintiendo ansiedad en este momento. Es incómodo, pero puedo acompañarme mientras pasa.",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-popover text-foreground">
      <Helmet>
        <html lang="es" />
        <title>Estefanía de Garay Caballero | Cómo manejar la ansiedad</title>
        <meta name="description" content={description} />
        <meta name="author" content="Estefanía de Garay Caballero" />
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
          author: { "@type": "Person", name: "Estefanía de Garay Caballero" },
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
            <p className="mb-6 text-sm text-muted-foreground">Bienestar · Guía práctica</p>
            <h1 className="mb-8 text-4xl font-heading font-medium leading-tight md:text-6xl">{title}</h1>
            <p className="text-base text-muted-foreground">Por <span className="text-foreground">Estefanía de Garay Caballero</span>, psicóloga</p>
          </header>
          <div className="mb-12 space-y-6 text-lg leading-relaxed md:text-xl">
            <p>La ansiedad es, en su origen, una respuesta natural del cuerpo ante situaciones percibidas como amenazantes. Sin embargo, esa alarma puede quedarse encendida incluso cuando no existe un peligro inmediato. Cuando la ansiedad se vuelve persistente y limita tu vida cotidiana, es importante buscar apoyo.</p>
            <p>Como psicóloga, trabajo frecuentemente con pacientes que buscan herramientas para calmar la mente acelerada. A continuación, te comparto una guía práctica con recursos para acompañarte en los momentos de tensión del día a día.</p>
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
                {section.senses && <ul className="space-y-3 pl-5 list-disc">{section.senses.map(sense => <li key={sense}>{sense}</li>)}</ul>}
              </div>
              {section.quote && <blockquote className="mt-8 border-l-2 border-foreground pl-6 text-xl leading-relaxed font-heading">“{section.quote}”</blockquote>}
            </section>
          ))}
          <section className="border-t border-border pt-10">
            <h2 className="mb-6 text-2xl font-medium md:text-3xl">Cuándo buscar acompañamiento profesional</h2>
            <p className="mb-6 text-lg leading-relaxed">Estas técnicas son recursos de apoyo, no curas mágicas ni un sustituto de la atención profesional. Si la ansiedad interfiere significativamente con tu trabajo, tus relaciones o tu descanso, el acompañamiento en terapia psicológica puede ayudarte a comprender lo que ocurre y a construir un bienestar duradero.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">Contenido informativo general. Si experimentas síntomas nuevos o intensos, como dolor en el pecho o dificultad para respirar, busca atención médica; no los atribuyas automáticamente a la ansiedad.</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

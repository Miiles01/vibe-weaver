import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";

const sections = [
  {
    heading: "No jugamos lindo, jugamos difícil",
    body: [
      "Hay un comentario que Tefi escuchó muchas veces y que todavía le molesta: que el vóley femenino es \"lindo de ver\".",
      "Para ella, esa frase esconde algo. Reduce a las jugadoras a una imagen, cuando detrás de cada punto hay años de entrenamiento, lesiones superadas, madrugadas en el gimnasio y una exigencia física y mental enorme.",
      "\"No jugamos lindo, jugamos difícil\", repite. Y lo dice sin enojo, pero con firmeza. Quiere que quien mire un partido de vóley femenino vea lo que realmente pasa en la cancha: lectura de juego, potencia, estrategia y carácter.",
    ],
    quote: "No jugamos lindo, jugamos difícil",
  },
  {
    heading: "La fuerza también es femenina",
    body: [
      "Durante mucho tiempo, a muchas chicas se les enseñó a ser prolijas, calladas y discretas. A no destacar demasiado. A no levantar la voz.",
      "El vóley le enseñó a Estefanía exactamente lo contrario. En la cancha hay que gritar, pedir la pelota, saltar con todo y atacar sin dudar. No hay lugar para la duda ni para achicarse.",
      "Por eso cree que el deporte puede cambiarle la vida a una niña. No solo porque la hace más fuerte físicamente, sino porque le enseña que su voz importa, que su cuerpo es una herramienta y no algo que hay que esconder, y que puede competir sin pedir disculpas.",
    ],
    quote: "Una chica que aprende a pedir la pelota en la cancha aprende a pedir lo que le corresponde en la vida",
  },
  {
    heading: "Lo que no se ve detrás de cada partido",
    body: [
      "Tefi sabe que el camino de las mujeres en el deporte suele ser más largo y más cuesta arriba. Menos recursos, menos visibilidad, menos espacios en los medios, y muchas veces la presión de tener que elegir entre el deporte y otras expectativas.",
      "Ella misma conoció de cerca lo que significa empezar de abajo: aprendió a jugar en la arena de la costanera de Santa Fe, con una red remendada y una pelota que llegaba mojada. Nada de eso la frenó. Pero sabe que no todas tienen a alguien que les arme la red o les diga que sigan.",
      "Por eso quiere ser, para otras, lo que algunas personas fueron para ella: una voz que empuja, que confía y que abre la puerta.",
    ],
  },
  {
    heading: "Una cancha donde nadie juega sola",
    body: [
      "Si hay algo que el vóley tiene de especial, según Estefanía, es que nadie puede ganar sola. Nadie puede tocar la pelota dos veces seguidas. Siempre necesitás a otra.",
      "Para ella, esa regla es también una forma de entender el empoderamiento femenino. No se trata de que una mujer llegue lejos, sino de que llegue lejos y extienda la mano. De construir equipos, redes y comunidades donde cada una haga mejor a la que tiene al lado.",
    ],
    quote: "Ninguna llega sola. La que llega, tiene que volver a buscar a las demás.",
  },
];

const manifesto = [
  "Manifiesta estadios llenos para ver partidos de mujeres.",
  "Manifiesta niñas que crecen con referentes que se parecen a ellas.",
  "Manifiesta clubes con los mismos recursos para sus equipos femeninos que para los masculinos.",
  "Manifiesta transmisiones, sponsors y titulares que hablen de rendimiento y no de apariencia.",
  "Y manifiesta, algún día, vestir la camiseta argentina en unos Juegos Olímpicos.",
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7 },
} as const;

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <AccordionNavbar />

      <main className="pt-32 md:pt-48 pb-24 px-6">
        <article className="container mx-auto max-w-3xl">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-heading font-medium opacity-50 hover:opacity-100 transition-opacity mb-16"
          >
            <ArrowLeft size={16} />
            Volver
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <p className="text-xs font-heading font-medium tracking-[0.25em] uppercase opacity-40 mb-8">Blog</p>
            <h1 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter leading-[1.05] mb-10">
              Estefanía de Garay Caballero:{" "}
              <span className="opacity-40 font-light">"El vóley femenino no necesita permiso para ser grande"</span>
            </h1>
            <p className="text-sm font-heading font-light opacity-50 tracking-wide">
              Vóley · Entrevista
            </p>
          </motion.div>

          {/* Intro */}
          <motion.div {...reveal} className="mb-20">
            <p className="text-xl md:text-2xl font-heading font-light leading-relaxed mb-8">
              Cuando Estefanía de Garay Caballero habla de vóley, no habla solamente de saques, bloqueos y ataques. Habla de mujeres que se animan, de niñas que descubren su fuerza y de un deporte que, según ella, todavía no recibe todo lo que merece. Para la voleibolista santafesina, cada partido también es una forma de decir algo.
            </p>
            <p className="text-lg md:text-xl font-heading font-light leading-relaxed opacity-70">
              Y lo que tiene para decir es claro: el vóley femenino no es un complemento, ni una versión "más suave" del deporte. Es competencia, es esfuerzo y es talento. Y ya es hora de que se vea así.
            </p>
          </motion.div>

          {/* Sections */}
          {sections.map((section, i) => (
            <motion.section key={i} {...reveal} className="mb-20 md:mb-28">
              <h2 className="text-2xl md:text-4xl font-heading font-medium tracking-tighter mb-8">
                {section.heading}
              </h2>
              <div className="space-y-6">
                {section.body.map((paragraph, pi) => (
                  <p key={pi} className="text-base md:text-lg font-heading font-light leading-relaxed opacity-80">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.quote && (
                <blockquote className="mt-12 mb-4 pl-6 md:pl-10 border-l-2 border-current">
                  <p className="text-xl md:text-3xl font-heading font-light leading-snug">
                    "{section.quote}"
                  </p>
                </blockquote>
              )}
            </motion.section>
          ))}

          {/* Manifesto */}
          <motion.section {...reveal} className="mb-20 md:mb-28">
            <h2 className="text-2xl md:text-4xl font-heading font-medium tracking-tighter mb-8">
              Lo que manifiesta para el futuro
            </h2>
            <p className="text-base md:text-lg font-heading font-light leading-relaxed opacity-80 mb-10">
              Estefanía tiene metas claras y no tiene miedo de decirlas en voz alta. Porque cree que lo que se nombra empieza a existir.
            </p>
            <ul className="space-y-5">
              {manifesto.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-lg md:text-xl font-heading font-medium leading-snug flex gap-4"
                >
                  <span className="opacity-30 shrink-0">0{i + 1}</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-base md:text-lg font-heading font-light leading-relaxed opacity-80 mt-12">
              Pero también tiene un sueño más cercano: volver a Santa Fe y abrir una escuela de vóley en la costanera, un lugar donde cualquier chica pueda llegar, descalza, y descubrir de lo que es capaz.
            </p>
          </motion.section>

          {/* Closing */}
          <motion.section {...reveal} className="mb-20 md:mb-28">
            <h2 className="text-2xl md:text-4xl font-heading font-medium tracking-tighter mb-8">
              Un mensaje para las que recién empiezan
            </h2>
            <p className="text-base md:text-lg font-heading font-light leading-relaxed opacity-80 mb-10">
              Cuando le preguntan qué le diría a una niña que está empezando a jugar, Tefi no duda:
            </p>
            <blockquote className="pl-6 md:pl-10 border-l-2 border-current">
              <p className="text-xl md:text-3xl font-heading font-light leading-snug">
                "Que no se achique. Que salte aunque tenga miedo. Que se equivoque, porque el error también enseña. Que pida la pelota. Y que nunca deje que nadie le diga que su deporte vale menos."
              </p>
            </blockquote>
          </motion.section>

          {/* Outro */}
          <motion.div {...reveal} className="pt-16 border-t border-current/10">
            <p className="text-xl md:text-2xl font-heading font-light leading-relaxed mb-8">
              Porque para Estefanía de Garay Caballero, el vóley femenino no necesita permiso para ser grande.{" "}
              <span className="font-medium">Ya lo es. Solo falta que el mundo termine de mirarlo.</span> 🏐💜
            </p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

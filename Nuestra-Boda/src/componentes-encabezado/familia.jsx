import { motion } from "framer-motion";

/* =========================================
   PALETA
========================================= */

const palette = {
  navy: "#102A52",
  navyDark: "#071A35",
  sky: "#9CCBF0",
  skyLight: "#D9EBF8",
  white: "#FFFFFF",
  text: "#172033",
};

/* =========================================
   DATOS
========================================= */

const familias = [
  {
    titulo: "Padres del novio",
    nombres: [
      {
        nombre:
          "Salvador Santellano Cervantes",
      },
      {
        nombre:
          "María Julieta Valdez Salazar",
      },
    ],
  },
  {
    titulo: "Padres de la novia",
    nombres: [
      {
        nombre:
          "Alfredo San Juan Hernández",
      },
      {
        nombre:
          "Susana Ramírez Vargas †",
      },
    ],
  },
];

/* =========================================
   ANIMACIONES
========================================= */

const containerAnimation = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================
   SEPARADOR
========================================= */

function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className="h-px w-10 sm:w-16"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(24,78,166,0.75))",
        }}
      />

      <span
        className="
          h-[6px]
          w-[6px]
          rotate-45
          border
        "
        style={{
          borderColor:
            palette.navy,
        }}
      />

      <span
        className="h-px w-10 sm:w-16"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(24,78,166,0.75))",
        }}
      />
    </div>
  );
}

/* =========================================
   TARJETA
========================================= */

function TarjetaPadres({
  titulo,
  nombres,
}) {
  return (
    <motion.article
      variants={cardAnimation}
      className="
        relative
        flex
        min-h-[330px]
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        border
        px-7
        py-12
        text-center
        text-white

        sm:min-h-[370px]
        sm:px-10
        sm:py-14
      "
      style={{
        background: `
          linear-gradient(
            160deg,
            ${palette.navy} 0%,
            ${palette.navyDark} 100%
          )
        `,

        borderColor:
          "rgba(16,42,82,0.35)",

        boxShadow:
          "0 24px 65px rgba(16,42,82,0.16)",
      }}
    >
      {/* LUZ DECORATIVA */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-160px]
          h-[300px]
          w-[300px]
          -translate-x-1/2
          rounded-full
          blur-3xl
        "
        style={{
          backgroundColor:
            "rgba(156,203,240,0.13)",
        }}
      />

      {/* BORDE INTERIOR */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[8px]
          border
        "
        style={{
          borderColor:
            "rgba(156,203,240,0.24)",
        }}
      />

      {/* ORNAMENTO SUPERIOR */}

      <div
        className="
          absolute
          left-1/2
          top-8
          h-[7px]
          w-[7px]
          -translate-x-1/2
          rotate-45
          border
        "
        style={{
          borderColor:
            palette.sky,
        }}
      />

      {/* INFORMACIÓN */}

      <div className="relative z-10">


        <h3
          className="
            mt-5
            font-serif
            text-3xl
            font-normal
            text-white

            sm:text-4xl
          "
        >
          {titulo}
        </h3>

        <div
          className="
            mx-auto
            mt-6
            h-px
            w-16
          "
          style={{
            backgroundColor:
              palette.sky,
          }}
        />

        <div className="mt-8 space-y-6">
          {nombres.map(
            (
              persona,
              index
            ) => (
              <div
                key={`${persona.nombre}-${index}`}
              >
                <p
                  className="
                    font-serif
                    text-xl
                    leading-8
                    text-white

                    sm:text-2xl
                  "
                >
                  {persona.nombre}
                </p>

              </div>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function Padres() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        px-5
        py-24

        sm:px-8
        sm:py-28

        lg:px-12
        lg:py-32
      "
    >
      {/* DECORACIÓN DE FONDO */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-160px]
          top-[-160px]
          h-[360px]
          w-[360px]
          rounded-full
          blur-3xl
        "
        style={{
          backgroundColor:
            "rgba(156,203,240,0.18)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          right-[-180px]
          h-[400px]
          w-[400px]
          rounded-full
          blur-3xl
        "
        style={{
          backgroundColor:
            "rgba(217,235,248,0.65)",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
        "
      >
        {/* ENCABEZADO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mb-14
            max-w-3xl
            text-center

            sm:mb-16
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.45em]

              sm:text-[10px]
              sm:tracking-[0.55em]
            "
            style={{
              color:
                palette.navy,
            }}
          >
            Nuestra familia
          </p>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          <h2
            className="
              mt-7
              font-serif
              text-4xl
              font-normal
              leading-tight

              sm:text-5xl
              md:text-6xl
            "
            style={{
              color:
                palette.text,
            }}
          >
            Con la bendición de nuestros padres
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              font-serif
              text-lg
              italic
              leading-8

              sm:text-xl
            "
            style={{
              color:
                palette.navy,
            }}
          >
            Quienes con su amor y ejemplo han acompañado nuestro camino.
          </p>
        </motion.div>

        {/* TARJETAS */}

        <motion.div
          variants={
            containerAnimation
          }
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            gap-7

            md:grid-cols-2
            md:gap-8

            lg:gap-10
          "
        >
          {familias.map(
            (familia) => (
              <TarjetaPadres
                key={
                  familia.titulo
                }
                titulo={
                  familia.titulo
                }
                nombres={
                  familia.nombres
                }
              />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
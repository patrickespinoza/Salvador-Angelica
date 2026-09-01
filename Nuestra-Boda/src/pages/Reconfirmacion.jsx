import { motion } from "framer-motion";
import Confirmacion from "../componentes-encabezado/Confirmacion";

const palette = {
  navy: "#102A52",
  navyDark: "#071A35",
  sky: "#9CCBF0",
  white: "#FFFFFF",
};

/* =========================================
   PORTADA DE RECONFIRMACIÓN
========================================= */

function PortadaReconfirmacion() {
  return (
    <section
      className="
        relative
        flex
        min-h-screen
        w-full
        items-end
        justify-center
        overflow-hidden
        bg-[#071A35]
        px-6
        pb-16
        pt-24

        sm:pb-20
        md:pb-24
      "
    >
      {/* IMAGEN DE PORTADA */}

      <img
        src="/portada.JPG"
        alt="Salvador y Angélica"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
        style={{
          /*
            Modifica estos valores para mover la imagen.

            50% 50% = centro
            50% 25% = hacia arriba
            50% 75% = hacia abajo
            30% 50% = hacia la izquierda
            70% 50% = hacia la derecha
          */

          objectPosition: "50% 20%",
        }}
      />

      {/* CAPA OSCURA */}

      <div
        className="
          absolute
          inset-0
        "
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(7,26,53,0.10) 0%,
              rgba(7,26,53,0.18) 42%,
              rgba(7,26,53,0.82) 100%
            )
          `,
        }}
      />

      {/* MARCOS */}

      <div
        className="
          pointer-events-none
          absolute
          inset-5
          border

          sm:inset-8
          md:inset-10
        "
        style={{
          borderColor: "rgba(255,255,255,0.40)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-[27px]
          border

          sm:inset-[39px]
          md:inset-[47px]
        "
        style={{
          borderColor: "rgba(156,203,240,0.24)",
        }}
      />

      {/* TEXTO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-4xl
          text-center
          text-white
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.45em]
            text-white/75

            sm:text-[11px]
            sm:tracking-[0.55em]
          "
        >
          Nuestro gran día se acerca
        </p>

        <div
          className="
            mx-auto
            mt-6
            h-px
            w-20
          "
          style={{
            backgroundColor: palette.sky,
          }}
        />

        <h1
          className="
            mt-7
            font-serif
            text-5xl
            font-normal
            leading-tight
            tracking-[-0.025em]

            sm:text-6xl
            md:text-7xl
            lg:text-8xl
          "
        >
          Salvador
          <span
            className="
              mx-3
              inline-block
              font-light
              italic
              text-[#9CCBF0]

              sm:mx-5
            "
          >
            &
          </span>
          Angélica
        </h1>

        <p
          className="
            mt-7
            font-serif
            text-xl
            italic
            tracking-wide
            text-white/90

            sm:text-2xl
            md:text-3xl
          "
        >
          Reconfirmación de asistencia
        </p>

        <p
          className="
            mx-auto
            mt-5
            max-w-xl
            text-xs
            uppercase
            leading-6
            tracking-[0.2em]
            text-white/65

            sm:text-sm
          "
        >
          Gracias por ayudarnos a confirmar nuevamente tu asistencia
        </p>
      </motion.div>

      {/* INDICADOR INFERIOR */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1.2,
        }}
        className="
          absolute
          bottom-5
          left-1/2
          z-10
          -translate-x-1/2

          sm:bottom-7
        "
      >
        <motion.span
          animate={{
            y: [0, 7, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            block
            h-8
            w-px
            bg-white/60
          "
        />
      </motion.div>
    </section>
  );
}

/* =========================================
   PÁGINA DE RECONFIRMACIÓN
========================================= */

export default function Reconfirmacion() {
  return (
    <main
      className="w-full overflow-hidden"
      style={{
        backgroundColor: palette.navyDark,
      }}
    >
      <PortadaReconfirmacion />

      {/*
        En el siguiente paso modificaremos
        Confirmacion.jsx para reconocer este modo.
      */}

      <Confirmacion modo="reconfirmacion" />
    </main>
  );
}
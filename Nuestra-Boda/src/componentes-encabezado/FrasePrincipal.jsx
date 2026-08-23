import { motion } from "framer-motion";

/* =========================================
   FRASE PREMIUM
   SALVADOR & ANGELICA

   DISEÑO:
   - Fondo azul marino
   - Textos blancos
   - Detalles azul cielo
========================================= */

const palette = {
  navy: "#102A52",
  navyDeep: "#071A35",
  navyLight: "#183B6B",

  royal: "#184EA6",

  sky: "#9CCBF0",
  skyLight: "#D9EBF8",

  white: "#FFFFFF",
};

/* =========================================
   ANIMACIÓN GENERAL
========================================= */

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================
   DIVISOR
========================================= */

function SmallDivider() {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-3
      "
    >
      <span
        className="
          h-px
          w-10

          sm:w-16
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.68))",
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
          borderColor: "rgba(156,203,240,0.95)",
          backgroundColor: palette.navy,
        }}
      />

      <span
        className="
          h-px
          w-10

          sm:w-16
        "
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(255,255,255,0.68))",
        }}
      />
    </div>
  );
}

/* =========================================
   ROMBO DECORATIVO
========================================= */

function Diamond({ className = "" }) {
  return (
    <div
      className={`
        rotate-45
        border
        ${className}
      `}
      style={{
        borderColor: "rgba(156,203,240,0.45)",
      }}
    />
  );
}

/* =========================================
   COMPONENTE
========================================= */

export default function FrasePremium() {
  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.18,
      }}
      className="
        relative
        flex
        min-h-[650px]
        w-full
        items-center
        justify-center
        overflow-hidden
        px-5
        py-24
        text-center

        sm:min-h-[720px]
        sm:px-8
        sm:py-28

        lg:min-h-[720px]
        lg:px-12
        lg:py-32
      "
      style={{
        background: `
          linear-gradient(
            180deg,
            ${palette.navy} 0%,
            ${palette.navyDeep} 100%
          )
        `,
      }}
    >
      {/* =====================================
          LUZ SUPERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-180px]
          h-[380px]
          w-[380px]
          -translate-x-1/2
          rounded-full
          blur-3xl

          sm:h-[520px]
          sm:w-[520px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(156,203,240,0.18) 0%, rgba(156,203,240,0.07) 45%, transparent 72%)",
        }}
      />

      {/* =====================================
          LUZ INFERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-240px]
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          blur-3xl

          sm:h-[560px]
          sm:w-[560px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(24,78,166,0.20) 0%, transparent 70%)",
        }}
      />

      {/* =====================================
          TEXTURA MUY SUAVE
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.025) 0px,
              rgba(255,255,255,0.025) 1px,
              transparent 1px,
              transparent 6px
            )
          `,
        }}
      />

      {/* =====================================
          MARCO EXTERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-5
          border

          sm:inset-8

          lg:inset-10
        "
        style={{
          borderColor: "rgba(255,255,255,0.22)",
        }}
      />

      {/* =====================================
          MARCO INTERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[27px]
          border

          sm:inset-[39px]

          lg:inset-[47px]
        "
        style={{
          borderColor: "rgba(156,203,240,0.18)",
        }}
      />

      {/* =====================================
          DETALLES ESQUINAS
      ===================================== */}

      <Diamond
        className="
          pointer-events-none
          absolute
          left-7
          top-7
          h-3
          w-3

          sm:left-11
          sm:top-11
          sm:h-4
          sm:w-4
        "
      />

      <Diamond
        className="
          pointer-events-none
          absolute
          right-7
          top-7
          h-3
          w-3

          sm:right-11
          sm:top-11
          sm:h-4
          sm:w-4
        "
      />

      <Diamond
        className="
          pointer-events-none
          absolute
          bottom-7
          left-7
          h-3
          w-3

          sm:bottom-11
          sm:left-11
          sm:h-4
          sm:w-4
        "
      />

      <Diamond
        className="
          pointer-events-none
          absolute
          bottom-7
          right-7
          h-3
          w-3

          sm:bottom-11
          sm:right-11
          sm:h-4
          sm:w-4
        "
      />

      {/* =====================================
          LÍNEA VERTICAL IZQUIERDA
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[34px]
          top-1/2
          hidden
          h-[140px]
          w-px
          -translate-y-1/2

          sm:block

          lg:left-[48px]
        "
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)",
        }}
      />

      {/* =====================================
          LÍNEA VERTICAL DERECHA
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[34px]
          top-1/2
          hidden
          h-[140px]
          w-px
          -translate-y-1/2

          sm:block

          lg:right-[48px]
        "
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)",
        }}
      />

      {/* =====================================
          CONTENIDO
      ===================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-5xl
          flex-col
          items-center
        "
      >
        {/* =================================
            COMILLAS
        ================================= */}

        <motion.div
          className="
            mt-8
            flex
            h-[64px]
            w-[64px]
            items-center
            justify-center
            rounded-full
            border

            sm:mt-10
            sm:h-[78px]
            sm:w-[78px]
          "
          style={{
            borderColor: "rgba(156,203,240,0.38)",

            background:
              "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(156,203,240,0.04))",

            boxShadow:
              "0 12px 30px rgba(0,0,0,0.12)",
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
        >
          <span
            className="
              translate-y-1
              font-serif
              text-[48px]
              font-light
              leading-none

              sm:text-[60px]
            "
            style={{
              color: palette.white,
            }}
          >
            “
          </span>
        </motion.div>

        {/* =================================
            PRIMERA FRASE
        ================================= */}

        <motion.blockquote
          className="
            mx-auto
            mt-8
            max-w-4xl
            font-serif
            text-[25px]
            font-normal
            leading-[1.55]
            tracking-[-0.015em]

            sm:mt-10
            sm:text-[34px]
            sm:leading-[1.5]

            md:text-[39px]

            lg:text-[44px]
            lg:leading-[1.45]
          "
          style={{
            color: palette.white,
          }}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Con profunda gratitud le entregamos,
          <br className="hidden sm:block" />
          este dia a Dios, quien
          <br />
          hizo posible este amor.
        </motion.blockquote>

        {/* =================================
            SEPARACIÓN ENTRE FRASES
        ================================= */}

        <motion.div
          className="
            my-8

            sm:my-10
          "
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
        >
          <SmallDivider />
        </motion.div>

        {/* =================================
            SEGUNDA FRASE
        ================================= */}

        <motion.blockquote
          className="
            mx-auto
            max-w-4xl
            font-serif
            text-[25px]
            font-normal
            leading-[1.55]
            tracking-[-0.015em]

            sm:text-[34px]
            sm:leading-[1.5]

            md:text-[39px]

            lg:text-[44px]
            lg:leading-[1.45]
          "
          style={{
            color: palette.white,
          }}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Queremos que Él sea el centro de,
          <br className="hidden sm:block" />
          nuestro hogar y Tú, testigo
          <br />
          de este momento especial.
        </motion.blockquote>

        {/* =================================
            DETALLE FINAL
        ================================= */}

        <motion.div
          className="
            mt-10
            flex
            items-center
            gap-3

            sm:mt-12
          "
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.55,
          }}
        >
          <span
            className="
              h-px
              w-7

              sm:w-10
            "
            style={{
              backgroundColor:
                "rgba(255,255,255,0.55)",
            }}
          />

          <span
            className="
              h-[7px]
              w-[7px]
              rotate-45
            "
            style={{
              backgroundColor: palette.white,
            }}
          />

          <span
            className="
              h-[4px]
              w-[4px]
              rotate-45
            "
            style={{
              backgroundColor: palette.sky,
            }}
          />

          <span
            className="
              h-[7px]
              w-[7px]
              rotate-45
            "
            style={{
              backgroundColor: palette.white,
            }}
          />

          <span
            className="
              h-px
              w-7

              sm:w-10
            "
            style={{
              backgroundColor:
                "rgba(255,255,255,0.55)",
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
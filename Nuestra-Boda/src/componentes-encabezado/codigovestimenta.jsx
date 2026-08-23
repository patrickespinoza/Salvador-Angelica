import React from "react";
import { motion } from "framer-motion";

/* =========================================
   CÓDIGO DE VESTIMENTA
   SALVADOR & ANGELICA

   DISEÑO:
   - Fondo blanco
   - Texto negro
   - Sin iconos
   - Estilo clásico
========================================= */

const palette = {
  white: "#FFFFFF",
  black: "#111111",
  blackSoft: "#343434",
  gray: "#747474",
  line: "#D9D9D9",
  lineSoft: "#EEEEEE",
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
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
   SEPARADOR CLÁSICO
========================================= */

function DecorativeDivider({ compact = false }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={
          compact
            ? "h-px w-8 sm:w-12"
            : "h-px w-10 sm:w-16"
        }
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(17,17,17,0.55))",
        }}
      />

      <span
        className="
          h-[5px]
          w-[5px]
          rotate-45
          border
          bg-white
        "
        style={{
          borderColor: palette.black,
        }}
      />

      <span
        className={
          compact
            ? "h-px w-8 sm:w-12"
            : "h-px w-10 sm:w-16"
        }
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(17,17,17,0.55))",
        }}
      />
    </div>
  );
}

/* =========================================
   BLOQUE DE INFORMACIÓN
========================================= */

function DressOption({
  number,
  title,
  children,
  delay = 0,
}) {
  return (
    <motion.article
      className="
        relative
        flex
        w-full
        flex-col
        items-center
        justify-center
        border-y
        px-6
        py-10
        text-center

        sm:px-10
        sm:py-12

        md:min-h-[300px]
      "
      style={{
        borderColor: palette.line,
        backgroundColor: palette.white,
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* NÚMERO */}

      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.35em]

          sm:text-[9px]
        "
        style={{
          color: palette.gray,
        }}
      >
        {number}
      </p>

      {/* TÍTULO */}

      <h3
        className="
          mt-4
          font-serif
          text-[29px]
          font-normal
          leading-tight

          sm:text-[36px]

          lg:text-[40px]
        "
        style={{
          color: palette.black,
        }}
      >
        {title}
      </h3>

      {/* LÍNEA */}

      <div className="mt-5">
        <DecorativeDivider compact />
      </div>

      {/* CONTENIDO */}

      <div
        className="
          mx-auto
          mt-6
          max-w-md
          font-serif
          text-[14px]
          leading-7

          sm:text-[15px]

          lg:text-base
        "
        style={{
          color: palette.blackSoft,
        }}
      >
        {children}
      </div>
    </motion.article>
  );
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

const DressCodePremium = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      className="
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-white
        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-28
      "
      style={{
        backgroundColor: palette.white,
      }}
    >
      {/* =====================================
          LÍNEA SUPERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          right-[8%]
          top-5
          h-px

          sm:top-8

          lg:left-[12%]
          lg:right-[12%]
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(17,17,17,0.18), transparent)",
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
          w-full
          max-w-6xl
        "
      >
        {/* =====================================
            ENCABEZADO
        ===================================== */}

        <motion.div
          className="
            mx-auto
            mb-14
            flex
            max-w-3xl
            flex-col
            items-center
            text-center

            sm:mb-16

            lg:mb-20
          "
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* PEQUEÑO ENCABEZADO */}

          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.42em]

              sm:text-[10px]
              sm:tracking-[0.52em]
            "
            style={{
              color: palette.blackSoft,
            }}
          >
            Detalles de la celebración
          </p>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          {/* TÍTULO */}

          <h2
            className="
              mt-7
              font-serif
              text-[38px]
              font-normal
              leading-[1.05]

              sm:text-[52px]

              md:text-[60px]

              lg:text-[64px]
            "
            style={{
              color: palette.black,
            }}
          >
            Código de vestimenta
          </h2>

          {/* FORMAL */}

          <p
            className="
              mt-5
              text-[9px]
              uppercase
              tracking-[0.4em]

              sm:text-[10px]
            "
            style={{
              color: palette.gray,
            }}
          >
            Código
          </p>

          <p
            className="
              mt-2
              font-serif
              text-[22px]
              font-normal
              uppercase
              tracking-[0.16em]

              sm:text-[26px]
            "
            style={{
              color: palette.black,
            }}
          >
            Formal
          </p>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-serif
              text-[13px]
              italic
              leading-7

              sm:text-[15px]
            "
            style={{
              color: palette.blackSoft,
            }}
          >
            Agradecemos considerar las siguientes indicaciones
            para nuestra celebración.
          </p>
        </motion.div>

        {/* =====================================
            DAMAS Y CABALLEROS
        ===================================== */}

        <div
          className="
            mx-auto
            grid
            max-w-5xl
            gap-8

            md:grid-cols-2
            md:gap-10

            lg:gap-14
          "
        >
          {/* DAMAS */}

          <DressOption
            number="01"
            title="Damas"
            delay={0.12}
          >
            <p>
              Vestimenta
              <span className="font-semibold">
                {" "}
                formal.
              </span>
            </p>

            <p className="mt-4">
              Favor de evitar
              <span className="font-semibold">
                {" "}
                blanco y sus derivados
              </span>
              .
            </p>

            <p className="mt-2">
              También pedimos reservar los tonos
              <span className="font-semibold">
                {" "}
                azul rey y azul marino
              </span>
              .
            </p>
          </DressOption>

          {/* CABALLEROS */}

          <DressOption
            number="02"
            title="Caballeros"
            delay={0.24}
          >
            <p>
              Vestimenta
              <span className="font-semibold">
                {" "}
                formal.
              </span>
            </p>

            <p className="mt-4">
              El color
              <span className="font-semibold">
                {" "}
                gris Oxford
              </span>
              {" "}
              está reservado especialmente para el novio.
            </p>
          </DressOption>
        </div>

        {/* =====================================
            NO NIÑOS
        ===================================== */}

        <motion.div
          className="
            mx-auto
            mt-14
            max-w-2xl
            border-y
            px-5
            py-10
            text-center

            sm:mt-16
            sm:px-8
            sm:py-12

            lg:mt-20
          "
          style={{
            borderColor: palette.black,
          }}
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.85,
            delay: 0.32,
          }}
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.4em]

              sm:text-[9px]
            "
            style={{
              color: palette.gray,
            }}
          >
            Consideración especial
          </p>

          <h3
            className="
              mt-5
              font-serif
              text-[30px]
              font-normal
              uppercase
              tracking-[0.12em]

              sm:text-[38px]

              md:text-[42px]
            "
            style={{
              color: palette.black,
            }}
          >
            No niños
          </h3>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          <p
            className="
              mx-auto
              mt-6
              max-w-lg
              font-serif
              text-[13px]
              italic
              leading-7

              sm:text-[15px]
            "
            style={{
              color: palette.blackSoft,
            }}
          >
            Agradecemos su comprensión y esperamos que puedan
            acompañarnos y disfrutar de esta celebración.
          </p>
        </motion.div>

        {/* =====================================
            CIERRE
        ===================================== */}

        <motion.div
          className="
            mx-auto
            mt-12
            max-w-xl
            text-center

            sm:mt-14
          "
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.85,
            delay: 0.4,
          }}
        >
          <p
            className="
              font-serif
              text-[13px]
              italic
              leading-7

              sm:text-[15px]
            "
            style={{
              color: palette.gray,
            }}
          >
            Gracias por ayudarnos a hacer de este día una celebración
            especial.
          </p>
        </motion.div>
      </div>

      {/* =====================================
          LÍNEA INFERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          left-[8%]
          right-[8%]
          h-px

          sm:bottom-8

          lg:left-[12%]
          lg:right-[12%]
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(17,17,17,0.18), transparent)",
        }}
      />
    </motion.section>
  );
};

export default DressCodePremium;
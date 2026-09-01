import { motion } from "framer-motion";

/* =========================================
   EVENTO Y UBICACIÓN
   SALVADOR & ANGELICA

   DISEÑO:
   - Fondo blanco
   - Textos negros
   - Fecha en azul rey
   - Botones azul rey con texto blanco
========================================= */

/* =========================================
   DATOS DEL EVENTO

   CUANDO ME PASES LOS DATOS REALES
   SOLO CAMBIAMOS ESTAS 4 VARIABLES
========================================= */

const EVENTO = {
  fecha: "17",
  dia: "Sábado",
  mes: "Octubre",
  anio: "2026",

  hora: "5:00 pm",

  lugar: "Jardín de Eventos Admirable",

  direccion:
    "Jesús González Ortega 154, Cinco de Mayo, 93250 Poza Rica de Hidalgo, Ver.",

  maps: "https://maps.app.goo.gl/t63eE35dzqgrsEBK7",
};

/* =========================================
   PALETA
========================================= */

const palette = {
  royal: "#1E5AA8",
  royalDeep: "#164782",

  white: "#FFFFFF",

  black: "#111111",
  blackSoft: "#383838",
  gray: "#6B6B6B",

  line: "#DADADA",
  lineSoft: "#EEEEEE",
};

/* =========================================
   ANIMACIONES
========================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
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

function DecorativeDivider({
  compact = false,
  light = false,
}) {
  const color = light
    ? "rgba(255,255,255,0.72)"
    : "rgba(17,17,17,0.50)";

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
        className={
          compact
            ? "h-px w-8 sm:w-12"
            : "h-px w-10 sm:w-16"
        }
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            ${color}
          )`,
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
          borderColor: color,
        }}
      />

      <span
        className={
          compact
            ? "h-px w-8 sm:w-12"
            : "h-px w-10 sm:w-16"
        }
        style={{
          background: `linear-gradient(
            to left,
            transparent,
            ${color}
          )`,
        }}
      />
    </div>
  );
}

/* =========================================
   ICONO UBICACIÓN
========================================= */

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="
          M20 10
          c0 5-8 11-8 11
          S4 15 4 10
          a8 8 0 1 1 16 0Z
        "
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

/* =========================================
   ICONO RELOJ
========================================= */

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
      />

      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* =========================================
   DETALLE DE ESQUINA
========================================= */

function CornerDetail({
  className = "",
}) {
  return (
    <div
      className={`
        pointer-events-none
        ${className}
      `}
    >
      <div
        className="
          absolute
          left-0
          top-0
          h-px
          w-full
        "
        style={{
          background:
            "linear-gradient(to right, rgba(17,17,17,0.25), transparent)",
        }}
      />

      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-px
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,17,17,0.25), transparent)",
        }}
      />

      <div
        className="
          absolute
          left-[-3px]
          top-[-3px]
          h-[7px]
          w-[7px]
          rotate-45
          border
          bg-white
        "
        style={{
          borderColor:
            "rgba(17,17,17,0.35)",
        }}
      />
    </div>
  );
}

/* =========================================
   COMPONENTE
========================================= */

export default function EventoDireccion() {
  const tieneMapa =
    typeof EVENTO.maps === "string" &&
    EVENTO.maps.trim() !== "";

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      className="
        relative
        flex
        min-h-[760px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-white
        px-5
        py-24

        sm:min-h-[820px]
        sm:px-8
        sm:py-28

        lg:min-h-[780px]
        lg:px-12
        lg:py-32
      "
      style={{
        backgroundColor: palette.white,
      }}
    >
      {/* =====================================
          TEXTURA MUY SUAVE
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.16]
        "
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(17,17,17,0.025) 0px,
              rgba(17,17,17,0.025) 1px,
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
          borderColor:
            "rgba(17,17,17,0.16)",
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
          borderColor:
            "rgba(17,17,17,0.07)",
        }}
      />

      {/* =====================================
          ESQUINAS
      ===================================== */}

      <CornerDetail
        className="
          absolute
          left-7
          top-7
          h-14
          w-14

          sm:left-11
          sm:top-11
          sm:h-20
          sm:w-20
        "
      />

      <CornerDetail
        className="
          absolute
          right-7
          top-7
          h-14
          w-14
          rotate-90

          sm:right-11
          sm:top-11
          sm:h-20
          sm:w-20
        "
      />

      <CornerDetail
        className="
          absolute
          bottom-7
          left-7
          h-14
          w-14
          -rotate-90

          sm:bottom-11
          sm:left-11
          sm:h-20
          sm:w-20
        "
      />

      <CornerDetail
        className="
          absolute
          bottom-7
          right-7
          h-14
          w-14
          rotate-180

          sm:bottom-11
          sm:right-11
          sm:h-20
          sm:w-20
        "
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
          max-w-5xl
        "
      >
        {/* =================================
            ENCABEZADO
        ================================= */}

        <motion.div
          className="
            mx-auto
            mb-12
            max-w-3xl
            text-center

            sm:mb-16
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
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.44em]

              sm:text-[10px]
              sm:tracking-[0.55em]
            "
            style={{
              color: palette.black,
            }}
          >
            Nuestra celebración
          </p>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          <h2
            className="
              mt-7
              font-serif
              text-[38px]
              font-normal
              leading-[1.1]
              tracking-[-0.02em]

              sm:text-[54px]
              md:text-[62px]
            "
            style={{
              color: palette.black,
            }}
          >
            Un día para recordar
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-serif
              text-[14px]
              italic
              leading-7

              sm:text-base
              sm:leading-8
            "
            style={{
              color: palette.blackSoft,
            }}
          >
            Nos hará muy felices compartir con
            ustedes el comienzo de este nuevo
            capítulo en nuestras vidas.
          </p>
        </motion.div>

        {/* =================================
            TARJETA PRINCIPAL
        ================================= */}

        <motion.div
          className="
            relative
            mx-auto
            w-full
            max-w-3xl
            overflow-hidden
            border
            bg-white
          "
          style={{
            borderColor:
              "rgba(17,17,17,0.16)",

            boxShadow:
              "0 28px 75px rgba(0,0,0,0.08)",
          }}
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 1,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* =================================
              BORDE INTERIOR
          ================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[7px]
              z-20
              border
            "
            style={{
              borderColor:
                "rgba(255,255,255,0.14)",
            }}
          />

          {/* =================================
              FECHA — AZUL REY
          ================================= */}

          <div
            className="
              relative
              overflow-hidden
              px-6
              py-10
              text-center

              sm:px-10
              sm:py-12
            "
            style={{
              backgroundColor:
                palette.royal,
            }}
          >
            {/* LUZ CENTRAL */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[280px]
                w-[280px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                blur-3xl

                sm:h-[400px]
                sm:w-[400px]
              "
              style={{
                background:
                  "rgba(255,255,255,0.07)",
              }}
            />

            <motion.p
              className="
                relative
                z-10
                text-[8px]
                uppercase
                tracking-[0.42em]
                text-white/75

                sm:text-[10px]
              "
              initial={{
                opacity: 0,
                y: -8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
            >
              Reserva la fecha
            </motion.p>

            <motion.p
              className="
                relative
                z-10
                mt-5
                font-serif
                text-[15px]
                uppercase
                tracking-[0.18em]
                text-white

                sm:text-lg
              "
              initial={{
                opacity: 0,
                y: 10,
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
                delay: 0.25,
              }}
            >
              {EVENTO.dia}
            </motion.p>

            {/* DÍA */}

            <motion.p
              className="
                relative
                z-10
                my-2
                font-serif
                text-[92px]
                font-normal
                leading-none
                tracking-[-0.06em]
                text-white

                sm:text-[118px]
              "
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                delay: 0.3,
              }}
            >
              {EVENTO.fecha}
            </motion.p>

            <motion.p
              className="
                relative
                z-10
                font-serif
                text-[11px]
                uppercase
                tracking-[0.4em]
                text-white

                sm:text-[13px]
                sm:tracking-[0.5em]
              "
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
            >
              {EVENTO.mes} · {EVENTO.anio}
            </motion.p>

            <div className="relative z-10 mt-7">
              <DecorativeDivider
                compact
                light
              />
            </div>
          </div>

          {/* =================================
              INFORMACIÓN DEL EVENTO
          ================================= */}

          <div
            className="
              relative
              bg-white
              px-7
              py-14
              text-center

              sm:px-12
              sm:py-16

              lg:px-16
            "
          >
            {/* ETIQUETA */}

            <motion.p
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
              initial={{
                opacity: 0,
                y: -8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.28,
              }}
            >
              Nuestra celebración
            </motion.p>

            <motion.h3
              className="
                mt-5
                font-serif
                text-[34px]
                font-normal
                leading-tight
                tracking-[-0.02em]

                sm:text-[46px]
              "
              style={{
                color: palette.black,
              }}
              initial={{
                opacity: 0,
                y: 14,
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
                delay: 0.32,
              }}
            >
              {EVENTO.lugar}
            </motion.h3>

            <div className="my-8">
              <DecorativeDivider />
            </div>

            {/* =================================
                HORA
            ================================= */}

            <motion.div
              className="
                flex
                flex-col
                items-center
              "
              initial={{
                opacity: 0,
                y: 14,
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
                delay: 0.38,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                "
                style={{
                  color: palette.black,
                  borderColor:
                    "rgba(17,17,17,0.20)",
                  backgroundColor:
                    palette.white,
                }}
              >
                <ClockIcon />
              </div>

              <p
                className="
                  mt-4
                  text-[8px]
                  uppercase
                  tracking-[0.34em]
                "
                style={{
                  color: palette.gray,
                }}
              >
                Hora
              </p>

              <p
                className="
                  mt-2
                  font-serif
                  text-[33px]
                  font-normal

                  sm:text-[42px]
                "
                style={{
                  color: palette.black,
                }}
              >
                {EVENTO.hora}
              </p>
            </motion.div>

            {/* =================================
                SEPARADOR
            ================================= */}

            <div
              className="
                mx-auto
                my-9
                h-px
                w-20
              "
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(17,17,17,0.40), transparent)",
              }}
            />

            {/* =================================
                UBICACIÓN
            ================================= */}

            <motion.div
              className="
                flex
                flex-col
                items-center
              "
              initial={{
                opacity: 0,
                y: 14,
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
                delay: 0.44,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                "
                style={{
                  color: palette.black,
                  borderColor:
                    "rgba(17,17,17,0.20)",
                  backgroundColor:
                    palette.white,
                }}
              >
                <LocationIcon />
              </div>

              <p
                className="
                  mt-4
                  text-[8px]
                  uppercase
                  tracking-[0.34em]
                "
                style={{
                  color: palette.gray,
                }}
              >
                Ubicación
              </p>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-lg
                  font-serif
                  text-[17px]
                  leading-7

                  sm:text-[20px]
                  sm:leading-8
                "
                style={{
                  color: palette.black,
                }}
              >
                {EVENTO.direccion}
              </p>
            </motion.div>

            {/* =================================
                BOTÓN GOOGLE MAPS
                AZUL REY + TEXTO BLANCO
            ================================= */}

            {tieneMapa && (
              <motion.a
                href={EVENTO.maps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir ubicación en Google Maps"
                className="
                  group
                  mt-10
                  inline-flex
                  min-w-[220px]
                  items-center
                  justify-center
                  gap-3
                  border
                  px-8
                  py-4

                  sm:min-w-[255px]
                  sm:px-10
                "
                style={{
                  backgroundColor:
                    palette.royal,

                  borderColor:
                    palette.royal,

                  color:
                    palette.white,

                  boxShadow:
                    "0 14px 30px rgba(30,90,168,0.20)",
                }}
                whileHover={{
                  y: -3,

                  backgroundColor:
                    palette.royalDeep,

                  borderColor:
                    palette.royalDeep,

                  transition: {
                    duration: 0.25,
                  },
                }}
                whileTap={{
                  scale: 0.985,
                }}
              >
                <LocationIcon />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.28em]

                    sm:text-[10px]
                    sm:tracking-[0.34em]
                  "
                >
                  Ver ubicación
                </span>
              </motion.a>
            )}

            {!tieneMapa && (
              <motion.p
                className="
                  mt-9
                  text-[8px]
                  uppercase
                  tracking-[0.24em]
                "
                style={{
                  color: palette.blackSoft,
                }}
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
                  delay: 0.5,
                }}
              >
                Ubicación próximamente
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* =================================
            CIERRE
        ================================= */}

        <motion.p
          className="
            mx-auto
            mt-12
            max-w-xl
            text-center
            font-serif
            text-[14px]
            italic
            leading-7

            sm:mt-14
            sm:text-base
            sm:leading-8
          "
          style={{
            color: palette.blackSoft,
          }}
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
            duration: 0.9,
            delay: 0.52,
          }}
        >
          Esperamos contar con su presencia en un
          día que guardaremos para siempre en
          nuestra memoria.
        </motion.p>

        {/* =================================
            DETALLE FINAL
        ================================= */}

        <motion.div
          className="
            mt-9
            flex
            items-center
            justify-center
            gap-3
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
            delay: 0.58,
          }}
        >
          <span
            className="h-px w-8"
            style={{
              backgroundColor:
                "rgba(17,17,17,0.28)",
            }}
          />

          <span
            className="
              h-[7px]
              w-[7px]
              rotate-45
            "
            style={{
              backgroundColor:
                palette.black,
            }}
          />

          <span
            className="
              h-[4px]
              w-[4px]
              rotate-45
            "
            style={{
              backgroundColor:
                palette.gray,
            }}
          />

          <span
            className="
              h-[7px]
              w-[7px]
              rotate-45
            "
            style={{
              backgroundColor:
                palette.black,
            }}
          />

          <span
            className="h-px w-8"
            style={{
              backgroundColor:
                "rgba(17,17,17,0.28)",
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
import { motion } from "framer-motion";

/* =========================================
   ITINERARIO CLÁSICO
   SALVADOR & ANGELICA

   DISEÑO:
   - Fondo azul marino
   - Textos blancos
   - Detalles azul cielo
========================================= */

const palette = {
  royal: "#184EA6",
  royalBright: "#205BBB",

  navy: "#102A52",
  navyDark: "#071A35",
  navyLight: "#183B6B",

  sky: "#9CCBF0",
  skyLight: "#D9EBF8",

  white: "#FFFFFF",
};

/* =========================================
   EVENTOS
========================================= */

const events = [
  {
    time: "18:00",
    title: "Ceremonia",
    description:
      "Ceremonia civil con nuestros seres queridos.",
    icon: "rings",
  },
  {
    time: "19:30",
    title: "Recepción",
    description:
      "Bienvenida con cóctel y música en vivo.",
    icon: "glass",
  },
  {
    time: "21:00",
    title: "Cena",
    description:
      "Banquete con un menú especialmente diseñado.",
    icon: "dinner",
  },
  {
    time: "23:00",
    title: "Fiesta",
    description:
      "Una noche para bailar y celebrar juntos.",
    icon: "music",
  },
];

/* =========================================
   ANIMACIÓN
========================================= */

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
   ICONOS
========================================= */

function EventIcon({ type }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.35",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-6 sm:w-6",
    "aria-hidden": true,
  };

  if (type === "rings") {
    return (
      <svg {...commonProps}>
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
        <path d="M12 5.5 14 3l2 2.5" />
      </svg>
    );
  }

  if (type === "glass") {
    return (
      <svg {...commonProps}>
        <path d="M7 4h10l-1.2 7.2A4 4 0 0 1 12 14.5a4 4 0 0 1-3.8-3.3Z" />
        <path d="M12 14.5V21" />
        <path d="M8.5 21h7" />
        <path d="M8.5 8h7" />
      </svg>
    );
  }

  if (type === "dinner") {
    return (
      <svg {...commonProps}>
        <path d="M7 3v8" />
        <path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3" />
        <path d="M7 11v10" />
        <path d="M16 3v18" />
        <path d="M16 3c2.5 2 3.5 5.5 0 8" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M9 18V5l10-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}

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
            "linear-gradient(to right, transparent, rgba(255,255,255,0.65))",
        }}
      />

      <span
        className="
          h-[5px]
          w-[5px]
          rotate-45
          border
        "
        style={{
          borderColor: palette.sky,
          backgroundColor: palette.navy,
        }}
      />

      <span
        className="h-px w-10 sm:w-16"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(255,255,255,0.65))",
        }}
      />
    </div>
  );
}

/* =========================================
   CONTENIDO DE EVENTO
========================================= */

function EventContent({
  event,
  index,
  alignment = "left",
}) {
  const right = alignment === "right";

  return (
    <div
      className={`
        w-full
        max-w-md
        ${right ? "lg:ml-auto" : "lg:mr-auto"}
      `}
    >
      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.32em]
          text-white/60

          sm:text-[9px]
        "
      >
        Momento {String(index + 1).padStart(2, "0")}
      </p>

      <div
        className={`
          mt-2
          flex
          flex-col
          gap-1.5

          sm:flex-row
          sm:items-baseline
          sm:gap-3

          ${
            right
              ? "lg:flex-row-reverse lg:justify-start"
              : "lg:justify-start"
          }
        `}
      >
        <p
          className="
            font-serif
            text-[31px]
            leading-none
            text-white

            sm:text-[36px]
          "
        >
          {event.time}
        </p>

        <span
          className="
            hidden
            h-px
            w-8

            sm:block
          "
          style={{
            backgroundColor:
              "rgba(156,203,240,0.85)",
          }}
        />

        <h3
          className="
            font-serif
            text-[23px]
            font-normal
            text-white

            sm:text-[26px]
          "
        >
          {event.title}
        </h3>
      </div>

      <p
        className="
          mt-3
          font-serif
          text-[13px]
          leading-6
          text-white/70

          sm:text-[14px]
          sm:leading-7
        "
      >
        {event.description}
      </p>
    </div>
  );
}

/* =========================================
   EVENTO DE LA LÍNEA DE TIEMPO
========================================= */

function TimelineEvent({
  event,
  index,
  isLast,
}) {
  const even = index % 2 === 0;

  return (
    <motion.article
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
        amount: 0.25,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        grid
        grid-cols-[46px_1fr]
        gap-5

        sm:grid-cols-[58px_1fr]
        sm:gap-7

        lg:grid-cols-[1fr_76px_1fr]
        lg:gap-10
      "
    >
      {/* =====================================
          LÍNEA MÓVIL
      ===================================== */}

      {!isLast && (
        <div
          className="
            absolute
            left-[22px]
            top-11
            h-[calc(100%+30px)]
            w-px

            sm:left-[28px]

            lg:hidden
          "
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.52), rgba(156,203,240,0.40))",
          }}
        />
      )}

      {/* =====================================
          CONTENIDO IZQUIERDO DESKTOP
      ===================================== */}

      <div
        className={`
          hidden

          lg:flex
          lg:flex-col
          lg:justify-center

          ${
            even
              ? "lg:items-end lg:text-right"
              : "lg:invisible"
          }
        `}
      >
        {even && (
          <EventContent
            event={event}
            index={index}
            alignment="right"
          />
        )}
      </div>

      {/* =====================================
          MARCADOR CENTRAL
      ===================================== */}

      <div
        className="
          relative
          z-10
          col-start-1
          row-start-1
          flex
          justify-center

          lg:col-start-2
        "
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
            bg-white/5

            sm:h-14
            sm:w-14
          "
          style={{
            borderColor:
              "rgba(156,203,240,0.78)",

            color: palette.white,

            boxShadow:
              "0 8px 22px rgba(0,0,0,0.14)",
          }}
        >
          <EventIcon type={event.icon} />
        </div>

        {!isLast && (
          <div
            className="
              pointer-events-none
              absolute
              top-14
              hidden
              h-[calc(100%+52px)]
              w-px

              lg:block
            "
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.52), rgba(156,203,240,0.38))",
            }}
          />
        )}
      </div>

      {/* =====================================
          DERECHO / MÓVIL
      ===================================== */}

      <div
        className={`
          col-start-2
          row-start-1
          pb-11

          sm:pb-14

          lg:col-start-3
          lg:flex
          lg:flex-col
          lg:justify-center

          ${
            even
              ? "lg:invisible"
              : "lg:items-start lg:text-left"
          }
        `}
      >
        <div className="lg:hidden">
          <EventContent
            event={event}
            index={index}
            alignment="left"
          />
        </div>

        {!even && (
          <div className="hidden lg:block">
            <EventContent
              event={event}
              index={index}
              alignment="left"
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function ItinerarioRelojCentral() {
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
        w-full
        overflow-hidden
        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-28
      "
      style={{
        background: `
          linear-gradient(
            180deg,
            ${palette.navy} 0%,
            ${palette.navyDark} 100%
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
          top-[-240px]
          h-[480px]
          w-[480px]
          -translate-x-1/2
          rounded-full
          blur-3xl

          sm:h-[620px]
          sm:w-[620px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(156,203,240,0.15) 0%, transparent 70%)",
        }}
      />

      {/* =====================================
          LUZ IZQUIERDA
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-36
          top-24
          h-[320px]
          w-[320px]
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(32,91,187,0.14) 0%, transparent 72%)",
        }}
      />

      {/* =====================================
          LUZ DERECHA
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-20
          h-[380px]
          w-[380px]
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(156,203,240,0.10) 0%, transparent 72%)",
        }}
      />

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
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.20), transparent)",
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
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.42em]
              text-white/65

              sm:text-[10px]
              sm:tracking-[0.5em]
            "
          >
            Itinerario
          </p>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          <h2
            className="
              mt-6
              font-serif
              text-[38px]
              font-normal
              leading-tight
              text-white

              sm:text-[52px]

              md:text-[60px]
            "
          >
            El orden de nuestro día
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              font-serif
              text-[13px]
              italic
              leading-6
              text-white

              sm:text-[15px]
              sm:leading-7
            "
          >
            Cada momento ha sido pensado para
            compartir, celebrar y guardar juntos un
            recuerdo inolvidable.
          </p>
        </motion.div>

        {/* =====================================
            FECHA
        ===================================== */}

        <motion.div
          className="
            mx-auto
            mb-14
            max-w-sm
            border-y
            px-5
            py-6
            text-center

            sm:mb-16
            sm:py-7
          "
          style={{
            borderColor:
              "rgba(255,255,255,0.25)",
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
            delay: 0.1,
          }}
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.36em]
              text-white/60

              sm:text-[9px]
            "
          >
            Nuestra celebración
          </p>

          <p
            className="
              mt-3
              font-serif
              text-[42px]
              leading-none
              text-white

              sm:text-[48px]
            "
          >
            17
          </p>

          <p
            className="
              mt-2
              text-[9px]
              uppercase
              tracking-[0.4em]
              text-white/75

              sm:text-[10px]
            "
          >
            Octubre
          </p>
        </motion.div>

        {/* =====================================
            CRONOLOGÍA
        ===================================== */}

        <div className="mx-auto max-w-5xl">
          {events.map((event, index) => (
            <TimelineEvent
              key={`${event.time}-${event.title}`}
              event={event}
              index={index}
              isLast={
                index === events.length - 1
              }
            />
          ))}
        </div>

        {/* =====================================
            CIERRE
        ===================================== */}

        <motion.div
          className="
            mx-auto
            mt-10
            flex
            max-w-xl
            flex-col
            items-center
            text-center

            sm:mt-14

            lg:mt-16
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
            delay: 0.25,
          }}
        >
          <DecorativeDivider />

          <p
            className="
              mt-6
              font-serif
              text-[13px]
              italic
              leading-7
              text-white

              sm:text-[15px]
            "
          >
            Esperamos vivir cada momento contigo.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
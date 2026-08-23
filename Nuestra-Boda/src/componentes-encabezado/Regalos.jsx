import { motion } from "framer-motion";
import { useState } from "react";

/* =========================================
   MESA DE REGALOS
   SALVADOR & ANGELICA

   DISEÑO:
   - Fondo blanco
   - Textos negros
   - Botones azul marino
   - Cuenta bancaria oculta
========================================= */

/* =========================================
   DATOS
========================================= */

const LINK_LIVERPOOL =
  "https://mesaderegalos.liverpool.com.mx/milistaderegalos/60027532";

const DATOS_TRANSFERENCIA = {
  banco: "Bancomer",
  titular: "Salvador Santellano Valdez",
  cuenta: "4152313986323140",
};

/* =========================================
   PALETA
========================================= */

const palette = {
  navy: "#102A52",
  navyDark: "#071A35",
  navyLight: "#183B6B",

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
   ICONO REGALO
========================================= */

function GiftIcon({
  className = "h-6 w-6",
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3"
        y="8"
        width="18"
        height="13"
      />

      <path d="M12 8v13" />

      <path d="M3 12h18" />

      <path d="M7.5 8C5.6 8 4 6.7 4 5.2 4 4 5 3 6.3 3 9.2 3 12 8 12 8" />

      <path d="M16.5 8C18.4 8 20 6.7 20 5.2 20 4 19 3 17.7 3 14.8 3 12 8 12 8" />
    </svg>
  );
}

/* =========================================
   ICONO ENLACE
========================================= */

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M14 5h5v5" />

      <path d="m19 5-8 8" />

      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/* =========================================
   ICONO BANCO
========================================= */

function BankIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M3 10h18" />
      <path d="M5 10v8" />
      <path d="M9.5 10v8" />
      <path d="M14.5 10v8" />
      <path d="M19 10v8" />
      <path d="M3 18h18" />
      <path d="M2 21h20" />
      <path d="m12 3 9 5H3l9-5Z" />
    </svg>
  );
}

/* =========================================
   ICONO OJO
========================================= */

function EyeIcon() {
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
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z" />

      <circle
        cx="12"
        cy="12"
        r="2.8"
      />
    </svg>
  );
}

/* =========================================
   ICONO OJO CERRADO
========================================= */

function EyeOffIcon() {
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
      <path d="m3 3 18 18" />

      <path d="M10.6 6.2A10 10 0 0 1 12 6c6 0 9.5 6 9.5 6a15 15 0 0 1-2.1 2.8" />

      <path d="M6.1 6.1C3.8 7.8 2.5 12 2.5 12s3.5 6 9.5 6c1.6 0 3-.4 4.2-1" />

      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

/* =========================================
   ICONO COPIAR
========================================= */

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect
        x="8"
        y="8"
        width="11"
        height="11"
        rx="1.5"
      />

      <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-10A1.5 1.5 0 0 0 3 5.5v10A1.5 1.5 0 0 0 4.5 17H8" />
    </svg>
  );
}

/* =========================================
   ICONO CHECK
========================================= */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* =========================================
   SEPARADOR CLÁSICO
========================================= */

function DecorativeDivider({
  compact = false,
}) {
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
          borderColor:
            "rgba(17,17,17,0.65)",
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
   TARJETA
========================================= */

function GiftOption({
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
        border
        bg-white
        px-6
        py-10
        text-center

        sm:px-9
        sm:py-12

        lg:min-h-[460px]
        lg:justify-center
      "
      style={{
        borderColor:
          "rgba(17,17,17,0.16)",

        boxShadow:
          "0 18px 45px rgba(0,0,0,0.05)",
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
      <div
        className="
          pointer-events-none
          absolute
          inset-[7px]
          border
        "
        style={{
          borderColor:
            "rgba(17,17,17,0.06)",
        }}
      />

      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.34em]

          sm:text-[9px]
        "
        style={{
          color: palette.gray,
        }}
      >
        {number}
      </p>

      <h3
        className="
          mt-5
          font-serif
          text-[29px]
          font-normal
          leading-tight

          sm:text-[36px]
        "
        style={{
          color: palette.black,
        }}
      >
        {title}
      </h3>

      <div className="mt-5">
        <DecorativeDivider compact />
      </div>

      {children}
    </motion.article>
  );
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

const Regalos = () => {
  const [mostrarCuenta, setMostrarCuenta] =
    useState(false);

  const [copiado, setCopiado] =
    useState(false);

  /* =========================================
     COPIAR CUENTA
  ========================================= */

  const copiarCuenta = async () => {
    try {
      await navigator.clipboard.writeText(
        DATOS_TRANSFERENCIA.cuenta
      );

      setCopiado(true);

      window.setTimeout(() => {
        setCopiado(false);
      }, 1800);
    } catch (error) {
      console.error(
        "No se pudo copiar el número de cuenta:",
        error
      );
    }
  };

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
          TEXTURA
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.13]
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
            "rgba(17,17,17,0.14)",
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
            "rgba(17,17,17,0.06)",
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
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border

              sm:h-16
              sm:w-16
            "
            style={{
              color: palette.black,

              borderColor:
                "rgba(17,17,17,0.26)",
            }}
          >
            <GiftIcon />
          </div>

          <p
            className="
              mt-6
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
            Un detalle para nuestro hogar
          </p>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          <h2
            className="
              mt-7
              font-serif
              text-[40px]
              font-normal
              leading-tight
              tracking-[-0.025em]

              sm:text-[54px]

              md:text-[64px]
            "
            style={{
              color: palette.black,
            }}
          >
            Mesa de regalos
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-serif
              text-[14px]
              italic
              leading-7

              sm:text-[16px]
              sm:leading-8
            "
            style={{
              color: palette.blackSoft,
            }}
          >
            Su presencia en este día es el regalo
            más importante para nosotros. Si desean
            tener un detalle adicional, ponemos a
            su disposición las siguientes opciones.
          </p>
        </motion.div>

        {/* =====================================
            OPCIONES
        ===================================== */}

        <div
          className="
            mx-auto
            grid
            max-w-5xl
            gap-7

            md:grid-cols-2
            md:gap-9

            lg:gap-12
          "
        >
          {/* =================================
              LIVERPOOL
          ================================= */}

          <GiftOption
            number="01"
            title="Liverpool"
            delay={0.12}
          >
            <p
              className="
                mx-auto
                mt-7
                max-w-sm
                font-serif
                text-[14px]
                leading-7

                sm:text-[15px]
              "
              style={{
                color: palette.blackSoft,
              }}
            >
              Hemos preparado una mesa de regalos
              en Liverpool con algunos detalles
              elegidos especialmente para nuestro
              nuevo hogar.
            </p>

            <motion.a
              href={LINK_LIVERPOOL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8
                inline-flex
                min-w-[220px]
                items-center
                justify-center
                gap-3
                border
                px-7
                py-4

                sm:min-w-[250px]
                sm:px-9
              "
              style={{
                backgroundColor:
                  palette.navy,

                borderColor:
                  palette.navy,

                color:
                  palette.white,

                boxShadow:
                  "0 12px 28px rgba(16,42,82,0.18)",
              }}
              whileHover={{
                y: -2,

                backgroundColor:
                  palette.navyDark,

                borderColor:
                  palette.navyDark,
              }}
              whileTap={{
                scale: 0.985,
              }}
            >
              <ExternalLinkIcon />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.26em]

                  sm:text-[10px]
                "
              >
                Ver mesa de regalos
              </span>
            </motion.a>
          </GiftOption>

          {/* =================================
              REGALO / TRANSFERENCIA
          ================================= */}

          <GiftOption
            number="02"
            title="Regalo presencial o transferencia"
            delay={0.24}
          >
            <p
              className="
                mx-auto
                mt-7
                max-w-sm
                font-serif
                text-[14px]
                leading-7

                sm:text-[15px]
              "
              style={{
                color: palette.blackSoft,
              }}
            >
              Si lo prefieren, pueden hacernos
              llegar su detalle personalmente
              durante la celebración o realizar
              una transferencia bancaria.
            </p>

            {/* =================================
                DATOS BANCARIOS
            ================================= */}

            <div
              className="
                mx-auto
                mt-8
                w-full
                max-w-sm
                border-y
                px-3
                py-7

                sm:px-5
              "
              style={{
                borderColor:
                  "rgba(17,17,17,0.18)",
              }}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                "
                style={{
                  color: palette.navy,

                  borderColor:
                    "rgba(16,42,82,0.28)",
                }}
              >
                <BankIcon />
              </div>

              {/* BANCO */}

              <p
                className="
                  mt-5
                  text-[8px]
                  uppercase
                  tracking-[0.34em]
                "
                style={{
                  color: palette.gray,
                }}
              >
                Banco
              </p>

              <p
                className="
                  mt-2
                  font-serif
                  text-[20px]

                  sm:text-[22px]
                "
                style={{
                  color: palette.black,
                }}
              >
                {DATOS_TRANSFERENCIA.banco}
              </p>

              <div
                className="
                  mx-auto
                  my-5
                  h-px
                  w-12
                "
                style={{
                  backgroundColor:
                    palette.line,
                }}
              />

              {/* =================================
                  NÚMERO DE CUENTA
              ================================= */}

              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.34em]
                "
                style={{
                  color: palette.gray,
                }}
              >
                Número de cuenta
              </p>

              {/* CUENTA OCULTA */}

              <motion.div
                className="
                  mx-auto
                  mt-4
                  flex
                  min-h-[58px]
                  w-full
                  max-w-xs
                  items-center
                  justify-between
                  gap-3
                  border
                  px-4
                  py-3
                "
                style={{
                  borderColor:
                    "rgba(16,42,82,0.22)",

                  backgroundColor:
                    "rgba(16,42,82,0.025)",
                }}
                layout
              >
                {/* TEXTO */}

                <div
                  className="
                    min-w-0
                    flex-1
                    text-left
                  "
                >
                  <motion.p
                    key={
                      mostrarCuenta
                        ? "visible"
                        : "hidden"
                    }
                    className="
                      break-all
                      font-serif
                      text-[17px]
                      tracking-[0.08em]

                      sm:text-[19px]
                    "
                    style={{
                      color: palette.black,
                    }}
                    initial={{
                      opacity: 0,
                      y: 4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    {mostrarCuenta
                      ? DATOS_TRANSFERENCIA.cuenta
                      : "•••• •••• •••• ••••"}
                  </motion.p>
                </div>

                {/* BOTONES */}

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                  "
                >
                  {/* VER / OCULTAR */}

                  <motion.button
                    type="button"
                    onClick={() =>
                      setMostrarCuenta(
                        (current) =>
                          !current
                      )
                    }
                    aria-label={
                      mostrarCuenta
                        ? "Ocultar número de cuenta"
                        : "Mostrar número de cuenta"
                    }
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      border
                    "
                    style={{
                      backgroundColor:
                        palette.navy,

                      borderColor:
                        palette.navy,

                      color:
                        palette.white,
                    }}
                    whileHover={{
                      backgroundColor:
                        palette.navyDark,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                  >
                    {mostrarCuenta ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </motion.button>

                  {/* COPIAR */}

                  <motion.button
                    type="button"
                    onClick={copiarCuenta}
                    aria-label="Copiar número de cuenta"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      border
                    "
                    style={{
                      backgroundColor:
                        palette.navy,

                      borderColor:
                        palette.navy,

                      color:
                        palette.white,
                    }}
                    whileHover={{
                      backgroundColor:
                        palette.navyDark,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                  >
                    {copiado ? (
                      <CheckIcon />
                    ) : (
                      <CopyIcon />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* MENSAJE COPIADO */}

              <motion.p
                className="
                  mt-3
                  min-h-[14px]
                  text-[7px]
                  uppercase
                  tracking-[0.25em]

                  sm:text-[8px]
                "
                animate={{
                  opacity:
                    copiado ? 1 : 0.55,
                }}
                style={{
                  color:
                    copiado
                      ? palette.navy
                      : palette.gray,
                }}
              >
                {copiado
                  ? "Número de cuenta copiado"
                  : "Puedes mostrar o copiar la cuenta"}
              </motion.p>

              <div
                className="
                  mx-auto
                  my-5
                  h-px
                  w-12
                "
                style={{
                  backgroundColor:
                    palette.line,
                }}
              />

              {/* TITULAR */}

              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.34em]
                "
                style={{
                  color: palette.gray,
                }}
              >
                Titular
              </p>

              <p
                className="
                  mt-3
                  font-serif
                  text-[16px]
                  leading-6

                  sm:text-[18px]
                "
                style={{
                  color: palette.black,
                }}
              >
                {
                  DATOS_TRANSFERENCIA.titular
                }
              </p>
            </div>
          </GiftOption>
        </div>

        {/* =====================================
            MENSAJE FINAL
        ===================================== */}

        <motion.div
          className="
            mx-auto
            mt-14
            max-w-xl
            text-center

            sm:mt-16
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
            delay: 0.32,
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

              sm:text-[15px]
            "
            style={{
              color: palette.blackSoft,
            }}
          >
            Gracias por acompañarnos y por formar
            parte de este nuevo capítulo de nuestra
            historia.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Regalos;
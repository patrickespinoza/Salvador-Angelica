import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* =========================================
   ÁLBUM COMPARTIDO — CLÁSICO AZUL MARINO
   SALVADOR & ANGELICA

   PALETA:
   - Azul Marino
   - Azul Rey
   - Azul Cielo
   - Blanco
========================================= */

const palette = {
  navy: "#102A52",
  navyDark: "#071A35",
  navyLight: "#183B6B",

  royal: "#184EA6",
  royalBright: "#205BBB",

  sky: "#9CCBF0",
  skyLight: "#D9EBF8",

  white: "#FFFFFF",
  softWhite: "#F8FBFF",
};

const albumCode = "MX54b2491a";

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
   ORNAMENTO DE ESQUINA
========================================= */

function CornerOrnament({ className = "" }) {
  return (
    <svg
      viewBox="0 0 90 90"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 85V30C5 16.2 16.2 5 30 5h55"
        stroke="currentColor"
        strokeWidth="1"
      />

      <path
        d="M15 72V34c0-10.5 8.5-19 19-19h38"
        stroke="currentColor"
        strokeWidth="0.65"
      />

      <path
        d="M30 5C30 18.8 18.8 30 5 30"
        stroke="currentColor"
        strokeWidth="0.75"
      />

      <circle cx="15" cy="15" r="2" fill="currentColor" />
    </svg>
  );
}

/* =========================================
   SEPARADOR
========================================= */

function DecorativeDivider({ compact = false, dark = false }) {
  const lineColor = dark
    ? "rgba(156,203,240,0.8)"
    : "rgba(255,255,255,0.65)";

  const diamondColor = dark
    ? palette.sky
    : palette.white;

  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={
          compact
            ? "h-px w-8 sm:w-12"
            : "h-px w-10 sm:w-16"
        }
        style={{
          background: `linear-gradient(to right, transparent, ${lineColor})`,
        }}
      />

      <span
        className="h-[5px] w-[5px] rotate-45 border"
        style={{
          borderColor: diamondColor,
        }}
      />

      <span
        className={
          compact
            ? "h-px w-8 sm:w-12"
            : "h-px w-10 sm:w-16"
        }
        style={{
          background: `linear-gradient(to left, transparent, ${lineColor})`,
        }}
      />
    </div>
  );
}

/* =========================================
   ICONOS
========================================= */

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M5 7h3l1.5-2h5L16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function DownloadIcon() {
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
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function CopyIcon() {
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
      <rect x="8" y="8" width="11" height="11" rx="1.5" />
      <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-10A1.5 1.5 0 0 0 3 5.5v10A1.5 1.5 0 0 0 4.5 17H8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

/* =========================================
   COMPONENTE
========================================= */

const Album = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /* =========================================
     BLOQUEAR SCROLL DEL FONDO
  ========================================= */

  useEffect(() => {
    if (!open) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, [open]);

  /* =========================================
     CERRAR CON ESCAPE
  ========================================= */

  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  /* =========================================
     COPIAR CÓDIGO
  ========================================= */

  const copyAlbumCode = async () => {
    try {
      await navigator.clipboard.writeText(albumCode);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error(
        "No se pudo copiar el código:",
        error
      );
    }
  };

  return (
    <>
      {/* =========================================
          SECCIÓN PRINCIPAL
      ========================================= */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          relative
          flex
          min-h-[660px]
          w-full
          items-center
          justify-center
          overflow-hidden
          px-5
          py-24

          sm:px-8
          sm:py-28

          lg:px-12
          lg:py-32
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
            FONDO SUAVE
        ===================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            -top-24
            h-[340px]
            w-[340px]
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "radial-gradient(circle, rgba(156,203,240,0.16) 0%, transparent 72%)",
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-32
            h-[380px]
            w-[380px]
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "radial-gradient(circle, rgba(32,91,187,0.18) 0%, transparent 72%)",
          }}
        />

        {/* =====================================
            MARCOS
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

        <div
          className="
            pointer-events-none
            absolute
            inset-[26px]
            border

            sm:inset-[38px]

            lg:inset-[46px]
          "
          style={{
            borderColor: "rgba(156,203,240,0.12)",
          }}
        />

        {/* =====================================
            ORNAMENTOS
        ===================================== */}

        <CornerOrnament
          className="
            pointer-events-none
            absolute
            left-6
            top-6
            h-16
            w-16
            text-white/20

            sm:left-9
            sm:top-9
            sm:h-20
            sm:w-20
          "
        />

        <CornerOrnament
          className="
            pointer-events-none
            absolute
            right-6
            top-6
            h-16
            w-16
            rotate-90
            text-white/20

            sm:right-9
            sm:top-9
            sm:h-20
            sm:w-20
          "
        />

        <CornerOrnament
          className="
            pointer-events-none
            absolute
            bottom-6
            left-6
            h-16
            w-16
            -rotate-90
            text-white/20

            sm:bottom-9
            sm:left-9
            sm:h-20
            sm:w-20
          "
        />

        <CornerOrnament
          className="
            pointer-events-none
            absolute
            bottom-6
            right-6
            h-16
            w-16
            rotate-180
            text-white/20

            sm:bottom-9
            sm:right-9
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
            flex
            w-full
            max-w-4xl
            flex-col
            items-center
            text-center
          "
        >
          {/* ICONO */}

          <motion.div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border

              sm:h-20
              sm:w-20
            "
            style={{
              color: palette.white,
              borderColor: "rgba(156,203,240,0.52)",
            }}
            initial={{
              opacity: 0,
              scale: 0.92,
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
            }}
          >
            <CameraIcon />
          </motion.div>

          {/* SUBTÍTULO */}

          <motion.p
            className="
              mt-7
              text-[8px]
              uppercase
              tracking-[0.44em]
              text-white/70

              sm:text-[10px]
              sm:tracking-[0.55em]
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
              duration: 0.8,
              delay: 0.08,
            }}
          >
            Recuerdos compartidos
          </motion.p>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          {/* TÍTULO */}

          <motion.h2
            className="
              mt-8
              font-serif
              text-[40px]
              font-normal
              leading-tight
              tracking-[-0.025em]
              text-white

              sm:text-[54px]

              md:text-[64px]
            "
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
              duration: 0.9,
              delay: 0.12,
            }}
          >
            Álbum compartido
          </motion.h2>

          {/* TEXTO */}

          <motion.p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-serif
              text-[15px]
              italic
              leading-7
              text-white/75

              sm:text-[17px]
              sm:leading-8
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
              delay: 0.18,
            }}
          >
            Queremos ver nuestra celebración también a través de tus ojos.
            Comparte las fotografías que captures y ayúdanos a conservar cada
            momento especial.
          </motion.p>

          {/* INFORMACIÓN */}

          <motion.div
            className="
              mt-10
              border-y
              px-6
              py-6

              sm:mt-12
              sm:px-10
            "
            style={{
              borderColor: "rgba(255,255,255,0.22)",
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
              duration: 0.85,
              delay: 0.24,
            }}
          >
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.38em]
                text-white/65

                sm:text-[9px]
              "
            >
              Conservemos juntos la historia
            </p>

            <p
              className="
                mt-4
                font-serif
                text-[14px]
                leading-7
                text-white/85

                sm:text-[15px]
              "
            >
              Dentro encontrarás el código y el acceso a la aplicación para
              subir tus fotografías.
            </p>
          </motion.div>

          {/* BOTÓN */}

          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            className="
              mt-10
              inline-flex
              min-w-[230px]
              items-center
              justify-center
              gap-3
              border
              px-8
              py-4

              sm:min-w-[260px]
              sm:px-10
            "
            style={{
              backgroundColor: palette.white,
              borderColor: palette.white,
              color: palette.navy,
              boxShadow:
                "0 12px 28px rgba(0,0,0,0.18)",
            }}
            whileHover={{
              y: -2,
              backgroundColor: palette.skyLight,
            }}
            whileTap={{
              scale: 0.985,
            }}
          >
            <CameraIcon />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]

                sm:text-[10px]
                sm:tracking-[0.34em]
              "
            >
              Abrir álbum
            </span>
          </motion.button>
        </div>
      </motion.section>

      {/* =========================================
          MODAL
      ========================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              h-[100dvh]
              w-full
              items-center
              justify-center
              overflow-hidden
              bg-[#020817]/85
              px-4
              py-5
              backdrop-blur-sm

              sm:px-8
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setOpen(false);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="album-modal-title"
          >
            <motion.div
              className="
                relative
                max-h-[92dvh]
                w-full
                max-w-3xl
                overflow-y-auto
                border
                px-6
                py-14
                text-center

                sm:px-10
                sm:py-16

                md:px-14
              "
              style={{
                background: `
                  linear-gradient(
                    180deg,
                    ${palette.navy} 0%,
                    ${palette.navyDark} 100%
                  )
                `,
                borderColor: "rgba(156,203,240,0.34)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.45)",
              }}
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.98,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* BORDE INTERIOR */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-[7px]
                  border
                "
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              />

              {/* CERRAR */}

              <motion.button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar álbum compartido"
                className="
                  absolute
                  right-4
                  top-4
                  z-30
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border

                  sm:right-6
                  sm:top-6
                "
                style={{
                  color: palette.white,
                  borderColor: "rgba(255,255,255,0.35)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                whileHover={{
                  scale: 1.04,
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <CloseIcon />
              </motion.button>

              {/* CONTENIDO */}

              <div
                className="
                  relative
                  z-10
                  flex
                  w-full
                  flex-col
                  items-center
                "
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
                  "
                  style={{
                    color: palette.white,
                    borderColor: "rgba(156,203,240,0.45)",
                  }}
                >
                  <CameraIcon />
                </div>

                <p
                  className="
                    mt-6
                    text-[8px]
                    uppercase
                    tracking-[0.42em]
                    text-white/65

                    sm:text-[9px]
                  "
                >
                  Recuerdos de nuestra boda
                </p>

                <div className="mt-5">
                  <DecorativeDivider />
                </div>

                <h2
                  id="album-modal-title"
                  className="
                    mt-7
                    font-serif
                    text-[34px]
                    font-normal
                    tracking-[-0.02em]
                    text-white

                    sm:text-[44px]
                  "
                >
                  Nuestro álbum
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
                    text-white/75

                    sm:text-base
                  "
                >
                  Descarga la aplicación Wedshoots, utiliza nuestro código y
                  comparte las fotografías que captures durante la celebración.
                </p>

                {/* =====================================
                    INFORMACIÓN
                ===================================== */}

                <div
                  className="
                    mt-9
                    grid
                    w-full
                    gap-6

                    md:grid-cols-[1fr_0.8fr]
                    md:items-center
                  "
                >
                  {/* DATOS */}

                  <div
                    className="
                      relative
                      flex
                      flex-col
                      items-center
                      border
                      px-5
                      py-8
                      text-center

                      sm:px-7
                    "
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(156,203,240,0.26)",
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
                      Aplicación
                    </p>

                    <p
                      className="
                        mt-3
                        font-serif
                        text-[27px]
                        text-white

                        sm:text-[31px]
                      "
                    >
                      Wedshoots
                    </p>

                    <motion.a
                      href="https://apps.apple.com/mx/app/wedshoots/id660256196"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-6
                        inline-flex
                        items-center
                        justify-center
                        gap-3
                        border
                        px-6
                        py-3
                      "
                      style={{
                        backgroundColor: palette.white,
                        borderColor: palette.white,
                        color: palette.navy,
                      }}
                      whileHover={{
                        y: -2,
                        backgroundColor: palette.skyLight,
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                    >
                      <DownloadIcon />

                      <span
                        className="
                          text-[8px]
                          uppercase
                          tracking-[0.28em]

                          sm:text-[9px]
                        "
                      >
                        Descargar app
                      </span>
                    </motion.a>

                    <div
                      className="
                        my-8
                        h-px
                        w-20
                      "
                      style={{
                        backgroundColor: "rgba(156,203,240,0.36)",
                      }}
                    />

                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.36em]
                        text-white/60

                        sm:text-[9px]
                      "
                    >
                      Código del álbum
                    </p>

                    <div
                      className="
                        mt-4
                        flex
                        w-full
                        max-w-xs
                        items-center
                        justify-between
                        gap-3
                        border
                        px-4
                        py-4
                      "
                      style={{
                        backgroundColor: "rgba(255,255,255,0.07)",
                        borderColor: "rgba(156,203,240,0.28)",
                      }}
                    >
                      <span
                        className="
                          break-all
                          font-mono
                          text-[16px]
                          tracking-[0.16em]
                          text-white

                          sm:text-lg
                          sm:tracking-[0.22em]
                        "
                      >
                        {albumCode}
                      </span>

                      <motion.button
                        type="button"
                        onClick={copyAlbumCode}
                        aria-label="Copiar código del álbum"
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          border
                        "
                        style={{
                          color: copied
                            ? palette.sky
                            : palette.white,

                          borderColor: "rgba(255,255,255,0.30)",
                        }}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.10)",
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                      >
                        {copied ? <CheckIcon /> : <CopyIcon />}
                      </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.p
                        key={copied ? "copied" : "copy"}
                        className="
                          mt-3
                          text-[8px]
                          uppercase
                          tracking-[0.28em]
                        "
                        style={{
                          color: copied
                            ? palette.sky
                            : "rgba(255,255,255,0.58)",
                        }}
                        initial={{
                          opacity: 0,
                          y: 4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -4,
                        }}
                      >
                        {copied
                          ? "Código copiado"
                          : "Toca para copiar"}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* =====================================
                      QR
                  ===================================== */}

                  <div
                    className="
                      relative
                      flex
                      flex-col
                      items-center
                      border
                      px-5
                      py-8
                    "
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(156,203,240,0.26)",
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
                      Acceso directo
                    </p>

                    <div
                      className="
                        mt-5
                        border
                        bg-white
                        p-3
                      "
                      style={{
                        borderColor: "rgba(156,203,240,0.40)",
                        boxShadow:
                          "0 12px 30px rgba(0,0,0,0.18)",
                      }}
                    >
                      <img
                        src="/qr.jpg"
                        alt="Código QR del álbum compartido"
                        loading="lazy"
                        className="
                          h-44
                          w-44
                          object-contain

                          sm:h-48
                          sm:w-48
                        "
                      />
                    </div>

                    <p
                      className="
                        mt-5
                        max-w-xs
                        font-serif
                        text-[13px]
                        leading-6
                        text-white/72

                        sm:text-[14px]
                      "
                    >
                      Escanea el código QR para acceder y comenzar a compartir
                      tus fotografías.
                    </p>
                  </div>
                </div>

                <div className="mt-9">
                  <DecorativeDivider />
                </div>

                <p
                  className="
                    mt-6
                    max-w-lg
                    font-serif
                    text-[14px]
                    italic
                    leading-7
                    text-white/75
                  "
                >
                  Cada fotografía será una parte especial de los recuerdos que
                  conservaremos de este día.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Album;
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* =========================================
   GALERÍA CLÁSICA
   SALVADOR & ANGELICA

   DISEÑO:
   - Fondo Azul Cielo
   - Textos Negros
   - Blanco para contraste
========================================= */

const palette = {
  sky: "#9CCBF0",
  skyLight: "#D9EBF8",
  skySoft: "#EAF5FC",

  white: "#FFFFFF",

  black: "#111111",
  blackSoft: "#303030",
  gray: "#5F5F5F",
};

/* =========================================
   FOTOGRAFÍAS

   AJUSTAR POSICIÓN DE CADA FOTO:

   mobilePosition:
   posición para celular

   desktopPosition:
   posición para tablet / computadora

   Ejemplos:
   "center center"
   "center 20%"
   "center 35%"
   "left center"
   "right center"
   "60% center"
========================================= */

const images = [
  {
    src: "/Carrusel01.JPG",
    mobilePosition: "center center",
    desktopPosition: "center center",
  },
  {
    src: "/Carrusel02.JPG",
    mobilePosition: "center 30%",
    desktopPosition: "center center",
  },
  {
    src: "/Carrusel03.JPG",
    mobilePosition: "center 100%",
    desktopPosition: "center 80%",
  },
  {
    src: "/Carrusel04.JPG",
    mobilePosition: "center center",
    desktopPosition: "center center",
  },
  {
    src: "/Carrusel05.JPG",
    mobilePosition: "center 35%",
    desktopPosition: "center center",
  },
  {
    src: "/Carrusel06.JPG",
    mobilePosition: "center 35%",
    desktopPosition: "center center",
  },
];

/* =========================================
   ANIMACIÓN GENERAL
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

function PreviousIcon() {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function NextIcon() {
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
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/* =========================================
   SEPARADOR CLÁSICO
========================================= */

function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className="h-px w-12 sm:w-16"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(17,17,17,0.65))",
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
          borderColor: palette.black,
          backgroundColor: palette.sky,
        }}
      />

      <span
        className="h-px w-12 sm:w-16"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(17,17,17,0.65))",
        }}
      />
    </div>
  );
}

/* =========================================
   COMPONENTE
========================================= */

export default function Galeria() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const totalImages = images.length;

  /* =========================================
     DETECTAR DESKTOP
  ========================================= */

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const updateDevice = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener?.("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener?.(
        "change",
        updateDevice
      );
    };
  }, []);

  /* =========================================
     PRECARGAR TODAS LAS IMÁGENES
  ========================================= */

  useEffect(() => {
    const preloaders = images.map(({ src }) => {
      const img = new Image();

      img.src = src;

      if (img.decode) {
        img.decode().catch(() => {});
      }

      return img;
    });

    return () => {
      preloaders.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  /* =========================================
     CAMBIO AUTOMÁTICO
  ========================================= */

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setDirection(1);

      setIndex((previousIndex) => {
        return (previousIndex + 1) % totalImages;
      });
    }, 4500);

    return () =>
      window.clearInterval(intervalId);
  }, [isPaused, totalImages]);

  /* =========================================
     SIGUIENTE
  ========================================= */

  const nextImage = () => {
    setDirection(1);

    setIndex((previousIndex) => {
      return (previousIndex + 1) % totalImages;
    });
  };

  /* =========================================
     ANTERIOR
  ========================================= */

  const previousImage = () => {
    setDirection(-1);

    setIndex((previousIndex) => {
      return previousIndex === 0
        ? totalImages - 1
        : previousIndex - 1;
    });
  };

  /* =========================================
     IR A IMAGEN
  ========================================= */

  const goToImage = (imageIndex) => {
    if (imageIndex === index) return;

    setDirection(
      imageIndex > index ? 1 : -1
    );

    setIndex(imageIndex);
  };

  const currentImage = images[index];

  const currentObjectPosition = isDesktop
    ? currentImage.desktopPosition
    : currentImage.mobilePosition;

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
            ${palette.skyLight} 0%,
            ${palette.sky} 48%,
            ${palette.skyLight} 100%
          )
        `,
      }}
    >
      {/* =====================================
          LÍNEA SUPERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-px
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(17,17,17,0.25), transparent)",
        }}
      />

      {/* =====================================
          LUZ SUPERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          h-[300px]
          w-[300px]
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.30) 0%, transparent 70%)",
        }}
      />

      {/* =====================================
          LUZ INFERIOR
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-36
          bottom-10
          h-[340px]
          w-[340px]
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 72%)",
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
              tracking-[0.42em]

              sm:text-[10px]
              sm:tracking-[0.5em]
            "
            style={{
              color: palette.black,
            }}
          >
            Nuestros momentos
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

              sm:text-[52px]
              md:text-[60px]
            "
            style={{
              color: palette.black,
            }}
          >
            Nuestra historia
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              font-serif
              text-[13px]
              italic
              leading-6

              sm:text-[15px]
              sm:leading-7
            "
            style={{
              color: palette.blackSoft,
            }}
          >
            Un recorrido por los instantes que han
            dado forma a nuestra historia.
          </p>
        </motion.div>

        {/* =====================================
            MARCO CLÁSICO
        ===================================== */}

        <motion.div
          className="
            relative
            mx-auto
            w-full
            max-w-5xl
          "
          initial={{
            opacity: 0,
            y: 24,
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
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
        >
          <div
            className="
              relative
              border
              bg-white
              p-2

              sm:p-4
              lg:p-5
            "
            style={{
              borderColor:
                "rgba(17,17,17,0.30)",

              boxShadow:
                "0 22px 55px rgba(17,17,17,0.13)",
            }}
          >
            {/* =====================================
                BORDE INTERIOR
            ===================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-[6px]
                border

                sm:inset-[10px]
              "
              style={{
                borderColor:
                  "rgba(17,17,17,0.13)",
              }}
            />

            {/* =====================================
                FOTOGRAFÍA
            ===================================== */}

            <div
              className="
                relative
                h-[430px]
                overflow-hidden

                sm:h-[560px]
                md:h-[620px]
                lg:h-[670px]
              "
              style={{
                backgroundColor:
                  palette.skyLight,
              }}
            >
              <AnimatePresence
                custom={direction}
                initial={false}
                mode="sync"
              >
                <motion.img
                  key={currentImage.src}
                  custom={direction}
                  src={currentImage.src}
                  alt={`Momento ${index + 1} de ${totalImages}`}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                  style={{
                    objectPosition:
                      currentObjectPosition,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 1.015,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.01,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.55,
                    },

                    scale: {
                      duration: 1.2,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    },
                  }}
                />
              </AnimatePresence>

              {/* =====================================
                  OVERLAY INFERIOR
              ===================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-10
                "
                style={{
                  background: `
                    linear-gradient(
                      180deg,
                      transparent 65%,
                      rgba(0,0,0,0.16) 100%
                    )
                  `,
                }}
              />

              {/* =====================================
                  NUMERACIÓN
              ===================================== */}

              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  z-20
                  border
                  bg-white/90
                  px-4
                  py-2
                  backdrop-blur-sm

                  sm:bottom-6
                  sm:left-6
                "
                style={{
                  borderColor:
                    "rgba(17,17,17,0.22)",
                }}
              >
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.24em]

                    sm:text-[9px]
                  "
                  style={{
                    color: palette.black,
                  }}
                >
                  Fotografía{" "}
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </p>
              </div>

              {/* =====================================
                  ANTERIOR
              ===================================== */}

              <motion.button
                type="button"
                onClick={previousImage}
                aria-label="Mostrar fotografía anterior"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  border
                  bg-white/90
                  backdrop-blur-sm

                  sm:left-5
                  sm:h-12
                  sm:w-12
                "
                style={{
                  borderColor:
                    "rgba(17,17,17,0.25)",

                  color:
                    palette.black,

                  boxShadow:
                    "0 6px 16px rgba(0,0,0,0.10)",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor:
                    palette.skyLight,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <PreviousIcon />
              </motion.button>

              {/* =====================================
                  SIGUIENTE
              ===================================== */}

              <motion.button
                type="button"
                onClick={nextImage}
                aria-label="Mostrar siguiente fotografía"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  border
                  bg-white/90
                  backdrop-blur-sm

                  sm:right-5
                  sm:h-12
                  sm:w-12
                "
                style={{
                  borderColor:
                    "rgba(17,17,17,0.25)",

                  color:
                    palette.black,

                  boxShadow:
                    "0 6px 16px rgba(0,0,0,0.10)",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor:
                    palette.skyLight,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <NextIcon />
              </motion.button>
            </div>

            {/* =====================================
                PIE DE GALERÍA
            ===================================== */}

            <div
              className="
                relative
                flex
                flex-col
                items-center
                px-4
                pb-5
                pt-6
                text-center

                sm:pb-6
                sm:pt-7
              "
            >
              <motion.p
                key={`counter-${index}`}
                className="
                  font-serif
                  text-[20px]

                  sm:text-[24px]
                "
                style={{
                  color: palette.black,
                }}
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                {String(index + 1).padStart(
                  2,
                  "0"
                )}

                <span
                  className="mx-2 text-sm"
                  style={{
                    color: palette.gray,
                  }}
                >
                  /
                </span>

                <span
                  className="text-base"
                  style={{
                    color: palette.gray,
                  }}
                >
                  {String(
                    totalImages
                  ).padStart(2, "0")}
                </span>
              </motion.p>

              {/* =====================================
                  INDICADORES
              ===================================== */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2.5
                "
              >
                {images.map(
                  (_, imageIndex) => {
                    const isActive =
                      index === imageIndex;

                    return (
                      <motion.button
                        key={`indicator-${imageIndex}`}
                        type="button"
                        onClick={() =>
                          goToImage(
                            imageIndex
                          )
                        }
                        aria-label={`Mostrar fotografía ${
                          imageIndex + 1
                        }`}
                        aria-current={
                          isActive
                            ? "true"
                            : undefined
                        }
                        className="
                          h-[6px]
                          border
                        "
                        animate={{
                          width: isActive
                            ? 30
                            : 6,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        style={{
                          backgroundColor:
                            isActive
                              ? palette.black
                              : palette.white,

                          borderColor:
                            isActive
                              ? palette.black
                              : "rgba(17,17,17,0.40)",
                        }}
                      />
                    );
                  }
                )}
              </div>

              <p
                className="
                  mt-4
                  text-[7px]
                  uppercase
                  tracking-[0.28em]

                  sm:text-[8px]
                "
                style={{
                  color: palette.gray,
                }}
              >
                La galería avanza
                automáticamente
              </p>
            </div>
          </div>
        </motion.div>

        {/* =====================================
            FRASE FINAL
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
            duration: 0.9,
            delay: 0.3,
          }}
        >
          <div
            className="
              mx-auto
              mb-5
              h-px
              w-16
            "
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(17,17,17,0.55), transparent)",
            }}
          />

          <p
            className="
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
            Cada fotografía guarda un instante de
            nuestro camino y una parte de la
            historia que hoy celebramos.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
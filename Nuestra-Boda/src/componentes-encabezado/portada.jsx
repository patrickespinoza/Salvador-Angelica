import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./encabeza-cuenta";

/* =========================================
   PALETA
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
  ivory: "#FCFBF8",

  ink: "#202A38",
  inkSoft: "#4B5563",
  gray: "#777E87",

  gold: "#B98232",
  goldLight: "#D6AD63",
  goldDark: "#82571E",
};

const transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export default function Portada() {
  const audioRef = useRef(null);

  const [introActiva, setIntroActiva] = useState(true);
  const [mostrarContenido, setMostrarContenido] =
    useState(false);

  const [abrirSobre, setAbrirSobre] = useState(false);
  const [procesandoApertura, setProcesandoApertura] =
    useState(false);

  const [invitados, setInvitados] = useState("Invitado");
  const [pases, setPases] = useState(1);

  /* =========================================
     DATOS PERSONALIZADOS DESDE URL
  ========================================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      setInvitados("Invitado");
      setPases(1);
      return;
    }

    try {
      const idNormalizado = decodeURIComponent(id)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const paddingFaltante = idNormalizado.length % 4;

      const idConPadding =
        paddingFaltante === 0
          ? idNormalizado
          : idNormalizado + "=".repeat(4 - paddingFaltante);

      const textoInvertido = atob(idConPadding);

      const textoOriginal = textoInvertido
        .split("")
        .reverse()
        .join("");

      const datos = JSON.parse(textoOriginal);

      const nombreDecodificado =
        typeof datos.nombre === "string"
          ? datos.nombre.trim()
          : "";

      const pasesDecodificados = Number.parseInt(
        datos.pases,
        10
      );

      if (nombreDecodificado) {
        setInvitados(nombreDecodificado);
      }

      if (
        !Number.isNaN(pasesDecodificados) &&
        pasesDecodificados > 0
      ) {
        setPases(pasesDecodificados);
      }
    } catch (error) {
      console.error(
        "No se pudieron decodificar los datos:",
        error
      );

      setInvitados("Invitado");
      setPases(1);
    }
  }, []);

  /* =========================================
     BLOQUEAR SCROLL
  ========================================= */

  useEffect(() => {
    if (!introActiva) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };
  }, [introActiva]);

  /* =========================================
     ABRIR INVITACIÓN
  ========================================= */

  const iniciarExperiencia = () => {
    if (procesandoApertura || abrirSobre) return;

    setProcesandoApertura(true);
    setAbrirSobre(true);

    window.setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.45;

        audioRef.current.play().catch((error) => {
          console.warn(
            "No se pudo reproducir el audio:",
            error
          );
        });
      }
    }, 250);

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      setIntroActiva(false);
      setMostrarContenido(true);
      setProcesandoApertura(false);
    }, 3400);
  };

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
      "
      style={{
        backgroundColor: palette.ivory,
        color: palette.ink,
      }}
    >
      {/* =========================================
          AJUSTE RESPONSIVO DEL INTRO EN DESKTOP
          Móvil permanece sin cambios.
      ========================================= */}

      <style>{`
        @media (min-width: 900px) {
          .intro-info-left {
            width: 100%;
            max-width: 470px;
            justify-self: center;
          }

          .intro-envelope {
            width: 100%;
          }

          .intro-guest {
            width: min(100%, 450px);
          }
        }

        @media (min-width: 900px) and (max-height: 760px) {
          .intro-info-left {
            transform: scale(0.93);
            transform-origin: center center;
          }

          .intro-envelope {
            height: 325px !important;
            max-width: 390px !important;
          }

          .intro-guest {
            transform: scale(0.92);
            transform-origin: top center;
            margin-top: 0 !important;
          }
        }

        @media (min-width: 900px) and (max-height: 650px) {
          .intro-info-left {
            transform: scale(0.82);
          }

          .intro-envelope {
            height: 285px !important;
            max-width: 345px !important;
          }

          .intro-guest {
            transform: scale(0.80);
          }
        }
      `}</style>

      {/* =========================================
          AUDIO
      ========================================= */}

      <audio ref={audioRef} loop preload="auto">
        <source src="/musica.mp3" type="audio/mpeg" />
      </audio>

      {/* =========================================
          INTRO
      ========================================= */}

      <AnimatePresence mode="wait">
        {introActiva && (
          <motion.section
            key="intro-sobre"
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
            "
            style={{
              backgroundColor: palette.ivory,
              touchAction: "none",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* =====================================
                TEXTURA DE FONDO
            ===================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
              "
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(16,42,82,0.012) 0px,
                    rgba(16,42,82,0.012) 1px,
                    transparent 1px,
                    transparent 5px
                  )
                `,
              }}
            />

            {/* =====================================
                FLORES SUPERIORES
            ===================================== */}

            <motion.img
              src="/flores-azules.png"
              alt=""
              className="
                pointer-events-none
                absolute
                -left-12
                -top-12
                z-10
                w-[155px]

                sm:w-[260px]
                lg:w-[330px]
              "
              initial={{
                opacity: 0,
                x: -20,
                y: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 1.1,
              }}
            />

            {/* =====================================
                FLORES INFERIORES
            ===================================== */}

            <motion.img
              src="/flores-azules.png"
              alt=""
              className="
                pointer-events-none
                absolute
                -bottom-14
                -right-14
                z-10
                w-[190px]
                rotate-180

                sm:w-[270px]
                lg:w-[340px]
              "
              initial={{
                opacity: 0,
                x: 20,
                y: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 1.1,
                delay: 0.1,
              }}
            />

            {/* =====================================
                CONTENIDO GENERAL
            ===================================== */}

            <div
              className="
                relative
                z-20
                mx-auto
                flex
                h-full
                w-full
                max-w-[620px]
                flex-col
                items-center
                justify-center
                px-5
                py-5
                text-center

                sm:max-w-[720px]
                sm:px-8
                translate-y-3
                sm:translate-y-4

                lg:max-w-[1280px]
                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:gap-10
                lg:px-12
                lg:py-8
                lg:translate-y-8

                xl:gap-16
                xl:px-16
                xl:translate-y-10
              "
            >
              {/* =================================
                  TEXTO SUPERIOR
              ================================= */}

              <motion.div
                className="
                  intro-info-left
                  relative
                  z-50
                  flex
                  flex-col
                  items-center

                  translate-y-7
                  sm:translate-y-6

                  lg:w-[42%]
                  lg:flex-none
                  lg:self-center
                  lg:px-4
                  lg:translate-y-0
                "
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: abrirSobre ? 0 : 1,
                  y: abrirSobre ? -10 : 0,
                }}
                transition={{
                  duration: 0.45,
                }}
              >
                <p
                  className="
                    font-serif
                    text-[9px]
                    uppercase
                    leading-[1.7]
                    tracking-[0.22em]

                    sm:text-[11px]
                    sm:leading-[1.55]
                    sm:tracking-[0.28em]

                  "
                  style={{
                    color: palette.ink,
                  }}
                >
                  Tenemos el honor de invitarte 
                  <br />
                  a nuestra boda
                </p>

                <div className="mt-0.5 sm:mt-1">
                  <h1
                    className="
                      font-cursiveDancing
                      text-[31px]
                      leading-[0.95]

                      sm:text-[43px]
                    "
                    style={{
                      color: palette.navy,
                    }}
                  >
                    Salvador
                  </h1>

                  <span
                    className="
                      my-[2px]
                      block
                      font-cursiveDancing
                      text-lg

                      sm:text-2xl
                    "
                    style={{
                      color: palette.royal,
                    }}
                  >
                    &
                  </span>

                  <h1
                    className="
                      font-cursiveDancing
                      text-[31px]
                      leading-[0.95]

                      sm:text-[43px]
                    "
                    style={{
                      color: palette.navy,
                    }}
                  >
                    Angélica
                  </h1>
                </div>

                {/* =================================
                    FECHA + FRASE · MÓVIL / TABLET
                    En desktop se muestran a un costado
                ================================= */}

                <div>
                  <p
                    className="
                      mt-2
                      font-serif
                      text-[14px]
                      uppercase
                      tracking-[0.2em]

                      sm:mt-2
                      sm:text-[16px]
                    "
                    style={{
                      color: palette.royal,
                    }}
                  >
                    17 · Octubre · 2026
                  </p>

                  <motion.div
                    className="
                      mt-2
                      w-full
                      max-w-[300px]
                      px-2

                      sm:mt-1.5
                      sm:max-w-[390px]
                    "
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: abrirSobre ? 0 : 1,
                      y: abrirSobre ? -6 : 0,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15,
                    }}
                  >
                    <p
                      className="
                        font-serif
                        text-[8.5px]
                        italic
                        leading-[1.45]
                        tracking-[0.015em]

                        sm:text-[10px]
                        sm:leading-[1.5]
                      "
                      style={{
                        color: palette.inkSoft,
                      }}
                    >
                      “Más valen dos que uno, porque obtienen más fruto de su
                      esfuerzo; si caen, el uno levanta al otro.”
                    </p>

                    <p
                      className="
                        mt-1
                        font-serif
                        text-[6.5px]
                        uppercase
                        tracking-[0.15em]

                        sm:mt-1.5
                        sm:text-[7.5px]
                        sm:tracking-[0.18em]
                      "
                      style={{
                        color: palette.royal,
                      }}
                    >
                      Eclesiastés 4:9-10
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* =================================
                  BLOQUE DERECHO EN DESKTOP
                  En móvil usa `contents`, por lo que no altera
                  absolutamente nada de la distribución actual.
              ================================= */}

              <div
                className="
                  contents

                  lg:flex
                  lg:w-[52%]
                  lg:flex-none
                  lg:flex-col
                  lg:items-center
                  lg:justify-center
                "
              >
                {/* =================================
                    ESCENARIO DEL SOBRE
                ================================= */}

                <motion.div
                className="
                  intro-envelope
                  relative
                  mt-1
                  h-[290px]
                  w-full
                  max-w-[330px]

                  sm:mt-2
                  sm:h-[390px]
                  sm:max-w-[450px]

                  lg:mt-0
                  lg:h-[350px]
                  lg:max-w-[405px]

                  xl:h-[390px]
                  xl:max-w-[450px]
                "
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  ...transition,
                  delay: 0.25,
                }}
              >
                <button
                  type="button"
                  onClick={iniciarExperiencia}
                  disabled={procesandoApertura}
                  aria-label="Abrir invitación"
                  className="
                    absolute
                    inset-0
                    cursor-pointer
                    border-0
                    bg-transparent
                    p-0
                    outline-none
                  "
                  style={{
                    perspective: "2200px",
                  }}
                >
                  {/* =================================
                      SOBRE
                  ================================= */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      mx-auto
                      aspect-[350/235]
                      w-full
                    "
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* =================================
                        SOMBRA
                    ================================= */}

                    <motion.div
                      className="
                        absolute
                        -bottom-6
                        left-[12%]
                        z-0
                        h-10
                        w-[76%]
                        rounded-full
                        bg-[#071A35]/25
                        blur-2xl
                      "
                      animate={{
                        opacity: abrirSobre ? 0.12 : 0.25,
                        scaleX: abrirSobre ? 1.12 : 1,
                      }}
                      transition={{
                        duration: 1.3,
                      }}
                    />

                    {/* =================================
                        BASE TRASERA
                    ================================= */}

                    <div
                      className="
                        absolute
                        inset-0
                        z-10
                        overflow-hidden
                      "
                      style={{
                        background: `
                          linear-gradient(
                            145deg,
                            #194779 0%,
                            #102A52 50%,
                            #071A35 100%
                          )
                        `,
                        boxShadow: `
                          0 25px 46px rgba(7,26,53,0.28),
                          inset 0 1px 0 rgba(255,255,255,0.08)
                        `,
                      }}
                    />

                    {/* =================================
                        CARTA

                        IMPORTANTE:
                        CERRADA = opacity 0
                        ABIERTA = aparece después.
                    ================================= */}

                    <motion.div
                      className="
                        pointer-events-none
                        absolute
                        left-[9%]
                        right-[9%]
                        top-[11%]
                        z-20
                        h-[82%]
                        overflow-hidden
                        border
                        bg-white
                        px-4
                        text-center
                      "
                      style={{
                        borderColor:
                          "rgba(24,78,166,0.18)",

                        boxShadow:
                          "0 10px 24px rgba(7,26,53,0.16)",
                      }}
                      initial={{
                        opacity: 0,
                        y: 65,
                        scale: 0.96,
                      }}
                      animate={
                        abrirSobre
                          ? {
                              opacity: 1,
                              y: -118,
                              scale: 1,
                            }
                          : {
                              opacity: 0,
                              y: 65,
                              scale: 0.96,
                            }
                      }
                      transition={{
                        opacity: {
                          duration: 0.28,
                          delay: abrirSobre ? 0.75 : 0,
                        },

                        y: {
                          duration: 1.25,
                          delay: abrirSobre ? 0.78 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        },

                        scale: {
                          duration: 1,
                          delay: abrirSobre ? 0.78 : 0,
                        },
                      }}
                    >
                      {/* FLORES CARTA */}

                      <img
                        src="/flores-azules.png"
                        alt=""
                        className="
                          absolute
                          -left-8
                          -top-8
                          w-[95px]
                          opacity-70

                          sm:w-[130px]
                        "
                      />

                      <img
                        src="/flores-azules.png"
                        alt=""
                        className="
                          absolute
                          -bottom-8
                          -right-8
                          w-[95px]
                          rotate-180
                          opacity-70

                          sm:w-[130px]
                        "
                      />

                      {/* CONTENIDO CARTA */}

                      <div
                        className="
                          relative
                          z-10
                          flex
                          h-full
                          w-full
                          flex-col
                          items-center
                          justify-center
                        "
                      >
                        <p
                          className="
                            font-serif
                            text-[6px]
                            uppercase
                            tracking-[0.3em]

                            sm:text-[8px]
                          "
                          style={{
                            color: palette.royal,
                          }}
                        >
                          Nuestra boda
                        </p>

                        <p
                          className="
                            mt-3
                            font-cursiveDancing
                            text-[21px]
                            leading-none

                            sm:text-[30px]
                          "
                          style={{
                            color: palette.navy,
                          }}
                        >
                          Salvador
                        </p>

                        <span
                          className="
                            my-[2px]
                            font-cursiveDancing
                            text-sm

                            sm:text-base
                          "
                          style={{
                            color: palette.royal,
                          }}
                        >
                          &
                        </span>

                        <p
                          className="
                            font-cursiveDancing
                            text-[21px]
                            leading-none

                            sm:text-[30px]
                          "
                          style={{
                            color: palette.navy,
                          }}
                        >
                          Angélica
                        </p>

                        <div
                          className="
                            my-3
                            h-px
                            w-14
                          "
                          style={{
                            background:
                              "linear-gradient(to right, transparent, #184EA6, transparent)",
                          }}
                        />

                        <p
                          className="
                            font-serif
                            text-[6px]
                            uppercase
                            tracking-[0.2em]

                            sm:text-[8px]
                          "
                          style={{
                            color: palette.inkSoft,
                          }}
                        >
                          17 · Octubre · 2026
                        </p>
                      </div>
                    </motion.div>

                    {/* =================================
                        SOLAPA SUPERIOR
                    ================================= */}

                    <motion.div
                      className="
                        absolute
                        left-0
                        top-0
                        z-40
                        h-[58%]
                        w-full
                        origin-top
                      "
                      style={{
                        clipPath:
                          "polygon(0 0, 50% 100%, 100% 0)",

                        background: `
                          linear-gradient(
                            180deg,
                            #1B487E 0%,
                            #0D2B53 100%
                          )
                        `,

                        boxShadow:
                          "0 10px 18px rgba(7,26,53,0.18)",

                        backfaceVisibility: "hidden",

                        transformStyle:
                          "preserve-3d",
                      }}
                      initial={{
                        rotateX: 0,
                      }}
                      animate={
                        abrirSobre
                          ? {
                              rotateX: -180,
                            }
                          : {
                              rotateX: 0,
                            }
                      }
                      transition={{
                        duration: 0.9,

                        delay: abrirSobre ? 0.15 : 0,

                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    {/* =================================
                        SOLAPA IZQUIERDA
                    ================================= */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        z-30
                        h-[74%]
                        w-[54%]
                      "
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 100%, 0 100%)",

                        background: `
                          linear-gradient(
                            145deg,
                            #173E70 0%,
                            #0A2447 100%
                          )
                        `,
                      }}
                    />

                    {/* =================================
                        SOLAPA DERECHA
                    ================================= */}

                    <div
                      className="
                        absolute
                        bottom-0
                        right-0
                        z-30
                        h-[74%]
                        w-[54%]
                      "
                      style={{
                        clipPath:
                          "polygon(100% 0, 100% 100%, 0 100%)",

                        background: `
                          linear-gradient(
                            215deg,
                            #194676 0%,
                            #091F3D 100%
                          )
                        `,
                      }}
                    />

                    {/* =================================
                        BOLSA FRONTAL
                    ================================= */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        z-[32]
                        h-[63%]
                        w-full
                      "
                      style={{
                        clipPath:
                          "polygon(0 100%, 50% 0, 100% 100%)",

                        background: `
                          linear-gradient(
                            180deg,
                            #153A68 0%,
                            #081D39 100%
                          )
                        `,
                      }}
                    />

                    {/* =================================
                        FLORES SOBRE
                    ================================= */}

                    <motion.img
                      src="/flores-azules.png"
                      alt=""
                      className="
                        pointer-events-none
                        absolute
                        -left-[8%]
                        top-[15%]
                        z-50
                        w-[41%]
                      "
                      animate={
                        abrirSobre
                          ? {
                              opacity: 0,
                              x: -16,
                              scale: 0.92,
                            }
                          : {
                              opacity: 1,
                              x: 0,
                              scale: 1,
                            }
                      }
                      transition={{
                        duration: 0.45,
                      }}
                    />

                    {/* =================================
                        CLIC AQUÍ
                    ================================= */}

                    <motion.p
                      className="
                        pointer-events-none
                        absolute
                        left-0
                        right-0
                        top-[35%]
                        z-[60]
                        mx-auto
                        text-center
                        font-serif
                        text-[8px]
                        uppercase
                        tracking-[0.22em]
                        text-white

                        sm:text-[10px]
                      "
                      style={{
                        textShadow:
                          "0 2px 5px rgba(0,0,0,0.4)",
                      }}
                      animate={
                        abrirSobre
                          ? {
                              opacity: 0,
                              y: -8,
                            }
                          : {
                              opacity: 1,
                              y: 0,
                            }
                      }
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      Clic aquí
                    </motion.p>

                    {/* =================================
                        SELLO
                    ================================= */}

                    <motion.div
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[52%]
                        z-[70]
                        -translate-x-1/2
                        -translate-y-1/2
                      "
                      animate={
                        abrirSobre
                          ? {
                              opacity: 0,
                              scale: 0.45,
                              y: -18,
                            }
                          : {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                            }
                      }
                      transition={{
                        duration: 0.4,
                      }}
                    >
                      <div
                        className="
                          relative
                          flex
                          h-[60px]
                          w-[60px]
                          items-center
                          justify-center
                          rounded-full

                          sm:h-[76px]
                          sm:w-[76px]
                        "
                        style={{
                          background: `
                            radial-gradient(
                              circle at 35% 27%,
                              #E7C37E 0%,
                              #C48D3F 38%,
                              #956323 72%,
                              #704414 100%
                            )
                          `,

                          boxShadow: `
                            inset 0 2px 4px rgba(255,255,255,0.38),
                            inset 0 -5px 8px rgba(89,49,10,0.34),
                            0 9px 18px rgba(7,26,53,0.30)
                          `,
                        }}
                      >
                        <div
                          className="
                            absolute
                            inset-[6px]
                            rounded-full
                            border
                          "
                          style={{
                            borderColor:
                              "rgba(255,235,194,0.50)",
                          }}
                        />

                        <div
                          className="
                            relative
                            z-10
                            font-cursiveDancing
                            text-[17px]

                            sm:text-[21px]
                          "
                          style={{
                            color: "#F9E8C3",

                            textShadow:
                              "0 1px 2px rgba(89,49,10,0.55)",
                          }}
                        >
                          S
                          <span
                            className="
                              mx-[2px]
                              text-[9px]

                              sm:text-[11px]
                            "
                          >
                            &
                          </span>
                          A
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </button>
              </motion.div>

              {/* =================================
                  INVITADO Y PASES
              ================================= */}

              <motion.div
                className="
                  intro-guest
                  relative
                  z-50
                  mt-0
                  flex
                  w-full
                  flex-col
                  items-center

                  sm:mt-1

                  lg:mt-0
                  lg:max-w-[450px]
                "
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={
                  abrirSobre
                    ? {
                        opacity: 0,
                        y: 10,
                      }
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.4,
                  delay: abrirSobre ? 0 : 0.45,
                }}
              >
                <p
                  className="
                    max-w-[92%]
                    break-words
                    font-cursiveDancing
                    text-[22px]
                    leading-tight

                    sm:text-[31px]
                  "
                  style={{
                    color: palette.navy,
                  }}
                >
                  {invitados}
                </p>

                <p
                  className="
                    mt-2
                    font-serif
                    text-[8px]
                    uppercase
                    tracking-[0.22em]

                    sm:text-[10px]
                  "
                  style={{
                    color: palette.ink,
                  }}
                >
                  Hemos reservado
                </p>

                <p
                  className="
                    mt-1
                    font-serif
                    text-[23px]
                    leading-none

                    sm:text-[31px]
                  "
                  style={{
                    color: palette.navy,
                  }}
                >
                  {pases}
                </p>

                <p
                  className="
                    mt-1
                    font-serif
                    text-[8px]
                    uppercase
                    tracking-[0.18em]

                    sm:text-[10px]
                  "
                  style={{
                    color: palette.ink,
                  }}
                >
                  {pases === 1
                    ? "Lugar en tu honor"
                    : "Lugares en tu honor"}
                </p>

                <p
                  className="
                    mt-2
                    text-[7px]
                    uppercase
                    tracking-[0.24em]

                    sm:text-[8px]
                  "
                  style={{
                    color: palette.gray,
                  }}
                >
                  Toca el sobre para abrir
                </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* =========================================
          PORTADA PRINCIPAL
      ========================================= */}

      <section
        className="
          relative
          min-h-[100dvh]
          w-full
          overflow-hidden
        "
        style={{
          backgroundColor: palette.navyDark,
        }}
      >
        {/* =====================================
            IMAGEN
        ===================================== */}

        <motion.img
          src="/portada.JPG"
          alt="Salvador y Angélica"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-[center_20%]
          "
          initial={{
            opacity: 0,
            scale: 1.035,
          }}
          animate={
            mostrarContenido
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  scale: 1.035,
                }
          }
          transition={{
            opacity: {
              duration: 1.2,
            },

            scale: {
              duration: 7,
              ease: "easeOut",
            },
          }}
        />

      

        {/* =====================================
            MARCO
        ===================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-4
            z-10
            border

            sm:inset-7
            lg:inset-9
          "
          style={{
            borderColor: "rgba(220,239,252,0.38)",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: mostrarContenido ? 1 : 0,
          }}
          transition={{
            duration: 1,
            delay: 0.35,
          }}
        />

        {/* =====================================
            CONTENIDO PORTADA
        ===================================== */}

        <motion.div
          className="
            relative
            z-20
            flex
            min-h-[100dvh]
            w-full
            flex-col
            items-center
            justify-start
            px-5
            pb-5
            pt-8
            text-center

            sm:px-12
            sm:pt-16

            lg:px-16
            lg:pt-20
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: mostrarContenido ? 1 : 0,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
        >

          {/* NOMBRES */}

          <motion.div
            className="
              mt-1
              flex
              max-w-4xl
              flex-col
              items-center

              sm:mt-2
            "
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={
              mostrarContenido
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            transition={{
              duration: 1.1,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1
              className="
                font-cursiveDancing
                text-[40px]
                leading-[0.9]
                text-white

                sm:text-[70px]
                md:text-[84px]
                lg:text-[46px]
              "
              style={{
                textShadow:
                  "0 4px 24px rgba(0,0,0,0.34)",
              }}
            >
              Salvador
            </h1>

            <div
              className="
                my-2
                flex
                items-center
                gap-3

                sm:my-4
                sm:gap-6
              "
            >
              <span
                className="
                  h-px
                  w-12

                  sm:w-20
                "
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(169,214,245,0.9))",
                }}
              />

              <span
                className="
                  font-cursiveDancing
                  text-2xl

                  sm:text-4xl
                "
                style={{
                  color: palette.sky,
                }}
              >
                &
              </span>

              <span
                className="
                  h-px
                  w-12

                  sm:w-20
                "
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(169,214,245,0.9))",
                }}
              />
            </div>

            <h1
              className="
                font-cursiveDancing
                text-[40px]
                leading-[0.9]
                text-white

                sm:text-[70px]
                md:text-[84px]
                lg:text-[44px]
              "
              style={{
                textShadow:
                  "0 4px 24px rgba(0,0,0,0.34)",
              }}
            >
              Angélica
            </h1>
          </motion.div>

          {/* ===================================
              CONTADOR
          =================================== */}

          <motion.div
            className="
              mt-auto
              w-full
              max-w-4xl
              pb-1
              pt-3

              sm:pb-4
              sm:pt-6
            "
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={
              mostrarContenido
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            transition={{
              duration: 1,
              delay: 0.9,
            }}
          >
            <Countdown targetDate="2026-10-17T00:00:00" />

            <motion.div
              className="
                mt-4
                flex
                flex-col
                items-center

                sm:mt-10
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: mostrarContenido ? 1 : 0,
              }}
              transition={{
                duration: 1,
                delay: 1.1,
              }}
            >
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.35em]
                  text-white/65

                  sm:text-[9px]
                "
              >
                Desliza para continuar
              </p>

              <div
                className="
                  mt-2
                  h-6
                  w-px
                  overflow-hidden
                  bg-white/25

                  sm:mt-4
                  sm:h-9
                "
              >
                <motion.span
                  className="
                    block
                    h-4
                    w-px
                    bg-white/80
                  "
                  animate={{
                    y: [-16, 36],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.25,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
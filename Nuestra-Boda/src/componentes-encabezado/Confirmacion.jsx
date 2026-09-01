import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxb-9RatIZp2faA5UXY9zIBSkvBXjw4Z313GjxnCkWs12oEM_FfIMqXKoBpRLIwj2oD/exec";

/* =========================================
   CONTACTOS
========================================= */

const CONTACTOS_WHATSAPP = {
  novio: {
    nombre: "Salvador",
    numero: "527821218662",
    lado: "Novio",
  },

  novia: {
    nombre: "Angélica",
    numero: "527821964203",
    lado: "Novia",
  },
};

/* =========================================
   PALETA
========================================= */

const palette = {
  navy: "#102A52",
  navyDark: "#071A35",
  royal: "#184EA6",
  sky: "#9CCBF0",
  skyLight: "#D9EBF8",
  white: "#FFFFFF",
  error: "#FFD3D3",
  success: "#D8F5DF",
};

/* =========================================
   DECODIFICAR ENLACE
========================================= */

function normalizeBase64(value) {
  const normalized = value
    .trim()
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const remainder =
    normalized.length % 4;

  if (remainder === 0) {
    return normalized;
  }

  return (
    normalized +
    "=".repeat(4 - remainder)
  );
}

function decodeBase64Utf8(value) {
  const binary = window.atob(
    normalizeBase64(value)
  );

  try {
    const bytes = Uint8Array.from(
      binary,
      (character) =>
        character.charCodeAt(0)
    );

    return new TextDecoder(
      "utf-8",
      {
        fatal: false,
      }
    ).decode(bytes);
  } catch {
    return binary;
  }
}

function parseInvitationData(
  encodedId
) {
  if (!encodedId) {
    return null;
  }

  const decodedValue =
    decodeURIComponent(encodedId);

  const decodedText =
    decodeBase64Utf8(
      decodedValue
    );

  const possibleValues = [
    decodedText
      .split("")
      .reverse()
      .join(""),

    decodedText,
  ];

  for (
    const possibleValue of
    possibleValues
  ) {
    try {
      const parsedData =
        JSON.parse(
          possibleValue
        );

      if (
        parsedData &&
        typeof parsedData ===
          "object"
      ) {
        return parsedData;
      }
    } catch {
      // Continúa intentando.
    }
  }

  throw new Error(
    "El enlace personalizado no tiene un formato válido."
  );
}

/* =========================================
   ICONOS
========================================= */

function EnvelopeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-7 w-7"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
      />

      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6A8.5 8.5 0 1 1 20.5 11.5Z" />

      <path d="M8.2 7.8c.3-.4.6-.4.9-.1l1.1 1.5c.2.3.2.6 0 .9l-.6.8c-.2.3 0 .7.3 1.1.7 1 1.5 1.8 2.6 2.4.4.2.8.3 1.1 0l.8-.8c.3-.3.6-.3.9-.1l1.5 1c.4.2.4.6.2.9-.5 1-1.4 1.6-2.5 1.6-1.6 0-3.8-1.2-5.6-3-1.7-1.7-2.9-3.9-2.9-5.4 0-.9.4-1.9 1.2-2.8Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
      />

      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
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
      className="h-5 w-5"
    >
      <path d="m5 12 4 4L19 6" />
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
        className="h-[5px] w-[5px] rotate-45 border"
        style={{
          borderColor:
            "rgba(156,203,240,0.9)",
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
   OPCIÓN DE ASISTENCIA
========================================= */

function AttendanceOption({
  value,
  selectedValue,
  onChange,
  title,
  description,
}) {
  const isSelected =
    selectedValue === value;

  return (
    <label
      className="
        relative
        flex
        cursor-pointer
        items-start
        gap-4
        border
        px-5
        py-4
        text-left
        transition
      "
      style={{
        backgroundColor:
          isSelected
            ? "rgba(156,203,240,0.14)"
            : "rgba(255,255,255,0.045)",

        borderColor:
          isSelected
            ? palette.sky
            : "rgba(255,255,255,0.20)",
      }}
    >
      <input
        type="radio"
        name="asistencia"
        value={value}
        checked={isSelected}
        onChange={() =>
          onChange(value)
        }
        className="sr-only"
      />

      <span
        className="
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          border
        "
        style={{
          borderColor:
            isSelected
              ? palette.sky
              : "rgba(255,255,255,0.55)",
        }}
      >
        {isSelected && (
          <span
            className="
              h-2.5
              w-2.5
              rounded-full
            "
            style={{
              backgroundColor:
                palette.sky,
            }}
          />
        )}
      </span>

      <span>
        <span className="block font-serif text-[15px] text-white sm:text-base">
          {title}
        </span>

        <span className="mt-1 block text-[12px] leading-5 text-white/60 sm:text-[13px]">
          {description}
        </span>
      </span>
    </label>
  );
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function Confirmacion({
  modo = "confirmacion",
}) {
  const esReconfirmacion =
    modo === "reconfirmacion";

  const [
    nombreInvitado,
    setNombreInvitado,
  ] = useState("");

  const [
    pasesAsignados,
    setPasesAsignados,
  ] = useState(1);

  const [
    datosDesdeGenerador,
    setDatosDesdeGenerador,
  ] = useState(false);

  const [
    mensajeInvitado,
    setMensajeInvitado,
  ] = useState("");

  const [
    asistencia,
    setAsistencia,
  ] = useState("");

  const [
    invitados,
    setInvitados,
  ] = useState(1);

  const [
    error,
    setError,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    enviado,
    setEnviado,
  ] = useState(false);

  const [
    urlError,
    setUrlError,
  ] = useState("");

  /* =========================================
     TEXTOS SEGÚN EL MODO
  ========================================= */

  const contenido = {
    confirmacion: {
      etiqueta:
        "Nos encantará contar contigo",

      titulo:
        "Confirmación de asistencia",

      descripcion:
        "Por favor, confirma tu asistencia antes del 15 de septiembre.",

      botonNovio:
        "Confirmar con Salvador",

      botonNovia:
        "Confirmar con Angélica",
    },

    reconfirmacion: {
      etiqueta:
        "Nuestro gran día está cada vez más cerca",

      titulo:
        "Reconfirmación de asistencia",

      descripcion:
        "Por favor, reconfirma tu asistencia antes del 3 de octubre.",

      botonNovio:
        "Reconfirmar con Salvador",

      botonNovia:
        "Reconfirmar con Angélica",
    },
  };

  const textos =
    esReconfirmacion
      ? contenido.reconfirmacion
      : contenido.confirmacion;

  /* =========================================
     LEER DATOS DEL GENERADOR
  ========================================= */

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const encodedId =
      params.get("id");

    const visibleName =
      params.get("nombre");

    const visiblePasses =
      params.get("pases");

    try {
      let invitationData =
        null;

      if (encodedId) {
        invitationData =
          parseInvitationData(
            encodedId
          );
      } else if (
        visibleName ||
        visiblePasses
      ) {
        invitationData = {
          nombre:
            visibleName,

          pases:
            visiblePasses,
        };
      }

      if (!invitationData) {
        setDatosDesdeGenerador(
          false
        );

        return;
      }

      const decodedName =
        typeof invitationData.nombre ===
        "string"
          ? invitationData.nombre.trim()
          : "";

      const decodedPasses =
        Number.parseInt(
          invitationData.pases ??
            invitationData.invitados ??
            invitationData.cantidad ??
            invitationData.lugares ??
            1,
          10
        );

      if (decodedName) {
        setNombreInvitado(
          decodedName
        );
      }

      if (
        !Number.isNaN(
          decodedPasses
        ) &&
        decodedPasses > 0
      ) {
        setPasesAsignados(
          decodedPasses
        );

        setInvitados(
          decodedPasses
        );
      }

      setDatosDesdeGenerador(
        Boolean(decodedName)
      );

      setUrlError("");
    } catch (decodeError) {
      console.error(
        "No se pudieron leer los datos del enlace:",
        decodeError
      );

      setUrlError(
        "No pudimos reconocer los datos personalizados de esta invitación."
      );

      setDatosDesdeGenerador(
        false
      );
    }
  }, []);

  /* =========================================
     AJUSTAR INVITADOS
  ========================================= */

  useEffect(() => {
    if (
      asistencia ===
      "No podré asistir"
    ) {
      setInvitados(0);
      return;
    }

    if (
      asistencia ===
        "Sí asistiré" &&
      invitados < 1
    ) {
      setInvitados(1);
    }
  }, [
    asistencia,
    invitados,
  ]);

  const availablePasses =
    useMemo(() => {
      return Array.from(
        {
          length:
            pasesAsignados,
        },
        (_, index) =>
          index + 1
      );
    }, [pasesAsignados]);

  /* =========================================
     MENSAJE DE WHATSAPP
  ========================================= */

  const createWhatsAppMessage =
    (contacto) => {
      const verbo =
        esReconfirmacion
          ? "reconfirmar"
          : "confirmar";

      const attendanceText =
        asistencia ===
        "Sí asistiré"
          ? `Sí asistiré con ${invitados} ${
              invitados === 1
                ? "persona"
                : "personas"
            }.`
          : "Lamentablemente no podré asistir.";

      const optionalMessage =
        mensajeInvitado.trim()
          ? `\n\nMensaje: ${mensajeInvitado.trim()}`
          : "";

      return [
        `Hola ${contacto.nombre}.`,
        "",
        `Soy ${nombreInvitado.trim()}.`,
        `Quiero ${verbo} mi asistencia:`,
        attendanceText,
        optionalMessage,
        "",
        "Gracias por la invitación.",
      ]
        .join("\n")
        .replace(
          /\n{3,}/g,
          "\n\n"
        );
    };

  /* =========================================
     ABRIR WHATSAPP
  ========================================= */

  const openWhatsApp =
    (contacto) => {
      const message =
        createWhatsAppMessage(
          contacto
        );

      const whatsappUrl =
        `https://wa.me/${contacto.numero}?text=${encodeURIComponent(
          message
        )}`;

      window.location.href =
        whatsappUrl;
    };

  /* =========================================
     ENVIAR A EXCEL
  ========================================= */

  const enviarConfirmacion =
    async (contacto) => {
      if (loading) {
        return;
      }

      if (
        !nombreInvitado.trim()
      ) {
        setError(
          "Escribe el nombre del invitado."
        );

        return;
      }

      if (!asistencia) {
        setError(
          "Selecciona si podrás acompañarnos."
        );

        return;
      }

      if (
        asistencia ===
          "Sí asistiré" &&
        (
          invitados < 1 ||
          invitados >
            pasesAsignados
        )
      ) {
        setError(
          `Puedes confirmar entre 1 y ${pasesAsignados} ${
            pasesAsignados === 1
              ? "lugar"
              : "lugares"
          }.`
        );

        return;
      }

      setError("");
      setEnviado(false);
      setLoading(true);

      const confirmationData = {
        /*
          Este campo permite que Apps Script
          reconozca de qué página viene.
        */

        tipo:
          esReconfirmacion
            ? "reconfirmacion"
            : "confirmacion",

        nombre:
          nombreInvitado.trim(),

        asistencia,

        invitados:
          asistencia ===
          "Sí asistiré"
            ? invitados
            : 0,

        pasesAsignados,

        mensaje:
          mensajeInvitado.trim(),

        lado:
          contacto.lado,
      };

      try {
        await fetch(
          API_URL,
          {
            method: "POST",
            mode: "no-cors",

            body:
              JSON.stringify(
                confirmationData
              ),
          }
        );

        setEnviado(true);

        window.setTimeout(
          () => {
            openWhatsApp(
              contacto
            );
          },
          650
        );
      } catch (
        requestError
      ) {
        console.error(
          "Error enviando la información:",
          requestError
        );

        setError(
          esReconfirmacion
            ? "No pudimos enviar tu reconfirmación. Intenta nuevamente."
            : "No pudimos enviar tu confirmación. Intenta nuevamente."
        );

        setLoading(false);
      }
    };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <motion.section
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
        amount: 0.08,
      }}
      transition={{
        duration: 0.9,
      }}
      className="
        relative
        flex
        min-h-screen
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
      {/* LUZ SUPERIOR */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-250px]
          h-[520px]
          w-[520px]
          -translate-x-1/2
          rounded-full
          blur-3xl

          sm:h-[700px]
          sm:w-[700px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(156,203,240,0.16) 0%, transparent 70%)",
        }}
      />

      {/* TEXTURA */}

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
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 6px
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
          lg:inset-10
        "
        style={{
          borderColor:
            "rgba(255,255,255,0.22)",
        }}
      />

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
            "rgba(156,203,240,0.13)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* ENCABEZADO */}

        <motion.div
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
          }}
          className="
            mx-auto
            mb-12
            flex
            max-w-3xl
            flex-col
            items-center
            text-center

            sm:mb-16
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              text-white
            "
            style={{
              borderColor:
                "rgba(156,203,240,0.48)",
            }}
          >
            <EnvelopeIcon />
          </div>

          <p
            className="
              mt-7
              text-[8px]
              uppercase
              tracking-[0.44em]
              text-white/65

              sm:text-[10px]
              sm:tracking-[0.55em]
            "
          >
            {textos.etiqueta}
          </p>

          <div className="mt-5">
            <DecorativeDivider />
          </div>

          <h2
            className="
              mt-7
              font-serif
              text-[39px]
              font-normal
              leading-tight
              tracking-[-0.025em]
              text-white

              sm:text-[54px]
              md:text-[64px]
            "
          >
            {textos.titulo}
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              font-serif
              text-[20px]
              italic
              leading-7
              text-white/70

              sm:text-2xl
              px-2
            "
          >
            {textos.descripcion}
          </p>
        </motion.div>

        {/* FORMULARIO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 22,
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
            duration: 0.95,
            delay: 0.12,
          }}
          className="
            relative
            mx-auto
            w-full
            max-w-3xl
            border
            px-6
            py-12

            sm:px-10
            sm:py-14
            md:px-14
          "
          style={{
            backgroundColor:
              "rgba(255,255,255,0.045)",

            borderColor:
              "rgba(255,255,255,0.23)",

            boxShadow:
              "0 28px 75px rgba(0,0,0,0.18)",
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
                "rgba(156,203,240,0.12)",
            }}
          />

          <div className="relative z-10">
            {/* NOMBRE */}

            <div>
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor={`confirmation-name-${modo}`}
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.34em]
                    text-white/70

                    sm:text-[9px]
                  "
                >
                  Nombre del invitado
                </label>

                {datosDesdeGenerador && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[7px]
                      uppercase
                      tracking-[0.22em]
                      text-white/50

                      sm:text-[8px]
                    "
                  >
                    <LockIcon />
                    Invitación personalizada
                  </span>
                )}
              </div>

              <input
                id={`confirmation-name-${modo}`}
                type="text"
                value={nombreInvitado}
                onChange={(
                  event
                ) => {
                  if (
                    !datosDesdeGenerador
                  ) {
                    setNombreInvitado(
                      event.target.value
                    );
                  }
                }}
                readOnly={
                  datosDesdeGenerador
                }
                placeholder="Nombre y apellido"
                autoComplete="name"
                className="
                  mt-4
                  w-full
                  border
                  px-5
                  py-4
                  font-serif
                  text-base
                  text-white
                  outline-none
                  placeholder:text-white/35

                  sm:text-lg
                "
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.06)",

                  borderColor:
                    "rgba(255,255,255,0.22)",

                  cursor:
                    datosDesdeGenerador
                      ? "not-allowed"
                      : "text",
                }}
              />

              <AnimatePresence>
                {urlError && (
                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-3 text-sm text-[#FFD3D3]"
                  >
                    {urlError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* ASISTENCIA */}

            <div className="mt-8">
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.34em]
                  text-white/70

                  sm:text-[9px]
                "
              >
                ¿Podrás acompañarnos?
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <AttendanceOption
                  value="Sí asistiré"
                  selectedValue={
                    asistencia
                  }
                  onChange={
                    setAsistencia
                  }
                  title="Sí, asistiré"
                  description={
                    esReconfirmacion
                      ? "Confirmo nuevamente mi asistencia."
                      : "Será un gusto acompañarlos."
                  }
                />

                <AttendanceOption
                  value="No podré asistir"
                  selectedValue={
                    asistencia
                  }
                  onChange={
                    setAsistencia
                  }
                  title="No podré asistir"
                  description="Gracias por tomarme en cuenta."
                />
              </div>
            </div>

            {/* INVITADOS */}

            {asistencia ===
              "Sí asistiré" && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                className="mt-8"
              >
                <label
                  htmlFor={`guest-count-${modo}`}
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.34em]
                    text-white/70

                    sm:text-[9px]
                  "
                >
                  Número de asistentes
                </label>

                <select
                  id={`guest-count-${modo}`}
                  value={invitados}
                  onChange={(
                    event
                  ) =>
                    setInvitados(
                      Number.parseInt(
                        event.target
                          .value,
                        10
                      )
                    )
                  }
                  className="
                    mt-4
                    w-full
                    border
                    px-5
                    py-4
                    font-serif
                    text-base
                    text-white
                    outline-none
                  "
                  style={{
                    backgroundColor:
                      palette.navyDark,

                    borderColor:
                      "rgba(255,255,255,0.22)",
                  }}
                >
                  {availablePasses.map(
                    (
                      number
                    ) => (
                      <option
                        key={
                          number
                        }
                        value={
                          number
                        }
                      >
                        {number}{" "}
                        {number ===
                        1
                          ? "persona"
                          : "personas"}
                      </option>
                    )
                  )}
                </select>

                <p className="mt-3 text-xs leading-5 text-white/50">
                  Esta invitación tiene{" "}
                  {pasesAsignados}{" "}
                  {pasesAsignados ===
                  1
                    ? "lugar asignado"
                    : "lugares asignados"}
                  .
                </p>
              </motion.div>
            )}

            {/* MENSAJE */}

            <div className="mt-8">
              <label
                htmlFor={`guest-message-${modo}`}
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.34em]
                  text-white/70

                  sm:text-[9px]
                "
              >
                Mensaje para los novios
                <span className="ml-2 normal-case tracking-normal text-white/40">
                  (opcional)
                </span>
              </label>

              <textarea
                id={`guest-message-${modo}`}
                value={
                  mensajeInvitado
                }
                onChange={(
                  event
                ) =>
                  setMensajeInvitado(
                    event.target.value
                  )
                }
                rows={4}
                placeholder="Escribe un mensaje especial..."
                className="
                  mt-4
                  w-full
                  resize-y
                  border
                  px-5
                  py-4
                  font-serif
                  text-base
                  leading-7
                  text-white
                  outline-none
                  placeholder:text-white/30
                "
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.06)",

                  borderColor:
                    "rgba(255,255,255,0.22)",
                }}
              />
            </div>

            {/* MENSAJES */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="
                    mt-6
                    border
                    px-4
                    py-3
                    text-sm
                  "
                  style={{
                    color:
                      palette.error,

                    borderColor:
                      "rgba(255,211,211,0.35)",

                    backgroundColor:
                      "rgba(255,211,211,0.07)",
                  }}
                >
                  {error}
                </motion.div>
              )}

              {enviado && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-6
                    flex
                    items-center
                    justify-center
                    gap-2
                    border
                    px-4
                    py-3
                    text-sm
                  "
                  style={{
                    color:
                      palette.success,

                    borderColor:
                      "rgba(216,245,223,0.35)",

                    backgroundColor:
                      "rgba(216,245,223,0.07)",
                  }}
                >
                  <CheckIcon />

                  {esReconfirmacion
                    ? "Reconfirmación registrada. Abriendo WhatsApp..."
                    : "Confirmación registrada. Abriendo WhatsApp..."}
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOTONES */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  enviarConfirmacion(
                    CONTACTOS_WHATSAPP.novio
                  )
                }
                className="
                  flex
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-3
                  border
                  px-5
                  py-4
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition
                  hover:brightness-110
                  disabled:cursor-not-allowed
                  disabled:opacity-55

                  sm:text-[10px]
                "
                style={{
                  backgroundColor:
                    palette.royal,

                  borderColor:
                    palette.sky,
                }}
              >
                <WhatsAppIcon />

                {loading
                  ? "Guardando..."
                  : textos.botonNovio}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  enviarConfirmacion(
                    CONTACTOS_WHATSAPP.novia
                  )
                }
                className="
                  flex
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-3
                  border
                  px-5
                  py-4
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition
                  hover:brightness-110
                  disabled:cursor-not-allowed
                  disabled:opacity-55

                  sm:text-[10px]
                "
                style={{
                  backgroundColor:
                    palette.navyLight ??
                    "#183B6B",

                  borderColor:
                    palette.sky,
                }}
              >
                <WhatsAppIcon />

                {loading
                  ? "Guardando..."
                  : textos.botonNovia}
              </button>
            </div>

            <p className="mt-6 text-center text-[10px] leading-5 text-white/45">
              Al seleccionar un botón, tu respuesta
              se guardará y después se abrirá
              WhatsApp.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
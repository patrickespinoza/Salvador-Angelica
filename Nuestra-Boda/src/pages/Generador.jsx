import { useState } from "react";

const palette = {
  ink: "#102A52",
  inkSoft: "#183B6B",
  paper: "#D9EBF8",
  paperLight: "#FFFFFF",
  paperDark: "#9CCBF0",
  royal: "#184EA6",
  warmGray: "#4B5563",
};

/* =========================================
   CREAR BASE64 COMPATIBLE CON ACENTOS
========================================= */

function encodeBase64Utf8(value) {
  const bytes =
    new TextEncoder().encode(
      value
    );

  let binary = "";

  bytes.forEach((byte) => {
    binary +=
      String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

/* =========================================
   COMPONENTE PARA MOSTRAR CADA ENLACE
========================================= */

function ResultadoEnlace({
  titulo,
  descripcion,
  link,
  mensaje,
  setMensaje,
  tipo,
  copiado,
  copiarLink,
  copiarMensaje,
}) {
  return (
    <section
      className="
        border
        bg-white/75
        p-5
        shadow-[0_16px_45px_rgba(16,42,82,0.07)]

        sm:p-7
      "
      style={{
        borderColor:
          "rgba(24,78,166,0.27)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
            "
            style={{
              color:
                palette.royal,
            }}
          >
            {tipo ===
            "reconfirmacion"
              ? "Segundo envío"
              : "Primer envío"}
          </p>

          <h3
            className="
              mt-2
              font-serif
              text-2xl
            "
            style={{
              color:
                palette.ink,
            }}
          >
            {titulo}
          </h3>

          <p
            className="
              mt-2
              text-xs
              leading-5
            "
            style={{
              color:
                palette.warmGray,
            }}
          >
            {descripcion}
          </p>
        </div>

        <span
          className="
            shrink-0
            border
            px-3
            py-2
            text-[8px]
            uppercase
            tracking-[0.18em]
          "
          style={{
            borderColor:
              "rgba(24,78,166,0.35)",

            color:
              palette.ink,
          }}
        >
          {tipo ===
          "reconfirmacion"
            ? "Reconfirmación"
            : "Invitación"}
        </span>
      </div>

      {/* LINK */}

      <div className="mt-6">
        <p
          className="
            mb-2
            text-[8px]
            uppercase
            tracking-[0.25em]
          "
          style={{
            color:
              palette.warmGray,
          }}
        >
          Enlace personalizado
        </p>

        <div
          className="
            break-all
            border
            p-4
            text-xs
            leading-5
          "
          style={{
            backgroundColor:
              palette.paper,

            borderColor:
              "rgba(24,78,166,0.3)",

            color:
              palette.inkSoft,
          }}
        >
          {link}
        </div>

        <button
          type="button"
          onClick={() =>
            copiarLink(
              tipo,
              link
            )
          }
          className="
            mt-3
            w-full
            border
            px-5
            py-3
            text-[9px]
            uppercase
            tracking-[0.23em]
            transition
            hover:bg-black/5
          "
          style={{
            borderColor:
              "rgba(16,42,82,0.4)",

            color:
              palette.ink,
          }}
        >
          {copiado ===
          `link-${tipo}`
            ? "Enlace copiado ✓"
            : "Copiar enlace"}
        </button>
      </div>

      {/* MENSAJE */}

      <div
        className="
          mt-7
          border-t
          pt-6
        "
        style={{
          borderColor:
            "rgba(24,78,166,0.25)",
        }}
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.25em]
          "
          style={{
            color:
              palette.warmGray,
          }}
        >
          Mensaje para WhatsApp
        </p>

        <p
          className="
            mt-2
            text-xs
            leading-5
          "
          style={{
            color:
              palette.warmGray,
          }}
        >
          Puedes editarlo antes de copiar.
        </p>

        <textarea
          value={mensaje}
          onChange={(event) =>
            setMensaje(
              event.target.value
            )
          }
          rows={13}
          className="
            mt-4
            w-full
            resize-y
            border
            bg-white
            p-4
            text-sm
            leading-6
            outline-none
          "
          style={{
            borderColor:
              "rgba(24,78,166,0.35)",

            color:
              palette.ink,
          }}
        />

        <button
          type="button"
          onClick={() =>
            copiarMensaje(
              tipo,
              mensaje
            )
          }
          className="
            mt-3
            w-full
            px-6
            py-4
            text-[9px]
            uppercase
            tracking-[0.23em]
            text-white
            transition
            hover:opacity-90
          "
          style={{
            backgroundColor:
              tipo ===
              "reconfirmacion"
                ? palette.royal
                : palette.ink,
          }}
        >
          {copiado ===
          `mensaje-${tipo}`
            ? "Mensaje copiado ✓"
            : "Copiar mensaje para WhatsApp"}
        </button>
      </div>
    </section>
  );
}

/* =========================================
   GENERADOR
========================================= */

export default function Generador() {
  const [
    nombre,
    setNombre,
  ] = useState("");

  const [
    pases,
    setPases,
  ] = useState("1");

  const [
    linkInvitacion,
    setLinkInvitacion,
  ] = useState("");

  const [
    linkReconfirmacion,
    setLinkReconfirmacion,
  ] = useState("");

  const [
    mensajeInvitacion,
    setMensajeInvitacion,
  ] = useState("");

  const [
    mensajeReconfirmacion,
    setMensajeReconfirmacion,
  ] = useState("");

  const [
    copiado,
    setCopiado,
  ] = useState("");

  /* =========================================
     LIMPIAR RESULTADOS
  ========================================= */

  const limpiarResultados =
    () => {
      setLinkInvitacion("");
      setLinkReconfirmacion("");
      setMensajeInvitacion("");
      setMensajeReconfirmacion("");
      setCopiado("");
    };

  /* =========================================
     CREAR ID PERSONALIZADO
  ========================================= */

  const crearId = (
    nombreInvitado,
    numeroPases
  ) => {
    const datos = {
      nombre:
        nombreInvitado,

      pases:
        numeroPases,
    };

    const textoOriginal =
      JSON.stringify(datos);

    const textoInvertido =
      textoOriginal
        .split("")
        .reverse()
        .join("");

    const base64 =
      encodeBase64Utf8(
        textoInvertido
      );

    return base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  };

  /* =========================================
     GENERAR LOS DOS ENLACES
  ========================================= */

  const generarEnlaces =
    () => {
      const nombreLimpio =
        nombre
          .trim()
          .replace(/\s+/g, " ");

      const numeroPases =
        Number.parseInt(
          pases,
          10
        );

      if (!nombreLimpio) {
        window.alert(
          "Escribe el nombre del invitado o familia."
        );

        return;
      }

      if (
        Number.isNaN(
          numeroPases
        ) ||
        numeroPases < 1
      ) {
        window.alert(
          "Ingresa un número válido de lugares."
        );

        return;
      }

      const id =
        crearId(
          nombreLimpio,
          numeroPases
        );

      const origen =
        window.location.origin;

      const invitationUrl =
        `${origen}/?id=${encodeURIComponent(
          id
        )}`;

      const reconfirmationUrl =
        `${origen}/reconfirmacion?id=${encodeURIComponent(
          id
        )}`;

      setLinkInvitacion(
        invitationUrl
      );

      setLinkReconfirmacion(
        reconfirmationUrl
      );

      const textoPases =
        numeroPases === 1
          ? "1 lugar"
          : `${numeroPases} lugares`;

      /* MENSAJE DE INVITACIÓN */

      const invitationMessage =
`✨ Invitación especial ✨

Hola ${nombreLimpio} 🤍

Con mucha alegría queremos compartir contigo nuestra invitación de boda.

Hemos reservado especialmente para ti:
🎟️ ${textoPases}

Puedes consultar todos los detalles de nuestra celebración en el siguiente enlace:

${invitationUrl}

Será un gusto compartir este momento tan especial contigo.

Salvador & Angélica 🤍`;

      /* MENSAJE DE RECONFIRMACIÓN */

      const reconfirmationMessage =
`✨ Reconfirmación de asistencia ✨

Hola ${nombreLimpio} 🤍

Nuestro gran día está cada vez más cerca y queremos confirmar nuevamente que podremos contar contigo.

Hemos reservado para ti:
🎟️ ${textoPases}

Por favor, reconfirma tu asistencia antes del 15 de octubre en el siguiente enlace:

${reconfirmationUrl}

Muchas gracias por ayudarnos con la organización de este día tan especial.

Salvador & Angélica 🤍`;

      setMensajeInvitacion(
        invitationMessage
      );

      setMensajeReconfirmacion(
        reconfirmationMessage
      );

      setCopiado("");
    };

  /* =========================================
     COPIAR
  ========================================= */

  const copiarTexto =
    async (
      identificador,
      texto
    ) => {
      if (!texto) {
        return;
      }

      try {
        await navigator.clipboard.writeText(
          texto
        );

        setCopiado(
          identificador
        );

        window.setTimeout(
          () => {
            setCopiado("");
          },
          2000
        );
      } catch (error) {
        console.error(
          "No se pudo copiar:",
          error
        );

        window.alert(
          "No se pudo copiar automáticamente."
        );
      }
    };

  const copiarLink =
    (tipo, link) => {
      copiarTexto(
        `link-${tipo}`,
        link
      );
    };

  const copiarMensaje =
    (tipo, mensaje) => {
      copiarTexto(
        `mensaje-${tipo}`,
        mensaje
      );
    };

  const hayResultados =
    Boolean(
      linkInvitacion &&
        linkReconfirmacion
    );

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main
      className="
        min-h-screen
        w-full
        px-4
        py-8

        sm:px-6
        sm:py-12
        lg:px-10
      "
      style={{
        backgroundColor:
          palette.paperLight,

        color:
          palette.ink,

        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(24,59,107,0.015) 0px,
            rgba(24,59,107,0.015) 1px,
            transparent 1px,
            transparent 5px
          )
        `,
      }}
    >
      {/* ENCABEZADO */}

      <header
        className="
          mx-auto
          mb-10
          max-w-6xl
          text-center
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.4em]

            sm:text-[10px]
          "
          style={{
            color:
              palette.royal,
          }}
        >
          Salvador & Angélica
        </p>

        <h1
          className="
            mt-4
            font-serif
            text-3xl
            font-normal

            sm:text-4xl
            lg:text-5xl
          "
        >
          Generador de invitaciones
        </h1>

        <div
          className="
            mx-auto
            mt-5
            h-px
            w-16
          "
          style={{
            backgroundColor:
              "rgba(24,78,166,0.65)",
          }}
        />

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            font-serif
            text-sm
            leading-6

            sm:text-base
          "
          style={{
            color:
              palette.warmGray,
          }}
        >
          Genera la invitación inicial y la
          reconfirmación con los mismos datos
          personalizados.
        </p>
      </header>

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-8

          lg:grid-cols-[380px_1fr]
          lg:items-start
          lg:gap-10
        "
      >
        {/* FORMULARIO */}

        <section
          className="
            border
            bg-white/80
            p-5
            shadow-[0_18px_50px_rgba(16,42,82,0.08)]

            sm:p-8
            lg:sticky
            lg:top-8
          "
          style={{
            borderColor:
              "rgba(24,78,166,0.28)",
          }}
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.32em]
            "
            style={{
              color:
                palette.royal,
            }}
          >
            Datos del invitado
          </p>

          <h2 className="mt-3 font-serif text-2xl">
            Crear enlaces
          </h2>

          {/* NOMBRE */}

          <div className="mt-7">
            <label
              htmlFor="guest-name"
              className="
                mb-2
                block
                text-[10px]
                uppercase
                tracking-[0.24em]
              "
              style={{
                color:
                  palette.warmGray,
              }}
            >
              Nombre o familia
            </label>

            <input
              id="guest-name"
              type="text"
              placeholder="Ej. Familia Hernández"
              value={nombre}
              onChange={(event) => {
                setNombre(
                  event.target.value
                );

                limpiarResultados();
              }}
              className="
                w-full
                border
                bg-white
                px-4
                py-3.5
                font-serif
                text-base
                outline-none
                placeholder:text-gray-400
              "
              style={{
                borderColor:
                  "rgba(24,78,166,0.4)",
              }}
            />
          </div>

          {/* PASES */}

          <div className="mt-5">
            <label
              htmlFor="guest-passes"
              className="
                mb-2
                block
                text-[10px]
                uppercase
                tracking-[0.24em]
              "
              style={{
                color:
                  palette.warmGray,
              }}
            >
              Número de lugares
            </label>

            <input
              id="guest-passes"
              type="number"
              min="1"
              inputMode="numeric"
              value={pases}
              onChange={(event) => {
                setPases(
                  event.target.value
                );

                limpiarResultados();
              }}
              className="
                w-full
                border
                bg-white
                px-4
                py-3.5
                font-serif
                text-base
                outline-none
              "
              style={{
                borderColor:
                  "rgba(24,78,166,0.4)",
              }}
            />
          </div>

          {/* GENERAR */}

          <button
            type="button"
            onClick={
              generarEnlaces
            }
            className="
              mt-7
              w-full
              px-6
              py-4
              text-[10px]
              uppercase
              tracking-[0.26em]
              text-white
              transition
              hover:opacity-90
              active:scale-[0.99]
            "
            style={{
              backgroundColor:
                palette.ink,
            }}
          >
            Generar ambos enlaces
          </button>

          {hayResultados && (
            <div
              className="
                mt-7
                border
                p-4
              "
              style={{
                backgroundColor:
                  "rgba(217,235,248,0.45)",

                borderColor:
                  "rgba(24,78,166,0.25)",
              }}
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.23em]
                "
                style={{
                  color:
                    palette.royal,
                }}
              >
                Enlaces creados
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                "
                style={{
                  color:
                    palette.warmGray,
                }}
              >
                Envía primero la invitación.
                Cuando llegue el momento,
                utiliza el enlace de
                reconfirmación.
              </p>
            </div>
          )}

          {/* IMAGEN */}

          <div
            className="
              mt-8
              overflow-hidden
              border
              bg-white
              p-2
            "
            style={{
              borderColor:
                "rgba(24,78,166,0.28)",
            }}
          >
            <img
              src="/portada.JPG"
              alt="Salvador y Angélica"
              className="
                block
                h-auto
                w-full
                object-contain
              "
            />
          </div>
        </section>

        {/* RESULTADOS */}

        <div>
          {!hayResultados && (
            <section
              className="
                flex
                min-h-[420px]
                items-center
                justify-center
                border
                px-6
                text-center
              "
              style={{
                backgroundColor:
                  "rgba(217,235,248,0.25)",

                borderColor:
                  "rgba(24,78,166,0.23)",
              }}
            >
              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                  "
                  style={{
                    color:
                      palette.royal,
                  }}
                >
                  Enlaces personalizados
                </p>

                <h2 className="mt-4 font-serif text-3xl">
                  Agrega los datos del invitado
                </h2>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-md
                    text-sm
                    leading-6
                  "
                  style={{
                    color:
                      palette.warmGray,
                  }}
                >
                  Aquí aparecerán la invitación
                  original y la reconfirmación.
                </p>
              </div>
            </section>
          )}

          {hayResultados && (
            <div
              className="
                grid
                gap-7

                xl:grid-cols-2
              "
            >
              <ResultadoEnlace
                titulo="Invitación original"
                descripcion="Este enlace muestra la invitación completa."
                link={
                  linkInvitacion
                }
                mensaje={
                  mensajeInvitacion
                }
                setMensaje={
                  setMensajeInvitacion
                }
                tipo="invitacion"
                copiado={copiado}
                copiarLink={
                  copiarLink
                }
                copiarMensaje={
                  copiarMensaje
                }
              />

              <ResultadoEnlace
                titulo="Reconfirmación"
                descripcion="Este enlace muestra solamente la portada y el formulario de reconfirmación."
                link={
                  linkReconfirmacion
                }
                mensaje={
                  mensajeReconfirmacion
                }
                setMensaje={
                  setMensajeReconfirmacion
                }
                tipo="reconfirmacion"
                copiado={copiado}
                copiarLink={
                  copiarLink
                }
                copiarMensaje={
                  copiarMensaje
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
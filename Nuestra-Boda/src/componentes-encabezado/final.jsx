import { motion } from "framer-motion";

const ImagenFinal = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Imagen de fondo */}
      <img
        src="/final.JPG"
        alt="Salvador y Angélica"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          // Cambia estos porcentajes para mover la imagen
          objectPosition: "50% 50%",
        }}
      />

      {/* Oscurecimiento sutil */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Iniciales en la parte inferior */}
      <div
        className="absolute inset-x-0 z-10 flex justify-center px-4"
        style={{
          // Cambia este valor para subir o bajar las letras
          bottom: "30px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="font-serif text-7xl font-light tracking-[0.15em] text-white drop-shadow-lg sm:text-8xl md:text-9xl"
        >
          S <span className="mx-1 italic">&</span> A
        </motion.h2>
      </div>
    </section>
  );
};

export default ImagenFinal;
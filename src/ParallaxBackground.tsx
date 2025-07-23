import { useViewportScroll, useTransform, motion } from "framer-motion";

export default function ParallaxBackground() {
  const { scrollY } = useViewportScroll();

  // Mouvement subtil pour parallax
  const yClouds = useTransform(scrollY, [0, 2000], [0, 100]);
  const yMist = useTransform(scrollY, [0, 2000], [0, 180]);
  const ySun = useTransform(scrollY, [0, 2000], [0, 60]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dégradé de ciel profond (bleu nuit vers bleu ciel, style Ghibli) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0e1d35 0%, #3b82f6 75%, #e0f2fe 100%)",
          opacity: 1,
        }}
      />

      {/* Brume dorée en diagonale (levée de soleil) */}
      <motion.div
        style={{
          y: yMist,
          opacity: 0.23,
        }}
        className="absolute left-[-10vw] top-[40vh] w-[120vw] h-[40vh]"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 55% 45%, #ffe45a 40%, transparent 100%)",
            filter: "blur(38px)",
          }}
        />
      </motion.div>

      {/* Grosse lueur blanche, effet brume/soleil */}
      <motion.div
        style={{
          y: ySun,
          opacity: 0.10,
        }}
        className="absolute left-[-10vw] top-[55vh] w-[100vw] h-[28vh]"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 60% 20%, #fff 65%, transparent 100%)",
            filter: "blur(44px)",
          }}
        />
      </motion.div>

      {/* Nuages/flocons blancs flous, version Ghibli */}
      <motion.div
        style={{
          x: yClouds,
          opacity: 0.16,
        }}
        className="absolute left-[6vw] top-[13vh] w-[60vw] h-[15vh]"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, #fff 80%, transparent 100%)",
            filter: "blur(48px)",
          }}
        />
      </motion.div>
      <motion.div
        style={{
          x: yClouds,
          opacity: 0.11,
        }}
        className="absolute right-[10vw] top-[34vh] w-[30vw] h-[10vh]"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, #fff 80%, transparent 100%)",
            filter: "blur(44px)",
          }}
        />
      </motion.div>
    </div>
  );
}

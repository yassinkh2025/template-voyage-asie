import { motion } from "framer-motion";

// Les mots-clés qui vont tourner autour du titre (modifie-les si tu veux)
const words = [
  "Zen",
  "Aventure",
  "Nature",
  "Traditions",
  "Rencontre",
  "Découverte",
  "Immersion",
  "Voyage",
  "Sérénité",
  "Saveurs"
];

const container = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const item = {
  initial: { opacity: 0, y: -40, scale: 0.6 },
  animate: (i: number) => ({
    opacity: 1,
    y: [
      -40,
      Math.random() * 8 - 4, // petit flottement vertical
      8,
      -40
    ],
    scale: [
      0.6,
      1,
      0.8 + Math.random() * 0.2,
      0.6
    ],
    x: [
      Math.sin((i / words.length) * Math.PI * 2) * 120,
      Math.sin((i / words.length) * Math.PI * 2) * 100 + Math.random() * 6 - 3,
      Math.sin((i / words.length) * Math.PI * 2) * 130,
      Math.sin((i / words.length) * Math.PI * 2) * 120
    ],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  })
};

export default function AnimatedWordsTrail() {
  return (
    <motion.div
      className="absolute left-1/2 top-[34%] z-30 pointer-events-none select-none"
      style={{
        transform: "translate(-50%, -60%)",
        width: 340,
        height: 240,
        maxWidth: "90vw"
      }}
      variants={container}
      animate="animate"
      initial={false}
      aria-hidden="true"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={item}
          initial="initial"
          animate="animate"
          className="absolute font-bold text-lg sm:text-2xl tracking-wide text-blue-100 drop-shadow-[0_1px_8px_#69f7] pointer-events-none select-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            filter: `blur(0.5px) drop-shadow(0 0 10px #9ffcff88)`,
            opacity: 0.92
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

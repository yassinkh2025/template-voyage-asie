import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Mots et palette personnalisée
const WORDS = [
  { text: "Zen", color: "#a3e635" },          // Vert pastel
  { text: "Aventure", color: "#fbbf24" },     // Jaune doré
  { text: "Traditions", color: "#38bdf8" },   // Bleu clair
  { text: "Nature", color: "#4ade80" },       // Vert menthe
  { text: "Découverte", color: "#f472b6" },   // Rose sakura
  { text: "Éveil", color: "#f87171" },        // Rouge doux
  { text: "Spiritualité", color: "#818cf8" }, // Violet doux
  { text: "Cérémonie", color: "#fde68a" },    // Jaune pastel
  { text: "Sérénité", color: "#facc15" },     // Jaune intense
  { text: "Culture", color: "#fda4af" },      // Rose pastel
  { text: "Voyage", color: "#38bdf8" },       // Bleu clair
  { text: "Inspiration", color: "#34d399" },  // Turquoise
  { text: "Harmonie", color: "#e0e7ff" },     // Blanc bleuté
  { text: "Rencontre", color: "#fbbf24" },    // Jaune doré
  { text: "Exploration", color: "#a5b4fc" },  // Violet bleu
];

const POSITIONS = [
  { top: "4%", left: "17%" },
  { top: "13%", left: "70%" },
  { top: "60%", left: "13%" },
  { top: "65%", left: "78%" },
  { top: "23%", left: "45%" },
  { top: "85%", left: "35%" },
  { top: "41%", left: "80%" },
  { top: "77%", left: "59%" },
  { top: "30%", left: "8%" },
  { top: "82%", left: "81%" },
];

export default function AnimatedWordsTrail() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 3500);
    return () => clearInterval(interval);
  }, []);

  // Mélange à chaque cycle pour effet vivant
  const displayed = WORDS
    .map((w, i) => ({ ...w, pos: POSITIONS[i % POSITIONS.length] }))
    .sort(() => 0.5 - Math.random())
    .slice(0, 7);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20">
      {displayed.map(({ text, color, pos }, i) => (
        <motion.span
          key={text + cycle}
          initial={{
            opacity: 0,
            y: Math.random() * 40 - 20,
            x: Math.random() * 40 - 20,
            scale: 0.82 + Math.random() * 0.35,
            filter: "blur(2.5px)",
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            filter: [
              "blur(2.5px)",
              "blur(0.5px)",
              "blur(0.5px)",
              "blur(4px)",
            ],
            y: [null, Math.random() * 24 - 12],
            x: [null, Math.random() * 24 - 12],
            scale: [null, 1.06, 1.15, 1],
          }}
          transition={{
            duration: 3.5,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            color,
            fontWeight: 700,
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.1rem, 2vw, 2.25rem)",
            letterSpacing: "0.025em",
            textShadow:
              `
                0 4px 18px ${color}44,
                0 2px 8px #225d7c22,
                0 1px 2px #0007
              `,
            pointerEvents: "none",
            userSelect: "none",
            opacity: 0.91,
            zIndex: 22,
            whiteSpace: "nowrap",
            transition: "color 0.3s, text-shadow 0.3s",
            filter: "drop-shadow(0 2px 8px #fff2)",
          }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
}

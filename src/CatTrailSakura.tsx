import { motion } from "framer-motion";

// SVG simple pour une empreinte de chat (propre, stylisée)
const PawSVG = ({ style = {} }: { style?: React.CSSProperties }) => (
  <svg width="38" height="36" viewBox="0 0 38 36" fill="none" style={style}>
    <ellipse cx="19" cy="30" rx="10" ry="6" fill="#fff" fillOpacity="0.26" />
    <ellipse cx="7" cy="20" rx="4" ry="2.8" fill="#fff" fillOpacity="0.24" />
    <ellipse cx="31" cy="20" rx="4" ry="2.8" fill="#fff" fillOpacity="0.24" />
    <ellipse cx="13" cy="12" rx="2.2" ry="1.8" fill="#fff" fillOpacity="0.22" />
    <ellipse cx="25" cy="12" rx="2.2" ry="1.8" fill="#fff" fillOpacity="0.22" />
  </svg>
);

// SVG Sakura pétale, style doux
const SakuraSVG = ({ style = {} }: { style?: React.CSSProperties }) => (
  <svg width="30" height="32" viewBox="0 0 30 32" fill="none" style={style}>
    <path
      d="M15 2 Q17 10 24 12 Q28 14 21 18 Q27 22 20 25 Q17 28 15 24 Q13 28 10 25 Q3 22 9 18 Q2 14 6 12 Q13 10 15 2 Z"
      fill="#ffd6e6"
      stroke="#fff"
      strokeWidth="0.5"
      opacity="0.77"
    />
  </svg>
);

export default function CatTrailSakura() {
  // Tableau de positions pour pattes de chat (curve douce)
  const pawSteps = [
    { left: "20%", top: "60%", rot: -8 },
    { left: "30%", top: "53%", rot: 2 },
    { left: "38%", top: "46%", rot: 6 },
    { left: "47%", top: "38%", rot: -5 },
    { left: "57%", top: "31%", rot: 6 },
    { left: "66%", top: "24%", rot: -9 },
    { left: "76%", top: "16%", rot: 2 }
  ];

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-0">
      {/* Traces de pattes animées */}
      {pawSteps.map((step, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: step.left,
            top: step.top,
            rotate: `${step.rot}deg`
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.8] }}
          transition={{
            delay: i * 0.65,
            duration: 7.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        >
          <PawSVG />
        </motion.div>
      ))}

      {/* Pétales Sakura animés (3 au total) */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            left: `${20 + idx * 30}%`,
            top: "-8%",
            zIndex: 1
          }}
          initial={{ y: 0, opacity: 0, rotate: 0, scale: 0.75 + 0.1 * idx }}
          animate={{
            y: ["0%", "120%"],
            opacity: [0, 0.88, 0.65, 0],
            rotate: [0, 8 + 6 * idx, 24 + 9 * idx],
            scale: [0.77, 1.03, 0.96]
          }}
          transition={{
            duration: 11 + idx * 3,
            repeat: Infinity,
            delay: idx * 1.7,
            repeatDelay: 4.5 - idx,
            ease: "linear"
          }}
        >
          <SakuraSVG />
        </motion.div>
      ))}
    </div>
  );
}

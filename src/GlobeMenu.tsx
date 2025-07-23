import { useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { label: "Accueil", color: "#6EE7B7", anchor: "header" },
  { label: "Immersion", color: "#FBBF24", anchor: "immersion" },
  { label: "Aventure", color: "#60A5FA", anchor: "aventure" },
  { label: "Zen", color: "#A78BFA", anchor: "zen" },
  { label: "Contact", color: "#F472B6", anchor: "contact" },
  { label: "Avis", color: "#FDE68A", anchor: "testimonials" }, // avis clients
  { label: "FAQ", color: "#818CF8", anchor: "faq" }, // FAQ
];

export default function GlobeMenu() {
  const [active, setActive] = useState(0);

  const scrollToSection = (anchor: string, idx: number) => {
    setActive(idx);
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 select-none">
      <motion.div
        className="relative w-36 h-36 bg-white/10 rounded-full shadow-lg border-2 border-white/40 flex items-center justify-center"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 13 }}
      >
        {SECTIONS.map((s, idx) => {
          const angle = (idx / SECTIONS.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 72;
          const x = radius * Math.cos(angle) + 72 - 16;
          const y = radius * Math.sin(angle) + 72 - 16;
          return (
            <motion.button
              key={s.label}
              className={`absolute w-8 h-8 rounded-full shadow
                ${active === idx ? "ring-4 ring-white/70 scale-125 z-10" : ""}
              `}
              style={{
                left: x,
                top: y,
                background: s.color,
                border: "2px solid white",
              }}
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #fff" }}
              onClick={() => scrollToSection(s.anchor, idx)}
            >
              <span className="text-xs font-bold text-white drop-shadow">
                {s.label[0]}
              </span>
            </motion.button>
          );
        })}
        {/* Centre du globe */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-inner flex items-center justify-center font-extrabold text-xl text-yellow-900">
          🌏
        </div>
      </motion.div>
      <div className="mt-2 text-xs text-white/70 text-center font-semibold">Navigation</div>
    </div>
  );
}

import { useEffect, useState } from "react";

const words = [
  { text: "Zen", color: "#38bdf8" },
  { text: "Aventure", color: "#fbbf24" },
  { text: "Nature", color: "#34d399" },
  { text: "Traditions", color: "#a78bfa" },
  { text: "Rencontre", color: "#f472b6" },
  { text: "Découverte", color: "#60a5fa" },
  { text: "Immersion", color: "#facc15" },
  { text: "Voyage", color: "#f472b6" }
];

const NB_WORDS_VISIBLE = 7;
const DURATION = 1600;
const HEADER_HEIGHT = 340;
const SAFE_ZONE_TOP = 32;
const SAFE_ZONE_RIGHT = 230;

export default function AnimatedWordsTrail() {
  const [displayed, setDisplayed] = useState<{text: string; color: string; left: number; top: number; id: string}[]>([]);

  function getRandomWords() {
    const width = typeof window !== "undefined" ? window.innerWidth : 1440;
    let arr: {text: string; color: string; left: number; top: number; id: string}[] = [];
    let tries = 0;
    while (arr.length < NB_WORDS_VISIBLE && tries < 30) {
      const w = words[Math.floor(Math.random() * words.length)];
      let left = Math.random() * (width - SAFE_ZONE_RIGHT - 70) + 10;
      let top = Math.random() * (HEADER_HEIGHT - SAFE_ZONE_TOP) + SAFE_ZONE_TOP;
      // Évite trop près du centre-titre
      if ((left > width / 2 - 210 && left < width / 2 + 210 && top > 95 && top < 240)) {
        tries++; continue;
      }
      arr.push({ ...w, left, top, id: w.text + "-" + left + "-" + top + "-" + Math.random() });
      tries++;
    }
    return arr;
  }

  useEffect(() => {
    setDisplayed(getRandomWords());
    const intv = setInterval(() => {
      setDisplayed(getRandomWords());
    }, DURATION);
    return () => clearInterval(intv);
  }, []);

  return (
    <div
      className="words-trail-bg absolute left-0 top-0 w-full pointer-events-none select-none"
      style={{
        height: HEADER_HEIGHT,
        maxWidth: "100vw",
        zIndex: 0 // <-- le plus important pour rester en fond !
      }}
      aria-hidden="true"
    >
      {displayed.map(({text, color, left, top, id}) => (
        <span
          key={id}
          className="absolute font-extrabold text-[1.25rem] sm:text-2xl pointer-events-none select-none animate-bulle-manga"
          style={{
            left,
            top,
            color,
            whiteSpace: "nowrap",
            opacity: 0.85,
            filter: `blur(0.12px) drop-shadow(0 2px 12px #fff6)`,
            textShadow: `0 2px 14px #fff5, 0 0 4px ${color}60`
          }}
        >
          {text}
        </span>
      ))}
      <style>{`
        @keyframes bulle-manga {
          0% { opacity: 0; transform: scale(0.5) translateY(12px);}
          18% { opacity: 1; transform: scale(1.11) translateY(-4px);}
          36% { opacity: 1; transform: scale(1) translateY(0);}
          85% { opacity: 1;}
          100% { opacity: 0; transform: scale(1.15) translateY(-16px);}
        }
        .animate-bulle-manga {
          animation: bulle-manga ${DURATION}ms cubic-bezier(.8,.15,.61,1.13) both;
        }
      `}</style>
    </div>
  );
}

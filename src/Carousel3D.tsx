import { useState } from "react";
import { motion } from "framer-motion";

const cities = [
  {
    name: "Tokyo",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80",
    desc: "La capitale du Japon, mélange de tradition et de modernité.",
  },
  {
    name: "Séoul",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80",
    desc: "Ville ultra dynamique, cœur de la Corée du Sud.",
  },
  {
    name: "Bangkok",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=facearea&w=400&q=80",
    desc: "La porte de l’Asie du Sud-Est, vibrante et surprenante.",
  },
];

export default function Carousel3D() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + cities.length) % cities.length);
  const next = () => setActive((a) => (a + 1) % cities.length);

  // Angle de rotation pour chaque carte
  const getRotation = (idx: number) => {
    if (idx === active) return 0;
    if ((idx + 1) % cities.length === active) return -45; // left
    if ((idx - 1 + cities.length) % cities.length === active) return 45; // right
    return idx < active ? -90 : 90;
  };
  // Décalage horizontal pour effet de profondeur
  const getTranslate = (idx: number) => {
    if (idx === active) return 0;
    if ((idx + 1) % cities.length === active) return -160;
    if ((idx - 1 + cities.length) % cities.length === active) return 160;
    return idx < active ? -350 : 350;
  };
  // Scale plus petit pour côté
  const getScale = (idx: number) => (idx === active ? 1 : 0.83);

  return (
    <div className="relative w-full max-w-xl h-[340px] flex items-center justify-center mx-auto overflow-visible select-none" style={{ perspective: 1200 }}>
      {cities.map((city, idx) => (
        <motion.div
          key={city.name}
          animate={{
            x: getTranslate(idx),
            scale: getScale(idx),
            rotateY: getRotation(idx),
            zIndex: idx === active ? 10 : 0,
            filter: idx === active ? "brightness(1)" : "brightness(0.7) blur(1.5px)",
            opacity: Math.abs(idx - active) > 1 && Math.abs(idx - active) !== cities.length - 1 ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className={`absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer bg-white/10 border border-white/20 rounded-2xl overflow-hidden backdrop-blur flex flex-col items-center w-[260px] h-[340px]`}
          style={{
            cursor: idx === active ? "default" : "pointer",
            pointerEvents: idx === active ? "auto" : "auto",
          }}
          onClick={() => setActive(idx)}
        >
          <img
            src={city.img}
            alt={city.name}
            className="object-cover w-full h-[170px] rounded-t-2xl"
            draggable={false}
          />
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <h4 className="font-bold text-xl text-white drop-shadow mb-2">{city.name}</h4>
            <p className="text-base text-blue-100 text-center">{city.desc}</p>
          </div>
        </motion.div>
      ))}
      {/* Flèches */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/50 text-2xl rounded-full text-blue-200 z-20 backdrop-blur"
        aria-label="Ville précédente"
      >‹</button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/50 text-2xl rounded-full text-blue-200 z-20 backdrop-blur"
        aria-label="Ville suivante"
      >›</button>
    </div>
  );
}

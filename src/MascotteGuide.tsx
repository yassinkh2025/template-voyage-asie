import { useEffect, useState, useRef } from "react";
import { motion, useViewportScroll, useTransform, useMotionValue } from "framer-motion";

// Utilitaire pour détecter si la mascotte recouvre un bouton/élément interactif (mobile uniquement)
function isOverInteractiveElement(leftPx: number, topPx: number, catSize = 120): boolean {
  if (typeof window === "undefined" || window.innerWidth >= 640) return false;
  const elements = Array.from(document.querySelectorAll("button, a, .no-cat, .cta, .btn"));
  for (let elem of elements) {
    const rect = elem.getBoundingClientRect();
    if (
      leftPx + catSize > rect.left &&
      leftPx < rect.right &&
      topPx + catSize > rect.top &&
      topPx < rect.bottom
    ) {
      return true;
    }
  }
  return false;
}

// Convertit % (string) en px
function percentToPx(percent: string, axis: "x" | "y"): number {
  if (typeof window === "undefined") return 0;
  const size = axis === "x" ? window.innerWidth : window.innerHeight;
  return (parseFloat(percent) / 100) * size;
}

export default function MascotteGuide({ dark }: { dark: boolean }) {
  const { scrollYProgress } = useViewportScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  // Zigzag
  const left = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["85%", "10%", "85%", "10%", "85%", "10%"]
  );
  const top = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["10%", "30%", "50%", "65%", "80%", "80%"]
  );

  // Flip horizontal
  const prevX = useRef<number>(0);
  const scaleX = useMotionValue(1);
  left.onChange((val) => {
    const curr = parseFloat(val);
    if (curr > prevX.current) scaleX.set(-1);
    else if (curr < prevX.current) scaleX.set(1);
    prevX.current = curr;
  });

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => setIsScrolling(false), 220);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mode "dodo"
  const isSleep = dark && !isScrolling && !isHovered;
  let catGif = "/chat-assis.gif";
  if (isSleep) catGif = "/sleepcat.gif";
  else if (isHovered) catGif = "/chat-mascotte-special.gif";
  else if (isScrolling) catGif = "/chat-mascotte.gif";

  // === NOUVELLE LOGIQUE MOBILE : PENDANT SCROLL = visible partout, APRÈS scroll = mascotte MASQUÉE si elle gêne ===
  let hideCat = false;
  if (typeof window !== "undefined" && window.innerWidth < 640) {
    // Pendant le scroll : mascotte TOUJOURS visible
    if (!isScrolling) {
      // Après scroll : on cache la mascotte si elle est sur un bouton/élément
      const leftPx = percentToPx(left.get(), "x");
      const topPx = percentToPx(top.get(), "y");
      hideCat = isOverInteractiveElement(leftPx, topPx, 120);
    }
    // Sinon (isScrolling), hideCat = false => mascotte visible
  }

  return (
    !hideCat && (
      <motion.div
        style={{
          position: "fixed",
          left,
          top,
          zIndex: 50,
          pointerEvents: "auto"
        }}
        transition={{ type: "spring", stiffness: 90, damping: 13 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex items-center">
          {/* TRAÎNÉE LUMINEUSE */}
          {isScrolling && (
            <motion.div
              initial={{ opacity: 0.95, scale: 0.7 }}
              animate={{ opacity: 0, scale: 1.8 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "absolute",
                left: -36,
                top: 30,
                width: 90,
                height: 80,
                borderRadius: "50%",
                background: "radial-gradient(circle, #ffe45aee 45%, #fffbe7aa 80%, transparent 100%)",
                filter: "blur(12px)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          )}

          {/* IMAGE DU CHAT */}
          <motion.img
            src={catGif}
            alt="Chat mascotte"
            className="w-40 h-40 drop-shadow-lg"
            draggable={false}
            style={{
              scaleX,
              filter: isHovered
                ? "drop-shadow(0 0 32px #ffe45a) brightness(1.3) saturate(1.3)"
                : "none",
            }}
            animate={isHovered && !isSleep ? { y: [0, -30, 0] } : false}
            transition={{ duration: 0.5, repeat: isHovered && !isSleep ? Infinity : 0, repeatType: "reverse" }}
          />

          {/* BULLE : ZZZZZ toujours si dodo, sinon “Coucou !” */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 40 }}
              exit={{ opacity: 0 }}
              className="ml-2 bg-yellow-200 text-yellow-900 rounded-full px-4 py-2 text-sm font-semibold shadow-lg whitespace-nowrap"
              style={{
                position: "absolute",
                left: "100%",
                top: "45%",
                transform: "translateY(-50%)"
              }}
            >
              {isSleep
                ? "Z Z Z Z Z"
                : <>こんにちは！<br />(Coucou !)</>}
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  );
}

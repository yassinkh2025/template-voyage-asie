import { useEffect, useRef } from "react";

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveSpotlight = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `
          radial-gradient(ellipse 200px 200px at ${x}px ${y}px, 
            rgba(255, 239, 186, 0.22) 0%, 
            rgba(255, 229, 94, 0.11) 50%, 
            rgba(0,0,0,0) 100%)
        `;
      }
    };
    window.addEventListener("mousemove", moveSpotlight);
    return () => window.removeEventListener("mousemove", moveSpotlight);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{
        transition: "background 0.15s",
        mixBlendMode: "lighten",
      }}
    />
  );
}

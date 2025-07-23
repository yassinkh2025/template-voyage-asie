import MascotteGuide from "./MascotteGuide";
import GlobeMenu from "./GlobeMenu";
import Spotlight from "./Spotlight";
import ParallaxBackground from "./ParallaxBackground";
import CatTrailSakura from "./CatTrailSakura";
import Carousel3D from "./Carousel3D";
import AnimatedWordsTrail from "./AnimatedWordsTrail";

export default function App() {
  return (
    <div className="relative font-gloock bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-400 text-white min-h-screen transition-colors duration-500 overflow-x-hidden">
      {/* FOND PARALLAX */}
      <ParallaxBackground />
      {/* MASCOTTE, SPOTLIGHT, GLOBE */}
      <MascotteGuide dark={false} />
      <Spotlight />
      <GlobeMenu />

      {/* HERO */}
      <header
        id="header"
        className="relative h-screen min-h-[580px] flex flex-col items-center justify-center px-3 sm:px-6 text-center overflow-hidden z-10"
        aria-label="Section héros - introduction au voyage en Asie"
      >
        <CatTrailSakura />
        <AnimatedWordsTrail />
        <div className="relative z-10">
          <h1
            className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg glow-title-hero underline-animate"
            style={{ fontFamily: "'DM Serif Display', serif" }}
            tabIndex={0} // Permet la lecture au clavier/lecteur d’écran
          >
            Explorez l’Asie Authentique
          </h1>
          <p className="max-w-[95vw] sm:max-w-xl text-base sm:text-lg leading-relaxed underline-animate font-gloock mx-auto">
            Plongez au cœur de cultures millénaires, paysages époustouflants  
            et traditions vivantes.
          </p>
        </div>
      </header>

      {/* MINI-MAP ASIE (SVG) ANIMEE */}
      <section
        className="w-full flex flex-col items-center py-7 sm:py-10 px-2 sm:px-4 z-10 relative"
        aria-label="Carte interactive des destinations"
      >
        <h3
          className="text-lg sm:text-2xl font-bold text-yellow-300 mb-3 drop-shadow glow-title-immersion underline-animate"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Où commencera votre aventure&nbsp;?
        </h3>
        <div className="relative">
          <img
            src="/mini-map-asia.svg"
            alt="Carte stylisée de l'Asie avec points d'intérêt : Tokyo, Séoul, Hanoï, Bangkok"
            className="w-full max-w-[98vw] sm:max-w-md map-asia-animated"
            style={{
              border: "4px solid #fde68a80",
              boxShadow: "0 4px 32px #fde68a11",
              animation: "float-map 3.5s ease-in-out infinite alternate",
            }}
          />
          {/* HOTSPOTS - Ajoute aria-label sur chaque hotspot si besoin */}
          <span aria-label="Hotspot Tokyo" className="absolute left-[33%] top-[48%] w-3 h-3 rounded-full bg-yellow-300 shadow-2xl animate-pulse" />
          <span aria-label="Hotspot Séoul" className="absolute left-[55%] top-[41%] w-2.5 h-2.5 rounded-full bg-blue-300 shadow-2xl animate-ping" />
          <span aria-label="Hotspot Hanoï" className="absolute left-[45%] top-[52%] w-2.5 h-2.5 rounded-full bg-pink-300 shadow-2xl animate-ping" />
          <span aria-label="Hotspot Bangkok" className="absolute left-[58%] top-[63%] w-2.5 h-2.5 rounded-full bg-emerald-200 shadow-2xl animate-pulse" />
        </div>
        <style>{`
          @keyframes float-map {
            0%   { transform: translateY(0);}
            100% { transform: translateY(-10px);}
          }
        `}</style>
        <p className="italic text-yellow-100 mt-4 text-center max-w-xs sm:max-w-lg font-gloock">
          Découvrez les destinations emblématiques d’Asie : Tokyo, Séoul, Hanoï, Bangkok… <br />
          Chaque aventure débute ici.
        </p>
      </section>

      {/* IMMERSION + Carrousel3D */}
      <section
        id="immersion"
        className="h-auto min-h-[90vh] flex flex-col-reverse lg:flex-row items-center justify-center px-3 sm:px-8 py-10 sm:py-0 transition-colors duration-500 z-10 relative gap-8"
        aria-labelledby="immersion-title"
      >
        <div className="max-w-md ml-auto sm:text-right text-left w-full">
          <h2
            id="immersion-title"
            className="text-2xl sm:text-4xl font-bold mt-4 glow-title-immersion underline-animate"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Immersion Culturelle
          </h2>
          <p className="mt-2 text-base sm:text-lg leading-relaxed underline-animate font-gloock">
            Vivez des cérémonies ancestrales et partagez des moments authentiques  
            avec les communautés locales.
          </p>
          <p className="italic text-yellow-100 mt-1 text-sm sm:text-base underline-animate font-gloock">
            🌸 “Participez à une cérémonie du thé à Kyoto ou à la fête des lanternes à Hoi An.”
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Carousel3D aria-label="Carrousel d'immersions culturelles" />
        </div>
      </section>

      {/* AVENTURE + Carrousel3D */}
      <section
        id="aventure"
        className="h-auto min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-3 sm:px-8 py-10 sm:py-0 z-10 relative gap-8"
        aria-labelledby="aventure-title"
      >
        <div className="flex-1 flex items-center justify-center">
          <Carousel3D aria-label="Carrousel d'aventures nature" />
        </div>
        <div className="max-w-md mr-auto sm:text-left text-left w-full">
          <h2
            id="aventure-title"
            className="text-2xl sm:text-4xl font-bold mt-4 glow-title-aventure underline-animate"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Aventures Nature
          </h2>
          <p className="mt-2 text-base sm:text-lg leading-relaxed underline-animate font-gloock">
            Parcourez des rizières en terrasses, explorez des jungles luxuriantes  
            et observez une faune sauvage unique.
          </p>
          <p className="italic text-blue-100 mt-1 text-sm sm:text-base underline-animate font-gloock">
            🏞️ “Randonnez dans les montagnes du nord du Vietnam ou survolez les rizières de Bali en montgolfière.”
          </p>
        </div>
      </section>

      {/* BIEN-ETRE + Carrousel3D */}
      <section
        id="zen"
        className="h-auto min-h-[90vh] flex flex-col-reverse lg:flex-row items-center justify-center px-3 sm:px-8 py-10 sm:py-0 z-10 relative gap-8"
        aria-labelledby="zen-title"
      >
        <div className="max-w-md ml-auto sm:text-right text-left w-full">
          <h2
            id="zen-title"
            className="text-2xl sm:text-4xl font-bold mt-4 glow-title-zen underline-animate"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Bien-Être & Zen
          </h2>
          <p className="mt-2 text-base sm:text-lg leading-relaxed underline-animate font-gloock">
            Accordez-vous une pause relaxante dans des spas traditionnels  
            et des retraites de méditation.
          </p>
          <p className="italic text-purple-100 mt-1 text-sm sm:text-base underline-animate font-gloock">
            🧘 “Essayez la méditation zazen dans un monastère au Japon ou profitez d’un massage balinais à Ubud.”
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Carousel3D aria-label="Carrousel bien-être et zen" />
        </div>
      </section>

      {/* PREPAREZ VOTRE AVENTURE + Carrousel3D */}
      <section
        id="contact"
        className="h-auto min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-3 sm:px-8 py-10 sm:py-0 z-10 relative gap-8"
        aria-labelledby="contact-title"
      >
        <div className="flex-1 flex items-center justify-center">
          <Carousel3D aria-label="Carrousel contact préparatifs" />
        </div>
        <div className="max-w-md mr-auto sm:text-left text-left w-full">
          <h2
            id="contact-title"
            className="text-2xl sm:text-4xl font-bold mt-4 glow-title-contact underline-animate"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Préparez Votre Aventure
          </h2>
          <p className="mt-2 text-base sm:text-lg leading-relaxed underline-animate font-gloock">
            Contactez-nous pour créer ensemble un voyage sur mesure,  
            adapté à vos envies.
          </p>
          <p className="italic text-pink-100 mt-1 text-sm sm:text-base underline-animate font-gloock">
            📩 “Notre équipe sur place s’occupe de tout — vous n’avez plus qu’à rêver !”
          </p>
          <button
            className="mt-6 bg-emerald-400 hover:bg-emerald-500 transition px-6 py-3 rounded-full text-base sm:text-lg font-bold underline-animate font-gloock w-full sm:w-auto"
            aria-label="Demander un devis personnalisé"
          >
            Demander un devis
          </button>
        </div>
      </section>

      {/* SECTION AVIS CLIENTS */}
      <section
        id="testimonials"
        className="w-full py-10 sm:py-16 px-2 sm:px-4 flex flex-col items-center bg-gradient-to-br from-yellow-200/20 via-yellow-100/30 to-blue-100/20 z-10 relative"
        aria-label="Témoignages de nos voyageurs"
      >
        <h2
          className="text-xl sm:text-3xl font-extrabold mb-8 drop-shadow glow-title-testimonials underline-animate text-yellow-300"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Avis de nos voyageurs
        </h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full max-w-5xl">
          {/* AVIS 1 */}
          <div className="bg-white/10 backdrop-blur rounded-2xl shadow-lg p-5 sm:p-6 max-w-xs w-full border border-yellow-200/60">
            <div className="flex items-center gap-2 mb-2">
              <span aria-label="Avatar femme" className="text-2xl">👩‍🦰</span>
              <span className="font-bold text-base sm:text-lg text-yellow-300 font-gloock">Sophie, France</span>
            </div>
            <p className="italic text-white/90 font-gloock text-sm sm:text-base">
              “Un voyage inoubliable ! Les cérémonies et rencontres locales ont changé ma vision de l’Asie.”
            </p>
          </div>
          {/* AVIS 2 */}
          <div className="bg-white/10 backdrop-blur rounded-2xl shadow-lg p-5 sm:p-6 max-w-xs w-full border border-blue-200/60">
            <div className="flex items-center gap-2 mb-2">
              <span aria-label="Avatar homme" className="text-2xl">🧑‍🦱</span>
              <span className="font-bold text-base sm:text-lg text-blue-400 font-gloock">Hugo, Canada</span>
            </div>
            <p className="italic text-white/90 font-gloock text-sm sm:text-base">
              “Organisation parfaite ! J’ai adoré la diversité des activités et l’attention de l’équipe.”
            </p>
          </div>
          {/* AVIS 3 */}
          <div className="bg-white/10 backdrop-blur rounded-2xl shadow-lg p-5 sm:p-6 max-w-xs w-full border border-pink-200/60">
            <div className="flex items-center gap-2 mb-2">
              <span aria-label="Avatar homme" className="text-2xl">👨🏻‍🦲</span>
              <span className="font-bold text-base sm:text-lg text-pink-300 font-gloock">Kenji, Japon</span>
            </div>
            <p className="italic text-white/90 font-gloock text-sm sm:text-base">
              “Des moments zen inoubliables dans les temples… Un rêve devenu réalité !”
            </p>
          </div>
        </div>
      </section>

      {/* SECTION FAQ */}
      <section
        id="faq"
        className="w-full py-10 sm:py-14 px-2 sm:px-4 flex flex-col items-center bg-gradient-to-br from-pink-100/30 via-yellow-100/30 to-blue-100/20 z-10 relative"
        aria-label="Foire aux questions"
      >
        <h2
          className="text-xl sm:text-3xl font-extrabold mb-8 drop-shadow glow-title-faq underline-animate text-pink-300"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Foire aux questions (FAQ)
        </h2>
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <div className="bg-white/10 backdrop-blur rounded-xl shadow p-4 sm:p-5 border border-pink-200/40">
            <h3
              className="font-bold text-base sm:text-lg text-pink-300 mb-1 underline-animate"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Quels pays puis-je visiter ?
            </h3>
            <p className="text-white/90 font-gloock text-sm sm:text-base">
              Nous organisons des voyages dans tout l’Extrême-Orient : Japon, Vietnam, Thaïlande, Corée du Sud, Laos et bien d’autres !
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl shadow p-4 sm:p-5 border border-blue-200/40">
            <h3
              className="font-bold text-base sm:text-lg text-blue-400 mb-1 underline-animate"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Les séjours sont-ils adaptés aux familles ?
            </h3>
            <p className="text-white/90 font-gloock text-sm sm:text-base">
              Oui, nous proposons des expériences adaptées à tous les âges, avec des activités pour petits et grands.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl shadow p-4 sm:p-5 border border-yellow-200/40">
            <h3
              className="font-bold text-base sm:text-lg text-yellow-300 mb-1 underline-animate"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Faut-il un visa ou un vaccin particulier ?
            </h3>
            <p className="text-white/90 font-gloock text-sm sm:text-base">
              Nous vous accompagnons dans toutes les démarches administratives, selon la destination choisie.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="h-24 sm:h-32 flex items-center justify-center bg-gray-900 font-gloock text-xs sm:text-sm px-3 transition-colors duration-500 z-10 relative">
        <p className="text-yellow-300 font-bold"> 
          Un projet signé Sayath — Pour explorer, rêver et voyager différemment.
        </p>
      </footer>
    </div>
  );
}

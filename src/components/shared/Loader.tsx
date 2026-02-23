import { useEffect, useState } from "react";

export const Loader = () => {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    const phaseTimer = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearInterval(phaseTimer);
    };
  }, []);

  if (!show) return null;

  const loadingTexts = [
    "Cargando experiencia...",
    "Preparando partidos...",
    "¡Casi listo!",
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a1a] flex flex-col items-center justify-center font-['Outfit',system-ui,sans-serif]">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0047AB] via-[#0a0a1a] to-[#000080] opacity-30"></div>

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0047AB] rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#3B82F6] rounded-full filter blur-[80px] opacity-20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#60A5FA] rounded-full filter blur-[60px] opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container */}
        <div className="relative mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-[#1E40AF] animate-ping opacity-30"></div>

          {/* Rotating border */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-[#3B82F6] animate-spin"></div>

          {/* Inner circle */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0047AB] to-[#1E40AF] flex items-center justify-center shadow-[0_0_30px_rgba(0,71,171,0.5),0_0_60px_rgba(59,130,246,0.3)]">
            <span className="text-2xl">⚽</span>
          </div>
        </div>

        {/* Title with gradient */}
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#0047AB] mb-2 tracking-wide">
          Quiniela XBuyer
        </h1>

        {/* Loading text */}
        <p className="text-sm text-[#60A5FA] mb-5 min-h-[20px] transition-all duration-300">
          {loadingTexts[phase]}
        </p>

        {/* Progress bar */}
        <div className="w-56 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
          <div
            className="h-full bg-gradient-to-r from-[#0047AB] via-[#3B82F6] to-[#60A5FA] rounded-full transition-all duration-300 ease-out"
            style={{
              width: "100%",
              animation: "loadingBar 2s ease-in-out infinite",
            }}
          ></div>
        </div>

        {/* Version */}
        <p className="text-xs text-[#4B5563] mt-4">v2.0.26</p>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

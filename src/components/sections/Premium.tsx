import { Header } from "../home/Header";

interface PremiumProps {
  onNavigate: (view: string) => void;
  points: number;
}

export const Premium = ({ onNavigate, points }: PremiumProps) => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header points={points} />
      <div className="bg-[#141414] border-b border-[#252525] px-4 py-4">
        <button
          onClick={() => onNavigate("dashboard")}
          className="mb-3 text-gray-400 hover:text-[#FFE600] font-bold text-sm flex items-center gap-2 transition-colors"
        >
          ← Volver al inicio
        </button>
        <h1 className="text-white font-black text-2xl mb-1">⭐ Premium</h1>
        <p className="text-gray-500 text-sm">Desbloquea todas las funciones</p>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-900/10 border border-yellow-600/40 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-white font-black text-3xl mb-2">
              QuinielaMundial Premium
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              Acceso ilimitado a todas las funciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4">
              <div className="text-2xl mb-2">🎮</div>
              <h3 className="text-white font-bold mb-1">
                Match Center Completo
              </h3>
              <p className="text-gray-400 text-sm">
                Campo animado con todos los partidos
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4">
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="text-white font-bold mb-1">IA Coach Premium</h3>
              <p className="text-gray-400 text-sm">
                Predicciones avanzadas con IA
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold mb-1">
                Estadísticas Avanzadas
              </h3>
              <p className="text-gray-400 text-sm">
                Análisis profundo de partidos
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4">
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="text-white font-bold mb-1">Party Mode</h3>
              <p className="text-gray-400 text-sm">
                Juega con amigos en tiempo real
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-[#FFD700] text-black font-black text-base px-8 py-4 rounded-xl hover:bg-[#FFC700] transition-colors">
              ACTIVAR PREMIUM
            </button>
            <p className="text-gray-400 text-xs mt-3">$9.99/mes o $49.99/año</p>
          </div>
        </div>
      </div>
    </div>
  );
};

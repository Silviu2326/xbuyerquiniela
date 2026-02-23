import type { FantasyState, UIState } from "../../types/index.ts";
import { getFlagImage } from "../../utils/helpers";
// import { TEAMS } from '../../data/teams';
import { MATCHDAYS } from "../../data/fantasy";

interface FantasyHubProps {
  state: FantasyState;
  ui: UIState;
  onNavigate: (view: string) => void;
}

const FMT = (num: number): string => {
  if (num >= 1000) {
    return `${Math.floor(num / 1000)}K`;
  }
  return num.toString();
};

export const FantasyHub = ({ state, ui, onNavigate }: FantasyHubProps) => {
  const squadOk = state.squad.length >= 11;
  const md = MATCHDAYS[0];
  const totalMatch = md.matches.length;
  const totalPred = Object.keys(state.predictions).length;

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* HEADER */}
      <div className="bg-[#000] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("dashboard")}
            className="text-gray-500 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
          <div>
            <h1 className="text-white font-black text-base">Fantasy Mundial</h1>
            <p className="text-gray-600 text-[11px]">Tu Dirección Técnica</p>
          </div>
        </div>
        <div className="text-white font-black text-sm">{FMT(state.coins)}</div>
      </div>

      {/* FOMO BAR - TODO EN UNO */}
      <div className="bg-[#000] px-4 py-3 border-t border-b border-[#1a1a1a]">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 bg-[#FF4444] rounded-full animate-pulse"></span>
              <span className="text-[#FF4444] font-black text-[11px] tracking-wide">
                CIERRE JORNADA 1
              </span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Arma tu XI y predice alineaciones
            </p>
          </div>
          <div className="flex items-start gap-1.5">
            <div className="text-center">
              <div className="text-white font-black text-xl leading-none">
                {String(ui.timeH).padStart(2, "0")}
              </div>
              <div className="text-gray-600 text-[10px] font-bold mt-0.5">
                HRS
              </div>
            </div>
            <div className="text-gray-600 font-black text-base pt-0.5">,</div>
            <div className="text-center">
              <div className="text-white font-black text-xl leading-none">
                {String(ui.timeM).padStart(2, "0")}
              </div>
              <div className="text-gray-600 text-[10px] font-bold mt-0.5">
                MIN
              </div>
            </div>
            <div className="text-gray-600 font-black text-base pt-0.5">,</div>
            <div className="text-center">
              <div className="text-white font-black text-xl leading-none">
                {String(ui.timeS).padStart(2, "0")}
              </div>
              <div className="text-gray-600 text-[10px] font-bold mt-0.5">
                SEG
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-white font-black text-lg">
              {FMT(ui.online)}
            </div>
            <div className="text-gray-600 text-[10px]">managers online</div>
          </div>
          <div className="text-center">
            <div className="text-[#FFE600] font-black text-lg">
              {FMT(ui.lined)}
            </div>
            <div className="text-gray-600 text-[10px]">ya armaron XI</div>
          </div>
          <div className="text-center">
            <div className="font-black text-lg">
              🔥 <span className="text-white">{state.streak}</span>
            </div>
            <div className="text-gray-600 text-[10px]">tu racha</div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-[#000]">
        <button className="bg-[#FFE600] text-black font-bold text-[11px] py-2 px-3 rounded-lg whitespace-nowrap flex items-center gap-1">
          🏠 Hub
        </button>
        <button
          onClick={() => onNavigate(squadOk ? "pitch" : "squad")}
          className="bg-transparent text-white font-bold text-[11px] py-2 px-3 rounded-lg whitespace-nowrap flex items-center gap-1"
        >
          ⚽ Mi Selección {!squadOk && "⚠️"}
        </button>
        <button
          onClick={() => onNavigate("predict-list")}
          className="bg-transparent text-white font-bold text-[11px] py-2 px-3 rounded-lg whitespace-nowrap flex items-center gap-1 relative"
        >
          🎯 Predecir
          {totalMatch - totalPred > 0 && (
            <span className="bg-[#FF4444] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ml-1">
              {totalMatch - totalPred}
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate("chips")}
          className="bg-transparent text-white font-bold text-[11px] py-2 px-3 rounded-lg whitespace-nowrap flex items-center gap-1"
        >
          🃏 Comodines
        </button>
        <button
          onClick={() => onNavigate("duels")}
          className="bg-transparent text-white font-bold text-[11px] py-2 px-3 rounded-lg whitespace-nowrap flex items-center gap-1"
        >
          ⚔️ Duelos
        </button>
      </div>

      {/* MI SELECCIÓN CARD */}
      <div className="px-4 py-3 bg-[#000]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-sm flex items-center gap-2">
            ⚽ Mi Selección
          </h2>
          <div
            className={`text-[11px] font-black px-2 py-0.5 rounded ${
              state.squad.length >= 11
                ? "text-[#FFE600] bg-transparent"
                : "text-[#FF4444] bg-transparent"
            }`}
          >
            {state.squad.length}/15 {state.squad.length >= 11 ? "" : "⚠️"}
          </div>
        </div>
        <div className="flex gap-1 flex-wrap mb-2">
          {state.squad.slice(0, 11).map((p) => (
            <div
              key={p.id}
              className={`w-8 h-6 rounded-sm overflow-hidden ${
                state.captainId === p.id
                  ? "ring-2 ring-[#FFD700]"
                  : "border border-[#333]"
              }`}
            >
              <img
                src={getFlagImage(p.nation || "", 28)}
                alt={p.nation}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          ))}
          {Array(Math.max(0, 11 - state.squad.length))
            .fill(0)
            .map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-8 h-6 rounded-sm border border-dashed border-[#333]"
              />
            ))}
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-600">
            Presupuesto:{" "}
            <span className="text-[#FFE600] font-black">${state.budget}M</span>
            <span className="mx-1">·</span>
            Formación:{" "}
            <span className="text-gray-400 font-bold">{state.formation}</span>
          </span>
          <span
            className="text-[#FFE600] font-bold cursor-pointer"
            onClick={() => onNavigate(squadOk ? "pitch" : "squad")}
          >
            Gestionar →
          </span>
        </div>
      </div>

      {/* PREDICT MATCHES PREVIEW */}
      <div className="px-4 py-3 bg-[#000] border-t border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-white font-bold text-sm flex items-center gap-2">
              🎯 Predice Alineaciones
            </h2>
            <p className="text-gray-600 text-[10px]">
              +2 pts por titular acertado · +5 pts si aciertas esquema
            </p>
          </div>
          <div className="text-[#FFE600] text-xs font-bold">
            {totalPred}/{totalMatch}
          </div>
        </div>
        <div className="space-y-0 border-t border-[#1a1a1a]">
          {md.matches.slice(0, 4).map((m) => {
            const done = !!state.predictions[m.id];
            return (
              <div
                key={m.id}
                className="flex items-center justify-between py-3 border-b border-[#1a1a1a] cursor-pointer"
                onClick={() => onNavigate("predict-detail")}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-white font-bold text-sm">{m.h}</span>
                </div>
                <div className="text-center px-3">
                  <div className="text-gray-600 text-[9px]">{m.d}</div>
                  <div className="text-white font-black text-sm">{m.t}</div>
                  <div className="text-gray-700 text-[9px]">{m.st}</div>
                </div>
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <span className="text-white font-bold text-sm">{m.a}</span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 ${
                      done ? "text-[#FFE600]" : "text-[#FFD700]"
                    }`}
                  >
                    {done ? "" : "PREDECIR"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {md.matches.length > 4 && (
          <div className="text-center py-2 text-xs text-[#FFE600] font-bold cursor-pointer">
            Ver {md.matches.length - 4} partidos más →
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-3 gap-3 px-4 py-4 bg-[#000]">
        {[
          { icon: "🃏", label: "Comodines", sub: "5 disp.", view: "chips" },
          { icon: "⚔️", label: "Duelos", sub: "Reta amigos", view: "duels" },
          { icon: "📊", label: "Puntuación", sub: "Reglas", view: "scoring" },
        ].map((a) => (
          <div
            key={a.view}
            onClick={() => onNavigate(a.view)}
            className="bg-transparent cursor-pointer text-center py-2"
          >
            <div className="text-3xl mb-1">{a.icon}</div>
            <div className="text-xs font-black text-white mb-0.5">
              {a.label}
            </div>
            <div className="text-[10px] text-gray-600">{a.sub}</div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="px-4 py-4 bg-[#000] border-t border-[#1a1a1a]">
        <h3 className="text-[#FFD700] font-bold text-sm mb-3 flex items-center gap-2">
          💡 ¿Cómo funciona?
        </h3>
        <div className="text-xs text-gray-500 leading-relaxed space-y-1.5">
          <div>
            <span className="text-gray-400 font-bold">1.</span> Arma tu
            selección de 15 jugadores con presupuesto de $250M
          </div>
          <div>
            <span className="text-gray-400 font-bold">2.</span> Define tus 11
            titulares, suplentes, capitán y formación
          </div>
          <div>
            <span className="text-gray-400 font-bold">3.</span> Predice las
            alineaciones titulares de los equipos reales (+2 pts/acierto)
          </div>
          <div>
            <span className="text-gray-400 font-bold">4.</span> Tus jugadores
            suman puntos por goles, asistencias, porterías a 0
          </div>
          <div>
            <span className="text-gray-400 font-bold">5.</span> Si un equipo es{" "}
            <span className="text-[#FF4444]">eliminado</span>, reemplaza esos
            jugadores
          </div>
          <div>
            <span className="text-gray-400 font-bold">6.</span> Usa comodines
            estratégicamente — son limitados todo el torneo
          </div>
        </div>
      </div>
    </div>
  );
};

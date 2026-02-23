import { useDTStore } from "../store/dtStore";
import { Trophy, Home, RotateCcw, Target, Shield, Award } from "lucide-react";
import { getNationInfo } from "../data/players";

export function DTTournamentEnd() {
  const { currentCareer, setView } = useDTStore();

  if (!currentCareer || !currentCareer.tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e] flex items-center justify-center">
        <p className="text-gray-400">No hay torneo activo</p>
      </div>
    );
  }

  const { stats, tournament, badges } = currentCareer;
  const position = tournament.finalPosition || 4;
  const isChampion = position === 1;
  const isPodium = position <= 3;
  const nation = getNationInfo(currentCareer.nationId)?.nation;

  const positionText =
    position === 1
      ? "CAMPEÓN"
      : position === 2
        ? "SUBCAMPEÓN"
        : position === 3
          ? "TERCER PUESTO"
          : position === 4
            ? "4º LUGAR"
            : `PUESTO ${position}`;
  const positionColor =
    position === 1
      ? "text-yellow-400"
      : position === 2
        ? "text-gray-300"
        : position === 3
          ? "text-amber-600"
          : "text-gray-400";

  const newBadges = badges.filter((b) => {
    const unlockTime = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
    const recent = Date.now() - unlockTime < 60000;
    return recent;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e] pb-28">
      {/* Header Result */}
      <div
        className={`px-4 pt-12 pb-8 text-center ${isChampion ? "bg-gradient-to-b from-yellow-500/20 to-transparent" : ""}`}
      >
        {isChampion && (
          <div className="flex justify-center mb-4">
            <Trophy size={64} className="text-yellow-400 animate-pulse" />
          </div>
        )}

        <div
          className={`inline-block px-4 py-2 rounded-full mb-4 ${
            isChampion
              ? "bg-yellow-500/20"
              : isPodium
                ? "bg-[#0047AB]/20"
                : "bg-white/10"
          }`}
        >
          <span className={`font-black text-lg ${positionColor}`}>
            {positionText}
          </span>
        </div>

        <h1 className="text-4xl font-black text-white mb-2">
          {isChampion ? "¡CAMPEÓN DEL MUNDO!" : "Torneo Finalizado"}
        </h1>
        <p className="text-gray-400">{nation?.name} • Mundial 2026</p>
      </div>

      {/* Nation Flag */}
      <div className="flex justify-center mb-6">
        <div
          className={`w-24 h-24 rounded-3xl flex items-center justify-center text-6xl ${
            isChampion
              ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-2xl shadow-yellow-500/30"
              : "bg-white/10"
          }`}
        >
          {nation?.flag || "🏳️"}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-4">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400 text-sm font-bold uppercase mb-4">
            Rendimiento
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-black text-[#FFE600]">
                {stats.played}
              </div>
              <div className="text-gray-500 text-xs">Partidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-[#0047AB]">
                {stats.won}
              </div>
              <div className="text-gray-500 text-xs">Victorias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-400">
                {stats.lost}
              </div>
              <div className="text-gray-500 text-xs">Derrotas</div>
            </div>
          </div>

          <div className="h-px bg-white/10 my-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-[#FFE600]" />
              <span className="text-gray-400 text-sm">Goles</span>
            </div>
            <span className="text-white font-bold">
              {stats.goalsFor} - {stats.goalsAgainst}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[#FFE600]" />
              <span className="text-gray-400 text-sm">Diferencia</span>
            </div>
            <span
              className={`font-bold ${stats.goalsFor - stats.goalsAgainst >= 0 ? "text-blue-400" : "text-red-400"}`}
            >
              {stats.goalsFor - stats.goalsAgainst > 0 ? "+" : ""}
              {stats.goalsFor - stats.goalsAgainst}
            </span>
          </div>
        </div>
      </div>

      {/* New Badges */}
      {newBadges.length > 0 && (
        <div className="px-4 mt-6">
          <h3 className="text-[#FFE600] font-bold mb-3 flex items-center gap-2">
            <Award size={20} />
            Insignias Desbloqueadas
          </h3>
          <div className="space-y-3">
            {newBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-gradient-to-r from-[#0047AB]/20 to-transparent rounded-2xl p-4 border border-[#FFE600]/30 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FFE600]/20 flex items-center justify-center text-3xl">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold">{badge.name}</h4>
                  <p className="text-gray-400 text-sm">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Standings if eliminated in groups */}
      {!tournament.qualified && tournament.groups && (
        <div className="px-4 mt-6">
          <div className="bg-red-500/10 rounded-2xl p-4 border border-red-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold">✕</span>
              </div>
              <div>
                <h3 className="text-white font-bold">
                  Eliminado en Fase de Grupos
                </h3>
                <p className="text-gray-400 text-sm">
                  No clasificaste a la siguiente ronda
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0f23] via-[#0f0f23] to-transparent p-4 space-y-3">
        <button
          onClick={() => setView("landing")}
          className="w-full py-4 bg-[#FFE600] text-black font-black text-lg rounded-2xl active:scale-98 transition-all flex items-center justify-center gap-3"
        >
          <RotateCcw size={24} />
          NUEVO INTENTO
        </button>
        <button
          onClick={() => setView("landing")}
          className="w-full py-4 bg-white/10 text-white font-bold rounded-2xl active:bg-white/20 transition-all flex items-center justify-center gap-3"
        >
          <Home size={24} />
          MENÚ PRINCIPAL
        </button>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { useDTStore } from "../store/dtStore";
import { Activity, Trophy, TrendingUp } from "lucide-react";
import { getNationInfo } from "../data/players";

export function DTMatchResult() {
  const { currentCareer, setView, dismissRandomEvent } = useDTStore();

  if (!currentCareer || !currentCareer.tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a1a24] to-[#0047AB]/20 flex items-center justify-center">
        <p className="text-gray-400">No hay partido para mostrar</p>
      </div>
    );
  }

  const lastMatch = currentCareer.matches[currentCareer.matches.length - 1];
  if (!lastMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a1a24] to-[#0047AB]/20 flex items-center justify-center">
        <p className="text-gray-400">No hay resultado disponible</p>
      </div>
    );
  }

  const isUserHome = lastMatch.homeNationId === currentCareer.nationId;
  const userScore = isUserHome ? lastMatch.homeScore : lastMatch.awayScore;
  const opponentScore = isUserHome ? lastMatch.awayScore : lastMatch.homeScore;
  const opponentId = isUserHome
    ? lastMatch.awayNationId
    : lastMatch.homeNationId;
  const opponent = getNationInfo(opponentId)?.nation || {
    name: "Oponente",
    flag: "🏳️",
    code: "OPO",
  };
  const userNation = getNationInfo(currentCareer.nationId)?.nation;

  const isWin = userScore > opponentScore;
  const isDraw = userScore === opponentScore;

  // Detectar si hubo prórroga y/o penaltis
  const hasExtraTime =
    lastMatch.phase !== "group" &&
    userScore !== opponentScore &&
    lastMatch.homeScore + lastMatch.awayScore >= 2;
  const hasPenalties =
    lastMatch.penaltyHomeScore !== undefined &&
    lastMatch.penaltyAwayScore !== undefined;
  const userPenalties = isUserHome
    ? lastMatch.penaltyHomeScore
    : lastMatch.penaltyAwayScore;
  const opponentPenalties = isUserHome
    ? lastMatch.penaltyAwayScore
    : lastMatch.penaltyHomeScore;

  // Generar estadísticas una sola vez usando useMemo
  const stats = useMemo(() => {
    const userPossession = 45 + Math.floor(Math.random() * 15);
    return {
      possession: { user: userPossession, opponent: 100 - userPossession },
      shots: {
        user: 6 + Math.floor(Math.random() * 10),
        opponent: 4 + Math.floor(Math.random() * 8),
      },
      shotsOnTarget: {
        user: 2 + Math.floor(Math.random() * 5),
        opponent: 2 + Math.floor(Math.random() * 4),
      },
      corners: {
        user: 2 + Math.floor(Math.random() * 6),
        opponent: 2 + Math.floor(Math.random() * 5),
      },
      fouls: {
        user: 4 + Math.floor(Math.random() * 8),
        opponent: 5 + Math.floor(Math.random() * 7),
      },
    };
  }, [lastMatch?.id]);

  const handleContinue = () => {
    dismissRandomEvent();
    const userGroup = currentCareer.tournament?.groups.find(
      (g) => g.id === currentCareer.tournament?.userGroupId,
    );
    const allPlayed = userGroup?.matches.every((m) => m.played);
    const isKnockoutPhase = currentCareer.tournament?.currentPhase !== "group";

    if (allPlayed && !isKnockoutPhase) {
      // Fase de grupos terminada - verificar si clasificó
      if (currentCareer.tournament?.qualified) {
        setView("home");
      } else {
        setView("tournament-end");
      }
    } else if (isKnockoutPhase) {
      // En fase eliminatoria
      const userKnockoutMatches =
        currentCareer.tournament?.knockoutMatches.filter(
          (m) =>
            m.homeNationId === currentCareer.nationId ||
            m.awayNationId === currentCareer.nationId,
        );
      const lastKnockoutMatch = userKnockoutMatches?.slice(-1)[0];

      if (lastKnockoutMatch?.played) {
        const isUserHome =
          lastKnockoutMatch.homeNationId === currentCareer.nationId;
        let userWon = isUserHome
          ? lastKnockoutMatch.homeScore > lastKnockoutMatch.awayScore
          : lastKnockoutMatch.awayScore > lastKnockoutMatch.homeScore;

        // Si hay empate, verificar penaltis
        if (
          !userWon &&
          lastKnockoutMatch.homeScore === lastKnockoutMatch.awayScore
        ) {
          const userPenalties = isUserHome
            ? lastKnockoutMatch.penaltyHomeScore
            : lastKnockoutMatch.penaltyAwayScore;
          const oppPenalties = isUserHome
            ? lastKnockoutMatch.penaltyAwayScore
            : lastKnockoutMatch.penaltyHomeScore;
          userWon = (userPenalties || 0) > (oppPenalties || 0);
        }

        if (!userWon || currentCareer.tournament?.finalPosition) {
          setView("tournament-end");
        } else {
          setView("home");
        }
      } else {
        setView("home");
      }
    } else {
      // Ir directamente a home para jugar el siguiente partido (sin entrenamiento)
      setView("home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a1a24] to-[#0047AB]/20 pb-28">
      {/* Header sin botón de volver */}
      <header className="relative overflow-hidden pt-8 pb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a24] via-[#12121a] to-[#12121a]"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#0047AB]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0047AB]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-black tracking-tight text-white">
              RESULTADO
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-5">
        {/* Result Card */}
        <div
          className={`rounded-3xl p-6 border-2 ${
            isWin
              ? "bg-gradient-to-br from-[#FFE600]/20 to-[#FFE600]/5 border-[#FFE600]/50"
              : isDraw
                ? "bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/50"
                : "bg-gradient-to-br from-red-500/20 to-red-500/5 border-red-500/50"
          }`}
        >
          {/* Result Badge */}
          <div className="flex justify-center mb-6">
            <div
              className={`px-6 py-2 rounded-full ${
                isWin
                  ? "bg-[#FFE600] text-black"
                  : isDraw
                    ? "bg-yellow-500 text-black"
                    : "bg-red-500 text-white"
              }`}
            >
              <span className="font-black text-lg">
                {isWin ? "VICTORIA" : isDraw ? "EMPATE" : "DERROTA"}
              </span>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFE600] to-[#0047AB] flex items-center justify-center text-3xl font-black text-white mb-3 shadow-lg">
                {userNation?.code || "TU"}
              </div>
              <span className="text-white font-bold text-sm">
                {userNation?.name || "Tú"}
              </span>
            </div>

            <div className="flex flex-col items-center px-6">
              <div
                className={`text-6xl font-black ${isWin ? "text-[#FFE600]" : isDraw ? "text-yellow-400" : "text-red-400"}`}
              >
                {userScore} - {opponentScore}
              </div>

              {/* Penaltis */}
              {hasPenalties && (
                <div className="text-2xl font-bold text-gray-300 mt-1">
                  ({userPenalties} - {opponentPenalties})
                </div>
              )}

              {/* Indicador de prórroga/penaltis */}
              {hasPenalties ? (
                <span className="text-gray-400 text-sm mt-2">
                  Tras penaltis
                </span>
              ) : hasExtraTime ? (
                <span className="text-gray-400 text-sm mt-2">
                  Tras prórroga
                </span>
              ) : (
                <span className="text-gray-400 text-sm mt-2">
                  {lastMatch.phase === "group"
                    ? "Final del partido"
                    : "Final del partido"}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 rounded-2xl bg-[#1a1a24] flex items-center justify-center text-3xl font-black text-white mb-3">
                {opponent.code || "RIV"}
              </div>
              <span className="text-gray-400 font-bold text-sm text-center">
                {opponent.name}
              </span>
            </div>
          </div>
        </div>

        {/* Random Event */}
        {currentCareer.randomEvent && (
          <div
            className={`p-4 rounded-2xl border ${
              currentCareer.randomEvent.effect === "positive"
                ? "bg-[#FFE600]/10 border-[#FFE600]/30"
                : currentCareer.randomEvent.effect === "negative"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-[#0047AB]/10 border-[#0047AB]/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  currentCareer.randomEvent.effect === "positive"
                    ? "bg-[#FFE600]/20"
                    : currentCareer.randomEvent.effect === "negative"
                      ? "bg-red-500/20"
                      : "bg-[#0047AB]/20"
                }`}
              >
                <Activity
                  size={20}
                  className={
                    currentCareer.randomEvent.effect === "positive"
                      ? "text-[#FFE600]"
                      : currentCareer.randomEvent.effect === "negative"
                        ? "text-red-400"
                        : "text-blue-400"
                  }
                />
              </div>
              <div>
                <h3 className="text-white font-bold">
                  {currentCareer.randomEvent.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {currentCareer.randomEvent.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Match Stats */}
        <div>
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#FFE600]" />
            Estadísticas
          </h3>

          <div className="bg-gradient-to-br from-[#1a1a24] to-[#12121a] rounded-2xl p-4 border border-[#2a2a3a] space-y-4">
            {/* Possession */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#FFE600] font-bold">
                  {stats.possession.user}%
                </span>
                <span className="text-gray-400 text-sm">Posesión</span>
                <span className="text-gray-400 font-bold">
                  {stats.possession.opponent}%
                </span>
              </div>
              <div className="h-2 bg-[#2a2a3a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0047AB] rounded-full"
                  style={{ width: `${stats.possession.user}%` }}
                />
              </div>
            </div>

            {/* Shots */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#FFE600] font-bold">
                  {stats.shots.user}
                </span>
                <span className="text-gray-400 text-sm">Tiros</span>
                <span className="text-gray-400 font-bold">
                  {stats.shots.opponent}
                </span>
              </div>
              <div className="h-2 bg-[#2a2a3a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0047AB] rounded-full"
                  style={{
                    width: `${(stats.shots.user / (stats.shots.user + stats.shots.opponent)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Corners */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2a2a3a]">
              <div className="text-center">
                <div className="text-xl font-bold text-[#FFE600]">
                  {stats.corners.user}
                </div>
                <div className="text-gray-500 text-xs">Córners</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#FFE600]">
                  {lastMatch.events.filter((e) => e.type === "yellow").length}
                </div>
                <div className="text-gray-500 text-xs">Tarjetas</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#FFE600]">
                  {stats.fouls.user}
                </div>
                <div className="text-gray-500 text-xs">Faltas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Progress */}
        <div className="bg-gradient-to-br from-[#1a1a24] to-[#12121a] rounded-2xl p-4 border border-[#2a2a3a]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">
              Progreso en el Torneo
            </span>
            <span className="text-white font-bold">
              {currentCareer.stats.played} PJ
            </span>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFE600]/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">
                  {currentCareer.stats.won}
                </span>
              </div>
              <span className="text-gray-400 text-xs">Victorias</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400 font-bold">
                  {currentCareer.stats.drawn}
                </span>
              </div>
              <span className="text-gray-400 text-xs">Empates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold">
                  {currentCareer.stats.lost}
                </span>
              </div>
              <span className="text-gray-400 text-xs">Derrotas</span>
            </div>
          </div>
        </div>
      </main>

      {/* Continue Button - Fijo en la parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/95 to-transparent p-4 z-50">
        <button
          onClick={handleContinue}
          className="w-full py-5 bg-gradient-to-r from-[#FFE600] to-[#0047AB] text-white font-black text-xl rounded-2xl shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <Trophy size={28} />
          CONTINUAR
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { useDTStore } from "../store/dtStore";
import {
  Pause,
  Play,
  FastForward,
  Zap,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { getNationInfo } from "../data/players";
import { DTPageLayout } from "./DTPageLayout";
import { DTHome } from "./DTHome";
import "./DTMatch.css";

const SIMULATION_SPEEDS = [
  { id: "slow", name: "1x", icon: Play, delay: 1500 },
  { id: "fast", name: "2x", icon: FastForward, delay: 800 },
  { id: "super", name: "4x", icon: Zap, delay: 400 },
];

const DECISIONS = [
  {
    id: "attack",
    text: "Atacar",
    icon: Zap,
    color: "from-red-500 to-orange-500",
    effect: { attack: 0.25, defense: -0.15, possession: 60 },
  },
  {
    id: "balanced",
    text: "Equilibrado",
    icon: Target,
    color: "from-[#FFE600] to-[#0047AB]",
    effect: { attack: 0, defense: 0, possession: 50 },
  },
  {
    id: "defend",
    text: "Defender",
    icon: Shield,
    color: "from-[#FFE600] to-[#0047AB]",
    effect: { attack: -0.2, defense: 0.25, possession: 40 },
  },
  {
    id: "sub",
    text: "Cambio",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    effect: { attack: 0, defense: 0, possession: 50 },
  },
];

// Multiplicador por momento del partido (MENOS EXTREMO)
const getTimeMultiplier = (minute: number): number => {
  if (minute <= 15) return 0.9; // Inicio cauteloso
  if (minute <= 45) return 1.0; // Primera parte normal
  if (minute <= 60) return 1.1; // Arranque segunda parte
  if (minute <= 75) return 1.15; // Partido abierto
  return 1.25; // Final loco (no tan loco)
};

// Factor psicológico según marcador (MENOS EXTREMO)
const getScoreFactor = (
  myGoals: number,
  oppGoals: number,
  isAttacking: boolean,
): number => {
  const diff = myGoals - oppGoals;

  if (diff === 0) return 1.0; // Empate
  if (diff === 1) return isAttacking ? 0.85 : 1.15; // Ganando 1-0
  if (diff >= 2) return isAttacking ? 0.75 : 1.25; // Ganando cómodo
  if (diff === -1) return isAttacking ? 1.15 : 0.85; // Perdiendo 1
  return isAttacking ? 1.25 : 0.75; // Perdiendo feo
};

export function DTMatch() {
  const { currentCareer, setView, finishMatch } = useDTStore();
  const [minute, setMinute] = useState(0);
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [speed, setSpeed] = useState("fast");
  const [isPaused, setIsPaused] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [events, setEvents] = useState<
    Array<{
      minute: number;
      text: string;
      type: "goal" | "card" | "normal";
      playerId?: string;
      playerName?: string;
    }>
  >([]);
  const [matchFinished, setMatchFinished] = useState(false);
  const [possession, setPossession] = useState(50);
  const [decisionsMade, setDecisionsMade] = useState<number[]>([]);
  const [goalPopup, setGoalPopup] = useState<{
    show: boolean;
    playerName: string;
    minute: number;
    isUserGoal: boolean;
  } | null>(null);
  const [currentTactic, setCurrentTactic] = useState("balanced");
  const [lastGoalMinute, setLastGoalMinute] = useState(-10); // Para cooldown
  const [attackBoost, setAttackBoost] = useState(0); // Bonus acumulativo si no marcas

  const currentMatch = currentCareer?.currentMatch;
  const isUserHome = currentMatch?.homeNationId === currentCareer?.nationId;
  const opponentId = isUserHome
    ? currentMatch?.awayNationId
    : currentMatch?.homeNationId;
  const opponentInfo = opponentId ? getNationInfo(opponentId) : null;
  const opponent = opponentInfo?.nation || { name: "Oponente", flag: "🏳️" };
  const userNation = getNationInfo(currentCareer?.nationId || "")?.nation;
  const userSquad = currentCareer?.squad || [];
  const userStarters = currentCareer?.starters || [];

  // Jugadores titulares
  const startingPlayers = userSquad.filter((p) => userStarters.includes(p.id));

  // Calcular media de overall de los titulares del usuario (0-100)
  const userTeamStrength =
    startingPlayers.length > 0
      ? startingPlayers.reduce((sum, p) => sum + p.overall, 0) /
        startingPlayers.length
      : 75; // Valor por defecto si no hay titulares

  // Fuerza del rival (basada en su selección, 0-100)
  const opponentStrength = opponentInfo?.nation.strength || 75;

  // Función para obtener goleador de jugadores titulares
  const getScorer = useCallback(
    (isUserTeam: boolean): { name: string; id: string } => {
      if (isUserTeam && startingPlayers.length > 0) {
        // Probabilidades por posición (FWD > MID > DEF > GK)
        const weights = startingPlayers.map((p) => {
          if (p.position === "FWD") return 3;
          if (p.position === "MID") return 2;
          if (p.position === "DEF") return 0.5;
          return 0.1; // GK casi imposible
        });

        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < startingPlayers.length; i++) {
          random -= weights[i];
          if (random <= 0) {
            return { name: startingPlayers[i].name, id: startingPlayers[i].id };
          }
        }
        return { name: startingPlayers[0].name, id: startingPlayers[0].id };
      }
      // Rival - nombre aleatorio
      const rivalNames = [
        "Gómez",
        "Rodríguez",
        "Silva",
        "Martínez",
        "López",
        "Fernández",
        "Pérez",
        "González",
      ];
      return {
        name: rivalNames[Math.floor(Math.random() * rivalNames.length)],
        id: "",
      };
    },
    [startingPlayers],
  );

  // Función para obtener jugador que recibe tarjeta
  const getCardPlayer = useCallback(
    (isUserTeam: boolean): { name: string; id: string } => {
      if (isUserTeam && startingPlayers.length > 0) {
        // Defensas y mediocampistas más propensos a tarjetas
        const candidates =
          startingPlayers.filter((p) => p.position !== "FWD") ||
          startingPlayers;
        const player =
          candidates[Math.floor(Math.random() * candidates.length)];
        return { name: player.name, id: player.id };
      }
      const rivalNames = ["Gómez", "Rodríguez", "Silva", "Martínez", "López"];
      return {
        name: rivalNames[Math.floor(Math.random() * rivalNames.length)],
        id: "",
      };
    },
    [startingPlayers],
  );

  const addEvent = useCallback(
    (
      text: string,
      type: "goal" | "card" | "normal" = "normal",
      playerId?: string,
      playerName?: string,
    ) => {
      setEvents((prev) => [
        ...prev,
        { minute, text, type, playerId, playerName },
      ]);
    },
    [minute],
  );

  // Simulación del partido
  useEffect(() => {
    if (matchFinished || isPaused || showDecision) return;
    const speedConfig = SIMULATION_SPEEDS.find((s) => s.id === speed);
    if (!speedConfig) return;

    const interval = setInterval(() => {
      setMinute((m) => {
        if (m >= 90) {
          setMatchFinished(true);
          return 90;
        }
        return m + 1;
      });

      // Posesión varía según táctica y aleatorio
      const basePossession =
        DECISIONS.find((d) => d.id === currentTactic)?.effect.possession || 50;
      setPossession(basePossession + Math.floor(Math.random() * 10) - 5);
    }, speedConfig.delay);

    return () => clearInterval(interval);
  }, [speed, isPaused, showDecision, matchFinished, currentTactic]);

  // Lógica de goles y eventos - SISTEMA REALISTA CORREGIDO
  useEffect(() => {
    if (matchFinished || isPaused || showDecision) return;

    // COOLDOWN: Mínimo 7 minutos entre goles (más realista)
    if (minute - lastGoalMinute < 7) return;

    const myGoals = isUserHome ? score.home : score.away;
    const oppGoals = isUserHome ? score.away : score.home;

    // Calcular probabilidades CONSERVADORAS
    const timeMult = getTimeMultiplier(minute);
    const tacticEffect =
      DECISIONS.find((d) => d.id === currentTactic)?.effect.attack || 0;
    const scoreFactorMy = getScoreFactor(myGoals, oppGoals, true);
    const scoreFactorOpp = getScoreFactor(oppGoals, myGoals, true);

    // Base: 1.0% por minuto (aumentado para más goles)
    const baseProb = 0.01;

    // FACTOR DE FUERZA: comparar la plantilla del usuario vs la del rival
    // Diferencia de fuerza: positivo = usuario más fuerte, negativo = rival más fuerte
    const strengthDiff = userTeamStrength - opponentStrength;

    // Convertir diferencia en multiplicador (cada 10 puntos de diferencia = ~25% de ventaja)
    // Ejemplo: Si usuario tiene 87 y rival 71, diff=16, factor=1.40 (40% más de probabilidad)
    const userStrengthFactor = 1 + (strengthDiff / 100) * 2.5;
    const opponentStrengthFactor = 1 - (strengthDiff / 100) * 2.5;

    // La táctica afecta más si tienes mejor equipo
    // Si atacas con equipazo, marcas mucho más
    // Si defiendes con equipazo, te marcan mucho menos
    const tacticMultiplier = 1 + strengthDiff / 200; // Mejor equipo = táctica más efectiva

    // Probabilidad de gol del usuario (máximo 15%)
    let myGoalProb =
      baseProb *
      timeMult *
      (1 + tacticEffect * tacticMultiplier) *
      scoreFactorMy *
      userStrengthFactor;
    myGoalProb = Math.min(Math.max(myGoalProb, 0.005), 0.15); // Entre 0.5% y 15%

    // Probabilidad de gol del rival
    const defenseEffect =
      DECISIONS.find((d) => d.id === currentTactic)?.effect.defense || 0;
    // Si defiendes bien y tienes mejor equipo, el rival tiene mucha menos probabilidad
    const opponentTacticMultiplier = 1 - strengthDiff / 200; // Peor equipo = táctica menos efectiva
    let oppGoalProb =
      baseProb *
      timeMult *
      (1 - defenseEffect * opponentTacticMultiplier) *
      scoreFactorOpp *
      opponentStrengthFactor;
    oppGoalProb = Math.min(Math.max(oppGoalProb, 0.002), 0.12); // Entre 0.2% y 12%

    // Solo puede haber UN gol en este minuto
    const random = Math.random();
    const totalProb = myGoalProb + oppGoalProb;

    // Si hay gol (probabilidad combinada)
    if (random < totalProb) {
      // Decidir QUIÉN marca proporcionalmente
      const whoScores = Math.random();
      const myChance = myGoalProb / totalProb;

      if (whoScores < myChance) {
        // Gol del usuario
        if (isUserHome) {
          setScore((s) => ({ ...s, home: s.home + 1 }));
        } else {
          setScore((s) => ({ ...s, away: s.away + 1 }));
        }

        const scorer = getScorer(true);
        setGoalPopup({
          show: true,
          playerName: scorer.name,
          minute,
          isUserGoal: true,
        });
        addEvent(`⚽ ¡GOL! ${scorer.name}`, "goal", scorer.id, scorer.name);
        setLastGoalMinute(minute);
        setAttackBoost(0);
        setIsPaused(true);

        setTimeout(() => {
          setGoalPopup(null);
          setIsPaused(false);
        }, 3000);
      } else {
        // Gol del rival
        if (isUserHome) {
          setScore((s) => ({ ...s, away: s.away + 1 }));
        } else {
          setScore((s) => ({ ...s, home: s.home + 1 }));
        }

        const scorer = getScorer(false);
        setGoalPopup({
          show: true,
          playerName: scorer.name,
          minute,
          isUserGoal: false,
        });
        addEvent(`⚽ Gol rival: ${scorer.name}`, "goal");
        setLastGoalMinute(minute);
        setAttackBoost((prev) => Math.min(prev + 1, 5));
        setIsPaused(true);

        setTimeout(() => {
          setGoalPopup(null);
          setIsPaused(false);
        }, 3000);
      }
    } else {
      // No hay gol, aumenta acumulativo lentamente
      setAttackBoost((prev) => Math.min(prev + 0.3, 5));
    }

    // TARJETAS (muy raro, 0.5% por minuto = ~1 tarjeta cada 2 partidos)
    if (Math.random() < 0.005 && minute > 15) {
      const isUserCard = Math.random() > 0.5;
      const cardType = Math.random() < 0.8 ? "🟨" : "🟥";
      const cardPlayer = getCardPlayer(isUserCard);

      if (isUserCard) {
        addEvent(
          `${cardType} Tarjeta: ${cardPlayer.name}`,
          "card",
          cardPlayer.id,
          cardPlayer.name,
        );
      } else {
        addEvent(`${cardType} Tarjeta rival`, "card");
      }
    }

    // Decisiones tácticas en minutos clave
    if ([25, 45, 65, 80].includes(minute) && !decisionsMade.includes(minute)) {
      setShowDecision(true);
      setIsPaused(true);
    }
  }, [
    minute,
    matchFinished,
    isPaused,
    showDecision,
    isUserHome,
    score,
    currentTactic,
    lastGoalMinute,
    attackBoost,
    getScorer,
    getCardPlayer,
    addEvent,
    decisionsMade,
  ]);

  const handleDecision = (decisionId: string) => {
    setShowDecision(false);
    setIsPaused(false);
    setDecisionsMade((prev) => [...prev, minute]);
    setCurrentTactic(decisionId);

    const effectText = {
      attack: "⚡ Modo ataque activado",
      balanced: "⚖️ Equilibrio táctico",
      defend: "🛡️ Bloque defensivo",
      sub: "🔄 Cambio realizado",
    };
    addEvent(effectText[decisionId as keyof typeof effectText], "normal");
  };

  const handleFinishMatch = () => {
    const matchEvents = events.map((e) => ({
      minute: e.minute,
      type: (e.type === "goal"
        ? "goal"
        : e.type === "card"
          ? "yellow"
          : "normal") as "goal" | "yellow" | "red" | "sub" | "injury",
      playerId: e.playerId || "",
      teamId: "",
      description: e.text,
    }));
    finishMatch(score.home, score.away, matchEvents);
    setView("match-result");
  };

  if (!currentCareer) return null;

  // Redirigir automáticamente si no hay partido después de 2 segundos
  useEffect(() => {
    if (!currentCareer.currentMatch) {
      const timer = setTimeout(() => {
        setView("home");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentCareer, setView]);

  // Si no hay partido cargado, renderizar Home en su lugar
  if (!currentCareer.currentMatch) {
    // Importar y renderizar DTHome directamente
    return <DTHome />;
  }

  return (
    <div className="dt-match">
      {/* Background effects */}
      <div className="dt-match__bg-effects">
        <div className="dt-match__bg-gradient" />
        <div className="dt-match__bg-glow" />
      </div>

      <DTPageLayout title="Partido en Vivo" showBack={false}>
        {/* Score Board */}
        <div className="dt-match__container">
          <div className="dt-match__scoreboard">
            {/* Timer */}
            <div className="dt-match__timer">
              <div
                className={`dt-match__timer-badge ${
                  minute >= 90
                    ? "dt-match__timer-badge--finished"
                    : "dt-match__timer-badge--live"
                }`}
              >
                {minute >= 90 ? "FINAL" : `${minute}'`}
              </div>
            </div>

            {/* Score */}
            <div className="dt-match__score-section">
              <div className="dt-match__team">
                <div className="dt-match__team-flag dt-match__team-flag--home">
                  {userNation?.flag || "🏳️"}
                </div>
                <span className="dt-match__team-name">
                  {userNation?.name || "Tú"}
                </span>
              </div>

              <div className="dt-match__score-display">
                <div className="dt-match__score">
                  {isUserHome
                    ? `${score.home} - ${score.away}`
                    : `${score.away} - ${score.home}`}
                </div>
                <div className="dt-match__possession">
                  {possession}% posesión
                </div>
              </div>

              <div className="dt-match__team">
                <div className="dt-match__team-flag dt-match__team-flag--away">
                  {opponent.flag}
                </div>
                <span className="dt-match__team-name dt-match__team-name--away">
                  {opponent.name}
                </span>
              </div>
            </div>

            {/* Tactic indicator */}
            <div className="dt-match__tactic">
              <span className="dt-match__tactic-badge">
                Táctica: {DECISIONS.find((d) => d.id === currentTactic)?.text}
              </span>
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="dt-match__container">
          <div className="dt-match__events">
            {events.length === 0 ? (
              <div className="dt-match__events-empty">
                <p className="text-gray-600 text-center text-sm font-medium">
                  El partido está por comenzar...
                </p>
              </div>
            ) : (
              <div className="dt-match__events-list">
                {events.slice(-4).map((event, idx) => (
                  <div
                    key={idx}
                    className={`dt-match__event ${
                      event.type === "goal"
                        ? "dt-match__event--goal"
                        : event.type === "card"
                          ? "dt-match__event--card"
                          : "dt-match__event--normal"
                    }`}
                  >
                    <span className="dt-match__event-minute">
                      {event.minute}'
                    </span>
                    <span className="font-medium">{event.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Speed Controls */}
        {!matchFinished && (
          <div className="dt-match__container">
            <div className="dt-match__controls">
              {SIMULATION_SPEEDS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSpeed(s.id)}
                    className={`dt-match__speed-btn ${
                      speed === s.id
                        ? "dt-match__speed-btn--active"
                        : "dt-match__speed-btn--inactive"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2.5} />
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Play/Pause */}
        {!matchFinished && !showDecision && (
          <div className="dt-match__container">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`dt-match__play-btn ${
                isPaused
                  ? "dt-match__play-btn--paused"
                  : "dt-match__play-btn--playing"
              }`}
            >
              {isPaused ? (
                <Play size={24} fill="currentColor" />
              ) : (
                <Pause size={24} />
              )}
              {isPaused ? "Reanudar" : "Pausar"}
            </button>
          </div>
        )}

        {/* Decision Modal */}
        {showDecision && (
          <div className="dt-match__modal">
            <div className="dt-match__modal-content">
              <div className="dt-match__modal-header">
                <div className="dt-match__modal-badge">Minuto {minute}'</div>
                <h3 className="dt-match__modal-title">Toma una decisión</h3>
                <p className="dt-match__modal-status">
                  {score.home === score.away
                    ? "Partido empatado"
                    : score.home > score.away
                      ? "Vas ganando"
                      : "Vas perdiendo"}
                </p>
              </div>

              <div className="dt-match__decision-grid">
                {DECISIONS.map((decision) => {
                  const Icon = decision.icon;
                  return (
                    <button
                      key={decision.id}
                      onClick={() => handleDecision(decision.id)}
                      className={`dt-match__decision-btn dt-match__decision-btn--${decision.id}`}
                    >
                      <Icon
                        size={24}
                        style={{ margin: "0 auto 8px" }}
                        strokeWidth={2.5}
                      />
                      <div>{decision.text}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Goal Popup */}
        {goalPopup?.show && (
          <div className="dt-match__goal-popup">
            <div className="dt-match__goal-content">
              <div className="dt-match__goal-emoji">⚽</div>

              <h2 className="dt-match__goal-title">¡GOL!</h2>

              <div className="dt-match__goal-player">
                <div className="dt-match__goal-player-name">
                  {goalPopup.playerName}
                </div>
                <div className="dt-match__goal-minute">
                  Minuto {goalPopup.minute}'
                </div>
              </div>

              <div
                className={`dt-match__goal-result ${goalPopup.isUserGoal ? "dt-match__goal-result--user" : "dt-match__goal-result--opponent"}`}
              >
                {goalPopup.isUserGoal
                  ? "🎉 ¡GOL DE TU EQUIPO!"
                  : "⚠️ GOL RIVAL"}
              </div>
            </div>
          </div>
        )}

        {/* Match Finished */}
        {matchFinished && (
          <div className="dt-match__finished">
            <div className="dt-match__finished-content">
              <div className="dt-match__finished-emoji">
                {isUserHome
                  ? score.home > score.away
                    ? "🏆"
                    : score.home === score.away
                      ? "🤝"
                      : "😔"
                  : score.away > score.home
                    ? "🏆"
                    : score.away === score.away
                      ? "🤝"
                      : "😔"}
              </div>

              <h2 className="dt-match__finished-title">
                {isUserHome
                  ? score.home > score.away
                    ? "¡VICTORIA!"
                    : score.home === score.away
                      ? "EMPATE"
                      : "DERROTA"
                  : score.away > score.home
                    ? "¡VICTORIA!"
                    : score.away === score.home
                      ? "EMPATE"
                      : "DERROTA"}
              </h2>

              <div className="dt-match__finished-score">
                {isUserHome
                  ? `${score.home} - ${score.away}`
                  : `${score.away} - ${score.home}`}
              </div>

              <div className="dt-match__finished-stats">
                <div className="dt-match__finished-stat">
                  <span className="dt-match__finished-stat-label">
                    Posesión
                  </span>
                  <span className="dt-match__finished-stat-value">
                    {possession}%
                  </span>
                </div>
                <div className="dt-match__finished-stat">
                  <span className="dt-match__finished-stat-label">Eventos</span>
                  <span className="dt-match__finished-stat-value">
                    {events.length}
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinishMatch}
                className="dt-match__finished-btn"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </DTPageLayout>
    </div>
  );
}

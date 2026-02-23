import { useState, useEffect, useRef, useCallback } from "react";
import {
  // ChevronLeft, // Unused
  Play,
  Pause,
  SkipBack,
  SkipForward,
  // Zap, // Unused
  Activity,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";

interface MatchCenterProps {
  onNavigate: (view: string) => void;
  points: number;
}

// Datos del partido
const MATCH_DATA = {
  home: {
    name: "México",
    flag: "mx",
    score: 0,
    color: "#00A651",
    formation: "4-3-3",
  },
  away: {
    name: "Sudáfrica",
    flag: "za",
    score: 0,
    color: "#FFD700",
    formation: "4-4-2",
  },
  group: "Grupo A",
  stadium: "Estadio Azteca",
};

// Helper para obtener URL de imagen de bandera
const getFlagUrl = (countryCode: string, size: number = 80) => {
  return `https://flagcdn.com/w${size}/${countryCode.toLowerCase()}.png`;
};

// Eventos del partido (minuto, tipo, equipo, descripción)
const MATCH_EVENTS = [
  { minute: 12, type: "yellow", team: "home", player: "Moreno", icon: "🟨" },
  {
    minute: 23,
    type: "goal",
    team: "home",
    player: "Santi",
    score: "1-0",
    icon: "⚽",
  },
  {
    minute: 34,
    type: "sub",
    team: "away",
    playerIn: "Dolly",
    playerOut: "Tau",
    icon: "↔️",
  },
  { minute: 41, type: "yellow", team: "away", player: "Mokoena", icon: "🟨" },
  {
    minute: 56,
    type: "goal",
    team: "away",
    player: "Nurkovic",
    score: "1-1",
    icon: "⚽",
  },
  { minute: 67, type: "red", team: "home", player: "Romo", icon: "🟥" },
  {
    minute: 72,
    type: "sub",
    team: "home",
    playerIn: "Jiménez",
    playerOut: "Quiñones",
    icon: "↔️",
  },
  {
    minute: 78,
    type: "goal",
    team: "home",
    player: "Lozano",
    score: "2-1",
    icon: "⚽",
  },
  {
    minute: 85,
    type: "sub",
    team: "away",
    playerIn: "Mabiliso",
    playerOut: "Mashego",
    icon: "↔️",
  },
];

// Alineaciones completas
const LINEUPS = {
  home: {
    formation: "4-3-3",
    coach: "Jaime Lozano",
    players: [
      { num: 23, name: "G. Ochoa", pos: "POR", starter: true },
      { num: 3, name: "C. Araujo", pos: "DEF", starter: true },
      { num: 15, name: "H. Moreno", pos: "DEF", starter: true },
      { num: 2, name: "J. Sánchez", pos: "DEF", starter: true },
      { num: 6, name: "G. Gallardo", pos: "DEF", starter: true },
      { num: 16, name: "H. Herrera", pos: "MED", starter: true },
      { num: 8, name: "L. Chávez", pos: "MED", starter: true },
      { num: 7, name: "L. Romo", pos: "MED", starter: true },
      { num: 22, name: "H. Lozano", pos: "DEL", starter: true },
      { num: 11, name: "S. Giménez", pos: "DEL", starter: true },
      { num: 10, name: "J. Quiñones", pos: "DEL", starter: true },
      { num: 1, name: "A. Malagón", pos: "POR", starter: false },
      { num: 5, name: "J. Vasquez", pos: "DEF", starter: false },
      { num: 14, name: "E. Álvarez", pos: "MED", starter: false },
      { num: 9, name: "R. Jiménez", pos: "DEL", starter: false },
    ],
  },
  away: {
    formation: "4-4-2",
    coach: "Hugo Broos",
    players: [
      { num: 1, name: "R. Williams", pos: "POR", starter: true },
      { num: 2, name: "T. Mokoena", pos: "DEF", starter: true },
      { num: 5, name: "L. Xulu", pos: "DEF", starter: true },
      { num: 14, name: "R. De Reuck", pos: "DEF", starter: true },
      { num: 3, name: "A. Mashego", pos: "DEF", starter: true },
      { num: 4, name: "D. Furman", pos: "MED", starter: true },
      { num: 8, name: "T. Maboe", pos: "MED", starter: true },
      { num: 15, name: "S. Mokwena", pos: "MED", starter: true },
      { num: 7, name: "P. Tau", pos: "MED", starter: true },
      { num: 10, name: "T. Zwane", pos: "DEL", starter: true },
      { num: 9, name: "S. Nurkovic", pos: "DEL", starter: true },
      { num: 16, name: "V. Mabiliso", pos: "DEF", starter: false },
      { num: 6, name: "B. Mvala", pos: "MED", starter: false },
      { num: 11, name: "K. Dolly", pos: "DEL", starter: false },
      { num: 17, name: "Z. Lepasa", pos: "DEL", starter: false },
    ],
  },
};

// Posiciones de jugadores en el campo
const FIELD_POSITIONS = {
  home: [
    { num: 23, name: "Ochoa", x: 8, y: 50, pos: "POR" },
    { num: 3, name: "Araujo", x: 25, y: 20, pos: "DEF" },
    { num: 15, name: "Moreno", x: 25, y: 40, pos: "DEF" },
    { num: 2, name: "Sánchez", x: 25, y: 60, pos: "DEF" },
    { num: 6, name: "Gallardo", x: 25, y: 80, pos: "DEF" },
    { num: 16, name: "Herrera", x: 45, y: 35, pos: "MED" },
    { num: 8, name: "Chávez", x: 45, y: 50, pos: "MED" },
    { num: 7, name: "Romo", x: 45, y: 65, pos: "MED" },
    { num: 22, name: "Lozano", x: 65, y: 25, pos: "DEL" },
    { num: 11, name: "Santi", x: 65, y: 50, pos: "DEL" },
    { num: 10, name: "Quiñones", x: 65, y: 75, pos: "DEL" },
  ],
  away: [
    { num: 1, name: "Williams", x: 92, y: 50, pos: "POR" },
    { num: 2, name: "Mokoena", x: 75, y: 20, pos: "DEF" },
    { num: 5, name: "Xulu", x: 75, y: 35, pos: "DEF" },
    { num: 14, name: "De Reuck", x: 75, y: 50, pos: "DEF" },
    { num: 3, name: "Mashego", x: 75, y: 65, pos: "DEF" },
    { num: 4, name: "Furman", x: 75, y: 80, pos: "MED" },
    { num: 8, name: "Maboe", x: 55, y: 30, pos: "MED" },
    { num: 15, name: "Mokwena", x: 55, y: 50, pos: "MED" },
    { num: 7, name: "Tau", x: 55, y: 70, pos: "MED" },
    { num: 10, name: "Zwane", x: 35, y: 40, pos: "DEL" },
    { num: 9, name: "Nurkovic", x: 35, y: 60, pos: "DEL" },
  ],
};

export const MatchCenter = ({ onNavigate, points }: MatchCenterProps) => {
  const [activeTab, setActiveTab] = useState<"events" | "stats" | "lineups">(
    "events",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [visibleEvents, setVisibleEvents] = useState<typeof MATCH_EVENTS>([]);
  const [lastEvent, setLastEvent] = useState<(typeof MATCH_EVENTS)[0] | null>(
    null,
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCard, setShowCard] = useState<{
    type: "yellow" | "red";
    player: string;
  } | null>(null);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [playerPositions, setPlayerPositions] = useState(FIELD_POSITIONS);
  const [goalCelebrationPending, setGoalCelebrationPending] = useState<{
    home: number;
    away: number;
  } | null>(null);
  const [possession, setPossession] = useState<"home" | "away">("home");
  const [playerWithBall, setPlayerWithBall] = useState<number | null>(null);
  const [ballTrail, setBallTrail] = useState<Array<{ x: number; y: number }>>(
    [],
  );
  const [passStart, setPassStart] = useState<{ x: number; y: number } | null>(
    null,
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animación del tiempo
  useEffect(() => {
    if (isPlaying && currentMinute < 90) {
      intervalRef.current = setInterval(() => {
        setCurrentMinute((prev) => {
          const next = prev + 0.5 * speed;
          if (next >= 90) {
            setIsPlaying(false);
            return 90;
          }
          return next;
        });
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed]);

  // Detectar eventos
  useEffect(() => {
    const newEvents = MATCH_EVENTS.filter(
      (e) =>
        e.minute <= currentMinute &&
        !visibleEvents.find(
          (ve) => ve.minute === e.minute && ve.player === e.player,
        ),
    );

    if (newEvents.length > 0) {
      setVisibleEvents((prev) => [...prev, ...newEvents]);

      // Mostrar el último evento
      const lastNewEvent = newEvents[newEvents.length - 1];
      setLastEvent(lastNewEvent);

      // Actualizar marcador si es gol
      if (lastNewEvent.type === "goal") {
        const [home, away] = lastNewEvent.score?.split("-").map(Number) || [
          0, 0,
        ];
        setScore({ home, away });

        // Determinar qué equipo metió gol
        const isHomeGoal = lastNewEvent.team === "home";
        const goalX = isHomeGoal ? 95 : 5;
        const goalY = 40 + Math.random() * 20; // Variación en altura del gol

        // Actualizar posesión y llevar balón al área para el disparo
        setPossession(lastNewEvent.team as "home" | "away");

        // Posicionar al jugador goleador cerca del área
        setPlayerPositions((prev) => {
          const newPositions = { ...prev };
          const shooterNum =
            lastNewEvent.player === "Santi"
              ? 11
              : lastNewEvent.player === "Lozano"
                ? 22
                : lastNewEvent.player === "Nurkovic"
                  ? 9
                  : lastNewEvent.player === "Quiñones"
                    ? 10
                    : null;

          if (shooterNum) {
            const team = lastNewEvent.team as "home" | "away";
            newPositions[team] = prev[team].map((p: any) =>
              p.num === shooterNum
                ? { ...p, x: isHomeGoal ? 85 : 15, y: goalY }
                : p,
            );
            setPlayerWithBall(shooterNum);
          }
          return newPositions;
        });

        // Pequeña pausa y luego disparo a portería
        setTimeout(() => {
          setBallPosition({ x: goalX, y: goalY });
          setGoalCelebrationPending({ home, away });
        }, 500);
      }

      // Mostrar tarjetas con animación
      if (lastNewEvent.type === "yellow" || lastNewEvent.type === "red") {
        setShowCard({
          type: lastNewEvent.type,
          player: lastNewEvent.player || "Unknown",
        });
        setTimeout(() => setShowCard(null), 2000);
      }

      // Mover balón en eventos de tarjeta roja
      if (lastNewEvent.type === "red") {
        setBallPosition({
          x: 30 + Math.random() * 40,
          y: 30 + Math.random() * 40,
        });
      }
    }
  }, [currentMinute]);

  const handlePlayPause = () => {
    if (currentMinute >= 90) {
      // Reiniciar
      setCurrentMinute(0);
      setScore({ home: 0, away: 0 });
      setVisibleEvents([]);
      setPlayerPositions(FIELD_POSITIONS);
      setBallPosition({ x: 50, y: 50 });
      setGoalCelebrationPending(null);
      setShowCelebration(false);
      setParticles([]);
      setPossession("home");
      setPlayerWithBall(null);
      setBallTrail([]);
      setPassStart(null);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkip = useCallback((direction: "back" | "forward") => {
    if (direction === "back") {
      setCurrentMinute((prev) => Math.max(0, prev - 10));
    } else {
      setCurrentMinute((prev) => Math.min(90, prev + 10));
    }
    // Limpiar trayectoria al saltar
    setBallTrail([]);
    setPassStart(null);
  }, []);

  // Detectar cuando el balón llega a la portería para mostrar celebración
  useEffect(() => {
    if (
      goalCelebrationPending &&
      (ballPosition.x >= 90 || ballPosition.x <= 10)
    ) {
      // El balón llegó a la portería, mostrar celebración
      setShowCelebration(true);

      // Crear partículas de celebración
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: Date.now() + i,
        x: ballPosition.x > 50 ? 90 : 10,
        y: 50 + (Math.random() - 0.5) * 30,
      }));
      setParticles(newParticles);

      // Ocultar celebración después de 3 segundos y resetear posiciones
      setTimeout(() => {
        setShowCelebration(false);
        setParticles([]);
        setGoalCelebrationPending(null);
        // Resetear posición del balón al centro
        setBallPosition({ x: 50, y: 50 });
        // Resetear posiciones de jugadores a iniciales
        setPlayerPositions(FIELD_POSITIONS);
        // Cambiar posesión al equipo que recibe el saque
        setPossession((prev) => (prev === "home" ? "away" : "home"));
        setPlayerWithBall(null);
        // Limpiar trayectoria
        setBallTrail([]);
        setPassStart(null);
      }, 3000);
    }
  }, [ballPosition, goalCelebrationPending]);

  // Simulación realista de juego con pases y progresión mejorada
  useEffect(() => {
    if (isPlaying) {
      const gameInterval = setInterval(() => {
        setPlayerPositions((prev) => {
          const newPositions = { ...prev };
          const attackingTeam = possession;
          // const defendingTeam = possession === 'home' ? 'away' : 'home';
          const isHomeAttacking = attackingTeam === "home";

          // Dirección del ataque (hacia la portería rival)
          const attackDirection = isHomeAttacking ? 1 : -1;
          const goalX = isHomeAttacking ? 95 : 5;

          // Encontrar jugador con balón o asignarlo
          let currentHolder = playerWithBall;
          if (!currentHolder) {
            // Buscar mediocampista o delantero para iniciar jugada
            const starters = prev[attackingTeam].filter((p) => {
              const original = FIELD_POSITIONS[attackingTeam].find(
                (fp) => fp.num === p.num,
              );
              return original && original.x > 35 && original.x < 70;
            });
            currentHolder =
              starters[Math.floor(Math.random() * starters.length)]?.num ||
              prev[attackingTeam][0].num;
            setPlayerWithBall(currentHolder);
          }

          // Posición del jugador con balón
          const holderPos = prev[attackingTeam].find(
            (p) => p.num === currentHolder,
          );
          if (holderPos) {
            // Mover balón suavemente hacia el jugador
            setBallPosition((prevBall) => {
              const distToTarget = Math.sqrt(
                Math.pow(holderPos.x - prevBall.x, 2) +
                  Math.pow(holderPos.y - prevBall.y, 2),
              );
              // Si el balón llegó al destino, limpiar la línea de pase
              if (distToTarget < 3 && passStart) {
                setPassStart(null);
              }
              const newPos = {
                x: prevBall.x + (holderPos.x - prevBall.x) * 0.12,
                y: prevBall.y + (holderPos.y - prevBall.y) * 0.12,
              };
              // Guardar trayectoria (últimas 8 posiciones)
              setBallTrail((prev) => [...prev.slice(-7), newPos]);
              return newPos;
            });

            // Decidir acción: pase o avance
            const distToGoal = Math.abs(holderPos.x - goalX);
            // const distAdvanced = isHomeAttacking ? holderPos.x : 100 - holderPos.x;

            // Probabilidad de pase aumenta con la distancia al gol
            const passProbability = Math.min(0.7, 0.2 + distToGoal / 100);

            if (distToGoal > 20 && Math.random() < passProbability) {
              // Buscar compañero en buena posición
              const teammates = prev[attackingTeam].filter(
                (p) => p.num !== currentHolder,
              );

              // Evaluar mejores opciones de pase
              const passOptions = teammates
                .map((t) => {
                  // const isMoreAdvanced = isHomeAttacking ? t.x > holderPos.x : t.x < holderPos.x;
                  const distFromHolder = Math.sqrt(
                    Math.pow(t.x - holderPos.x, 2) +
                      Math.pow(t.y - holderPos.y, 2),
                  );
                  // Puntuación: más alta = mejor opción
                  const advanceScore = isHomeAttacking ? t.x : 100 - t.x;
                  const spacingScore =
                    Math.max(0, 20 - Math.abs(distFromHolder - 15)) / 20;
                  return {
                    ...t,
                    score: advanceScore * 0.6 + spacingScore * 40,
                    dist: distFromHolder,
                  };
                })
                .filter((t) => t.dist > 8 && t.dist < 30 && t.score > 20);

              if (passOptions.length > 0) {
                // Elegir mejor opción
                const target = passOptions.sort((a, b) => b.score - a.score)[0];
                // Guardar inicio del pase para la trayectoria
                setPassStart({ x: holderPos.x, y: holderPos.y });
                setPlayerWithBall(target.num);
              }
            }
          }

          // Mover jugadores de ambos equipos de forma más realista
          (["home", "away"] as const).forEach((team) => {
            const isAttacking = team === attackingTeam;

            newPositions[team] = prev[team].map((player) => {
              const originalPos = FIELD_POSITIONS[team].find(
                (p) => p.num === player.num,
              );
              if (!originalPos) return player;

              const isBallHolder = player.num === playerWithBall;
              const distToOriginal = Math.sqrt(
                Math.pow(player.x - originalPos.x, 2) +
                  Math.pow(player.y - originalPos.y, 2),
              );

              // Límites según posición original
              const maxRangeX =
                originalPos.pos === "POR"
                  ? 15
                  : originalPos.pos === "DEF"
                    ? 20
                    : originalPos.pos === "MED"
                      ? 30
                      : 40;
              const minX = originalPos.x - maxRangeX;
              const maxX = originalPos.x + maxRangeX;

              if (isAttacking) {
                if (isBallHolder) {
                  // El portador avanza hacia portería pero con control
                  const targetX = Math.min(
                    maxX,
                    player.x + attackDirection * 2,
                  );
                  return {
                    ...player,
                    x: Math.max(minX, targetX),
                    y: Math.max(
                      15,
                      Math.min(85, player.y + (Math.random() - 0.5) * 1.5),
                    ),
                  };
                } else {
                  // Compañeros ofrecen opciones de pase
                  const distToBall = Math.sqrt(
                    Math.pow(player.x - ballPosition.x, 2) +
                      Math.pow(player.y - ballPosition.y, 2),
                  );

                  // Si está muy lejos del balón, avanza un poco
                  if (distToBall > 25) {
                    const targetX = originalPos.x + attackDirection * 5;
                    return {
                      ...player,
                      x: player.x + (targetX - player.x) * 0.08,
                      y: player.y + (originalPos.y - player.y) * 0.05,
                    };
                  }

                  // Volver a posición relativa si se alejó mucho
                  if (distToOriginal > 15) {
                    return {
                      ...player,
                      x: player.x + (originalPos.x - player.x) * 0.03,
                      y: player.y + (originalPos.y - player.y) * 0.03,
                    };
                  }
                }
              } else {
                // Equipo defendiendo
                const distToBall = Math.sqrt(
                  Math.pow(player.x - ballPosition.x, 2) +
                    Math.pow(player.y - ballPosition.y, 2),
                );
                const isDefender =
                  originalPos.pos === "DEF" || originalPos.pos === "POR";

                if (distToBall < 20) {
                  // Presionar al portador
                  const pressIntensity = isDefender ? 0.15 : 0.08;
                  return {
                    ...player,
                    x: Math.max(
                      minX,
                      Math.min(
                        maxX,
                        player.x + (ballPosition.x - player.x) * pressIntensity,
                      ),
                    ),
                    y: Math.max(
                      15,
                      Math.min(
                        85,
                        player.y + (ballPosition.y - player.y) * pressIntensity,
                      ),
                    ),
                  };
                } else if (distToOriginal > 10) {
                  // Recuperar posición defensiva
                  return {
                    ...player,
                    x: player.x + (originalPos.x - player.x) * 0.04,
                    y: player.y + (originalPos.y - player.y) * 0.04,
                  };
                }
              }

              // Pequeña inercia de movimiento
              return {
                ...player,
                x: Math.max(
                  minX,
                  Math.min(maxX, player.x + (Math.random() - 0.5) * 0.3),
                ),
                y: Math.max(
                  15,
                  Math.min(85, player.y + (Math.random() - 0.5) * 0.3),
                ),
              };
            });
          });

          return newPositions;
        });
      }, 1200);
      return () => clearInterval(gameInterval);
    }
  }, [isPlaying, possession, playerWithBall, ballPosition]);

  return (
    <MobileLayout onNavigate={onNavigate} currentView="match">
      {/* Header Principal */}
      <Header points={points} />

      {/* HEADER */}

      {/* EN VIVO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "var(--space-2) var(--space-4)",
        }}
      >
        <div
          style={{
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-black)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "linear-gradient(135deg, #FFE600 0%, #E6CF00 100%)",
            padding: "6px 12px",
            borderRadius: "var(--radius-full)",
            boxShadow:
              "0 4px 12px rgba(255,230,0,0.4), 0 0 20px rgba(255,230,0,0.2)",
            animation: isPlaying ? "pulse 2s ease-in-out infinite" : "none",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              background: "white",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite",
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
          />
          EN VIVO
        </div>
      </div>

      {/* SCORE */}
      <div style={{ padding: "0 var(--space-4) var(--space-4)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "var(--space-2)",
            flexWrap: "nowrap",
          }}
        >
          {/* Local */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
          >
            <img
              src={getFlagUrl(MATCH_DATA.home.flag, 80)}
              alt={MATCH_DATA.home.name}
              style={{
                width: 48,
                height: 32,
                borderRadius: 6,
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                animation: isPlaying ? "pulse 2s ease-in-out infinite" : "none",
              }}
            />
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-black)",
                color: "var(--text-primary)",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                whiteSpace: "nowrap",
              }}
            >
              {MATCH_DATA.home.name}
            </span>
          </div>

          {/* Score con tiempo arriba */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
            }}
          >
            {/* Tiempo */}
            <span
              style={{
                color: "white",
                background: "linear-gradient(135deg, #FFE600 0%, #E6CF00 100%)",
                padding: "4px 12px",
                borderRadius: 8,
                fontWeight: "var(--font-black)",
                boxShadow: "0 2px 8px rgba(255,230,0,0.4)",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              {Math.floor(currentMinute)}'
            </span>
            {/* Marcador */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--bg-secondary)",
                padding: "8px 16px",
                borderRadius: 12,
                border: "2px solid var(--border-primary)",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-4xl)",
                  fontWeight: "var(--font-black)",
                  color: "#FFE600",
                  transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  textShadow: "0 2px 8px rgba(255,230,0,0.3)",
                }}
                key={`home-${score.home}`}
                className="score-number"
              >
                {score.home}
              </span>
              <span
                style={{
                  fontSize: "var(--text-2xl)",
                  color: "var(--text-tertiary)",
                  fontWeight: "var(--font-light)",
                }}
              >
                —
              </span>
              <span
                style={{
                  fontSize: "var(--text-4xl)",
                  fontWeight: "var(--font-black)",
                  color: "#FFFFFF",
                  transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  textShadow: "0 2px 8px rgba(255,255,255,0.2)",
                }}
                key={`away-${score.away}`}
                className="score-number"
              >
                {score.away}
              </span>
            </div>
          </div>

          {/* Visitante */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
          >
            <img
              src={getFlagUrl(MATCH_DATA.away.flag, 80)}
              alt={MATCH_DATA.away.name}
              style={{
                width: 48,
                height: 32,
                borderRadius: 6,
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                animation: isPlaying ? "pulse 2s ease-in-out infinite" : "none",
              }}
            />
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-black)",
                color: "var(--text-primary)",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                whiteSpace: "nowrap",
              }}
            >
              {MATCH_DATA.away.name}
            </span>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
            fontWeight: "var(--font-medium)",
          }}
        >
          {MATCH_DATA.group} · {MATCH_DATA.stadium}
        </div>
      </div>

      {/* CAMPO */}
      <div
        style={{
          padding: "0 var(--space-4)",
          marginBottom: "var(--space-4)",
          position: "relative",
        }}
      >
        {/* Celebración de gol */}
        {showCelebration && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
              background:
                "linear-gradient(135deg, rgba(255,230,0,0.95) 0%, rgba(230,207,0,0.95) 100%)",
              padding: "var(--space-6) var(--space-8)",
              borderRadius: "var(--radius-2xl)",
              textAlign: "center",
              animation:
                "goalCelebration 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              boxShadow:
                "0 20px 60px rgba(255,230,0,0.6), 0 0 0 4px rgba(255,255,255,0.2)",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "var(--space-2)",
                animation: "spin 0.6s ease-in-out",
              }}
            >
              ⚽
            </div>
            <div
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-black)",
                color: "white",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              ¡GOOOOL!
            </div>
            <div
              style={{
                fontSize: "var(--text-lg)",
                color: "rgba(255,255,255,0.95)",
                marginTop: "var(--space-2)",
              }}
            >
              {lastEvent?.player}
            </div>
            <div
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-black)",
                color: "white",
                marginTop: "var(--space-3)",
                animation: "pulse 1s infinite",
              }}
            >
              {lastEvent?.score}
            </div>
          </div>
        )}

        {/* Partículas de celebración */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: "24px",
              animation: "particleFloat 2s ease-out forwards",
              zIndex: 99,
              pointerEvents: "none",
            }}
          >
            {["⚽", "✨", "🎉", "⭐"][Math.floor(Math.random() * 4)]}
          </div>
        ))}

        {/* Tarjetas */}
        {showCard && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
              animation: "cardShow 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            }}
          >
            <div
              style={{
                width: 120,
                height: 180,
                background:
                  showCard.type === "red"
                    ? "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)"
                    : "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                borderRadius: "var(--radius-lg)",
                boxShadow: `0 20px 60px ${showCard.type === "red" ? "rgba(220,38,38,0.6)" : "rgba(251,191,36,0.6)"}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-3)",
                animation: "cardFlip 0.6s ease",
              }}
            >
              <div style={{ fontSize: "48px" }}>
                {showCard.type === "red" ? "🟥" : "🟨"}
              </div>
              <div
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-bold)",
                  color: "white",
                  textAlign: "center",
                  padding: "0 var(--space-2)",
                }}
              >
                {showCard.player}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            position: "relative",
            aspectRatio: "16/10",
            background:
              "linear-gradient(135deg, #1a5f1a 0%, #0d4a0d 25%, #1a5f1a 50%, #0d4a0d 75%, #1a5f1a 100%)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            border: "3px solid #2d8a2d",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), inset 0 0 100px rgba(0,0,0,0.2)",
          }}
        >
          <FieldLines />

          {/* Patrón de césped */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(90deg, transparent 0px, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 80px)",
              pointerEvents: "none",
            }}
          />

          {/* Jugadores */}
          {playerPositions.home.map((player) => (
            <PlayerDot
              key={`home-${player.num}`}
              player={player}
              color={MATCH_DATA.home.color}
              isPlaying={isPlaying}
              hasBall={possession === "home" && playerWithBall === player.num}
            />
          ))}
          {playerPositions.away.map((player) => (
            <PlayerDot
              key={`away-${player.num}`}
              player={player}
              color={MATCH_DATA.away.color}
              isPlaying={isPlaying}
              hasBall={possession === "away" && playerWithBall === player.num}
            />
          ))}

          {/* Trayectoria del balón */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 9,
            }}
          >
            {/* Línea de pase activo */}
            {passStart && playerWithBall && (
              <line
                x1={`${passStart.x}%`}
                y1={`${passStart.y}%`}
                x2={`${ballPosition.x}%`}
                y2={`${ballPosition.y}%`}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            )}
            {/* Trail del balón */}
            {ballTrail.length > 1 && (
              <polyline
                points={ballTrail.map((p) => `${p.x}%,${p.y}%`).join(" ")}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>

          {/* Balón mejorado */}
          <div
            style={{
              position: "absolute",
              left: `${ballPosition.x}%`,
              top: `${ballPosition.y}%`,
              width: 12,
              height: 12,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
              animation: isPlaying
                ? "ballBounce 0.5s ease-in-out infinite"
                : "none",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #ffffff 0%, #e0e0e0 50%, #999999 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
              }}
            >
              ⚽
            </div>
          </div>

          {/* Marcador en campo - Eliminado, ahora está en el score principal */}
        </div>
      </div>

      {/* CONTROLES */}
      <div
        style={{ padding: "0 var(--space-4)", marginBottom: "var(--space-4)" }}
      >
        {/* Botones de velocidad - Solo visibles cuando está reproduciendo */}
        {isPlaying && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
              marginBottom: "var(--space-3)",
              animation: "fadeInDown 0.3s ease",
            }}
          >
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="speed-btn"
                style={{
                  padding: "6px 16px",
                  background:
                    speed === s
                      ? "linear-gradient(135deg, #0047AB 0%, #003380 100%)"
                      : "var(--bg-tertiary)",
                  border:
                    speed === s ? "none" : "1px solid var(--border-primary)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-bold)",
                  color: speed === s ? "white" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow:
                    speed === s ? "0 2px 8px rgba(0,71,171,0.3)" : "none",
                  minWidth: 44,
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        )}

        {/* Botones principales */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-4)",
          }}
        >
          <button
            onClick={() => handleSkip("back")}
            className="control-btn"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "var(--radius-lg)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <SkipBack size={18} />
          </button>

          <button
            onClick={handlePlayPause}
            className="play-btn"
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #FFE600 0%, #E6CF00 100%)",
              border: "none",
              borderRadius: "50%",
              color: "#000000",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              boxShadow: "0 4px 16px rgba(255,230,0,0.4)",
            }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={() => handleSkip("forward")}
            className="control-btn"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "var(--radius-lg)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <SkipForward size={18} />
          </button>
        </div>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            height: 6,
            background: "var(--bg-tertiary)",
            borderRadius: "var(--radius-full)",
            marginBottom: "var(--space-4)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Marcadores de eventos - Solo visibles cuando ocurren */}
          {MATCH_EVENTS.filter((event) => currentMinute >= event.minute).map(
            (event, i) => (
              <div
                key={i}
                className="timeline-event"
                style={{
                  position: "absolute",
                  left: `${(event.minute / 90) * 100}%`,
                  top: -8,
                  transform: "translateX(-50%)",
                  fontSize: "14px",
                  zIndex: 5,
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  animation: "fadeInScale 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateX(-50%) scale(1.4)";
                  e.currentTarget.style.filter =
                    "drop-shadow(0 4px 8px rgba(0,0,0,0.3))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(-50%) scale(1)";
                  e.currentTarget.style.filter = "none";
                }}
              >
                {event.type === "goal"
                  ? "⚽"
                  : event.type === "yellow"
                    ? "🟨"
                    : event.type === "red"
                      ? "🟥"
                      : "🔄"}
              </div>
            ),
          )}
          {/* Progreso */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${(currentMinute / 90) * 100}%`,
              background:
                "linear-gradient(90deg, #FFE600 0%, #0047AB 100%)",
              borderRadius: "var(--radius-full)",
              transition: "width 0.5s ease",
              boxShadow: "0 0 10px rgba(0,71,171,0.4)",
            }}
          />
          {/* Indicador de posición actual */}
          <div
            style={{
              position: "absolute",
              left: `${(currentMinute / 90) * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 14,
              height: 14,
              background: "white",
              border: "3px solid var(--color-primary)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0,200,83,0.6)",
              zIndex: 6,
              transition: "left 0.5s ease",
            }}
          />
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-2)",
          }}
        >
          <TabButton
            icon={<Activity size={16} />}
            label="Eventos"
            isActive={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          />
          <TabButton
            icon={<BarChart3 size={16} />}
            label="Estadísticas"
            isActive={activeTab === "stats"}
            onClick={() => setActiveTab("stats")}
          />
          <TabButton
            icon={<Users size={16} />}
            label="Alineaciones"
            isActive={activeTab === "lineups"}
            onClick={() => setActiveTab("lineups")}
          />
        </div>
      </div>

      {/* CONTENIDO DEL TAB */}
      <div style={{ padding: "0 var(--space-4) var(--space-6)" }}>
        {activeTab === "events" && (
          <EventsTab
            events={visibleEvents}
            currentMinute={currentMinute}
            isPlaying={isPlaying}
          />
        )}
        {activeTab === "stats" && <StatsTab currentMinute={currentMinute} />}
        {activeTab === "lineups" && <LineupsTab />}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes goalCelebration {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(-10deg); }
          50% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes particleFloat {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(0.5) rotate(360deg); }
        }
        @keyframes cardShow {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotateY(-90deg); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotateY(0deg); }
        }
        @keyframes cardFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes ballBounce {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes playerPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes tabSwitch {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scoreChange {
          0% { transform: scale(1); }
          30% { transform: scale(1.3); }
          50% { transform: scale(1.2) rotate(5deg); }
          70% { transform: scale(1.3) rotate(-5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .score-number {
          animation: scoreChange 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .control-btn:hover {
          background: var(--bg-elevated) !important;
          border-color: var(--color-primary) !important;
          color: var(--color-primary) !important;
          transform: scale(1.1);
        }
        .control-btn:active {
          transform: scale(0.95);
        }
        .play-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(255,230,0,0.6) !important;
        }
        .play-btn:active {
          transform: scale(0.95);
        }
        .speed-btn:hover {
          transform: translateY(-2px);
        }
        .speed-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </MobileLayout>
  );
};

// Sub-componentes

function FieldLines() {
  return (
    <>
      {/* Línea central */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 3,
          background: "rgba(255,255,255,0.4)",
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.2)",
        }}
      />
      {/* Círculo central */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 80,
          height: 80,
          border: "3px solid rgba(255,255,255,0.4)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.2)",
        }}
      />
      {/* Punto central */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 8,
          height: 8,
          background: "rgba(255,255,255,0.6)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.4)",
        }}
      />
      {/* Área local */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: 60,
          height: 120,
          border: "3px solid rgba(255,255,255,0.4)",
          borderLeft: "none",
          transform: "translateY(-50%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.2)",
        }}
      />
      {/* Área pequeña local */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: 24,
          height: 60,
          border: "3px solid rgba(255,255,255,0.4)",
          borderLeft: "none",
          transform: "translateY(-50%)",
        }}
      />
      {/* Área visitante */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          width: 60,
          height: 120,
          border: "3px solid rgba(255,255,255,0.4)",
          borderRight: "none",
          transform: "translateY(-50%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.2)",
        }}
      />
      {/* Área pequeña visitante */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          width: 24,
          height: 60,
          border: "3px solid rgba(255,255,255,0.4)",
          borderRight: "none",
          transform: "translateY(-50%)",
        }}
      />
    </>
  );
}

function PlayerDot({
  player,
  color,
  isPlaying,
  hasBall,
}: {
  player: { num: number; name: string; x: number; y: number };
  color: string;
  isPlaying: boolean;
  hasBall?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${player.x}%`,
        top: `${player.y}%`,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1px",
        animation: hasBall
          ? "playerPulse 1s ease-in-out infinite"
          : isPlaying
            ? "playerPulse 2s ease-in-out infinite"
            : "none",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: hasBall ? 15 : 5,
      }}
    >
      <div
        style={{
          width: hasBall ? 18 : 14,
          height: hasBall ? 18 : 14,
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "7px",
          fontWeight: "var(--font-black)",
          color: "white",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          boxShadow: hasBall
            ? `0 0 0 2px white, 0 0 0 4px ${color}, 0 4px 12px rgba(0,0,0,0.4), 0 0 20px ${color}80`
            : `0 3px 6px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.3)`,
          border: hasBall
            ? "2px solid white"
            : "1px solid rgba(255,255,255,0.5)",
          transition: "all 0.3s ease",
        }}
      >
        {player.num}
      </div>
      <span
        style={{
          fontSize: "7px",
          fontWeight: "var(--font-bold)",
          color: "white",
          textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)",
          whiteSpace: "nowrap",
          background: "rgba(0,0,0,0.6)",
          padding: "1px 3px",
          borderRadius: "2px",
          backdropFilter: "blur(4px)",
          opacity: hasBall ? 1 : 0.85,
        }}
      >
        {player.name}
      </span>
      {hasBall && (
        <div
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            background: "white",
            borderRadius: "50%",
            top: -3,
            right: -3,
            boxShadow: "0 0 8px rgba(255,255,255,0.8)",
            animation: "pulse 0.5s infinite",
          }}
        />
      )}
    </div>
  );
}

function TabButton({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="tab-btn"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-1)",
        padding: "var(--space-3)",
        background: isActive
          ? "linear-gradient(135deg, rgba(255,230,0,0.15) 0%, rgba(255,230,0,0.05) 100%)"
          : "var(--bg-tertiary)",
        border: isActive
          ? "2px solid #FFE600"
          : "1px solid var(--border-primary)",
        borderRadius: "var(--radius-lg)",
        cursor: "pointer",
        color: isActive ? "#FFE600" : "var(--text-secondary)",
        fontSize: "var(--text-xs)",
        fontWeight: isActive ? "var(--font-black)" : "var(--font-medium)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isActive
          ? "0 4px 12px rgba(255,230,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "none",
        transform: isActive ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "var(--bg-elevated)";
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "var(--bg-tertiary)";
          e.currentTarget.style.borderColor = "var(--border-primary)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function EventsTab({
  events,
  currentMinute: _currentMinute,
  isPlaying,
}: {
  events: typeof MATCH_EVENTS;
  currentMinute: number;
  isPlaying: boolean;
}) {
  if (events.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "var(--space-8)",
          color: "var(--text-tertiary)",
        }}
      >
        <div
          style={{
            marginBottom: "var(--space-4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isPlaying ? (
            <Clock size={40} style={{ color: "var(--color-primary)" }} />
          ) : (
            <Play
              size={40}
              style={{
                color: "var(--color-primary)",
                fill: "var(--color-primary)",
              }}
            />
          )}
        </div>
        <p>
          {isPlaying
            ? "Esperando eventos..."
            : "Pulsa play para iniciar el partido"}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        animation: "tabSwitch 0.3s ease",
      }}
    >
      {events
        .map((event, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              background:
                event.type === "goal"
                  ? "linear-gradient(90deg, rgba(255,230,0,0.05) 0%, var(--bg-secondary) 100%)"
                  : event.type === "red"
                    ? "linear-gradient(90deg, rgba(220,38,38,0.05) 0%, var(--bg-secondary) 100%)"
                    : "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-3)",
              animation: `slideIn 0.4s ease ${index * 0.05}s backwards`,
              borderLeft:
                event.type === "goal"
                  ? "4px solid #FFE600"
                  : event.type === "red"
                    ? "4px solid var(--color-error)"
                    : event.type === "yellow"
                      ? "4px solid var(--color-warning)"
                      : "4px solid transparent",
              boxShadow:
                event.type === "goal"
                  ? "0 2px 8px rgba(255,230,0,0.1)"
                  : event.type === "red"
                    ? "0 2px 8px rgba(220,38,38,0.1)"
                    : "none",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow =
                event.type === "goal"
                  ? "0 2px 8px rgba(0,200,83,0.1)"
                  : event.type === "red"
                    ? "0 2px 8px rgba(220,38,38,0.1)"
                    : "none";
            }}
          >
            <div
              style={{
                minWidth: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-tertiary)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-black)",
                color: "#0047AB",
              }}
            >
              {event.minute}'
            </div>
            <div
              style={{
                fontSize: "28px",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            >
              {event.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-bold)",
                  color: "var(--text-primary)",
                  marginBottom: "2px",
                }}
              >
                {event.type === "goal"
                  ? `¡Gol de ${event.player}!`
                  : event.type === "yellow"
                    ? `Tarjeta amarilla - ${event.player}`
                    : event.type === "red"
                      ? `Tarjeta roja - ${event.player}`
                      : `Sustitución - Entra: ${event.playerIn}, Sale: ${event.playerOut}`}
              </div>
              {event.score && (
                <div
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "#0047AB",
                    fontWeight: "var(--font-black)",
                    background: "rgba(0,71,171,0.1)",
                    padding: "2px 8px",
                    borderRadius: "var(--radius-sm)",
                    display: "inline-block",
                  }}
                >
                  Marcador: {event.score}
                </div>
              )}
            </div>
            <div
              style={{
                fontSize: "32px",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            >
              {event.team === "home" ? (
                <img
                  src={getFlagUrl(MATCH_DATA.home.flag, 40)}
                  alt={MATCH_DATA.home.name}
                  style={{
                    width: 28,
                    height: 20,
                    borderRadius: 4,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <img
                  src={getFlagUrl(MATCH_DATA.away.flag, 40)}
                  alt={MATCH_DATA.away.name}
                  style={{
                    width: 28,
                    height: 20,
                    borderRadius: 4,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
}

function StatsTab({ currentMinute }: { currentMinute: number }) {
  // Simular estadísticas que cambian con el tiempo
  const stats = {
    possession: {
      home: Math.min(65, 45 + Math.floor(currentMinute / 5)),
      away: 0,
    },
    shots: {
      home: Math.floor(currentMinute / 10) + 2,
      away: Math.floor(currentMinute / 15),
    },
    corners: {
      home: Math.floor(currentMinute / 20),
      away: Math.floor(currentMinute / 25),
    },
    fouls: {
      home: Math.floor(currentMinute / 12),
      away: Math.floor(currentMinute / 10),
    },
    passes: {
      home: Math.floor(currentMinute * 8),
      away: Math.floor(currentMinute * 6),
    },
    saves: {
      home: Math.floor(currentMinute / 18),
      away: Math.floor(currentMinute / 8),
    },
  };
  stats.possession.away = 100 - stats.possession.home;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        animation: "tabSwitch 0.3s ease",
      }}
    >
      <StatRow
        label="Posesión"
        home={stats.possession.home}
        away={stats.possession.away}
        isPercent
        index={0}
      />
      <StatRow
        label="Tiros"
        home={stats.shots.home}
        away={stats.shots.away}
        max={15}
        index={1}
      />
      <StatRow
        label="Córners"
        home={stats.corners.home}
        away={stats.corners.away}
        max={8}
        index={2}
      />
      <StatRow
        label="Faltas"
        home={stats.fouls.home}
        away={stats.fouls.away}
        max={12}
        index={3}
      />
      <StatRow
        label="Pases"
        home={stats.passes.home}
        away={stats.passes.away}
        max={800}
        index={4}
      />
      <StatRow
        label="Paradas"
        home={stats.saves.home}
        away={stats.saves.away}
        max={8}
        index={5}
      />
    </div>
  );
}

function StatRow({
  label,
  home,
  away,
  isPercent,
  max,
  index = 0,
}: {
  label: string;
  home: number;
  away: number;
  isPercent?: boolean;
  max?: number;
  index?: number;
}) {
  const homeDisplay = isPercent ? `${home}%` : home;
  const awayDisplay = isPercent ? `${away}%` : away;
  const homePct = max ? (home / max) * 50 : home;
  const awayPct = max ? (away / max) * 50 : away;

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-3)",
        animation: `slideIn 0.4s ease ${index * 0.08}s backwards`,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "var(--space-2)",
          fontSize: "var(--text-xs)",
          color: "var(--text-tertiary)",
        }}
      >
        <span
          style={{
            fontWeight: "var(--font-black)",
            color: "var(--text-primary)",
            fontSize: "var(--text-sm)",
            background: "rgba(0,71,171,0.1)",
            padding: "2px 8px",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <img
            src={getFlagUrl(MATCH_DATA.home.flag, 40)}
            alt={MATCH_DATA.home.name}
            style={{
              width: 20,
              height: 14,
              borderRadius: 3,
              objectFit: "cover",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />{" "}
          {homeDisplay}
        </span>
        <span
          style={{
            fontWeight: "var(--font-bold)",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontWeight: "var(--font-black)",
            color: "var(--text-primary)",
            fontSize: "var(--text-sm)",
            background: "rgba(251,191,36,0.1)",
            padding: "2px 8px",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {awayDisplay}{" "}
          <img
            src={getFlagUrl(MATCH_DATA.away.flag, 40)}
            alt={MATCH_DATA.away.name}
            style={{
              width: 20,
              height: 14,
              borderRadius: 3,
              objectFit: "cover",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        </span>
      </div>
      <div
        style={{
          height: 8,
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-full)",
          overflow: "hidden",
          display: "flex",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            width: `${homePct}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #FFE600 0%, #0047AB 100%)",
            borderRadius: "var(--radius-full)",
            transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 10px rgba(0,71,171,0.5)",
          }}
        />
        <div style={{ flex: 1 }} />
        <div
          style={{
            width: `${awayPct}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #d97706 0%, var(--color-warning) 100%)",
            borderRadius: "var(--radius-full)",
            transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 10px rgba(251,191,36,0.5)",
          }}
        />
      </div>
    </div>
  );
}

function LineupsTab() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        animation: "tabSwitch 0.3s ease",
      }}
    >
      {/* México */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
          border: "1px solid var(--border-primary)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-4)",
          animation: "slideIn 0.4s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-3)",
            paddingBottom: "var(--space-3)",
            borderBottom: "1px solid var(--border-primary)",
          }}
        >
          <img
            src={getFlagUrl(MATCH_DATA.home.flag, 80)}
            alt={MATCH_DATA.home.name}
            style={{
              width: 40,
              height: 28,
              borderRadius: 4,
              objectFit: "cover",
              display: "block",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "var(--text-md)",
                fontWeight: "var(--font-bold)",
                color: "var(--text-primary)",
              }}
            >
              {MATCH_DATA.home.name}
            </div>
            <div
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
              }}
            >
              {LINEUPS.home.formation} · DT: {LINEUPS.home.coach}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {LINEUPS.home.players
            .filter((p) => p.starter)
            .map((player) => (
              <div
                key={player.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                }}
              >
                <span
                  style={{
                    minWidth: 28,
                    textAlign: "center",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-bold)",
                    color: "var(--color-primary)",
                  }}
                >
                  {player.num}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-primary)",
                    flex: 1,
                  }}
                >
                  {player.name}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-tertiary)",
                    padding: "2px 8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {player.pos}
                </span>
              </div>
            ))}
        </div>
        <div
          style={{
            marginTop: "var(--space-3)",
            paddingTop: "var(--space-3)",
            borderTop: "1px dashed var(--border-primary)",
          }}
        >
          <div
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Suplentes
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}
          >
            {LINEUPS.home.players
              .filter((p) => !p.starter)
              .map((player) => (
                <span
                  key={player.num}
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-secondary)",
                    padding: "4px 8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {player.num} {player.name}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Sudáfrica */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
          border: "1px solid var(--border-primary)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-4)",
          animation: "slideIn 0.4s ease 0.1s backwards",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-3)",
            paddingBottom: "var(--space-3)",
            borderBottom: "1px solid var(--border-primary)",
          }}
        >
          <img
            src={getFlagUrl(MATCH_DATA.away.flag, 80)}
            alt={MATCH_DATA.away.name}
            style={{
              width: 40,
              height: 28,
              borderRadius: 4,
              objectFit: "cover",
              display: "block",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "var(--text-md)",
                fontWeight: "var(--font-bold)",
                color: "var(--text-primary)",
              }}
            >
              {MATCH_DATA.away.name}
            </div>
            <div
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
              }}
            >
              {LINEUPS.away.formation} · DT: {LINEUPS.away.coach}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {LINEUPS.away.players
            .filter((p) => p.starter)
            .map((player) => (
              <div
                key={player.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                }}
              >
                <span
                  style={{
                    minWidth: 28,
                    textAlign: "center",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-bold)",
                    color: "var(--color-warning)",
                  }}
                >
                  {player.num}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-primary)",
                    flex: 1,
                  }}
                >
                  {player.name}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-tertiary)",
                    padding: "2px 8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {player.pos}
                </span>
              </div>
            ))}
        </div>
        <div
          style={{
            marginTop: "var(--space-3)",
            paddingTop: "var(--space-3)",
            borderTop: "1px dashed var(--border-primary)",
          }}
        >
          <div
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Suplentes
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}
          >
            {LINEUPS.away.players
              .filter((p) => !p.starter)
              .map((player) => (
                <span
                  key={player.num}
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-secondary)",
                    padding: "4px 8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {player.num} {player.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

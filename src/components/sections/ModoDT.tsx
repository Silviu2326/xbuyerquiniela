import { useState } from "react";
import { FLAG_MAP } from "../../data/flags";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import "./TacticsMode.css";

interface ModoDTProps {
  onNavigate: (view: string) => void;
  points: number;
}

const TEAMS = Object.entries(FLAG_MAP).map(([name, code]) => ({
  name,
  code,
}));

interface GameQuestion {
  minute: number;
  situation: string;
  options: {
    text: string;
    points: number;
    feedback: string;
  }[];
}

const GAME_QUESTIONS: GameQuestion[] = [
  {
    minute: 15,
    situation:
      "Tu equipo está dominando pero no logra concretos. El rival se defiende con 5 atrás.",
    options: [
      {
        text: "Mantener la táctica y seguir presionando",
        points: 30,
        feedback: "Buena decisión. La paciencia es clave cuando dominas.",
      },
      {
        text: "Cambiar a un esquema más ofensivo 3-4-3",
        points: 50,
        feedback: "¡Excelente! Arriesgar para romper el bloqueo defensivo.",
      },
      {
        text: "Jugar más directo con centros al área",
        points: 20,
        feedback: "Predecible. El rival tiene muchos defensores para despejar.",
      },
    ],
  },
  {
    minute: 35,
    situation:
      "Tu delantero estrella tiene una molestia muscular. El médico dice que puede continuar pero hay riesgo.",
    options: [
      {
        text: "Sustituirlo de inmediato por precaución",
        points: 40,
        feedback: "Decisión prudente. La salud del jugador es primero.",
      },
      {
        text: "Dejarlo hasta el descanso y evaluar",
        points: 50,
        feedback: "¡Perfecto! Balance entre riesgo y necesidad del equipo.",
      },
      {
        text: "Que continúe, es muy importante",
        points: 10,
        feedback: "Arriesgado. Una lesión grave podría costarte más.",
      },
    ],
  },
  {
    minute: 58,
    situation:
      "Vas perdiendo 1-0. Tus volantes están agotados y el equipo no genera ocasiones.",
    options: [
      {
        text: "Hacer un doble cambio: dos atacantes por volantes",
        points: 50,
        feedback: "¡Audaz! Necesitas arriesgar para remontar.",
      },
      {
        text: "Un solo cambio: delantero fresco por volante",
        points: 35,
        feedback: "Conservador pero seguro. Mantienes equilibrio.",
      },
      {
        text: "Esperar hasta el minuto 70 para cambiar",
        points: 15,
        feedback: "Demasiado pasivo. El tiempo se agota.",
      },
    ],
  },
  {
    minute: 75,
    situation:
      "Empatas 1-1. El rival presiona fuerte buscando el gol. Tu defensa está cansada.",
    options: [
      {
        text: "Meter un defensa fresco y cerrar el partido",
        points: 30,
        feedback: "Defensivo pero razonable. Aseguras el empate.",
      },
      {
        text: "Contraatacar: cambiar un defensa por extremo",
        points: 50,
        feedback: "¡Brillante! Aprovechas los espacios que dejan.",
      },
      {
        text: "Mantener todo igual y aguantar",
        points: 25,
        feedback: "Arriesgado sin hacer cambios con jugadores cansados.",
      },
    ],
  },
  {
    minute: 88,
    situation:
      "Ganas 2-1. El rival saca el arquero y ataca con todo. Tienes un contraataque claro.",
    options: [
      {
        text: "Indicar que mantengan la pelota en la esquina",
        points: 30,
        feedback: "Seguro y práctico. Matas el tiempo.",
      },
      {
        text: "Buscar el tercer gol en el arco vacío",
        points: 50,
        feedback: "¡Perfecto! Sentencias el partido definitivamente.",
      },
      {
        text: "Defender el resultado en tu área",
        points: 20,
        feedback: "Innecesario. Desperdicias la superioridad numérica.",
      },
    ],
  },
];

export const ModoDT = ({ onNavigate, points }: ModoDTProps) => {
  const [selectedTeam, setSelectedTeam] = useState<{
    code: string;
    name: string;
  }>({ code: "es", name: "España" });
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">(
    "menu",
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setTotalPoints(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const selectTeam = (code: string, name: string) => {
    setSelectedTeam({ code, name });
  };

  const selectOption = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  };

  const confirmOption = () => {
    if (selectedOption === null) return;
    const points =
      GAME_QUESTIONS[currentQuestion].options[selectedOption].points;
    setTotalPoints(totalPoints + points);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < GAME_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setGameState("finished");
    }
  };

  const resetGame = () => {
    setGameState("menu");
    setCurrentQuestion(0);
    setTotalPoints(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const getPerformanceRating = () => {
    const percentage = (totalPoints / 250) * 100;
    if (percentage >= 90)
      return {
        title: "¡DT Legendario! 🏆",
        color: "#60A5FA",
        description: "Decisiones magistrales. Serías campeón del mundo.",
      };
    if (percentage >= 75)
      return {
        title: "Excelente Estratega 🌟",
        color: "#3B82F6",
        description: "Muy buenas decisiones. Tu equipo confía en ti.",
      };
    if (percentage >= 60)
      return {
        title: "Buen Director Técnico 👍",
        color: "#0ea5e9",
        description: "Decisiones sólidas, aunque hay espacio para mejorar.",
      };
    if (percentage >= 40)
      return {
        title: "DT en Desarrollo 📚",
        color: "#FB923C",
        description:
          "Algunas buenas decisiones, pero necesitas más experiencia.",
      };
    return {
      title: "Necesitas más práctica ⚠️",
      color: "#EF4444",
      description: "Las decisiones no fueron las mejores. ¡Sigue intentando!",
    };
  };

  if (gameState === "playing") {
    const question = GAME_QUESTIONS[currentQuestion];

    return (
      <div className="min-h-screen bg-[#0D0D0D]">
        <div className="w-full px-4 py-6">
          <div className="dt-playing-header">
            <button onClick={resetGame} className="dt-back-btn">
              <span>←</span>
              <span className="hidden sm:inline">Salir</span>
            </button>
            <div className="dt-playing-score">
              <div className="dt-playing-score-label">Puntos</div>
              <div className="dt-playing-score-value">{totalPoints}</div>
            </div>
            <div className="dt-playing-progress">
              <div className="dt-playing-score-label">Decisión</div>
              <div className="dt-playing-progress-value">
                {currentQuestion + 1}/5
              </div>
            </div>
          </div>

          <div className="dt-match-time-banner">
            <div className="dt-match-time-info">
              <div className="dt-match-time-live">
                <div className="dt-match-live-dot" />
                <span className="dt-match-time-value">
                  Min {question.minute}'
                </span>
              </div>
            </div>
            <div className="dt-match-time-team">
              <img
                src={`https://flagcdn.com/w40/${selectedTeam.code}.png`}
                alt={selectedTeam.name}
              />
              <span className="dt-match-time-team-name">
                {selectedTeam.name.substring(0, 3).toUpperCase()}
              </span>
              <span className="dt-match-score-divider">1</span>
              <span className="dt-match-score-divider">-</span>
              <span className="dt-match-score-divider">0</span>
            </div>
          </div>

          <div className="dt-situation-card">
            <div className="dt-situation-header">
              <div className="dt-situation-icon">⚡</div>
              <div>
                <div className="dt-situation-label">Situación del partido</div>
                <p className="dt-situation-text">{question.situation}</p>
              </div>
            </div>
          </div>

          <div className="dt-options-section">
            <h3 className="dt-options-title">¿Qué decides?</h3>
            <div className="dt-options-list">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectOption(index)}
                  disabled={showFeedback}
                  className={`dt-option-btn ${selectedOption === index ? (showFeedback ? "dt-option-btn--correct" : "dt-option-btn--selected") : ""}`}
                >
                  <div className="dt-option-content">
                    <div className="dt-option-radio">
                      {selectedOption === index && (
                        <span className="dt-option-radio-icon">✓</span>
                      )}
                    </div>
                    <div className="dt-option-text">{option.text}</div>
                  </div>
                  {showFeedback && selectedOption === index && (
                    <div className="dt-option-feedback">
                      <div className="dt-option-points">
                        +{option.points} pts
                      </div>
                      <p className="dt-option-feedback-text">
                        {option.feedback}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={showFeedback ? nextQuestion : confirmOption}
            disabled={!showFeedback && selectedOption === null}
            className="dt-action-btn"
          >
            {showFeedback
              ? currentQuestion < GAME_QUESTIONS.length - 1
                ? "SIGUIENTE"
                : "VER RESULTADOS"
              : "CONFIRMAR DECISIÓN"}
          </button>

          <div className="dt-field">
            <div className="dt-field-header">
              <div className="dt-field-title">Formación</div>
              <div className="dt-field-formation">4-3-3</div>
            </div>
            <div className="dt-field-players">
              <div className="dt-field-row">
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">9</div>
                  <span className="dt-field-player-pos">DC</span>
                </div>
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">10</div>
                  <span className="dt-field-player-pos">DC</span>
                </div>
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">7</div>
                  <span className="dt-field-player-pos">EXT</span>
                </div>
              </div>
              <div className="dt-field-row">
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">8</div>
                  <span className="dt-field-player-pos">MC</span>
                </div>
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">6</div>
                  <span className="dt-field-player-pos">MCD</span>
                </div>
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">11</div>
                  <span className="dt-field-player-pos">MC</span>
                </div>
              </div>
              <div className="dt-field-row">
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">2</div>
                  <span className="dt-field-player-pos">LI</span>
                </div>
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">4</div>
                  <span className="dt-field-player-pos">DFC</span>
                </div>
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">5</div>
                  <span className="dt-field-player-pos">DFC</span>
                </div>
                <div className="dt-field-player">
                  <div className="dt-field-player-circle">3</div>
                  <span className="dt-field-player-pos">LD</span>
                </div>
              </div>
              <div className="dt-field-row">
                <div className="dt-field-player">
                  <div className="dt-field-player-circle dt-field-player-circle--gk">
                    1
                  </div>
                  <span className="dt-field-player-pos">POR</span>
                </div>
              </div>
            </div>
            <div className="dt-field-stats">
              <div className="dt-field-stat">
                <div className="dt-field-stat-value">65%</div>
                <div className="dt-field-stat-label">Posesión</div>
              </div>
              <div className="dt-field-stat">
                <div className="dt-field-stat-value">8</div>
                <div className="dt-field-stat-label">Tiros</div>
              </div>
              <div className="dt-field-stat">
                <div className="dt-field-stat-value">{question.minute}'</div>
                <div className="dt-field-stat-label">Min</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    const rating = getPerformanceRating();

    return (
      <div className="min-h-screen bg-[#0D0D0D]">
        <div className="dt-results">
          <div className="dt-results-icon">
            <div className="dt-results-icon-glow" />
            <span className="dt-results-icon-emoji">🏆</span>
          </div>

          <h1 className="dt-results-title">¡Partido Finalizado!</h1>
          <p className="dt-results-subtitle" style={{ color: rating.color }}>
            {rating.title}
          </p>
          <p className="dt-results-description">{rating.description}</p>

          <div className="dt-results-card">
            <div className="dt-results-card-label">Puntuación Final</div>
            <div className="dt-results-card-value">{totalPoints}</div>
            <div className="dt-results-card-max">de 250 puntos posibles</div>
            <div className="dt-results-progress">
              <div
                className="dt-results-progress-fill"
                style={{ width: `${(totalPoints / 250) * 100}%` }}
              />
            </div>
          </div>

          <div className="dt-results-actions">
            <button
              onClick={resetGame}
              className="dt-results-btn dt-results-btn--secondary"
            >
              VOLVER AL MENÚ
            </button>
            <button
              onClick={startGame}
              className="dt-results-btn dt-results-btn--primary"
            >
              JUGAR DE NUEVO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <div className="min-h-screen bg-[#0D0D0D]">
        <Header points={points} />

        <div className="dt-hero">
          <div className="dt-banner-container">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
              alt="Banner"
              className="dt-banner-image"
            />
            <div className="dt-banner-overlay" />
          </div>

          <div className="dt-hero-glow" />

          <button
            onClick={() => onNavigate("dashboard")}
            className="dt-back-btn"
          >
            <span>←</span>
            <span className="hidden sm:inline">Volver</span>
          </button>

          <div className="dt-hero-content">
            <div className="dt-hero-icon">
              <div className="dt-hero-icon-glow" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                <path d="M12 12v10M12 12l10-5M12 12L2 7" />
              </svg>
            </div>

            <h1 className="dt-hero-title">Director Técnico</h1>
            <p className="dt-hero-subtitle">Toma decisiones en tiempo real</p>
            <p className="dt-hero-description">
              Elige la mejor estrategia ante situaciones críticas del partido y
              demuestra tus conocimientos tácticos.
            </p>
          </div>
        </div>

        <div className="w-full px-4 pb-8">
          <div className="dt-match-card">
            <div className="dt-match-header">
              <div className="dt-match-live-dot" />
              <span className="dt-match-live-text">Partido en vivo</span>
            </div>
            <div className="dt-match-teams">
              <div className="dt-match-team">
                <img
                  src={`https://flagcdn.com/w40/${selectedTeam.code}.png`}
                  alt={selectedTeam.name}
                  className="dt-match-team-flag"
                />
                <span className="dt-match-team-name">{selectedTeam.name}</span>
              </div>
              <div className="dt-match-score">
                <span className="dt-match-score-value">1</span>
                <span className="dt-match-score-divider">-</span>
                <span className="dt-match-score-value">0</span>
              </div>
              <div className="dt-match-team">
                <img
                  src="https://flagcdn.com/w40/za.png"
                  alt="Sudáfrica"
                  className="dt-match-team-flag"
                />
                <span className="dt-match-team-name">Sudáfrica</span>
              </div>
            </div>
          </div>

          <div className="dt-team-selection">
            <p className="dt-team-selection-label">Selecciona tu equipo:</p>
            <div className="dt-team-scroll">
              {TEAMS.map((team) => (
                <button
                  key={team.name}
                  onClick={() => selectTeam(team.code, team.name)}
                  className={`dt-team-btn ${selectedTeam.code === team.code ? "dt-team-btn--active" : ""}`}
                >
                  <img
                    src={`https://flagcdn.com/w40/${team.code}.png`}
                    alt={team.name}
                    style={{
                      width: "1.5rem",
                      height: "1rem",
                      objectFit: "cover",
                      borderRadius: "0.25rem",
                    }}
                  />
                  {team.name}
                </button>
              ))}
            </div>
          </div>

          <button onClick={startGame} className="dt-cta-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            EMPEZAR PARTIDO
          </button>

          <div className="dt-stats-grid">
            <div className="dt-stat-card">
              <div className="dt-stat-value">5</div>
              <div className="dt-stat-label">Decisiones</div>
            </div>
            <div className="dt-stat-card">
              <div className="dt-stat-value">250</div>
              <div className="dt-stat-label">Pts máx</div>
            </div>
            <div className="dt-stat-card">
              <div className="dt-stat-value">90'</div>
              <div className="dt-stat-label">Duración</div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

import { useState } from "react";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import "./Micro.css";

interface MicroProps {
  onNavigate: (view: string) => void;
  points: number;
}

interface Answer {
  [key: string]: boolean | null;
}

interface Question {
  category: string;
  icon: string;
  text: string;
  points: number;
}

interface Match {
  id: string;
  team1: string;
  team2: string;
  score: string;
  time: string;
  questions: Question[];
}

const matches: Match[] = [
  {
    id: "1",
    team1: "Argentina",
    team2: "Brasil",
    score: "2-1",
    time: "67'",
    questions: [
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿Gol antes del minuto 70?",
        points: 25,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿Tarjeta amarilla en los próximos 10 minutos?",
        points: 30,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Corner en el segundo tiempo?",
        points: 20,
      },
      {
        category: "ESPECIAL",
        icon: "zap",
        text: "¿Brasil empata el partido?",
        points: 70,
      },
      {
        category: "GOLES",
        icon: "star",
        text: "¿Más de 3.5 goles totales?",
        points: 40,
      },
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿Gol en tiempo añadido?",
        points: 50,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿Expulsión antes del final?",
        points: 60,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Cambio en los próximos 5 minutos?",
        points: 15,
      },
    ],
  },
  {
    id: "2",
    team1: "España",
    team2: "Alemania",
    score: "0-0",
    time: "23'",
    questions: [
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿Gol antes del minuto 30?",
        points: 35,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿Tarjeta amarilla antes del descanso?",
        points: 25,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Tiro al poste o travesaño?",
        points: 55,
      },
      {
        category: "ESPECIAL",
        icon: "zap",
        text: "¿El primer gol será de España?",
        points: 45,
      },
      {
        category: "GOLES",
        icon: "star",
        text: "¿Más de 1.5 goles en el partido?",
        points: 30,
      },
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿Gol antes del descanso?",
        points: 40,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿Más de 3 tarjetas amarillas?",
        points: 35,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Parada espectacular del portero?",
        points: 50,
      },
    ],
  },
  {
    id: "3",
    team1: "Francia",
    team2: "Inglaterra",
    score: "1-2",
    time: "81'",
    questions: [
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿Gol en los últimos 10 minutos?",
        points: 60,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿Tarjeta roja en el partido?",
        points: 70,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Francia remonta el partido?",
        points: 80,
      },
      {
        category: "ESPECIAL",
        icon: "zap",
        text: "¿Habrá tiempo añadido mayor a 5 minutos?",
        points: 40,
      },
      {
        category: "GOLES",
        icon: "star",
        text: "¿Más de 3.5 goles totales?",
        points: 50,
      },
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿Gol de penalti?",
        points: 55,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿VAR en los últimos minutos?",
        points: 45,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Celebración polémica?",
        points: 35,
      },
    ],
  },
  {
    id: "4",
    team1: "Portugal",
    team2: "Uruguay",
    score: "3-1",
    time: "90+2'",
    questions: [
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿Gol en tiempo de descuento?",
        points: 65,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿Tarjeta en tiempo añadido?",
        points: 40,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Uruguay descuenta antes del final?",
        points: 75,
      },
      {
        category: "ESPECIAL",
        icon: "zap",
        text: "¿Portugal anota el cuarto?",
        points: 55,
      },
      {
        category: "GOLES",
        icon: "star",
        text: "¿Más de 4.5 goles totales?",
        points: 60,
      },
      {
        category: "TIEMPO",
        icon: "clock",
        text: "¿El partido termina 3-1?",
        points: 30,
      },
      {
        category: "DISCIPLINA",
        icon: "alert",
        text: "¿Amonestación por pérdida de tiempo?",
        points: 35,
      },
      {
        category: "EVENTO",
        icon: "target",
        text: "¿Sustitución de urgencia?",
        points: 45,
      },
    ],
  },
];

export const Micro = ({ onNavigate, points }: MicroProps) => {
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id);
  const [answers, setAnswers] = useState<Answer>({});

  const selectedMatch =
    matches.find((m) => m.id === selectedMatchId) || matches[0];

  const handleAnswer = (questionIndex: number, value: boolean) => {
    const key = `${selectedMatchId}-${questionIndex}`;
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const answeredCount = Object.keys(answers).filter(
    (key) => key.startsWith(selectedMatchId) && answers[key] !== null,
  ).length;

  const handleMatchChange = (matchId: string) => {
    setSelectedMatchId(matchId);
  };

  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <Header points={points} />
      <div className="min-h-screen bg-[#0a0f1a]">
        {/* Header Visual */}
        <div className="relative pt-32 pb-16 px-6 overflow-hidden">
          {/* Banner Image */}
          <div className="stories-banner-container">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
              alt="Micro Predicciones Banner"
              className="stories-banner-image"
            />
            <div className="stories-banner-overlay" />
          </div>

          {/* Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#FFE600]/5 blur-[120px] pointer-events-none z-[2]" />

          {/* Floating Back Button */}
          <div className="max-w-4xl mx-auto relative z-10">
            <button
              onClick={() => onNavigate("dashboard")}
              className="absolute left-0 top-0 group flex items-center gap-2 text-[#6B7A99] hover:text-[#FFE600] transition-all duration-300 z-20"
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              <div className="w-14 h-14 rounded-full bg-[#141c32] border border-[#2D3A5F] flex items-center justify-center group-hover:border-[#FFE600]/30 group-hover:bg-[#FFE600]/5 transition-all">
                <span className="text-2xl">←</span>
              </div>
              <span className="hidden md:block text-xs font-bold tracking-widest uppercase">
                Volver
              </span>
            </button>

            {/* Hero Content */}
            <div className="stories-hero-content flex flex-col items-center text-center relative">
              {/* Main Icon */}
              <div className="stories-hero-icon relative">
                <div className="absolute inset-[-2px] bg-[#FFE600] blur-lg opacity-10" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#1c2640] to-[#141c32] border-2 border-[#FFE600] flex items-center justify-center shadow-[0_0_20px_rgba(255,230,0,0.15)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-[#FFE600]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
              </div>

              {/* Title & Description */}
              <div className="stories-hero-title-section max-w-2xl">
                <h1 className="stories-hero-title text-4xl md:text-5xl font-black text-white tracking-tight leading-none uppercase">
                  Micro-Predicciones
                </h1>
                <p className="stories-hero-subtitle text-[#FFE600] text-lg font-bold tracking-wide">
                  Apuesta en vivo minuto a minuto
                </p>
                <p className="stories-hero-description text-[#6B7A99] text-sm max-w-xl mx-auto leading-relaxed">
                  Predice eventos específicos durante el partido. Gana puntos
                  respondiendo preguntas en tiempo real sobre lo que sucederá a
                  continuación.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-5 sm:px-6 pb-24 mt-6">
          {/* Selector de Partido */}
          <div className="micro-selector-section">
            <p className="stories-section-label">Selecciona partido en vivo:</p>
            <select
              value={selectedMatchId}
              onChange={(e) => handleMatchChange(e.target.value)}
              className="micro-match-select"
            >
              {matches.map((match) => (
                <option key={match.id} value={match.id}>
                  {match.team1} vs {match.team2}
                </option>
              ))}
            </select>
          </div>

          <div className="micro-stats-bar">
            <p className="text-[#6B7A99] text-xs font-bold uppercase tracking-wider">
              Respondidas
            </p>
            <p className="text-[#FFE600] text-lg font-black">
              {answeredCount}/{selectedMatch.questions.length}
            </p>
          </div>

          {/* Preguntas dinámicas */}
          <div className="micro-questions-container">
            {selectedMatch.questions.map((question, index) => {
              const answerKey = `${selectedMatchId}-${index}`;
              const getIcon = () => {
                switch (question.icon) {
                  case "clock":
                    return (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    );
                  case "alert":
                    return (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    );
                  case "target":
                    return (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    );
                  case "zap":
                    return (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    );
                  case "star":
                    return (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              return (
                <div key={index} className="micro-question-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[#FFE600] text-[11px] font-bold uppercase tracking-wide">
                      {getIcon()}
                      <span className="hidden sm:inline">
                        {question.category}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 bg-[#FFE600]/10 border border-[#FFE600]/20 rounded-full text-[#FFE600] text-[11px] font-black">
                      +{question.points}pts
                    </span>
                  </div>
                  <p className="text-white font-bold text-[15px] mb-5 leading-relaxed">
                    {question.text}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                        answers[answerKey] === true
                          ? "bg-gradient-to-r from-[#FFE600] to-[#0047AB] text-black shadow-[0_0_15px_rgba(255,230,0,0.4)]"
                          : "bg-[#141c32] border border-[#2D3A5F] text-white hover:border-[#FFE600]/50"
                      }`}
                      onClick={() => handleAnswer(index, true)}
                    >
                      ✓ Sí
                    </button>
                    <button
                      className={`py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                        answers[answerKey] === false
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                          : "bg-[#141c32] border border-[#2D3A5F] text-white hover:border-[#FFE600]/50"
                      }`}
                      onClick={() => handleAnswer(index, false)}
                    >
                      ✗ No
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

import { useState } from 'react';
import { FLAG_MAP } from '../../data/flags';
import { Header } from '../home/Header';
import { MobileLayout } from '../../features/fantasy/presentation/shared/MobileLayout';
import './TacticsMode.css';

interface TacticsModeProps {
  onNavigate: (view: string) => void;
  points: number;
}

const TEAMS = Object.entries(FLAG_MAP).map(([name, code]) => ({
  name,
  code
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
    situation: "Tu equipo está dominando pero no logra concretar. El rival se defiende con 5 atrás.",
    options: [
      { text: "Mantener la táctica y seguir presionando", points: 30, feedback: "Buena decisión. La paciencia es clave cuando dominas." },
      { text: "Cambiar a un esquema más ofensivo 3-4-3", points: 50, feedback: "¡Excelente! Arriesgar para romper el bloqueo defensivo." },
      { text: "Jugar más directo con centros al área", points: 20, feedback: "Predecible. El rival tiene muchos defensores para despejar." }
    ]
  },
  {
    minute: 35,
    situation: "Tu delantero estrella tiene una molestia muscular. El médico dice que puede continuar pero hay riesgo.",
    options: [
      { text: "Sustituirlo de inmediato por precaución", points: 40, feedback: "Decisión prudente. La salud del jugador es primero." },
      { text: "Dejarlo hasta el descanso y evaluar", points: 50, feedback: "¡Perfecto! Balance entre riesgo y necesidad del equipo." },
      { text: "Que continúe, es muy importante", points: 10, feedback: "Arriesgado. Una lesión grave podría costarte más." }
    ]
  },
  {
    minute: 58,
    situation: "Vas perdiendo 1-0. Tus volantes están agotados y el equipo no genera ocasiones.",
    options: [
      { text: "Hacer un doble cambio: dos atacantes por volantes", points: 50, feedback: "¡Audaz! Necesitas arriesgar para remontar." },
      { text: "Un solo cambio: delantero fresco por volante", points: 35, feedback: "Conservador pero seguro. Mantienes equilibrio." },
      { text: "Esperar hasta el minuto 70 para cambiar", points: 15, feedback: "Demasiado pasivo. El tiempo se agota." }
    ]
  },
  {
    minute: 75,
    situation: "Empatas 1-1. El rival presiona fuerte buscando el gol. Tu defensa está cansada.",
    options: [
      { text: "Meter un defensa fresco y cerrar el partido", points: 30, feedback: "Defensivo pero razonable. Aseguras el empate." },
      { text: "Contraatacar: cambiar un defensa por extremo", points: 50, feedback: "¡Brillante! Aprovechas los espacios que dejan." },
      { text: "Mantener todo igual y aguantar", points: 25, feedback: "Arriesgado sin hacer cambios con jugadores cansados." }
    ]
  },
  {
    minute: 88,
    situation: "Ganas 2-1. El rival saca el arquero y ataca con todo. Tienes un contraataque claro.",
    options: [
      { text: "Indicar que mantengan la pelota en la esquina", points: 30, feedback: "Seguro y práctico. Matas el tiempo." },
      { text: "Buscar el tercer gol en el arco vacío", points: 50, feedback: "¡Perfecto! Sentencias el partido definitivamente." },
      { text: "Defender el resultado en tu área", points: 20, feedback: "Innecesario. Desperdicias la superioridad numérica." }
    ]
  }
];

export const TacticsMode = ({ onNavigate, points }: TacticsModeProps) => {
  const [selectedTeam, setSelectedTeam] = useState('España');
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setTotalPoints(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const selectOption = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  };

  const confirmOption = () => {
    if (selectedOption === null) return;
    const points = GAME_QUESTIONS[currentQuestion].options[selectedOption].points;
    setTotalPoints(totalPoints + points);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < GAME_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentQuestion(0);
    setTotalPoints(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const getPerformanceRating = () => {
    const percentage = (totalPoints / 250) * 100;
    if (percentage >= 90) return { title: "¡Director Técnico Legendario! 🏆", color: "text-yellow-400", description: "Decisiones magistrales. Serías campeón del mundo." };
    if (percentage >= 75) return { title: "Excelente Estratega 🌟", color: "text-[#00E676]", description: "Muy buenas decisiones. Tu equipo confía en ti." };
    if (percentage >= 60) return { title: "Buen Director Técnico 👍", color: "text-blue-400", description: "Decisiones sólidas, aunque hay espacio para mejorar." };
    if (percentage >= 40) return { title: "DT en Desarrollo 📚", color: "text-orange-400", description: "Algunas buenas decisiones, pero necesitas más experiencia." };
    return { title: "Necesitas más práctica ⚠️", color: "text-red-400", description: "Las decisiones no fueron las mejores. ¡Sigue intentando!" };
  };

  if (gameState === 'playing') {
    const question = GAME_QUESTIONS[currentQuestion];

    return (
      <div className="min-h-screen bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 pt-8 px-4">
            <button
              onClick={resetGame}
              className="group flex items-center gap-3 text-gray-400 hover:text-[#00E676] transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#141414] border border-[#252525] flex items-center justify-center group-hover:border-[#00E676]/30 transition-all">
                <span className="text-xl">←</span>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">Salir</span>
            </button>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Puntuación</div>
                <div className="text-[#00E676] text-2xl font-black leading-none">{totalPoints}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Decisión</div>
                <div className="text-white text-2xl font-black leading-none">{currentQuestion + 1}/5</div>
              </div>
            </div>
          </div>

          {/* Match Time */}
          <div className="bg-gradient-to-r from-[#141414] to-[#0D0D0D] border border-[#252525] rounded-2xl p-6 mb-8 mx-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white font-black text-xl">Minuto {question.minute}'</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-[#1a1a1a] rounded-xl border border-[#252525]">
                <img
                  src={`https://flagcdn.com/w40/${FLAG_MAP[selectedTeam]}.png`}
                  alt={selectedTeam}
                  className="w-8 h-6 rounded object-cover shadow-sm"
                />
                <span className="text-white font-bold text-lg">
                  {selectedTeam.substring(0, 3).toUpperCase()} 1-0
                </span>
              </div>
            </div>
          </div>

          {/* Situation Card */}
          <div className="tactics-situation-card bg-gradient-to-br from-[#1a3a2e] to-[#0a1f19] border-2 border-[#00E676]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,230,118,0.15)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00E676]/20 border border-[#00E676]/50 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[#00E676] text-xs font-bold uppercase tracking-wider mb-2">Situación del partido</h3>
                <p className="text-white text-lg font-bold leading-relaxed">{question.situation}</p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="tactics-options-section">
            <h3 className="tactics-options-title text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] text-center">¿Qué decides?</h3>
            <div className="tactics-options-list">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectOption(index)}
                  disabled={showFeedback}
                  className={`tactics-option-button text-left p-7 rounded-2xl border-2 transition-all duration-300 ${selectedOption === index
                    ? showFeedback
                      ? 'bg-[#00E676]/10 border-[#00E676] shadow-[0_0_30px_rgba(0,230,118,0.3)]'
                      : 'bg-[#00E676]/10 border-[#00E676] scale-[1.02]'
                    : 'bg-[#141414] border-[#252525] hover:border-[#00E676]/50 hover:bg-[#1a1a1a]'
                    } ${showFeedback && selectedOption !== index ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${selectedOption === index
                      ? 'border-[#00E676] bg-[#00E676]'
                      : 'border-[#252525]'
                      }`}>
                      {selectedOption === index && <span className="text-black text-lg font-bold">✓</span>}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-lg leading-relaxed">{option.text}</p>
                      {showFeedback && selectedOption === index && (
                        <div className="mt-5 pt-5 border-t border-[#00E676]/30">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#00E676] font-black text-2xl">+{option.points} pts</span>
                          </div>
                          <p className="text-gray-300 text-base leading-relaxed">{option.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="tactics-action-button-container">
            {!showFeedback ? (
              <button
                onClick={confirmOption}
                disabled={selectedOption === null}
                className={`w-full py-6 rounded-2xl font-black text-lg transition-all duration-300 ${selectedOption !== null
                  ? 'bg-gradient-to-r from-[#00E676] to-[#00B359] hover:from-[#00B359] hover:to-[#00E676] text-black hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] hover:scale-105'
                  : 'bg-[#252525] text-gray-600 cursor-not-allowed'
                  }`}
              >
                CONFIRMAR DECISIÓN
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-[#00E676] to-[#00B359] hover:from-[#00B359] hover:to-[#00E676] text-black font-black text-lg py-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] hover:scale-105"
              >
                {currentQuestion < GAME_QUESTIONS.length - 1 ? 'SIGUIENTE DECISIÓN →' : 'VER RESULTADOS 🏆'}
              </button>
            )}
          </div>

          {/* Football Field Visualization */}
          <div className="mt-12 px-4">
            <div className="bg-gradient-to-br from-[#1a4d2e]/30 to-[#0f2818]/30 border-2 border-[#00E676]/20 rounded-3xl p-8 relative overflow-hidden">
              {/* Field Lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/40 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-32 border-2 border-white/40 border-l-0" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-32 border-2 border-white/40 border-r-0" />
              </div>

              {/* Formation Title */}
              <div className="text-center mb-8 relative z-10">
                <h4 className="text-[#00E676] text-xs font-bold uppercase tracking-wider mb-2">Formación Táctica</h4>
                <p className="text-white text-2xl font-black">4-3-3</p>
              </div>

              {/* Players Formation */}
              <div className="relative z-10 space-y-8">
                {/* Delanteros */}
                <div className="flex justify-around items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">9</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">DC</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">10</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">MC</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">7</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">EXT</span>
                  </div>
                </div>

                {/* Mediocampistas */}
                <div className="flex justify-around items-center px-8">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">8</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">MC</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">6</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">MCD</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">11</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">MC</span>
                  </div>
                </div>

                {/* Defensas */}
                <div className="flex justify-around items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">2</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">LI</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">4</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">DFC</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">5</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">DFC</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00E676] border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-xs font-black">3</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">LD</span>
                  </div>
                </div>

                {/* Portero */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-black text-sm font-black">1</span>
                    </div>
                    <span className="text-white text-[10px] font-bold mt-1">POR</span>
                  </div>
                </div>
              </div>

              {/* Stats Banner */}
              <div className="mt-8 pt-6 border-t border-[#00E676]/20 relative z-10">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-[#00E676] text-xl font-black mb-1">65%</div>
                    <div className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Posesión</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#00E676] text-xl font-black mb-1">8</div>
                    <div className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Tiros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#00E676] text-xl font-black mb-1">Min {question.minute}'</div>
                    <div className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Tiempo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const rating = getPerformanceRating();

    return (
      <div className="min-h-screen bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Results Header */}
          <div className="text-center mb-16 mt-8">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#00E676] blur-3xl opacity-20 animate-pulse" />
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[#1a3a2e] to-[#0a1f19] border-4 border-[#00E676]/30 flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(0,230,118,0.3)]">
                <span className="text-7xl">🏆</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">¡Partido Finalizado!</h1>
            <p className={`text-3xl font-bold mb-3 ${rating.color}`}>{rating.title}</p>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">{rating.description}</p>
          </div>

          {/* Score Card */}
          <div className="bg-gradient-to-br from-[#141414] to-[#0D0D0D] border-2 border-[#00E676]/30 rounded-3xl p-10 mb-10 shadow-[0_0_50px_rgba(0,230,118,0.15)]">
            <div className="text-center">
              <div className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-6">Puntuación Final</div>
              <div className="text-[#00E676] text-8xl font-black mb-6">{totalPoints}</div>
              <div className="text-gray-500 text-xl mb-8">de 250 puntos posibles</div>

              <div className="mt-8 bg-[#1a1a1a] rounded-full h-5 overflow-hidden border border-[#252525]">
                <div
                  className="h-full bg-gradient-to-r from-[#00E676] to-[#00B359] transition-all duration-1000 rounded-full shadow-[0_0_20px_rgba(0,230,118,0.5)]"
                  style={{ width: `${(totalPoints / 250) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Decisions Summary */}
          <div className="bg-[#141414] border border-[#252525] rounded-2xl p-8 mb-10">
            <h3 className="text-white font-bold text-xl mb-6">Resumen de Decisiones</h3>
            <div className="space-y-4">
              {GAME_QUESTIONS.map((q, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-[#1a1a1a] rounded-xl border border-[#252525] hover:border-[#00E676]/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#00E676]/20 border border-[#00E676]/50 flex items-center justify-center">
                      <span className="text-[#00E676] text-sm font-bold">{q.minute}'</span>
                    </div>
                    <span className="text-gray-300 text-base font-medium">Decisión {index + 1}</span>
                  </div>
                  <span className="text-[#00E676] font-bold text-xl">✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={resetGame}
              className="bg-[#141414] border-2 border-[#252525] hover:border-[#00E676]/50 text-white font-black text-lg py-6 rounded-2xl transition-all duration-300 hover:bg-[#1a1a1a]"
            >
              VOLVER AL MENÚ
            </button>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-[#00E676] to-[#00B359] hover:from-[#00B359] hover:to-[#00E676] text-black font-black text-lg py-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] hover:scale-105"
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
        {/* Header Principal */}
        <Header points={points} />

      {/* Header Visual */}
      <div className="relative pb-16 px-6 overflow-hidden">
        {/* Banner Image */}
        <div className="tactics-banner-container">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
            alt="Tactics Mode Banner"
            className="tactics-banner-image"
          />
          <div className="tactics-banner-overlay" />
        </div>

        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00E676]/5 blur-[120px] pointer-events-none z-[2]" />

        {/* Floating Back Button */}
        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={() => onNavigate('dashboard')}
            className="absolute left-0 top-0 group flex items-center gap-2 text-gray-400 hover:text-[#00E676] transition-all duration-300 z-20"
            style={{ marginLeft: '20px', marginTop: '10px' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#252525] flex items-center justify-center group-hover:border-[#00E676]/30 group-hover:bg-[#00E676]/5 transition-all">
              <span className="text-2xl">←</span>
            </div>
            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Volver</span>
          </button>

          {/* Hero Content */}
          <div className="tactics-hero-content flex flex-col items-center text-center relative">
            {/* Main Icon */}
            <div className="tactics-hero-icon relative">
              <div className="absolute inset-0 bg-[#00E676] blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1a3a2e] to-[#0a1f19] border-2 border-[#00E676]/30 flex items-center justify-center shadow-[0_0_50px_rgba(0,230,118,0.2)]">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#00E676] fill-none stroke-current stroke-2">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                  <path d="M12 12v10M12 12l10-5M12 12L2 7" />
                </svg>
              </div>
            </div>

            {/* Title & Description */}
            <div className="tactics-hero-title-section max-w-2xl">
              <h1 className="tactics-hero-title text-4xl md:text-5xl font-black text-white tracking-tight leading-none uppercase">
                Director Técnico
              </h1>
              <p className="tactics-hero-subtitle text-[#00E676] text-lg font-bold tracking-wide">
                Toma decisiones en tiempo real
              </p>
              <p className="tactics-hero-description text-gray-500 text-sm max-w-xl mx-auto">
                Elige la mejor estrategia ante situaciones críticas del partido y demuestra tus conocimientos tácticos bajo presión.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20 mt-12">
        {/* Live Match Card */}
        <div className="tactics-menu-match-card bg-gradient-to-br from-[#141414] to-[#0D0D0D] border border-[#252525] rounded-3xl">
          <div className="tactics-menu-match-header flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse" />
            <span className="text-[#00E676] text-xs font-bold uppercase tracking-widest">Partido en vivo</span>
          </div>

          <div className="tactics-menu-match-score flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <img
                src={`https://flagcdn.com/w80/${FLAG_MAP[selectedTeam]}.png`}
                alt={selectedTeam}
                className="w-14 h-10 rounded object-cover shadow-lg"
              />
              <span className="text-white font-black text-sm uppercase tracking-tighter">{selectedTeam}</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-[#1a1a1a] rounded-2xl border border-[#252525] shadow-inner">
              <span className="text-white font-black text-4xl">1</span>
              <span className="text-gray-600 font-bold">-</span>
              <span className="text-white font-black text-4xl">0</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="https://flagcdn.com/w80/za.png"
                alt="Sudáfrica"
                className="w-14 h-10 rounded object-cover shadow-lg"
              />
              <span className="text-white font-black text-sm uppercase tracking-tighter text-center">Sudáfrica</span>
            </div>
          </div>
        </div>

        {/* Team Selection */}
        <div className="tactics-menu-team-section">
          <p className="tactics-menu-team-label text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Selecciona tu equipo:</p>
          <div className="tactics-menu-team-scroll flex overflow-x-auto gap-3 no-scrollbar scrollbar-hide" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
            {TEAMS.map((team) => (
              <button
                key={team.name}
                onClick={() => setSelectedTeam(team.name)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all shrink-0 ${selectedTeam === team.name
                  ? 'bg-[#00E676]/10 border-[#00E676] text-white'
                  : 'bg-[#141414] border-[#252525] text-gray-400 hover:border-[#00E676]/50'
                  }`}
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={`https://flagcdn.com/w40/${team.code}.png`}
                  alt={team.name}
                  className="w-8 h-6 rounded object-cover shadow-sm"
                />
                <span className="font-bold whitespace-nowrap">{team.name}</span>
              </button>
            ))}
          </div>

          {/* Scroll Indicator (optional but helpful) */}
          <div className="flex justify-center mt-2 md:hidden">
            <div className="flex gap-1">
              <div className="w-12 h-1 bg-[#252525] rounded-full overflow-hidden">
                <div className="h-full bg-[#00E676]/30 w-1/3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="tactics-menu-cta-container">
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-[#00E676] to-[#00B359] hover:from-[#00B359] hover:to-[#00E676] text-black font-black text-lg py-5 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M6 4h4v4H6V4zm0 6h4v4H6v-4zm0 6h4v4H6v-4zm6-12h4v4h-4V4zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4z" />
            </svg>
            EMPEZAR PARTIDO
          </button>
        </div>

        {/* Stats Cards */}
        <div className="tactics-menu-stats-grid grid grid-cols-3">
          <div className="tactics-menu-stat-card bg-[#141414] border border-[#252525] rounded-2xl text-center hover:border-[#00E676]/30 transition-colors">
            <div className="text-[#00E676] font-black text-2xl mb-1">5</div>
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-wider">Decisiones</div>
          </div>
          <div className="tactics-menu-stat-card bg-[#141414] border border-[#252525] rounded-2xl text-center hover:border-[#00E676]/30 transition-colors">
            <div className="text-[#00E676] font-black text-2xl mb-1">250</div>
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-wider">Pts máx</div>
          </div>
          <div className="tactics-menu-stat-card bg-[#141414] border border-[#252525] rounded-2xl text-center hover:border-[#00E676]/30 transition-colors">
            <div className="text-[#00E676] font-black text-2xl mb-1">90'</div>
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-wider">Duración</div>
          </div>
        </div>
      </div>
      </div>
    </MobileLayout>
    );
  };
import { useState } from 'react';
import { Header } from '../home/Header';
import { MobileLayout } from '../../features/fantasy/presentation/shared/MobileLayout';
import './Stories.css';

interface StoriesProps {
  onNavigate: (view: string) => void;
  points: number;
}

interface Match {
  id: number;
  name: string;
  homeTeam: string;
  awayTeam: string;
  homeCode: string;
  awayCode: string;
  homeShort: string;
  awayShort: string;
}

const AVAILABLE_MATCHES: Match[] = [
  { id: 1, name: 'México vs Sudáfrica', homeTeam: 'México', awayTeam: 'Sudáfrica', homeCode: 'mx', awayCode: 'za', homeShort: 'MX', awayShort: 'ZA' },
  { id: 2, name: 'Corea del Sur vs Por definir (A)', homeTeam: 'Corea del Sur', awayTeam: 'Por definir (A)', homeCode: 'kr', awayCode: 'gb', homeShort: 'KR', awayShort: 'TBD' },
  { id: 3, name: 'Brasil vs Marruecos', homeTeam: 'Brasil', awayTeam: 'Marruecos', homeCode: 'br', awayCode: 'ma', homeShort: 'BR', awayShort: 'MA' },
  { id: 4, name: 'Argentina vs España', homeTeam: 'Argentina', awayTeam: 'España', homeCode: 'ar', awayCode: 'es', homeShort: 'AR', awayShort: 'ES' },
  { id: 5, name: 'Francia vs Alemania', homeTeam: 'Francia', awayTeam: 'Alemania', homeCode: 'fr', awayCode: 'de', homeShort: 'FR', awayShort: 'DE' },
];

type Theme = 'classic' | 'fire' | 'gold' | 'ice';

export const Stories = ({ onNavigate, points }: StoriesProps) => {
  const [selectedMatch, setSelectedMatch] = useState<Match>(AVAILABLE_MATCHES[0]);
  const [homeScore, setHomeScore] = useState(2);
  const [awayScore, setAwayScore] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState<Theme>('classic');
  const [showPreview, setShowPreview] = useState(false);

  const incrementScore = (team: 'home' | 'away') => {
    if (team === 'home' && homeScore < 9) {
      setHomeScore(homeScore + 1);
    } else if (team === 'away' && awayScore < 9) {
      setAwayScore(awayScore + 1);
    }
  };

  const decrementScore = (team: 'home' | 'away') => {
    if (team === 'home' && homeScore > 0) {
      setHomeScore(homeScore - 1);
    } else if (team === 'away' && awayScore > 0) {
      setAwayScore(awayScore - 1);
    }
  };

  const generateStory = () => {
    setShowPreview(true);
  };

  const getThemeColors = () => {
    switch (selectedTheme) {
      case 'classic':
        return { border: '#FFE600', text: '#FFE600', bg: 'rgba(255, 230, 0, 0.1)' };
      case 'fire':
        return { border: '#EF4444', text: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' };
      case 'gold':
        return { border: '#EAB308', text: '#EAB308', bg: 'rgba(234, 179, 8, 0.1)' };
      case 'ice':
        return { border: '#FFE600', text: '#FFE600', bg: 'rgba(0, 71, 171, 0.1)' };
    }
  };

  const handleShare = () => {
    alert('Función de compartir próximamente');
  };

  const handleCopy = () => {
    alert('Predicción copiada al portapapeles');
  };

  const handleSave = () => {
    alert('Story guardada exitosamente');
  };

  if (showPreview) {
    const themeColors = getThemeColors();

    return (
      <MobileLayout onNavigate={onNavigate} currentView="dashboard">
        <Header points={points} />
        <div className="min-h-screen bg-[#0D0D0D]">
          <div className="stories-preview-container">
          {/* Header */}
          <div className="stories-preview-header">
            <div className="stories-preview-icon rounded-3xl bg-gradient-to-br from-[#1a3a2e] to-[#0a1f19] border-2 border-[#FFE600]/30">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#FFE600]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <h1 className="stories-preview-title">Stories de Predicción</h1>
            <p className="stories-preview-subtitle">Crea contenido para compartir tu predicción</p>
          </div>

          {/* Story Preview Card */}
          <div
            className="stories-preview-card-wrapper"
            style={{ background: `linear-gradient(135deg, ${themeColors.border}, ${themeColors.border}dd)` }}
          >
            <div className="stories-preview-card bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
              {/* Badge */}
              <div className="stories-preview-badge">
                <span
                  className="stories-preview-badge-text"
                  style={{ color: themeColors.text, backgroundColor: themeColors.bg }}
                >
                  Mi Predicción
                </span>
              </div>

              {/* Match Prediction */}
              <div className="stories-preview-match">
                {/* Home Team */}
                <div className="stories-preview-team">
                  <div className="stories-preview-flag">
                    <img
                      src={`https://flagcdn.com/w160/${selectedMatch.homeCode}.png`}
                      alt={selectedMatch.homeTeam}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="stories-preview-team-name">{selectedMatch.homeTeam}</span>
                </div>

                {/* Score */}
                <div className="stories-preview-score">
                  <span className="stories-preview-score-number">{homeScore}</span>
                  <span className="stories-preview-score-separator">—</span>
                  <span className="stories-preview-score-number">{awayScore}</span>
                </div>

                {/* Away Team */}
                <div className="stories-preview-team">
                  <div className="stories-preview-flag">
                    <img
                      src={`https://flagcdn.com/w160/${selectedMatch.awayCode}.png`}
                      alt={selectedMatch.awayTeam}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="stories-preview-team-name">{selectedMatch.awayTeam}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="stories-preview-footer">
                <p>FIFA World Cup 2026™: Grupo A</p>
                <p>@QuinielaMundial · quinielamundial2026.com</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="stories-preview-actions">
            <button
              onClick={handleShare}
              className="stories-preview-button border-[#FFE600] text-[#FFE600] hover:bg-[#FFE600]/10"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Compartir
            </button>
            <button
              onClick={handleCopy}
              className="stories-preview-button border-purple-500 text-purple-500 hover:bg-purple-500/10"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copiar
            </button>
            <button
              onClick={handleSave}
              className="stories-preview-button border-[#FFE600] text-[#FFE600] hover:bg-[#FFE600]/10"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Guardar
            </button>
          </div>

          {/* Info Text */}
          <p className="stories-preview-info">
            Después del partido se genera resultado vs predicción automáticamente
          </p>

          {/* Back Button */}
          <button onClick={() => setShowPreview(false)} className="stories-preview-back">
            <span>←</span>
            Volver
          </button>
        </div>
      </div>
      </MobileLayout>
  );
}

  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <Header points={points} />
      <div className="min-h-screen bg-[#0D0D0D] pt-32">
      {/* Header Visual */}
      <div className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Banner Image */}
        <div className="stories-banner-container">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
            alt="Stories Banner"
            className="stories-banner-image"
          />
          <div className="stories-banner-overlay" />
        </div>

        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#FFE600]/5 blur-[120px] pointer-events-none z-[2]" />

        {/* Floating Back Button */}
        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={() => onNavigate('dashboard')}
            className="absolute left-0 top-0 group flex items-center gap-2 text-gray-400 hover:text-[#FFE600] transition-all duration-300 z-20"
            style={{ marginLeft: '20px', marginTop: '10px' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#252525] flex items-center justify-center group-hover:border-[#FFE600]/30 group-hover:bg-[#FFE600]/5 transition-all">
              <span className="text-2xl">←</span>
            </div>
            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Volver</span>
          </button>

          {/* Hero Content */}
          <div className="stories-hero-content flex flex-col items-center text-center relative">
            {/* Main Icon */}
            <div className="stories-hero-icon relative">
              <div className="absolute inset-[-2px] bg-[#FFE600] blur-lg opacity-10" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a24] to-[#0d0d12] border-2 border-[#FFE600] flex items-center justify-center shadow-[0_0_20px_rgba(255,230,0,0.15)]">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FFE600]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </div>

            {/* Title & Description */}
            <div className="stories-hero-title-section max-w-2xl">
              <h1 className="stories-hero-title text-4xl md:text-5xl font-black text-white tracking-tight leading-none uppercase">
                Stories de Predicción
              </h1>
              <p className="stories-hero-subtitle text-[#FFE600] text-lg font-bold tracking-wide">
                Comparte tus predicciones
              </p>
              <p className="stories-hero-description text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
                Selecciona un partido, predice el resultado y genera una story personalizada para compartir en tus redes sociales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20 mt-12">
        {/* Match Selection */}
        <div className="stories-match-section">
          <p className="stories-section-label">Selecciona partido:</p>
          <div className="stories-match-scroll">
            {AVAILABLE_MATCHES.map((match) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className={`stories-match-button ${selectedMatch.id === match.id ? 'selected' : ''}`}
              >
                {match.name}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Section */}
        <div className="stories-prediction-section">
          <p className="stories-section-label">Tu predicción:</p>
          <div className="stories-prediction-container">
            <div className="stories-score-container">
              {/* Home Team */}
              <div className="stories-team">
                <div className="stories-flag-wrapper">
                  <img
                    src={`https://flagcdn.com/w80/${selectedMatch.homeCode}.png`}
                    srcSet={`https://flagcdn.com/w160/${selectedMatch.homeCode}.png 2x`}
                    alt={selectedMatch.homeTeam}
                    className="stories-flag-img"
                  />
                </div>
                <div className="stories-team-code">{selectedMatch.homeShort}</div>
                <div className="stories-team-name">{selectedMatch.homeTeam}</div>
              </div>

              {/* Score */}
              <div className="stories-score-wrapper">
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div className="stories-score-arrow" onClick={() => incrementScore('home')}>
                    ▲
                  </div>
                  <div className="stories-score-arrow" onClick={() => incrementScore('away')}>
                    ▲
                  </div>
                </div>

                <div className="stories-score-display">
                  <div className="stories-score-number">{homeScore}</div>
                  <div className="stories-score-separator">-</div>
                  <div className="stories-score-number">{awayScore}</div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div className="stories-score-arrow" onClick={() => decrementScore('home')}>
                    ▼
                  </div>
                  <div className="stories-score-arrow" onClick={() => decrementScore('away')}>
                    ▼
                  </div>
                </div>
              </div>

              {/* Away Team */}
              <div className="stories-team">
                <div className="stories-flag-wrapper">
                  <img
                    src={`https://flagcdn.com/w80/${selectedMatch.awayCode}.png`}
                    srcSet={`https://flagcdn.com/w160/${selectedMatch.awayCode}.png 2x`}
                    alt={selectedMatch.awayTeam}
                    className="stories-flag-img"
                  />
                </div>
                <div className="stories-team-code">{selectedMatch.awayShort}</div>
                <div className="stories-team-name">{selectedMatch.awayTeam}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="stories-theme-section">
          <div className="stories-theme-grid">
            <button
              onClick={() => setSelectedTheme('classic')}
              className={`stories-theme-button classic ${selectedTheme === 'classic' ? 'selected' : ''}`}
            >
              Classic
            </button>
            <button
              onClick={() => setSelectedTheme('fire')}
              className={`stories-theme-button fire ${selectedTheme === 'fire' ? 'selected' : ''}`}
            >
              Fire
            </button>
            <button
              onClick={() => setSelectedTheme('gold')}
              className={`stories-theme-button gold ${selectedTheme === 'gold' ? 'selected' : ''}`}
            >
              Gold
            </button>
            <button
              onClick={() => setSelectedTheme('ice')}
              className={`stories-theme-button ice ${selectedTheme === 'ice' ? 'selected' : ''}`}
            >
              Ice
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <div className="stories-generate-button-container">
          <button onClick={generateStory} className="stories-generate-button">
            GENERAR STORY
          </button>
        </div>
      </div>
    </div>
    </MobileLayout>
    );
  };

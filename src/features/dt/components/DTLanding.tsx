import { useDTStore } from '../store/dtStore';
import { Trophy, BookOpen, Award, Plus, Trash2, Play, ChevronRight, Star, Users, Globe } from 'lucide-react';
import './DTLanding.css';

interface DTLandingProps {
  onNavigate?: (view: string) => void;
  onNewCareer?: () => void;
}

export function DTLanding({ onNavigate, onNewCareer }: DTLandingProps) {
  const { setView, careers, deleteCareer, setCurrentCareer } = useDTStore();

  const handleNewCareer = () => {
    if (careers.length >= 2) {
      alert('Máximo 2 carreras simultáneas. Elimina una para crear otra.');
      return;
    }
    if (onNewCareer) {
      onNewCareer();
    } else {
      setView('nation-select');
    }
  };

  const handleContinueCareer = (careerId: string) => {
    const career = careers.find((c) => c.id === careerId);
    if (career) {
      setCurrentCareer(career);
      if (career.tournament) {
        setView('home');
      } else if (career.squad.length > 0) {
        setView('lineup');
      } else {
        setView('squad-selection');
      }
    }
  };

  const handleDeleteCareer = (careerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Eliminar esta carrera? Se perderá todo el progreso.')) {
      deleteCareer(careerId);
    }
  };

  const getFlagEmoji = (nationId: string) => {
    const flags: Record<string, string> = {
      argentina: '🇦🇷',
      brazil: '🇧🇷',
      spain: '🇪🇸',
      france: '🇫🇷',
      germany: '🇩🇪',
      italy: '🇮🇹',
      england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      portugal: '🇵🇹',
      netherlands: '🇳🇱',
      belgium: '🇧🇪',
      uruguay: '🇺🇾',
      mexico: '🇲🇽',
      usa: '🇺🇸',
      japan: '🇯🇵',
      korea: '🇰🇷',
      australia: '🇦🇺',
    };
    return flags[nationId] || '🏳️';
  };

  return (
    <div className="dt-landing">
      {/* Back Button - Top Left */}
      <button
        onClick={() => onNavigate?.('dashboard')}
        style={{
          position: 'fixed',
          top: '0.75rem',
          left: '0.75rem',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: '0.5rem',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
        }}
        aria-label="Volver"
      >
        <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
      </button>

      {/* Header Banner */}
      <header className="dt-landing__header" style={{ paddingTop: '3rem' }}>
        <div className="dt-landing__header-bg" />
        <div className="dt-landing__header-glow-1" />
        <div className="dt-landing__header-glow-2" />
        
        <div className="dt-landing__logo">
          <Trophy />
        </div>
        <h1 className="dt-landing__title">MODO DT</h1>
        <p className="dt-landing__subtitle">FIFA World Cup 2026™</p>
        <p className="dt-landing__description">
          48 naciones • 1 campeón • Tu legado
        </p>
      </header>

      {/* Main Content */}
      <main className="dt-landing__content">
        {/* Nueva Carrera Card */}
        <button
          onClick={handleNewCareer}
          disabled={careers.length >= 2}
          className={`dt-card ${
            careers.length >= 2 ? 'dt-card--disabled' : 'dt-card--primary'
          }`}
        >
          <div className="dt-card__content">
            <div className={`dt-card__icon ${
              careers.length >= 2 ? 'dt-card__icon--disabled' : 'dt-card__icon--primary'
            }`}>
              <Plus />
            </div>
            <div className="dt-card__text">
              <h3 className="dt-card__title">Nueva Carrera</h3>
              <p className="dt-card__description">Comienza tu camino mundialista</p>
            </div>
            <div className={`dt-card__badge ${
              careers.length >= 2 ? 'dt-card__badge--error' : 'dt-card__badge--success'
            }`}>
              {careers.length}/2
            </div>
          </div>
        </button>

        {/* Carreras Activas */}
        {careers.length > 0 && (
          <div>
            <h3 className="dt-careers__header">
              <Play size={16} />
              Tus Carreras
            </h3>
            
            <div className="dt-careers__list">
              {careers.map((career) => (
                <div
                  key={career.id}
                  onClick={() => handleContinueCareer(career.id)}
                  className="dt-career-card"
                >
                  <div className="dt-career-card__content">
                    <div className="dt-career-card__flag">
                      {getFlagEmoji(career.nationId)}
                    </div>
                    <div className="dt-career-card__info">
                      <h4 className="dt-career-card__name">{career.name}</h4>
                      <div className="dt-career-card__stats">
                        <span className="dt-career-card__stat dt-career-card__stat--win">
                          {career.stats.won}V
                        </span>
                        <span className="dt-career-card__stat dt-career-card__stat--draw">
                          {career.stats.drawn}E
                        </span>
                        <span className="dt-career-card__stat dt-career-card__stat--loss">
                          {career.stats.lost}D
                        </span>
                        <span className="dt-career-card__stat dt-career-card__stat--divider">|</span>
                        <span className="dt-career-card__stat dt-career-card__stat--total">
                          {career.stats.played} PJ
                        </span>
                      </div>
                    </div>
                    <div className="dt-career-card__actions">
                      <div className="dt-career-card__play">
                        <Play />
                      </div>
                      <button
                        onClick={(e) => handleDeleteCareer(career.id, e)}
                        className="dt-career-card__delete"
                        aria-label="Eliminar carrera"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="dt-card-grid">
          <button
            onClick={() => setView('tutorial')}
            className="dt-card dt-card--blue"
          >
            <div className="dt-card__icon dt-card__icon--blue">
              <BookOpen size={20} />
            </div>
            <h4 className="dt-card__title">Tutorial</h4>
            <p className="dt-card__description">Aprende a jugar</p>
          </button>

          <button
            onClick={() => setView('badges')}
            className="dt-card dt-card--amber"
          >
            <div className="dt-card__icon dt-card__icon--amber">
              <Award size={20} />
            </div>
            <h4 className="dt-card__title">Insignias</h4>
            <p className="dt-card__description">Tus logros</p>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="dt-stats">
          <h3 className="dt-stats__title">El Torneo</h3>
          <div className="dt-stats__grid">
            <div className="dt-stat">
              <div className="dt-stat__value dt-stat__value--green">
                <Globe size={14} />
                <span>48</span>
              </div>
              <div className="dt-stat__label">Naciones</div>
            </div>
            <div className="dt-stat">
              <div className="dt-stat__value dt-stat__value--blue">
                <Users size={14} />
                <span>1.7K</span>
              </div>
              <div className="dt-stat__label">Jugadores</div>
            </div>
            <div className="dt-stat">
              <div className="dt-stat__value dt-stat__value--amber">
                <Star size={14} />
                <span>104</span>
              </div>
              <div className="dt-stat__label">Partidos</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { useDTStore } from '../store/dtStore';
import { getNationInfo } from '../data/players';
import { 
  ChevronRight,
  Trophy,
  Shield,
  Users,
  Zap,
  Target,
  Play,
  AlertCircle
} from 'lucide-react';
import { DTPageLayout } from './DTPageLayout';
import { DTHome } from './DTHome';
import './DTMatchSetup.css';

const TACTICS = [
  { id: 'possession', name: 'Posesión', icon: Target, desc: 'Control del balón' },
  { id: 'counter', name: 'Contragolpe', icon: Zap, desc: 'Transiciones rápidas' },
  { id: 'high-press', name: 'Presión Alta', icon: Users, desc: 'Recuperar arriba' },
  { id: 'defensive', name: 'Defensivo', icon: Shield, desc: 'Sólido atrás' },
  { id: 'balanced', name: 'Equilibrado', icon: Trophy, desc: 'Balance total' },
];

export function DTMatchSetup() {
  const { currentCareer, setView, updateCareer } = useDTStore();
  
  const [formation, setFormation] = useState(currentCareer?.formation || '4-3-3');
  const [tactic, setTactic] = useState(currentCareer?.tactic || 'balanced');
  const [starters, setStarters] = useState<string[]>(currentCareer?.starters || []);
  const [showTacticsModal, setShowTacticsModal] = useState(false);
  const [showStartersModal, setShowStartersModal] = useState(false);

  // SI NO HAY PARTIDO - MOSTRAR HOME DIRECTAMENTE
  if (!currentCareer?.currentMatch) {
    return (
      <div className="setup-nomatch">
        <div className="setup-nomatch__content">
          <p className="setup-nomatch__text">Cargando...</p>
          <button 
            onClick={() => {
              useDTStore.getState().setView('home');
              window.location.reload();
            }}
            className="setup-nomatch__btn"
          >
            IR AL INICIO
          </button>
        </div>
        <DTHome />
      </div>
    );
  }

  const nation = getNationInfo(currentCareer.nationId)?.nation;
  const currentMatch = currentCareer.currentMatch;
  const isUserHome = currentMatch?.homeNationId === currentCareer.nationId;
  const opponentId = isUserHome ? currentMatch?.awayNationId : currentMatch?.homeNationId;
  const opponentInfo = opponentId ? getNationInfo(opponentId) : null;
  const opponentName = opponentInfo?.nation.name || 'Rival';
  const opponentStrength = opponentInfo?.nation.strength || 75;

  const availablePlayers = currentCareer.squad.filter(p => !p.isInjured && !p.isSuspended);
  const hasValidLineup = starters.length === 11;
  
  // Calcular fuerza media de los titulares seleccionados
  const selectedPlayers = availablePlayers.filter(p => starters.includes(p.id));
  const userTeamStrength = selectedPlayers.length > 0
    ? selectedPlayers.reduce((sum, p) => sum + p.overall, 0) / selectedPlayers.length
    : 75;
  
  const strengthDiff = Math.round(userTeamStrength - opponentStrength);

  const handlePlay = () => {
    updateCareer({
      ...currentCareer,
      formation,
      tactic,
      starters,
      currentMatch: currentCareer.currentMatch,
    });
    setView('match');
  };

  const toggleStarter = (playerId: string) => {
    if (starters.includes(playerId)) {
      setStarters(prev => prev.filter(id => id !== playerId));
    } else if (starters.length < 11) {
      setStarters(prev => [...prev, playerId]);
    }
  };

  const getPositionColor = (pos: string) => {
    switch (pos) {
      case 'GK': return 'setup-starters__player-pos--gk';
      case 'DEF': return 'setup-starters__player-pos--def';
      case 'MID': return 'setup-starters__player-pos--mid';
      case 'FWD': return 'setup-starters__player-pos--fwd';
      default: return 'setup-starters__player-pos--def';
    }
  };

  return (
    <DTPageLayout title="Preparar Partido" showBack onBack={() => setView('home')} >
      {/* Match Card */}
      <div className="setup-match">
        <div className="setup-match__card">
          <div className="setup-match__glow" />
          
          <div className="setup-match__content">
            <div className="setup-match__round">
              <span className="setup-match__round-text">
                {currentMatch?.round || `Jornada ${currentMatch?.matchday}`}
              </span>
            </div>

            <div className="setup-match__teams">
              <div className="setup-match__team">
                <div className="setup-match__flag">
                  {nation?.flag}
                </div>
                <span className="setup-match__team-name">Tú</span>
                {hasValidLineup && (
                  <span className="setup-match__ovr setup-match__ovr--user">
                    {Math.round(userTeamStrength)} OVR
                  </span>
                )}
              </div>

              <div className="setup-match__vs">
                <div className="setup-match__vs-text">VS</div>
                {hasValidLineup && (
                  <span className={`setup-match__diff ${
                    strengthDiff > 5 ? 'setup-match__diff--positive' :
                    strengthDiff < -5 ? 'setup-match__diff--negative' :
                    'setup-match__diff--neutral'
                  }`}>
                    {strengthDiff > 0 ? '+' : ''}{strengthDiff}
                  </span>
                )}
              </div>

              <div className="setup-match__team">
                <div className="setup-match__flag setup-match__flag--away">
                  {opponentInfo?.nation.flag || '🏳️'}
                </div>
                <span className="setup-match__team-name setup-match__team-name--away">{opponentName}</span>
                <span className="setup-match__ovr setup-match__ovr--away">
                  {opponentStrength} OVR
                </span>
              </div>
            </div>
            
            {/* Indicador de favorito */}
            {hasValidLineup && (
              <div className="setup-match__favorite">
                <span className={`setup-match__favorite-text ${
                  strengthDiff > 5 ? 'setup-match__favorite-text--positive' :
                  strengthDiff < -5 ? 'setup-match__favorite-text--negative' :
                  'setup-match__favorite-text--neutral'
                }`}>
                  {strengthDiff > 10 ? '⭐⭐⭐ Favorito' :
                   strengthDiff > 5 ? '⭐⭐ Favorito' :
                   strengthDiff > 0 ? '⭐ Ligero favorito' :
                   strengthDiff === 0 ? '⚖️ Partido igualado' :
                   strengthDiff > -5 ? '⚠️ Ligero desfavorecido' :
                   strengthDiff > -10 ? '⚠️⚠️ Desfavorecido' :
                   '⚠️⚠️⚠️ Gran desfavorecido'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="setup-config">
        <h2 className="setup-config__title">Tu Configuración</h2>
        
        <div className="setup-config__grid">
          <button 
            onClick={() => setShowTacticsModal(true)}
            className="setup-config__btn"
          >
            <div className="setup-config__btn-icon setup-config__btn-icon--formation">
              <Shield className="text-white" size={20} />
            </div>
            <div className="setup-config__btn-label">Formación</div>
            <div className="setup-config__btn-value">{formation}</div>
          </button>

          <button 
            onClick={() => setShowTacticsModal(true)}
            className="setup-config__btn"
          >
            <div className="setup-config__btn-icon setup-config__btn-icon--tactic">
              <Target className="text-white" size={20} />
            </div>
            <div className="setup-config__btn-label">Táctica</div>
            <div className="setup-config__btn-value">
              {TACTICS.find(t => t.id === tactic)?.name || 'Equilibrado'}
            </div>
          </button>
        </div>

        <button 
          onClick={() => setShowStartersModal(true)}
          className="setup-config__btn setup-config__btn--full"
        >
          <div className="setup-config__btn-content">
            <div className="setup-config__btn-left">
              <div className="setup-config__btn-icon setup-config__btn-icon--starters">
                <Users className="text-white" size={20} />
              </div>
              <div className="setup-config__btn-info">
                <div className="setup-config__btn-label">Titulares</div>
                <div className="setup-config__btn-value">{starters.length}/11 jugadores</div>
                {!hasValidLineup && (
                  <div className="setup-config__warning">
                    <AlertCircle size={10} />
                    Faltan jugadores
                  </div>
                )}
              </div>
            </div>
            <ChevronRight className="setup-config__arrow" size={20} />
          </div>
        </button>
      </div>

      {/* Tactics Modal */}
      {showTacticsModal && (
        <div className="setup-modal">
          <div className="setup-modal__content">
            <div className="setup-modal__header">
              <h3 className="setup-modal__title">Formación y Táctica</h3>
              <button 
                onClick={() => setShowTacticsModal(false)}
                className="setup-modal__close"
              >
                ✕
              </button>
            </div>

            <div className="setup-modal__section">
              <label className="setup-modal__label">Formación</label>
              <div className="setup-modal__formations">
                {['4-3-3', '4-4-2', '3-5-2', '5-3-2', '4-2-3-1', '3-4-3'].map((form) => (
                  <button
                    key={form}
                    onClick={() => setFormation(form)}
                    className={`setup-modal__formation ${formation === form ? 'setup-modal__formation--selected' : 'setup-modal__formation--unselected'}`}
                  >
                    {form}
                  </button>
                ))}
              </div>
            </div>

            <div className="setup-modal__section">
              <label className="setup-modal__label">Táctica</label>
              <div className="setup-modal__tactics">
                {TACTICS.map((t) => {
                  const Icon = t.icon;
                  const isSelected = tactic === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTactic(t.id)}
                      className={`setup-modal__tactic ${isSelected ? 'setup-modal__tactic--selected' : 'setup-modal__tactic--unselected'}`}
                    >
                      <div className={`setup-modal__tactic-icon ${isSelected ? 'setup-modal__tactic-icon--selected' : 'setup-modal__tactic-icon--unselected'}`}>
                        <Icon size={24} className={isSelected ? 'text-black' : 'text-[#2a2a3a]'} />
                      </div>
                      <div>
                        <div className={`setup-modal__tactic-name ${isSelected ? 'setup-modal__tactic-name--selected' : 'setup-modal__tactic-name--unselected'}`}>{t.name}</div>
                        <div className="setup-modal__tactic-desc">{t.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={() => setShowTacticsModal(false)}
              className="setup-modal__confirm"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {/* Starters Modal */}
      {showStartersModal && (
        <div className="setup-starters">
          <div className="setup-starters__header">
            <div className="setup-starters__title-wrap">
              <h3 className="setup-starters__title">Seleccionar Titulares</h3>
              <p className="setup-starters__count">{starters.length}/11 jugadores seleccionados</p>
            </div>
            <button 
              onClick={() => setShowStartersModal(false)}
              className="setup-starters__close"
            >
              ✕
            </button>
          </div>

          <div className="setup-starters__list">
            <div className="setup-starters__players">
              {availablePlayers.map((player) => {
                const isSelected = starters.includes(player.id);
                return (
                  <button
                    key={player.id}
                    onClick={() => toggleStarter(player.id)}
                    className={`setup-starters__player ${isSelected ? 'setup-starters__player--selected' : 'setup-starters__player--unselected'}`}
                  >
                    <div className={`setup-starters__player-pos ${getPositionColor(player.position)}`}>
                      {player.position}
                    </div>
                    <div className="setup-starters__player-info">
                      <div className={`setup-starters__player-name ${isSelected ? 'setup-starters__player-name--selected' : 'setup-starters__player-name--unselected'}`}>{player.name}</div>
                      <div className="setup-starters__player-ovr">{player.overall} OVR</div>
                    </div>
                    {isSelected && (
                      <div className="setup-starters__player-check">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="setup-starters__footer">
            <button 
              onClick={() => setShowStartersModal(false)}
              disabled={!hasValidLineup}
              className={`setup-starters__confirm ${hasValidLineup ? 'setup-starters__confirm--active' : 'setup-starters__confirm--disabled'}`}
            >
              {hasValidLineup ? 'Confirmar Alineación' : 'Selecciona 11 jugadores'}
            </button>
          </div>
        </div>
      )}

      {/* Play Button */}
      <div className="setup-play">
        <button 
          onClick={handlePlay}
          disabled={!hasValidLineup}
          className={`setup-play__btn-wrap ${!hasValidLineup ? 'setup-play__btn-wrap--disabled' : ''}`}
        >
          {hasValidLineup && (
            <div className="setup-play__glow" />
          )}
          
          <div className={`setup-play__btn ${hasValidLineup ? 'setup-play__btn--active' : 'setup-play__btn--disabled'}`}>
            <Play size={24} fill="currentColor" />
            <span>{hasValidLineup ? 'Jugar Partido' : 'Completa la alineación'}</span>
          </div>
        </button>
      </div>
    </DTPageLayout>
  );
}

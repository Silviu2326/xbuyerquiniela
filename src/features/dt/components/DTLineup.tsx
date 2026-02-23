import { useState, useMemo } from 'react';
import { useDTStore } from '../store/dtStore';
import { Trophy, Shield, Zap, Target, Users, Check } from 'lucide-react';
import { DTPageLayout } from './DTPageLayout';
import './DTLineup.css';

const FORMATIONS = [
  { id: '4-3-3', name: '4-3-3', slots: { GK: 1, DEF: 4, MID: 3, FWD: 3 } },
  { id: '4-4-2', name: '4-4-2', slots: { GK: 1, DEF: 4, MID: 4, FWD: 2 } },
  { id: '3-5-2', name: '3-5-2', slots: { GK: 1, DEF: 3, MID: 5, FWD: 2 } },
  { id: '5-3-2', name: '5-3-2', slots: { GK: 1, DEF: 5, MID: 3, FWD: 2 } },
  { id: '4-2-3-1', name: '4-2-3-1', slots: { GK: 1, DEF: 4, MID: 5, FWD: 1 } },
  { id: '3-4-3', name: '3-4-3', slots: { GK: 1, DEF: 3, MID: 4, FWD: 3 } },
];

const TACTICS = [
  { id: 'possession', name: 'Posesión', icon: Target, desc: 'Control del balón' },
  { id: 'counter', name: 'Contragolpe', icon: Zap, desc: 'Transiciones rápidas' },
  { id: 'high-press', name: 'Presión Alta', icon: Users, desc: 'Recuperar arriba' },
  { id: 'defensive', name: 'Defensivo', icon: Shield, desc: 'Sólido atrás' },
  { id: 'balanced', name: 'Equilibrado', icon: Trophy, desc: 'Balance total' },
];

export function DTLineup() {
  const { currentCareer, setView, updateCareer } = useDTStore();
  
  const [selectedFormation, setSelectedFormation] = useState(currentCareer?.formation || '4-3-3');
  const [selectedTactic, setSelectedTactic] = useState(currentCareer?.tactic || 'balanced');
  const [starters, setStarters] = useState<string[]>(currentCareer?.starters || []);
  const [captain, setCaptain] = useState<string>(currentCareer?.starters?.[0] || '');
  const [activeTab, setActiveTab] = useState<'formation' | 'starters' | 'tactics'>('formation');

  const squad = currentCareer?.squad || [];
  const formation = FORMATIONS.find(f => f.id === selectedFormation);

  const stats = useMemo(() => {
    const selectedPlayers = squad.filter(p => starters.includes(p.id));
    return {
      GK: selectedPlayers.filter(p => p.position === 'GK').length,
      DEF: selectedPlayers.filter(p => p.position === 'DEF').length,
      MID: selectedPlayers.filter(p => p.position === 'MID').length,
      FWD: selectedPlayers.filter(p => p.position === 'FWD').length,
      avgOverall: selectedPlayers.length > 0
        ? Math.round(selectedPlayers.reduce((acc, p) => acc + p.overall, 0) / selectedPlayers.length)
        : 0,
    };
  }, [starters, squad]);

  const isValid = formation && 
    stats.GK === formation.slots.GK &&
    stats.DEF === formation.slots.DEF &&
    stats.MID === formation.slots.MID &&
    stats.FWD === formation.slots.FWD &&
    captain !== '';

  const toggleStarter = (playerId: string) => {
    const player = squad.find(p => p.id === playerId);
    if (!player || !formation) return;

    if (starters.includes(playerId)) {
      setStarters(prev => prev.filter(id => id !== playerId));
      if (captain === playerId) setCaptain('');
    } else if (starters.length < 11) {
      const currentByPos = {
        GK: starters.filter(id => squad.find(p => p.id === id)?.position === 'GK').length,
        DEF: starters.filter(id => squad.find(p => p.id === id)?.position === 'DEF').length,
        MID: starters.filter(id => squad.find(p => p.id === id)?.position === 'MID').length,
        FWD: starters.filter(id => squad.find(p => p.id === id)?.position === 'FWD').length,
      };

      if (currentByPos[player.position] < formation.slots[player.position]) {
        setStarters(prev => [...prev, playerId]);
        if (!captain) setCaptain(playerId);
      }
    }
  };

  const handleSaveConfig = () => {
    if (!isValid || !currentCareer) return;
    updateCareer({
      ...currentCareer,
      formation: selectedFormation,
      tactic: selectedTactic,
      starters: starters,
    });
    setView('home');
  };

  const getPositionColorClass = (pos: string) => {
    switch (pos) {
      case 'GK': return 'dt-player-select__pos--gk';
      case 'DEF': return 'dt-player-select__pos--def';
      case 'MID': return 'dt-player-select__pos--mid';
      case 'FWD': return 'dt-player-select__pos--fwd';
      default: return 'dt-player-select__pos--mid';
    }
  };

  if (!currentCareer) return null;

  return (
    <DTPageLayout title="Alineación" showBack={true} >
      {/* Team Rating Card */}
      <div className="dt-lineup__rating">
        <div className="dt-lineup__rating-info">
          <div className="dt-lineup__rating-score">
            <span>{stats.avgOverall || '-'}</span>
          </div>
          <div className="dt-lineup__rating-text">
            <h3>Valoración Media</h3>
            <p>{starters.length}/11 Titulares</p>
          </div>
        </div>
        <div className={`dt-lineup__status ${isValid ? 'dt-lineup__status--ready' : 'dt-lineup__status--incomplete'}`}>
          {isValid ? '✓ Listo' : 'Incompleto'}
        </div>
      </div>

      {/* Tabs */}
      <div className="dt-lineup__tabs">
        {[
          { id: 'formation', label: 'Formación', icon: Users },
          { id: 'starters', label: 'Titulares', icon: Trophy },
          { id: 'tactics', label: 'Táctica', icon: Target },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`dt-lineup__tab ${activeTab === tab.id ? 'dt-lineup__tab--active' : ''}`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Formation Tab */}
      {activeTab === 'formation' && (
        <div className="dt-lineup__formations">
          {FORMATIONS.map((form) => (
            <button
              key={form.id}
              onClick={() => { setSelectedFormation(form.id); setStarters([]); setCaptain(''); }}
              className={`dt-formation ${selectedFormation === form.id ? 'dt-formation--selected' : 'dt-formation--unselected'}`}
            >
              <div className="dt-formation__info">
                <div className={`dt-formation__badge ${selectedFormation === form.id ? 'dt-formation__badge--selected' : 'dt-formation__badge--unselected'}`}>
                  {form.name}
                </div>
                <div className="dt-formation__text">
                  <h3>Formación {form.name}</h3>
                  <p>{form.slots.DEF} Def • {form.slots.MID} Med • {form.slots.FWD} Del</p>
                </div>
              </div>
              {selectedFormation === form.id && (
                <div className="dt-formation__check">
                  <Check size={18} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Starters Tab */}
      {activeTab === 'starters' && (
        <>
          {/* Formation Preview */}
          <div className="dt-lineup__field">
            <div className="dt-lineup__field-bg">
              <span>{selectedFormation}</span>
            </div>
            <div className="dt-lineup__positions">
              <div className="dt-lineup__row">
                {starters.filter(id => squad.find(p => p.id === id)?.position === 'FWD').map(id => (
                  <div key={id} className="dt-lineup__player-dot dt-lineup__player-dot--fwd">
                    <span>{squad.find(p => p.id === id)?.name.charAt(0)}</span>
                  </div>
                ))}
              </div>
              <div className="dt-lineup__row">
                {starters.filter(id => squad.find(p => p.id === id)?.position === 'MID').map(id => (
                  <div key={id} className="dt-lineup__player-dot dt-lineup__player-dot--mid">
                    <span>{squad.find(p => p.id === id)?.name.charAt(0)}</span>
                  </div>
                ))}
              </div>
              <div className="dt-lineup__row">
                {starters.filter(id => squad.find(p => p.id === id)?.position === 'DEF').map(id => (
                  <div key={id} className="dt-lineup__player-dot dt-lineup__player-dot--def">
                    <span>{squad.find(p => p.id === id)?.name.charAt(0)}</span>
                  </div>
                ))}
              </div>
              <div className="dt-lineup__row">
                {starters.filter(id => squad.find(p => p.id === id)?.position === 'GK').map(id => (
                  <div key={id} className="dt-lineup__player-dot dt-lineup__player-dot--gk">
                    <span>{squad.find(p => p.id === id)?.name.charAt(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="dt-lineup__players">
            <h3>Selecciona 11 titulares</h3>
            <div className="dt-lineup__players-list">
              {squad.map((player) => {
                const isSelected = starters.includes(player.id);
                const isCaptain = captain === player.id;
                return (
                  <button
                    key={player.id}
                    onClick={() => toggleStarter(player.id)}
                    className={`dt-player-select ${isSelected ? 'dt-player-select--selected' : 'dt-player-select--unselected'}`}
                  >
                    <div className={`dt-player-select__pos ${getPositionColorClass(player.position)}`}>
                      {player.position}
                    </div>
                    <div className="dt-player-select__info">
                      <h4>
                        {player.name}
                        {isCaptain && <span className="dt-player-select__captain">(C)</span>}
                      </h4>
                      <span className="dt-player-select__overall">{player.overall}</span>
                    </div>
                    {isSelected && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setCaptain(player.id); }}
                        className={`dt-player-select__cap-btn ${isCaptain ? 'dt-player-select__cap-btn--active' : 'dt-player-select__cap-btn--inactive'}`}
                      >
                        {isCaptain ? 'CAP' : 'C'}
                      </button>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Tactics Tab */}
      {activeTab === 'tactics' && (
        <div className="dt-lineup__tactics">
          {TACTICS.map((tactic) => {
            const Icon = tactic.icon;
            return (
              <button
                key={tactic.id}
                onClick={() => setSelectedTactic(tactic.id)}
                className={`dt-tactic ${selectedTactic === tactic.id ? 'dt-tactic--selected' : 'dt-tactic--unselected'}`}
              >
                <div className={`dt-tactic__icon ${selectedTactic === tactic.id ? 'dt-tactic__icon--selected' : 'dt-tactic__icon--unselected'}`}>
                  <Icon size={24} />
                </div>
                <div className="dt-tactic__text">
                  <h3>{tactic.name}</h3>
                  <p>{tactic.desc}</p>
                </div>
                {selectedTactic === tactic.id && (
                  <div className="dt-formation__check">
                    <Check size={18} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom Action - Guardar */}
      <div className="dt-lineup__save">
        <button
          onClick={handleSaveConfig}
          disabled={!isValid}
          className={`dt-lineup__save-btn ${isValid ? 'dt-lineup__save-btn--active' : 'dt-lineup__save-btn--disabled'}`}
        >
          <Trophy size={24} />
          GUARDAR CONFIGURACIÓN
        </button>
      </div>
    </DTPageLayout>
  );
}

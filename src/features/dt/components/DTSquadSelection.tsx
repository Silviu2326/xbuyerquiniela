import { useState, useMemo } from 'react';
import { useDTStore, type DTPlayer } from '../store/dtStore';
import { ChevronLeft, Users, Check, AlertCircle, Shield, User } from 'lucide-react';
import { getNationInfo, generatePlayersForNation, NATIONS_DATA } from '../data/players';
import './DTSquadSelection.css';

interface DTSquadSelectionProps {
  onNavigate?: (view: string) => void;
}

const FILTERS = [
  { key: 'ALL', label: 'Todos' },
  { key: 'GK', label: 'Porteros' },
  { key: 'DEF', label: 'Defensas' },
  { key: 'MID', label: 'Medios' },
  { key: 'FWD', label: 'Delanteros' },
] as const;

const POSITIONS = [
  { label: 'POR', key: 'GK', icon: Shield },
  { label: 'DEF', key: 'DEF', icon: User },
  { label: 'MED', key: 'MID', icon: User },
  { label: 'DEL', key: 'FWD', icon: User },
] as const;

export function DTSquadSelection({ onNavigate }: DTSquadSelectionProps) {
  const { currentCareer, setView, updateCareer } = useDTStore();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'GK' | 'DEF' | 'MID' | 'FWD'>('ALL');

  if (!currentCareer) {
    return (
      <div className="squad-empty">
        <p>No hay carrera activa</p>
      </div>
    );
  }

  // Get players for the nation
  const availablePlayers = useMemo(() => {
    const nationData = NATIONS_DATA[currentCareer.nationId];
    if (nationData && nationData.players.length > 0) {
      return nationData.players;
    }
    const nation = getNationInfo(currentCareer.nationId)?.nation;
    if (nation) {
      return generatePlayersForNation(nation.id, nation.name, nation.strength);
    }
    return [];
  }, [currentCareer.nationId]);

  const filteredPlayers = useMemo(() => {
    if (activeFilter === 'ALL') return availablePlayers;
    return availablePlayers.filter((p: DTPlayer) => p.position === activeFilter);
  }, [availablePlayers, activeFilter]);

  const togglePlayer = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(prev => prev.filter(id => id !== playerId));
    } else if (selectedPlayers.length < 26) {
      setSelectedPlayers(prev => [...prev, playerId]);
    }
  };

  const handleContinue = () => {
    if (selectedPlayers.length < 23) return;
    const squad = availablePlayers.filter(p => selectedPlayers.includes(p.id));
    updateCareer({ ...currentCareer, squad });
    if (onNavigate) {
      onNavigate('career-home');
    } else {
      setView('home');
    }
  };

  const getPositionClass = (pos: string) => {
    switch (pos) {
      case 'GK': return 'squad-position--gk';
      case 'DEF': return 'squad-position--def';
      case 'MID': return 'squad-position--mid';
      case 'FWD': return 'squad-position--fwd';
      default: return '';
    }
  };

  const stats = useMemo(() => ({
    total: selectedPlayers.length,
    GK: selectedPlayers.filter((id: string) => availablePlayers.find((p: DTPlayer) => p.id === id)?.position === 'GK').length,
    DEF: selectedPlayers.filter((id: string) => availablePlayers.find((p: DTPlayer) => p.id === id)?.position === 'DEF').length,
    MID: selectedPlayers.filter((id: string) => availablePlayers.find((p: DTPlayer) => p.id === id)?.position === 'MID').length,
    FWD: selectedPlayers.filter((id: string) => availablePlayers.find((p: DTPlayer) => p.id === id)?.position === 'FWD').length,
  }), [selectedPlayers, availablePlayers]);

  const isValid = stats.total >= 23 && stats.total <= 26 && stats.GK >= 2;

  return (
    <div className="squad-select">
      {/* Header */}
      <header className="squad-header">
        <div className="squad-header__content">
          <button 
            onClick={() => onNavigate ? onNavigate('career-select') : setView('nation-select')}
            className="squad-header__back"
            aria-label="Volver"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="squad-header__title">
            <h1>Convocatoria</h1>
            <p>{stats.total}/26 jugadores</p>
          </div>
          <div className="squad-header__spacer" />
        </div>

        {/* Stats Bar */}
        <div className="squad-stats">
          <div className="squad-stats__grid">
            {POSITIONS.map(({ label, key, icon: Icon }) => (
              <div key={key} className="squad-stat">
                <div className="squad-stat__label">
                  <Icon size={12} />
                  <span>{label}</span>
                </div>
                <span className={`squad-stat__value ${(stats as any)[key] > 0 ? 'squad-stat__value--active' : 'squad-stat__value--inactive'}`}>
                  {(stats as any)[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="squad-filters">
        <div className="squad-filters__list">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`squad-filter__btn ${
                activeFilter === filter.key
                  ? 'squad-filter__btn--active'
                  : 'squad-filter__btn--inactive'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Players List */}
      <div className="squad-players">
        <div className="squad-players__list">
          {filteredPlayers.map((player: DTPlayer) => {
            const isSelected = selectedPlayers.includes(player.id);
            const isDisabled = !isSelected && selectedPlayers.length >= 26;
            return (
              <button
                key={player.id}
                onClick={() => togglePlayer(player.id)}
                disabled={isDisabled}
                className={`squad-player ${
                  isSelected
                    ? 'squad-player--selected'
                    : isDisabled
                    ? 'squad-player--disabled'
                    : 'squad-player--unselected'
                }`}
              >
                <div className={`squad-player__position ${getPositionClass(player.position)}`}>
                  {player.position}
                </div>
                <div className="squad-player__info">
                  <h3 className="squad-player__name">{player.name}</h3>
                  <div className="squad-player__meta">
                    <span className="squad-player__age">{player.age} años</span>
                    <span className="squad-player__overall">{player.overall}</span>
                  </div>
                </div>
                <div className={`squad-player__check ${
                  isSelected ? 'squad-player__check--selected' : 'squad-player__check--unselected'
                }`}>
                  {isSelected && <Check size={16} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="squad-bottom">
        <div className="squad-bottom__content">
          {!isValid && stats.total > 0 && (
            <div className="squad-alert">
              <AlertCircle size={18} />
              <span>
                {stats.total < 23 ? 'Mínimo 23 jugadores' : stats.GK < 2 ? 'Mínimo 2 porteros' : ''}
              </span>
            </div>
          )}
          <button
            onClick={handleContinue}
            disabled={!isValid}
            className={`squad-continue ${
              isValid ? 'squad-continue--active' : 'squad-continue--disabled'
            }`}
          >
            <Users size={24} />
            CONTINUAR ({stats.total}/26)
          </button>
        </div>
      </div>
    </div>
  );
}

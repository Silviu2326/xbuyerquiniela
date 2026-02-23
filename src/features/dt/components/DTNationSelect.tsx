import { useState, useMemo } from 'react';
import { useDTStore, type DTNation } from '../store/dtStore';
import { DT_NATIONS } from '../data/players';
import { Search, ChevronLeft, Star, Shield } from 'lucide-react';
import './DTNationSelect.css';

const CONFEDERATIONS = ['TODAS', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

interface DTNationSelectProps {
  onNavigate?: (view: string) => void;
}

function getStrengthClass(strength: number): string {
  if (strength >= 90) return 'ns-strength--elite';
  if (strength >= 85) return 'ns-strength--verystrong';
  if (strength >= 80) return 'ns-strength--strong';
  if (strength >= 75) return 'ns-strength--medium';
  return 'ns-strength--weak';
}

function getStrengthLabel(strength: number): string {
  if (strength >= 90) return 'Élite';
  if (strength >= 85) return 'Muy Fuerte';
  if (strength >= 80) return 'Fuerte';
  return 'Media';
}

export function DTNationSelect({ onNavigate }: DTNationSelectProps) {
  const { setView, createCareer } = useDTStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConf, setSelectedConf] = useState('TODAS');
  const [selectedNation, setSelectedNation] = useState<DTNation | null>(null);
  const [careerName, setCareerName] = useState('');

  const filteredNations = useMemo(() => {
    return DT_NATIONS.filter((nation) => {
      const matchesSearch = nation.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesConf = selectedConf === 'TODAS' || nation.confederation === selectedConf;
      return matchesSearch && matchesConf;
    });
  }, [searchTerm, selectedConf]);

  const handleConfirmSelection = () => {
    if (!selectedNation) return;
    createCareer(selectedNation, careerName || `Carrera ${selectedNation.name}`);
    if (onNavigate) {
      onNavigate('career-squad');
    } else {
      setView('squad-selection');
    }
  };

  return (
    <div className="ns-select">
      {/* Header */}
      <header className="ns-header">
        <div className="ns-header__content">
          <button 
            onClick={() => onNavigate ? onNavigate('career') : setView('landing')}
            className="ns-header__back"
            aria-label="Volver"
          >
            <ChevronLeft />
          </button>
          <h1 className="ns-header__title">Elige tu Nación</h1>
          <div className="ns-header__spacer" />
        </div>
      </header>

      {/* Search */}
      <div className="ns-search">
        <div className="ns-search__wrapper">
          <Search className="ns-search__icon" />
          <input
            type="text"
            placeholder="Buscar país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ns-search__input"
          />
        </div>
      </div>

      {/* Confederations Filter */}
      <div className="ns-filter">
        <div className="ns-filter__list">
          {CONFEDERATIONS.map((conf) => (
            <button
              key={conf}
              onClick={() => setSelectedConf(conf)}
              className={`ns-filter__btn ${
                selectedConf === conf
                  ? 'ns-filter__btn--active'
                  : 'ns-filter__btn--inactive'
              }`}
            >
              {conf}
            </button>
          ))}
        </div>
      </div>

      {/* Nations Grid */}
      <div className="ns-grid">
        <div className="ns-grid__container">
          {filteredNations.map((nation) => (
            <button
              key={nation.id}
              onClick={() => setSelectedNation(nation)}
              className={`ns-nation ${
                selectedNation?.id === nation.id
                  ? 'ns-nation--selected'
                  : 'ns-nation--unselected'
              }`}
            >
              <div className="ns-nation__header">
                <div className="ns-nation__flag">
                  <span className="ns-nation__code">{nation.code}</span>
                </div>
                {selectedNation?.id === nation.id && (
                  <div className="ns-nation__check">
                    <span className="ns-nation__check-icon">✓</span>
                  </div>
                )}
              </div>
              <h3 className="ns-nation__name">{nation.name}</h3>
              <div className="ns-nation__meta">
                <div className={`ns-nation__strength ${getStrengthClass(nation.strength)}`}>
                  {nation.strength}
                </div>
                <span className="ns-nation__conf">{nation.confederation}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Selection Bar */}
      {selectedNation && (
        <div className="ns-bottom">
          <div className="ns-bottom__content">
            <div className="ns-bottom__header">
              <div className="ns-bottom__flag">
                <span className="ns-bottom__flag-code">{selectedNation.code}</span>
              </div>
              <div className="ns-bottom__info">
                <h3 className="ns-bottom__name">{selectedNation.name}</h3>
                <div className="ns-bottom__rating">
                  <Star size={14} className={getStrengthClass(selectedNation.strength)} />
                  <span className={`ns-bottom__rating-text ${getStrengthClass(selectedNation.strength)}`}>
                    {selectedNation.strength} - {getStrengthLabel(selectedNation.strength)}
                  </span>
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Nombre de tu carrera (opcional)"
              value={careerName}
              onChange={(e) => setCareerName(e.target.value)}
              className="ns-bottom__input"
            />
            <button
              onClick={handleConfirmSelection}
              className="ns-bottom__confirm"
            >
              <Shield size={24} />
              CONFIRMAR SELECCIÓN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

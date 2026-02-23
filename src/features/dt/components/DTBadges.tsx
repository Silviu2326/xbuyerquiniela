import { useDTStore } from '../store/dtStore';
import { Trophy, Medal, Star, Shield, Target, RotateCcw, Crown, Award } from 'lucide-react';
import { DTPageLayout } from './DTPageLayout';
import './DTBadges.css';

const ALL_BADGES = [
  { id: 'champion', name: 'Campeón del Mundo', description: 'Ganar la Copa del Mundo 2026', icon: Crown, color: '#FFD700', rarity: 'legendary' as const },
  { id: 'finalist', name: 'Finalista', description: 'Llegar a la final', icon: Trophy, color: '#C0C0C0', rarity: 'epic' as const },
  { id: 'third-place', name: 'Tercer Puesto', description: 'Ganar el partido por el 3er lugar', icon: Medal, color: '#CD7F32', rarity: 'epic' as const },
  { id: 'semifinalist', name: 'Semifinalista', description: 'Llegar a semifinales', icon: Star, color: '#CD7F32', rarity: 'rare' as const },
  { id: 'qualified', name: 'Clasificado', description: 'Pasar la fase de grupos', icon: Award, color: '#FFE600', rarity: 'common' as const },
  { id: 'undefeated', name: 'Invicto en Grupos', description: 'No perder en fase de grupos', icon: Shield, color: '#FFE600', rarity: 'epic' as const },
  { id: 'top_scorer_group', name: 'Goleador', description: 'Marcar 7+ goles en grupos', icon: Target, color: '#FF5722', rarity: 'rare' as const },
  { id: 'clean_sheet', name: 'Muro Defensivo', description: '2+ porterías a cero', icon: Shield, color: '#2196F3', rarity: 'rare' as const },
  { id: 'comeback', name: 'Remontada Épica', description: 'Ganar tras ir -2', icon: RotateCcw, color: '#9C27B0', rarity: 'rare' as const },
  { id: 'first_win', name: 'Primera Victoria', description: 'Ganar tu primer partido', icon: Trophy, color: '#4CAF50', rarity: 'common' as const },
];

export function DTBadges() {
  const { currentCareer } = useDTStore();
  const unlockedBadges = currentCareer?.badges || [];
  const unlockedIds = unlockedBadges.map(b => b.id);

  const progress = Math.round((unlockedBadges.length / ALL_BADGES.length) * 100);

  return (
    <DTPageLayout title="Logros" showBack>
      {/* Progress Card */}
      <div className="dt-badges__progress">
        <div className="dt-badges__progress-header">
          <div className="dt-badges__progress-info">
            <h3>Progreso</h3>
            <div className="dt-badges__progress-count">{unlockedBadges.length} <span>/ {ALL_BADGES.length}</span></div>
          </div>
          <div className="dt-badges__progress-percent">
            <span>{progress}%</span>
          </div>
        </div>
        <div className="dt-badges__progress-bar">
          <div className="dt-badges__progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Badges by Rarity */}
      <div className="dt-badges__rarity">
        {(['legendary', 'epic', 'rare', 'common'] as const).map((rarity) => {
          const badges = ALL_BADGES.filter(b => b.rarity === rarity);
          if (badges.length === 0) return null;

          return (
            <div key={rarity} className={`dt-badges__rarity-section dt-badges__rarity--${rarity}`}>
              <h2>
                <Star size={18} />
                {rarity === 'legendary' ? 'Legendarias' : rarity === 'epic' ? 'Épicas' : rarity === 'rare' ? 'Raras' : 'Comunes'}
                <span className="dt-badges__rarity-count">
                  ({badges.filter(b => unlockedIds.includes(b.id)).length}/{badges.length})
                </span>
              </h2>
              <div className="dt-badges__grid">
                {badges.map((badge) => {
                  const Icon = badge.icon;
                  const isUnlocked = unlockedIds.includes(badge.id);
                  
                  return (
                    <div
                      key={badge.id}
                      className={`dt-badge ${isUnlocked ? `dt-badge--unlocked dt-badge--${rarity}` : 'dt-badge--locked'}`}
                    >
                      <div className={`dt-badge__icon ${isUnlocked ? `dt-badge__icon--${rarity} dt-badge__icon--unlocked` : 'dt-badge__icon--locked'}`}>
                        <Icon size={24} />
                      </div>
                      <h3 className={`dt-badge__name ${isUnlocked ? 'dt-badge__name--unlocked' : 'dt-badge__name--locked'}`}>
                        {badge.name}
                      </h3>
                      <p className="dt-badge__desc">{badge.description}</p>
                      {isUnlocked && (
                        <div className={`dt-badge__unlock dt-badge__unlock--${rarity}`}>
                          <span>✓ Desbloqueado</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Career Stats */}
      {currentCareer && (
        <div className="dt-badges__career">
          <h2>Estadísticas de Carrera</h2>
          <div className="dt-badges__stats-grid">
            <div className="dt-badges__stat-card">
              <div className="dt-badges__stat-value">{currentCareer.stats.played}</div>
              <div className="dt-badges__stat-label">Partidos</div>
            </div>
            <div className="dt-badges__stat-card">
              <div className="dt-badges__stat-value">{currentCareer.stats.goalsFor}</div>
              <div className="dt-badges__stat-label">Goles</div>
            </div>
            <div className="dt-badges__stat-card">
              <div className="dt-badges__stat-value dt-badges__stat-value--formation">{currentCareer.formation}</div>
              <div className="dt-badges__stat-label">Formación</div>
            </div>
            <div className="dt-badges__stat-card">
              <div className="dt-badges__stat-value dt-badges__stat-value--formation">{currentCareer.squad.length}</div>
              <div className="dt-badges__stat-label">Jugadores</div>
            </div>
          </div>
        </div>
      )}
    </DTPageLayout>
  );
}

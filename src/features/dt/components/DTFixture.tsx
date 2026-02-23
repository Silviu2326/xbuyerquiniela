import { useState } from 'react';
import { useDTStore } from '../store/dtStore';
import { Calendar, Swords, Dumbbell, AlertCircle, Trophy, Shield } from 'lucide-react';
import { getNationInfo } from '../data/players';
import { DTPageLayout } from './DTPageLayout';
import './DTFixture.css';

export function DTFixture() {
  const { currentCareer, setView, initTournament, playNextMatch } = useDTStore();
  const [activeTab, setActiveTab] = useState<'matches' | 'standings'>('matches');

  if (!currentCareer) {
    return (
      <DTPageLayout title="Calendario" showBack>
        <div className="fix-empty">
          <p>No hay carrera activa</p>
          <button
            onClick={() => setView('landing')}
            className="fix-empty__btn"
          >
            Volver
          </button>
        </div>
      </DTPageLayout>
    );
  }

  // If tournament not initialized yet
  if (!currentCareer.tournament) {
    return (
      <DTPageLayout title="Preparación" showBack >
        {/* Team Card */}
        <div className="fix-prep__team">
          <div className="fix-prep__team-header">
            <div className="fix-prep__flag-wrapper">
              <div className="fix-prep__flag-glow" />
              <div className="fix-prep__flag">
                {getNationInfo(currentCareer.nationId)?.nation.flag || '🏳️'}
              </div>
            </div>
            <div className="fix-prep__team-info">
              <h2>
                {getNationInfo(currentCareer.nationId)?.nation.name || currentCareer.nationId}
              </h2>
              <p>{currentCareer.squad.length} jugadores convocados</p>
            </div>
          </div>

          <div className="fix-prep__squad">
            {['GK', 'DEF', 'MID', 'FWD'].map((pos) => (
              <div key={pos} className="fix-prep__pos">
                <div className="fix-prep__pos-count">
                  {currentCareer.squad.filter(p => p.position === pos).length}
                </div>
                <div className="fix-prep__pos-label">{pos}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Formation */}
        <div className="fix-prep__formation">
          <span className="fix-prep__formation-label">Formación</span>
          <span className="fix-prep__formation-value">{currentCareer.formation}</span>
        </div>

        {/* Start Button */}
        <div className="fix-prep__start-wrapper">
          <div className="fix-prep__start-glow" />
          
          <button
            onClick={initTournament}
            className="fix-prep__start-btn"
          >
            <Trophy size={32} />
            Comenzar Mundial
            <Trophy size={32} />
          </button>
          
          <p className="fix-prep__start-hint">
            Inicia el torneo para jugar tu primer partido
          </p>
        </div>
      </DTPageLayout>
    );
  }

  const tournament = currentCareer.tournament;
  const userGroup = tournament.groups.find(g => g.id === tournament.userGroupId);
  // Filtrar solo los partidos donde el usuario participa (no todos los del grupo)
  const userMatches = userGroup?.matches.filter(m => 
    m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId
  ) || [];
  const playedMatches = userMatches.filter(m => m.played);
  const nextGroupMatch = userMatches.find(m => !m.played);

  const isKnockoutPhase = tournament.currentPhase !== 'group';
  const userKnockoutMatches = tournament.knockoutMatches.filter(m => 
    m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId
  );
  const currentKnockoutMatch = userKnockoutMatches.find(m => !m.played);

  const standings = userGroup?.standings?.map(s => ({
    ...s,
    gd: s.goalsFor - s.goalsAgainst,
    isUser: s.nationId === currentCareer.nationId,
  })).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.goalsFor - a.goalsFor;
  }) || [];

  return (
    <DTPageLayout title="Calendario" showBack>
      {/* Next Match Card */}
      <div>
        {(isKnockoutPhase && currentKnockoutMatch) || (!isKnockoutPhase && nextGroupMatch) ? (
          <div className="fix-next">
            <div className="fix-next__bg"></div>
            <div className="fix-next__content">
              <div className="fix-next__badge">
                <span>
                  {isKnockoutPhase ? currentKnockoutMatch?.round : `Jornada ${nextGroupMatch?.matchday}`}
                </span>
              </div>
              
              <div className="fix-next__teams">
                <div className="fix-next__team">
                  <div className="fix-next__team-flag">
                    {getNationInfo(currentCareer.nationId)?.nation.flag || '🏳️'}
                  </div>
                  <span className="fix-next__team-name">
                    {getNationInfo(currentCareer.nationId)?.nation.name || 'Tú'}
                  </span>
                </div>
                
                <div className="fix-next__vs">
                  VS
                </div>
                
                <div className="fix-next__team">
                  <div className="fix-next__team-flag fix-next__team-flag--rival">
                    {isKnockoutPhase ? '❓' : '🏳️'}
                  </div>
                  <span className="fix-next__team-name--rival">Rival</span>
                </div>
              </div>

              {/* Training Alert */}
              {currentCareer.canTrain && (
                <div className="fix-next__training">
                  <div className="fix-next__training-text">
                    <AlertCircle size={18} />
                    <span>Entrenamiento pendiente</span>
                  </div>
                </div>
              )}

              <div className="fix-next__actions">
                {currentCareer.canTrain && (
                  <button
                    onClick={() => setView('training')}
                    className="fix-next__btn fix-next__btn--train"
                  >
                    <Dumbbell size={20} />
                    Entrenar
                  </button>
                )}
                <button
                  onClick={() => { playNextMatch(); setView('match-setup'); }}
                  className="fix-next__btn fix-next__btn--play"
                >
                  <Swords size={20} />
                  Jugar
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Torneo completado
          <div className="fix-completed">
            <Trophy size={48} />
            <h3>¡Torneo Completado!</h3>
            <p>Has finalizado todos los partidos</p>
            <button
              onClick={() => setView('stats')}
              className="fix-completed__btn"
            >
              Ver Estadísticas
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="fix-tabs">
        <button
          onClick={() => setActiveTab('matches')}
          className={`fix-tab ${activeTab === 'matches' ? 'fix-tab--active' : ''}`}
        >
          <Calendar size={18} />
          Partidos
        </button>
        <button
          onClick={() => setActiveTab('standings')}
          className={`fix-tab ${activeTab === 'standings' ? 'fix-tab--active' : ''}`}
        >
          <Shield size={18} />
          Clasificación
        </button>
      </div>

      {/* Content */}
      <div className="fix-matches">
        {activeTab === 'matches' ? (
          <>
            {/* Fase info */}
            <div className="fix-phase">
              <div className="fix-phase__info">
                <Trophy size={20} />
                <span>
                  {isKnockoutPhase ? tournament.currentRound || 'Fase Eliminatoria' : 'Fase de Grupos'}
                </span>
              </div>
            </div>

            {/* Matches list */}
            {(isKnockoutPhase ? userKnockoutMatches : userMatches).map((match) => {
              const isUserHome = match.homeNationId === currentCareer.nationId;
              const opponentId = isUserHome ? match.awayNationId : match.homeNationId;
              const opponent = getNationInfo(opponentId)?.nation || { name: 'Rival', flag: '🏳️' };
              
              const isWin = match.played && ((isUserHome && match.homeScore > match.awayScore) || (!isUserHome && match.awayScore > match.homeScore));
              const isDraw = match.played && match.homeScore === match.awayScore;
              
              return (
                <div
                  key={match.id}
                  className={`fix-match ${
                    match.played
                      ? isWin ? 'fix-match--win' : isDraw ? 'fix-match--draw' : 'fix-match--loss'
                      : 'fix-match--pending'
                  }`}
                >
                  <div className="fix-match__header">
                    <span className="fix-match__round">
                      {match.round || `Jornada ${match.matchday}`}
                    </span>
                    {match.played && (
                      <span className={`fix-match__result ${
                        isWin ? 'fix-match__result--win' : isDraw ? 'fix-match__result--draw' : 'fix-match__result--loss'
                      }`}>
                        {isWin ? 'Victoria' : isDraw ? 'Empate' : 'Derrota'}
                      </span>
                    )}
                    {!match.played && (
                      <span className="fix-match__result fix-match__result--pending">
                        Pendiente
                      </span>
                    )}
                  </div>

                  <div className="fix-match__teams">
                    <div className="fix-match__team">
                      <div className={`fix-match__team-flag ${isUserHome ? 'fix-match__team-flag--user' : 'fix-match__team-flag--rival'}`}>
                        {isUserHome ? getNationInfo(currentCareer.nationId)?.nation.flag : opponent.flag}
                      </div>
                      <span className={`fix-match__team-name ${isUserHome ? 'fix-match__team-name--user' : 'fix-match__team-name--rival'}`}>
                        {isUserHome ? 'Tú' : opponent.name}
                      </span>
                    </div>

                    <div className="fix-match__score">
                      {match.played ? (
                        <div className="fix-match__score-value">{match.homeScore} - {match.awayScore}</div>
                      ) : (
                        <div className="fix-match__score-vs">VS</div>
                      )}
                    </div>

                    <div className="fix-match__team">
                      <div className={`fix-match__team-flag ${!isUserHome ? 'fix-match__team-flag--user' : 'fix-match__team-flag--rival'}`}>
                        {!isUserHome ? getNationInfo(currentCareer.nationId)?.nation.flag : opponent.flag}
                      </div>
                      <span className={`fix-match__team-name ${!isUserHome ? 'fix-match__team-name--user' : 'fix-match__team-name--rival'}`}>
                        {!isUserHome ? 'Tú' : opponent.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {/* Fase info */}
            <div className="fix-phase">
              <div className="fix-phase__info">
                <Shield size={20} />
                <span>
                  {isKnockoutPhase ? 'Fase Eliminatoria' : `Grupo ${userGroup?.name || ''}`}
                </span>
              </div>
              {!isKnockoutPhase && (
                <span className="fix-phase__hint">2 primeros clasifican</span>
              )}
            </div>

            {isKnockoutPhase ? (
              // Fase eliminatoria
              <div className="fix-knockout">
                {userKnockoutMatches.map((match) => {
                  const userTeam = getNationInfo(currentCareer.nationId);
                  return (
                    <div 
                      key={match.id}
                      className="fix-knockout__match"
                    >
                      <div className="fix-knockout__match-header">
                        <div className="fix-knockout__round">{match.round}</div>
                        {!match.played && (
                          <span className="fix-knockout__status">Próximo</span>
                        )}
                      </div>
                      
                      <div className="fix-knockout__teams">
                        <div className="fix-knockout__team">
                          <span className="fix-knockout__team-flag">{userTeam?.nation.flag}</span>
                          <span className="fix-knockout__team-name fix-knockout__team-name--user">Tú</span>
                        </div>
                        
                        <div className="fix-knockout__score">
                          {match.played ? (
                            <span className="fix-knockout__score-value">{match.homeScore} - {match.awayScore}</span>
                          ) : (
                            <span className="fix-knockout__score-vs">VS</span>
                          )}
                        </div>
                        
                        <div className="fix-knockout__team">
                          <span className="fix-knockout__team-flag">🏳️</span>
                          <span className="fix-knockout__team-name fix-knockout__team-name--rival">Rival</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Fase de grupos - tabla de clasificación
              <div className="fix-table">
                {/* Header */}
                <div className="fix-table__header">
                  <div className="fix-table__header-left">
                    <span className="fix-table__col-header fix-table__col-header--rank">#</span>
                    <span className="fix-table__col-header fix-table__col-header--team">Equipo</span>
                  </div>
                  <div className="fix-table__header-right">
                    <span className="fix-table__col-header fix-table__col-header--num">PJ</span>
                    <span className="fix-table__col-header fix-table__col-header--num">GF</span>
                    <span className="fix-table__col-header fix-table__col-header--num">DG</span>
                    <span className="fix-table__col-header fix-table__col-header--points">PTS</span>
                  </div>
                </div>
                
                {standings.map((team, index) => (
                  <div
                    key={team.nationId}
                    className={`fix-table__row ${team.isUser ? 'fix-table__row--user' : index % 2 === 0 ? '' : 'fix-table__row--alt'}`}
                  >
                    <div className="fix-table__team">
                      <span className={`fix-table__rank ${
                        index < 2 ? 'fix-table__rank--qualified' : 
                        index === 2 ? 'fix-table__rank--playoff' : 
                        'fix-table__rank--out'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="fix-table__flag">{team.isUser ? getNationInfo(currentCareer.nationId)?.nation.flag : '🏳️'}</span>
                      <span className={`fix-table__team-name ${team.isUser ? 'fix-table__team-name--user' : 'fix-table__team-name--other'}`}>
                        {team.isUser ? getNationInfo(currentCareer.nationId)?.nation.name : `Equipo ${team.nationId.slice(-3)}`}
                      </span>
                    </div>
                    <div className="fix-table__header-right">
                      <span className="fix-table__num fix-table__num--played">{team.played}</span>
                      <span className="fix-table__num fix-table__num--goals">{team.goalsFor}</span>
                      <span className={`fix-table__num ${team.gd > 0 ? 'fix-table__num--gd' : team.gd < 0 ? 'fix-table__num--gd-neg' : 'fix-table__num--played'}`}>
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </span>
                      <span className="fix-table__points">{team.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Progress */}
      {!isKnockoutPhase && (
        <div className="fix-progress">
          <div className="fix-progress__header">
            <span className="fix-progress__label">Progreso Grupos</span>
            <span className="fix-progress__value">{playedMatches.length}/3</span>
          </div>
          <div className="fix-progress__bar">
            <div 
              className="fix-progress__fill" 
              style={{ width: `${(playedMatches.length / 3) * 100}%` }} 
            />
          </div>
        </div>
      )}
    </DTPageLayout>
  );
}

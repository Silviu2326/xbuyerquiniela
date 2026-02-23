import { useDTStore, type DTGroup, type DTGroupStanding } from '../store/dtStore';
import { Trophy, Medal, TrendingUp, ChevronRight, Users, Target } from 'lucide-react';
import { getNationInfo } from '../data/players';
import { DTPageLayout } from './DTPageLayout';
import './DTStandings.css';

// Función para recalcular standings desde los partidos actuales
function calculateStandingsFromMatches(group: DTGroup): DTGroupStanding[] {
  const standings = group.teams.map(teamId => {
    const teamMatches = group.matches.filter(
      m => m.played && (m.homeNationId === teamId || m.awayNationId === teamId)
    );
    
    let played = 0, won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0, points = 0;
    
    teamMatches.forEach(match => {
      played++;
      const isHome = match.homeNationId === teamId;
      const teamGoals = isHome ? match.homeScore : match.awayScore;
      const oppGoals = isHome ? match.awayScore : match.homeScore;
      
      goalsFor += teamGoals;
      goalsAgainst += oppGoals;
      
      if (teamGoals > oppGoals) {
        won++;
        points += 3;
      } else if (teamGoals === oppGoals) {
        drawn++;
        points += 1;
      } else {
        lost++;
      }
    });
    
    return {
      nationId: teamId,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      points,
    };
  });
  
  return standings.sort((a, b) => {
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (b.points !== a.points) return b.points - a.points;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });
}

export function DTStandings() {
  const { currentCareer, setView } = useDTStore();

  if (!currentCareer?.tournament) {
    return (
      <DTPageLayout title="Clasificación" showBack>
        <div className="dt-standings__empty">
          <Trophy size={64} />
          <p>El torneo aún no ha comenzado</p>
          <button
            onClick={() => setView('fixture')}
            className="dt-standings__empty-btn"
          >
            Ir a Calendario
          </button>
        </div>
      </DTPageLayout>
    );
  }

  const tournament = currentCareer.tournament;
  const isKnockoutPhase = tournament.currentPhase !== 'group';
  const userGroup = tournament.groups.find(g => g.id === tournament.userGroupId);

  // Recalcular standings desde los partidos actuales para asegurar que estén actualizadas
  const calculatedStandings = userGroup ? calculateStandingsFromMatches(userGroup) : [];
  
  // Calcular estadísticas del grupo
  const groupStats = calculatedStandings.map(s => ({
    ...s,
    gd: s.goalsFor - s.goalsAgainst,
    isUser: s.nationId === currentCareer.nationId,
  }));

  // Partidos del usuario en fase eliminatoria
  const userKnockoutMatches = tournament.knockoutMatches.filter(m => 
    m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId
  );

  const userInfo = getNationInfo(currentCareer.nationId);
  const userPosition = groupStats.findIndex(s => s.isUser) + 1;
  const isQualified = userPosition <= 2;
  
  // Verificar si la fase de grupos ha terminado (todos los partidos jugados)
  const userMatches = userGroup?.matches || [];
  const playedMatches = userMatches.filter(m => m.played).length;
  const totalMatches = userMatches.length;
  const isGroupPhaseFinished = playedMatches === totalMatches && totalMatches > 0;

  return (
    <DTPageLayout title="Clasificación" showBack>
      {/* Fase Indicator */}
      <div className="dt-standings__phase">
        <div className="dt-standings__phase-icon">
          {isKnockoutPhase ? <Trophy size={28} /> : <Users size={28} />}
        </div>
        <div className="dt-standings__phase-info">
          <p>{isKnockoutPhase ? 'Fase Eliminatoria' : `Grupo ${userGroup?.name || ''}`}</p>
          <h3>{isKnockoutPhase ? tournament.currentRound : 'Fase de Grupos'}</h3>
        </div>
      </div>

      {!isKnockoutPhase ? (
        // FASE DE GRUPOS
        <>
          {/* Posición del usuario */}
          <div className={`dt-standings__position ${isQualified ? 'dt-standings__position--qualified' : 'dt-standings__position--not-qualified'}`}>
            <div className="dt-standings__position-header">
              <span className="dt-standings__position-label">Tu Posición</span>
              <span className={`dt-standings__position-rank ${isQualified ? 'dt-standings__position-rank--qualified' : 'dt-standings__position-rank--not-qualified'}`}>
                #{userPosition}
              </span>
            </div>
            
            <div className="dt-standings__position-team">
              <div className="dt-standings__position-flag">
                {userInfo?.nation.flag}
              </div>
              <div className="dt-standings__position-info">
                <h4>{userInfo?.nation.name}</h4>
                <div className="dt-standings__position-stats">
                  <div className="dt-standings__position-stat">
                    <p className="dt-standings__position-stat-value dt-standings__position-stat-value--points">
                      {groupStats.find(s => s.isUser)?.points || 0}
                    </p>
                    <p className="dt-standings__position-stat-label">Pts</p>
                  </div>
                  <div className="dt-standings__position-stat">
                    <p className="dt-standings__position-stat-value dt-standings__position-stat-value--goals">
                      {groupStats.find(s => s.isUser)?.goalsFor || 0}
                    </p>
                    <p className="dt-standings__position-stat-label">GF</p>
                  </div>
                  <div className="dt-standings__position-stat">
                    <p className={`dt-standings__position-stat-value ${(groupStats.find(s => s.isUser)?.gd || 0) >= 0 ? 'dt-standings__position-stat-value--gd' : 'dt-standings__position-stat-value--gd-negative'}`}>
                      {(groupStats.find(s => s.isUser)?.gd || 0) > 0 ? '+' : ''}{groupStats.find(s => s.isUser)?.gd || 0}
                    </p>
                    <p className="dt-standings__position-stat-label">DG</p>
                  </div>
                </div>
              </div>
            </div>

            {isGroupPhaseFinished ? (
              // Fase de grupos terminada - mostrar resultado final
              isQualified ? (
                <div className="dt-standings__status dt-standings__status--qualified">
                  <p>✅ Clasificado a la siguiente ronda</p>
                </div>
              ) : (
                <div className="dt-standings__status dt-standings__status--eliminated">
                  <p>❌ Eliminado del torneo</p>
                </div>
              )
            ) : (
              // Fase de grupos en curso - mostrar estado actual
              isQualified ? (
                <div className="dt-standings__status dt-standings__status--qualified">
                  <p>✅ En zona de clasificación</p>
                </div>
              ) : (
                <div className="dt-standings__status dt-standings__status--playoff">
                  <p>⚠️ Fuera de zona de clasificación - Quedan {totalMatches - playedMatches} partidos</p>
                </div>
              )
            )}
          </div>

          {/* Tabla de clasificación */}
          <div className="dt-standings__table-section">
            <h3>
              <TrendingUp size={20} />
              Tabla de Posiciones
            </h3>
            
            <div className="dt-standings__table">
              {/* Header */}
              <div className="dt-standings__table-header">
                <span className="dt-standings__col-rank" className="text-gray-400" style={{ fontSize: '0.625rem' }}>#</span>
                <span style={{ flex: 1, color: '#a0a0b0', fontSize: '0.625rem' }}>Equipo</span>
                <span className="dt-standings__col-num" className="text-gray-400" style={{ fontSize: '0.625rem' }}>PJ</span>
                <span className="dt-standings__col-num" className="text-gray-400" style={{ fontSize: '0.625rem' }}>GF</span>
                <span className="dt-standings__col-num" className="text-gray-400" style={{ fontSize: '0.625rem' }}>DG</span>
                <span className="dt-standings__col-points" style={{ color: '#FFE600', fontSize: '0.625rem' }}>PTS</span>
              </div>

              {groupStats.map((team, index) => (
                <div
                  key={team.nationId}
                  className={`dt-standings__table-row ${team.isUser ? 'dt-standings__table-row--user' : ''} ${index % 2 === 0 ? 'dt-standings__table-row--alt' : ''}`}
                >
                  <span className={`dt-standings__col-rank ${index < 2 ? 'dt-standings__col-rank--qualified' : index === 2 ? 'dt-standings__col-rank--playoff' : 'dt-standings__col-rank--eliminated'}`}>
                    {index + 1}
                  </span>
                  
                  <div className="dt-standings__col-team">
                    <div className="dt-standings__team-flag">
                      <span>{team.isUser ? userInfo?.nation.code : getNationInfo(team.nationId)?.nation.code || '??'}</span>
                    </div>
                    <span className={`dt-standings__team-name ${team.isUser ? 'dt-standings__team-name--user' : 'dt-standings__team-name--other'}`}>
                      {team.isUser ? userInfo?.nation.name : getNationInfo(team.nationId)?.nation.name || team.nationId}
                    </span>
                    {team.isUser && (
                      <span className="dt-standings__team-tag">Tú</span>
                    )}
                  </div>

                  <span className="dt-standings__col-num">{team.played}</span>
                  <span className="dt-standings__col-num dt-standings__col-num--goals">{team.goalsFor}</span>
                  <span className={`dt-standings__col-num ${team.gd > 0 ? 'dt-standings__col-num--gd' : team.gd < 0 ? 'dt-standings__col-num--gd-negative' : ''}`}>
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </span>
                  <span className="dt-standings__col-points">{team.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partidos del grupo */}
          <div className="dt-standings__matches-section">
            <h3>
              <Target size={20} />
              Partidos del Grupo
            </h3>
            
            <div className="dt-standings__matches">
              {userGroup?.matches?.filter(m => 
                m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId
              ).map((match) => {
                const isUserHome = match.homeNationId === currentCareer.nationId;
                const homeNation = getNationInfo(match.homeNationId)?.nation;
                const awayNation = getNationInfo(match.awayNationId)?.nation;
                
                return (
                  <div 
                    key={match.id}
                    className={`dt-standings__match ${match.played ? 'dt-standings__match--played' : 'dt-standings__match--pending'}`}
                  >
                    <div className="dt-standings__match-header">
                      <span className="dt-standings__match-round">
                        {match.round || `Jornada ${match.matchday}`}
                      </span>
                      {match.played ? (
                        <span className="dt-standings__match-status dt-standings__match-status--played">Finalizado</span>
                      ) : (
                        <span className="dt-standings__match-status dt-standings__match-status--pending">Pendiente</span>
                      )}
                    </div>
                    
                    <div className="dt-standings__match-teams">
                      <div className="dt-standings__match-team">
                        <div className="dt-standings__match-flag">
                          <span>{homeNation?.code || '??'}</span>
                        </div>
                        <span className={isUserHome ? 'dt-standings__match-team-name dt-standings__match-team-name--user' : 'dt-standings__match-team-name dt-standings__match-team-name--other'}>
                          {isUserHome ? 'Tú' : homeNation?.name || match.homeNationId}
                        </span>
                      </div>
                      
                      <div className="dt-standings__match-score">
                        {match.played ? (
                          <span className="dt-standings__match-score-value">
                            {match.homeScore} - {match.awayScore}
                          </span>
                        ) : (
                          <span className="dt-standings__match-score-vs">VS</span>
                        )}
                      </div>
                      
                      <div className="dt-standings__match-team dt-standings__match-team--away">
                        <span className={!isUserHome ? 'dt-standings__match-team-name dt-standings__match-team-name--user' : 'dt-standings__match-team-name dt-standings__match-team-name--other'}>
                          {!isUserHome ? 'Tú' : awayNation?.name || match.awayNationId}
                        </span>
                        <div className="dt-standings__match-flag">
                          <span>{awayNation?.code || '??'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        // FASE ELIMINATORIA
        <>
          {/* Bracket */}
          <div className="dt-standings__knockout">
            <h3>
              <Medal size={20} />
              Tu Camino en la Fase Final
            </h3>

            <div className="dt-standings__bracket">
              {userKnockoutMatches.map((match, idx) => {
                const isUserHome = match.homeNationId === currentCareer.nationId;
                const isWin = match.played && ((isUserHome && match.homeScore! > match.awayScore!) || (!isUserHome && match.awayScore! > match.homeScore!));

                
                return (
                  <div key={match.id} className="dt-standings__bracket-match">
                    {/* Connector line */}
                    {idx < userKnockoutMatches.length - 1 && (
                      <div className="dt-standings__bracket-connector" />
                    )}
                    
                    <div className={`dt-standings__bracket-card ${match.played ? (isWin ? 'dt-standings__bracket-card--win' : 'dt-standings__bracket-card--loss') : 'dt-standings__bracket-card--pending'}`}>
                      
                      <div className="dt-standings__bracket-header">
                        <span className="dt-standings__bracket-round">
                          {match.round}
                        </span>
                        {match.played && (
                          <span className={`dt-standings__bracket-result ${isWin ? 'dt-standings__bracket-result--win' : 'dt-standings__bracket-result--loss'}`}>
                            {isWin ? 'Victoria' : 'Eliminado'}
                          </span>
                        )}
                        {!match.played && idx === 0 && (
                          <span className="dt-standings__bracket-result dt-standings__bracket-result--next">
                            Próximo
                          </span>
                        )}
                      </div>

                      <div className="dt-standings__bracket-teams">
                        <div className="dt-standings__bracket-team">
                          <div className={`dt-standings__bracket-flag ${isUserHome ? 'dt-standings__bracket-flag--user' : 'dt-standings__bracket-flag--rival'}`}>
                            {isUserHome ? userInfo?.nation.flag : '🏳️'}
                          </div>
                          <div>
                            <p className={isUserHome ? 'dt-standings__bracket-team-name dt-standings__bracket-team-name--user' : 'dt-standings__bracket-team-name dt-standings__bracket-team-name--rival'}>
                              {isUserHome ? 'Tú' : 'Rival'}
                            </p>
                          </div>
                        </div>

                        <div className="dt-standings__bracket-score">
                          {match.played ? (
                            <span className="dt-standings__bracket-score-value">
                              {match.homeScore} - {match.awayScore}
                            </span>
                          ) : (
                            <span className="dt-standings__bracket-score-vs">VS</span>
                          )}
                        </div>

                        <div className="dt-standings__bracket-team dt-standings__bracket-team--away">
                          <div>
                            <p className={!isUserHome ? 'dt-standings__bracket-team-name dt-standings__bracket-team-name--user' : 'dt-standings__bracket-team-name dt-standings__bracket-team-name--rival'}>
                              {!isUserHome ? 'Tú' : 'Rival'}
                            </p>
                          </div>
                          <div className={`dt-standings__bracket-flag ${!isUserHome ? 'dt-standings__bracket-flag--user' : 'dt-standings__bracket-flag--rival'}`}>
                            {!isUserHome ? userInfo?.nation.flag : '🏳️'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estado actual */}
          {userKnockoutMatches.some(m => !m.played) && (
            <div className="dt-standings__next">
              <div className="dt-standings__next-icon">
                <ChevronRight size={24} />
              </div>
              <div className="dt-standings__next-info">
                <p>Siguiente Ronda</p>
                <h4>{userKnockoutMatches.find(m => !m.played)?.round || 'Final'}</h4>
              </div>
            </div>
          )}
        </>
      )}
    </DTPageLayout>
  );
}

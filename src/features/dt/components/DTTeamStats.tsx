import { useState } from "react";
import { useDTStore } from "../store/dtStore";
import { Trophy, Target, Users, Star, Shield } from "lucide-react";
import { DTPageLayout } from "./DTPageLayout";
import "./DTTeamStats.css";

export function DTTeamStats() {
  const { currentCareer } = useDTStore();
  const [activeTab, setActiveTab] = useState<"overview" | "players" | "top">(
    "overview",
  );

  if (!currentCareer) return null;

  const { stats, playerStats, topScorers, squad } = currentCareer;
  const safeStats = stats || {
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
  };
  const safeSquad = squad || [];
  const safeTopScorers = topScorers || [];
  const allPlayerStats = Object.values(playerStats || {});

  // Calculate team stats
  const totalGoals = allPlayerStats.reduce((sum, p) => sum + p.goals, 0);
  const totalAssists = allPlayerStats.reduce((sum, p) => sum + p.assists, 0);
  const totalYellowCards = allPlayerStats.reduce(
    (sum, p) => sum + p.yellowCards,
    0,
  );
  const totalRedCards = allPlayerStats.reduce((sum, p) => sum + p.redCards, 0);
  const totalCleanSheets = allPlayerStats.reduce(
    (sum, p) => sum + (p.cleanSheets || 0),
    0,
  );

  // Get best rated player
  const bestRatedPlayer =
    allPlayerStats.length > 0
      ? allPlayerStats
          .filter((p) => p.matchesPlayed >= 2)
          .sort((a, b) => b.rating - a.rating)[0]
      : null;

  const getPlayerName = (playerId: string) => {
    return safeSquad.find((p) => p.id === playerId)?.name || "Unknown";
  };

  const getPlayerPosition = (playerId: string) => {
    return safeSquad.find((p) => p.id === playerId)?.position || "MID";
  };

  const getPosClass = (pos: string) => {
    switch (pos) {
      case "GK":
        return "dt-stats__table-pos--gk";
      case "DEF":
        return "dt-stats__table-pos--def";
      case "MID":
        return "dt-stats__table-pos--mid";
      case "FWD":
        return "dt-stats__table-pos--fwd";
      default:
        return "dt-stats__table-pos--mid";
    }
  };

  const getTopItemClass = (index: number) => {
    if (index === 0) return "dt-stats__top-item--gold";
    if (index === 1) return "dt-stats__top-item--silver";
    if (index === 2) return "dt-stats__top-item--bronze";
    return "dt-stats__top-item--default";
  };

  const getTopRankClass = (index: number) => {
    if (index === 0) return "dt-stats__top-rank--gold";
    if (index === 1) return "dt-stats__top-rank--silver";
    if (index === 2) return "dt-stats__top-rank--bronze";
    return "dt-stats__top-rank--default";
  };

  return (
    <DTPageLayout title="Estadísticas" showBack={true}>
      {/* Tabs */}
      <div className="dt-stats__tabs">
        {[
          { id: "overview", label: "General", icon: Trophy },
          { id: "players", label: "Jugadores", icon: Users },
          { id: "top", label: "Top", icon: Star },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`dt-stats__tab ${activeTab === tab.id ? "dt-stats__tab--active" : ""}`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="dt-stats__content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Tournament Stats */}
            <div className="dt-stats__card">
              <h3 className="dt-stats__card-header">
                <Trophy size={20} />
                Torneo
              </h3>
              <div className="dt-stats__grid-2">
                <div className="dt-stats__grid-item">
                  <div className="dt-stats__grid-value dt-stats__grid-value--blue">
                    {safeStats.played}
                  </div>
                  <div className="dt-stats__grid-label">Partidos</div>
                </div>
                <div className="dt-stats__grid-item">
                  <div className="dt-stats__grid-value dt-stats__grid-value--blue">
                    {safeStats.won}
                  </div>
                  <div className="dt-stats__grid-label">Victorias</div>
                </div>
                <div className="dt-stats__grid-item">
                  <div className="dt-stats__grid-value dt-stats__grid-value--yellow">
                    {safeStats.drawn}
                  </div>
                  <div className="dt-stats__grid-label">Empates</div>
                </div>
                <div className="dt-stats__grid-item">
                  <div className="dt-stats__grid-value dt-stats__grid-value--red">
                    {safeStats.lost}
                  </div>
                  <div className="dt-stats__grid-label">Derrotas</div>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="dt-stats__card">
              <h3 className="dt-stats__card-header">
                <Target size={20} />
                Estadísticas del Equipo
              </h3>
              <div className="dt-stats__list">
                <div className="dt-stats__list-item">
                  <span className="dt-stats__list-label">Goles a Favor</span>
                  <span className="dt-stats__list-value">
                    {safeStats.goalsFor}
                  </span>
                </div>
                <div className="dt-stats__list-item">
                  <span className="dt-stats__list-label">Goles en Contra</span>
                  <span className="dt-stats__list-value">
                    {safeStats.goalsAgainst}
                  </span>
                </div>
                <div className="dt-stats__list-item">
                  <span className="dt-stats__list-label">
                    Diferencia de Gol
                  </span>
                  <span
                    className={`dt-stats__list-value ${safeStats.goalsFor - safeStats.goalsAgainst >= 0 ? "dt-stats__list-value--positive" : "dt-stats__list-value--negative"}`}
                  >
                    {safeStats.goalsFor - safeStats.goalsAgainst > 0 ? "+" : ""}
                    {safeStats.goalsFor - safeStats.goalsAgainst}
                  </span>
                </div>
                <div className="dt-stats__list-item">
                  <span className="dt-stats__list-label">
                    Goles de Jugadores
                  </span>
                  <span className="dt-stats__list-value dt-stats__list-value--positive">
                    {totalGoals}
                  </span>
                </div>
                <div className="dt-stats__list-item">
                  <span className="dt-stats__list-label">Asistencias</span>
                  <span className="dt-stats__list-value dt-stats__list-value--positive">
                    {totalAssists}
                  </span>
                </div>
                <div className="dt-stats__list-item">
                  <span className="dt-stats__list-label">Porterías a Cero</span>
                  <span className="dt-stats__list-value dt-stats__list-value--positive">
                    {totalCleanSheets}
                  </span>
                </div>
              </div>
            </div>

            {/* Discipline */}
            <div className="dt-stats__card">
              <h3 className="dt-stats__card-header">Disciplina</h3>
              <div className="dt-stats__discipline">
                <div className="dt-stats__discipline-card dt-stats__discipline-card--yellow">
                  <div className="dt-stats__discipline-value dt-stats__discipline-value--yellow">
                    {totalYellowCards}
                  </div>
                  <div className="dt-stats__discipline-label">Amarillas</div>
                </div>
                <div className="dt-stats__discipline-card dt-stats__discipline-card--red">
                  <div className="dt-stats__discipline-value dt-stats__discipline-value--red">
                    {totalRedCards}
                  </div>
                  <div className="dt-stats__discipline-label">Rojas</div>
                </div>
              </div>
            </div>

            {/* Featured Players */}
            {bestRatedPlayer && (
              <div className="dt-stats__featured">
                <h3 className="dt-stats__featured-header">
                  <Star size={20} />
                  Jugador Destacado
                </h3>
                <div className="dt-stats__featured-content">
                  <div className="dt-stats__featured-avatar">
                    <span>
                      {getPlayerName(bestRatedPlayer.playerId).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4>{getPlayerName(bestRatedPlayer.playerId)}</h4>
                    <p className="dt-stats__featured-meta">
                      {getPlayerPosition(bestRatedPlayer.playerId)} •{" "}
                      {bestRatedPlayer.rating.toFixed(1)} valoración
                    </p>
                    <p className="dt-stats__featured-highlight">
                      {bestRatedPlayer.goals} goles en{" "}
                      {bestRatedPlayer.matchesPlayed} partidos
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Players Tab */}
        {activeTab === "players" && (
          <div className="dt-stats__table-container">
            <table className="dt-stats__table">
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th style={{ textAlign: "center" }}>PJ</th>
                  <th style={{ textAlign: "center" }}>G</th>
                  <th style={{ textAlign: "center" }}>A</th>
                  <th style={{ textAlign: "center" }}>Val</th>
                </tr>
              </thead>
              <tbody>
                {allPlayerStats
                  .sort((a, b) => b.matchesPlayed - a.matchesPlayed)
                  .map((stat) => {
                    const player = safeSquad.find(
                      (p) => p.id === stat.playerId,
                    );
                    if (!player) return null;

                    return (
                      <tr key={stat.playerId}>
                        <td>
                          <div className="dt-stats__table-player">
                            <div
                              className={`dt-stats__table-pos ${getPosClass(player.position)}`}
                            >
                              {player.position}
                            </div>
                            <div>
                              <div className="dt-stats__table-name">
                                {player.name}
                              </div>
                              <div className="dt-stats__table-minutes">
                                {stat.minutesPlayed} min
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="dt-stats__table-value">
                          {stat.matchesPlayed}
                        </td>
                        <td className="dt-stats__table-value dt-stats__table-value--goals">
                          {stat.goals}
                        </td>
                        <td className="dt-stats__table-value dt-stats__table-value--assists">
                          {stat.assists}
                        </td>
                        <td>
                          <span
                            className={`dt-stats__table-value ${stat.rating >= 7 ? "dt-stats__table-value--rating-good" : stat.rating >= 6 ? "dt-stats__table-value--rating-medium" : "dt-stats__table-value--rating-bad"}`}
                          >
                            {stat.rating.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* Top Scorers Tab */}
        {activeTab === "top" && (
          <>
            {/* Top Goalscorers */}
            <div className="dt-stats__card">
              <h3 className="dt-stats__card-header">
                <Target size={20} />
                Goleadores
              </h3>
              <div className="dt-stats__top-list">
                {safeTopScorers.length > 0 ? (
                  safeTopScorers.map((scorer, index) => (
                    <div
                      key={scorer.playerId}
                      className={`dt-stats__top-item ${getTopItemClass(index)}`}
                    >
                      <div
                        className={`dt-stats__top-rank ${getTopRankClass(index)}`}
                      >
                        {index + 1}
                      </div>
                      <div className="dt-stats__top-info">
                        <h4>{scorer.name}</h4>
                        <p>{getPlayerPosition(scorer.playerId)}</p>
                      </div>
                      <div className="dt-stats__top-score">
                        <div className="dt-stats__top-score-value">
                          {scorer.goals}
                        </div>
                        <div className="dt-stats__top-score-label">goles</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#a0a0b0",
                    }}
                  >
                    No hay goles registrados aún
                  </div>
                )}
              </div>
            </div>

            {/* Top Assists */}
            <div className="dt-stats__card">
              <h3 className="dt-stats__card-header">
                <Users size={20} style={{ color: "#FFE600" }} />
                Máximos Asistentes
              </h3>
              <div className="dt-stats__top-list">
                {allPlayerStats
                  .filter((p) => p.assists > 0)
                  .sort((a, b) => b.assists - a.assists)
                  .slice(0, 5)
                  .map((stat, index) => (
                    <div
                      key={stat.playerId}
                      className="dt-stats__top-item dt-stats__top-item--default"
                    >
                      <div
                        className="dt-stats__top-rank dt-stats__top-rank--default"
                        style={{
                          background: "rgba(255, 230, 0, 0.2)",
                          color: "#FFE600",
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="dt-stats__top-info">
                        <h4>{getPlayerName(stat.playerId)}</h4>
                        <p>{getPlayerPosition(stat.playerId)}</p>
                      </div>
                      <div className="dt-stats__top-score">
                        <div
                          className="dt-stats__top-score-value"
                          style={{ color: "#FFE600" }}
                        >
                          {stat.assists}
                        </div>
                        <div className="dt-stats__top-score-label">
                          asistencias
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Clean Sheets (GKs) */}
            <div className="dt-stats__card">
              <h3 className="dt-stats__card-header">
                <Shield size={20} />
                Porterías a Cero
              </h3>
              <div className="dt-stats__top-list">
                {allPlayerStats
                  .filter((p) => (p.cleanSheets || 0) > 0)
                  .sort((a, b) => (b.cleanSheets || 0) - (a.cleanSheets || 0))
                  .slice(0, 3)
                  .map((stat, index) => (
                    <div
                      key={stat.playerId}
                      className="dt-stats__clean-sheet-item"
                    >
                      <div className="dt-stats__clean-sheet-rank">
                        {index + 1}
                      </div>
                      <div className="dt-stats__top-info">
                        <h4>{getPlayerName(stat.playerId)}</h4>
                        <p>Portero</p>
                      </div>
                      <div className="dt-stats__top-score">
                        <div className="dt-stats__top-score-value">
                          {stat.cleanSheets}
                        </div>
                        <div className="dt-stats__top-score-label">
                          partidos
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DTPageLayout>
  );
}

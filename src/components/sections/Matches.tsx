import { useState, useMemo } from "react";
import { MATCHES } from "../../data/matches";
import { getFlagImage } from "../../utils/helpers";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import "./Matches.css";

interface MatchesProps {
  onNavigate: (view: string) => void;
  points: number;
}

export const Matches = ({ onNavigate, points }: MatchesProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const uniqueDates = useMemo(() => {
    const dates = [...new Set(MATCHES.map((m) => m.date))];
    return dates.sort();
  }, []);

  const uniqueTeams = useMemo(() => {
    const teams = new Set<string>();
    MATCHES.forEach((m) => {
      teams.add(m.h);
      teams.add(m.a);
    });
    return [...teams].sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredMatches = useMemo(() => {
    return MATCHES.filter((match) => {
      const matchesTeam = selectedTeam
        ? match.h === selectedTeam || match.a === selectedTeam
        : true;
      const matchesDate = selectedDate ? match.date === selectedDate : true;
      return matchesTeam && matchesDate;
    });
  }, [selectedTeam, selectedDate]);

  const totalMatches = filteredMatches.length;
  const liveMatches = filteredMatches.filter((m) => m.live).length;
  const groupStageMatches = filteredMatches.filter((m) => m.g).length;

  return (
    <MobileLayout onNavigate={onNavigate} currentView="match">
      <div className="min-h-screen bg-[#0D0D0D]">
        <Header points={points} />

        {/* Hero Section */}
        <div className="matches-hero">
          <div className="matches-banner-container">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
              alt="Mundial 2026 Banner"
              className="matches-banner-image"
            />
            <div className="matches-banner-overlay" />
          </div>

          <div className="matches-hero-glow" />

          {/* Back Button */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="matches-back-btn"
          >
            <span className="matches-back-btn-icon">←</span>
            <span className="hidden sm:inline">Volver</span>
          </button>

          {/* Hero Content */}
          <div className="matches-hero-content">
            <div className="matches-hero-icon">
              <div className="matches-hero-icon-glow" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            <h1 className="matches-hero-title">Partidos</h1>

            <div className="matches-hero-badges">
              <span className="matches-hero-badge matches-hero-badge--secondary">
                Mundial 2026
              </span>
              <span className="matches-hero-badge matches-hero-badge--primary">
                {totalMatches} Encuentros
              </span>
              {liveMatches > 0 && (
                <span className="matches-hero-badge matches-hero-badge--live">
                  {liveMatches} En Vivo
                </span>
              )}
            </div>

            <div className="matches-hero-stats">
              <div className="matches-hero-stat">
                <div className="matches-hero-stat-value matches-hero-stat-value--highlight">
                  {totalMatches}
                </div>
                <div className="matches-hero-stat-label">Total</div>
              </div>
              <div className="matches-hero-stat">
                <div className="matches-hero-stat-value">
                  {groupStageMatches}
                </div>
                <div className="matches-hero-stat-label">Fase Grupos</div>
              </div>
              <div className="matches-hero-stat">
                <div className="matches-hero-stat-value">16</div>
                <div className="matches-hero-stat-label">Sedes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="matches-filters">
          <div className="matches-filters-container">
            <div className="matches-filter-group">
              <label className="matches-filter-label">Selección</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="matches-filter-select"
              >
                <option value="">Todas</option>
                {uniqueTeams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
            <div className="matches-filter-group">
              <label className="matches-filter-label">Día</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="matches-filter-select"
              >
                <option value="">Todos</option>
                {uniqueDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
            {(selectedTeam || selectedDate) && (
              <button
                onClick={() => {
                  setSelectedTeam("");
                  setSelectedDate("");
                }}
                className="matches-filter-clear"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Limpiar
              </button>
            )}
          </div>
          {(selectedTeam || selectedDate) && (
            <div className="matches-filter-results">
              {filteredMatches.length} de {MATCHES.length} partidos
            </div>
          )}
        </div>

        {/* Matches List */}
        <div className="matches-list">
          {filteredMatches.length === 0 ? (
            <div className="matches-empty">
              <div className="matches-empty-icon">🔍</div>
              <p className="matches-empty-text">
                No se encontraron partidos con los filtros seleccionados
              </p>
              <button
                onClick={() => {
                  setSelectedTeam("");
                  setSelectedDate("");
                }}
                className="matches-empty-button"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filteredMatches.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-card-glow" />

                {/* Header */}
                <div className="match-card-header">
                  <span className="match-header-date">{match.date}</span>
                  {match.g && (
                    <span className="match-header-group">Grupo {match.g}</span>
                  )}
                </div>

                {/* Body */}
                <div className="match-card-body">
                  <div className="match-teams">
                    {/* Home Team */}
                    <div className="match-team">
                      <img
                        src={getFlagImage(match.h, 60)}
                        alt={match.h}
                        className="match-team-flag"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                      <span className="match-team-name">{match.h}</span>
                    </div>

                    {/* Score */}
                    <div className="match-score-container">
                      {match.live ? (
                        <>
                          <div className="match-score">
                            <span className="match-score-value">
                              {match.hS || 0}
                            </span>
                            <span className="match-score-divider">-</span>
                            <span className="match-score-value">
                              {match.aS || 0}
                            </span>
                          </div>
                          <div className="match-live-badge">
                            <span className="match-live-dot"></span>
                            <span className="match-live-text">
                              EN VIVO {match.min}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="match-time">{match.time}</div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="match-team match-team--away">
                      <span className="match-team-name">{match.a}</span>
                      <img
                        src={getFlagImage(match.a, 60)}
                        alt={match.a}
                        className="match-team-flag"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

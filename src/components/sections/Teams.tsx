import { useState } from "react";
import { TEAMS } from "../../data/teams";
import { getFlagImage } from "../../utils/helpers";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import type { Player } from "../../types/index.ts";
import "./Teams.css";

interface TeamsProps {
  onNavigate: (view: string) => void;
  points: number;
}

export const Teams = ({ onNavigate, points }: TeamsProps) => {
  const teamList = Object.keys(TEAMS).filter(
    (team) => !team.startsWith("Por definir"),
  );
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const getPlayersByPosition = (players: Player[]) => {
    const positions = {
      POR: players.filter((p) => p.p === "POR"),
      DEF: players.filter((p) => p.p === "DEF"),
      MED: players.filter((p) => p.p === "MED"),
      DEL: players.filter((p) => p.p === "DEL"),
    };
    return positions;
  };

  const positionNames = {
    POR: "Porteros",
    DEF: "Defensas",
    MED: "Centrocampistas",
    DEL: "Delanteros",
  };

  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <div className="min-h-screen bg-[#0D0D0D]">
        <Header points={points} />

        {/* Hero Section */}
        <div className="teams-hero">
          <div className="teams-banner-container">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
              alt="Teams Banner"
              className="teams-banner-image"
            />
            <div className="teams-banner-overlay" />
          </div>

          {/* Back Button */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="teams-back-btn"
          >
            <span className="teams-back-btn-icon">←</span>
            <span className="hidden sm:inline">Volver</span>
          </button>

          {/* Hero Content */}
          <div className="teams-hero-content">
            <div className="teams-hero-icon">
              <div className="teams-hero-icon-glow" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <h1 className="teams-hero-title">Selecciones</h1>

            <div className="teams-hero-badges">
              <span className="teams-hero-badge teams-hero-badge--secondary">
                Mundial 2026
              </span>
              <span className="teams-hero-badge teams-hero-badge--primary">
                48 Naciones
              </span>
              <span className="teams-hero-badge teams-hero-badge--secondary">
                Fase de Grupos
              </span>
            </div>

            <div className="teams-hero-stats">
              <div className="teams-hero-stat">
                <div className="teams-hero-stat-value teams-hero-stat-value--highlight">
                  48
                </div>
                <div className="teams-hero-stat-label">Equipos</div>
              </div>
              <div className="teams-hero-stat">
                <div className="teams-hero-stat-value">16</div>
                <div className="teams-hero-stat-label">Sedes</div>
              </div>
              <div className="teams-hero-stat">
                <div className="teams-hero-stat-value">3</div>
                <div className="teams-hero-stat-label">Países</div>
              </div>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="teams-grid">
          {teamList.map((teamName) => {
            const team = TEAMS[teamName];
            return (
              <div
                key={teamName}
                onClick={() => setSelectedTeam(teamName)}
                className="team-card"
              >
                <div className="team-card-glow" />
                <div className="team-card-flag">
                  <div className="team-card-flag-glow" />
                  <img
                    src={getFlagImage(teamName, 80)}
                    alt={teamName}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div className="team-card-info">
                  <div className="team-card-name">{teamName}</div>
                  <div className="team-card-rank">
                    <span className="team-card-rank-label">Ranking:</span>
                    <span className="team-card-rank-value">#{team.rk}</span>
                  </div>
                  <div className="team-card-coach">{team.coach}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Players Modal */}
        {selectedTeam && (
          <div
            className="teams-modal-overlay"
            onClick={() => setSelectedTeam(null)}
          >
            <div className="teams-modal" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="teams-modal-header">
                <div className="teams-modal-header-left">
                  <img
                    src={getFlagImage(selectedTeam, 80)}
                    alt={selectedTeam}
                    className="teams-modal-flag"
                  />
                  <div>
                    <h2 className="teams-modal-title">{selectedTeam}</h2>
                    <div className="teams-modal-meta">
                      <span className="teams-modal-meta-item">
                        DT:{" "}
                        <span className="teams-modal-meta-value">
                          {TEAMS[selectedTeam].coach}
                        </span>
                      </span>
                      <span className="teams-modal-meta-item">
                        Sistema:{" "}
                        <span className="teams-modal-meta-value">
                          {TEAMS[selectedTeam].schema}
                        </span>
                      </span>
                      <span className="teams-modal-meta-item">
                        Grupo:{" "}
                        <span className="teams-modal-meta-value">
                          {TEAMS[selectedTeam].g}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="teams-modal-close"
                >
                  ×
                </button>
              </div>

              {/* Players List */}
              <div className="teams-modal-content">
                {Object.entries(
                  getPlayersByPosition(TEAMS[selectedTeam].squad),
                ).map(
                  ([position, players]) =>
                    players.length > 0 && (
                      <div key={position} className="teams-position">
                        <div className="teams-position-header">
                          <div className="teams-position-indicator" />
                          <span className="teams-position-name">
                            {
                              positionNames[
                                position as keyof typeof positionNames
                              ]
                            }
                          </span>
                          <span className="teams-position-count">
                            ({players.length})
                          </span>
                        </div>
                        <div>
                          {players.map((player) => (
                            <div key={player.id} className="teams-player-card">
                              <div className="teams-player-card-content">
                                <div
                                  className={`teams-player-position ${player.h ? "teams-player-position--starter" : "teams-player-position--sub"}`}
                                >
                                  {player.p}
                                </div>
                                <div className="teams-player-info">
                                  <div className="teams-player-name">
                                    {player.n}
                                    {player.h && (
                                      <span className="teams-player-star">
                                        ⭐
                                      </span>
                                    )}
                                  </div>
                                  <div className="teams-player-club">
                                    {player.club}
                                  </div>
                                </div>
                                <div className="teams-player-stats">
                                  <div className="teams-player-stat">
                                    <div className="teams-player-stat-label">
                                      Valor
                                    </div>
                                    <div className="teams-player-stat-value teams-player-stat-value--value">
                                      ${player.v}M
                                    </div>
                                  </div>
                                  <div className="teams-player-stat">
                                    <div className="teams-player-stat-label">
                                      OVR
                                    </div>
                                    <div
                                      className={`teams-player-stat-value teams-player-stat-value--ovr ${
                                        player.s >= 85
                                          ? "teams-player-stat-value--ovr-high"
                                          : player.s >= 80
                                            ? "teams-player-stat-value--ovr-mid"
                                            : ""
                                      }`}
                                    >
                                      {player.s}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

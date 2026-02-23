import { getFlagImage } from "../../utils/helpers";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import "./Groups.css";

interface GroupsProps {
  onNavigate: (view: string) => void;
  points: number;
}

const GROUPS = [
  {
    name: "A",
    teams: [
      { name: "México", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Sudáfrica", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Corea del Sur", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Por definir (A)", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "B",
    teams: [
      { name: "Canadá", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Catar", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Suiza", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Por definir (B)", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "C",
    teams: [
      { name: "Brasil", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Marruecos", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Haití", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Escocia", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "D",
    teams: [
      { name: "EE. UU.", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Paraguay", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Australia", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Por definir (D)", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "E",
    teams: [
      { name: "Alemania", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Curazao", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Costa de Marfil", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Ecuador", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "F",
    teams: [
      { name: "Países Bajos", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Japón", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Túnez", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Por definir (F)", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "G",
    teams: [
      { name: "Bélgica", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Egipto", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Irán", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Nueva Zelanda", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "H",
    teams: [
      { name: "España", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Cabo Verde", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Arabia Saudita", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Uruguay", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "I",
    teams: [
      { name: "Por definir (I)", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Francia", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Senegal", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Noruega", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "J",
    teams: [
      { name: "Argentina", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Argelia", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Austria", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Jordania", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "K",
    teams: [
      { name: "Por definir (K)", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Portugal", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Uzbekistán", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Colombia", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
  {
    name: "L",
    teams: [
      { name: "Inglaterra", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Croacia", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Ghana", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
      { name: "Panamá", pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 },
    ],
  },
];

export const Groups = ({ onNavigate, points }: GroupsProps) => {
  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <div className="min-h-screen bg-[#0D0D0D]">
        <Header points={points} />

        {/* Hero Section */}
        <div className="groups-hero">
          <div className="groups-banner-container">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
              alt="Groups Banner"
              className="groups-banner-image"
            />
            <div className="groups-banner-overlay" />
          </div>

          {/* Back Button */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="groups-back-btn"
          >
            <span className="groups-back-btn-icon">←</span>
            <span className="hidden sm:inline">Volver</span>
          </button>

          {/* Hero Content */}
          <div className="groups-hero-content">
            <div className="groups-hero-icon">
              <div className="groups-hero-icon-glow" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <h1 className="groups-hero-title">Grupos</h1>

            <div className="groups-hero-badges">
              <span className="groups-hero-badge groups-hero-badge--secondary">
                Mundial 2026
              </span>
              <span className="groups-hero-badge groups-hero-badge--primary">
                12 Grupos
              </span>
              <span className="groups-hero-badge groups-hero-badge--secondary">
                Fase de Grupos
              </span>
            </div>

            <div className="groups-hero-stats">
              <div className="groups-hero-stat">
                <div className="groups-hero-stat-value groups-hero-stat-value--highlight">
                  48
                </div>
                <div className="groups-hero-stat-label">Equipos</div>
              </div>
              <div className="groups-hero-stat">
                <div className="groups-hero-stat-value">12</div>
                <div className="groups-hero-stat-label">Grupos</div>
              </div>
              <div className="groups-hero-stat">
                <div className="groups-hero-stat-value">32</div>
                <div className="groups-hero-stat-label">Clasifican</div>
              </div>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="groups-grid">
          {GROUPS.map((group) => (
            <div key={group.name} className="group-card">
              <div className="group-card-glow" />

              {/* Group Header */}
              <div className="group-header">
                <div className="group-header-badge">{group.name}</div>
                <div className="group-header-info">
                  <div className="group-header-title">Grupo {group.name}</div>
                  <div className="group-header-subtitle">Mundial 2026</div>
                </div>
              </div>

              {/* Standings Table */}
              <div className="group-standings">
                {/* Table Header */}
                <div className="standings-header">
                  <span className="standings-header-cell">Equipo</span>
                  <span className="standings-header-cell">PJ</span>
                  <span className="standings-header-cell">Pts</span>
                  <span className="standings-header-cell">DG</span>
                </div>

                {/* Table Rows */}
                {group.teams.map((team, idx) => {
                  const isQualified = idx < 2;
                  const dg = team.gf - team.ga;

                  return (
                    <div
                      key={idx}
                      className={`standings-row ${isQualified ? "standings-row--qualified" : ""}`}
                    >
                      <div className="standings-team">
                        <div
                          className={`standings-position ${isQualified ? "standings-position--qualified" : "standings-position--eliminated"}`}
                        >
                          {idx + 1}
                        </div>
                        <img
                          src={getFlagImage(team.name, 40)}
                          alt={team.name}
                          className="standings-flag"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="standings-team-name">{team.name}</span>
                      </div>
                      <span className="standings-pj">
                        {team.w + team.d + team.l}
                      </span>
                      <span
                        className={`standings-pts ${isQualified ? "standings-pts--highlight" : ""}`}
                      >
                        {team.pts}
                      </span>
                      <span
                        className={`standings-dg ${
                          dg > 0
                            ? "standings-dg--positive"
                            : dg < 0
                              ? "standings-dg--negative"
                              : "standings-dg--neutral"
                        }`}
                      >
                        {dg > 0 ? "+" : ""}
                        {dg}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="group-legend">
                <div className="group-legend-items">
                  <div className="group-legend-item">
                    <div className="group-legend-dot group-legend-dot--qualified" />
                    <span className="group-legend-label">Clasificados</span>
                  </div>
                  <div className="group-legend-item">
                    <div className="group-legend-dot group-legend-dot--eliminated" />
                    <span className="group-legend-label">Eliminados</span>
                  </div>
                </div>
                <span className="group-legend-info">Top 2 → Octavos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

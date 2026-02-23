import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import "./Venues.css";

interface VenuesProps {
  onNavigate: (view: string) => void;
  points: number;
}

const VENUES = [
  {
    name: "Estadio Azteca",
    city: "Ciudad de México",
    country: "México",
    capacity: "87,523",
    matches: 6,
  },
  {
    name: "SoFi Stadium",
    city: "Los Ángeles",
    country: "EE.UU.",
    capacity: "70,240",
    matches: 8,
  },
  {
    name: "MetLife Stadium",
    city: "Nueva York",
    country: "EE.UU.",
    capacity: "82,500",
    matches: 8,
  },
  {
    name: "AT&T Stadium",
    city: "Dallas",
    country: "EE.UU.",
    capacity: "80,000",
    matches: 9,
  },
  {
    name: "Arrowhead Stadium",
    city: "Kansas City",
    country: "EE.UU.",
    capacity: "76,416",
    matches: 6,
  },
  {
    name: "NRG Stadium",
    city: "Houston",
    country: "EE.UU.",
    capacity: "72,220",
    matches: 7,
  },
  {
    name: "Mercedes-Benz Stadium",
    city: "Atlanta",
    country: "EE.UU.",
    capacity: "71,000",
    matches: 8,
  },
  {
    name: "Lincoln Financial Field",
    city: "Filadelfia",
    country: "EE.UU.",
    capacity: "69,796",
    matches: 6,
  },
  {
    name: "Lumen Field",
    city: "Seattle",
    country: "EE.UU.",
    capacity: "69,000",
    matches: 6,
  },
  {
    name: "Levi's Stadium",
    city: "San Francisco",
    country: "EE.UU.",
    capacity: "68,500",
    matches: 6,
  },
  {
    name: "Gillette Stadium",
    city: "Boston",
    country: "EE.UU.",
    capacity: "65,878",
    matches: 7,
  },
  {
    name: "Hard Rock Stadium",
    city: "Miami",
    country: "EE.UU.",
    capacity: "64,767",
    matches: 7,
  },
  {
    name: "BC Place",
    city: "Vancouver",
    country: "Canadá",
    capacity: "54,500",
    matches: 7,
  },
  {
    name: "BMO Field",
    city: "Toronto",
    country: "Canadá",
    capacity: "45,500",
    matches: 6,
  },
  {
    name: "Estadio BBVA",
    city: "Monterrey",
    country: "México",
    capacity: "53,500",
    matches: 7,
  },
  {
    name: "Estadio Akron",
    city: "Guadalajara",
    country: "México",
    capacity: "46,232",
    matches: 6,
  },
];

export const Venues = ({ onNavigate, points }: VenuesProps) => {
  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <div className="min-h-screen bg-[#0D0D0D]">
        <Header points={points} />

        {/* Hero Section */}
        <div className="venues-hero">
          <div className="venues-banner-container">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
              alt="Venues Banner"
              className="venues-banner-image"
            />
            <div className="venues-banner-overlay" />
          </div>

          {/* Back Button */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="venues-back-btn"
          >
            <span className="venues-back-btn-icon">←</span>
            <span className="hidden sm:inline">Volver</span>
          </button>

          {/* Hero Content */}
          <div className="venues-hero-content">
            <div className="venues-hero-icon">
              <div className="venues-hero-icon-glow" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" />
              </svg>
            </div>

            <h1 className="venues-hero-title">Sedes</h1>

            <div className="venues-hero-badges">
              <span className="venues-hero-badge venues-hero-badge--secondary">
                Mundial 2026
              </span>
              <span className="venues-hero-badge venues-hero-badge--primary">
                16 Estadios
              </span>
              <span className="venues-hero-badge venues-hero-badge--secondary">
                3 Países
              </span>
            </div>

            <div className="venues-hero-stats">
              <div className="venues-hero-stat">
                <div className="venues-hero-stat-value venues-hero-stat-value--highlight">
                  11
                </div>
                <div className="venues-hero-stat-label">USA</div>
              </div>
              <div className="venues-hero-stat">
                <div className="venues-hero-stat-value">3</div>
                <div className="venues-hero-stat-label">México</div>
              </div>
              <div className="venues-hero-stat">
                <div className="venues-hero-stat-value">2</div>
                <div className="venues-hero-stat-label">Canadá</div>
              </div>
            </div>
          </div>
        </div>

        {/* Venues by Country */}
        {["México", "EE.UU.", "Canadá"].map((country, countryIdx) => {
          const countryVenues = VENUES.filter((v) => v.country === country);
          const countryEmoji =
            country === "México" ? "🇲🇽" : country === "EE.UU." ? "🇺🇸" : "🇨🇦";

          return (
            <div
              key={country}
              className="venues-country"
              style={{ marginTop: countryIdx > 0 ? "2rem" : "0" }}
            >
              {/* Country Header */}
              <div className="venues-country-header">
                <div className="venues-country-flag">
                  <div className="venues-country-flag-glow" />
                  {countryEmoji}
                </div>
                <div className="venues-country-info">
                  <h2 className="venues-country-name">{country}</h2>
                  <div className="venues-country-meta">
                    <span>{countryVenues.length} Estadios</span>
                    <span className="venues-country-meta-divider">•</span>
                    <span>
                      {countryVenues.reduce((sum, v) => sum + v.matches, 0)}{" "}
                      Partidos
                    </span>
                  </div>
                </div>
                <div className="venues-country-badge">Host</div>
              </div>

              {/* Venues Grid */}
              <div className="venues-grid">
                {countryVenues.map((venue, idx) => {
                  const isLargest =
                    parseInt(venue.capacity.replace(/,/g, "")) > 75000;
                  const isMostMatches = venue.matches >= 8;

                  return (
                    <div key={idx} className="venue-card">
                      <div className="venue-card-glow" />

                      {/* Badge */}
                      {(isLargest || isMostMatches) && (
                        <div className="venue-card-badge">
                          {isLargest && isMostMatches
                            ? "⭐ Premium"
                            : isLargest
                              ? "Capacidad"
                              : "Partidos"}
                        </div>
                      )}

                      <div className="venue-card-content">
                        {/* Header */}
                        <div className="venue-card-header">
                          <div className="venue-card-icon">🏟️</div>
                          <div className="venue-card-info">
                            <h3 className="venue-card-name">{venue.name}</h3>
                            <div className="venue-card-city">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                              </svg>
                              {venue.city}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="venue-card-stats">
                          <div className="venue-stat">
                            <div className="venue-stat-label">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              Capacidad
                            </div>
                            <div className="venue-stat-value venue-stat-value--highlight">
                              {venue.capacity}
                            </div>
                          </div>
                          <div className="venue-stat">
                            <div className="venue-stat-label">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                              </svg>
                              Partidos
                            </div>
                            <div className="venue-stat-value">
                              {venue.matches}
                            </div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="venue-card-progress">
                          <div className="venue-progress-header">
                            <span className="venue-progress-label">
                              Uso estimado
                            </span>
                            <span className="venue-progress-value">
                              {Math.round((venue.matches / 9) * 100)}%
                            </span>
                          </div>
                          <div className="venue-progress-bar">
                            <div
                              className="venue-progress-fill"
                              style={{
                                width: `${Math.round((venue.matches / 9) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MobileLayout>
  );
};

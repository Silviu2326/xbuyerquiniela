import { useDTStore } from "../store/dtStore";
import {
  Trophy,
  BookOpen,
  Award,
  Plus,
  Trash2,
  Play,
  ChevronRight,
  Star,
  Users,
  Globe,
} from "lucide-react";
import { MobileLayout } from "../../fantasy/presentation/shared/MobileLayout";

interface DTLandingBackupProps {
  onNavigate?: (view: string) => void;
}

export function DTLandingBackup({ onNavigate }: DTLandingBackupProps) {
  const { setView, careers, deleteCareer, setCurrentCareer } = useDTStore();

  const handleNewCareer = () => {
    if (careers.length >= 2) {
      alert("Máximo 2 carreras simultáneas. Elimina una para crear otra.");
      return;
    }
    setView("nation-select");
  };

  const handleContinueCareer = (careerId: string) => {
    const career = careers.find((c) => c.id === careerId);
    if (career) {
      setCurrentCareer(career);
      if (career.tournament) {
        setView("home");
      } else if (career.squad.length > 0) {
        setView("lineup");
      } else {
        setView("squad-selection");
      }
    }
  };

  const handleDeleteCareer = (careerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Eliminar esta carrera? Se perderá todo el progreso.")) {
      deleteCareer(careerId);
    }
  };

  const getFlagUrl = (nationId: string) => {
    const flags: Record<string, string> = {
      argentina: "ar",
      brazil: "br",
      spain: "es",
      france: "fr",
      germany: "de",
      italy: "it",
      england: "gb-eng",
      portugal: "pt",
      netherlands: "nl",
      belgium: "be",
      uruguay: "uy",
      mexico: "mx",
      usa: "us",
      japan: "jp",
      korea: "kr",
      australia: "au",
    };
    return flags[nationId] || "un";
  };

  const FlagImage = ({
    nationId,
    size = 24,
  }: {
    nationId: string;
    size?: number;
  }) => (
    <img
      src={`https://flagcdn.com/w80/${getFlagUrl(nationId)}.png`}
      alt={nationId}
      style={{
        width: size,
        height: size * 0.75,
        objectFit: "cover",
        borderRadius: "2px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      }}
    />
  );

  return (
    <MobileLayout onNavigate={onNavigate} currentView="dt-landing">
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0D0D0D 0%, #1a1a24 50%, #0047AB 100%)",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {/* Back Button - Top Left */}
        <button
          onClick={() => onNavigate?.("dashboard")}
          style={{
            position: "fixed",
            top: "0.75rem",
            left: "0.75rem",
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "0.5rem",
            background:
              "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "1px solid rgba(42, 42, 58, 0.2)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 100,
          }}
          aria-label="Volver al inicio"
        >
          <ChevronRight size={18} style={{ transform: "rotate(180deg)" }} />
        </button>

        {/* Header Banner */}
        <header
          style={{
            position: "relative",
            padding: "3rem 1rem 1rem",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(16, 185, 129, 0.2) 0%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "10rem",
              height: "10rem",
              background: "rgba(255, 230, 0, 0.15)",
              borderRadius: "50%",
              filter: "blur(50px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "8rem",
              height: "8rem",
              background: "rgba(0, 71, 171, 0.15)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #FFE600 0%, #0047AB 100%)",
              boxShadow: "0 0 15px rgba(255, 230, 0, 0.4)",
              marginBottom: "0.5rem",
            }}
          >
            <Trophy size={32} color="white" />
          </div>
          <h1
            style={{
              position: "relative",
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "white",
              marginBottom: "0.125rem",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            MODO DT
          </h1>
          <p
            style={{
              position: "relative",
              color: "#FFE600",
              fontWeight: 700,
              fontSize: "0.875rem",
              marginBottom: "0.25rem",
            }}
          >
            FIFA World Cup 2026™
          </p>
          <p
            style={{
              position: "relative",
              color: "#a0a0b0",
              fontSize: "0.75rem",
              width: "100%",
              lineHeight: 1.4,
            }}
          >
            48 naciones • 1 campeón • Tu legado
          </p>
        </header>

        {/* Main Content */}
        <main
          style={{
            position: "relative",
            padding: "0 0.75rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            width: "100%",
          }}
        >
          {/* Nueva Carrera Card */}
          <button
            onClick={handleNewCareer}
            disabled={careers.length >= 2}
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              borderRadius: "0.75rem",
              border: `1px solid ${careers.length >= 2 ? "rgba(42, 42, 58, 0.2)" : "rgba(255, 230, 0, 0.5)"}`,
              background:
                careers.length >= 2
                  ? "rgba(26, 26, 36, 0.5)"
                  : "linear-gradient(90deg, rgba(255, 230, 0, 0.2) 0%, rgba(255, 230, 0, 0.05) 100%)",
              opacity: careers.length >= 2 ? 0.6 : 1,
              cursor: careers.length >= 2 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "0.375rem",
                background:
                  careers.length >= 2
                    ? "#374151"
                    : "linear-gradient(135deg, #FFE600 0%, #0047AB 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Plus
                size={22}
                color={careers.length >= 2 ? "#6b7280" : "white"}
              />
            </div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <h3
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  marginBottom: "0.125rem",
                }}
              >
                Nueva Carrera
              </h3>
              <p style={{ color: "#a0a0b0", fontSize: "0.75rem" }}>
                Comienza tu camino mundialista
              </p>
            </div>
            <div
              style={{
                padding: "0.2rem 0.5rem",
                borderRadius: "9999px",
                fontSize: "0.6875rem",
                fontWeight: 700,
                background:
                  careers.length >= 2
                    ? "rgba(239, 68, 68, 0.2)"
                    : "rgba(255, 230, 0, 0.2)",
                color: careers.length >= 2 ? "#f87171" : "#FFE600",
              }}
            >
              {careers.length}/2
            </div>
          </button>

          {/* Carreras Activas */}
          {careers.length > 0 && (
            <div>
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem",
                }}
              >
                <Play size={16} color="#FFE600" />
                Tus Carreras
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {careers.map((career) => (
                  <div
                    key={career.id}
                    onClick={() => handleContinueCareer(career.id)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      background:
                        "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
                      border: "1px solid rgba(42, 42, 58, 0.2)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "0.375rem",
                        background:
                          "linear-gradient(135deg, #FFE600 0%, #0047AB 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.125rem",
                        flexShrink: 0,
                      }}
                    >
                      <FlagImage nationId={career.nationId} size={24} />
                    </div>
                    <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                      <h4
                        style={{
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          marginBottom: "0.125rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {career.name}
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          fontSize: "0.6875rem",
                        }}
                      >
                        <span style={{ color: "#FFE600", fontWeight: 700 }}>
                          {career.stats.won}V
                        </span>
                        <span style={{ color: "#facc15", fontWeight: 700 }}>
                          {career.stats.drawn}E
                        </span>
                        <span style={{ color: "#f87171", fontWeight: 700 }}>
                          {career.stats.lost}D
                        </span>
                        <span style={{ color: "#505060" }}>|</span>
                        <span style={{ color: "#a0a0b0" }}>
                          {career.stats.played} PJ
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #FFE600 0%, #0047AB 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Play
                          size={14}
                          color="white"
                          style={{ marginLeft: "1px" }}
                        />
                      </div>
                      <button
                        onClick={(e) => handleDeleteCareer(career.id, e)}
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="Eliminar carrera"
                      >
                        <Trash2 size={14} color="#f87171" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.625rem",
            }}
          >
            <button
              onClick={() => setView("tutorial")}
              style={{
                padding: "0.75rem",
                borderRadius: "0.75rem",
                background:
                  "linear-gradient(135deg, rgba(0, 71, 171, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)",
                border: "1px solid rgba(255, 230, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.375rem",
                  background:
                    "linear-gradient(135deg, #FFE600 0%, #0047AB 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <BookOpen size={16} color="white" />
              </div>
              <h4
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                }}
              >
                Tutorial
              </h4>
              <p style={{ color: "#a0a0b0", fontSize: "0.6875rem" }}>
                Aprende a jugar
              </p>
            </button>

            <button
              onClick={() => setView("badges")}
              style={{
                padding: "0.75rem",
                borderRadius: "0.75rem",
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.375rem",
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Award size={16} color="white" />
              </div>
              <h4
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                }}
              >
                Insignias
              </h4>
              <p style={{ color: "#a0a0b0", fontSize: "0.6875rem" }}>
                Tus logros
              </p>
            </button>
          </div>

          {/* Stats Summary */}
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "0.75rem",
              background:
                "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
              border: "1px solid rgba(42, 42, 58, 0.2)",
            }}
          >
            <h3
              style={{
                color: "#a0a0b0",
                fontSize: "0.6875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.625rem",
              }}
            >
              El Torneo
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.75rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.125rem",
                    fontSize: "1.125rem",
                    fontWeight: 900,
                    color: "#FFE600",
                    marginBottom: "0.125rem",
                  }}
                >
                  <Globe size={12} />
                  <span>48</span>
                </div>
                <div
                  style={{
                    color: "#505060",
                    fontSize: "0.5625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Naciones
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.125rem",
                    fontSize: "1.125rem",
                    fontWeight: 900,
                    color: "#FFE600",
                    marginBottom: "0.125rem",
                  }}
                >
                  <Users size={12} />
                  <span>1.7K</span>
                </div>
                <div
                  style={{
                    color: "#505060",
                    fontSize: "0.5625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Jugadores
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.125rem",
                    fontSize: "1.125rem",
                    fontWeight: 900,
                    color: "#fbbf24",
                    marginBottom: "0.125rem",
                  }}
                >
                  <Star size={12} />
                  <span>104</span>
                </div>
                <div
                  style={{
                    color: "#505060",
                    fontSize: "0.5625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Partidos
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MobileLayout>
  );
}

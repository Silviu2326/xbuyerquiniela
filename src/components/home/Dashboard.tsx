import { useState, useEffect } from "react";
import { ChevronRight, Calendar, FileText } from "lucide-react";
import { Header } from "./Header";
import { HorizontalNav } from "./HorizontalNav";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";

interface DashboardProps {
  points: number;
  streak: number;
  ranking: number;
  precision: number;
  onNavigate: (view: string) => void;
}

export const Dashboard = ({
  points,
  streak,
  ranking,
  precision,
  onNavigate,
}: DashboardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slides = [
    {
      title: "Campo animado · Minuto a minuto · 22 jugadores",
      badge: "MATCH CENTER EN VIVO",
      image:
        "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=400&fit=crop",
      buttonText: "Probar →",
      buttonColor: "var(--color-primary)",
    },
    {
      title: "Arma tu Selección Ideal",
      badge: "⚡ FANTASY MUNDIAL",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=400&fit=crop",
      buttonText: "JUGAR →",
      buttonColor: "var(--color-primary)",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const upcomingMatches = [
    {
      id: 1,
      group: "Grupo A",
      stadium: "Estadio Azteca",
      homeTeam: { name: "México", flag: "mx", score: 1 },
      awayTeam: { name: "Sudáfrica", flag: "za", score: 0 },
      status: "live",
      time: "34'",
    },
    {
      id: 2,
      group: "Grupo A",
      stadium: "Estadio Akron",
      homeTeam: { name: "Corea del Sur", flag: "kr" },
      awayTeam: { name: "Por definir (A)", flag: "xx" },
      status: "upcoming",
      date: "11 Jun",
      time: "17:00",
      odds: { home: 50, draw: 28, away: 22 },
    },
    {
      id: 3,
      group: "Grupo C",
      stadium: "AT&T Stadium",
      homeTeam: { name: "Brasil", flag: "br" },
      awayTeam: { name: "Marruecos", flag: "ma" },
      status: "upcoming",
      date: "12 Jun",
      time: "14:00",
      odds: { home: 55, draw: 26, away: 19 },
    },
    {
      id: 4,
      group: "Grupo D",
      stadium: "SoFi Stadium",
      homeTeam: { name: "EE.UU.", flag: "us" },
      awayTeam: { name: "Paraguay", flag: "py" },
      status: "upcoming",
      date: "12 Jun",
      time: "19:00",
      odds: { home: 58, draw: 24, away: 18 },
    },
    {
      id: 5,
      group: "Grupo B",
      stadium: "BMO Field",
      homeTeam: { name: "Canadá", flag: "ca" },
      awayTeam: { name: "Por definir (B)", flag: "xx" },
      status: "upcoming",
      date: "12 Jun",
      time: "13:00",
      odds: { home: 52, draw: 28, away: 20 },
    },
    {
      id: 6,
      group: "Grupo H",
      stadium: "Hard Rock Stadium",
      homeTeam: { name: "España", flag: "es" },
      awayTeam: { name: "Cabo Verde", flag: "cv" },
      status: "upcoming",
      date: "13 Jun",
      time: "14:00",
      odds: { home: 85, draw: 10, away: 5 },
    },
  ];

  const news = [
    {
      id: 1,
      category: "OFICIAL",
      time: "2h",
      title: "Mbappé y Haaland: el duelo estelar del Grupo I",
      image:
        "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=120&h=80&fit=crop",
      categoryColor: "var(--color-primary)",
    },
    {
      id: 2,
      category: "ANÁLISIS",
      time: "4h",
      title: "Grupo de la muerte: ¿C, H o L?",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&h=80&fit=crop",
      categoryColor: "var(--color-accent)",
    },
    {
      id: 3,
      category: "SELECCIONES",
      time: "6h",
      title: "México preparado para su 3er Mundial como sede",
      image:
        "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=120&h=80&fit=crop",
      categoryColor: "var(--color-success)",
    },
  ];

  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-primary)",
          paddingBottom: 90,
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            animation: "slideDown 0.6s ease-out",
          }}
        >
          <Header points={points} />
        </div>

        {/* NAVEGACIÓN HORIZONTAL */}
        <HorizontalNav
          onNavigate={onNavigate}
          activeBetsCount={3}
          hasLiveMatch={true}
        />

        {/* CONTENIDO */}
        <div style={{ padding: "var(--space-4)" }}>
          {/* CARRUSEL DESTACADO CON IMÁGENES */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              marginBottom: "var(--space-4)",
              minHeight: "160px",
              animation:
                "scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.15), 0 0 60px rgba(59, 130, 246, 0.15)",
            }}
          >
            {/* Imagen de fondo */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition:
                  "transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease",
                transform: "scale(1.05)",
                animation: "kenBurns 20s ease-in-out infinite alternate",
              }}
            />

            {/* Overlay gradiente */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)",
                transition: "opacity 0.8s ease",
              }}
            />

            {/* Contenido */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "var(--space-5)",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "var(--font-black)",
                  color: "#FFE600",
                  letterSpacing: "1px",
                  marginBottom: "var(--space-2)",
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "rgba(255, 230, 0, 0.15)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255, 230, 0, 0.3)",
                  backdropFilter: "blur(10px)",
                  animation: "pulse 2s ease-in-out infinite",
                  textShadow: "0 0 20px rgba(255, 230, 0, 0.8)",
                  boxShadow:
                    "0 0 20px rgba(255, 230, 0, 0.3), inset 0 0 10px rgba(255, 230, 0, 0.1)",
                }}
              >
                {slides[currentSlide].badge}
              </div>
              <h2
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-bold)",
                  color: "#ffffff",
                  lineHeight: 1.3,
                  maxWidth: "70%",
                  marginBottom: "var(--space-4)",
                  textShadow:
                    "0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
                  animation:
                    "slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both",
                }}
              >
                {slides[currentSlide].title}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button
                  onClick={() =>
                    onNavigate(currentSlide === 0 ? "match" : "fantasy")
                  }
                  style={{
                    padding: "var(--space-2) var(--space-4)",
                    background: "#FFE600",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    color: "#000000",
                    fontWeight: "var(--font-bold)",
                    fontSize: "var(--text-sm)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: "scale(1)",
                    boxShadow:
                      "0 4px 15px rgba(255, 230, 0, 0.4), 0 0 30px rgba(255, 230, 0, 0.2)",
                    animation:
                      "fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.08) translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(255, 230, 0, 0.6), 0 0 40px rgba(255, 230, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(255, 230, 0, 0.4), 0 0 30px rgba(255, 230, 0, 0.2)";
                  }}
                >
                  {slides[currentSlide].buttonText}
                </button>

                {/* Indicadores */}
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    animation: "fadeIn 1s ease-out 0.6s both",
                  }}
                >
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      style={{
                        width: idx === currentSlide ? 20 : 6,
                        height: 6,
                        borderRadius: "3px",
                        background:
                          idx === currentSlide
                            ? "#FFE600"
                            : "rgba(255,255,255,0.4)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow:
                          idx === currentSlide
                            ? "0 0 15px rgba(255, 230, 0, 0.8)"
                            : "none",
                        transform: "scale(1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PARTIDO EN VIVO */}
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30, 58, 95, 0.5) 100%)",
              border: "1px solid var(--color-blue-700)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-4)",
              marginBottom: "var(--space-4)",
              animation:
                "scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.08), 0 0 20px rgba(37, 99, 235, 0.15)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 48px rgba(0,0,0,0.12), 0 0 60px rgba(37, 99, 235, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.05)";
            }}
          >
            {/* Header del partido */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: "#FFE600",
                    borderRadius: "50%",
                    animation: "pulse 1.5s infinite",
                    boxShadow: "0 0 0 0 rgba(255, 230, 0, 0.7)",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      animation:
                        "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                      background: "#FFE600",
                      opacity: 0.75,
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "var(--font-black)",
                    color: "#FFE600",
                    textShadow: "0 0 15px rgba(255, 230, 0, 0.5)",
                    animation: "glow 2s ease-in-out infinite",
                  }}
                >
                  EN VIVO
                </span>
              </div>
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--text-tertiary)",
                }}
              >
                Toca para Match Center →
              </span>
            </div>

            {/* Score */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-6)",
                marginBottom: "var(--space-3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <img
                  src="https://flagcdn.com/w80/mx.png"
                  alt="México"
                  style={{
                    width: 48,
                    height: 32,
                    borderRadius: "var(--radius-sm)",
                    objectFit: "cover",
                    boxShadow: "var(--shadow-md), 0 0 20px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                    animation:
                      "fadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.15) rotate(2deg)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "var(--shadow-md), 0 0 20px rgba(0,0,0,0.2)";
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-bold)",
                    color: "var(--text-primary)",
                  }}
                >
                  México
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: "var(--font-black)",
                    color: "var(--text-primary)",
                    textShadow: "0 0 20px rgba(255, 230, 0, 0.6)",
                    animation:
                      "scorePopIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6s both",
                  }}
                >
                  1
                </span>
                <span
                  style={{
                    fontSize: "var(--text-xl)",
                    color: "var(--text-tertiary)",
                    animation: "fadeIn 0.8s ease 0.7s both",
                  }}
                >
                  -
                </span>
                <span
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: "var(--font-black)",
                    color: "var(--text-primary)",
                    textShadow: "0 0 20px rgba(255, 230, 0, 0.6)",
                    animation:
                      "scorePopIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.7s both",
                  }}
                >
                  0
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <img
                  src="https://flagcdn.com/w80/za.png"
                  alt="Sudáfrica"
                  style={{
                    width: 48,
                    height: 32,
                    borderRadius: "var(--radius-sm)",
                    objectFit: "cover",
                    boxShadow: "var(--shadow-md), 0 0 20px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                    animation:
                      "fadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.15) rotate(-2deg)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "var(--shadow-md), 0 0 20px rgba(0,0,0,0.2)";
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-bold)",
                    color: "var(--text-primary)",
                  }}
                >
                  Sudáfrica
                </span>
              </div>
            </div>

            {/* Predicción ganando */}
            <div
              style={{
                textAlign: "center",
                padding: "var(--space-2)",
                background:
                  "linear-gradient(135deg, rgba(255, 230, 0, 0.1) 0%, rgba(255, 230, 0, 0.05) 100%)",
                borderRadius: "var(--radius-md)",
                marginBottom: "var(--space-3)",
                border: "1px solid rgba(255, 230, 0, 0.2)",
                animation: "wiggle 2s ease-in-out infinite",
                boxShadow: "0 0 20px rgba(255, 230, 0, 0.15)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "#FFE600",
                  fontWeight: "var(--font-semibold)",
                  textShadow: "0 0 10px rgba(255, 230, 0, 0.5)",
                }}
              >
                Tu predicción va ganando ✓
              </span>
            </div>

            {/* Botones de acción */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "var(--space-2)",
              }}
            >
              <ActionButton
                icon="📊"
                label="Match"
                onClick={() => onNavigate("match")}
              />
              <ActionButton
                icon="🎮"
                label="Modo DT"
                onClick={() => onNavigate("fantasy")}
              />
              <ActionButton
                icon="⚡"
                label="Micro"
                onClick={() => onNavigate("micro")}
              />
              <ActionButton
                icon="🎉"
                label="Party"
                onClick={() => onNavigate("party")}
              />
            </div>
          </div>

          {/* ESPACIO PUBLICITARIO */}
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)",
              border: "1px solid var(--border-primary)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-4)",
              marginBottom: "var(--space-4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
              animation: "fadeInUp 0.8s ease-out 0.4s both",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              style={{
                fontSize: "var(--text-md)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              📢
            </span>
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
                fontWeight: "var(--font-medium)",
              }}
            >
              ESPACIO PUBLICITARIO
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "var(--text-tertiary)",
                marginLeft: "auto",
                opacity: 0.6,
              }}
            >
              AD
            </span>
          </div>

          {/* BANNER AZUL - Nuevo */}
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--color-blue-700) 0%, var(--color-blue-900) 50%, var(--color-blue-800) 100%)",
              border: "1px solid var(--color-blue-500)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-4)",
              marginBottom: "var(--space-4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              animation: "fadeInUp 0.8s ease-out 0.45s both",
              transition: "all 0.3s ease",
              cursor: "pointer",
              boxShadow:
                "0 4px 20px rgba(37, 99, 235, 0.3), 0 0 30px rgba(37, 99, 235, 0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(37, 99, 235, 0.4), 0 0 50px rgba(37, 99, 235, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(37, 99, 235, 0.3), 0 0 30px rgba(37, 99, 235, 0.15)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background:
                    "linear-gradient(135deg, var(--color-blue-400) 0%, var(--color-blue-600) 100%)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                🏆
              </div>
              <div>
                <div
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: "var(--font-bold)",
                    color: "#ffffff",
                  }}
                >
                  Liga Azul Premium
                </div>
                <div
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-blue-300)",
                  }}
                >
                  Únete al desafío
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-black)",
                  color: "var(--color-blue-200)",
                  textShadow: "0 0 15px rgba(147, 197, 253, 0.5)",
                }}
              >
                →
              </span>
            </div>
          </div>

          {/* MIS APUESTAS */}
          <div
            onClick={() => onNavigate("bets")}
            style={{
              background:
                "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30, 58, 95, 0.3) 100%)",
              border: "1px solid var(--color-blue-800)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-4)",
              marginBottom: "var(--space-4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              animation:
                "slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both",
              transition: "all 0.3s ease",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.05), 0 0 15px rgba(37, 99, 235, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(8px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(0,0,0,0.1), 0 0 40px rgba(59, 130, 246, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background:
                    "linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-elevated) 100%)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  animation:
                    "bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6s both",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                📋
              </div>
              <div>
                <div
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: "var(--font-bold)",
                    color: "var(--text-primary)",
                  }}
                >
                  Mis Apuestas
                </div>
                <div
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-secondary)",
                  }}
                >
                  2 activas · 1 ganada
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-black)",
                  color: "var(--color-primary)",
                  textShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                3
              </span>
              <ChevronRight
                size={20}
                style={{
                  color: "var(--text-tertiary)",
                  transition: "transform 0.3s ease",
                  animation: "slideInRight 0.5s ease 0.8s both",
                }}
              />
            </div>
          </div>

          {/* MODO ACTUAL */}
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30, 64, 175, 0.3) 100%)",
              border: "1px solid var(--color-blue-700)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-3) var(--space-4)",
              marginBottom: "var(--space-4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              animation:
                "slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s both",
              transition: "all 0.3s ease",
              cursor: "pointer",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05), 0 0 15px rgba(37, 99, 235, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.1), 0 0 20px rgba(37, 99, 235, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-md)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                🎮
              </span>
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                }}
              >
                Modo actual:
              </span>
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-bold)",
                  color: "var(--color-primary)",
                }}
              >
                GRATIS
              </span>
            </div>
            <button
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-semibold)",
                color: "#FFE600",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textShadow: "0 0 10px rgba(255, 230, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.textShadow =
                  "0 0 20px rgba(255, 230, 0, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.textShadow =
                  "0 0 10px rgba(59, 130, 246, 0.3)";
              }}
            >
              Cambiar →
            </button>
          </div>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "var(--space-2)",
              marginBottom: "var(--space-4)",
              animation: "fadeInUp 0.8s ease-out 0.6s both",
            }}
          >
            <StatCard value={points} label="PUNTOS" delay={0} />
            <StatCard value={`#${ranking}`} label="RANKING" delay={0.1} />
            <StatCard value={streak} label="RACHA" icon="🔥" delay={0.2} />
            <StatCard value={`${precision}%`} label="PRECISIÓN" delay={0.3} />
          </div>

          {/* PRÓXIMOS PARTIDOS */}
          <div
            style={{
              marginBottom: "var(--space-4)",
              animation: "fadeInUp 0.8s ease-out 0.7s both",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                marginBottom: "var(--space-3)",
              }}
            >
              <Calendar
                size={18}
                style={{
                  color: "var(--color-primary)",
                  filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-black)",
                  color: "var(--text-primary)",
                  letterSpacing: "0.5px",
                }}
              >
                PRÓXIMOS PARTIDOS
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              {upcomingMatches.map((match, idx) => (
                <div
                  key={match.id}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30, 58, 95, 0.25) 100%)",
                    border: "1px solid var(--color-blue-800)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-3)",
                    animation: `slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.8 + idx * 0.1}s both`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.05), 0 0 10px rgba(37, 99, 235, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.1), 0 0 30px rgba(37, 99, 235, 0.2)";
                    e.currentTarget.style.borderColor = "#3B82F6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.05)";
                    e.currentTarget.style.borderColor = "var(--border-primary)";
                  }}
                >
                  {/* Header del partido */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {match.group} · {match.stadium}
                    </span>
                    {match.status === "live" ? (
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "var(--font-black)",
                          color: "var(--color-error)",
                        }}
                      >
                        ● EN VIVO {match.time}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {match.date} · {match.time}
                      </span>
                    )}
                  </div>

                  {/* Equipos y cuotas */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Local */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--space-1)",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                        }}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${match.homeTeam.flag}.png`}
                          alt={match.homeTeam.name}
                          style={{
                            width: 24,
                            height: 16,
                            borderRadius: "var(--radius-sm)",
                            objectFit: "cover",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "var(--text-sm)",
                            fontWeight: "var(--font-semibold)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {match.homeTeam.name}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                        }}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${match.awayTeam.flag}.png`}
                          alt={match.awayTeam.name}
                          style={{
                            width: 24,
                            height: 16,
                            borderRadius: "var(--radius-sm)",
                            objectFit: "cover",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "var(--text-sm)",
                            fontWeight: "var(--font-semibold)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {match.awayTeam.name}
                        </span>
                      </div>
                    </div>

                    {/* Score o Cuotas */}
                    {match.status === "live" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "var(--space-1)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "var(--text-lg)",
                            fontWeight: "var(--font-black)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {match.homeTeam.score}
                        </span>
                        <span
                          style={{
                            fontSize: "var(--text-lg)",
                            fontWeight: "var(--font-black)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {match.awayTeam.score}
                        </span>
                      </div>
                    ) : match.odds ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "var(--space-1)",
                        }}
                      >
                        <OddButton label="1" value={match.odds.home} />
                        <OddButton label="X" value={match.odds.draw} />
                        <OddButton label="2" value={match.odds.away} />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ESPACIO PUBLICITARIO 2 */}
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)",
              border: "1px solid var(--border-primary)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-4)",
              marginBottom: "var(--space-4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
              animation: "fadeInUp 0.8s ease-out 1.1s both",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              style={{
                fontSize: "var(--text-md)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              📢
            </span>
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
                fontWeight: "var(--font-medium)",
              }}
            >
              ESPACIO PUBLICITARIO
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "var(--text-tertiary)",
                marginLeft: "auto",
                opacity: 0.6,
              }}
            >
              AD
            </span>
          </div>

          {/* NOTICIAS */}
          <div
            style={{
              animation: "fadeInUp 0.8s ease-out 1.2s both",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <FileText
                  size={18}
                  style={{
                    color: "var(--color-primary)",
                    filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-black)",
                    color: "var(--text-primary)",
                    letterSpacing: "0.5px",
                  }}
                >
                  NOTICIAS
                </span>
              </div>
              <button
                style={{
                  padding: "var(--space-1) var(--space-3)",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--color-primary)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.background = "#FFE600";
                  e.currentTarget.style.color = "#000000";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(255, 230, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = "var(--bg-tertiary)";
                  e.currentTarget.style.color = "var(--color-primary)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Ver más
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {news.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    background:
                      "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30, 58, 95, 0.2) 100%)",
                    border: "1px solid var(--color-blue-800)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-3)",
                    cursor: "pointer",
                    animation: `fadeInUp 0.6s ease-out ${1.3 + idx * 0.1}s both`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.05), 0 0 10px rgba(37, 99, 235, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(0,0,0,0.12), 0 0 25px rgba(37, 99, 235, 0.15)";
                    e.currentTarget.style.borderColor = "#3B82F6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.05)";
                    e.currentTarget.style.borderColor = "var(--border-primary)";
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: 80,
                      height: 60,
                      borderRadius: "var(--radius-md)",
                      objectFit: "cover",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: "var(--font-black)",
                          color: item.categoryColor,
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          color: "var(--text-tertiary)",
                        }}
                      >
                        · {item.time}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-semibold)",
                        color: "var(--text-primary)",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 15px rgba(255, 230, 0, 0.5);
          }
          50% {
            text-shadow: 0 0 25px rgba(255, 230, 0, 0.8), 0 0 35px rgba(255, 230, 0, 0.6);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes kenBurns {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.15);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scorePopIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-2px);
          }
          75% {
            transform: translateX(2px);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }
      `}</style>
      </div>
    </MobileLayout>
  );
};

// Componentes auxiliares

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        padding: "var(--space-2) var(--space-1)",
        background: isHovered
          ? "linear-gradient(135deg, #FFE600 0%, rgba(255, 230, 0, 0.8) 100%)"
          : "var(--bg-tertiary)",
        border: "1px solid var(--border-primary)",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-4px) scale(1.05)" : "scale(1)",
        boxShadow: isHovered
          ? "0 8px 24px rgba(255, 230, 0, 0.3)"
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span
        style={{
          fontSize: "16px",
          transition: "all 0.3s ease",
          transform: isHovered ? "scale(1.2) rotate(10deg)" : "scale(1)",
          display: "inline-block",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: "10px",
          fontWeight: "var(--font-semibold)",
          color: isHovered ? "white" : "var(--text-secondary)",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function StatCard({
  value,
  label,
  icon,
  delay = 0,
}: {
  value: string | number;
  label: string;
  icon?: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: isHovered
          ? "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, var(--bg-elevated) 100%)"
          : "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30, 58, 95, 0.15) 100%)",
        border: "1px solid var(--color-blue-700)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-3) var(--space-2)",
        textAlign: "center",
        animation: `scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-6px) scale(1.05)" : "scale(1)",
        boxShadow: isHovered
          ? "0 12px 32px rgba(0,0,0,0.15), 0 0 40px rgba(59, 130, 246, 0.3)"
          : "0 4px 12px rgba(0,0,0,0.05), 0 0 8px rgba(37, 99, 235, 0.1)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: "var(--font-black)",
          color: isHovered ? "#60A5FA" : "#3B82F6",
          marginBottom: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          textShadow: isHovered
            ? "0 0 20px rgba(96, 165, 250, 0.6)"
            : "0 0 10px rgba(59, 130, 246, 0.3)",
          transition: "text-shadow 0.3s ease",
        }}
      >
        {value}
        {icon && (
          <span
            style={{
              fontSize: "12px",
              animation: isHovered ? "bounce 0.6s ease infinite" : "none",
              display: "inline-block",
            }}
          >
            {icon}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: "9px",
          fontWeight: "var(--font-black)",
          color: isHovered ? "var(--text-secondary)" : "var(--text-tertiary)",
          letterSpacing: "0.5px",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function OddButton({ label, value }: { label: string; value: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "var(--space-1) var(--space-2)",
        background: isHovered
          ? "linear-gradient(135deg, #0047AB 0%, rgba(0, 71, 171, 0.8) 100%)"
          : "var(--bg-tertiary)",
        border: `1px solid ${isHovered ? "#0047AB" : "var(--border-primary)"}`,
        borderRadius: "var(--radius-md)",
        minWidth: 32,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "scale(1.15) translateY(-2px)" : "scale(1)",
        boxShadow: isHovered
          ? "0 6px 20px rgba(0, 71, 171, 0.4)"
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontSize: "9px",
          fontWeight: "var(--font-black)",
          color: isHovered ? "rgba(255,255,255,0.8)" : "var(--text-tertiary)",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-bold)",
          color: isHovered ? "#FFE600" : "#0047AB",
          transition: "color 0.3s ease",
        }}
      >
        {value}
      </span>
    </div>
  );
}

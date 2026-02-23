import { useState } from "react";
import {
  Zap,
  Trophy,
  BarChart3,
  Users,
  MapPin,
  Gamepad2,
  FileText,
  Tv,
  Calendar,
  Home,
  PartyPopper,
  Newspaper,
  Target,
} from "lucide-react";

interface HorizontalNavProps {
  onNavigate: (view: string) => void;
  activeBetsCount?: number;
  hasLiveMatch?: boolean;
}

export const HorizontalNav = ({
  onNavigate,
  activeBetsCount = 2,
  hasLiveMatch = true,
}: HorizontalNavProps) => {
  const [activeNav, setActiveNav] = useState("");

  const navItems = [
    {
      id: "bets",
      icon: <FileText size={16} />,
      label: "Mis Apuestas",
      badge: activeBetsCount > 0 ? activeBetsCount.toString() : null,
      badgeColor: "#FFE600",
    },
    {
      id: "match",
      icon: <Tv size={16} />,
      label: "Match",
      badge: hasLiveMatch ? "LIVE" : null,
      badgeColor: "#FF1744",
    },
    {
      id: "matches",
      icon: <Calendar size={18} />,
      label: "Partidos",
    },
    {
      id: "groups",
      icon: <BarChart3 size={16} />,
      label: "Grupos",
    },
    {
      id: "selections",
      icon: <Users size={16} />,
      label: "Selecciones",
    },
    {
      id: "venues",
      icon: <MapPin size={16} />,
      label: "Sedes",
    },
    {
      id: "tactics",
      icon: <Gamepad2 size={16} />,
      label: "Modo DT",
    },
    {
      id: "career",
      icon: <Target size={16} />,
      label: "Modo Carrera",
    },
    {
      id: "fantasy",
      icon: <Trophy size={16} />,
      label: "Fantasy",
    },
    {
      id: "stories",
      icon: <Home size={16} />,
      label: "Stories",
    },
    {
      id: "micro",
      icon: <Zap size={16} />,
      label: "Micro",
    },
    {
      id: "party",
      icon: <PartyPopper size={16} />,
      label: "Party",
    },
    {
      id: "news",
      icon: <Newspaper size={16} />,
      label: "Noticias",
    },
  ];

  return (
    <div
      style={{
        background: "#0d1225",
        padding: "var(--space-2) 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        animation: "slideDown 0.7s ease-out 0.1s both",
      }}
      className="no-scrollbar"
    >
      <div
        style={{
          display: "flex",
          gap: "var(--space-1)",
          padding: "0 var(--space-4)",
          minWidth: "max-content",
          alignItems: "center",
        }}
      >
        {navItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveNav(item.id);
              onNavigate(item.id);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "0",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              minWidth: "72px",
              position: "relative",
              animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both`,
            }}
          >
            {/* Badge */}
            {item.badge && (
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: 8,
                  background: item.badgeColor,
                  color: "#000",
                  fontSize: "9px",
                  fontWeight: "900",
                  padding: item.badge === "LIVE" ? "2px 6px" : "2px 6px",
                  borderRadius: "4px",
                  zIndex: 10,
                  boxShadow: `0 0 12px ${item.badgeColor}`,
                  animation: "pulse 2s ease-in-out infinite",
                  letterSpacing: "0.5px",
                }}
              >
                {item.badge}
              </div>
            )}

            {/* Icon Circle */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border:
                  activeNav === item.id
                    ? "2px solid #FFE600"
                    : "2px solid rgba(61, 74, 111, 0.4)",
                background:
                  activeNav === item.id
                    ? "rgba(255, 230, 0, 0.1)"
                    : "rgba(45, 58, 95, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  activeNav === item.id ? "#FFE600" : "rgba(255,255,255,0.5)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: "scale(1)",
                boxShadow:
                  activeNav === item.id
                    ? "0 0 24px rgba(255, 230, 0, 0.4), 0 4px 16px rgba(255, 230, 0, 0.2), inset 0 0 20px rgba(255, 230, 0, 0.1)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                const circle = e.currentTarget;
                circle.style.transform = "scale(1.1)";
                if (activeNav !== item.id) {
                  circle.style.borderColor = "rgba(61, 74, 111, 0.8)";
                  circle.style.background = "rgba(45, 58, 95, 0.5)";
                  circle.style.color = "rgba(255,255,255,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                const circle = e.currentTarget;
                circle.style.transform = "scale(1)";
                if (activeNav !== item.id) {
                  circle.style.borderColor = "rgba(61, 74, 111, 0.4)";
                  circle.style.background = "rgba(45, 58, 95, 0.3)";
                  circle.style.color = "rgba(255,255,255,0.5)";
                }
              }}
            >
              {item.icon}
            </div>

            {/* Label */}
            <span
              style={{
                fontSize: "10px",
                fontWeight: activeNav === item.id ? "600" : "500",
                color:
                  activeNav === item.id ? "#FFE600" : "rgba(255,255,255,0.6)",
                whiteSpace: "nowrap",
                transition: "color 0.3s ease",
                textShadow:
                  activeNav === item.id
                    ? "0 0 12px rgba(255, 230, 0, 0.5)"
                    : "none",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <style>{`
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

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

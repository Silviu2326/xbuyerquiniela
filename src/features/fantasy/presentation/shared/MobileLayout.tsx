import type { ReactNode } from "react";
import { Home, FileText, Tv, Trophy, MessageSquare } from "lucide-react";
import { useFantasyStore } from "../../application/store/fantasyStore";

interface MobileLayoutProps {
  children: ReactNode;
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export function MobileLayout({
  children,
  onNavigate,
  currentView,
}: MobileLayoutProps) {
  const storeView = useFantasyStore((state) => state.selectedView);
  const setView = useFantasyStore((state) => state.setView);
  const selectedView = currentView ?? storeView;

  // No mostrar navbar en ciertas vistas
  const hideNavbar = selectedView === "duels" || selectedView === "user-detail";

  const handleNavigation = (view: string) => {
    // Si hay onNavigate externo, usarlo (para navegación global)
    if (onNavigate) {
      onNavigate(view);
    } else {
      // Sino, usar el store interno de fantasy
      setView(view as any);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1225",
        paddingBottom: hideNavbar ? 0 : 55,
      }}
    >
      {children}

      {/* NAVEGACIÓN INFERIOR - ORDEN: INICIO, MIS APUESTAS, MATCH, RANKING, IA */}
      {!hideNavbar && (
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            background: "#141c32",
            borderTop: "1px solid #2D3A5F",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 var(--space-2)",
            zIndex: 100,
          }}
        >
          <NavItem
            icon={<Home size={22} />}
            label="Inicio"
            isActive={selectedView === "dashboard"}
            onClick={() => handleNavigation("dashboard")}
          />
          <NavItem
            icon={<FileText size={22} />}
            label="Mis Apuestas"
            isActive={selectedView === "bets"}
            onClick={() => handleNavigation("bets")}
          />
          <NavItem
            icon={<Tv size={22} />}
            label="Match"
            isActive={selectedView === "match"}
            onClick={() => handleNavigation("match")}
          />
          <NavItem
            icon={<Trophy size={22} />}
            label="Ranking"
            isActive={selectedView === "ranking"}
            onClick={() => handleNavigation("ranking")}
          />
          <NavItem
            icon={<MessageSquare size={22} />}
            label="IA"
            isActive={selectedView === "ai"}
            onClick={() => handleNavigation("ai")}
          />
        </nav>
      )}
    </div>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "transparent",
        border: "none",
        padding: "var(--space-2)",
        cursor: "pointer",
        color: isActive ? "#FFE600" : "#6B7A99",
        transition: "color var(--transition-fast)",
      }}
    >
      {icon}
      <span
        style={{
          fontSize: "11px",
          fontWeight: isActive ? "var(--font-semibold)" : "var(--font-medium)",
        }}
      >
        {label}
      </span>
    </button>
  );
}

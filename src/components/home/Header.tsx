import { useState } from "react";
import { Settings, Star } from "lucide-react";

interface HeaderProps {
  points: number;
}

export const Header = ({ points }: HeaderProps) => {
  const [language, setLanguage] = useState<"ES" | "EN">("ES");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ES" ? "EN" : "ES"));
  };

  return (
    <div
      style={{
        background: "rgba(20, 28, 50, 0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "var(--space-2) var(--space-4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* Logo a la izquierda */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
      >
        <img
          src="/436049352.webp"
          alt="Logo"
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            objectFit: "contain",
          }}
        />
        <span
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: "var(--font-black)",
            color: "#ffffff",
          }}
        >
          Quiniela Xbuyer
        </span>
      </div>

      {/* Controles a la derecha */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
        }}
      >
        {/* Selector de idioma */}
        <button
          onClick={toggleLanguage}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "3px 8px",
            background: "#2D3A5F",
            borderRadius: "var(--radius-md)",
            border: "1px solid #3D4A6F",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FFE600";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#3D4A6F";
          }}
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-bold)",
              color: "#FFE600",
            }}
          >
            {language}
          </span>
        </button>

        {/* Puntos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: "#2D3A5F",
            borderRadius: "var(--radius-md)",
            border: "1px solid #3D4A6F",
          }}
        >
          <Star size={14} style={{ color: "#FFE600", fill: "#FFE600" }} />
          <span
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-black)",
              color: "#FFE600",
            }}
          >
            {points}
          </span>
        </div>

        {/* Settings */}
        <button
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2D3A5F",
            border: "1px solid #3D4A6F",
            borderRadius: "var(--radius-md)",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

import { X, Plus, Crown, ArrowUp, ArrowDown, UserX } from "lucide-react";
import type { PlayerPosition } from "../../domain/types";

interface Player {
  id: string;
  name: string;
  initials: string;
  club: string;
  nation: string;
  nationId?: string;
  position: PlayerPosition;
  points: number;
  price: number;
  goals: number;
  assists: number;
  ppg?: number;
  cleanSheets?: number;
  matches?: number;
  isInTeam?: boolean;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isStarter?: boolean;
  pointsByMatchday?: number[];
}

interface PlayerDetailModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToTeam?: (player: Player) => void;
  onRemoveFromTeam?: (playerId: string) => void;
  onMakeCaptain?: (playerId: string) => void;
  onToggleStarter?: (playerId: string) => void;
  mode?: "add" | "manage";
  nationPlayerCount?: number;
}

const POSITION_COLORS: Record<PlayerPosition, string> = {
  GK: "#F59E0B",
  DEF: "#FFE600",
  MID: "#FFE600",
  FWD: "#EF4444",
};

const POSITION_LABELS: Record<PlayerPosition, string> = {
  GK: "POR",
  DEF: "DEF",
  MID: "MED",
  FWD: "DEL",
};

const NATION_NAMES: Record<string, string> = {
  arg: "Argentina",
  bra: "Brasil",
  fra: "Francia",
  esp: "España",
  eng: "Inglaterra",
  ger: "Alemania",
  por: "Portugal",
  ned: "Países Bajos",
  bel: "Bélgica",
  uru: "Uruguay",
  cro: "Croacia",
  mar: "Marruecos",
};

export function PlayerDetailModal({
  player,
  isOpen,
  onClose,
  onAddToTeam,
  onRemoveFromTeam,
  onMakeCaptain,
  onToggleStarter,
  mode = "add",
  nationPlayerCount = 0,
}: PlayerDetailModalProps) {
  if (!isOpen || !player) return null;

  const positionColor = POSITION_COLORS[player.position] || "#6366F1";
  const positionLabel = POSITION_LABELS[player.position] || "???";
  const nationKey = player.nation || player.nationId || "unknown";
  const nationName = NATION_NAMES[nationKey] || nationKey.toUpperCase();
  const ppg = player.ppg || (player.points / (player.matches || 6)).toFixed(1);

  const pointsByMatchday = player.pointsByMatchday || [12, 8, 15, 6, 9, 8];
  const maxPoints = Math.max(...pointsByMatchday);

  const isManageMode = mode === "manage";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          maxHeight: "90vh",
          background: "var(--bg-primary)",
          borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
          overflow: "auto",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* HEADER CON BOTÓN CERRAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "var(--space-3)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--bg-tertiary)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* INFO PRINCIPAL DEL JUGADOR */}
        <div
          style={{
            textAlign: "center",
            padding: "0 var(--space-4) var(--space-4)",
          }}
        >
          {/* CÍRCULO CON INICIALES */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${positionColor} 0%, ${positionColor}80 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--space-4)",
              border: player.isCaptain
                ? "4px solid #FFD700"
                : player.isViceCaptain
                  ? "4px solid #C0C0C0"
                  : "4px solid rgba(255,255,255,0.1)",
              boxShadow: player.isCaptain
                ? `0 0 40px #FFD700`
                : `0 0 40px ${positionColor}40`,
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-black)",
                color: "#fff",
              }}
            >
              {player.initials}
            </span>
            {(player.isCaptain || player.isViceCaptain) && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: player.isCaptain ? "#FFD700" : "#C0C0C0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "var(--font-black)",
                  color: "#000",
                  border: "2px solid var(--bg-primary)",
                }}
              >
                {player.isCaptain ? "C" : "V"}
              </div>
            )}
          </div>

          {/* NOMBRE */}
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "var(--font-black)",
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            {player.name}
          </h2>

          {/* POSICIÓN Y NACIÓN */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-bold)",
                color: positionColor,
                background: `${positionColor}20`,
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                border: `1px solid ${positionColor}40`,
              }}
            >
              {positionLabel}
            </span>
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
              }}
            >
              {nationName}
            </span>
            {isManageMode && (
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-bold)",
                  color: player.isStarter
                    ? "var(--color-primary)"
                    : "var(--text-tertiary)",
                  background: player.isStarter
                    ? "rgba(0, 255, 148, 0.1)"
                    : "var(--bg-tertiary)",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                {player.isStarter ? "TITULAR" : "BANQUILLO"}
              </span>
            )}
          </div>

          {/* CLUB */}
          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              marginTop: "var(--space-1)",
            }}
          >
            {player.club}
          </p>
        </div>

        {/* STATS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-2)",
            padding: "0 var(--space-4)",
            marginBottom: "var(--space-4)",
          }}
        >
          <StatBox
            value={player.points}
            label="PUNTOS"
            color="var(--color-primary)"
          />
          <StatBox value={ppg} label="PPG" color="#FFE600" />
          <StatBox value={player.goals} label="GOLES" color="#F59E0B" />
          <StatBox value={player.assists} label="ASIST." color="#8B5CF6" />
          <StatBox
            value={player.cleanSheets || 0}
            label="P. A CERO"
            color="#0047AB"
          />
          <StatBox
            value={player.matches || 6}
            label="JORNADAS"
            color="var(--text-secondary)"
          />
        </div>

        {/* GRÁFICO DE PUNTOS POR JORNADA */}
        <div
          style={{
            padding: "0 var(--space-4)",
            marginBottom: "var(--space-4)",
          }}
        >
          <h3
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-bold)",
              color: "var(--text-primary)",
              marginBottom: "var(--space-3)",
            }}
          >
            Puntos por jornada
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              height: 80,
              gap: "var(--space-1)",
            }}
          >
            {pointsByMatchday.map((points, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${(points / maxPoints) * 60}px`,
                    background:
                      points >= 10
                        ? "var(--color-primary)"
                        : points >= 5
                          ? "#0047AB"
                          : "var(--bg-tertiary)",
                    borderRadius: "var(--radius-sm)",
                    minHeight: 8,
                  }}
                />
                <span
                  style={{
                    fontSize: "9px",
                    color: "var(--text-tertiary)",
                    fontWeight: "var(--font-bold)",
                  }}
                >
                  {points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div
          style={{
            padding: "var(--space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {isManageMode ? (
            <>
              {/* BOTÓN CAPITÁN */}
              <button
                onClick={() => {
                  onMakeCaptain?.(player.id);
                  onClose();
                }}
                style={{
                  padding: "var(--space-4)",
                  background: player.isCaptain
                    ? "#FFD700"
                    : "var(--bg-tertiary)",
                  border: player.isCaptain
                    ? "none"
                    : "1px solid var(--border-primary)",
                  borderRadius: "var(--radius-lg)",
                  color: player.isCaptain ? "#000" : "var(--text-primary)",
                  fontSize: "var(--text-md)",
                  fontWeight: "var(--font-black)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                }}
              >
                <Crown
                  size={20}
                  style={{ color: player.isCaptain ? "#000" : "#FFD700" }}
                />
                {player.isCaptain ? "Quitar Capitanía" : "Hacer Capitán"}
              </button>

              {/* BOTÓN MOVER TITULAR/BANQUILLO */}
              <button
                onClick={() => {
                  onToggleStarter?.(player.id);
                  onClose();
                }}
                style={{
                  padding: "var(--space-4)",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--text-primary)",
                  fontSize: "var(--text-md)",
                  fontWeight: "var(--font-black)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                }}
              >
                {player.isStarter ? (
                  <>
                    <ArrowDown size={20} style={{ color: "#FFE600" }} />
                    Mover al Banquillo
                  </>
                ) : (
                  <>
                    <ArrowUp
                      size={20}
                      style={{ color: "var(--color-primary)" }}
                    />
                    Poner de Titular
                  </>
                )}
              </button>

              {/* BOTÓN QUITAR DEL EQUIPO */}
              <button
                onClick={() => {
                  onRemoveFromTeam?.(player.id);
                  onClose();
                }}
                style={{
                  padding: "var(--space-4)",
                  background: "#EF4444",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  color: "#fff",
                  fontSize: "var(--text-md)",
                  fontWeight: "var(--font-black)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                }}
              >
                <UserX size={20} />
                Quitar del Equipo
              </button>
            </>
          ) : (
            <>
              {player.isInTeam ? (
                <button
                  onClick={() => {
                    onRemoveFromTeam?.(player.id);
                    onClose();
                  }}
                  style={{
                    padding: "var(--space-4)",
                    background: "#EF4444",
                    border: "none",
                    borderRadius: "var(--radius-lg)",
                    color: "#fff",
                    fontSize: "var(--text-md)",
                    fontWeight: "var(--font-black)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--space-2)",
                  }}
                >
                  <UserX size={20} />
                  Quitar de Mi Selección
                </button>
              ) : nationPlayerCount >= 2 ? (
                <div
                  style={{
                    padding: "var(--space-4)",
                    background: "rgba(239, 68, 68, 0.2)",
                    border: "2px solid #EF4444",
                    borderRadius: "var(--radius-lg)",
                    color: "#EF4444",
                    fontSize: "var(--text-md)",
                    fontWeight: "var(--font-black)",
                    textAlign: "center",
                  }}
                >
                  ⚠️ Límite alcanzado: Ya tienes 2 jugadores de esta selección
                </div>
              ) : (
                <button
                  onClick={() => {
                    onAddToTeam?.(player);
                    onClose();
                  }}
                  style={{
                    padding: "var(--space-4)",
                    background: "var(--color-primary)",
                    border: "none",
                    borderRadius: "var(--radius-lg)",
                    color: "#000",
                    fontSize: "var(--text-md)",
                    fontWeight: "var(--font-black)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--space-2)",
                  }}
                >
                  <Plus size={20} />
                  Añadir a Mi Selección
                </button>
              )}
            </>
          )}

          <button
            onClick={onClose}
            style={{
              padding: "var(--space-3)",
              background: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-bold)",
              cursor: "pointer",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

interface StatBoxProps {
  value: number | string;
  label: string;
  color: string;
}

function StatBox({ value, label, color }: StatBoxProps) {
  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-3)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "var(--text-xl)",
          fontWeight: "var(--font-black)",
          color: color,
          marginBottom: "2px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "9px",
          fontWeight: "var(--font-bold)",
          color: "var(--text-tertiary)",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

import { useDTStore } from "../store/dtStore";
import { getNationInfo } from "../data/players";
import {
  Trophy,
  Users,
  Target,
  Award,
  Calendar,
  Flame,
  ChevronRight,
} from "lucide-react";
import { DTPageLayout } from "./DTPageLayout";
import "./DTHome.css";

// Helper para obtener código de bandera de flagcdn
const getFlagCode = (nationId: string): string => {
  const flagCodes: Record<string, string> = {
    ger: "de",
    aut: "at",
    bel: "be",
    cro: "hr",
    den: "dk",
    esp: "es",
    fra: "fr",
    wal: "gb-wls",
    ned: "nl",
    eng: "gb-eng",
    ita: "it",
    por: "pt",
    srb: "rs",
    sui: "ch",
    ukr: "ua",
    swe: "se",
    arg: "ar",
    bra: "br",
    uru: "uy",
    col: "co",
    ecu: "ec",
    par: "py",
    can: "ca",
    crc: "cr",
    usa: "us",
    mex: "mx",
    pan: "pa",
    jam: "jm",
    alg: "dz",
    cmr: "cm",
    egy: "eg",
    gha: "gh",
    mar: "ma",
    nga: "ng",
    sen: "sn",
    rsa: "za",
    tun: "tn",
    aus: "au",
    irn: "ir",
    jpn: "jp",
    kor: "kr",
    qat: "qa",
    ksa: "sa",
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
    japan: "jp",
    korea: "kr",
    australia: "au",
  };
  return flagCodes[nationId] || nationId;
};

const FlagImage = ({
  nationId,
  size = 32,
}: {
  nationId: string;
  size?: number;
}) => (
  <img
    src={`https://flagcdn.com/w80/${getFlagCode(nationId)}.png`}
    alt={nationId}
    style={{
      width: size,
      height: size * 0.75,
      objectFit: "cover",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    }}
  />
);

export function DTHome() {
  const { currentCareer, setView, playNextMatch } = useDTStore();

  // Si no hay carrera activa, ir a landing
  if (!currentCareer) {
    setView("landing");
    return null;
  }

  const userInfo = getNationInfo(currentCareer.nationId);
  const tournament = currentCareer.tournament;
  const userGroup = tournament?.groups.find(
    (g) => g.id === tournament.userGroupId,
  );

  const nextMatch =
    tournament?.currentPhase === "group"
      ? userGroup?.matches.find(
          (m) =>
            !m.played &&
            (m.homeNationId === currentCareer.nationId ||
              m.awayNationId === currentCareer.nationId),
        )
      : tournament?.knockoutMatches.find(
          (m) =>
            !m.played &&
            (m.homeNationId === currentCareer.nationId ||
              m.awayNationId === currentCareer.nationId),
        );

  // Obtener información del rival del próximo partido
  const isUserHome = nextMatch?.homeNationId === currentCareer.nationId;
  const opponentId = isUserHome
    ? nextMatch?.awayNationId
    : nextMatch?.homeNationId;
  const opponentInfo = opponentId ? getNationInfo(opponentId) : null;

  const lastMatch =
    tournament?.currentPhase === "group"
      ? [...(userGroup?.matches || [])]
          .reverse()
          .find(
            (m) =>
              m.played &&
              (m.homeNationId === currentCareer.nationId ||
                m.awayNationId === currentCareer.nationId),
          )
      : [
          ...(tournament?.knockoutMatches.filter(
            (m) =>
              m.homeNationId === currentCareer.nationId ||
              m.awayNationId === currentCareer.nationId,
          ) || []),
        ]
          .reverse()
          .find((m) => m.played);

  const won = currentCareer.stats.won;
  const drawn = currentCareer.stats.drawn;
  const points = won * 3 + drawn;
  const position =
    userGroup?.standings?.findIndex(
      (s) => s.nationId === currentCareer.nationId,
    ) ?? -1;

  const handlePlay = () => {
    if (nextMatch) {
      // Cargar el siguiente partido antes de ir a match-setup
      const hasMatch = playNextMatch();
      if (hasMatch) setView("match-setup");
      else setView("fixture");
    } else if (tournament) {
      const hasMatch = playNextMatch();
      if (hasMatch) setView("match-setup");
      else setView("fixture");
    } else {
      setView("fixture");
    }
  };

  return (
    <DTPageLayout showBack={true} onBack={() => setView("landing")}>
      <div className="dt-home__content">
        {/* Stats Row */}
        <div className="dt-home__stats">
          <div className="dt-stat-card">
            <Trophy className="dt-stat-card__icon" />
            <div className="dt-stat-card__value">{points}</div>
            <div className="dt-stat-card__label">Puntos</div>
          </div>
          <div className="dt-stat-card">
            <Target className="dt-stat-card__icon" />
            <div className="dt-stat-card__value">
              {currentCareer.stats.goalsFor}
            </div>
            <div className="dt-stat-card__label">Goles</div>
          </div>
          <div className="dt-stat-card">
            <Users className="dt-stat-card__icon" />
            <div className="dt-stat-card__value">{currentCareer.formation}</div>
            <div className="dt-stat-card__label">Formación</div>
          </div>
        </div>

        {/* Match Card */}
        <div className="dt-match-card">
          {nextMatch ? (
            <>
              <div className="dt-match-card__teams">
                <div className="dt-team">
                  <div className="dt-team__flag dt-team__flag--home">
                    <FlagImage nationId={currentCareer.nationId} size={40} />
                  </div>
                  <div className="dt-team__name">TÚ</div>
                </div>

                <div className="dt-match-card__vs">
                  <div className="dt-vs-badge">
                    <span className="dt-vs-badge__text">VS</span>
                  </div>
                </div>

                <div className="dt-team">
                  <div className="dt-team__flag dt-team__flag--away">
                    <FlagImage nationId={opponentId || ""} size={40} />
                  </div>
                  <div className="dt-team__name">
                    {opponentInfo?.nation.code || "RIVAL"}
                  </div>
                </div>
              </div>

              <button onClick={handlePlay} className="dt-match-card__btn">
                <Flame />
                JUGAR PARTIDO
                <ChevronRight />
              </button>
            </>
          ) : tournament ? (
            <div className="dt-empty-state">
              <Trophy size={48} className="dt-empty-state__icon" />
              <p className="dt-empty-state__title">¡Torneo Completado!</p>
              <button
                onClick={() => setView("stats")}
                className="dt-empty-state__btn"
              >
                Ver Estadísticas
              </button>
            </div>
          ) : (
            <div className="dt-empty-state">
              <p className="dt-empty-state__title">
                Aún no has iniciado el torneo
              </p>
              <button
                onClick={() => setView("fixture")}
                className="dt-start-btn"
              >
                Comenzar Mundial
              </button>
            </div>
          )}
        </div>

        {/* Quick Access */}
        <div className="dt-quick-access">
          <h2 className="dt-quick-access__title">Accesos Rápidos</h2>
          <div className="dt-quick-access__grid">
            <button onClick={() => setView("lineup")} className="dt-quick-card">
              <div className="dt-quick-card__icon dt-quick-card__icon--blue">
                <Users />
              </div>
              <div className="dt-quick-card__title">Alineación</div>
              <div className="dt-quick-card__subtitle">
                {currentCareer.starters.length}/11 Titulares
              </div>
            </button>

            <button onClick={() => setView("stats")} className="dt-quick-card">
              <div className="dt-quick-card__icon dt-quick-card__icon--purple">
                <Target />
              </div>
              <div className="dt-quick-card__title">Estadísticas</div>
              <div className="dt-quick-card__subtitle">Ver rendimiento</div>
            </button>

            <button
              onClick={() => setView("fixture")}
              className="dt-quick-card"
            >
              <div className="dt-quick-card__icon dt-quick-card__icon--teal">
                <Calendar />
              </div>
              <div className="dt-quick-card__title">Calendario</div>
              <div className="dt-quick-card__subtitle">Ver fixture</div>
            </button>

            <button onClick={() => setView("badges")} className="dt-quick-card">
              <div className="dt-quick-card__icon dt-quick-card__icon--orange">
                <Award />
              </div>
              <div className="dt-quick-card__title">Logros</div>
              <div className="dt-quick-card__subtitle">
                {currentCareer.badges.filter((b) => b.unlockedAt).length}{" "}
                desbloqueados
              </div>
            </button>
          </div>
        </div>

        {/* Last Result */}
        {lastMatch && (
          <div className="dt-result-card">
            <h2 className="dt-result-card__title">Último Resultado</h2>

            <div className="dt-result-match">
              <div className="dt-result-match__round">
                {lastMatch.round || `JORNADA ${lastMatch.matchday}`}
              </div>
              <div className="dt-result-match__scoreboard">
                {/* Equipo Local */}
                <div className="dt-result-team">
                  <div className="dt-result-team__code">
                    {lastMatch.homeNationId === currentCareer.nationId
                      ? userInfo?.nation.code || "BR"
                      : getNationInfo(lastMatch.homeNationId)?.nation.code ||
                        "RIV"}
                  </div>
                  <span className="dt-result-team__label">
                    {lastMatch.homeNationId === currentCareer.nationId
                      ? "TÚ"
                      : "Rival"}
                  </span>
                </div>

                {/* Marcador */}
                <div className="dt-result-score">
                  <span
                    className={`dt-result-score__value ${lastMatch.homeScore > lastMatch.awayScore ? "dt-result-score__value--win" : "dt-result-score__value--loss"}`}
                  >
                    {lastMatch.homeScore}
                  </span>
                  <span className="dt-result-score__divider">-</span>
                  <span
                    className={`dt-result-score__value ${lastMatch.awayScore > lastMatch.homeScore ? "dt-result-score__value--win" : "dt-result-score__value--loss"}`}
                  >
                    {lastMatch.awayScore}
                  </span>
                </div>

                {/* Equipo Visitante */}
                <div className="dt-result-team">
                  <div className="dt-result-team__code">
                    {lastMatch.awayNationId === currentCareer.nationId
                      ? userInfo?.nation.code || "BR"
                      : getNationInfo(lastMatch.awayNationId)?.nation.code ||
                        "RIV"}
                  </div>
                  <span className="dt-result-team__label">
                    {lastMatch.awayNationId === currentCareer.nationId
                      ? "TÚ"
                      : "Rival"}
                  </span>
                </div>
              </div>
            </div>

            {/* Posición en el Grupo - Solo en fase de grupos */}
            {(!tournament?.currentPhase ||
              tournament.currentPhase === "group") && (
              <div className="dt-position-card">
                <div>
                  <div className="dt-position-info__label">
                    Posición en el Grupo
                  </div>
                  <div className="dt-position-info__value">
                    <span
                      className={`dt-position-info__rank ${position < 2 ? "dt-position-info__rank--qualified" : position === 2 ? "dt-position-info__rank--playoff" : "dt-position-info__rank--eliminated"}`}
                    >
                      {position + 1}°
                    </span>
                    <span className="dt-position-info__status">
                      {position < 2
                        ? "Clasificado"
                        : position === 2
                          ? "Playoff"
                          : "Eliminado"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="dt-position-points__value">{points}</div>
                  <div className="dt-position-points__label">PUNTOS</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DTPageLayout>
  );
}

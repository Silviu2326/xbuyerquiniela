import { useState } from "react";
import {
  useDTStore,
  type TrainingType,
  type TrainingIntensity,
} from "../store/dtStore";
import { DTPageLayout } from "./DTPageLayout";
import { Activity, AlertTriangle, Dumbbell, Heart, Zap } from "lucide-react";
import "./DTTrainingCenter.css";

const TRAINING_TYPES: {
  type: TrainingType;
  name: string;
  icon: string;
  description: string;
  color: string;
  iconComponent: any;
}[] = [
  {
    type: "tactical",
    name: "Táctico",
    icon: "📋",
    description: "Mejora la química y comprensión táctica",
    color: "from-[#FFE600] to-[#0047AB]",
    iconComponent: Activity,
  },
  {
    type: "physical",
    name: "Físico",
    icon: "💪",
    description: "Recupera condición física",
    color: "from-red-500 to-orange-500",
    iconComponent: Dumbbell,
  },
  {
    type: "technical",
    name: "Técnico",
    icon: "⚽",
    description: "Perfecciona habilidades",
    color: "from-[#FFE600] to-[#0047AB]",
    iconComponent: Zap,
  },
  {
    type: "rest",
    name: "Descanso",
    icon: "💤",
    description: "Recuperación total sin riesgos",
    color: "from-purple-500 to-pink-500",
    iconComponent: Heart,
  },
];

const INTENSITIES: {
  value: TrainingIntensity;
  label: string;
  color: string;
}[] = [
  { value: "low", label: "Suave", color: "bg-[#0047AB]" },
  { value: "medium", label: "Normal", color: "bg-yellow-500" },
  { value: "high", label: "Intenso", color: "bg-red-500" },
];

export function DTTrainingCenter() {
  const { currentCareer, completeTraining, setView } = useDTStore();
  const [selectedType, setSelectedType] = useState<TrainingType>("tactical");
  const [selectedIntensity, setSelectedIntensity] =
    useState<TrainingIntensity>("medium");

  if (!currentCareer) return null;

  const training = currentCareer.lastTraining;
  const canTrain = currentCareer.canTrain;

  const handleTraining = () => {
    completeTraining(selectedType, selectedIntensity);
  };

  const getEffectPreview = () => {
    let fitness = 0,
      form = 0,
      injury = 0;
    const mult =
      selectedIntensity === "high"
        ? 1.5
        : selectedIntensity === "medium"
          ? 1
          : 0.6;

    switch (selectedType) {
      case "tactical":
        form = Math.round(5 * mult);
        fitness = Math.round(-3 * mult);
        injury =
          selectedIntensity === "high"
            ? 15
            : selectedIntensity === "medium"
              ? 5
              : 2;
        break;
      case "physical":
        fitness = Math.round(10 * mult);
        injury =
          selectedIntensity === "high"
            ? 25
            : selectedIntensity === "medium"
              ? 10
              : 2;
        break;
      case "technical":
        form = Math.round(6 * mult);
        fitness = Math.round(-5 * mult);
        injury =
          selectedIntensity === "high"
            ? 10
            : selectedIntensity === "medium"
              ? 3
              : 1;
        break;
      case "rest":
        fitness = 20;
        injury = 0;
        break;
    }
    return { fitness, form, injury };
  };

  const preview = getEffectPreview();

  if (!canTrain && training) {
    return (
      <DTPageLayout
        title="Entrenamiento"
        showBack
        onBack={() => setView("home")}
      >
        <div className="train-completed">
          <div className="train-completed__card">
            <div className="train-completed__icon">
              {training.type === "tactical"
                ? "📋"
                : training.type === "physical"
                  ? "💪"
                  : training.type === "technical"
                    ? "⚽"
                    : "💤"}
            </div>
            <h2 className="train-completed__title">
              Entrenamiento{" "}
              {training.type === "tactical"
                ? "Táctico"
                : training.type === "physical"
                  ? "Físico"
                  : training.type === "technical"
                    ? "Técnico"
                    : "de Descanso"}{" "}
              Completado
            </h2>

            <div className="train-completed__stats">
              <div className="train-completed__stat">
                <div className="train-completed__stat-icon">💚</div>
                <div
                  className={`train-completed__stat-value ${training.effects.fitnessChange >= 0 ? "train-completed__stat-value--positive" : "train-completed__stat-value--negative"}`}
                >
                  {training.effects.fitnessChange > 0 ? "+" : ""}
                  {training.effects.fitnessChange}
                </div>
                <div className="train-completed__stat-label">Condición</div>
              </div>
              <div className="train-completed__stat">
                <div className="train-completed__stat-icon">📈</div>
                <div
                  className={`train-completed__stat-value ${training.effects.formChange >= 0 ? "train-completed__stat-value--positive" : "train-completed__stat-value--negative"}`}
                >
                  {training.effects.formChange > 0 ? "+" : ""}
                  {training.effects.formChange}
                </div>
                <div className="train-completed__stat-label">Forma</div>
              </div>
              <div className="train-completed__stat">
                <div className="train-completed__stat-icon">⚠️</div>
                <div className="train-completed__stat-value train-preview__stat-value--medium-risk">
                  {Math.round(training.effects.injuryRisk * 100)}%
                </div>
                <div className="train-completed__stat-label">Riesgo</div>
              </div>
            </div>

            {training.results && training.results.injuredPlayers.length > 0 && (
              <div className="train-completed__injuries">
                <div className="train-completed__injuries-header">
                  <AlertTriangle size={18} />
                  <span>Lesiones</span>
                </div>
                <p className="train-completed__injuries-text">
                  {training.results.injuredPlayers.join(", ")} han sido
                  lesionados
                </p>
              </div>
            )}

            <button
              onClick={() => setView("home")}
              className="train-completed__btn"
            >
              Continuar
            </button>
          </div>
        </div>
      </DTPageLayout>
    );
  }

  return (
    <DTPageLayout
      title="Centro de Entrenamiento"
      showBack
      onBack={() => setView("home")}
    >
      {/* Squad Status */}
      <div className="train-squad">
        <div className="train-squad__card">
          <h3 className="train-squad__title">Estado del Plantel</h3>
          <div className="train-squad__grid">
            <div className="train-squad__stat">
              <div className="train-squad__stat-value train-squad__stat-value--fit">
                {currentCareer.squad.filter((p) => p.fitness >= 80).length}
              </div>
              <div className="train-squad__stat-label">En forma</div>
            </div>
            <div className="train-squad__stat">
              <div className="train-squad__stat-value train-squad__stat-value--tired">
                {
                  currentCareer.squad.filter(
                    (p) => p.fitness >= 60 && p.fitness < 80,
                  ).length
                }
              </div>
              <div className="train-squad__stat-label">Cansados</div>
            </div>
            <div className="train-squad__stat">
              <div className="train-squad__stat-value train-squad__stat-value--exhausted">
                {currentCareer.squad.filter((p) => p.fitness < 60).length}
              </div>
              <div className="train-squad__stat-label">Agotados</div>
            </div>
            <div className="train-squad__stat">
              <div className="train-squad__stat-value train-squad__stat-value--injured">
                {currentCareer.squad.filter((p) => p.isInjured).length}
              </div>
              <div className="train-squad__stat-label">Lesionados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Training Type Selection */}
      <div className="train-types">
        <h3 className="train-types__title">Tipo de Entrenamiento</h3>
        <div className="train-types__grid">
          {TRAINING_TYPES.map((type) => (
            <button
              key={type.type}
              onClick={() => setSelectedType(type.type)}
              className={`train-type ${selectedType === type.type ? "train-type--selected" : "train-type--unselected"}`}
            >
              <div
                className={`train-type__icon train-type__icon--${type.type}`}
              >
                {type.icon}
              </div>
              <div className="train-type__name">{type.name}</div>
              <div className="train-type__desc">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Selection */}
      {selectedType !== "rest" && (
        <div className="train-intensity">
          <h3 className="train-intensity__title">Intensidad</h3>
          <div className="train-intensity__options">
            {INTENSITIES.map((int) => (
              <button
                key={int.value}
                onClick={() => setSelectedIntensity(int.value)}
                className={`train-intensity__btn train-intensity__btn--${int.value} ${selectedIntensity !== int.value ? "train-intensity__btn--unselected" : ""}`}
              >
                {int.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Effect Preview */}
      <div className="train-preview">
        <h3 className="train-preview__title">Efectos Previstos</h3>
        <div className="train-preview__card">
          <div className="train-preview__stats">
            <div className="train-preview__stat">
              <div className="train-preview__stat-icon">💚</div>
              <div
                className={`train-preview__stat-value ${preview.fitness >= 0 ? "train-preview__stat-value--positive" : "train-preview__stat-value--negative"}`}
              >
                {preview.fitness > 0 ? "+" : ""}
                {preview.fitness}
              </div>
              <div className="train-preview__stat-label">Condición</div>
            </div>
            <div className="train-preview__stat">
              <div className="train-preview__stat-icon">📈</div>
              <div
                className={`train-preview__stat-value ${preview.form >= 0 ? "train-preview__stat-value--positive" : "train-preview__stat-value--negative"}`}
              >
                {preview.form > 0 ? "+" : ""}
                {preview.form || "-"}
              </div>
              <div className="train-preview__stat-label">Forma</div>
            </div>
            <div className="train-preview__stat">
              <div className="train-preview__stat-icon">⚠️</div>
              <div
                className={`train-preview__stat-value ${preview.injury > 15 ? "train-preview__stat-value--high-risk" : preview.injury > 5 ? "train-preview__stat-value--medium-risk" : "train-preview__stat-value--low-risk"}`}
              >
                {preview.injury}%
              </div>
              <div className="train-preview__stat-label">Riesgo</div>
            </div>
          </div>
          {selectedIntensity === "high" && selectedType !== "rest" && (
            <div className="train-preview__warning">
              <p>⚠️ Mayor riesgo de lesiones con entrenamiento intenso</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="train-actions">
        <button
          onClick={handleTraining}
          className="train-actions__btn train-actions__btn--primary"
        >
          <Dumbbell size={24} />
          COMENZAR ENTRENAMIENTO
        </button>
        <button
          onClick={() => setView("home")}
          className="train-actions__btn train-actions__btn--secondary"
        >
          Omitir Entrenamiento
        </button>
      </div>
    </DTPageLayout>
  );
}

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import "./AI.css";

interface AIProps {
  onNavigate: (view: string) => void;
  points: number;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AI_RESPONSES: { [key: string]: string } = {
  "¿Quién gana México vs Sudáfrica?": `México ventaja anfitrión:
• Altitud 2.240m
• 78% victorias en casa
Predicción: México 2-1 (71%)`,
  "¿Favorito al título?": `Brasil es el favorito principal:
• 5 Copas del Mundo ganadas
• Plantel más valorado (€1.2B)
• 68% posesión promedio
Predicción: Brasil campeón (45%)`,
  default: `Análisis en proceso:
• Revisando estadísticas
• Comparando históricos
• Calculando probabilidades
Te recomiendo analizar más variables`,
};

const SUGGESTED_QUESTIONS = [
  "¿Quién gana México vs Sudáfrica?",
  "¿Favorito al título?",
];

export const AI = ({ onNavigate, points }: AIProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(
      () => {
        const response = AI_RESPONSES[userMessage] || AI_RESPONSES["default"];

        const aiMessage: Message = {
          id: Date.now(),
          text: response,
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      },
      1500 + Math.random() * 1000,
    );
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();

    if (!messageText) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    simulateAIResponse(messageText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <MobileLayout onNavigate={onNavigate} currentView="ai">
      {/* Header Principal */}
      <Header points={points} />

      <div className="ai-container">
        {/* Back Button - Top Left */}
        <button onClick={() => onNavigate("dashboard")} className="ai-back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="ai-header">
          <div className="ai-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M8 15C8 11.6863 10.6863 9 14 9H26C29.3137 9 32 11.6863 32 15V23C32 26.3137 29.3137 29 26 29H14C10.6863 29 8 26.3137 8 23V15Z"
                stroke="#FFE600"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="18" r="1.5" fill="#0047AB" />
              <circle cx="24" cy="18" r="1.5" fill="#0047AB" />
              <path
                d="M16 24C16 24 18 26 20 26C22 26 24 24 24 24"
                stroke="#FFE600"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="ai-header-title">Asistente IA</h1>
        </div>

        {/* Messages or Suggestions */}
        <div className="ai-content" ref={messagesContainerRef}>
          {showSuggestions && messages.length === 0 ? (
            <div className="ai-suggestions">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSuggestionClick(question)}
                  className="ai-suggestion-card"
                >
                  {question}
                </button>
              ))}
            </div>
          ) : (
            <div className="ai-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`ai-msg ${message.sender === "user" ? "ai-msg-user" : "ai-msg-ai"}`}
                >
                  <div className="ai-msg-bubble">
                    {message.text.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-msg ai-msg-ai">
                  <div className="ai-msg-bubble ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Scroll to top button */}
        {messages.length > 0 && (
          <button onClick={scrollToTop} className="ai-scroll-top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 19V5M12 5L5 12M12 5L19 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Input Area with Send Button */}
        <div className="ai-input-area">
          <div className="ai-input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregunta..."
              className="ai-input-field"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="ai-send-button"
              aria-label="Enviar mensaje"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

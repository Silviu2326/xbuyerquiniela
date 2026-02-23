import { useState } from "react";
import { Header } from "../home/Header";
import { MobileLayout } from "../../features/fantasy/presentation/shared/MobileLayout";
import "./News.css";
import { NewsDetail } from "./NewsDetail";

interface NewsProps {
  onNavigate: (view: string) => void;
  points: number;
}

interface NewsItem {
  id: number;
  category: string;
  time: string;
  title: string;
  image: string;
  categoryColor: string;
  content: string;
  author: string;
  date: string;
  media: string;
  reporter: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    category: "OFICIAL",
    time: "2h",
    title: "Mbappé y Haaland: el duelo estelar del Grupo I",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
    categoryColor: "#FFE600",
    media: "TyC Sports",
    reporter: "Gastón Edul",
    content: `El Grupo I del Mundial promete ser uno de los más emocionantes del torneo, con dos de los mejores delanteros del mundo enfrentándose: Kylian Mbappé y Erling Haaland.

Francia, liderada por Mbappé, llega como una de las favoritas después de su impresionante campaña clasificatoria. El delantero del PSG está en la mejor forma de su carrera y buscará guiar a Les Bleus a otro título mundial.

Por su parte, Noruega ha logrado clasificarse por primera vez en décadas, en gran parte gracias a los goles de Haaland. El delantero del Manchester City ha sido imparable esta temporada y querrá demostrar que puede brillar también en el escenario más grande del fútbol.

El primer enfrentamiento entre ambas selecciones promete ser uno de los partidos más esperados de la fase de grupos, con millones de aficionados en todo el mundo ansiosos por ver este duelo de titanes.

Los expertos coinciden en que este grupo definirá no solo a dos clasificados, sino también a posibles candidatos al título mundial.`,
    author: "Gastón Edul",
    date: "13 de febrero, 2026",
  },
  {
    id: 2,
    category: "ANÁLISIS",
    time: "4h",
    title: "Grupo de la muerte: ¿C, H o L?",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    categoryColor: "#FFE600",
    media: "ESPN",
    reporter: "Gastón Edul",
    content: `El sorteo del Mundial ha dejado tres grupos que podrían considerarse "el grupo de la muerte", pero ¿cuál es realmente el más difícil?

El Grupo C reúne a Brasil, Alemania, Países Bajos y una selección africana emergente. Tres campeones del mundo en un mismo grupo es algo histórico.

El Grupo H no se queda atrás, con España, Inglaterra, Uruguay y Croacia. Cuatro selecciones que han llegado a semifinales o finales en mundiales recientes.

Finalmente, el Grupo L presenta a Argentina, Portugal, Italia y México. La combinación de experiencia mundialista y hambre de gloria hace de este grupo un verdadero desafío.

Los analistas debaten cuál será el más competitivo, pero una cosa es segura: en estos grupos, cualquier resultado es posible y ningún equipo puede confiarse.

La fase de grupos promete emociones desde el primer día.`,
    author: "Gastón Edul",
    date: "13 de febrero, 2026",
  },
  {
    id: 3,
    category: "SELECCIONES",
    time: "6h",
    title: "México preparado para su 3er Mundial como sede",
    image:
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=600&fit=crop",
    categoryColor: "#FFE600",
    media: "Fox Sports",
    reporter: "Gastón Edul",
    content: `México se prepara para hacer historia al ser sede de su tercer Mundial, después de 1970 y 1986. Los estadios están siendo renovados y la afición está más entusiasta que nunca.

El Estadio Azteca, que albergará la ceremonia de inauguración, ha sido completamente modernizado manteniendo su esencia histórica. Este icónico estadio ha sido testigo de dos de los goles más famosos en la historia del fútbol.

Las ciudades de Guadalajara y Monterrey también recibirán partidos importantes, con sus estadios renovados y preparados para brindar la mejor experiencia tanto a jugadores como a aficionados.

La selección mexicana, como anfitriona, tiene la presión de superar el famoso "quinto partido" que los ha limitado en mundiales anteriores. El cuerpo técnico ha trabajado intensamente en la preparación del equipo.

La organización promete un Mundial inolvidable, combinando la pasión mexicana por el fútbol con una infraestructura de primer nivel.`,
    author: "Gastón Edul",
    date: "13 de febrero, 2026",
  },
  {
    id: 4,
    category: "IA",
    time: "12h",
    title: "Argentina favorita pero España acecha",
    image:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop",
    categoryColor: "#FFE600",
    media: "TyC Sports",
    reporter: "Gastón Edul",
    content: `Según los últimos análisis de inteligencia artificial que procesan miles de datos estadísticos, Argentina llega como favorita al Mundial, pero España aparece como el equipo que podría dar la sorpresa.

Los algoritmos de IA han analizado el rendimiento de todos los equipos en los últimos cuatro años, incluyendo partidos oficiales, amistosos, y el desempeño individual de cada jugador.

Argentina, campeona del mundo en 2022, ha mantenido un nivel excepcional bajo el liderazgo de Lionel Scaloni. La química del equipo y la experiencia de haber ganado el título anterior les dan una ventaja significativa.

España, por su parte, ha renovado su selección con una generación de jóvenes talentosos que juegan un fútbol vistoso y efectivo. Los modelos predictivos le dan un 28% de probabilidades de ganar el torneo.

Brasil, Francia e Inglaterra completan el top 5 de favoritos según la IA, pero como siempre en el fútbol, las sorpresas pueden cambiar todas las predicciones.`,
    author: "Gastón Edul",
    date: "13 de febrero, 2026",
  },
];

export const News = ({ onNavigate, points }: NewsProps) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  if (selectedNews) {
    return (
      <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />
    );
  }

  return (
    <MobileLayout onNavigate={onNavigate} currentView="news">
      {/* Header Principal */}
      <Header points={points} />

      <div className="news-container">
        {/* Banner Image */}
        <div className="news-banner-container">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
            alt="News Banner"
            className="news-banner-image"
          />
          <div className="news-banner-overlay" />
        </div>

        <div className="news-content">
          {/* Back button */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="absolute left-6 top-6 group flex items-center gap-2 text-[#6B7A99] hover:text-[#FFE600] transition-all duration-300 z-10"
          >
            <div className="w-14 h-14 rounded-full bg-[#141c32] border border-[#2D3A5F] flex items-center justify-center group-hover:border-[#FFE600]/30 group-hover:bg-[#FFE600]/5 transition-all">
              <span className="text-2xl text-[#6B7A99] group-hover:text-[#FFE600] transition-colors">
                ←
              </span>
            </div>
            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">
              Volver
            </span>
          </button>

          {/* News Icon */}
          <div className="news-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
              <path d="M18 14h-8"></path>
              <path d="M15 18h-5"></path>
              <path d="M10 6h8v4h-8V6Z"></path>
            </svg>
          </div>

          {/* Title */}
          <h1 className="news-title text-white">Noticias</h1>
          <p className="news-subtitle text-[#6B7A99]">
            Últimas noticias del Mundial
          </p>

          {/* News Cards */}
          <div className="news-cards">
            {newsData.map((news) => (
              <div
                key={news.id}
                className="news-card"
                onClick={() => setSelectedNews(news)}
              >
                <div className="news-card-image-wrapper">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="news-card-image"
                  />
                  <div className="news-card-overlay">
                    <span
                      className="news-card-category-badge"
                      style={{
                        backgroundColor: news.categoryColor,
                        boxShadow: `0 4px 15px ${news.categoryColor}50`,
                      }}
                    >
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="news-card-content">
                  <div className="news-card-meta">
                    <div className="news-card-media">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3D4A6F"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                      <span className="text-[#3D4A6F]">{news.media}</span>
                    </div>
                    <span className="news-card-time text-[#5A6A85]">
                      {news.time}
                    </span>
                  </div>
                  <h2 className="news-card-title">{news.title}</h2>
                  <div className="news-card-footer">
                    <div className="news-card-reporter">
                      <div className="reporter-avatar">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <span className="text-[#6B7A99]">{news.reporter}</span>
                    </div>
                    <div className="news-card-read-more">Leer más →</div>
                  </div>
  
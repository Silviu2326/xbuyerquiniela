import './NewsDetail.css';

interface NewsDetailProps {
  news: {
    id: number;
    category: string;
    time: string;
    title: string;
    image: string;
    categoryColor: string;
    content: string;
    author: string;
    date: string;
  };
  onBack: () => void;
}

export const NewsDetail = ({ news, onBack }: NewsDetailProps) => {
  return (
    <div className="news-detail-container">
      <div className="news-detail-header">
        <button onClick={onBack} className="news-detail-back-btn">
          ← Volver a noticias
        </button>
      </div>

      <div className="news-detail-content">
        <article className="news-detail-article">
          <div className="news-detail-category">
            <span className="news-detail-category-label" style={{ color: news.categoryColor }}>
              {news.category}
            </span>
            <span className="news-detail-category-time">· {news.time}</span>
          </div>

          <h1 className="news-detail-title">{news.title}</h1>

          <div className="news-detail-meta">
            <span className="news-detail-author">{news.author}</span>
            <span className="news-detail-separator">·</span>
            <span className="news-detail-date">{news.date}</span>
          </div>

          <img
            src={news.image}
            alt={news.title}
            className="news-detail-image"
          />

          <div className="news-detail-body">
            {news.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="news-detail-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="news-detail-share">
            <h3 className="news-detail-share-title">Compartir</h3>
            <div className="news-detail-share-buttons">
              <button className="news-detail-share-btn">
                <span>🔗</span> Copiar enlace
              </button>
              <button className="news-detail-share-btn">
                <span>📱</span> Compartir
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

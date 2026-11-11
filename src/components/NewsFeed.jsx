import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

function normalizeNewsData(rawItem, sourceName) {
  return {
    title: rawItem.title || 'Tanpa Judul',
    image:
      rawItem.image ||
      rawItem.image_thumbnail ||
      rawItem.thumbnail ||
      '',
    date:
      rawItem.date ||
      rawItem.time ||
      rawItem.isoDate ||
      'Hari ini',
    category:
      rawItem.category ||
      sourceName.toUpperCase(),
    link: rawItem.link || '#',
    snippet:
      rawItem.content ||
      rawItem.description ||
      rawItem.snippet ||
      ''
  };
}

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('kompas');

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Alamat endpoint API
      const url = `/api/news/${source}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const json = await res.json();

      // Menyesuaikan kemungkinan format respons API
      const rawArticles = Array.isArray(json)
        ? json
        : json.data ||
          json.result ||
          json.articles ||
          json.results ||
          [];

      if (!Array.isArray(rawArticles)) {
        throw new Error('Format data berita tidak valid.');
      }

      const cleanArticles = rawArticles.map(item =>
        normalizeNewsData(item, source)
      );

      setNews(cleanArticles);

    } catch (err) {
      console.error('Kesalahan mengambil berita:', err);
      setError(err.message || 'Gagal mengambil berita.');
      setNews([]);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [source]);

  return (
    <div className="news-container">

      <div className="news-toolbar">
        <div>
          <h2>
            Berita Terkini {source.toUpperCase()}
          </h2>
          <p>
            Menampilkan {news.length} artikel dari RSS Berita
          </p>
        </div>

        <div className="source-selector">
          <button
            onClick={() => setSource('kompas')}
            className={source === 'kompas' ? 'active' : ''}
          >
            📰 Kompas
          </button>

          <button
            onClick={() => setSource('cnn')}
            className={source === 'cnn' ? 'active' : ''}
          >
            🌐 CNN
          </button>
        </div>

        <button
          className="btn-refresh"
          onClick={fetchNews}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Memuat...' : '🔄 Segarkan Berita'}
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="spinner-box">
          <div className="css-spinner"></div>
          <p>Mengunduh berita nasional terbaru...</p>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="error-banner">
          <h5>Terjadi Kesalahan Jaringan</h5>
          <p>{error}</p>

          <button onClick={fetchNews}>
            Coba Lagi
          </button>
        </div>
      )}

      {/* Berita berhasil dimuat */}
      {!isLoading && !error && (
        <div className="news-grid">
          {news.length > 0 ? (
            news.map((item, i) => (
              <NewsCard
                key={item.link !== '#' ? item.link : i}
                {...item}
              />
            ))
          ) : (
            <p>Belum ada berita yang tersedia.</p>
          )}
        </div>
      )}

    </div>
  );
}

export default NewsFeed;
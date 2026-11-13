import express from 'express';
import Parser from 'rss-parser';

const app = express();

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
});

const PORT = 3000;

const feeds = {
  kompas: 'https://news.google.com/rss/search?q=site%3Akompas.com&hl=id&gl=ID&ceid=ID%3Aid',
  cnn: 'https://www.cnnindonesia.com/rss/'
};

app.get('/api/news/:source', async (req, res) => {
  try {
    const source = req.params.source.toLowerCase();
    const feedUrl = feeds[source];
                    function extractNewsImage(item) {
     const content = item.content || item.description || '';

    const imageMatch = content.match(
    /<img[^>]+src=["']([^"']+)["']/i
  );

  return (
    item.enclosure?.url ||
    item['media:content']?.url ||
    item['media:thumbnail']?.url ||
    imageMatch?.[1] ||
    ''
  );
}

    if (!feedUrl) {
      return res.status(400).json({
        success: false,
        message: 'Sumber berita tidak ditemukan'
      });
    }

    console.log(`Mengambil berita dari: ${source}`);

    const feed = await parser.parseURL(feedUrl);

    const articles = feed.items.map((item) => ({
      title: item.title || 'Tanpa Judul',
      image: extractNewsImage(item),
      date: item.isoDate || item.pubDate || '',
      category: source.toUpperCase(),
      link: item.link || '#',
      content: item.contentSnippet || item.content || ''
    }));

    return res.json({
      success: true,
      total: articles.length,
      data: articles
    });

  } catch (error) {
    console.error('Error RSS:', error);

    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil berita dari sumber RSS',
      error: error.message
    });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend berjalan di http://127.0.0.1:${PORT}`);
});
import express from 'express';
import Parser from 'rss-parser';

const app = express();
const parser = new Parser();

const feeds = {
  kompas:
    'https://news.google.com/rss/search?q=site%3Akompas.com&hl=id&gl=ID&ceid=ID%3Aid',

  cnn:
    'https://www.cnnindonesia.com/rss/'
};

app.get('/api/news/:source', async (req, res) => {
  try {
    const source = req.params.source;
    const feedUrl = feeds[source];

    if (!feedUrl) {
      return res.status(400).json({
        success: false,
        message: 'Sumber berita tidak ditemukan'
      });
    }

    const feed = await parser.parseURL(feedUrl);

    const articles = feed.items.map(item => ({
      title: item.title || 'Tanpa Judul',
      image: item.enclosure?.url || '',
      date: item.isoDate || item.pubDate || '',
      category: source.toUpperCase(),
      link: item.link || '#',
      content:
        item.contentSnippet ||
        item.content ||
        ''
    }));

    res.json({
      success: true,
      data: articles
    });

  } catch (error) {
    console.error('Error RSS:', error.message);

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil berita dari sumber RSS'
    });
  }
});

app.listen(3000, () => {
  console.log('Backend berjalan di http://localhost:3000');
});
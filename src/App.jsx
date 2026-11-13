import { useState } from 'react';
import TeamDirectory from './components/TeamDirectory';
import BarangDirectory from './components/BarangDirectory';
import NewsFeed from './components/NewsFeed';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('team');

  return (
    <div className="app-layout">
      <header className="main-header">
        <h1>Portal Manajemen & Informasi Tim</h1>
        <p>Aplikasi Terpadu Pelatihan Fullstack Node.js & React</p>

        <nav className="tab-bar">
          <button
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            👥 Anggota Tim
          </button>
          <button
            className={`tab-btn ${activeTab === 'barang' ? 'active' : ''}`}
            onClick={() => setActiveTab('barang')}
          >
            📦 Data Barang
          </button>
          <button
            className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            📰 Berita Terkini
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeTab === 'team' && <TeamDirectory />}
        {activeTab === 'barang' && <BarangDirectory />}
        {activeTab === 'news' && <NewsFeed />}
      </main>
    </div>
  );
}

export default App;

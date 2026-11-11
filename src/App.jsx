import NotFoundPage from './pages/NotFoundPage';
import { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import TeamDirectory from './components/TeamDirectory';
import NewsFeed from './components/NewsFeed';
import MemberDetailPage from './pages/MemberDetailPage';

import './App.css';
function App() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('team');

  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Azzahra meydi',
      role: 'Frontend Dev',
      status: 'Online',
      stars: 2,
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
      id: 2,
      name: 'Iqbal ramadhan',
      role: 'UI/UX Designer',
      status: 'Offline',
      stars: 5,
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
      id: 3,
      name: 'Lilis dwi',
      role: 'Backend Engineer',
      status: 'Online',
      stars: 1,
      avatar: 'https://i.pravatar.cc/150?u=3'
    }
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate('/');
  };

  return (
    <div className="app-layout">
      <header className="main-header">
        <h1>Portal Manajemen & Informasi Tim</h1>
        <p>Aplikasi Terpadu Pelatihan Fullstack Node.js & React</p>

        <nav className="tab-bar">
          <button
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => handleTabChange('team')}
          >
            👥 Anggota Tim
          </button>

          <button
            className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => handleTabChange('news')}
          >
            📰 Berita Terkini
          </button>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              activeTab === 'team' ? (
                <TeamDirectory
                  members={members}
                  setMembers={setMembers}
                />
              ) : (
                <NewsFeed />
              )
            }
          />

          <Route
            path="/member/:id"
            element={
              <MemberDetailPage members={members} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Writing from './pages/Writing';
import Shadowing from './pages/Shadowing';
import Anki from './pages/Anki';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logo">
            <span style={{ fontSize: '1.8rem' }}>🗣️</span> Fluent
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/lesson" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Bài học
            </Link>
            <Link to="/writing" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Luyện dịch
            </Link>
            <Link to="/shadowing" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Shadowing
            </Link>
            <Link to="/anki" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Học Anki
            </Link>
          </div>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/shadowing" element={<Shadowing />} />
          <Route path="/anki" element={<Anki />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

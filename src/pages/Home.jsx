import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-enter-active" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
      
      <div className="glass-card animate-float" style={{ padding: '4rem 2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
          Tự tin giao tiếp <br/> <span style={{ color: '#10B981' }}>Tiếng Anh</span> mỗi ngày
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem' }}>
          Học từ vựng hiệu quả qua hệ thống Flashcard thông minh. Ghi nhớ lâu hơn, phản xạ nhanh hơn.
        </p>
        
        <Link to="/lesson" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
          🚀 Bắt đầu học ngay
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'left' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: '#10B981' }}>💡 Phương pháp</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>Học lặp lại ngắt quãng giúp tối ưu bộ nhớ.</p>
        </div>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: '#10B981' }}>🎯 Trọng tâm</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>Từ vựng thiết thực nhất dành cho giao tiếp cơ bản.</p>
        </div>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: '#10B981' }}>⚡ Phản xạ</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>Tăng tốc độ phản xạ qua các bài Quiz cuối giờ.</p>
        </div>
      </div>
    </div>
  );
}

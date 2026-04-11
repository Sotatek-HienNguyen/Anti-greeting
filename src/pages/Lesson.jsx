import { useState, useMemo } from 'react';
import Flashcard from '../components/Flashcard';
import ALL_WORDS from '../data/words.json';

// Lấy ngẫu nhiên vài từ hoặc cố định. Ở đây mình tạo một mảng random 10 từ học mỗi ngày.
function getRandomWords(list, num) {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export default function Lesson() {
  // Fix daily list on mount
  const dailyWords = useMemo(() => getRandomWords(ALL_WORDS, 10), []);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < dailyWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentWordStr = dailyWords[currentIndex];

  return (
    <div className="page-enter-active" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Oxford 3000 Vocabulary</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          Từ vựng {currentIndex + 1} / {dailyWords.length} (Random Daily Batch)
        </p>
      </div>

      <Flashcard key={currentWordStr} wordString={currentWordStr} />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="btn-secondary"
          style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
        >
           &larr; Quay lại
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex === dailyWords.length - 1}
          className="btn-primary"
          style={{ opacity: currentIndex === dailyWords.length - 1 ? 0.5 : 1 }}
        >
          {currentIndex === dailyWords.length - 1 ? 'Hoàn thành' : 'Tiếp theo \u2192'}
        </button>
      </div>
    </div>
  );
}

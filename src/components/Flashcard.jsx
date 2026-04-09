import { useState, useEffect } from 'react';
import VideoContext from './VideoContext';

export default function Flashcard({ wordString }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Fetch real definition from free dictionary API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(wordString)}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(json => {
        if (isMounted && json && json.length > 0) {
          const entry = json[0];
          // Extract the first meaningful phonetics if available
          let phonetic = '';
          let audioUrl = '';
          if (entry.phonetics) {
            const pText = entry.phonetics.find(p => p.text);
            phonetic = pText ? pText.text : entry.phonetic || '';
            
            const usPhonetic = entry.phonetics.find(p => p.audio && p.audio.includes('-us.mp3'));
            if (usPhonetic) {
               audioUrl = usPhonetic.audio;
            } else {
               const anyPhonetic = entry.phonetics.find(p => p.audio);
               if (anyPhonetic) audioUrl = anyPhonetic.audio;
            }
          }
          
          let partOfSpeech = '';
          let definition = '';
          let example = '';
          
          if (entry.meanings && entry.meanings.length > 0) {
            partOfSpeech = entry.meanings[0].partOfSpeech || '';
            if (entry.meanings[0].definitions && entry.meanings[0].definitions.length > 0) {
               definition = entry.meanings[0].definitions[0].definition;
               example = entry.meanings[0].definitions[0].example || '';
            }
          }
          
          setData({
            word: entry.word,
            phonetic,
            partOfSpeech,
            definition,
            example,
            audio: audioUrl
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
            console.error("Dictionary API error for word:", wordString, err);
            // Fallback for words not found in dictionary
            setData({
                word: wordString,
                phonetic: '',
                partOfSpeech: 'unknown',
                definition: 'No definition found in the dictionary.',
                example: '',
                audio: ''
            });
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [wordString]);

  // Audio Play Effect
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Press 'R' to play audio
      if ((e.key === 'r' || e.key === 'R') && data && data.audio) {
        const audio = new Audio(data.audio);
        audio.play().catch(err => console.error("Audio play failed:", err));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data]);

  if (loading) {
    return (
      <div className="flashcard-container">
        <div className="flashcard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '2rem', border: 'none', background: 'transparent' }}>
             <p className="text-main-invert animate-float">⏳ Đang tải từ vựng...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      {isVideoOpen && <VideoContext word={data.word} onClose={() => setIsVideoOpen(false)} />}
      <div className="flashcard-container">
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        
        {/* Front Side */}
        <div className="flashcard-face flashcard-front text-main-invert" onClick={() => setIsFlipped(true)}>
          <div className="word-main" style={{ textTransform: 'capitalize' }}>{data.word}</div>
          {data.partOfSpeech && <div className="word-type">({data.partOfSpeech})</div>}
          {data.phonetic && (
              <div className="word-pronunciation" style={{ marginTop: '1rem' }}>
                {data.phonetic}
              </div>
          )}
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#6B7280' }}>
            Nhấp để lật<br/>
            {data.audio ? <span style={{ color: '#10B981' }}>(Nhấn phím <b>R</b> để nghe)</span> : '(Không có audio cho từ này)'}
          </div>
        </div>

        {/* Back Side */}
        <div className="flashcard-face flashcard-back text-main-invert" onClick={(e) => {
           // Prevent flip if clicking on the video button
           if (e.target.closest('button')) return;
           setIsFlipped(false);
        }}>
          <div className="word-meaning" style={{ fontSize: '1.2rem' }}>{data.definition}</div>
          {data.example && <div className="word-example" style={{ marginTop: '0.5rem' }}>"{data.example}"</div>}
          
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-primary" onClick={() => setIsVideoOpen(true)} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
              🎬 Xem ngữ cảnh thực tế (Video)
            </button>
            <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>
              Nhấp vùng trống để quay lại
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

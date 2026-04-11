import { useState } from 'react';
import { fetchWritingSession, submitWritingSession } from '../services/api';
import SpeechInput from '../components/SpeechInput';

export default function Writing() {
  const [appState, setAppState] = useState('init'); // init, playing, submitting, results
  const [sessionData, setSessionData] = useState(null);
  const [answers, setAnswers] = useState({}); // { [id]: "answer string" }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultsData, setResultsData] = useState(null);
  const [error, setError] = useState('');

  const handleStart = async () => {
    setAppState('submitting');
    try {
      const data = await fetchWritingSession(10);
      setSessionData(data);
      setAnswers({});
      setCurrentIndex(0);
      setAppState('playing');
      setError('');
    } catch(err) {
       console.error("Failed to start session", err);
       setAppState('init');
    }
  };

  const handleAnswerChange = (text) => {
     setError('');
     const id = sessionData.questions[currentIndex].id;
     setAnswers(prev => ({ ...prev, [id]: text }));
  };

  const handleSpeechAppend = (text) => {
     setError('');
     const id = sessionData.questions[currentIndex].id;
     setAnswers(prev => {
        const existing = prev[id] || "";
        // Append with a space if there's already text
        return { ...prev, [id]: existing ? `${existing} ${text}` : text };
     });
  };

  const handleNext = () => {
     const currentId = sessionData.questions[currentIndex].id;
     if (!answers[currentId] || answers[currentId].trim() === "") {
        setError('Vui lòng nhập câu trả lời');
        return;
     }
     if (currentIndex < sessionData.questions.length - 1) {
       setCurrentIndex(prev => prev + 1);
       setError('');
     }
  };

  const handlePrev = () => {
     if (currentIndex > 0) {
       setCurrentIndex(prev => prev - 1);
       setError('');
     }
  };

  const handleSubmit = async () => {
     const currentId = sessionData.questions[currentIndex].id;
     if (!answers[currentId] || answers[currentId].trim() === "") {
        setError('Vui lòng nhập câu trả lời');
        return;
     }

     setAppState('submitting');
     const payload = sessionData.questions.map(q => ({
        id: q.id,
        userAnswer: answers[q.id] || ""
     }));
     
     try {
       const res = await submitWritingSession(payload);
       setResultsData(res);
       setAppState('results');
       setError('');
     } catch(err) {
       console.error("Submit error", err);
       setAppState('playing'); // revert
     }
  };

  const playHint = (text) => {
     if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // limit overlapping
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        // Mặc định chọn giọng US nếu có
        const voices = window.speechSynthesis.getVoices();
        const usVoice = voices.find(v => v.lang.includes('en-US'));
        if (usVoice) utterance.voice = usVoice;
        window.speechSynthesis.speak(utterance);
     }
  };

  if (appState === 'init') {
    return (
      <div className="page-enter-active" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#10B981' }}>✍️ Luyện Viết & Dịch</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Tập phản xạ dịch thuật thực tế. Sử dụng voice hoặc gõ phím để nhập.
        </p>
        <button onClick={handleStart} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
          Bắt đầu Practice (10 CÂU)
        </button>
      </div>
    );
  }

  if (appState === 'submitting' && !resultsData) {
     return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
           <h2 style={{ color: 'white' }}>⏳ Hệ thống đang tải và chấm điểm...</h2>
        </div>
     );
  }

  if (appState === 'playing' && sessionData) {
     const currentQ = sessionData.questions[currentIndex];
     const currentAns = answers[currentQ.id] || "";
     const total = sessionData.questions.length;

     return (
        <div className="page-enter-active" style={{ maxWidth: '700px', margin: '0 auto', paddingTop: '2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'rgba(255,255,255,0.6)' }}>
              <span>Câu hỏi {currentIndex + 1} / {total}</span>
              <span>ID: {sessionData.sessionId}</span>
           </div>

           <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '1.5rem', color: '#10B981', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                 Dịch câu sau:
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
                 "{currentQ.vn}"
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <textarea 
                   rows="4" 
                   placeholder="Nhập câu tiếng Anh bản dịch của bạn vào đây..."
                   value={currentAns}
                   onChange={(e) => handleAnswerChange(e.target.value)}
                   style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: error ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.2)',
                      fontSize: '1.2rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      outline: 'none'
                   }}
                 />
                 {error && <div className="shake-animation" style={{ color: '#EF4444', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>⚠️</span> {error}
                 </div>}
                 <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.5rem' }}>
                    <SpeechInput onAppend={handleSpeechAppend} />
                    <button 
                       type="button" 
                       onClick={() => playHint(currentQ.hint)}
                       title="Nghe gợi ý (Tiếng Anh)"
                       style={{
                         display: 'inline-flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         padding: '0.5rem 1rem',
                         borderRadius: '8px',
                         border: '1px solid rgba(255,255,255,0.2)',
                         backgroundColor: 'rgba(255,255,255,0.05)',
                         color: '#E5E7EB',
                         cursor: 'pointer',
                         transition: 'all 0.3s'
                       }}
                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                    >
                       <span style={{ fontSize: '1.2rem' }}>🔊</span>
                    </button>
                 </div>
              </div>
           </div>

           <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button onClick={handlePrev} disabled={currentIndex === 0} className="btn-secondary" style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}>
                 Quay lại
              </button>
              
              {currentIndex < total - 1 ? (
                 <button onClick={handleNext} className="btn-primary">
                    Câu tiếp theo
                 </button>
              ) : (
                 <button onClick={handleSubmit} className="btn-primary" style={{ backgroundColor: '#EF4444' }}>
                    🚀 Submit All (Chấm Điểm)
                 </button>
              )}
           </div>
        </div>
     );
  }

  if (appState === 'results' && resultsData) {
     return (
        <div className="page-enter-active" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem', paddingBottom: '4rem' }}>
           <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>Kết quả Phiên học</h2>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#10B981', marginBottom: '1rem' }}>
                 {resultsData.totalScore} <span style={{ fontSize: '1.5rem', color: '#E5E7EB' }}>/ {resultsData.maxScore}</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>Điểm được tính bằng thuật toán tương đồng ngữ nghĩa</p>
           </div>

           <h3 style={{ fontSize: '1.5rem', color: '#10B981', marginBottom: '1.5rem' }}>Chi tiết từng câu:</h3>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {resultsData.results.map((r, idx) => {
                 const qData = sessionData.questions.find(q => q.id === r.id);
                 let boxBorderColor = '#374151'; // default
                 if (r.result === 'correct') boxBorderColor = '#10B981'; // green
                 else if (r.result === 'partial') boxBorderColor = '#F59E0B'; // yellow
                 else boxBorderColor = '#EF4444'; // red

                 return (
                    <div key={r.id} className="glass-card" style={{ padding: '1.5rem', borderLeft: `6px solid ${boxBorderColor}` }}>
                       <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                         Câu {idx + 1}: "{qData?.vn}"
                       </div>
                       <div style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>
                         <strong>Bạn trả lời:</strong> {r.userAnswer || <i style={{color:'grey'}}>Không có phản hồi</i>}
                       </div>
                       <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '8px', color: '#A7F3D0', marginBottom: '1rem' }}>
                         <strong>Tham chiếu tốt nhất:</strong> {r.suggestion}
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontStyle: 'italic', color: boxBorderColor }}>📝 Feedback: {r.feedback}</span>
                         <span style={{ fontWeight: 'bold', color: 'white' }}>Score: {r.score}</span>
                       </div>
                    </div>
                 );
              })}
           </div>

           <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button 
                onClick={() => setAppState('init')} 
                className="btn-primary"
                style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
              >
                 Luyện tập Phiên Mới
              </button>
           </div>
        </div>
     );
  }

  return null;
}

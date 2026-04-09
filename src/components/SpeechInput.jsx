import { useState, useRef } from 'react';

export default function SpeechInput({ onAppend }) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn không hỗ trợ Web Speech API. Vui lòng sử dụng Chrome hoặc Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false; // we only want final results
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      // Trả kết quả về
      onAppend(speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <button 
      type="button" 
      onClick={toggleRecording}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: isRecording ? '#EF4444' : 'rgba(255,255,255,0.2)',
        backgroundColor: isRecording ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
        color: isRecording ? '#FCA5A5' : '#E5E7EB',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
    >
      <span className={isRecording ? 'animate-pulse' : ''} style={{ fontSize: '1.2rem' }}>
        {isRecording ? '🔴' : '🎤'}
      </span>
      {isRecording ? 'Đang nghe...' : 'Nói để nhập'}
    </button>
  );
}

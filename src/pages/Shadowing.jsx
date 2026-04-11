import { useState, useEffect, useRef, useCallback } from 'react';
import ShadowingPlayer from '../components/ShadowingPlayer';

export default function Shadowing() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [autoPause, setAutoPause] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [autoPlayRecord, setAutoPlayRecord] = useState(true);
  
  // User defined segments
  const [segments, setSegments] = useState([]);
  const [repCounts, setRepCounts] = useState({});
  const [recordCounts, setRecordCounts] = useState({});
  const [recordUrls, setRecordUrls] = useState({});
  
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  const playerRef = useRef(null);

  // Load data from LocalStorage
  useEffect(() => {
    if (videoId) {
      const savedSegments = localStorage.getItem(`segments_${videoId}`);
      if (savedSegments) {
        try {
          setSegments(JSON.parse(savedSegments));
        } catch (e) {
          console.error("Failed to parse segments from storage", e);
          setSegments([]);
        }
      } else {
        setSegments([]);
      }
      
      const savedReps = localStorage.getItem(`reps_${videoId}`);
      if (savedReps) {
        try {
          setRepCounts(JSON.parse(savedReps));
        } catch (e) {
          setRepCounts({});
        }
      } else {
        setRepCounts({});
      }

      const savedRecords = localStorage.getItem(`records_${videoId}`);
      if (savedRecords) {
        try {
          setRecordCounts(JSON.parse(savedRecords));
        } catch (e) {
          setRecordCounts({});
        }
      } else {
        setRecordCounts({});
      }

      setRecordUrls({});
      setActiveIndex(-1);
    }
  }, [videoId]);

  // Persist segments
  useEffect(() => {
    if (videoId && segments.length > 0) {
      localStorage.setItem(`segments_${videoId}`, JSON.stringify(segments));
    }
  }, [segments, videoId]);

  const extractVideoId = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleStart = () => {
    const id = extractVideoId(videoUrl);
    if (id) {
      // Reset all state BEFORE changing videoId to prevent persist effect
      // from writing old segments under the new video's key
      setSegments([]);
      setRepCounts({});
      setRecordCounts({});
      setRecordUrls({});
      setActiveIndex(-1);
      setVideoId(id);
    } else {
      alert('Vui lòng nhập URL YouTube hợp lệ!');
    }
  };

  const addSegment = () => {
    const start = Math.floor(currentTime);
    const end = start + 5;
    const newSegment = {
      id: Date.now(),
      start,
      end,
      text: '' 
    };
    const updated = [...segments, newSegment].sort((a, b) => a.start - b.start);
    setSegments(updated);
  };

  const addSegmentAt = (startTime) => {
    const start = startTime;
    const end = start + 5;
    const newSegment = {
      id: Date.now(),
      start,
      end,
      text: '' 
    };
    const updated = [...segments, newSegment].sort((a, b) => a.start - b.start);
    setSegments(updated);
  };

  const updateSegment = (id, field, value) => {
    setSegments(segments.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteSegment = (id) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  const handleTimeUpdate = useCallback((time) => {
    setCurrentTime(time);
    
    // Find active segment
    const index = segments.findIndex(s => time >= s.start && time < s.end);
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
    }

    if (activeIndex !== -1) {
      const segment = segments[activeIndex];
      
      if (autoPause && time >= segment.end && !isLooping) {
        playerRef.current?.pauseVideo();
      }
      
      if (isLooping && time >= segment.end) {
        playerRef.current?.seekTo(segment.start);
      }
    }
  }, [activeIndex, autoPause, isLooping, segments]);

  const seekToSegment = (index) => {
    if (index < 0 || index >= segments.length) return;
    setActiveIndex(index);
    const s = segments[index];
    if (s) {
      playerRef.current?.seekTo(s.start);
      playerRef.current?.playVideo();
    }
  };

  // Recording Logic
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (activeIndex !== -1) {
          const segId = segments[activeIndex].id;
          
          // Store the URL for playback
          setRecordUrls(prev => ({ ...prev, [segId]: audioUrl }));
          
          // Auto-play if enabled
          if (autoPlayRecord) {
             const audio = new Audio(audioUrl);
             audio.play();
          }

          // Increment record count
          const newRecCounts = { ...recordCounts, [segId]: (recordCounts[segId] || 0) + 1 };
          setRecordCounts(newRecCounts);
          localStorage.setItem(`records_${videoId}`, JSON.stringify(newRecCounts));
        }
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Không thể truy cập Microphone!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = (id) => {
    const url = recordUrls[id];
    if (url) {
      const audio = new Audio(url);
      audio.play();
    }
  };

  // Hotkeys Implementation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space: Handle separately as a standalone key
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const state = playerRef.current?.getPlayerState();
        if (state === 1) playerRef.current?.pauseVideo();
        else playerRef.current?.playVideo();
        return;
      }

      // Cmd (Mac) or Ctrl (Win/Linux) for other shortcuts
      if (!e.metaKey && !e.ctrlKey) return;

      const key = e.key.toLowerCase();
      const targetKeys = ['r', 's'];

      if (targetKeys.includes(key)) {
        e.preventDefault();

        switch (key) {
          case 'r':
            if (isRecording) stopRecording();
            else startRecording();
            break;
          case 's':
            // Smart Logic for 'S': Skip or Add New
            if (activeIndex < segments.length - 1) {
              seekToSegment(activeIndex + 1);
            } else {
              // At the end -> Add new segment starting EXACTLY where the last one ended
              const lastEnd = segments.length > 0 ? segments[segments.length - 1].end : Math.floor(currentTime);
              addSegmentAt(lastEnd);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isRecording, activeIndex, segments, currentTime, videoId]);

  return (
    <div className="page-enter-active" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>
      {!videoId ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', marginTop: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Shadowing <span style={{ color: '#10B981' }}>Studio</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>
            Nhập link video và tự tạo lộ trình luyện nghe/nói của riêng bạn.
          </p>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Dán link YouTube tại đây..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}
            />
            <button className="btn-primary" onClick={handleStart} style={{ padding: '1rem 2rem' }}> Bắt đầu </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr', gap: '2rem', height: 'calc(100vh - 180px)' }}>
          
          {/* LEFT: Player & Controls */}
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ShadowingPlayer ref={playerRef} videoId={videoId} onTimeUpdate={handleTimeUpdate} />
            
            <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button className="btn-secondary" onClick={() => setVideoId(null)}>← Đổi video</button>
                  <button className="btn-primary" onClick={addSegment} style={{ background: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ➕ Thêm đoạn 5s (từ {currentTime.toFixed(0)}s)
                  </button>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <input type="checkbox" id="auto-pause" checked={autoPause} onChange={(e) => setAutoPause(e.target.checked)}/>
                     <label htmlFor="auto-pause" style={{ fontSize: '0.8rem' }}>Tự dừng sau mỗi câu</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <input type="checkbox" id="loop" checked={isLooping} onChange={(e) => setIsLooping(e.target.checked)}/>
                     <label htmlFor="loop" style={{ fontSize: '0.8rem' }}>Lặp lại câu</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <input type="checkbox" id="auto-play-record" checked={autoPlayRecord} onChange={(e) => setAutoPlayRecord(e.target.checked)}/>
                     <label htmlFor="auto-play-record" style={{ fontSize: '0.8rem' }}>Tự phát lại bản ghi</label>
                  </div>
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    style={{ 
                      padding: '0.6rem', 
                      borderRadius: '8px', 
                      background: isRecording ? '#EF4444' : '#4F46E5', 
                      color: 'white', 
                      fontWeight: 'bold',
                      border: 'none',
                      boxShadow: isRecording ? '0 0 15px rgba(239, 68, 68, 0.4)' : 'none'
                    }}
                  >
                    {isRecording ? '⏹ Dừng ghi âm' : '⏺ Ghi âm (Record)'}
                  </button>
               </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                   Mẹo: Hãy nghe kỹ và gõ lại nội dung vào các khung bên phải để luyện nghe.
                </p>
            </div>
          </div>

          {/* RIGHT: Dynamic Transcript Builder */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
             <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Nội dung bạn nghe được</h3>
                <span style={{ fontSize: '0.8rem', color: '#10B981' }}>{segments.length} đoạn đã tạo</span>
             </div>
             
             <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }} className="custom-scrollbar">
                {segments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'rgba(255,255,255,0.3)' }}>
                    <p>Chưa có đoạn nào. Nhấn "Thêm đoạn 5s" để bắt đầu luyện tập.</p>
                  </div>
                ) : (
                  segments.map((s, index) => (
                    <SegmentItem 
                      key={s.id}
                      segment={s}
                      index={index}
                      isActive={activeIndex === index}
                      recordCount={recordCounts[s.id] || 0}
                      recordUrl={recordUrls[s.id]}
                      onUpdate={updateSegment}
                      onDelete={deleteSegment}
                      onSeek={() => seekToSegment(index)}
                      onPlay={() => playRecording(s.id)}
                    />
                  ))
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for better performance and local state
function SegmentItem({ segment, index, isActive, recordCount, recordUrl, onUpdate, onDelete, onSeek, onPlay }) {
  const [localText, setLocalText] = useState(segment.text);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync if parent changes (e.g. from Storage)
  useEffect(() => {
    setLocalText(segment.text);
  }, [segment.text]);

  const handleSubmit = () => {
    onUpdate(segment.id, 'text', localText);
    setIsSubmitted(true);
    onSeek(); // Move video to start of this segment
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  return (
    <div 
      id={`sentence-${index}`}
      style={{
        padding: '1.2rem',
        borderRadius: '16px',
        marginBottom: '1rem',
        background: isActive ? 'rgba(79, 70, 229, 0.15)' : 'rgba(255,255,255,0.02)',
        border: isActive ? '1px solid #4F46E5' : '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
         <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={onSeek} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem' }}>Nghe lại</button>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
               {segment.start}s - {segment.end}s
            </span>
         </div>
         <button onClick={() => onDelete(segment.id)} style={{ color: '#EF4444', fontSize: '0.8rem', background: 'none', border: 'none' }}>Xóa</button>
      </div>

      <textarea 
        placeholder="Hãy nghe và gõ nội dung vào đây..."
        value={localText}
        onChange={(e) => {
          setLocalText(e.target.value);
          setIsSubmitted(false);
        }}
        style={{
          width: '100%',
          minHeight: '80px',
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: 'white',
          padding: '0.8rem',
          fontSize: '0.95rem',
          resize: 'vertical',
          outline: 'none'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               🎙 Đã ghi âm: <b>{recordCount}</b> lần
               {recordUrl && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); onPlay(); }}
                   style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: 'none', padding: '0.1rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                 >
                   ▶ Nghe giọng mình
                 </button>
               )}
            </span>
            {isActive && (
              <span className="fade-in" style={{ color: '#4F46E5', fontWeight: 'bold' }}>● ĐANG LUYỆN TẬP</span>
            )}
         </div>
         <button 
           onClick={handleSubmit} 
           className="btn-primary" 
           style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', background: isSubmitted ? '#10B981' : '#4F46E5' }}
         >
           {isSubmitted ? '✓ Đã lưu & Quay lại' : 'Xác nhận & Tập câu này'}
         </button>
      </div>
    </div>
  );
}

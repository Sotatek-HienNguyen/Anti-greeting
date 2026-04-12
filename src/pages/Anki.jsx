import React, { useState, useEffect, useCallback } from 'react';
import { getAnkiQueue, getAnkiCard, saveAnkiState } from '../services/anki-storage';
import { calculateAnkiState } from '../services/anki-engine';
import AnkiFlashcard from '../components/AnkiFlashcard';
import AnkiQuickEditModal from '../components/AnkiQuickEditModal';


const AnkiPage = () => {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Stats
  const [stats] = useState({
    streak: 12,
    goal: '85%',
    mastered: 412
  });

  const loadQueue = useCallback(() => {
    const due = getAnkiQueue();
    setQueue(due);
    if (due.length === 0) setSessionComplete(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  useEffect(() => {
    if (queue.length > 0 && currentIndex < queue.length) {
      setCard(getAnkiCard(queue[currentIndex]));
      setIsFlipped(false);
    } else if (queue.length > 0 && currentIndex >= queue.length) {
      setSessionComplete(true);
    }
  }, [queue, currentIndex]);

  const handleFlip = useCallback(() => setIsFlipped(true), []);

  const handleRate = useCallback((grade) => {
    if (!card) return;
    const nextState = calculateAnkiState(card.ankiState || {}, grade);
    saveAnkiState(card.word, nextState);
    
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSessionComplete(true);
    }
  }, [card, currentIndex, queue]);

  const handleUpdate = () => {
    setCard(getAnkiCard(queue[currentIndex]));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (isModalOpen || sessionComplete) return;
      if (e.code === 'Space') { e.preventDefault(); if (!isFlipped) handleFlip(); }
      if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code) && isFlipped) {
        handleRate(parseInt(e.code.replace('Digit', '')));
      }
      if (e.key.toLowerCase() === 'e') { e.preventDefault(); setIsModalOpen(true); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFlipped, isModalOpen, sessionComplete, handleFlip, handleRate]);

  const containerRef = React.useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        if (containerRef.current) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
  };

  if (loading) return null; // Let the higher level handle or show a full-page spinner

  if (sessionComplete) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-10 font-inter relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-16 shadow-xl border border-outline-variant/10 text-center relative z-10 max-w-lg w-full">
          <span className="material-symbols-outlined text-6xl text-tertiary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4">Session Clear!</h2>
          <p className="text-on-surface-variant mb-10 text-lg">You've reached your daily goal. Your memory has been refreshed.</p>
          <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2" onClick={() => window.location.href = '/'}>
            <span>Exit Session</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background text-on-surface min-h-screen flex flex-col font-inter relative">
      {/* Fullscreen Toggle Button */}
      <button 
          onClick={toggleFullscreen}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 rounded-xl shadow-sm hover:bg-surface-container hover:text-primary transition-colors group"
          title="Toggle Fullscreen"
      >
          <span className="material-symbols-outlined text-[1.3rem] group-hover:scale-110 transition-transform">
            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
          </span>
      </button>

      {/* Main Workspace */}
      <main className="flex-grow flex items-center justify-center px-6 pt-4 pb-12 relative overflow-hidden mt-8">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="w-full max-w-6xl grid grid-cols-12 gap-12 items-start relative z-10 pt-4">
          {/* Left Sidebar */}
          <div className="col-span-2 space-y-12 py-8">
              <div className="space-y-1">
                  <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-medium">Session</span>
                  <div className="h-0.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((currentIndex) / queue.length) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[0.65rem] font-bold text-on-surface-variant">
                      <span>{currentIndex + 1}/{queue.length}</span>
                      <span>{Math.round(((currentIndex) / queue.length) * 100)}%</span>
                  </div>
              </div>
              <div className="space-y-6">
                  <div className="group flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-on-surface-variant hover:text-tertiary-fixed-variant transition-colors">
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                          <span className="text-[0.65rem] uppercase tracking-widest font-bold">Streak</span>
                      </div>
                      <p className="text-2xl font-bold text-on-surface">{stats.streak} Days</p>
                  </div>
                  <div className="group flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                          <span className="text-[0.65rem] uppercase tracking-widest font-bold">Goal</span>
                      </div>
                      <p className="text-2xl font-bold text-on-surface">{stats.goal}</p>
                  </div>
                  <div className="group flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">menu_book</span>
                          <span className="text-[0.65rem] uppercase tracking-widest font-bold">Mastered</span>
                      </div>
                      <p className="text-2xl font-bold text-on-surface">{stats.mastered}</p>
                  </div>
              </div>
          </div>

          {/* Center Content */}
          <div className="col-span-8 flex flex-col items-center">
            {card && <AnkiFlashcard cardData={card} isFlipped={isFlipped} />}
            
            <div className="mt-8 w-full max-w-lg">
              {!isFlipped ? (
                <>
                  <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3 group" onClick={handleFlip}>
                      <span>Show Answer</span>
                      <span className="text-[0.6rem] px-1.5 py-0.5 rounded bg-on-primary/20 text-on-primary border border-on-primary/20 font-bold tracking-widest opacity-80 group-hover:opacity-100 transition-opacity uppercase">Space</span>
                  </button>
                  <p className="text-center text-[0.65rem] text-on-surface-variant font-medium tracking-widest mt-4 opacity-70">
                      SESSION PROGRESS: {currentIndex + 1} OF {queue.length}
                  </p>
                </>
              ) : (
                <div className="grid grid-cols-4 gap-4 w-full">
                  <button className="py-4 rounded-xl flex flex-col items-center justify-center gap-2 bg-surface-container hover:bg-error-container hover:shadow-sm hover:-translate-y-0.5 hover:text-on-error-container text-on-surface-variant transition-all duration-200 group" onClick={() => handleRate(1)}>
                    <span className="font-bold text-sm">Again</span>
                    <span className="text-[0.6rem] px-2 py-0.5 rounded-md bg-on-surface/10 group-hover:bg-error/20 font-bold group-hover:text-error">1</span>
                  </button>
                  <button className="py-4 rounded-xl flex flex-col items-center justify-center gap-2 bg-surface-container hover:bg-surface-variant hover:shadow-sm hover:-translate-y-0.5 text-on-surface-variant transition-all duration-200 group" onClick={() => handleRate(2)}>
                    <span className="font-bold text-sm">Hard</span>
                    <span className="text-[0.6rem] px-2 py-0.5 rounded-md bg-on-surface/10 group-hover:bg-on-surface/20 font-bold">2</span>
                  </button>
                  <button className="py-4 rounded-xl flex flex-col items-center justify-center gap-2 bg-surface-container hover:bg-tertiary-container hover:shadow-sm hover:-translate-y-0.5 hover:text-on-tertiary-container text-on-surface-variant transition-all duration-200 group" onClick={() => handleRate(3)}>
                    <span className="font-bold text-sm">Good</span>
                    <span className="text-[0.6rem] px-2 py-0.5 rounded-md bg-on-surface/10 group-hover:bg-tertiary/20 font-bold group-hover:text-tertiary">3</span>
                  </button>
                  <button className="py-4 rounded-xl flex flex-col items-center justify-center gap-2 bg-surface-container border border-primary/10 hover:bg-primary-container hover:shadow-sm hover:-translate-y-0.5 hover:text-on-primary-container text-on-surface-variant transition-all duration-200 group" onClick={() => handleRate(4)}>
                    <span className="font-bold text-sm">Easy</span>
                    <span className="text-[0.6rem] px-2 py-0.5 rounded-md bg-on-surface/10 group-hover:bg-primary/20 font-bold group-hover:text-primary">4</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-2 py-8 flex flex-col gap-8 h-full">
              <div className="space-y-3">
                  <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">Analysis</span>
                  <div className="space-y-4">
                      <div>
                          <p className="text-[0.65rem] text-on-surface-variant uppercase mb-0.5">Stability</p>
                          <p className="text-sm font-bold text-on-surface">{card?.ankiState?.efactor ? `${Math.round(card.ankiState.efactor * 40)}%` : 'Learning'}</p>
                      </div>
                      <div>
                          <p className="text-[0.65rem] text-on-surface-variant uppercase mb-0.5">Next Review</p>
                          <p className="text-sm font-bold text-on-surface">{card?.ankiState?.interval || 'Tomorrow'} <span className="text-xs font-normal text-on-surface-variant">days</span></p>
                      </div>
                      <div>
                          <p className="text-[0.65rem] text-on-surface-variant uppercase mb-0.5">Deck</p>
                          <p className="text-sm font-bold text-primary">Core Vocab</p>
                      </div>
                  </div>
              </div>
              <div className="space-y-3">
                  <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                      <span className="text-[0.65rem] px-2 py-0.5 bg-surface-container rounded-md font-medium text-on-surface-variant">Active</span>
                      <span className="text-[0.65rem] px-2 py-0.5 bg-surface-container rounded-md font-medium text-on-surface-variant">A1-C2</span>
                  </div>
              </div>
              
              <div className="mt-auto self-end w-full">
                  <button onClick={() => setIsModalOpen(true)} className="w-full py-3 px-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm text-center flex items-center justify-center gap-2 group">
                      <span className="material-symbols-outlined text-sm text-primary group-hover:scale-110 transition-transform">edit</span>
                      <span className="text-[0.65rem] font-bold text-on-surface-variant group-hover:text-primary tracking-widest uppercase flex items-center gap-1">
                          Fix Entry <kbd className="hidden lg:inline-block ml-1 font-sans text-[0.55rem] bg-surface-container px-1.5 py-0.5 border border-outline-variant/30 rounded text-on-surface">E</kbd>
                      </span>
                  </button>
              </div>
          </div>
        </div>
      </main>

      {/* Micro Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-surface-container pointer-events-none z-50">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((currentIndex) / queue.length) * 100}%` }}></div>
      </div>

      <AnkiQuickEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        card={card} 
        onUpdate={handleUpdate} 
      />
    </div>
  );
};

export default AnkiPage;

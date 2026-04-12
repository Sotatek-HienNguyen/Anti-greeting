import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function VideoContext({ word, onClose }) {
  useEffect(() => {
    let widget;
    
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    const initWidget = () => {
      const container = document.getElementById("yg-widget-1");
      if (!container) return;
      
      if (window.YG && window.YG.Widget) {
         container.innerHTML = '';
         
         widget = new window.YG.Widget("yg-widget-1", {
            width: 800,
            events: {
              'onFetchDone': (e) => console.log('YouGlish fetch done', e),
              'onError': (e) => console.error('YouGlish error', e),
            }
         });
         
         widget.fetch(word, 'english', 'us');
      }
    };

    window.onYouglishAPIReady = initWidget;

    const existingScript = document.getElementById('youglish-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://youglish.com/public/emb/widget.js";
      script.id = "youglish-script";
      script.async = true;
      document.body.appendChild(script);
    } else {
      if (window.YG && window.YG.Widget) {
        initWidget();
      } else {
        setTimeout(initWidget, 1000);
      }
    }

    return () => {
       const container = document.getElementById("yg-widget-1");
       if (container) container.innerHTML = '';
       window.onYouglishAPIReady = null;
       document.body.style.overflow = 'auto'; // Restore scroll
    };
  }, [word]);

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-none px-6 py-4 flex items-center justify-between bg-surface-container-lowest z-10 relative">
            <h3 className="text-xl font-extrabold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                Real-World Context: <span className="text-primary italic ml-1">"{word}"</span>
            </h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">close</span>
            </button>
        </div>
        
        {/* Body */}
        <div className="flex-grow p-6 bg-surface-container-lowest overflow-y-auto custom-scrollbar">
            <div className="w-full min-h-[600px] bg-surface rounded-xl shadow-inner border border-outline-variant/10">
                <div id="yg-widget-1" className="w-full h-full"></div>
            </div>
            
            <div className="text-center mt-4">
                <p className="text-[0.7rem] text-on-surface-variant tracking-wider uppercase font-medium">
                    Powered by YouGlish. Use the player controls to navigate clips.
                </p>
            </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

import { useEffect } from 'react';

export default function VideoContext({ word, onClose }) {
  useEffect(() => {
    let widget;
    
    const initWidget = () => {
      const container = document.getElementById("yg-widget-1");
      if (!container) return; // Ensure DOM exists
      
      if (window.YG && window.YG.Widget) {
         // Reset the container HTML just in case 
         container.innerHTML = '';
         
         widget = new window.YG.Widget("yg-widget-1", {
            width: 800,
            events: {
              'onFetchDone': (e) => console.log('YouGlish fetch done', e),
              'onError': (e) => console.error('YouGlish error', e),
            }
         });
         
         // Fetch the video snippet 
         widget.fetch(word, 'english', 'us');
      }
    };

    // Callback that YouGlish script calls when it is ready
    window.onYouglishAPIReady = initWidget;

    const existingScript = document.getElementById('youglish-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://youglish.com/public/emb/widget.js";
      script.id = "youglish-script";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script exists, YG might already be ready
      if (window.YG && window.YG.Widget) {
        initWidget();
      } else {
        setTimeout(initWidget, 1000);
      }
    }

    // Cleanup
    return () => {
       const container = document.getElementById("yg-widget-1");
       if (container) container.innerHTML = '';
       window.onYouglishAPIReady = null;
    };
  }, [word]);

  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, backgroundColor: 'rgba(15, 23, 42, 0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', animation: 'fadeIn 0.3s ease' }}
      onClick={onClose}
    >
       <div 
         className="glass-card" 
         style={{ position: 'relative', width: '100%', maxWidth: '800px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', paddingLeft: '3rem' }}
         onClick={(e) => e.stopPropagation()}
       >
          <button 
             className="btn-secondary" 
             onClick={onClose} 
             title="Đóng popup"
             style={{ 
               position: 'absolute', 
               left: '-20px', 
               top: '50%', 
               transform: 'translateY(-50%)',
               width: '48px',
               height: '48px',
               borderRadius: '50%',
               padding: 0,
               borderColor: 'transparent', 
               backgroundColor: '#EF4444', 
               color: 'white',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               fontSize: '1.2rem',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
               cursor: 'pointer',
               zIndex: 20
             }}
          >
             ✕
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h3 style={{ fontSize: '1.5rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span role="img" aria-label="video">🎬</span> Ngữ cảnh từ: "{word}"
             </h3>
          </div>
          
          <div style={{ minHeight: '300px', width: '100%', backgroundColor: 'black', borderRadius: '12px', overflow: 'hidden' }}>
             <div id="yg-widget-1" style={{ width: '100%', height: '100%' }}></div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            Nền tảng nhúng bởi YouGlish. Bạn có thể nhấn nút "Next" trên trình phát để sang câu khác.
          </div>
       </div>
    </div>
  );
}

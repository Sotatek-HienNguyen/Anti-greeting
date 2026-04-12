import React, { useState, useEffect } from 'react';
import VideoContext from './VideoContext';

const AnkiFlashcard = ({ cardData, isFlipped }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchDict = async () => {
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cardData.word)}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        
        if (isMounted && json && json.length > 0) {
          const entry = json[0];
          let phonetic = '';
          let audioUrl = '';
          
          if (entry.phonetics) {
            const pText = entry.phonetics.find(p => p.text);
            phonetic = pText ? pText.text : entry.phonetic || '';
            const usPhonetic = entry.phonetics.find(p => (p.audio && p.audio.includes('-us.mp3')) || (p.audio && p.audio.includes('us')));
            audioUrl = usPhonetic ? usPhonetic.audio : (entry.phonetics.find(p => p.audio)?.audio || '');
          }

          let partOfSpeech = '';
          let definition = '';
          let example = '';

          if (entry.meanings && entry.meanings.length > 0) {
            partOfSpeech = entry.meanings[0].partOfSpeech || '';
            const defObj = entry.meanings[0].definitions?.[0];
            definition = defObj?.definition || '';
            example = defObj?.example || '';
          }

          setData({
            word: entry.word,
            phonetic,
            partOfSpeech,
            definition: cardData.overrides.definition || definition,
            example: cardData.overrides.examples?.[0] || example,
            audio: audioUrl,
          });
        }
      } catch (err) {
        if (isMounted) {
          setData({
            word: cardData.word,
            phonetic: '',
            partOfSpeech: 'unknown',
            definition: cardData.overrides.definition || 'No definition found.',
            example: cardData.overrides.examples?.[0] || '',
            audio: '',
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDict();
    return () => { isMounted = false; };
  }, [cardData.word]);

    useEffect(() => {
      const handleKey = (e) => {
        // Don't trigger if user is typing in an input/textarea
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        
        if (e.key.toLowerCase() === 'r' && data?.audio) {
          e.preventDefault();
          new Audio(data.audio).play();
        }
      };
      
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }, [data?.audio]);

    const playAudio = () => {
      if (data?.audio) new Audio(data.audio).play();
    };

    // SKELETON LOADER
    const CardSkeleton = () => (
      <div className="w-full h-full bg-surface-container-lowest rounded-xl p-16 shadow-[0_20px_40px_rgba(42,52,57,0.06)] border border-outline-variant/10">
        <div className="max-w-2xl mx-auto animate-pulse">
          <div className="flex justify-between items-start mb-8">
             <div className="space-y-4">
                 <div className="h-12 w-64 bg-surface-container rounded-md"></div>
                 <div className="h-4 w-32 bg-surface-container rounded-md"></div>
             </div>
             <div className="w-10 h-10 bg-surface-container rounded-lg"></div>
          </div>
          <div className="w-full aspect-[16/7] rounded-xl bg-surface-container mb-10"></div>
          <div className="h-4 w-full bg-surface-container rounded-md mb-2"></div>
          <div className="h-4 w-5/6 bg-surface-container rounded-md mb-12"></div>
        </div>
      </div>
    );

    return (
      <div className={`relative w-full max-w-2xl mx-auto min-h-[600px] perspective-[2000px] ${isFlipped ? '' : ''}`}>
        <div 
          className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] absolute inset-0"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {isVideoOpen && <VideoContext word={data?.word || cardData.word} onClose={() => setIsVideoOpen(false)} />}
          
          {loading ? (
            <CardSkeleton />
          ) : (
            <>
              {/* FRONT FACE */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-surface-container-lowest rounded-2xl p-12 lg:p-16 shadow-[0_20px_40px_rgba(42,52,57,0.06)] border border-outline-variant/10 overflow-hidden flex flex-col">
                  {/* Header Section with Audio */}
                  <div className="flex justify-between items-start mb-8">
                      <div className="space-y-2">
                          <h1 className="text-[3.5rem] font-extrabold tracking-tighter text-on-surface leading-none">{data.word}</h1>
                          <div className="flex items-center gap-4">
                              <p className="text-sm font-medium text-on-surface-variant italic">/{data.phonetic.replace(/\//g, '')}/</p>
                              <span className="h-1 w-1 bg-outline-variant rounded-full"></span>
                              <span className="text-[0.65rem] px-2 py-0.5 bg-primary-container text-primary rounded-md font-bold uppercase tracking-wider">{data.partOfSpeech}</span>
                          </div>
                      </div>
                      {data.audio && (
                          <div className="flex flex-col items-center gap-1">
                              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-primary hover:bg-primary-container transition-colors relative group" onClick={playAudio}>
                                  <span className="material-symbols-outlined text-xl">volume_up</span>
                              </button>
                              <span className="text-[0.55rem] font-bold text-outline-variant uppercase tracking-widest hidden lg:block">Press 'R'</span>
                          </div>
                      )}
                  </div>

                {/* Image Representation */}
                <div className="mb-10 w-full aspect-[16/7] rounded-xl overflow-hidden bg-surface-container border border-outline-variant/10 flex items-center justify-center">
                    {cardData.overrides.image ? (
                        <img className="w-full h-full object-cover shadow-inner" src={cardData.overrides.image} alt={data.word} />
                    ) : (
                        <div className="text-xs text-on-surface-variant italic opacity-60">No visual anchor recorded.</div>
                    )}
                </div>

                {/* Definition */}
                <div className="mb-8 flex-grow">
                    <p className="text-xl font-medium text-on-surface leading-relaxed border-l-4 border-primary/20 pl-4">
                        {data.definition}
                    </p>
                </div>

                {/* Secondary Info Grid */}
                <div className="grid grid-cols-2 gap-12 border-t border-outline-variant/10 pt-8 mt-auto">
                    <div className="space-y-4">
                        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Collocations</span>
                        <ul className="space-y-2 text-sm">
                            {(cardData.overrides.collocations || []).length > 0 ? (
                                cardData.overrides.collocations.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/60"></span> <span className="text-on-surface font-medium">{item}</span></li>
                                ))
                            ) : (
                                <li className="text-xs text-outline-variant italic">Empty</li>
                            )}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Word Family</span>
                        <div className="space-y-2 text-sm border-l-2 border-outline-variant/10 pl-4">
                            {(cardData.overrides.wordFamily || []).length > 0 ? (
                                cardData.overrides.wordFamily.map((item, i) => (
                                    <p key={i} className="text-on-surface font-medium">{item}</p>
                                ))
                            ) : (
                                <p className="text-xs text-outline-variant italic">Empty</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* BACK FACE */}
            <div 
              className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-surface-container-lowest rounded-2xl p-12 lg:p-16 shadow-[0_20px_40px_rgba(20,50,70,0.08)] border border-outline-variant/10 flex flex-col"
              style={{ transform: 'rotateY(180deg)' }}
            >
                <div>
                    {/* Header Section with Audio (Repeated for Back Face) */}
                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-outline-variant/10">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight text-on-surface">{data.word}</h1>
                            <div className="flex items-center gap-3">
                                <p className="text-xs font-medium text-on-surface-variant italic">/{data.phonetic.replace(/\//g, '')}/</p>
                                <span className="h-1 w-1 bg-outline-variant rounded-full"></span>
                                <span className="text-[0.6rem] px-2 py-0.5 bg-primary-container text-primary rounded-md font-bold uppercase tracking-wider">{data.partOfSpeech}</span>
                            </div>
                        </div>
                        {data.audio && (
                            <div className="flex flex-col items-center gap-1">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-primary hover:bg-primary-container transition-colors relative group" onClick={playAudio} title="Press 'R' to play">
                                    <span className="material-symbols-outlined text-lg">volume_up</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-8 text-center text-primary-dark">
                        <h2 className="text-lg font-medium text-on-surface-variant mb-3">
                            {cardData.overrides.definition || "Chưa dịch nghĩa"}
                        </h2>
                        {cardData.overrides.definitionNote && (
                            <p className="text-sm text-on-surface-variant italic font-medium max-w-lg mx-auto bg-surface py-2 px-4 rounded-lg">
                                {cardData.overrides.definitionNote}
                            </p>
                        )}
                    </div>

                    {/* Contextual Usage */}
                    <div className="mb-10 bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 relative shadow-sm">
                        <span className="absolute -top-3 left-6 px-2 bg-surface-container-lowest text-[0.6rem] uppercase tracking-widest font-bold text-primary">Contextual Snippets</span>
                        <ul className="space-y-4">
                           {cardData.overrides.examples?.length > 0 ? (
                               cardData.overrides.examples.map((ex, i) => (
                                   <li key={i} className="text-xl text-on-surface font-semibold leading-relaxed border-l-4 border-primary pl-4 py-1">{ex}</li>
                               ))
                           ) : (
                               <li className="text-xl text-on-surface font-semibold leading-relaxed border-l-4 border-primary pl-4 py-1">{data.example || "No usage snippet available."}</li>
                           )}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-1.5"><span className="material-symbols-outlined text-[1rem]">join_inner</span> Synonyms</h4>
                            <div className="flex flex-wrap gap-2">
                                {(cardData.overrides.synonyms || []).length > 0 ? (
                                    cardData.overrides.synonyms.map((s, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-surface border border-outline-variant/20 rounded-md text-xs font-semibold text-on-surface-variant hover:border-primary/40 hover:text-primary transition-colors cursor-default">
                                            {s}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-outline-variant italic">None</span>
                                )}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-1.5"><span className="material-symbols-outlined text-[1rem]">lightbulb</span> Nuance Note</h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                {cardData.overrides.nuance || "Tư duy phân biệt chưa được ghi lại."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-auto cursor-pointer group" onClick={() => setIsVideoOpen(true)}>
                    <div className="flex items-center gap-2 text-primary group-hover:text-tertiary transition-colors bg-primary/5 py-2 px-4 rounded-full group-hover:bg-tertiary/10">
                        <span className="material-symbols-outlined">play_circle</span>
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest">Fetch Real-World Usage (YouGlish)</span>
                    </div>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnkiFlashcard;

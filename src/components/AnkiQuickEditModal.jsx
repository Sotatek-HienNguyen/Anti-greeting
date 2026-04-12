import React, { useState, useEffect } from 'react';
import { saveAnkiOverride } from '../services/anki-storage';

const AnkiQuickEditModal = ({ isOpen, onClose, card, onUpdate }) => {
  const [form, setForm] = useState({
    image: '',
    definition: '',
    definitionNote: '',
    examples: '',
    synonyms: '',
    collocations: '',
    wordFamily: '',
    nuance: ''
  });

  useEffect(() => {
    if (card) {
      setForm({
        image: card.overrides?.image || '',
        definition: card.overrides?.definition || '',
        definitionNote: card.overrides?.definitionNote || '',
        examples: card.overrides?.examples?.join('\n') || '',
        synonyms: card.overrides?.synonyms?.join(', ') || '',
        collocations: card.overrides?.collocations?.join('\n') || '',
        wordFamily: card.overrides?.wordFamily?.join('\n') || '',
        nuance: card.overrides?.nuance || ''
      });
    }
  }, [card?.word, isOpen]);

  if (!isOpen || !card) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const patches = {
      image: form.image.trim(),
      definition: form.definition.trim(),
      definitionNote: form.definitionNote.trim(),
      examples: form.examples.split('\n').filter(line => line.trim() !== ''),
      synonyms: form.synonyms.split(',').map(s => s.trim()).filter(s => s !== ''),
      collocations: form.collocations.split('\n').filter(line => line.trim() !== ''),
      wordFamily: form.wordFamily.split('\n').filter(line => line.trim() !== ''),
      nuance: form.nuance.trim()
    };
    saveAnkiOverride(card.word, patches);
    onUpdate();
    onClose();
  };

  const inputClass = "w-full p-3 bg-surface text-on-surface rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow text-sm resize-none";
  const labelClass = "block text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[800px] animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-none px-8 py-5 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-lowest z-10 relative">
            <div>
                <h2 className="text-xl font-extrabold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">edit_document</span>
                    Refine Entry: <span className="text-primary ml-1">{card.word}</span>
                </h2>
                <p className="text-xs text-on-surface-variant mt-1 font-medium">Update semantic anchors, contextual usage, and custom definitions.</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">close</span>
            </button>
        </div>
        
        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-sm">visibility</span>
                            <h3 className="text-sm font-bold text-on-surface">Visual Anchor</h3>
                        </div>
                        <div>
                            <label className={labelClass}>Image URL</label>
                            <input name="image" type="text" value={form.image} onChange={handleChange} placeholder="https://..." className={inputClass} />
                        </div>
                    </div>

                    <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary text-sm">translate</span>
                            <h3 className="text-sm font-bold text-on-surface">Meaning</h3>
                        </div>
                        <div>
                            <label className={labelClass}>Nghĩa dịch (Vietnamese)</label>
                            <input name="definition" type="text" value={form.definition} onChange={handleChange} placeholder="Dịch nghĩa tiếng Việt..." className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Ghi chú ngữ nghĩa</label>
                            <input name="definitionNote" type="text" value={form.definitionNote} onChange={handleChange} placeholder="Ví dụ: Chỉ dùng trong văn phong học thuật..." className={inputClass} />
                        </div>
                    </div>
                    
                    <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                            <h3 className="text-sm font-bold text-on-surface">Nuance</h3>
                        </div>
                        <div>
                            <label className={labelClass}>Nuance Note (Phân biệt)</label>
                            <textarea name="nuance" value={form.nuance} onChange={handleChange} placeholder="Giải thích sự khác biệt so với các từ đồng nghĩa..." className={inputClass} rows={3} />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-sm">format_quote</span>
                            <h3 className="text-sm font-bold text-on-surface">Contextual Usage</h3>
                        </div>
                        <div>
                            <label className={labelClass}>Câu ví dụ (Mỗi câu 1 dòng)</label>
                            <textarea name="examples" value={form.examples} onChange={handleChange} placeholder="Ví dụ 1...&#10;Ví dụ 2..." className={inputClass} rows={4} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-sm">join_inner</span>
                                <h3 className="text-sm font-bold text-on-surface">Relations</h3>
                            </div>
                            <label className={labelClass}>Synonyms (Dấu phẩy)</label>
                            <textarea name="synonyms" value={form.synonyms} onChange={handleChange} placeholder="Fast, Quick..." className={inputClass} rows={2} />
                        </div>
                        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-sm">family_history</span>
                                <h3 className="text-sm font-bold text-on-surface">Derivative</h3>
                            </div>
                            <label className={labelClass}>Word Family (1 dòng/câu)</label>
                            <textarea name="wordFamily" value={form.wordFamily} onChange={handleChange} placeholder="Noun: Resilience..." className={inputClass} rows={2} />
                        </div>
                    </div>

                    <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-sm">link</span>
                            <h3 className="text-sm font-bold text-on-surface">Collocations</h3>
                        </div>
                        <div>
                            <label className={labelClass}>Common Usage Pairs (1 dòng/câu)</label>
                            <textarea name="collocations" value={form.collocations} onChange={handleChange} placeholder="Highly resilient...&#10;Resilient economy..." className={inputClass} rows={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="flex-none p-6 border-t border-outline-variant/10 bg-surface flex justify-end gap-3 z-10 relative">
            <button 
                onClick={onClose} 
                className="px-6 py-2.5 rounded-lg font-bold text-sm text-on-surface-variant hover:bg-outline-variant/20 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={handleSave} 
                className="px-8 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-sm shadow-md hover:shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-[1.1rem]">save</span>
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default AnkiQuickEditModal;

import React from 'react';
import { useLessonSettings } from '../store/lessonStore';
import { Volume2, BookX } from 'lucide-react';

interface Word {
    arabic: string;
    transliteration?: string;
    meaning: string;
    audioUrl?: string;
}

interface VocabularyTabProps {
    blocks: any[];
}

const stripHarakat = (text: string) => {
    return text.replace(/[\u064B-\u065F\u0670]/g, "");
};

export default function VocabularyTab({ blocks }: VocabularyTabProps) {
    const { showHarakat, showTranslation } = useLessonSettings();

    if (!blocks || blocks.length === 0) {
        return (
            <div className="text-center py-20 space-y-4 opacity-30">
                <BookX className="w-12 h-12 mx-auto" />
                <p className="text-xs font-bold uppercase tracking-widest text-stone-900">Tidak ada Mufradat<br />di materi ini</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            {blocks.map((block, bIdx) => (
                <div key={bIdx} className="space-y-4">
                    <h4 className="text-[10px] font-black text-royal-800 uppercase tracking-widest border-b border-royal-100 pb-2">
                        {block.title || 'Kosa Kata Terkait'}
                    </h4>
                    <div className="grid gap-3">
                        {block.words?.map((v: Word, vIdx: number) => (
                            <div key={vIdx} className="p-5 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-white hover:shadow-xl hover:border-royal-100 transition group">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="font-arabic text-3xl text-royal-950" dir="rtl">
                                        {showHarakat ? v.arabic : stripHarakat(v.arabic)}
                                    </span>
                                    {v.audioUrl && (
                                        <button
                                            onClick={() => new Audio(v.audioUrl!).play()}
                                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-royal-600 hover:border-royal-200 transition shadow-sm"
                                        >
                                            <Volume2 size={16} />
                                        </button>
                                    )}
                                </div>
                                {v.transliteration && (
                                    <p className="text-[9px] font-black text-royal-600 uppercase tracking-widest mb-1">
                                        {v.transliteration}
                                    </p>
                                )}
                                <div className={`transition-all duration-300 ${showTranslation ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                    <p className="text-sm text-stone-700 font-bold leading-tight">{v.meaning}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

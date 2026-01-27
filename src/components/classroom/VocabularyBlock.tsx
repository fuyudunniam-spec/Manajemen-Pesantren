'use client';

import { Volume2 } from 'lucide-react';

interface VocabWord {
    arabic: string;
    transliteration?: string;
    meaning: string;
    audioUrl?: string;
}

interface VocabularyBlockProps {
    title?: string;
    words: VocabWord[];
}

export function VocabularyBlock({ title = 'Kosa Kata Baru', words }: VocabularyBlockProps) {
    const playAudio = (url?: string) => {
        if (url) {
            const audio = new Audio(url);
            audio.play();
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-900 mb-6 flex items-center gap-2">
                📚 {title}
            </h3>

            <div className="grid gap-4">
                {words.map((word, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-xl border border-stone-100 hover:border-emerald-200 hover:shadow-md transition bg-white group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span
                                className="font-serif text-2xl text-emerald-900"
                                dir="rtl"
                            >
                                {word.arabic}
                            </span>
                            {word.audioUrl && (
                                <button
                                    onClick={() => playAudio(word.audioUrl)}
                                    className="p-2 rounded-full hover:bg-emerald-50 text-stone-300 hover:text-emerald-600 transition"
                                >
                                    <Volume2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {word.transliteration && (
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                                {word.transliteration}
                            </p>
                        )}

                        <p className="text-sm text-stone-700 font-medium">
                            {word.meaning}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VocabularyBlock;

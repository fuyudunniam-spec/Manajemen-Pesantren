import React from 'react';
import { useLessonSettings } from '../store/lessonStore';
import { Languages, Type } from 'lucide-react';

export default function LessonControls() {
    const { showHarakat, showTranslation, fontSize, setHarakat, setTranslation, setFontSize } = useLessonSettings();

    return (
        <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-md rounded-full p-1 border border-stone-200/50 shadow-sm px-2">
            {/* Font Size Group */}
            <div className="flex items-center">
                <button
                    onClick={() => setFontSize(Math.max(1, fontSize - 1))}
                    disabled={fontSize <= 1}
                    title="Perkecil Teks"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-royal-800 hover:bg-royal-50 disabled:opacity-20 transition-all active:scale-90"
                >
                    <Type size={14} strokeWidth={3} />
                    <span className="text-[10px] font-bold -ml-0.5 mt-1">-</span>
                </button>
                <div className="w-4 text-center">
                    <span className="text-[9px] font-black text-stone-300">{fontSize}</span>
                </div>
                <button
                    onClick={() => setFontSize(Math.min(3, fontSize + 1))}
                    disabled={fontSize >= 3}
                    title="Perbesar Teks"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-royal-800 hover:bg-royal-50 disabled:opacity-20 transition-all active:scale-90"
                >
                    <Type size={18} strokeWidth={2} />
                    <span className="text-[10px] font-bold -ml-0.5 mt-1">+</span>
                </button>
            </div>

            <div className="w-px h-4 bg-stone-200 mx-0.5"></div>

            {/* Harakat Toggle */}
            <button
                onClick={() => setHarakat(!showHarakat)}
                title={`Vokalisasi (Harakat): ${showHarakat ? 'Aktif' : 'Non-aktif'}`}
                className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center active:scale-90 ${showHarakat
                    ? 'bg-royal-100 text-royal-800 shadow-inner'
                    : 'bg-stone-50 text-stone-300'
                    }`}
            >
                <span className="font-arabic font-bold text-lg mt-0.5">َ</span>
            </button>

            {/* Translation Toggle */}
            <button
                onClick={() => setTranslation(!showTranslation)}
                title={`Terjemahan: ${showTranslation ? 'Aktif' : 'Non-aktif'}`}
                className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center active:scale-90 ${showTranslation
                    ? 'bg-royal-100 text-royal-800 shadow-inner'
                    : 'bg-stone-50 text-stone-300'
                    }`}
            >
                <Languages size={14} />
            </button>
        </div>
    );
}

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Type, Languages, AlertCircle } from 'lucide-react';

interface ArabicReaderProps {
    title?: string;
    arabicWithHarakat: string;
    arabicWithoutHarakat?: string;
    translation?: string;
    englishTranslation?: string;
    audioUrl?: string;
}

export default function ArabicReader({
    title,
    arabicWithHarakat,
    arabicWithoutHarakat,
    translation,
    englishTranslation,
    audioUrl
}: ArabicReaderProps) {
    const [showHarakat, setShowHarakat] = useState(true);
    const [showTranslation, setShowTranslation] = useState(true);
    const [fontSize, setFontSize] = useState(2); // 1: small, 2: medium, 3: large
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Font size classes mapping
    const fontSizes = {
        1: 'text-2xl leading-loose',
        2: 'text-3xl leading-loose',
        3: 'text-4xl leading-[2.5]'
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, []);

    // Function to strip harakat if arabicWithoutHarakat is not provided
    const stripHarakat = (text: string) => {
        return text.replace(/[\u064B-\u065F\u0670]/g, "");
    };

    const displayText = showHarakat
        ? arabicWithHarakat
        : (arabicWithoutHarakat || stripHarakat(arabicWithHarakat));

    return (
        <div className="my-10 bg-white rounded-[2.5rem] shadow-sm border border-stone-200 overflow-hidden font-sans group hover:shadow-md transition-shadow duration-300">
            {/* Header / Toolbar */}
            <div className="bg-stone-50 border-b border-stone-200 p-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <Type size={20} />
                    </div>
                    <h3 className="font-bold text-stone-700 text-sm uppercase tracking-wider">{title || 'Qiraah / Reading'}</h3>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-stone-200 shadow-sm">
                    {/* Size Control */}
                    <button
                        onClick={() => setFontSize(s => s > 1 ? s - 1 : 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition ${fontSize === 1 ? 'text-emerald-600 bg-emerald-50 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
                        title="Smaller Text"
                    >
                        A-
                    </button>
                    <button
                        onClick={() => setFontSize(s => s < 3 ? s + 1 : 3)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition ${fontSize === 3 ? 'text-emerald-600 bg-emerald-50 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
                        title="Larger Text"
                    >
                        A+
                    </button>

                    <div className="w-px h-4 bg-stone-200 mx-1"></div>

                    {/* Toggles */}
                    <button
                        onClick={() => setShowHarakat(!showHarakat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${showHarakat ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
                    >
                        Harakat {showHarakat ? 'ON' : 'OFF'}
                    </button>

                    <button
                        onClick={() => setShowTranslation(!showTranslation)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${showTranslation ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
                    >
                        <Languages size={14} /> Terjemah
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-10 relative">
                {/* Audio Player if available */}
                {audioUrl && (
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
                        <audio ref={audioRef} src={audioUrl} />
                        <button
                            onClick={toggleAudio}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition shadow-lg hover:scale-105 active:scale-95"
                        >
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                            <span className="text-xs font-bold uppercase tracking-widest">{isPlaying ? 'Pause' : 'Listen'}</span>
                        </button>
                    </div>
                )}

                <div className={`text-right font-serif text-stone-800 mb-8 transition-all duration-300 ${fontSizes[fontSize]} ${audioUrl ? 'mt-12 md:mt-0' : ''}`} dir="rtl">
                    <p className="font-arabic leading-relaxed">{displayText}</p>
                </div>

                {/* Translation Area */}
                <div className={`border-t border-stone-100 pt-6 transition-all duration-500 overflow-hidden ${showTranslation ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 pt-0'}`}>
                    {translation && (
                        <div className="mb-4">
                            <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Terjemahan Indonesia</h4>
                            <p className="text-stone-600 leading-relaxed">{translation}</p>
                        </div>
                    )}
                    {englishTranslation && (
                        <div>
                            <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">English Translation</h4>
                            <p className="text-stone-600 leading-relaxed italic font-serif">{englishTranslation}</p>
                        </div>
                    )}

                    {!translation && !englishTranslation && (
                        <div className="flex items-center gap-2 text-amber-500 bg-amber-50 p-3 rounded-lg text-sm">
                            <AlertCircle size={16} />
                            <span>Tidak ada terjemahan tersedia untuk bagian ini.</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Style Decoration */}
            <div className="h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20"></div>
        </div>
    );
}

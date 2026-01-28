import React, { useRef, useEffect } from 'react';
import { Play, Pause, AlertCircle, Type, HelpCircle } from 'lucide-react';
import { useLessonSettings } from '../store/lessonStore';
import LessonControls from './LessonControls';

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
    const { showHarakat, showTranslation, fontSize } = useLessonSettings();
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Font size classes mapping
    const fontSizes = {
        1: 'text-xl leading-loose',
        2: 'text-2xl leading-loose',
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
        <div className="my-6 bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden font-sans group hover:border-royal-100 transition-all duration-300">
            {/* Minimal Header if title exists */}
            <div className="bg-stone-50/50 px-6 md:px-8 py-4 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <HelpCircle size={14} className="text-royal-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{title || 'Teks Bacaan'}</span>
                </div>
                <div className="scale-90 origin-right">
                    <LessonControls />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-10 relative">
                {/* Audio Player if available */}
                {audioUrl && (
                    <div className="mb-6">
                        <audio ref={audioRef} src={audioUrl} />
                        <button
                            onClick={toggleAudio}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition shadow-md hover:scale-105 active:scale-95 ${isPlaying ? 'bg-amber-500 text-white' : 'bg-royal-900 text-white hover:bg-royal-800'
                                }`}
                        >
                            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isPlaying ? 'Mendengarkan...' : 'Putar Audio'}</span>
                        </button>
                    </div>
                )}

                <div className={`text-right font-serif text-stone-800 transition-all duration-300 ${fontSizes[fontSize]}`} dir="rtl">
                    <p className="font-arabic leading-relaxed whitespace-pre-wrap">{displayText}</p>
                </div>

                {/* Translation Area */}
                {(translation || englishTranslation) && (
                    <div className={`mt-8 pt-6 border-t border-stone-100 transition-all duration-500 ease-in-out overflow-hidden ${showTranslation ? 'opacity-100 max-h-[1000px] visible' : 'opacity-0 max-h-0 invisible'
                        }`}>
                        {translation && (
                            <div className="mb-4">
                                <h4 className="text-[9px] font-black text-royal-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-1 h-3 bg-royal-500 rounded-full"></span>
                                    Terjemahan Indonesia
                                </h4>
                                <p className="text-stone-600 leading-relaxed text-sm md:text-base">{translation}</p>
                            </div>
                        )}
                        {englishTranslation && (
                            <div>
                                <h4 className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-1 h-3 bg-stone-300 rounded-full"></span>
                                    English Translation
                                </h4>
                                <p className="text-stone-500 leading-relaxed italic font-serif text-sm md:text-base">{englishTranslation}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={`h-1 bg-gradient-to-r transition-opacity duration-300 ${showHarakat ? 'from-royal-500/10 via-royal-500/30 to-royal-500/10' : 'from-stone-200 via-stone-300 to-stone-200'}`}></div>
        </div>
    );
}


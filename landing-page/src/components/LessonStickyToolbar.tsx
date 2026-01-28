import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Home, Menu } from 'lucide-react';
import { useLessonSettings } from '../store/lessonStore';
import { Languages } from 'lucide-react';

interface LessonStickyToolbarProps {
    backUrl: string;
    prevLessonUrl?: string | null;
    nextLessonUrl?: string | null;
    lessonTitle: string;
    courseTitle: string;
    progress?: number;
}

export default function LessonStickyToolbar({
    backUrl,
    prevLessonUrl,
    nextLessonUrl,
    lessonTitle,
    courseTitle,
    progress = 0
}: LessonStickyToolbarProps) {
    const { showHarakat, showTranslation, fontSize, setHarakat, setTranslation, setFontSize } = useLessonSettings();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b bg-white border-stone-200 py-3`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4 h-10">

                {/* Left: Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm font-medium text-stone-500 overflow-hidden">
                    <a href={backUrl} className="flex items-center gap-1 hover:text-royal-700 hover:bg-stone-50 px-2 py-1 rounded-md transition-colors whitespace-nowrap">
                        <span className="bg-royal-100 text-royal-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Pelajaran
                        </span>
                    </a>
                    <ChevronRight size={14} className="text-stone-300 shrink-0" />
                    <span className="truncate text-stone-800 font-bold">{lessonTitle}</span>
                </div>

                {/* Right: Controls (Compact Pill Style) */}
                <div className="flex items-center gap-3 shrink-0">

                    {/* Font Resizer Pill */}
                    <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200 h-9">
                        <button
                            onClick={() => setFontSize(Math.max(1, fontSize - 1))}
                            disabled={fontSize <= 1}
                            className="w-8 h-full flex items-center justify-center text-stone-500 hover:text-royal-700 hover:bg-white rounded-md transition disabled:opacity-30"
                            aria-label="Decrease font size"
                        >
                            <span className="text-lg font-bold mb-1">-</span>
                        </button>

                        <div className="w-8 h-full flex items-center justify-center text-xs font-black text-stone-700 border-x border-stone-200/50 bg-white/50 mx-1 cursor-default select-none">
                            {fontSize}x
                        </div>

                        <button
                            onClick={() => setFontSize(Math.min(3, fontSize + 1))}
                            disabled={fontSize >= 3}
                            className="w-8 h-full flex items-center justify-center text-stone-500 hover:text-royal-700 hover:bg-white rounded-md transition disabled:opacity-30"
                            aria-label="Increase font size"
                        >
                            <span className="text-lg font-bold mb-1">+</span>
                        </button>
                    </div>

                    {/* Translation Toggle Pill */}
                    <button
                        onClick={() => setTranslation(!showTranslation)}
                        className={`h-9 px-4 rounded-lg text-xs font-bold transition-all border flex items-center gap-2 ${showTranslation
                            ? 'bg-royal-900 border-royal-900 text-white'
                            : 'bg-stone-50 border-stone-200 text-stone-400 hover:bg-stone-100'
                            }`}
                    >
                        <Languages size={14} />
                        <span>{showTranslation ? 'Terjemah ON' : 'Terjemah OFF'}</span>
                    </button>

                </div>
            </div>
        </nav>
    );
}

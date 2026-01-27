'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, HelpCircle } from 'lucide-react';

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface QuizBlockProps {
    question: string;
    answers: Answer[];
    explanation?: string;
    hint?: string;
    onComplete?: (isCorrect: boolean) => void;
}

export function InteractiveQuiz({
    question,
    answers,
    explanation,
    hint,
    onComplete
}: QuizBlockProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleSelect = (index: number) => {
        if (showResult) return; // Already answered

        setSelectedIndex(index);
        setShowResult(true);

        const isCorrect = answers[index]?.isCorrect || false;
        onComplete?.(isCorrect);
    };

    const getOptionStyle = (index: number) => {
        if (!showResult) {
            return 'border-stone-200 hover:border-emerald-400 hover:bg-emerald-50';
        }

        if (answers[index]?.isCorrect) {
            return 'border-emerald-500 bg-emerald-50 text-emerald-800';
        }

        if (index === selectedIndex && !answers[index]?.isCorrect) {
            return 'border-red-500 bg-red-50 text-red-800';
        }

        return 'border-stone-200 opacity-50';
    };

    const isCorrectAnswer = selectedIndex !== null && answers[selectedIndex]?.isCorrect;

    return (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            {/* Question */}
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">
                        Tamrinat
                    </p>
                    <h3 className="text-lg font-bold text-stone-900">
                        {question}
                    </h3>
                </div>
            </div>

            {/* Hint Button */}
            {hint && !showHint && !showResult && (
                <button
                    onClick={() => setShowHint(true)}
                    className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-2 transition"
                >
                    <Lightbulb className="w-4 h-4" />
                    Lihat Petunjuk
                </button>
            )}

            {/* Hint Display */}
            {showHint && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
                    💡 {hint}
                </div>
            )}

            {/* Answer Options */}
            <div className="grid gap-3">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        disabled={showResult}
                        className={`
                            w-full text-left p-4 rounded-xl border-2 transition-all duration-300 
                            flex items-center gap-4
                            ${getOptionStyle(index)}
                            ${!showResult ? 'cursor-pointer' : 'cursor-default'}
                        `}
                    >
                        <span className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-500 uppercase shrink-0">
                            {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 font-medium">{answer.text}</span>

                        {showResult && answers[index]?.isCorrect && (
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {showResult && index === selectedIndex && !answers[index]?.isCorrect && (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                    </button>
                ))}
            </div>

            {/* Result & Explanation */}
            {showResult && (
                <div className={`
                    p-6 rounded-xl border-2
                    ${isCorrectAnswer
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-red-50 border-red-200'
                    }
                `}>
                    <div className="flex items-center gap-3 mb-3">
                        {isCorrectAnswer ? (
                            <>
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                <span className="font-bold text-emerald-800">Benar! Mashaa Allah</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-5 h-5 text-red-500" />
                                <span className="font-bold text-red-800">Belum tepat, coba lagi!</span>
                            </>
                        )}
                    </div>

                    {explanation && (
                        <p className={`text-sm leading-relaxed ${isCorrectAnswer ? 'text-emerald-700' : 'text-red-700'}`}>
                            {explanation}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default InteractiveQuiz;

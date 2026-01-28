import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, ArrowRight, RefreshCw } from 'lucide-react';

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    question: string;
    answers: Answer[];
    explanation?: string;
    hint?: string;
}

interface QuizBlock {
    _type: 'quizBlock';
    title?: string;
    description?: string;
    questions: Question[];
}

interface LessonQuizRunnerProps {
    quizBlocks: QuizBlock[];
    nextLessonRaw?: any;
}

export default function LessonQuizRunner({ quizBlocks, nextLessonRaw }: LessonQuizRunnerProps) {
    // Flatten all questions from all blocks into a single sequence for scoring,
    // but we still render them block by block visually.
    // Actually, user might want them block by block. 
    // We'll maintain local state for 'answered' questions to show feedback.

    const [answersState, setAnswersState] = useState<Record<string, { selectedIdx: number; isCorrect: boolean }>>({});
    const [showScore, setShowScore] = useState(false);

    const totalQuestions = quizBlocks.reduce((acc, block) => acc + (block.questions?.length || 0), 0);

    const handleAnswer = (blockIndex: number, questionIndex: number, answerIndex: number, isCorrect: boolean) => {
        const key = `${blockIndex}-${questionIndex}`;
        if (answersState[key]) return; // Prevent changing answer

        setAnswersState(prev => ({
            ...prev,
            [key]: { selectedIdx: answerIndex, isCorrect }
        }));
    };

    const calculateScore = () => {
        const correctCount = Object.values(answersState).filter(a => a.isCorrect).length;
        return Math.round((correctCount / totalQuestions) * 100);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-royal-600';
        if (score >= 60) return 'text-gold-600';
        return 'text-red-600';
    };

    if (showScore) {
        const score = calculateScore();
        const correctCount = Object.values(answersState).filter(a => a.isCorrect).length;

        return (
            <div className="py-20 text-center space-y-8 animate-fade-in">
                <div className="relative inline-block">
                    <Trophy className={`w-32 h-32 mx-auto ${getScoreColor(score)} opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className={`text-6xl font-black ${getScoreColor(score)}`}>{score}</span>
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Skor Anda</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-3xl font-display font-bold text-royal-950">
                        {score >= 80 ? 'Mumtaz! Luar Biasa.' : score >= 60 ? 'Jayyid! Bagus.' : 'Teruslah Berlatih.'}
                    </h3>
                    <p className="text-stone-500">
                        Anda menjawab benar <strong className="text-royal-700">{correctCount}</strong> dari <strong>{totalQuestions}</strong> pertanyaan.
                    </p>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => { setAnswersState({}); setShowScore(false); }}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-full text-stone-600 font-bold text-xs uppercase tracking-widest hover:border-royal-500 hover:text-royal-700 transition"
                    >
                        <RefreshCw size={16} /> Ulangi Kuis
                    </button>
                    {nextLessonRaw && (
                        <a href={`/courses/${nextLessonRaw.params.slug}/lessons/${nextLessonRaw.params.lessonSlug}`}
                            className="flex items-center gap-2 px-8 py-3 bg-royal-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-royal-800 transition shadow-lg"
                        >
                            Lanjut Materi <ArrowRight size={16} />
                        </a>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-16 pb-20">
            {/* Divider */}
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-stone-200"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Latihan & Evaluasi</span>
                <div className="h-px flex-1 bg-stone-200"></div>
            </div>

            {quizBlocks.map((block, blockIdx) => (
                <div key={blockIdx} className="bg-white rounded-[2.5rem] border border-stone-200 p-8 md:p-12 shadow-sm border-l-[12px] border-l-gold-400">
                    <div className="mb-10">
                        <h3 className="font-display font-bold text-3xl text-royal-950 mb-2">{block.title || 'Uji Pemahaman'}</h3>
                        {block.description && <p className="text-stone-500 font-light">{block.description}</p>}
                    </div>

                    <div className="space-y-12">
                        {block.questions?.map((q, qIdx) => {
                            const answerState = answersState[`${blockIdx}-${qIdx}`];
                            const isAnswered = !!answerState;

                            return (
                                <div key={qIdx} className={`space-y-6 p-6 rounded-3xl border transition-all duration-300 ${isAnswered ? (answerState.isCorrect ? 'bg-royal-50/50 border-royal-100' : 'bg-red-50/50 border-red-100') : 'bg-stone-50/50 border-stone-100'}`}>
                                    <p className="text-xl font-medium text-stone-800 flex gap-4">
                                        <span className="w-8 h-8 rounded-full bg-royal-900 text-white flex items-center justify-center text-sm shrink-0 font-bold">{qIdx + 1}</span>
                                        {q.question}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {q.answers?.map((ans, ansIdx) => {
                                            const isSelected = answerState?.selectedIdx === ansIdx;
                                            // Determination logic for styling
                                            let btnClass = "flex items-center gap-5 p-5 border rounded-2xl text-left transition-all duration-300 group shadow-sm relative overflow-hidden ";

                                            if (isAnswered) {
                                                if (isSelected && ans.isCorrect) {
                                                    btnClass += "bg-royal-100 border-royal-500 ring-2 ring-royal-500 ring-offset-2"; // Correct Selected
                                                } else if (isSelected && !ans.isCorrect) {
                                                    btnClass += "bg-red-100 border-red-500 opacity-100"; // Wrong Selected
                                                } else if (ans.isCorrect) {
                                                    btnClass += "bg-royal-50 border-royal-200 opacity-70"; // Correct but not selected (reveal)
                                                } else {
                                                    btnClass += "bg-stone-50 border-stone-100 opacity-50 grayscale"; // Wrong not selected
                                                }
                                            } else {
                                                btnClass += "bg-white border-stone-200 hover:bg-royal-50 hover:border-royal-500 hover:shadow-md cursor-pointer";
                                            }

                                            return (
                                                <button
                                                    key={ansIdx}
                                                    disabled={isAnswered}
                                                    onClick={() => handleAnswer(blockIdx, qIdx, ansIdx, ans.isCorrect)}
                                                    className={btnClass}
                                                >
                                                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors ${isSelected ? (ans.isCorrect ? 'bg-royal-600 text-white' : 'bg-red-500 text-white') : 'bg-stone-100 text-stone-400 group-hover:bg-royal-900 group-hover:text-white'}`}>
                                                        {String.fromCharCode(65 + ansIdx)}
                                                    </span>
                                                    <span className={`text-sm font-medium flex-1 ${isSelected ? 'text-stone-900 font-bold' : 'text-stone-700'}`}>
                                                        {ans.text}
                                                    </span>

                                                    {/* Feedback Icon */}
                                                    {isAnswered && ans.isCorrect && <CheckCircle className="text-royal-600 absolute right-4 top-1/2 -translate-y-1/2" />}
                                                    {isAnswered && isSelected && !ans.isCorrect && <XCircle className="text-red-500 absolute right-4 top-1/2 -translate-y-1/2" />}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation / Feedback Message */}
                                    {isAnswered && (
                                        <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed animate-fade-in ${answerState.isCorrect ? 'bg-royal-100 text-royal-800' : 'bg-red-100 text-red-800'}`}>
                                            <strong>{answerState.isCorrect ? 'Benar! ' : 'Kurang Tepat. '}</strong>
                                            {q.explanation || (answerState.isCorrect ? "Jawaban Anda tepat." : "Coba perhatikan kembali materinya.")}
                                        </div>
                                    )}

                                    {!isAnswered && q.hint && (
                                        <div className="flex items-start gap-2 text-xs text-stone-400 italic bg-white inline-block px-3 py-1 rounded-full border border-stone-100">
                                            <span>💡</span> {q.hint}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="flex items-center justify-center pt-8">
                <button
                    onClick={() => setShowScore(true)}
                    className="flex items-center gap-3 px-12 py-6 bg-royal-900 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-royal-800 transition shadow-2xl shadow-royal-900/40 active:scale-95 duration-200 ring-4 ring-royal-50 border-4 border-royal-900"
                >
                    <Trophy size={20} className="text-gold-400" /> Selesaikan Materi & Cek Skor
                </button>
            </div>
        </div>
    );
}

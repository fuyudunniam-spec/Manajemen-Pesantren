'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { LessonRenderer, LessonGuard } from '@/components/classroom';

// Mock data for demonstration (will be replaced with Sanity fetch)
const MOCK_LESSON_DATA = {
    title: 'Pengenalan Huruf Hijaiyah',
    duration: 15,
    isFreePreview: true,
    courseSlug: 'dasar-bahasa-arab',
    courseTitle: 'Dasar Bahasa Arab untuk Pemula',
    content: [
        {
            _type: 'youtubeEmbed' as const,
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            title: 'Video Pengenalan'
        },
        {
            _type: 'block' as const,
            style: 'h2',
            children: [{ text: 'Apa itu Huruf Hijaiyah?', marks: [] }]
        },
        {
            _type: 'block' as const,
            children: [{
                text: 'Huruf Hijaiyah adalah huruf-huruf yang digunakan dalam bahasa Arab. Terdapat 28 huruf dasar yang perlu dikuasai.',
                marks: []
            }]
        },
        {
            _type: 'vocabularyBlock' as const,
            title: 'Mufradat Sesi Ini',
            words: [
                { arabic: 'أَلِف', transliteration: 'Alif', meaning: 'Huruf pertama' },
                { arabic: 'بَاء', transliteration: "Ba'", meaning: 'Huruf kedua' },
                { arabic: 'تَاء', transliteration: "Ta'", meaning: 'Huruf ketiga' },
                { arabic: 'ثَاء', transliteration: "Tsa'", meaning: 'Huruf keempat' },
            ]
        },
        {
            _type: 'block' as const,
            style: 'h3',
            children: [{ text: 'Qawaid: Makhraj Huruf', marks: [] }]
        },
        {
            _type: 'block' as const,
            children: [{
                text: 'Makhraj adalah tempat keluarnya huruf. Setiap huruf Hijaiyah memiliki makhraj yang berbeda-beda.',
                marks: []
            }]
        },
        {
            _type: 'quizBlock' as const,
            question: 'Berapa jumlah huruf Hijaiyah dalam bahasa Arab?',
            answers: [
                { text: '26 huruf', isCorrect: false },
                { text: '28 huruf', isCorrect: true },
                { text: '30 huruf', isCorrect: false },
                { text: '25 huruf', isCorrect: false },
            ],
            explanation: 'Huruf Hijaiyah terdiri dari 28 huruf dasar. Ini berbeda dengan alfabet Latin yang terdiri dari 26 huruf.',
            hint: 'Coba ingat-ingat, apakah lebih banyak dari huruf alfabet biasa?'
        }
    ]
};

interface PageProps {
    params: {
        courseSlug: string;
        lessonSlug: string;
    };
}

export default function ClassroomPage({ params }: PageProps) {
    const [lesson, setLesson] = useState(MOCK_LESSON_DATA);
    const [progress, setProgress] = useState(0);

    // Simulate progress update
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => Math.min(prev + 10, 100));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleQuizComplete = (isCorrect: boolean) => {
        if (isCorrect) {
            setProgress(100);
            // TODO: Save to Supabase
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Top Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Back to Course */}
                    <Link
                        href={`/dashboard/courses/${params.courseSlug}`}
                        className="flex items-center gap-2 text-stone-600 hover:text-emerald-900 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium hidden sm:inline">Kembali ke Kursus</span>
                    </Link>

                    {/* Lesson Title */}
                    <div className="flex items-center gap-3 max-w-md truncate">
                        <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-stone-900 truncate">{lesson.title}</span>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.duration} min</span>
                        </div>
                        {progress === 100 && (
                            <div className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Selesai</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-stone-100">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 pb-16">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
                        <span>{lesson.courseTitle}</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-emerald-900 font-medium">{lesson.title}</span>
                    </nav>

                    {/* Lesson Content with Guard */}
                    <LessonGuard
                        courseSlug={lesson.courseSlug}
                        courseTitle={lesson.courseTitle}
                        lessonId={params.lessonSlug}
                        isFreePreview={lesson.isFreePreview}
                        minimumInfaq={50000}
                    >
                        <LessonRenderer
                            content={lesson.content}
                            onQuizComplete={handleQuizComplete}
                        />
                    </LessonGuard>

                    {/* Navigation Footer */}
                    <div className="mt-12 pt-8 border-t border-stone-200 flex justify-between items-center">
                        <button className="px-6 py-3 text-stone-600 hover:text-emerald-900 transition font-medium">
                            ← Sesi Sebelumnya
                        </button>
                        <button className="px-6 py-3 bg-emerald-900 text-white rounded-xl hover:bg-emerald-800 transition font-bold shadow-lg shadow-emerald-900/20">
                            Sesi Selanjutnya →
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

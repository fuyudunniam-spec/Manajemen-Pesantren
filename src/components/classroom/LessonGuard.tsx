'use client';

import { useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import InfaqModal from './InfaqModal';
import { Lock } from 'lucide-react';

interface LessonGuardProps {
    children: ReactNode;
    courseSlug: string;
    courseTitle: string;
    lessonId: string;
    isFreePreview: boolean;
    minimumInfaq?: number;
}

export function LessonGuard({
    children,
    courseSlug,
    courseTitle,
    lessonId,
    isFreePreview,
    minimumInfaq = 50000
}: LessonGuardProps) {
    const [hasAccess, setHasAccess] = useState<boolean | null>(null); // null = loading
    const [showModal, setShowModal] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        checkAccess();
    }, [courseSlug]);

    const checkAccess = async () => {
        // Free preview = always allow
        if (isFreePreview) {
            setHasAccess(true);
            return;
        }

        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setHasAccess(false);
            return;
        }

        // Check enrollment
        const { data: enrollment } = await supabase
            .from('enrollments')
            .select('id, status')
            .eq('user_id', user.id)
            .eq('course_slug', courseSlug)
            .eq('status', 'active')
            .single();

        setHasAccess(!!enrollment);
    };

    const handleInfaqSubmit = async (amount: number) => {
        // For MVP: Simulate payment success (skip Midtrans)
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert('Silakan login terlebih dahulu');
            return;
        }

        // Insert enrollment (simulate payment success)
        const { error } = await supabase
            .from('enrollments')
            .insert({
                user_id: user.id,
                course_slug: courseSlug,
                infaq_amount: amount,
                status: 'active',
                payment_reference: `SIMULATED-${Date.now()}`
            });

        if (error) {
            console.error('Enrollment error:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
            return;
        }

        // Success!
        setHasAccess(true);
        setShowModal(false);
    };

    // Loading state
    if (hasAccess === null) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-pulse text-stone-400">Memuat materi...</div>
            </div>
        );
    }

    // Access granted
    if (hasAccess) {
        return <>{children}</>;
    }

    // Access denied - Show paywall
    return (
        <>
            <div className="relative">
                {/* Blurred preview */}
                <div className="blur-sm pointer-events-none select-none opacity-50">
                    {children}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-white flex items-center justify-center">
                    <div className="text-center p-8 max-w-md">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-emerald-900" />
                        </div>

                        <h3 className="text-2xl font-bold text-emerald-950 mb-3">
                            Materi Terkunci
                        </h3>

                        <p className="text-stone-600 mb-6">
                            Lanjutkan belajar dengan berinfaq untuk mendukung pendidikan umat dan yatim dhuafa.
                        </p>

                        <button
                            onClick={() => setShowModal(true)}
                            className="px-8 py-4 bg-emerald-900 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20"
                        >
                            Buka Akses Sekarang
                        </button>
                    </div>
                </div>
            </div>

            <InfaqModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                courseTitle={courseTitle}
                minimumInfaq={minimumInfaq}
                onSubmit={handleInfaqSubmit}
            />
        </>
    );
}

export default LessonGuard;

'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useUnsavedChanges(hasUnsavedChanges: boolean) {
    const router = useRouter();

    // Warn before leaving page
    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        },
        [hasUnsavedChanges]
    );

    useEffect(() => {
        if (hasUnsavedChanges) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges, handleBeforeUnload]);

    return {
        confirmLeave: () => {
            if (hasUnsavedChanges) {
                return window.confirm(
                    'Anda memiliki perubahan yang belum disimpan. Yakin ingin meninggalkan halaman ini?'
                );
            }
            return true;
        },
    };
}

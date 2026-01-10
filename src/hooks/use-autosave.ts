'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseAutosaveOptions<T> {
    key: string;
    data: T;
    interval?: number;
}

export function useAutosave<T>({ key, data, interval = 30000 }: UseAutosaveOptions<T>) {
    const [hasDraft, setHasDraft] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Check for existing draft on mount
    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            setHasDraft(true);
        }
    }, [key]);

    // Auto-save to localStorage
    useEffect(() => {
        const timer = setInterval(() => {
            if (data) {
                localStorage.setItem(key, JSON.stringify(data));
                setLastSaved(new Date());
            }
        }, interval);

        return () => clearInterval(timer);
    }, [key, data, interval]);

    const loadDraft = useCallback((): T | null => {
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return null;
            }
        }
        return null;
    }, [key]);

    const clearDraft = useCallback(() => {
        localStorage.removeItem(key);
        setHasDraft(false);
        setLastSaved(null);
    }, [key]);

    const saveDraft = useCallback(() => {
        if (data) {
            localStorage.setItem(key, JSON.stringify(data));
            setLastSaved(new Date());
        }
    }, [key, data]);

    return {
        hasDraft,
        lastSaved,
        loadDraft,
        clearDraft,
        saveDraft,
    };
}

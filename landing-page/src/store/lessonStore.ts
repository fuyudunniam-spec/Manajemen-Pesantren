import { useState, useEffect } from 'react';

// Global state for lesson settings
const state = {
    showHarakat: true,
    showTranslation: true,
    fontSize: 2, // 1: small, 2: medium, 3: large
};

const listeners = new Set<(s: typeof state) => void>();

export const lessonStore = {
    getState: () => ({ ...state }),
    setShowHarakat: (val: boolean) => {
        state.showHarakat = val;
        listeners.forEach(l => l({ ...state }));
    },
    setShowTranslation: (val: boolean) => {
        state.showTranslation = val;
        listeners.forEach(l => l({ ...state }));
    },
    setFontSize: (val: number) => {
        state.fontSize = val;
        listeners.forEach(l => l({ ...state }));
    },
    subscribe: (listener: (s: typeof state) => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
};

export function useLessonSettings() {
    const [settings, setSettings] = useState(state);

    useEffect(() => {
        return lessonStore.subscribe(setSettings);
    }, []);

    return {
        ...settings,
        setHarakat: lessonStore.setShowHarakat,
        setTranslation: lessonStore.setShowTranslation,
        setFontSize: lessonStore.setFontSize,
    };
}

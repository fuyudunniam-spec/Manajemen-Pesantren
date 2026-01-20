'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export interface WebsiteSettings {
    site_title: string;
    site_tagline: string;
    site_description: string;
    site_logo: string;
    site_logo_small: string;
    footer_text: string;
}

const defaultSettings: WebsiteSettings = {
    site_title: 'e-Maktab',
    site_tagline: 'Pondok Pesantren',
    site_description: 'Sistem manajemen pesantren modern',
    site_logo: '',
    site_logo_small: '',
    footer_text: '',
};

interface SettingsContextType {
    settings: WebsiteSettings;
    loading: boolean;
    refetch: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({
    children,
    initialSettings
}: {
    children: ReactNode;
    initialSettings?: WebsiteSettings;
}) {
    const [settings, setSettings] = useState<WebsiteSettings>(initialSettings || defaultSettings);
    const [loading, setLoading] = useState(!initialSettings);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            // Static settings for dashboard focusing on internal management
            setSettings(defaultSettings);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!initialSettings) {
            fetchSettings();
        }
    }, [initialSettings]);

    return (
        <SettingsContext.Provider value={{ settings, loading, refetch: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

// Standalone hook for components outside provider (fetches independently)
export function useSettingsStandalone() {
    return { settings: defaultSettings, loading: false };
}

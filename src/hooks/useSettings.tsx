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

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('website_settings')
                .select('key, value');

            if (error) throw error;

            const settingsMap: Record<string, string> = {};
            data?.forEach((item) => {
                settingsMap[item.key] = item.value || '';
            });

            setSettings({
                site_title: settingsMap.site_title || defaultSettings.site_title,
                site_tagline: settingsMap.site_tagline || defaultSettings.site_tagline,
                site_description: settingsMap.site_description || defaultSettings.site_description,
                site_logo: settingsMap.site_logo || defaultSettings.site_logo,
                site_logo_small: settingsMap.site_logo_small || defaultSettings.site_logo_small,
                footer_text: settingsMap.footer_text || defaultSettings.footer_text,
            });
        } catch (error) {
            console.error('Error fetching settings:', error);
            // Keep default settings on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

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
    const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const { data, error } = await supabase
                    .from('website_settings')
                    .select('key, value');

                if (error) throw error;

                const settingsMap: Record<string, string> = {};
                data?.forEach((item) => {
                    settingsMap[item.key] = item.value || '';
                });

                setSettings({
                    site_title: settingsMap.site_title || defaultSettings.site_title,
                    site_tagline: settingsMap.site_tagline || defaultSettings.site_tagline,
                    site_description: settingsMap.site_description || defaultSettings.site_description,
                    site_logo: settingsMap.site_logo || defaultSettings.site_logo,
                    site_logo_small: settingsMap.site_logo_small || defaultSettings.site_logo_small,
                    footer_text: settingsMap.footer_text || defaultSettings.footer_text,
                });
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        }

        fetch();
    }, []);

    return { settings, loading };
}

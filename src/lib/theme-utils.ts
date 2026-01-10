// Utility functions for theme management - not a server action
import type { ThemeSettings } from './actions/theme';

export function generateCSSVariables(theme: ThemeSettings | null): string {
    if (!theme) return '';

    return `
        --primary-color: ${theme.primary_color};
        --secondary-color: ${theme.secondary_color};
        --accent-color: ${theme.accent_color};
        --background-color: ${theme.background_color};
        --foreground-color: ${theme.foreground_color};
        --heading-font: ${theme.heading_font};
        --body-font: ${theme.body_font};
        --border-radius: ${theme.border_radius};
    `.trim();
}

export function hexToHSL(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

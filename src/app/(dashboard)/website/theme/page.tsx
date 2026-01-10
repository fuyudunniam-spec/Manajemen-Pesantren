'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Save, Loader2, Palette, Eye, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { ColorPicker } from '@/components/ui/color-picker';
import { getTheme, updateTheme, type ThemeSettings } from '@/lib/actions/theme';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const fontOptions = [
    { value: 'Playfair Display', label: 'Playfair Display (Serif)' },
    { value: 'Merriweather', label: 'Merriweather (Serif)' },
    { value: 'Lora', label: 'Lora (Serif)' },
    { value: 'Inter', label: 'Inter (Sans-serif)' },
    { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Roboto', label: 'Roboto' },
];

export default function ThemeCustomizerPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [theme, setTheme] = useState<ThemeSettings | null>(null);
    const [borderRadiusValue, setBorderRadiusValue] = useState(8);

    useEffect(() => {
        fetchTheme();
    }, []);

    const fetchTheme = async () => {
        try {
            const data = await getTheme();
            if (data) {
                setTheme(data);
                // Parse border radius
                const radius = parseFloat(data.border_radius?.replace('rem', '') || '0.5');
                setBorderRadiusValue(radius * 16); // Convert rem to px for slider
            }
        } catch (error: any) {
            toast.error('Gagal memuat tema', {
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!theme) return;

        setSaving(true);
        try {
            await updateTheme({
                ...theme,
                border_radius: `${borderRadiusValue / 16}rem`,
            });
            toast.success('Tema berhasil disimpan', {
                description: 'Perubahan akan langsung muncul di website',
            });
        } catch (error: any) {
            toast.error('Gagal menyimpan tema', {
                description: error.message,
            });
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        setTheme({
            primary_color: '#059669',
            secondary_color: '#0f766e',
            accent_color: '#d97706',
            background_color: '#ffffff',
            foreground_color: '#0f172a',
            heading_font: 'Playfair Display',
            body_font: 'Inter',
            border_radius: '0.5rem',
            sidebar_style: 'solid',
        });
        setBorderRadiusValue(8);
    };

    if (loading || !theme) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                        <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-slate-900">
                            Theme Customizer
                        </h1>
                        <p className="text-sm text-slate-500">
                            Sesuaikan warna, font, dan gaya visual website
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.open('/', '_blank')} className="gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Settings */}
                <div className="space-y-6">
                    {/* Colors */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Warna</CardTitle>
                            <CardDescription>
                                Pilih palet warna untuk website
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ColorPicker
                                label="Primary Color"
                                value={theme.primary_color}
                                onChange={(value) => setTheme({ ...theme, primary_color: value })}
                            />
                            <ColorPicker
                                label="Secondary Color"
                                value={theme.secondary_color}
                                onChange={(value) => setTheme({ ...theme, secondary_color: value })}
                            />
                            <ColorPicker
                                label="Accent Color"
                                value={theme.accent_color}
                                onChange={(value) => setTheme({ ...theme, accent_color: value })}
                            />
                            <ColorPicker
                                label="Background Color"
                                value={theme.background_color}
                                onChange={(value) => setTheme({ ...theme, background_color: value })}
                            />
                            <ColorPicker
                                label="Text Color"
                                value={theme.foreground_color}
                                onChange={(value) => setTheme({ ...theme, foreground_color: value })}
                            />
                        </CardContent>
                    </Card>

                    {/* Typography */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Typography</CardTitle>
                            <CardDescription>
                                Font untuk heading dan body text
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Heading Font</Label>
                                <Select
                                    value={theme.heading_font}
                                    onValueChange={(value) =>
                                        setTheme({ ...theme, heading_font: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fontOptions.map((font) => (
                                            <SelectItem key={font.value} value={font.value}>
                                                {font.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Body Font</Label>
                                <Select
                                    value={theme.body_font}
                                    onValueChange={(value) => setTheme({ ...theme, body_font: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fontOptions.map((font) => (
                                            <SelectItem key={font.value} value={font.value}>
                                                {font.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Layout */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Layout</CardTitle>
                            <CardDescription>
                                Konfigurasi tampilan elemen UI
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Border Radius: {borderRadiusValue}px</Label>
                                <Slider
                                    value={[borderRadiusValue]}
                                    onValueChange={([value]) => setBorderRadiusValue(value)}
                                    min={0}
                                    max={24}
                                    step={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Sidebar Style</Label>
                                <Select
                                    value={theme.sidebar_style}
                                    onValueChange={(value) =>
                                        setTheme({ ...theme, sidebar_style: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="solid">Solid</SelectItem>
                                        <SelectItem value="gradient">Gradient</SelectItem>
                                        <SelectItem value="minimal">Minimal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                        size="lg"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Simpan Tema
                    </Button>
                </div>

                {/* Right: Live Preview */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                            <CardDescription>
                                Pratinjau perubahan secara real-time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="border-2 rounded-lg p-6 space-y-4"
                                style={{
                                    backgroundColor: theme.background_color,
                                    color: theme.foreground_color,
                                    borderRadius: `${borderRadiusValue}px`,
                                }}
                            >
                                {/* Heading Preview */}
                                <h1
                                    className="text-3xl font-bold"
                                    style={{
                                        fontFamily: theme.heading_font,
                                        color: theme.foreground_color,
                                    }}
                                >
                                    Heading Preview
                                </h1>

                                {/* Body Text Preview */}
                                <p
                                    className="text-base"
                                    style={{
                                        fontFamily: theme.body_font,
                                    }}
                                >
                                    Ini adalah contoh body text dengan font yang dipilih. Lorem ipsum dolor
                                    sit amet consectetur adipisicing elit.
                                </p>

                                {/* Button Previews */}
                                <div className="flex gap-3 flex-wrap">
                                    <button
                                        className="px-4 py-2 rounded font-medium text-white"
                                        style={{
                                            backgroundColor: theme.primary_color,
                                            borderRadius: `${borderRadiusValue / 2}px`,
                                        }}
                                    >
                                        Primary Button
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded font-medium text-white"
                                        style={{
                                            backgroundColor: theme.secondary_color,
                                            borderRadius: `${borderRadiusValue / 2}px`,
                                        }}
                                    >
                                        Secondary Button
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded font-medium text-white"
                                        style={{
                                            backgroundColor: theme.accent_color,
                                            borderRadius: `${borderRadiusValue / 2}px`,
                                        }}
                                    >
                                        Accent Button
                                    </button>
                                </div>

                                {/* Card Preview */}
                                <div
                                    className="border p-4"
                                    style={{
                                        borderRadius: `${borderRadiusValue}px`,
                                        borderColor: theme.primary_color,
                                    }}
                                >
                                    <h3
                                        className="font-bold mb-2"
                                        style={{
                                            fontFamily: theme.heading_font,
                                            color: theme.primary_color,
                                        }}
                                    >
                                        Card Example
                                    </h3>
                                    <p style={{ fontFamily: theme.body_font }}>
                                        Ini adalah contoh card dengan border radius yang dapat disesuaikan.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CSS Variables Display */}
                    <Card>
                        <CardHeader>
                            <CardTitle>CSS Variables</CardTitle>
                            <CardDescription>
                                Variable yang akan diterapkan ke website
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre className="text-xs font-mono bg-slate-100 p-4 rounded overflow-x-auto">
                                {`:root {\n  --primary-color: ${theme.primary_color};\n  --secondary-color: ${theme.secondary_color};\n  --accent-color: ${theme.accent_color};\n  --background-color: ${theme.background_color};\n  --foreground-color: ${theme.foreground_color};\n  --heading-font: '${theme.heading_font}';\n  --body-font: '${theme.body_font}';\n  --border-radius: ${borderRadiusValue / 16}rem;\n}`}
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

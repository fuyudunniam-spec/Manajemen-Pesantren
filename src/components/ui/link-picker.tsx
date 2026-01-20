'use client';

import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { cn } from '@/lib/utils';
import {
    Link as LinkIcon,
    Home,
    User,
    Phone,
    Newspaper,
    BookOpen,
    Users,
    Calendar,
    GraduationCap,
    FileText,
    ExternalLink,
    ChevronDown,
    Check,
} from 'lucide-react';

// Internal pages registry - add your site's internal pages here
const INTERNAL_PAGES = [
    { name: 'Beranda', path: '/', icon: Home, category: 'main' },
    { name: 'Profil Pesantren', path: '/profil', icon: BookOpen, category: 'main' },
    { name: 'Kontak', path: '/kontak', icon: Phone, category: 'main' },
    { name: 'Berita & Artikel', path: '/berita', icon: Newspaper, category: 'main' },

    { name: 'Pendaftaran Santri', path: '/psb', icon: GraduationCap, category: 'psb' },
    { name: 'Form Pendaftaran', path: '/psb/daftar', icon: FileText, category: 'psb' },
    { name: 'Informasi PSB', path: '/psb/informasi', icon: Calendar, category: 'psb' },

    { name: 'Tentang Kami', path: '/tentang', icon: Users, category: 'about' },
    { name: 'Visi & Misi', path: '/profil/visi-misi', icon: BookOpen, category: 'about' },
    { name: 'Sejarah', path: '/profil/sejarah', icon: BookOpen, category: 'about' },
    { name: 'Struktur Organisasi', path: '/profil/struktur', icon: Users, category: 'about' },
];

interface LinkPickerProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    placeholder?: string;
    allowExternal?: boolean;
}

export function LinkPicker({
    value,
    onChange,
    label,
    placeholder = 'Pilih atau masukkan URL...',
    allowExternal = true,
}: LinkPickerProps) {
    const [open, setOpen] = useState(false);
    const [customUrl, setCustomUrl] = useState(value || '');
    const [activeTab, setActiveTab] = useState<'internal' | 'custom'>('internal');

    // Find selected page
    const selectedPage = INTERNAL_PAGES.find((page) => page.path === value);

    const handleSelectInternal = (path: string) => {
        onChange(path);
        setCustomUrl(path);
        setOpen(false);
    };

    const handleCustomUrlChange = (url: string) => {
        setCustomUrl(url);
    };

    const handleApplyCustomUrl = () => {
        onChange(customUrl);
        setOpen(false);
    };

    const handleClear = () => {
        onChange('');
        setCustomUrl('');
    };

    // Group pages by category
    const mainPages = INTERNAL_PAGES.filter((p) => p.category === 'main');
    const psbPages = INTERNAL_PAGES.filter((p) => p.category === 'psb');
    const aboutPages = INTERNAL_PAGES.filter((p) => p.category === 'about');

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-10 font-normal"
                    >
                        <div className="flex items-center gap-2 truncate">
                            {selectedPage ? (
                                <>
                                    <selectedPage.icon className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span className="truncate">{selectedPage.name}</span>
                                    <span className="text-xs text-muted-foreground font-mono truncate">
                                        {selectedPage.path}
                                    </span>
                                </>
                            ) : value ? (
                                <>
                                    <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" />
                                    <span className="truncate font-mono text-sm">{value}</span>
                                </>
                            ) : (
                                <span className="text-muted-foreground">{placeholder}</span>
                            )}
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                    <Tabs
                        value={activeTab}
                        onValueChange={(v) => setActiveTab(v as 'internal' | 'custom')}
                        className="w-full"
                    >
                        <div className="border-b px-3 py-2">
                            <TabsList className="w-full">
                                <TabsTrigger value="internal" className="flex-1">
                                    <Home className="w-4 h-4 mr-1" />
                                    Internal
                                </TabsTrigger>
                                {allowExternal && (
                                    <TabsTrigger value="custom" className="flex-1">
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Custom URL
                                    </TabsTrigger>
                                )}
                            </TabsList>
                        </div>

                        <TabsContent value="internal" className="m-0">
                            <ScrollArea className="h-[280px]">
                                <div className="p-2 space-y-3">
                                    {/* Main Pages */}
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground px-2 mb-1">
                                            Halaman Utama
                                        </p>
                                        {mainPages.map((page) => (
                                            <PageItem
                                                key={page.path}
                                                page={page}
                                                selected={value === page.path}
                                                onSelect={handleSelectInternal}
                                            />
                                        ))}
                                    </div>

                                    {/* PSB Pages */}
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground px-2 mb-1">
                                            Penerimaan Santri Baru
                                        </p>
                                        {psbPages.map((page) => (
                                            <PageItem
                                                key={page.path}
                                                page={page}
                                                selected={value === page.path}
                                                onSelect={handleSelectInternal}
                                            />
                                        ))}
                                    </div>

                                    {/* About Pages */}
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground px-2 mb-1">
                                            Profil
                                        </p>
                                        {aboutPages.map((page) => (
                                            <PageItem
                                                key={page.path}
                                                page={page}
                                                selected={value === page.path}
                                                onSelect={handleSelectInternal}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="custom" className="m-0 p-4 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">
                                    Masukkan URL lengkap
                                </Label>
                                <Input
                                    value={customUrl}
                                    onChange={(e) => handleCustomUrlChange(e.target.value)}
                                    placeholder="https://example.com atau /halaman"
                                    className="font-mono text-sm"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={handleClear}
                                >
                                    Hapus
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                    onClick={handleApplyCustomUrl}
                                >
                                    Terapkan
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// Helper component for page items
function PageItem({
    page,
    selected,
    onSelect,
}: {
    page: (typeof INTERNAL_PAGES)[0];
    selected: boolean;
    onSelect: (path: string) => void;
}) {
    const Icon = page.icon;
    return (
        <button
            type="button"
            onClick={() => onSelect(page.path)}
            className={cn(
                'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors',
                'hover:bg-emerald-50 hover:text-emerald-700',
                selected && 'bg-emerald-100 text-emerald-700'
            )}
        >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-sm">{page.name}</span>
            <span className="text-xs text-muted-foreground font-mono">{page.path}</span>
            {selected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
        </button>
    );
}

// Inline version for compact use - Input with picker button
export function LinkPickerInline({
    value,
    onChange,
    placeholder = '/halaman',
}: Pick<LinkPickerProps, 'value' | 'onChange' | 'placeholder'>) {
    const [open, setOpen] = useState(false);

    const handleSelect = (url: string) => {
        onChange(url);
        setOpen(false);
    };

    return (
        <div className="flex gap-2">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="font-mono text-sm flex-1"
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <LinkIcon className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2" align="end">
                    <ScrollArea className="h-[200px]">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground px-2 mb-2">
                                Halaman Internal
                            </p>
                            {INTERNAL_PAGES.map((page) => (
                                <button
                                    key={page.path}
                                    type="button"
                                    onClick={() => handleSelect(page.path)}
                                    className={cn(
                                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-sm transition-colors',
                                        'hover:bg-emerald-50 hover:text-emerald-700',
                                        value === page.path && 'bg-emerald-100 text-emerald-700'
                                    )}
                                >
                                    <page.icon className="w-4 h-4 shrink-0" />
                                    <span className="flex-1 truncate">{page.name}</span>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// Export the internal pages for use elsewhere
export { INTERNAL_PAGES };

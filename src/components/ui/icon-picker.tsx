'use client';

import { useState, useMemo } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';
import { cn } from '@/lib/utils';
import {
    Search,
    ChevronDown,
    Users,
    BookOpen,
    Award,
    Star,
    Heart,
    Home,
    Calendar,
    Clock,
    Check,
    GraduationCap,
    Phone,
    Mail,
    MapPin,
    Globe,
    Building,
    Briefcase,
    Shield,
    Zap,
    Target,
    TrendingUp,
    BarChart3,
    PieChart,
    FileText,
    Image,
    Video,
    Music,
    Play,
    Pause,
    Settings,
    Bell,
    MessageCircle,
    Send,
    Download,
    Upload,
    Link,
    ExternalLink,
    Copy,
    Trash2,
    Edit,
    Eye,
    EyeOff,
    Lock,
    Unlock,
    Key,
    User,
    UserPlus,
    UserCheck,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    Github,
    ArrowRight,
    ArrowLeft,
    ArrowUp,
    ArrowDown,
    ChevronRight,
    ChevronLeft,
    ChevronUp,
    Plus,
    Minus,
    X,
    Menu,
    MoreHorizontal,
    MoreVertical,
    Grid,
    List,
    Layout,
    Layers,
    Box,
    Circle,
    Square,
    Triangle,
    Hexagon,
    Sparkles,
    Flame,
    Sun,
    Moon,
    Cloud,
    Coffee,
    Gift,
    Crown,
    Gem,
    Rocket,
    Lightbulb,
    Bookmark,
    Flag,
    Tag,
    Hash,
    AtSign,
    Percent,
    DollarSign,
    Euro,
    type LucideIcon,
} from 'lucide-react';

// Icon registry with names and components
const ICON_REGISTRY: { name: string; icon: LucideIcon; label: string; category: string }[] = [
    // People & Users
    { name: 'users', icon: Users, label: 'Users', category: 'people' },
    { name: 'user', icon: User, label: 'User', category: 'people' },
    { name: 'user-plus', icon: UserPlus, label: 'User Plus', category: 'people' },
    { name: 'user-check', icon: UserCheck, label: 'User Check', category: 'people' },
    { name: 'graduation-cap', icon: GraduationCap, label: 'Graduation', category: 'people' },

    // Education & Learning
    { name: 'book-open', icon: BookOpen, label: 'Book', category: 'education' },
    { name: 'award', icon: Award, label: 'Award', category: 'education' },
    { name: 'file-text', icon: FileText, label: 'Document', category: 'education' },

    // Communication
    { name: 'phone', icon: Phone, label: 'Phone', category: 'communication' },
    { name: 'mail', icon: Mail, label: 'Email', category: 'communication' },
    { name: 'message-circle', icon: MessageCircle, label: 'Message', category: 'communication' },
    { name: 'send', icon: Send, label: 'Send', category: 'communication' },
    { name: 'bell', icon: Bell, label: 'Notification', category: 'communication' },

    // Location & Navigation
    { name: 'map-pin', icon: MapPin, label: 'Location', category: 'location' },
    { name: 'globe', icon: Globe, label: 'Globe', category: 'location' },
    { name: 'home', icon: Home, label: 'Home', category: 'location' },
    { name: 'building', icon: Building, label: 'Building', category: 'location' },

    // Business
    { name: 'briefcase', icon: Briefcase, label: 'Briefcase', category: 'business' },
    { name: 'target', icon: Target, label: 'Target', category: 'business' },
    { name: 'trending-up', icon: TrendingUp, label: 'Trending', category: 'business' },
    { name: 'bar-chart-3', icon: BarChart3, label: 'Chart', category: 'business' },
    { name: 'pie-chart', icon: PieChart, label: 'Pie Chart', category: 'business' },

    // Time
    { name: 'calendar', icon: Calendar, label: 'Calendar', category: 'time' },
    { name: 'clock', icon: Clock, label: 'Clock', category: 'time' },

    // Status & Actions
    { name: 'check', icon: Check, label: 'Check', category: 'status' },
    { name: 'star', icon: Star, label: 'Star', category: 'status' },
    { name: 'heart', icon: Heart, label: 'Heart', category: 'status' },
    { name: 'shield', icon: Shield, label: 'Shield', category: 'status' },
    { name: 'zap', icon: Zap, label: 'Lightning', category: 'status' },
    { name: 'sparkles', icon: Sparkles, label: 'Sparkles', category: 'status' },
    { name: 'flame', icon: Flame, label: 'Flame', category: 'status' },
    { name: 'lightbulb', icon: Lightbulb, label: 'Idea', category: 'status' },
    { name: 'rocket', icon: Rocket, label: 'Rocket', category: 'status' },

    // Social Media
    { name: 'facebook', icon: Facebook, label: 'Facebook', category: 'social' },
    { name: 'instagram', icon: Instagram, label: 'Instagram', category: 'social' },
    { name: 'twitter', icon: Twitter, label: 'Twitter', category: 'social' },
    { name: 'youtube', icon: Youtube, label: 'YouTube', category: 'social' },
    { name: 'linkedin', icon: Linkedin, label: 'LinkedIn', category: 'social' },
    { name: 'github', icon: Github, label: 'GitHub', category: 'social' },

    // Media
    { name: 'image', icon: Image, label: 'Image', category: 'media' },
    { name: 'video', icon: Video, label: 'Video', category: 'media' },
    { name: 'music', icon: Music, label: 'Music', category: 'media' },
    { name: 'play', icon: Play, label: 'Play', category: 'media' },

    // Misc
    { name: 'settings', icon: Settings, label: 'Settings', category: 'misc' },
    { name: 'crown', icon: Crown, label: 'Crown', category: 'misc' },
    { name: 'gem', icon: Gem, label: 'Gem', category: 'misc' },
    { name: 'gift', icon: Gift, label: 'Gift', category: 'misc' },
    { name: 'coffee', icon: Coffee, label: 'Coffee', category: 'misc' },
    { name: 'sun', icon: Sun, label: 'Sun', category: 'misc' },
    { name: 'moon', icon: Moon, label: 'Moon', category: 'misc' },
    { name: 'bookmark', icon: Bookmark, label: 'Bookmark', category: 'misc' },
    { name: 'flag', icon: Flag, label: 'Flag', category: 'misc' },
    { name: 'tag', icon: Tag, label: 'Tag', category: 'misc' },
    { name: 'link', icon: Link, label: 'Link', category: 'misc' },
    { name: 'external-link', icon: ExternalLink, label: 'External Link', category: 'misc' },
    { name: 'layout', icon: Layout, label: 'Layout', category: 'misc' },
    { name: 'layers', icon: Layers, label: 'Layers', category: 'misc' },
    { name: 'grid', icon: Grid, label: 'Grid', category: 'misc' },
];

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export function IconPicker({ value, onChange, label }: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Find the selected icon
    const selectedIcon = ICON_REGISTRY.find((item) => item.name === value);
    const SelectedIconComponent = selectedIcon?.icon;

    // Filter icons based on search
    const filteredIcons = useMemo(() => {
        if (!searchQuery) return ICON_REGISTRY;
        const query = searchQuery.toLowerCase();
        return ICON_REGISTRY.filter(
            (item) =>
                item.name.toLowerCase().includes(query) ||
                item.label.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-10"
                    >
                        <div className="flex items-center gap-2">
                            {SelectedIconComponent ? (
                                <>
                                    <SelectedIconComponent className="w-4 h-4 text-emerald-600" />
                                    <span>{selectedIcon.label}</span>
                                </>
                            ) : (
                                <span className="text-muted-foreground">Pilih icon...</span>
                            )}
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-3 border-b">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari icon..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <ScrollArea className="h-[280px]">
                        <div className="p-2 grid grid-cols-6 gap-1">
                            {filteredIcons.map((item) => {
                                const IconComponent = item.icon;
                                const isSelected = value === item.name;
                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() => {
                                            onChange(item.name);
                                            setOpen(false);
                                            setSearchQuery('');
                                        }}
                                        className={cn(
                                            'p-2.5 rounded-lg flex items-center justify-center transition-all',
                                            'hover:bg-emerald-50 hover:text-emerald-700',
                                            isSelected
                                                ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500'
                                                : 'text-slate-600'
                                        )}
                                        title={item.label}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                    </button>
                                );
                            })}
                        </div>
                        {filteredIcons.length === 0 && (
                            <div className="p-6 text-center text-muted-foreground text-sm">
                                Tidak ada icon ditemukan
                            </div>
                        )}
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// Helper function to render icon by name
export function renderIcon(iconName: string, className?: string) {
    const iconData = ICON_REGISTRY.find((item) => item.name === iconName);
    if (!iconData) return null;
    const IconComponent = iconData.icon;
    return <IconComponent className={className} />;
}

// Export the registry for external use
export { ICON_REGISTRY };

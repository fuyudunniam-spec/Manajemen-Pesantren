import {
    BookOpen,
    Moon,
    Heart,
    Globe,
    GraduationCap,
    Shield,
    Users,
    Star,
    Award,
    Building2,
    Lightbulb,
    Target,
    Zap,
    Clock,
    Calendar,
    CheckCircle,
    Sparkles,
    Crown,
    Flame,
    Gem,
    type LucideIcon,
} from 'lucide-react';
import { ReactElement } from 'react';

// Icon option for dropdowns
export interface IconOption {
    value: string;
    label: string;
    icon: LucideIcon;
}

// Available icons for section editors
export const ICON_OPTIONS: IconOption[] = [
    { value: 'book', label: 'Buku / Kitab', icon: BookOpen },
    { value: 'moon', label: 'Bulan / Islami', icon: Moon },
    { value: 'heart', label: 'Hati / Akhlak', icon: Heart },
    { value: 'globe', label: 'Dunia / Global', icon: Globe },
    { value: 'graduation', label: 'Wisuda / Pendidikan', icon: GraduationCap },
    { value: 'shield', label: 'Perlindungan / Aman', icon: Shield },
    { value: 'users', label: 'Komunitas / Santri', icon: Users },
    { value: 'star', label: 'Bintang / Unggul', icon: Star },
    { value: 'award', label: 'Penghargaan', icon: Award },
    { value: 'mosque', label: 'Masjid / Pesantren', icon: Building2 },
    { value: 'lightbulb', label: 'Ide / Ilmu', icon: Lightbulb },
    { value: 'target', label: 'Target / Fokus', icon: Target },
    { value: 'zap', label: 'Energi / Semangat', icon: Zap },
    { value: 'clock', label: 'Waktu / Jadwal', icon: Clock },
    { value: 'calendar', label: 'Kalender', icon: Calendar },
    { value: 'check', label: 'Ceklis / Selesai', icon: CheckCircle },
    { value: 'sparkles', label: 'Bersinar / Istimewa', icon: Sparkles },
    { value: 'crown', label: 'Mahkota / Utama', icon: Crown },
    { value: 'flame', label: 'Api / Semangat', icon: Flame },
    { value: 'gem', label: 'Permata / Premium', icon: Gem },
];

// Map icon key to Lucide icon component
const iconComponentMap: Record<string, LucideIcon> = {
    book: BookOpen,
    moon: Moon,
    heart: Heart,
    globe: Globe,
    graduation: GraduationCap,
    shield: Shield,
    users: Users,
    star: Star,
    award: Award,
    mosque: Building2,
    lightbulb: Lightbulb,
    target: Target,
    zap: Zap,
    clock: Clock,
    calendar: Calendar,
    check: CheckCircle,
    sparkles: Sparkles,
    crown: Crown,
    flame: Flame,
    gem: Gem,
};

/**
 * Get the Lucide icon component for a given icon key
 */
export function getIconComponent(iconKey: string): LucideIcon {
    return iconComponentMap[iconKey] || BookOpen;
}

/**
 * Render an icon element with specified size
 */
export function renderIcon(iconKey: string, className: string = 'w-6 h-6'): ReactElement {
    const IconComponent = getIconComponent(iconKey);
    return <IconComponent className={className} />;
}

/**
 * Get icon option by value
 */
export function getIconOption(value: string): IconOption | undefined {
    return ICON_OPTIONS.find(opt => opt.value === value);
}

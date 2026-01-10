import {
    Home,
    Globe,
    UserPlus,
    Users,
    DollarSign,
    GraduationCap,
    Package,
    ShoppingCart,
    Settings,
    FileText,
    CreditCard,
    FolderTree,
    Newspaper,
    Layers,
    Palette,
    LayoutGrid,
    type LucideIcon,
} from 'lucide-react';

export type ModuleStatus = 'active' | 'coming-soon';

export interface ModuleItem {
    id: string;
    title: string;
    icon: LucideIcon;
    path?: string;
    status: ModuleStatus;
    permission?: string;
    children?: ModuleItem[];
    divider?: boolean; // Add divider after this item
}

export const modulesConfig: ModuleItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: Home,
        path: '/dashboard',
        status: 'active',
        divider: true,
    },

    // Manajemen Website
    {
        id: 'website',
        title: 'Manajemen Website',
        icon: Globe,
        status: 'active',
        permission: 'module.website',
        children: [
            {
                id: 'website-page-builder',
                title: 'Page Builder',
                icon: LayoutGrid,
                path: '/dashboard/website/builder',
                status: 'active',
            },
            {
                id: 'website-sections',
                title: 'Editor Konten',
                icon: Layers,
                path: '/dashboard/website/sections',
                status: 'active',
            },
            {
                id: 'website-pages',
                title: 'Halaman Statis',
                icon: FileText,
                path: '/dashboard/website/pages',
                status: 'active',
            },
            {
                id: 'website-blog',
                title: 'Blog & Artikel',
                icon: Newspaper,
                path: '/dashboard/website/blog',
                status: 'active',
            },
            {
                id: 'website-theme',
                title: 'Kustomisasi Tema',
                icon: Palette,
                path: '/dashboard/website/theme',
                status: 'active',
            },
            {
                id: 'website-settings',
                title: 'Pengaturan Website',
                icon: Settings,
                path: '/dashboard/website/settings',
                status: 'active',
            },
        ],
        divider: true,
    },

    // Pendaftaran (PSB)
    {
        id: 'psb',
        title: 'Pendaftaran (PSB)',
        icon: UserPlus,
        status: 'active',
        permission: 'module.psb',
        children: [
            {
                id: 'psb-pendaftar',
                title: 'Data Pendaftar',
                icon: Users,
                path: '/dashboard/psb/pendaftar',
                status: 'active',
            },
            {
                id: 'psb-pembayaran',
                title: 'Pembayaran',
                icon: CreditCard,
                path: '/dashboard/psb/pembayaran',
                status: 'active',
            },
            {
                id: 'psb-kategori',
                title: 'Kategori & Persyaratan',
                icon: FolderTree,
                path: '/dashboard/psb/kategori',
                status: 'active',
            },
        ],
        divider: true,
    },

    // Master Data
    {
        id: 'master-data',
        title: 'Master Data',
        icon: Users,
        status: 'active',
        permission: 'module.master-data',
        children: [
            {
                id: 'master-santri',
                title: 'Santri',
                icon: Users,
                path: '/dashboard/master-data/santri',
                status: 'active',
            },
        ],
        divider: true,
    },

    // Coming Soon Modules
    {
        id: 'keuangan',
        title: 'Keuangan',
        icon: DollarSign,
        status: 'coming-soon',
        permission: 'module.keuangan',
    },
    {
        id: 'akademik',
        title: 'Akademik',
        icon: GraduationCap,
        status: 'coming-soon',
        permission: 'module.akademik',
    },
    {
        id: 'inventaris',
        title: 'Inventaris',
        icon: Package,
        status: 'coming-soon',
        permission: 'module.inventaris',
    },
    {
        id: 'koperasi',
        title: 'Koperasi',
        icon: ShoppingCart,
        status: 'coming-soon',
        permission: 'module.koperasi',
    },
    {
        id: 'user-management',
        title: 'Manajemen User',
        icon: Settings,
        path: '/users',
        status: 'coming-soon',
        permission: 'module.users',
        divider: true,
    },

    // Pengaturan
    {
        id: 'settings',
        title: 'Pengaturan',
        icon: Settings,
        status: 'active',
        children: [
            {
                id: 'settings-profile',
                title: 'Profil Saya',
                icon: Users,
                path: '/dashboard/settings/profile',
                status: 'active',
            },
        ],
    },
];

// Helper function to get active modules only
export const getActiveModules = () => {
    return modulesConfig.filter(module => module.status === 'active');
};

// Helper function to get module by id
export const getModuleById = (id: string): ModuleItem | undefined => {
    for (const module of modulesConfig) {
        if (module.id === id) return module;
        if (module.children) {
            const child = module.children.find(c => c.id === id);
            if (child) return child;
        }
    }
    return undefined;
};

// Helper function to check if user has access to module (placeholder for future permission system)
export const hasModuleAccess = (moduleId: string, userPermissions?: string[]): boolean => {
    const module = getModuleById(moduleId);
    if (!module) return false;

    // For now, return true for all active modules
    // Later: check module.permission against userPermissions
    return module.status === 'active';
};

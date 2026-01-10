import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brandingConfig } from '@/config/brandingConfig';
import { modulesConfig, type ModuleItem } from '@/config/modulesConfig';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface AdminSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['website', 'psb', 'master-data']);

    const toggleMenu = (menuId: string) => {
        setExpandedMenus(prev =>
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    const isActive = (path?: string) => {
        if (!path) return false;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    const isParentActive = (module: ModuleItem) => {
        if (module.path && isActive(module.path)) return true;
        if (module.children) {
            return module.children.some(child => child.path && isActive(child.path));
        }
        return false;
    };

    const renderMenuItem = (module: ModuleItem, isChild = false) => {
        const Icon = module.icon;
        const hasChildren = module.children && module.children.length > 0;
        const isExpanded = expandedMenus.includes(module.id);
        const active = isActive(module.path) || isParentActive(module);
        const isComingSoon = module.status === 'coming-soon';

        const menuContent = (
            <div
                className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer',
                    isChild && 'pl-12',
                    active && !isComingSoon && 'bg-amber-500/10 text-amber-400 font-medium',
                    !active && !isComingSoon && 'text-emerald-50/80 hover:bg-emerald-800/50 hover:text-white',
                    isComingSoon && 'text-emerald-50/40 cursor-not-allowed opacity-60'
                )}
                onClick={() => {
                    if (isComingSoon) return;
                    if (hasChildren) {
                        toggleMenu(module.id);
                    } else if (module.path) {
                        onClose?.();
                    }
                }}
            >
                <Icon className={cn('w-5 h-5 flex-shrink-0', active && 'text-amber-400')} />
                <span className="flex-1 text-sm">{module.title}</span>
                {hasChildren && !isComingSoon && (
                    <div className="flex-shrink-0">
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </div>
                )}
            </div>
        );

        if (isComingSoon) {
            return (
                <TooltipProvider key={module.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>{menuContent}</div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Fitur ini sedang dalam tahap pengembangan</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        if (module.path && !hasChildren) {
            return (
                <Link key={module.id} to={module.path}>
                    {menuContent}
                </Link>
            );
        }

        return <div key={module.id}>{menuContent}</div>;
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 h-full bg-emerald-950 border-r border-emerald-900/50 z-50 transition-transform duration-300',
                    'w-64 flex flex-col',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Logo & Brand */}
                <div className="p-6 border-b border-emerald-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-400/20">
                            <span className="text-amber-400 font-display font-bold text-2xl">
                                {brandingConfig.logo.icon}
                            </span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-xl text-white">
                                {brandingConfig.app.name}
                            </h1>
                            <p className="text-xs text-emerald-50/60">
                                {brandingConfig.app.tagline}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {modulesConfig.map((module) => (
                        <div key={module.id}>
                            {renderMenuItem(module)}

                            {/* Submenu */}
                            {module.children && expandedMenus.includes(module.id) && (
                                <div className="mt-1 space-y-1">
                                    {module.children.map((child) => renderMenuItem(child, true))}
                                </div>
                            )}

                            {/* Divider */}
                            {module.divider && (
                                <div className="my-3 border-t border-emerald-900/30" />
                            )}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-emerald-900/50">
                    <p className="text-xs text-emerald-50/40 text-center">
                        © 2026 {brandingConfig.app.name}
                    </p>
                </div>
            </aside>
        </>
    );
}

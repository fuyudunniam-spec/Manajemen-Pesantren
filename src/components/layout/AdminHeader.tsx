import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User } from 'lucide-react';
import { brandingConfig } from '@/config/brandingConfig';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await signOut();
        if (error) {
            toast.error('Gagal logout', {
                description: error.message,
            });
        } else {
            toast.success('Logout berhasil');
            navigate('/login');
        }
    };

    return (
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    {/* Logo (Mobile Only) */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                            <span className="text-white font-display font-bold text-lg">
                                {brandingConfig.logo.icon}
                            </span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg text-slate-900">
                                {brandingConfig.app.name}
                            </h1>
                        </div>
                    </div>

                    {/* Spacer for desktop */}
                    <div className="hidden lg:block" />

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <span className="text-emerald-700 font-semibold text-sm">
                                        {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-medium text-slate-900">
                                        {profile?.full_name || user?.email}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {profile?.roles?.name || 'User'}
                                    </p>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate('/dashboard/settings/profile')}>
                                <User className="w-4 h-4 mr-2" />
                                Profil Saya
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

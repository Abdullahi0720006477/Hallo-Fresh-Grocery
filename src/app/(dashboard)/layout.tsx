"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
    LogOut,
    LayoutDashboard,
    ShoppingBag,
    User,
    Settings,
    Package,
    Search,
    Bell,
    ChevronDown,
    PieChart,
    Users
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await authService.logout();
        router.push("/");
    };

    React.useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
        { icon: <ShoppingBag size={20} />, label: "Orders", href: "/orders" },
        { icon: <PieChart size={20} />, label: "Reports", href: "/reports" },
        { icon: <Users size={20} />, label: "Network", href: "/users" },
        { icon: <User size={20} />, label: "Profile", href: "/profile" },
        { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
    ];

    if (loading) return null; // Let the page handle the full-screen loader if needed

    return (
        <div className="min-h-screen bg-[#f8faf9] flex font-manrope">
            {/* --- Sidebar --- */}
            <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col hidden lg:flex fixed inset-y-0 left-0 z-50">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Package size={20} className="text-[#0a1a10]" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <h1 className="text-lg font-black uppercase tracking-tighter">Hallo Fresh</h1>
                            <span className="text-[9px] font-black uppercase tracking-widest text-primary italic">
                                {profile?.role === 'vendor' ? 'Vendor Dashboard' : 'Customer Portal'}
                            </span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item, i) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={`flex w-full items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${isActive ? 'bg-primary/10 text-[#0a1a10] border-l-4 border-primary' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-slate-50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm w-full"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <div className="flex-1 lg:ml-[280px] min-h-screen flex flex-col">
                {/* Global Dashboard Header */}
                <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black tracking-tight text-[#0a1a10]">
                            {navItems.find(item => item.href === pathname)?.label || "Dashboard"}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block text-slate-400">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="w-64 h-11 bg-slate-50 border-none rounded-2xl pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[#0a1a10]"
                            />
                        </div>

                        <button className="relative w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 hover:text-[#0a1a10] transition-colors shadow-sm">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        <Link href="/profile" className="flex items-center gap-3 pl-6 border-l border-slate-100 cursor-pointer group">
                            <div className="flex flex-col items-end leading-none">
                                <span className="text-sm font-black text-[#0a1a10] group-hover:text-primary transition-colors">
                                    {profile?.name || user?.email?.split('@')[0]}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    {profile?.role === 'vendor' ? 'Verified Vendor' : 'Premium Member'}
                                </span>
                            </div>
                            <div className="w-11 h-11 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-md">
                                <img src={`https://ui-avatars.com/api/?name=${profile?.name || user?.email}&background=06f957&color=0a1a10`} alt="Avatar" />
                            </div>
                            <ChevronDown size={16} className="text-slate-400 group-hover:text-[#0a1a10] transition-colors" />
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>

                {/* Mobile Bottom Nav */}
                <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center z-50 lg:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                    {navItems.slice(0, 3).map((item, i) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={i} href={item.href} className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary font-black' : 'text-slate-300'}`}>
                                {item.icon}
                                <span className="text-[9px] font-black uppercase tracking-tighter leading-none">{item.label}</span>
                            </Link>
                        );
                    })}
                    <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-red-400">
                        <LogOut size={22} />
                        <span className="text-[9px] font-black uppercase tracking-tighter leading-none">Exit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

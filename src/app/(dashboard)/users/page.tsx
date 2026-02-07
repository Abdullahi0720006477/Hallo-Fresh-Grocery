"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
    Users,
    Search,
    UserPlus,
    MoreVertical,
    MessageSquare,
    Phone,
    MapPin,
    Star,
    ChevronRight,
    Filter,
    ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

const DEMO_USERS = [
    { id: 1, name: "Fresh Organics Ltd", role: "Vendor", status: "Verified", rating: 4.9, avatar: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=100", distance: "0.8 miles", active: true },
    { id: 2, name: "Sarah Jenkins", role: "Neighbor", status: "Preferred", rating: 5.0, avatar: "https://i.pravatar.cc/150?u=sarah", distance: "2 blocks", active: true },
    { id: 3, name: "Green Valley Farm", role: "Vendor", status: "Verified", rating: 4.7, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100", distance: "4.2 miles", active: false },
    { id: 4, name: "Mike Thompson", role: "Courier", status: "Top Rated", rating: 4.8, avatar: "https://i.pravatar.cc/150?u=mike", distance: "Active Now", active: true },
    { id: 5, name: "Daily Fresh", role: "Vendor", status: "Verified", rating: 4.5, avatar: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=100", distance: "1.5 miles", active: true },
];

export default function UsersPage() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = DEMO_USERS.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 md:p-12 space-y-8 max-w-[1400px] mx-auto pb-32 lg:pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                        <span>Dashboard</span>
                        <ChevronRight size={10} />
                        <span className="text-primary italic">My Network</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-[#0a1a10]">Connected Contacts</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest text-[10px]">Manage your vendors, couriers, and connections.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="h-12 w-64 bg-white border border-slate-100 rounded-2xl pl-12 pr-6 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="h-12 px-6 bg-primary text-[#0a1a10] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                        <UserPlus size={16} /> Add New
                    </button>
                </div>
            </div>

            {/* Network Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: "Active Connections", value: "18", icon: <Users size={18} />, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Verified Vendors", value: "12", icon: <ShieldCheck size={18} />, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Top Rated", value: "5", icon: <Star size={18} />, color: "text-amber-500", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                            <h4 className="text-xl font-black text-[#0a1a10]">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((u, i) => (
                    <motion.div
                        key={u.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-lg bg-slate-50">
                                    <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                                </div>
                                {u.active && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white" />
                                )}
                            </div>
                            <button className="p-2 text-slate-300 hover:text-[#0a1a10] transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="space-y-1 mb-8">
                            <div className="flex items-center gap-2">
                                <h4 className="text-xl font-black tracking-tighter text-[#0a1a10] uppercase italic leading-none">{u.name}</h4>
                                {u.status === 'Verified' && <ShieldCheck size={14} className="text-primary" />}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{u.role}</span>
                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                <div className="flex items-center gap-1 text-[10px] font-black text-amber-500">
                                    <Star size={10} fill="currentColor" /> {u.rating}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-2 text-slate-400">
                                <MapPin size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{u.distance}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <ShieldCheck size={14} className={u.status === 'Verified' ? 'text-emerald-500' : ''} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{u.status}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0a1a10] hover:bg-primary hover:border-primary transition-all">
                                <MessageSquare size={14} /> Chat
                            </button>
                            <button className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[#0a1a10] hover:bg-primary hover:border-primary transition-all">
                                <Phone size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[3rem] border border-slate-100 border-dashed">
                    <Users size={64} className="text-slate-100 mb-6" />
                    <h4 className="text-2xl font-black tracking-tighter text-[#0a1a10] uppercase italic">No connections found</h4>
                    <p className="text-sm font-bold text-slate-400 max-w-xs mt-2 italic">Try search for a specific name or browse different categories.</p>
                </div>
            )}
        </div>
    );
}

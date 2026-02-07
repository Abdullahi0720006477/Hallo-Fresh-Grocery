"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
    User,
    Mail,
    Phone,
    Store,
    Shield,
    Bell,
    Camera,
    ChevronRight,
    AlertTriangle,
    ToggleLeft as Toggle,
    CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const { user, profile } = useAuth();
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: profile?.name || "",
        email: profile?.email || user?.email || "",
        phone: profile?.phone || "",
        storeName: profile?.storeName || ""
    });

    const handleSave = async () => {
        setSaving(true);
        const { error } = await authService.updateProfile(user!.uid, formData);
        if (!error) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        setSaving(false);
    };

    return (
        <div className="p-8 md:p-12 space-y-8 max-w-[1000px] mx-auto pb-32 lg:pb-12">
            {/* Header / Breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                        <span>Dashboard</span>
                        <ChevronRight size={10} />
                        <span className="text-primary italic">Profile & Settings</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-[#0a1a10]">Profile & Settings</h3>
                </div>

                <div className="flex items-center gap-4">
                    <button className="h-12 px-6 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0a1a10] transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="h-12 px-8 bg-primary text-[#0a1a10] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-3 disabled:opacity-50"
                    >
                        {saving ? "Saving..." : success ? <><CheckCircle2 size={16} /> Saved</> : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Profile Avatar Section */}
            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
                <div className="relative group cursor-pointer mb-6">
                    <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                            <img src={`https://ui-avatars.com/api/?name=${formData.name || user?.email}&background=06f957&color=0a1a10&size=256`} alt="Avatar" />
                        </div>
                    </div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-primary rounded-full border-4 border-white flex items-center justify-center text-[#0a1a10] shadow-lg">
                        <Camera size={14} />
                    </div>
                </div>

                <h4 className="text-xl font-black tracking-tighter text-[#0a1a10] mb-1">{formData.name || "User Name"}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">User ID: {user?.uid?.slice(0, 8).toUpperCase()}</p>

                <div className="flex items-center gap-4">
                    <button className="h-10 px-6 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0a1a10] hover:bg-slate-100 transition-all">Upload New Photo</button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 transition-all">Remove</button>
                </div>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 gap-8">
                {/* Personal Information */}
                <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <User size={20} />
                        </div>
                        <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] uppercase italic">Personal Information</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-[#0a1a10] focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-[#0a1a10] focus:ring-4 focus:ring-primary/5 transition-all outline-none opacity-60 cursor-not-allowed"
                                value={formData.email}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-[#0a1a10] focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Store Name (Optional)</label>
                            <input
                                type="text"
                                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold text-[#0a1a10] focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                value={formData.storeName}
                                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                                placeholder="If applicable"
                            />
                        </div>
                    </div>
                </div>

                {/* Account Security & Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Account Security */}
                    <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                                <Shield size={20} />
                            </div>
                            <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] uppercase italic">Account Security</h4>
                        </div>
                        <p className="text-xs font-bold text-emerald-600/60 mb-8">Keep your account safe by updating your password regularly.</p>

                        <div className="space-y-6 mt-auto">
                            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Password</p>
                                    <p className="text-xs font-bold text-[#0a1a10]">Last changed 3 months ago</p>
                                </div>
                                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Change</button>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Two-Factor Auth</p>
                                    <p className="text-xs font-bold text-[#0a1a10]">Currently Enabled</p>
                                </div>
                                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                                <Bell size={20} />
                            </div>
                            <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] uppercase italic">Notifications</h4>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: "Order Updates", desc: "Receive alerts for new and fulfilled orders.", active: true },
                                { label: "Marketing Offers", desc: "Updates about new platform features.", active: false },
                                { label: "SMS Notifications", desc: "Direct delivery alerts to your phone.", active: true },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-black text-[#0a1a10]">{item.label}</p>
                                        <p className="text-[10px] font-bold text-slate-400">{item.desc}</p>
                                    </div>
                                    <div className={`w-12 h-6 ${item.active ? 'bg-primary' : 'bg-slate-100'} rounded-full relative cursor-pointer`}>
                                        <div className={`absolute ${item.active ? 'right-1' : 'left-1'} top-1 w-4 h-4 bg-white rounded-full shadow-sm`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 rounded-[3rem] border border-red-100 p-10 shadow-sm border-dashed">
                    <div className="flex items-center gap-3 mb-6 text-red-500">
                        <AlertTriangle size={20} />
                        <h4 className="text-lg font-black tracking-tighter uppercase italic">Danger Zone</h4>
                    </div>
                    <p className="text-sm font-bold text-red-800/60 mb-8 max-w-xl">Deleting your account is permanent and cannot be undone. All store data, order history, and personal settings will be lost forever.</p>
                    <button className="h-14 px-10 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20">
                        Deactivate Account
                    </button>
                </div>
            </div>

            <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-12 pb-8 border-t border-slate-50">
                © 2024 Hallo Fresh Platform. All Rights Reserved. Dashboard Version 2.4.1
            </p>
        </div>
    );
}

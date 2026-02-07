"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
    Settings,
    Bell,
    Shield,
    Lock,
    Globe,
    CreditCard,
    ChevronRight,
    User,
    Smartphone,
    CheckCircle2,
    AlertCircle,
    Eye,
    LogOut,
    Mail,
    Moon
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const { user, profile } = useAuth();
    const [activeTab, setActiveTab] = useState("general");
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const tabs = [
        { id: "general", label: "General", icon: <Settings size={18} /> },
        { id: "security", label: "Security", icon: <Lock size={18} /> },
        { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
        { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
    ];

    const handleSave = async () => {
        setSaving(true);
        // Simulate local save for UI feedback
        setTimeout(() => {
            setSaving(false);
            setSuccessMessage("Preferences updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        }, 1000);
    };

    return (
        <div className="p-8 md:p-12 space-y-8 max-w-[1200px] mx-auto pb-32 lg:pb-12 font-manrope">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                        <span>Dashboard</span>
                        <ChevronRight size={10} />
                        <span className="text-primary italic">Settings</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-[#0a1a10]">Account Settings</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">Manage your preferences and security.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="h-12 px-8 bg-primary text-[#0a1a10] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-3 disabled:opacity-50"
                    >
                        {saving ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Tabs Sidebar */}
                <aside className="lg:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex w-full items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === tab.id ? 'bg-[#0a1a10] text-white shadow-xl shadow-black/10' : 'text-slate-400 hover:bg-white hover:text-[#0a1a10]'}`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs font-black uppercase tracking-widest flex items-center gap-3"
                        >
                            <CheckCircle2 size={18} />
                            {successMessage}
                        </motion.div>
                    )}

                    {/* General Section */}
                    {activeTab === "general" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                                <h4 className="text-lg font-black uppercase tracking-tighter italic text-[#0a1a10] mb-8">Localization</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Language</label>
                                        <div className="relative">
                                            <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <select className="w-full h-14 bg-slate-50 border-none rounded-2xl pl-14 pr-6 text-sm font-bold text-[#0a1a10] appearance-none focus:ring-4 focus:ring-primary/5 outline-none">
                                                <option>English (United States)</option>
                                                <option>Spanish (Latin America)</option>
                                                <option>French (France)</option>
                                                <option>Arabic (Saudi Arabia)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Currency</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <select className="w-full h-14 bg-slate-50 border-none rounded-2xl pl-14 pr-6 text-sm font-bold text-[#0a1a10] appearance-none focus:ring-4 focus:ring-primary/5 outline-none">
                                                <option>USD ($) - US Dollar</option>
                                                <option>EUR (€) - Euro</option>
                                                <option>GBP (£) - British Pound</option>
                                                <option>SAR (SR) - Saudi Riyal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                                <h4 className="text-lg font-black uppercase tracking-tighter italic text-[#0a1a10] mb-8">Interface</h4>
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-primary/20 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0a1a10] shadow-sm">
                                            <Moon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-[#0a1a10]">Dark Mode</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adjust the application appearance</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-slate-200 rounded-full relative shadow-inner">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Security Section */}
                    {activeTab === "security" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                                        <Shield size={20} />
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-tighter italic text-[#0a1a10]">Account Security</h4>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <div>
                                            <p className="text-sm font-black text-[#0a1a10]">Change Password</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last changed 3 months ago</p>
                                        </div>
                                        <button className="h-10 px-6 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0a1a10] hover:bg-slate-100 transition-all">Update</button>
                                    </div>
                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <div>
                                            <p className="text-sm font-black text-[#0a1a10]">Two-Factor Authentication</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add an extra layer of security</p>
                                        </div>
                                        <button className="h-10 px-6 bg-primary text-[#0a1a10] rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Enable</button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                                <h4 className="text-lg font-black uppercase tracking-tighter italic text-[#0a1a10] mb-8">Device Activity</h4>
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Smartphone className="text-slate-300" />
                                        <div>
                                            <p className="text-sm font-black text-[#0a1a10]">iPhone 15 Pro</p>
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Current Device • London, UK</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Active Now</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Section */}
                    {activeTab === "notifications" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                                <h4 className="text-lg font-black uppercase tracking-tighter italic text-[#0a1a10] mb-8">Platform Notifications</h4>
                                <div className="space-y-8">
                                    {[
                                        { label: "Order Status Updates", desc: "Get notified when your order is out for delivery", icon: <Package size={18} /> },
                                        { label: "Promotional Offers", desc: "Weekly discounts and premium member deals", icon: <Smartphone size={18} /> },
                                        { label: "Security Alerts", desc: "Important notices about your account health", icon: <Shield size={18} /> },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-[#0a1a10]">{item.label}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Billing Section */}
                    {activeTab === "billing" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <div className="bg-[#0a1a10] rounded-[3rem] p-12 text-white relative overflow-hidden">
                                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div>
                                        <span className="px-4 py-1.5 bg-primary/20 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary italic mb-6 inline-block">Pro Active</span>
                                        <h4 className="text-4xl font-black tracking-tighter uppercase italic leading-[0.8] mb-2">Priority <span className="text-primary not-italic">Pass</span></h4>
                                        <p className="text-[#8ecca3] font-bold text-sm">Next billing cycle: Dec 12, 2024</p>
                                    </div>
                                    <button className="h-16 px-10 bg-white text-[#0a1a10] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Manage Subscription</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                                <h4 className="text-lg font-black uppercase tracking-tighter italic text-[#0a1a10] mb-8">Payment Methods</h4>
                                <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-all cursor-pointer">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4 group-hover:text-primary transition-colors">
                                        <PlusIcon size={32} />
                                    </div>
                                    <p className="text-sm font-black text-[#0a1a10]">Add New Payment Method</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Visa, Mastercard, or Apple Pay</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

const PlusIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const Package = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
);

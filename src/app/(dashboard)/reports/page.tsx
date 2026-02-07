"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { orderService, Order } from "@/services/order.service";
import {
    TrendingUp,
    PieChart,
    BarChart3,
    Calendar,
    ChevronRight,
    RefreshCcw,
    Loader2,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Package,
    Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        if (!user) return;
        setLoading(true);
        const { orders: fetchedOrders } = await orderService.getUserOrders(user.uid);
        setOrders(fetchedOrders);
        setLoading(false);
    };

    useEffect(() => {
        if (user) loadData();
    }, [user]);

    // Analytics Calculation
    const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const deliveryRate = orders.length > 0 ? (deliveredOrders / orders.length) * 100 : 0;

    const stats = [
        { label: "Total Spending", value: `$${totalRevenue.toFixed(2)}`, trend: "+12.5%", icon: <DollarSign size={20} />, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Avg. Order", value: `$${avgOrderValue.toFixed(2)}`, trend: "+3.2%", icon: <TrendingUp size={20} />, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Success Rate", value: `${deliveryRate.toFixed(1)}%`, trend: "High", icon: <Package size={20} />, color: "text-primary", bg: "bg-primary/10" },
        { label: "Store Visits", value: "24", trend: "-2.1%", icon: <Users size={20} />, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Generating Analytics...</p>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-12 space-y-8 max-w-[1400px] mx-auto pb-32 lg:pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                        <span>Dashboard</span>
                        <ChevronRight size={10} />
                        <span className="text-primary italic">Detailed Reports</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-[#0a1a10]">Performance Insights</h3>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-12 px-6 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 text-xs font-bold text-slate-500">
                        <Calendar size={16} />
                        <span>Last 30 Days</span>
                    </div>
                    <button
                        onClick={loadData}
                        className="h-12 w-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all"
                    >
                        <RefreshCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                                {stat.icon}
                            </div>
                            <span className={`flex items-center gap-1 text-[10px] font-black rounded-full px-3 py-1.5 ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-500' :
                                    stat.trend.startsWith('-') ? 'bg-red-50 text-red-500' :
                                        'bg-blue-50 text-blue-500'
                                }`}>
                                {stat.trend.startsWith('+') ? <ArrowUpRight size={12} /> : stat.trend.startsWith('-') ? <ArrowDownRight size={12} /> : null}
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">{stat.label}</p>
                        <h4 className="text-4xl font-black tracking-tighter text-[#0a1a10]">{stat.value}</h4>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Spending Chart Mockup */}
                <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] uppercase italic">Spending Overview</h4>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Monthly transaction history</p>
                        </div>
                        <div className="flex gap-2">
                            {['Income', 'Spent'].map((label, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-blue-400'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-[300px] w-full flex items-end justify-between gap-4 px-4">
                        {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div className="relative w-full">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ delay: 0.5 + (i * 0.05), duration: 0.8, ease: "circOut" }}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-t-xl group-hover:bg-primary/20 group-hover:border-primary/30 transition-all relative"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0a1a10] text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            $2.4k
                                        </div>
                                    </motion.div>
                                </div>
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                                    {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories Breakdown */}
                <div className="bg-[#0a1a10] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-12">
                            <h4 className="text-lg font-black tracking-tighter uppercase italic">Category Split</h4>
                            <PieChart size={20} className="text-primary" />
                        </div>

                        <div className="space-y-8">
                            {[
                                { label: "Grocery", value: 65, color: "bg-primary" },
                                { label: "Electronics", value: 15, color: "bg-blue-400" },
                                { label: "Pharmacy", value: 12, color: "bg-amber-400" },
                                { label: "Other", value: 8, color: "bg-slate-600" },
                            ].map((cat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                        <span className="opacity-60">{cat.label}</span>
                                        <span>{cat.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${cat.value}%` }}
                                            transition={{ delay: 1 + (i * 0.1), duration: 0.8 }}
                                            className={`h-full ${cat.color} rounded-full shadow-[0_0_10px_rgba(6,249,87,0.3)]`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-6 bg-white/5 border border-white/5 rounded-[2rem] backdrop-blur-xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Smart Insight</p>
                            <p className="text-xs font-bold text-white/60 leading-relaxed italic">
                                Your grocery spending is 12% higher than last month. Consider bulk buying for better value.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                            <BarChart3 size={24} />
                        </div>
                        <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] uppercase italic">Order Frequency</h4>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Weekly Avg</p>
                            <h5 className="text-2xl font-black tracking-tighter text-[#0a1a10]">2.4 Orders</h5>
                        </div>
                        <div className="flex-1 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Peak Day</p>
                            <h5 className="text-2xl font-black tracking-tighter text-[#0a1a10]">Friday</h5>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] uppercase italic">Savings Wallet</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">You saved $124.50 this year</p>
                        </div>
                    </div>
                    <button className="h-12 px-6 bg-[#0a1a10] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-[#0a1a10] transition-all">
                        View Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}

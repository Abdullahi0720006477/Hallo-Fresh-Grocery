"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { orderService, Order } from "@/services/order.service";
import {
    ShoppingBag,
    Truck,
    Wallet,
    MapPin,
    MoreVertical,
    ShoppingCart,
    Plus,
    RefreshCcw,
    Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
    const { user, profile } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [statsData, setStatsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        if (!user) return;
        setLoading(true);
        const { orders: fetchedOrders } = await orderService.getUserOrders(user.uid);
        const { stats } = await orderService.getUserStats(user.uid);

        setOrders(fetchedOrders.slice(0, 5)); // Show only top 5 on dashboard
        setStatsData(stats);
        setLoading(false);
    };

    useEffect(() => {
        if (user) loadData();
    }, [user]);

    const handleSeedData = async () => {
        if (!user) return;
        setLoading(true);
        await orderService.seedDemoOrders(user.uid);
        await loadData();
    };

    const stats = [
        { label: "Total Orders", value: statsData?.totalOrders || "0", icon: <ShoppingCart className="text-blue-500" />, trend: "+0%", color: "bg-blue-50" },
        { label: "Active Orders", value: statsData?.activeOrders || "0", icon: <Truck className="text-primary" />, trend: "Live", color: "bg-primary/10" },
        { label: "Wallet Balance", value: `$${statsData?.totalSpent.toFixed(2) || "0.00"}`, icon: <Wallet className="text-emerald-500" />, trend: "0%", color: "bg-emerald-50" },
        { label: "Saved Addresses", value: "0", icon: <MapPin className="text-orange-500" />, trend: "+0", color: "bg-orange-50" },
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Syncing with Firebase...</p>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-12 space-y-8 max-w-[1400px] mx-auto pb-32 lg:pb-12">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-[#0a1a10] flex items-center gap-3">
                        Welcome back, {profile?.name || user?.email?.split('@')[0]}! 👋
                    </h3>
                    <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Your personal dashboard is synced and live.</p>
                </div>

                {orders.length === 0 && (
                    <button
                        onClick={handleSeedData}
                        className="flex items-center gap-3 px-6 h-12 bg-primary text-[#0a1a10] rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus size={16} /> Seed Demo Orders
                    </button>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            <span className={`text-[10px] font-black rounded-full px-3 py-1 ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-500' : stat.trend === 'Live' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-black tracking-tighter text-[#0a1a10]">{stat.value}</h4>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-slate-50">
                    <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] italic uppercase">Recent Orders</h4>
                    <button
                        onClick={loadData}
                        className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline italic"
                    >
                        <RefreshCcw size={12} /> Refresh
                    </button>
                </div>

                <div className="overflow-x-auto">
                    {orders.length > 0 ? (
                        <table className="w-full text-left min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    {["Order ID", "Date", "Vendor", "Status", "Total", "Actions"].map((head) => (
                                        <th key={head} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {orders.map((order, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5 text-sm font-black text-[#0a1a10]">{order.id}</td>
                                        <td className="px-8 py-5 text-sm font-bold text-slate-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <ShoppingBag size={14} className="text-slate-400" />
                                                </div>
                                                <span className="text-sm font-black text-[#0a1a10]">{order.vendorName}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                    order.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                                                        'bg-amber-50 text-amber-600'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-[#0a1a10]">${order.total.toFixed(2)}</td>
                                        <td className="px-8 py-5">
                                            <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-300 hover:text-[#0a1a10]">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                                <Package size={40} />
                            </div>
                            <h5 className="text-xl font-black tracking-tighter text-[#0a1a10] mb-1 italic uppercase">No orders found</h5>
                            <p className="text-sm font-bold text-slate-400 max-w-xs">Your order history is currently empty. Start shopping to fill this space!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

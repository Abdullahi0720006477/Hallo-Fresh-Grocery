"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { orderService, Order } from "@/services/order.service";
import {
    ShoppingBag,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    Clock,
    CheckCircle2,
    Package,
    XCircle,
    Truck,
    RefreshCcw,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const loadOrders = async () => {
        if (!user) return;
        setLoading(true);
        const { orders: fetchedOrders } = await orderService.getUserOrders(user.uid);
        setOrders(fetchedOrders);
        setLoading(false);
    };

    useEffect(() => {
        if (user) loadOrders();
    }, [user]);

    const activeOrdersCount = orders.filter(o => o.status === 'In Progress' || o.status === 'Pending').length;
    const completedCount = orders.filter(o => o.status === 'Delivered').length;
    const cancelledCount = orders.filter(o => o.status === 'Cancelled').length;

    const filteredOrders = orders.filter(o =>
        o.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Delivered": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "In Progress": return "bg-blue-50 text-blue-600 border-blue-100";
            case "Pending": return "bg-amber-50 text-amber-600 border-amber-100";
            case "Cancelled": return "bg-red-50 text-red-600 border-red-100";
            default: return "bg-slate-50 text-slate-600 border-slate-100";
        }
    };

    if (loading && orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Fetching Order History...</p>
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
                        <span className="text-primary italic">Order History</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-[#0a1a10]">My Orders</h3>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find an order..."
                            className="h-12 w-64 bg-white border border-slate-100 rounded-2xl pl-12 pr-6 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={loadOrders}
                        className="h-12 w-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all"
                    >
                        <RefreshCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: "Active Orders", value: activeOrdersCount, icon: <Truck size={20} />, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Completed", value: completedCount, icon: <CheckCircle2 size={20} />, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Cancelled", value: cancelledCount, icon: <XCircle size={20} />, color: "text-red-500", bg: "bg-red-50" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6"
                    >
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                            <h4 className="text-2xl font-black tracking-tighter text-[#0a1a10]">{stat.value}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <Package size={32} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-lg font-black tracking-tighter text-[#0a1a10] uppercase italic">{order.vendorName}</h4>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <span>{order.id}</span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <span>{order.itemsCount} Items</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between lg:justify-end gap-12 pl-2 lg:pl-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Total Amount</p>
                                        <p className="text-2xl font-black tracking-tighter text-[#0a1a10]">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="h-12 px-6 bg-[#0a1a10] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-[#0a1a10] transition-all">
                                            Track Order
                                        </button>
                                        <button className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#0a1a10] transition-all">
                                            <MoreVertical size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                        <ShoppingBag size={64} className="text-slate-100 mb-6" />
                        <h4 className="text-2xl font-black tracking-tighter text-[#0a1a10] uppercase italic">No orders found</h4>
                        <p className="text-sm font-bold text-slate-400 max-w-xs mt-2">Try adjusting your search or start adding fresh groceries to your cart!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

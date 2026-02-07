"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Diamond,
    Chrome,
    Apple,
    ShieldCheck,
    Star,
    Zap,
    CheckCircle2
} from "lucide-react";
import { authService } from "@/services/auth.service";

const Logo = () => (
    <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(6,249,87,0.3)]">
            <Diamond size={24} fill="#0a1a10" stroke="#0a1a10" />
        </div>
        <div className="flex flex-col">
            <h1 className="text-xl font-black italic uppercase tracking-tighter leading-none italic text-[#0a1a10]">Hallo Fresh</h1>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-40 leading-none">Grocery</span>
        </div>
    </div>
);

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { user, error: authError } = await authService.login(formData.email, formData.password);

        if (authError) {
            setError(authError);
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error: authError } = await authService.loginWithGoogle();
        if (authError) {
            setError(authError);
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    const handleAppleLogin = async () => {
        setLoading(true);
        const { error: authError } = await authService.loginWithApple();
        if (authError) {
            setError(authError);
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white font-manrope">
            {/* --- Left Side: Welcome Back --- */}
            <div className="flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden order-2 lg:order-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-[440px]"
                >
                    <Logo />

                    <div className="mb-10">
                        <h2 className="text-4xl font-black tracking-tighter text-[#0a1a10] mb-3 uppercase italic leading-[0.9]">
                            Welcome <br /> <span className="text-primary not-italic">Back Home.</span>
                        </h2>
                        <p className="text-sm font-bold text-slate-400 italic tracking-tight">Access your premium grocery ecosystem.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-5 bg-red-50 rounded-2xl text-red-500 text-xs font-bold border border-red-100 flex items-center gap-3"
                        >
                            <ShieldCheck size={18} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    required
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full h-14 bg-[#f8faf9] border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-[#0a1a10] placeholder:text-slate-300"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
                                <Link href="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline italic">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full h-14 bg-[#f8faf9] border border-slate-100 rounded-2xl pl-14 pr-14 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-[#0a1a10] placeholder:text-slate-300"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-[#0a1a10] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all hover:bg-primary hover:text-[#0a1a10] hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/5 disabled:opacity-50 group"
                        >
                            {loading ? "Authorizing..." : (
                                <>
                                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-10 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-50"></div>
                        </div>
                        <span className="relative px-6 bg-white text-[10px] font-black uppercase tracking-widest text-slate-300">
                            Secure Authentication
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="flex h-14 items-center justify-center gap-3 bg-white border-2 border-slate-50 rounded-2xl hover:border-primary/20 transition-all font-bold text-xs text-[#0a1a10]"
                        >
                            <Chrome size={18} />
                            Google
                        </button>
                        <button
                            onClick={handleAppleLogin}
                            className="flex h-14 items-center justify-center gap-3 bg-white border-2 border-slate-50 rounded-2xl hover:border-primary/20 transition-all font-bold text-xs text-[#0a1a10]">
                            <Apple size={18} fill="currentColor" />
                            Apple
                        </button>
                    </div>

                    <div className="mt-12 text-center text-sm font-bold text-slate-400">
                        New to Hallo Fresh?{" "}
                        <Link href="/register" className="text-primary hover:underline font-black uppercase tracking-widest text-[10px] ml-2 italic">
                            Create Account &rarr;
                        </Link>
                    </div>
                </motion.div>

                {/* Help Bubble (Mobile & Desktop) */}
                <button className="fixed bottom-10 right-10 bg-white shadow-xl px-6 py-3 rounded-full flex lg:hidden items-center gap-3 hover:scale-105 transition-all text-[#0a1a10] font-black text-xs border border-slate-100 relative group z-50">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-[#0a1a10]">?</div>
                    Help
                </button>
            </div>

            {/* --- Right Side: The Masterpiece Image --- */}
            <div className="relative hidden lg:flex flex-col justify-end p-20 overflow-hidden order-1 lg:order-2 bg-[#0a1a10]">
                {/* Background Image - Fresh Delicious Meal / Luxury Food */}
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500"
                    alt="Premium Food Delivery"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay scale-125 hover:scale-110 transition-transform duration-[10s]"
                />

                {/* Visual Depth Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />

                <div className="relative z-10 max-w-lg">
                    <div className="flex gap-2 mb-8">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="#06f957" className="text-primary" />)}
                    </div>

                    <h3 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-8">
                        Excellence <br /> <span className="text-primary not-italic">Delivered</span> <br /> to your door.
                    </h3>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Zap className="text-primary mb-2" size={32} />
                            <p className="text-white font-black uppercase italic tracking-widest text-xs">Insta-Sync</p>
                            <p className="text-[#8ecca3] text-xs font-bold opacity-60">Real-time rider tracking with sub-second precision.</p>
                        </div>
                        <div className="space-y-2">
                            <CheckCircle2 className="text-primary mb-2" size={32} />
                            <p className="text-white font-black uppercase italic tracking-widest text-xs">Chef Curated</p>
                            <p className="text-[#8ecca3] text-xs font-bold opacity-60">Verified restaurants and boutique grocery stores only.</p>
                        </div>
                    </div>

                    <div className="mt-16 pt-10 border-t border-white/10 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[11, 12, 13, 14].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a1a10] bg-slate-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-[#0a1a10] bg-primary text-[#0a1a10] flex items-center justify-center font-black text-[10px]">
                                12K+
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ecca3]">Active in your neighborhood</p>
                    </div>
                </div>

                {/* Floating "Premium" Badge */}
                <div className="absolute top-20 left-20 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-5 rounded-[2.5rem] transform -rotate-12 hover:rotate-0 transition-transform cursor-default">
                    <p className="text-primary font-black text-4xl italic tracking-tighter leading-none mb-1">PRO</p>
                    <p className="text-white font-black uppercase tracking-widest text-[11px]">Priority Support Active</p>
                </div>

                {/* Help Bubble (Right Side for Desktop) */}
                <button className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 hover:scale-105 transition-all text-white font-black text-xs group">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-[#0a1a10]">?</div>
                    Live Support
                </button>
            </div>
        </div>
    );
}

// Sub-components used locally (re-defined to ensure zero-import errors)
const LinkProps = null; 

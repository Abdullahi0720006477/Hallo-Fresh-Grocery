"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Mail,
    ArrowRight,
    Diamond,
    ChevronLeft,
    CheckCircle2
} from "lucide-react";
import { authService } from "@/services/auth.service";

const Logo = () => (
    <div className="flex flex-col items-center gap-2 mb-8">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,249,87,0.3)] group transition-transform hover:scale-110">
            <Diamond size={32} fill="#0a1a10" stroke="#0a1a10" className="group-hover:rotate-12 transition-transform" />
        </div>
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none italic text-[#0a1a10]">Hallo Fresh</h1>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 leading-none">Grocery</span>
        </div>
    </div>
);

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error: resetError } = await authService.resetPassword(email);

        if (resetError) {
            setError(resetError);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] p-8 md:p-12 relative z-10"
            >
                <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-8">
                    <ChevronLeft size={16} />
                    Back to Login
                </Link>

                <Logo />

                {!success ? (
                    <>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black tracking-tighter text-[#0a1a10] mb-2">Forgot Password</h2>
                            <p className="text-sm font-bold text-slate-400">Enter your email to reset your password</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-50 rounded-2xl text-red-500 text-xs font-bold border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full h-14 bg-[#f8faf9] border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-[#0a1a10]"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-primary text-[#0a1a10] rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_15px_30px_-5px_rgba(6,249,87,0.4)] disabled:opacity-50 disabled:grayscale"
                            >
                                {loading ? "Sending..." : (
                                    <>
                                        Reset Password <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8"
                    >
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter text-[#0a1a10] mb-4">Check your email</h2>
                        <p className="text-sm font-bold text-slate-400 mb-8 leading-relaxed">
                            We&apos;ve sent a password reset link to <br />
                            <span className="text-[#0a1a10]">{email}</span>
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex h-14 w-full items-center justify-center bg-[#0a1a10] text-white rounded-2xl font-black uppercase tracking-widest text-xs gap-3 hover:scale-[1.02] transition-all"
                        >
                            Back to Sign In
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

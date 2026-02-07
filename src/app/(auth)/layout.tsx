"use client";

import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f8faf9] text-slate-900 font-display">
            {children}
        </div>
    );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async (uid: string) => {
        try {
            // Using a simple cache to avoid repeated offline errors if we already have the profile
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setProfile(data);
                // Save to local storage as an emergency backup for when Firestore is strictly offline
                localStorage.setItem(`hallo_profile_${uid}`, JSON.stringify(data));
                return data;
            }
        } catch (err: any) {
            console.warn("Could not fetch real-time profile, checking local backup:", err.message);
            // Try to load from backup if strictly offline
            const backup = localStorage.getItem(`hallo_profile_${uid}`);
            if (backup) {
                const data = JSON.parse(backup);
                setProfile(data);
                return data;
            }
            setError(err.message);
        }
        return null;
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                await fetchProfile(firebaseUser.uid);
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [fetchProfile]);

    return { user, profile, loading, error, refreshProfile: () => user && fetchProfile(user.uid) };
}

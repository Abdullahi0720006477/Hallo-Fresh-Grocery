import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    User
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const authService = {
    // Login with email and password
    async login(email: string, pass: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            return { user: userCredential.user, error: null };
        } catch (error: any) {
            return { user: null, error: error.message };
        }
    },

    // Register with email and password
    async register(email: string, pass: string, name: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            // Create user profile in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                role: "user",
                createdAt: new Date().toISOString()
            });

            return { user, error: null };
        } catch (error: any) {
            return { user: null, error: error.message };
        }
    },

    // Logout
    async logout() {
        try {
            await signOut(auth);
            return { error: null };
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Google Login
    async loginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore, if not create
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    role: "user",
                    createdAt: new Date().toISOString()
                });
            }

            return { user, error: null };
        } catch (error: any) {
            return { user: null, error: error.message };
        }
    },

    // Reset Password
    async resetPassword(email: string) {
        try {
            const { sendPasswordResetEmail } = await import("firebase/auth");
            await sendPasswordResetEmail(auth, email);
            return { error: null };
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Apple Login
    async loginWithApple() {
        try {
            const { OAuthProvider } = await import("firebase/auth");
            const provider = new OAuthProvider('apple.com');
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: user.displayName || "Apple User",
                    email: user.email,
                    role: "user",
                    createdAt: new Date().toISOString()
                });
            }

            return { user, error: null };
        } catch (error: any) {
            return { user: null, error: error.message };
        }
    },

    // Update Profile
    async updateProfile(uid: string, data: any) {
        try {
            await setDoc(doc(db, "users", uid), data, { merge: true });
            return { error: null };
        } catch (error: any) {
            return { error: error.message };
        }
    }
};

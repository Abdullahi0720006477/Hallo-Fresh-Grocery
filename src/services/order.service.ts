import { db } from "@/lib/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    Timestamp,
    addDoc
} from "firebase/firestore";

export interface Order {
    id: string;
    docId: string;
    userId: string;
    vendorName: string;
    status: 'Pending' | 'In Progress' | 'Delivered' | 'Cancelled';
    total: number;
    createdAt: string;
    itemsCount: number;
    type: string;
}

export const orderService = {
    // Fetch all orders for a specific user
    async getUserOrders(userId: string) {
        try {
            const ordersRef = collection(db, "orders");
            const q = query(
                ordersRef,
                where("userId", "==", userId)
            );

            const querySnapshot = await getDocs(q);
            const orders: Order[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                orders.push({
                    docId: doc.id,
                    id: data.orderId || `#${doc.id.slice(0, 8).toUpperCase()}`,
                    userId: data.userId,
                    vendorName: data.vendorName,
                    status: data.status,
                    total: data.total,
                    createdAt: data.createdAt,
                    itemsCount: data.itemsCount,
                    type: data.type
                });
            });

            // Sort in memory to avoid index requirements
            orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            return { orders, error: null };
        } catch (error: any) {
            console.error("Error fetching orders:", error);
            return { orders: [], error: error.message };
        }
    },

    // Get user stats (orders count, wallet total, etc)
    async getUserStats(userId: string) {
        try {
            const { orders } = await this.getUserOrders(userId);

            const stats = {
                totalOrders: orders.length,
                activeOrders: orders.filter(o => o.status === 'In Progress' || o.status === 'Pending').length,
                completedOrders: orders.filter(o => o.status === 'Delivered').length,
                totalSpent: orders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.total, 0),
                addressesCount: 0 // This would come from a different collection
            };

            return { stats, error: null };
        } catch (error: any) {
            return { stats: null, error: error.message };
        }
    },

    // Seed some initial data if needed (Helper for the user)
    async seedDemoOrders(userId: string) {
        const demoOrders = [
            { userId, vendorName: "Fresh Market", status: "Delivered", total: 45.00, itemsCount: 4, type: "Grocery", createdAt: new Date().toISOString(), orderId: "#ORD-94821" },
            { userId, vendorName: "Green Grocery", status: "In Progress", total: 32.40, itemsCount: 2, type: "Fresh", createdAt: new Date().toISOString(), orderId: "#ORD-94822" },
        ];

        for (const order of demoOrders) {
            await addDoc(collection(db, "orders"), order);
        }
    }
};

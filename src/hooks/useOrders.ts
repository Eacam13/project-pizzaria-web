// src/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import { fetchOrders } from '@/functions/orders';
import { OrderProps } from '@/app/dashboard/dashboardClient';

export function useOrders() {
    const [orders, setOrders] = useState<OrderProps[]>([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await fetchOrders();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } 
        };

        loadOrders();
    }, []);

    return { orders, setOrders };
}

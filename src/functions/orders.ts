// src/utils/orderUtils.ts
import { apiClient } from '@/service/apiClient';

export async function fetchOrders() {
    return apiClient.get('/orders');
}

export async function fetchOrderDetails(orderId: string) {
    return apiClient.get('/order/detail', {
        params: { order_id: orderId }
    });
}

export async function finishOrder(orderId: string) {
    return apiClient.put('/order/finish', { order_id: orderId });
}

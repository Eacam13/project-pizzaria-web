"use client";

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/service/apiClient';
import { parseCookies } from 'nookies';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { signOut } from '@/functions/signOut';
import { Header } from '@/components/header';
import { FiRefreshCw } from 'react-icons/fi';
import styles from './styles.module.scss'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { ModalOrder } from '@/components/modal';

export type OrderProps = {
    id: string;
    table: string;
    status: boolean;
    draft: boolean;
    name: string | null;
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    created_at: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function DashboardClient() {

    const { setUser, user } = useAuthContext()
    const [orders, setOrders] = useState<OrderProps[]>([])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    // console.log('Alguem logado?', user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { '@pizzaria.token': token } = parseCookies();

                if (token) {
                    // Buscar informações do usuário
                    await apiClient.get('/me').then(response => {
                        const { id, name, email } = response.data;
                        setUser({ id, name, email });
                    });

                    // Buscar pedidos
                    const ordersResponse = await apiClient.get('/orders');
                    setOrders(ordersResponse.data);
                    console.log('Dados',ordersResponse.data)
                } else {
                    signOut();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                signOut();
            } finally {
            
            }
        };

        fetchData();
    }, []);

    function handleCloseModal(){
        setModalVisible(false)
    }
    async function handleOpenModalView(id: string) {
        console.log('Fetching details for order ID:', id); // Adicione este log
        try {
            const response = await apiClient.get("/order/detail", {
                params: {
                    order_id: id
                }
            });
    
            if (response.data && response.data.length > 0) {
                setModalItem(response.data);
                console.log('DATA', response.data);
                setModalVisible(true);
            } else {
                toast.warn('No details found for this order.');
                // Opcionalmente, você pode mostrar uma mensagem ao usuário
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
            // Opcionalmente, você pode mostrar uma mensagem de erro ao usuário
        }
    }

    async function handleFinishOrder(id: string) {
        await apiClient.put("/order/finish", {
            order_id: id
        });
        const response = await apiClient.get("/orders")
        setOrders(response.data)
        setModalVisible(false)
    }

    async function handleRefleshOrders(){
        const response = await apiClient.get("/orders")
        setOrders(response.data)
    }

    Modal.setAppElement("#modal-root")

    return (
        <>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={handleRefleshOrders}>
                        <FiRefreshCw color='#3fffa3' size={24} />
                    </button>
                </div>
                <article className={styles.listOrders}>
                    {
                        orders.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhum pedido em andamento
                            </span>
                        )
                    }
                    {orders.map(item => (
                        <section key={item.id} className={styles.orderItem}>
                            <button onClick={() => handleOpenModalView(item.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>

            {modalVisible && (
                <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                    handleOrderFinish={handleFinishOrder}
                />
            )}
                
        </>
    );
}

"use client"; // Garanta que o código do cliente funcione corretamente

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importa o useRouter para redirecionamento
import styles from './styles.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from '@/functions/signOut'; // Atualize para refletir a mudança no nome da função

export function Header() {
    const router = useRouter(); // Cria uma instância do useRouter

    const handleSignOut = () => {
        signOut(); // Remove o cookie
        router.push('/'); // Redireciona para a página inicial após o logout
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" alt="Logo Pizzaria" />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        Categoria
                    </Link>
                    <Link href="/product">
                        Cardápio
                    </Link>

                    <button 
                        onClick={handleSignOut}
                    >
                        <FiLogOut color='#f3ecec' size={20} />
                    </button>
                </nav>
            </div>
        </header>
    );
}

"use client";

import { apiClient } from '@/service/apiClient';
import { parseCookies } from 'nookies';
import React, { useEffect, useState, FormEvent } from 'react';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { signOut } from '@/functions/signOut';
import { Header } from '@/components/header';
import styles from './styles.module.scss'
import { toast } from 'react-toastify';

export function CategoryClient() {

    const { setUser, user } = useAuthContext()
    const [category, setCategory] = useState('')

    async function handleRegister(e: FormEvent){
        e.preventDefault()
        await apiClient.post('/category', {
            name: category
        })

        toast.success('Cadastrado com sucesso')
        setCategory('')
    }

    return (
        <>
            <Header />
            <main className={styles.container}>
                <h1>Cadatrar Categoria</h1>

                <form 
                    className={styles.form}
                    onSubmit={handleRegister}
                >
                    <input 
                        type="text"
                        placeholder="Name da categoria"
                        className={styles.input}
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />

                    <button 
                        type="submit"
                        className={styles.buttonAdd}
                    >Cadastrar</button>
                </form>

            </main>
        </>
    );
}

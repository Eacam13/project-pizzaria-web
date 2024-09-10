"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { signOut } from '@/functions/signOut';
import { Header } from '@/components/header';
import styles from './styles.module.scss'
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';
import { apiClient } from '@/service/apiClient';


interface Category {
    id: string;
    name: string;
}
export function ProductClient() {

    const { setUser, user } = useAuthContext()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categorySelected, setCategorySelected] = useState(0);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/category');
                setCategories(response.data); // Supondo que a resposta tenha um array de categorias
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

    }, [])


    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const image = e.target.files[0];

        if (!image) return;

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }


    function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCategorySelected(Number(e.target.value));
    }


    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.warn("Por favor, preencha todos os campos");
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar!);

            await apiClient.post('/product', data);

            toast.success('Cadastrado com sucesso');
        } catch (err) {
            console.error(err)
            toast.error("Erro ao cadastrar. Tente novamente.")
        }

        // setName('')
        // setPrice('')
        // setDescription('')
        // setImageAvatar(null)
        // setAvatarUrl('')
    }

    return (
        <>
            <Header />
            <main className={styles.container}>
                <h1>Cadatrar Produto</h1>

                <form
                    className={styles.form}
                    onSubmit={handleRegister}
                >
                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={25} color="#FFF" />
                        </span>
                        <input
                            type="file"
                            accept='image/png, image/jpg'
                            onChange={handleFile}
                        />
                        {avatarUrl && (
                            <img
                                className={styles.preview}
                                src={avatarUrl}
                                alt="Foto do produto"
                                width={250}
                                height={250}
                            />
                        )}
                    </label>

                    <select
                        value={categorySelected}
                        onChange={handleChangeCategory}
                    >
                        {categories.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        type="text"
                        placeholder="Nome do produto"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Valor do produto"
                        className={styles.input}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <textarea
                        className={styles.input}
                        placeholder="Descrição do produto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>

                    <button
                        type="submit"
                        className={styles.buttonAdd}
                    >
                        Cadastrar
                    </button>
                </form>

            </main>
        </>
    );
}
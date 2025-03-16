"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthUserContext';
import Swal from 'sweetalert2';
import styles from './IngresarAlSpazio.module.css';

const IngresarAlSpazio = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
        
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al ingresar',
                text: error.message,
                customClass: {
                    popup: styles.swalPopup,
                    confirmButton: styles.swalConfirmButton,
                },
                iconColor: '#c6bbb9'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.5 } }
    };

    return (
        <div className={styles.container}>
            <motion.div initial="hidden" animate="visible" variants={logoVariants} className={styles.logoContainer}>
                <Image src="/spazio-logo3.png" alt="Spazio Logo" width={180} height={30} />
            </motion.div>
            <motion.form initial="hidden" animate="visible" variants={formVariants} className={styles.form} onSubmit={handleLogin}>
                <h1>¡Hola, bienvenido de nuevo!</h1>
                <p>Ingresa tu correo electrónico y contraseña para acceder a tu perfil y gestionar tus Spazios.</p>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Ingresar'}
                </button>
            </motion.form>
        </div>
    );
};

export default IngresarAlSpazio;
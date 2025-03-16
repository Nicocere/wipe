"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

import styles from './planesPage.module.css';

export default function PlanesPage(props) {

    const { plan } = props;
    const [isLoading, setIsLoading] = useState(false);
    
    console.log(plan);
    const navigate = useRouter();
    const [formData, setFormData] = useState({
        brandName: '',
        email: '',
        password: '',
        plan: plan || 'gratis',
        tipoSpazio: 'personal'
    });

    const isMobileScreen = useMediaQuery('(max-width: 768px)');

    const cleanInput = (input) => {
        return input
            .normalize('NFD') // Normaliza el texto
            .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
            .replace(/[^a-zA-Z0-9]/g, '') // Elimina caracteres especiales
            .toLowerCase(); // Convierte a minúsculas
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Limpiar el valor de brandName antes de enviarlo
        const cleanedFormData = {
            ...formData,
            brandName: cleanInput(formData.brandName),
            original_name: formData.brandName
        };

        fetch('/api/crear-spazio', {
            method: 'POST',
            body: JSON.stringify(cleanedFormData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la creación del Spazio');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setIsLoading(false);

                navigate.push('/bienvenidos');
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    const formContent = (
        <motion.div 
            className={styles.CrearMiSpazio_Container}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.h1 
                className={styles.heading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                ¡Crea tu Spazio <span>{plan}</span>!
            </motion.h1>
            {
                plan === "gratis" ? ( 
                    <motion.p 
                        className={styles.paragraph}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Comenzá ahora con tu Plan <span>{plan}</span>. Sin costo mensual ni costo por transacción.
                    </motion.p> 
                ) : (
                    <motion.p 
                        className={styles.paragraph}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Comenzá ahora con tu Plan <span>{plan}</span>. Pruébalo gratis por 7 días.
                    </motion.p>
                )
            }
    
            <motion.form 
                onSubmit={handleSubmit} 
                className={styles.form}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className={styles.formGroup}>
                    <label htmlFor="brandName" className={styles.label}>Nombre de tu marca <span>(Lo podés modificar después)</span></label>
                    <input
                        placeholder='Ejemplo: Marca SPAZIO.'
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleChange}
                        className={styles.input}
                        autoComplete="organization"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                    <input
                        placeholder='nombre@ejemplo.com'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        autoComplete="email"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Contraseña</label>
                    <input
                        placeholder='Crea tu contraseña'
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit" className={styles.button}>Crear mi Spazio</button>
            </motion.form>
        </motion.div>
    );

    return (
        <>
            {isMobileScreen ? (
                <div className={styles.container}>
                    <Image src="/spazio-logo21.png" alt="Logo" width={180} height={30} style={{ objectFit: 'contain', flex: 1 }} />
                    {formContent}
                </div>
            ) : (
                <div className={styles.desktopContainer}>
                    <div className={styles.imageContainer}>
                        <Image src="/assets/generate-images/couple_notebook2.jpg" alt="Imagen" width={500} height={500} />
                    </div>
                    <div className={styles.formContainer}>
                        <Image src="/spazio-logo21.png" alt="Logo" width={180} height={30} style={{ objectFit: 'contain', flex: 1 }} />
                        {formContent}
                    </div>
                </div>
            )}
        </>
    );
}
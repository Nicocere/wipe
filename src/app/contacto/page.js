'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import styles from './Contacto.module.css';

const Contacto = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Any additional side effects can be added here
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/api/send-form-contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        setLoading(false);
        if (response.ok) {
            Swal.fire({
                title: '¡Mensaje enviado!',
                text: 'Gracias por contactarte. Te responderemos a la brevedad.',
                icon: 'success',
                confirmButtonColor: '#00b7a2',
                customClass: {
                  popup: styles.sweetalertPopup,
                  confirmButton: styles.sweetalertButton
                }
            });
            event.target.reset();
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al enviar el formulario. Por favor, intentá nuevamente o escribinos por WhatsApp.',
                icon: 'error',
                confirmButtonColor: '#00b7a2',
                customClass: {
                  popup: styles.sweetalertPopup,
                  confirmButton: styles.sweetalertButton
                }
            });
        }
    };    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
            <motion.h1 
                className={styles.title} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
            >¡Potenciá tu negocio con QuickMenú!</motion.h1>
            <motion.p 
                className={styles.description} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            >
                Somos el aliado digital de los emprendedores gastronómicos. Te ayudamos a digitalizar tu carta, recibir pedidos y asesorarte para que vendas más y mejor.
            </motion.p>
            <motion.p 
                className={styles.description} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            >
                ¡Completá el formulario y te contactamos!
            </motion.p>            <motion.form className={styles.form} onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="name">Nombre y apellido</label>
                    <input className={styles.input} type="text" id="name" name="name" placeholder="Ej: Juan Pérez" required />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="email">Correo electrónico</label>
                    <input className={styles.input} type="email" id="email" name="email" placeholder="tu@email.com" required />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="telefono">WhatsApp (opcional)</label>
                    <input className={styles.input} type="tel" id="telefono" name="telefono" placeholder="Ej: +54 9 11 2345-6789" />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="message">¿En qué podemos ayudarte?</label>
                    <textarea className={styles.textarea} id="message" name="message" placeholder="Contanos sobre tu emprendimiento, tus dudas o cómo te gustaría que te ayudemos..." required></textarea>
                </div>
                <motion.button whileHover={!loading ? { scale: 1.05 } : {}} whileTap={!loading ? { scale: 0.97 } : {}} className={styles.button} type="submit" disabled={loading}>
                    {loading ? (
                        <span className={styles.loader}></span>
                    ) : (
                        'Quiero que me contacten'
                    )}
                </motion.button>
            </motion.form>            <motion.div className={styles.extraInfo} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
         
                <p className={styles.miniText}>Te asesoramos sin compromiso y te mostramos cómo QuickMenú puede transformar tu negocio gastronómico.</p>
            </motion.div>
        </motion.div>
    );
};

export default Contacto;
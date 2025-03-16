'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Contacto.module.css';

const Contacto = () => {

    useEffect(() => {
        // Any additional side effects can be added here
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/api/send-form-contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Formulario enviado con éxito');
        } else {
            alert('Hubo un error al enviar el formulario');
        }
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className={styles.title}>Contacto</h1>
            <p className={styles.description}>Gracias por contactarnos en nuestro "spazio" digital. Por favor, llena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.</p>
            <p className={styles.description}>Somos un equipo de desarrolladores dedicados a crear páginas y aplicaciones web de alta calidad. Nos apasiona la tecnología y estamos aquí para ayudarte a llevar tu presencia digital al siguiente nivel.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.label} htmlFor="name">Nombre:</label>
                    <input className={styles.input} type="text" id="name" name="name" required />
                </div>
                <div>
                    <label className={styles.label} htmlFor="email">Correo Electrónico:</label>
                    <input className={styles.input} type="email" id="email" name="email" required />
                </div>
                <div>
                    <label className={styles.label} htmlFor="message">Mensaje:</label>
                    <textarea className={styles.textarea} id="message" name="message" required></textarea>
                </div>
                <button className={styles.button} type="submit">Enviar</button>
            </form>
        </motion.div>
    );
};

export default Contacto;
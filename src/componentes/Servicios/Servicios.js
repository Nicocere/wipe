"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUtensils, FaTshirt, FaMobileAlt, FaClock, FaCreditCard, FaShieldAlt } from 'react-icons/fa';

import styles from './Servicios.module.css';

const Servicios = () => {
    const servicesRef = useRef(null);

    const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

    return (
        <div className={styles.container}>
        
            <section className={styles.servicesSection} ref={servicesRef}>


                <div className={styles.servicesGrid}>
                    {[
                        {
                            icon: <FaUtensils />,
                            title: "Gastronomía",
                            description: "Pide y paga desde tu mesa sin esperar"
                        }, {
                            icon: <FaTshirt />,
                            title: "Indumentaria",
                            description: "Compra ropa sin hacer filas en caja"
                        }, {
                            icon: <FaMobileAlt />,
                            title: "Compra Móvil",
                            description: "Todo desde tu teléfono en segundos"
                        }, {
                            icon: <FaClock />,
                            title: "Rapidez",
                            description: "Ahorra tiempo evitando esperas"
                        }, {
                            icon: <FaCreditCard />,
                            title: "Pagos Digitales",
                            description: "Múltiples opciones de pago integradas"
                        }, {
                            icon: <FaShieldAlt />,
                            title: "Seguridad",
                            description: "Transacciones protegidas y sin contacto"
                        }
                    ].map((service, i) => (
                        <motion.div
                            className={styles.serviceCard}
                            key={i}
                            initial="hidden"
                            animate={isServicesInView ? "visible" : "hidden"}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: i * 0.1,
                                        duration: 0.5
                                    }
                                }
                            }}
                            whileHover={{ y: -5 }}
                        >
                            <div className={styles.serviceIcon}>
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Servicios;
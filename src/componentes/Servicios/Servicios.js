"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUtensils, FaTshirt, FaMobileAlt, FaClock, FaCreditCard, FaShieldAlt } from 'react-icons/fa';

import styles from './Servicios.module.css';

const Servicios = () => {
    const servicesRef = useRef(null);

    const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

    return (
        <div className={styles.darkContainer}>
            <section className={styles.servicesSection} ref={servicesRef}>
                <h2 className={styles.servicesTitle}>
                    <span className={styles.highlight}>¿Por qué elegir QuickMenu?</span>
                </h2>
                <div className={styles.servicesGridModern}>
                    {/* Card 1 */}
                    <motion.div className={styles.serviceCardModern} whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(0,230,118,0.13)" }}>
                        <div className={styles.serviceIconModern}><FaUtensils /></div>
                        <h3 className={styles.serviceTitleModern}>Carta digital <span className={styles.highlight}>sin saber diseño</span></h3>
                        <p className={styles.serviceDescModern}>Creá tu menú visual y textual en minutos, sin conocimientos técnicos.</p>
                    </motion.div>
                    {/* Card 2 */}
                    <motion.div className={styles.serviceCardModern} whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(0,230,118,0.13)" }}>
                        <div className={styles.serviceIconModern}><FaMobileAlt /></div>
                        <h3 className={styles.serviceTitleModern}>Menú <span className={styles.highlight}>QR</span> escaneable</h3>
                        <p className={styles.serviceDescModern}>Tus clientes acceden al menú actualizado escaneando un QR, sin apps ni descargas.</p>
                    </motion.div>
                    {/* Card 3 */}
                    <motion.div className={styles.serviceCardModern} whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(0,230,118,0.13)" }}>
                        <div className={styles.serviceIconModern}><FaCreditCard /></div>
                        <h3 className={styles.serviceTitleModern}>Pagos <span className={styles.highlight}>rápidos y seguros</span></h3>
                        <p className={styles.serviceDescModern}>Tus clientes pagan desde el celular, sin contacto y con total seguridad.</p>
                    </motion.div>
                    {/* Card 4 */}
                    <motion.div className={styles.serviceCardModern} whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(0,230,118,0.13)" }}>
                        <div className={styles.serviceIconModern}><FaShieldAlt /></div>
                        <h3 className={styles.serviceTitleModern}>Software <span className={styles.highlight}>intuitivo</span></h3>
                        <p className={styles.serviceDescModern}>Fácil de usar para comercios y clientes. Pedidos y pagos online en segundos.</p>
                    </motion.div>
                    {/* Card 5 */}
                    <motion.div className={styles.serviceCardModern} whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(0,230,118,0.13)" }}>
                        <div className={styles.serviceIconModern}><FaClock /></div>
                        <h3 className={styles.serviceTitleModern}>Sugerencias <span className={styles.highlight}>inteligentes</span></h3>
                        <p className={styles.serviceDescModern}>El sistema recomienda productos y acelera la toma de pedidos.</p>
                    </motion.div>
                    {/* Card 6 */}
                    <motion.div className={styles.serviceCardModern} whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(0,230,118,0.13)" }}>
                        <div className={styles.serviceIconModern}><FaTshirt /></div>
                        <h3 className={styles.serviceTitleModern}>Adaptado a <span className={styles.highlight}>cualquier local</span></h3>
                        <p className={styles.serviceDescModern}>Funciona para gastronomía, indumentaria, take away, pedidos y pagos online, y más.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Servicios;
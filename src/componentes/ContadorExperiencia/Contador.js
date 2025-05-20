import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import style from './contadorsesiones.module.css';
import styles from '../QueOfrecemos/QueOfrecemos.module.css';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/context/ThemeSwitchContext';

const Contador = () => {
    // Usamos correctamente isMobileScreen para ajustar diseño responsivo
    const isMobileScreen = useMediaQuery('(max-width:650px)');
    const { isDarkMode } = useThemeContext();
    const { ref, inView } = useInView({
        threshold: isMobileScreen ? 0.3 : 0.5,
        triggerOnce: false
    });

    // Datos actualizados para estadísticas
    const statsData = [
        {
            id: 1,
            value: 60,
            label: "Reducción en tiempos de espera",
            prefix: "",
            suffix: "%"
        },
        {
            id: 2,
            value: 35,
            label: "Aumento en ticket promedio",
            prefix: "",
            suffix: "%"
        },
        {
            id: 3,
            value: 82,
            label: "Clientes satisfechos",
            prefix: "",
            suffix: "%"
        }
    ];

    // Variantes para animaciones responsivas
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Configuración responsiva para el diseño
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobileScreen ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobileScreen ? '1.5rem' : '2.5rem',
        justifyItems: 'center',
        alignItems: 'stretch',
        width: '100%',
        margin: isMobileScreen ? '2rem 0 1rem 0' : '3rem auto 2rem auto',
        maxWidth: isMobileScreen ? '100%' : '900px',
        background: 'transparent',
    };
    const statCardStyle = {
        minWidth: isMobileScreen ? '90vw' : '260px',
        maxWidth: isMobileScreen ? '95vw' : '320px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #00b7a2',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 24px 0 rgba(0,183,162,0.13)',
        padding: isMobileScreen ? '2rem 1rem 1.5rem 1rem' : '2.5rem 1.5rem 2rem 1.5rem',
        textAlign: 'center',
        transition: 'box-shadow 0.22s, transform 0.22s, background 0.22s',
        minHeight: isMobileScreen ? '220px' : '260px',
        boxSizing: 'border-box',
    };
    const statValueStyle = {
        color: '#003f3c',
        fontSize: isMobileScreen ? '2.5rem' : '3.5rem',
        fontWeight: 800,
        marginBottom: '0.5rem',
        lineHeight: 1,
        background: 'none',
        WebkitTextFillColor: 'unset',
        textAlign: 'center',
    };
    const statLabelStyle = {
        color: '#00b7a2',
        fontSize: isMobileScreen ? '1rem' : '1.125rem',
        maxWidth: '180px',
        margin: '0 auto',
        lineHeight: 1.4,
        textAlign: 'center',
    };
    return (
        <div className={styles.ventajasSection} style={{ padding: isMobileScreen ? '2.5rem 0 1.2rem 0' : '5rem 0 3.5rem 0', minHeight: isMobileScreen ? 'auto' : '480px' }}>
            <section style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.h2
                    className={styles.ventajasTitle}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: isMobileScreen ? '1.2rem' : '2.2rem' }}
                >
                    Resultados que marcan la diferencia
                </motion.h2>
                <motion.p
                    className={styles.ventajaText}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', margin: isMobileScreen ? '0 0 1.5rem 0' : '0 0 2.5rem 0', maxWidth: 600 }}
                >
                    Nuestro sistema de compra mediante QR ha transformado la experiencia comercial
                    de nuestros clientes, generando impactos positivos medibles en sus negocios.
                </motion.p>
                <motion.div
                    className={styles.statsGrid}
                    ref={ref}
                    style={gridStyle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: isMobileScreen ? "-50px" : "-100px" }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {statsData.map((stat) => (
                        <motion.div
                            key={stat.id}
                            className={styles.statCard}
                            style={statCardStyle}
                            variants={cardVariants}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: isMobileScreen ? 50 : 80
                            }}
                            whileHover={{
                                scale: isMobileScreen ? 1.02 : 1.05,
                                boxShadow: "0 4px 24px 0 rgba(0,183,162,0.13)",
                            }}
                        >
                            <div className={styles.ventajaIcon} style={{ background:'#00b7a2', marginBottom: '1.1rem' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
                            </div>
                            <div className={styles.statValue} style={statValueStyle}>
                                <span>{stat.prefix}</span>
                                {typeof stat.value === 'number' && inView && (
                                    <CountUp
                                        start={0}
                                        end={stat.value}
                                        duration={2.5}
                                        separator="."
                                        delay={0.2}
                                        decimals={0}
                                    />
                                )}
                                <span>{stat.suffix}</span>
                            </div>
                            <p className={styles.ventajaText} style={statLabelStyle}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default Contador;
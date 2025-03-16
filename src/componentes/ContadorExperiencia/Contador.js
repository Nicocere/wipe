import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import style from './contadorsesiones.module.css';
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
        gridTemplateColumns: isMobileScreen ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobileScreen ? '1.5rem' : '2.5rem'
    };

    return (
        <div className={`${style.container}`}>
            <section className={style.trustSection}>
                <motion.h2 
                    className={!isDarkMode ? style.darkTitle : style.lightTitle}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Resultados que marcan la diferencia
                </motion.h2>
                
                <motion.p 
                    className={`${style.trustDescription} ${!isDarkMode ? style.darkDescription : style.lightDescription}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Nuestro sistema de compra mediante QR ha transformado la experiencia comercial 
                    de nuestros clientes, generando impactos positivos medibles en sus negocios.
                </motion.p>

                <motion.div 
                    className={style.statsGrid} 
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
                            className={`${style.statCard} ${!isDarkMode ? style.darkStatCard : style.lightStatCard}`}
                            variants={cardVariants}
                            transition={{ 
                                duration: 0.5,
                                type: "spring", 
                                stiffness: isMobileScreen ? 50 : 80 
                            }}
                            whileHover={{ 
                                scale: isMobileScreen ? 1.02 : 1.05,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                            }}
                        >
                            <div className={`${style.statValue} ${!isDarkMode ? style.darkStatValue : style.lightStatValue}`}>
                                <span>{stat.prefix}</span>
                                {inView && (
                                    <CountUp
                                        start={0}
                                        end={stat.value}
                                        duration={2.5}
                                        separator="."
                                        delay={0.2}
                                        decimals={0}
                                        enableScrollSpy
                                        scrollSpyDelay={0}
                                    />
                                )}
                                <span>{stat.suffix}</span>
                            </div>
                            <p className={!isDarkMode ? style.darkStatLabel : style.lightStatLabel}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* CTA móvil condicional */}
                {isMobileScreen && (
                    <motion.div
                        className={style.mobileCta}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <button className={`${style.ctaButton} ${!isDarkMode ? style.darkButton : style.lightButton}`}>
                            Ver más estadísticas
                        </button>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default Contador;
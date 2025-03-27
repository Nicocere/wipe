"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaTshirt, FaShoppingBag, FaMobileAlt, FaChartLine, FaUserFriends } from 'react-icons/fa';
import { RiRestaurantFill, RiShirtFill, RiShoppingBag3Fill, RiTimeFill, RiSecurePaymentFill, RiDashboardFill } from 'react-icons/ri';
import styles from './QueOfrecemos.module.css';
import Contador from '../ContadorExperiencia/Contador';

const QueOfrecemos = () => {
    // Referencias para detectar cuando los elementos están en el viewport
    const titleRef = useRef(null);
    const benefitsRef = useRef(null);
    const industriesRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    
    // Hooks de inView para activar animaciones
    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
    const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });
    const isIndustriesInView = useInView(industriesRef, { once: true, margin: "-100px" });
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
    const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
    
    // Scroll animations
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -25]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -75]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 1], [1, 0.8, 1, 1]);
    
    // Variantes para animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }),
        hover: {
            y: -10,
            boxShadow: "0 22px 40px rgba(0, 0, 0, 0.08)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };
    
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2
            }
        }
    };
    
    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    // Datos para las industrias
    const industries = [
        {
            id: 'gastronomia',
            title: 'Gastronomía',
            description: 'Digitaliza tu menú y agiliza los pedidos. Tus clientes ordenan desde la mesa con un simple escaneo, reduciendo tiempos de espera y mejorando la rotación de mesas.',
            icon: <RiRestaurantFill className={styles.industryIcon} />,
            color: '#FF6B6B',
            benefits: ['Menos tiempos de espera', 'Actualización instantánea de menú', 'Pedidos precisos', 'Mayor rotación de mesas']
        },
        {
            id: 'indumentaria',
            title: 'Indumentaria',
            description: 'Transforma la experiencia de compra en tu tienda. Los clientes escanean códigos QR para ver detalles, disponibilidad y pagar sin hacer filas en caja.',
            icon: <RiShirtFill className={styles.industryIcon} />,
            color: '#4ECDC4',
            benefits: ['Reducción de filas', 'Información detallada de productos', 'Integración con inventario', 'Experiencia omnicanal']
        },
        {
            id: 'retail',
            title: 'Retail',
            description: 'Potencia las ventas con una experiencia fluida. Los clientes acceden a información de productos, comparan opciones y finalizan su compra desde su celular.',
            icon: <RiShoppingBag3Fill className={styles.industryIcon} />,
            color: '#FF9F1C',
            benefits: ['Acceso instantáneo a información', 'Proceso de compra simplificado', 'Promociones personalizadas', 'Análisis de comportamiento']
        }
    ];
    
    // Datos para beneficios generales
    const benefits = [
        {
            title: "Acelera las transacciones",
            description: "Reduce hasta un 60% el tiempo de compra con nuestro sistema de escaneo y pago instantáneo.",
            icon: <RiTimeFill />,
        },
        {
            title: "Seguridad garantizada",
            description: "Transacciones protegidas con los más altos estándares de seguridad y encriptación de datos.",
            icon: <RiSecurePaymentFill />,
        },
        {
            title: "Analítica avanzada",
            description: "Obtén insights valiosos sobre el comportamiento de compra y preferencias de tus clientes.",
            icon: <RiDashboardFill />,
        }
    ];
    

    return (
        <div className={styles.container}>
    
            {/* Benefits Section */}
            <section className={styles.benefitsSection} ref={benefitsRef}>
                <motion.div 
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.sectionTitle}>Ventajas que transforman tu negocio</h2>
                    <p className={styles.sectionSubtitle}>
                        Nuestro sistema simplifica la operación y mejora la experiencia de tus clientes
                    </p>
                </motion.div>
                
                <div className={styles.benefitsGrid}>
                    {benefits.map((benefit, i) => (
                        <motion.div
                            className={styles.benefitCard}
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isBenefitsInView ? "visible" : "hidden"}
                            whileHover="hover"
                        >
                            <div className={styles.benefitIconContainer}>
                                {benefit.icon}
                            </div>
                            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                            <p className={styles.benefitDescription}>{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Hero Section */}
            <section className={styles.heroSection} ref={titleRef}>
                <motion.div 
                    className={styles.heroContent}
                    style={{ y: y1, opacity }}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isTitleInView ? "visible" : "hidden"}
                >
                    <motion.h1 
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Transforma la experiencia de compra
                    </motion.h1>
                    
                    <motion.p 
                        className={styles.heroSubtitle}
                        variants={itemVariants}
                    >
                        Simplificamos la interacción entre clientes y negocios con nuestra plataforma de digitalización y QR, optimizando cada paso del proceso de compra.
                    </motion.p>
                    
                    <motion.div 
                        className={styles.heroButtons}
                        variants={itemVariants}
                    >
                        <motion.button 
                            className={styles.primaryButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Prueba gratis
                        </motion.button>
                        <motion.button 
                            className={styles.secondaryButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Más información
                        </motion.button>
                    </motion.div>
                </motion.div>
                
                <motion.div 
                    className={styles.heroGraphic}
                    initial={{ opacity: 0, x: 100 }}
                    animate={isTitleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <img 
                        src="/example.png" 
                        alt="Digitalización de compras con QR" 
                        className={styles.heroImage} 
                    />
                </motion.div>
            </section>
            

            {/* Industries Section */}
            <section className={styles.industriesSection} ref={industriesRef}>
                <motion.div 
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isIndustriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.sectionTitle}>Soluciones adaptadas a cada industria</h2>
                    <p className={styles.sectionSubtitle}>
                        Personalizamos nuestra plataforma para abordar los desafíos específicos de tu sector
                    </p>
                </motion.div>
                
                <div className={styles.industriesContainer}>
                    {industries.map((industry, i) => (
                        <motion.div 
                            className={styles.industryCard}
                            key={industry.id}
                            style={{ "--accent-color": industry.color }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isIndustriesInView ? 
                                { opacity: 1, y: 0, transition: { delay: i * 0.2 } } : 
                                { opacity: 0, y: 50 }
                            }
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.industryIcon}>
                                {industry.icon}
                            </div>
                            <h3 className={styles.industryTitle}>{industry.title}</h3>
                            <p className={styles.industryDescription}>{industry.description}</p>
                            
                            <motion.ul className={styles.industryBenefits}>
                                {industry.benefits.map((benefit, j) => (
                                    <motion.li 
                                        key={j}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={isIndustriesInView ? 
                                            { opacity: 1, x: 0, transition: { delay: i * 0.2 + j * 0.1 + 0.3 } } : 
                                            { opacity: 0, x: -10 }
                                        }
                                    >
                                        {benefit}
                                    </motion.li>
                                ))}
                            </motion.ul>
                            
                            <motion.button 
                                className={styles.industryButton}
                                whileHover={{ scale: 1.05, backgroundColor: industry.color }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Conocer más
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            {/* Stats Section */}
            <motion.section 
                className={styles.statsSection}
                ref={statsRef}
                style={{ y: y2 }}
            >
        <Contador />
            </motion.section>
            
            {/* CTA Section */}
            <motion.section 
                className={styles.ctaSection}
                ref={ctaRef}
                style={{ y: y3 }}
                initial={{ opacity: 0 }}
                animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div 
                    className={styles.ctaContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className={styles.ctaTitle}>Lleva tu negocio al siguiente nivel</h2>
                    <p className={styles.ctaText}>
                        Únete a cientos de empresas que ya están optimizando su proceso de ventas con nuestra solución digital.
                    </p>
                    <motion.button 
                        className={styles.ctaButton}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 150, 212, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Comienza hoy mismo
                    </motion.button>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default QueOfrecemos;
"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaTshirt, FaShoppingBag, FaMobileAlt, FaChartLine, FaUserFriends, FaCreditCard, FaClock } from 'react-icons/fa';
import { RiRestaurantFill, RiShirtFill, RiShoppingBag3Fill, RiTimeFill, RiSecurePaymentFill, RiDashboardFill } from 'react-icons/ri';
import styles from './QueOfrecemos.module.css';
import Contador from '../ContadorExperiencia/Contador';
import QuickmenuDobleFeature from './QuickmenuDobleFeature';

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

    const ventajasFuncionalidades = [
        {
            title: "Menú digital premium",
            description: "Aumentá tus ventas y sorprendé a tus clientes con una carta visual, moderna y fácil de usar.",
            icon: <RiRestaurantFill className={styles.ventajaIcon} />,
        },
        {
            title: "Escaneo y pago por QR",
            description: "Tus clientes acceden al menú y pagan desde su celular, sin esperas ni contacto físico.",
            icon: <FaMobileAlt className={styles.ventajaIcon} />,
        },
        {
            title: "Pagos protegidos y flexibles",
            description: "Cobrá fácil, rápido y seguro con múltiples medios de pago y tecnología de última generación.",
            icon: <RiSecurePaymentFill className={styles.ventajaIcon} />,
        },
        {
            title: "Administrador y métricas en tiempo real",
            description: "Visualizá pedidos, accedé a dashboards y estadísticas clave para tomar mejores decisiones.",
            icon: <FaChartLine className={styles.ventajaIcon} />,
        },
        {
            title: "Personalización de marca",
            description: "Personalizá tu menú, colores y textos para potenciar tu imagen desde el primer contacto.",
            icon: <FaUtensils className={styles.ventajaIcon} />,
        },
        {
            title: "Equipo motivado y productivo",
            description: "Mejorá el clima laboral y la productividad con pedidos prolijos y menos estrés operativo.",
            icon: <FaUserFriends className={styles.ventajaIcon} />,
        }
    ];

    const beneficios = [
        {
            icon: <FaClock className={styles.benefitsDarkAccentIcon} />,
            text: <><span className={styles.benefitsDarkAccent}>Elimina largas esperas</span> y mejora la experiencia del cliente</>,
        },
        {
            icon: <FaUtensils className={styles.benefitsDarkAccentIcon} />,
            text: <><span className={styles.benefitsDarkAccent}>Más rotación de mesas</span> y aumento de ventas</>,
        },
        {
            icon: <FaChartLine className={styles.benefitsDarkAccentIcon} />,
            text: <>Mayor valor de ticket gracias a <span className={styles.benefitsDarkAccent}>sugerencias inteligentes</span></>,
        },
        {
            icon: <FaMobileAlt className={styles.benefitsDarkAccentIcon} />,
            text: <><span className={styles.benefitsDarkAccent}>Pedidos y pagos</span> en tiempo real</>,
        },
        {
            icon: <FaCreditCard className={styles.benefitsDarkAccentIcon} />,
            text: <>Disminución de <span className={styles.benefitsDarkAccent}>errores</span> en pedidos</>,
        },
    ];

    return (
        <div className={styles.container}>
                  {/* CTA Section */}
            <motion.section
                className={styles.ctaSection}
                ref={ctaRef}
                id="cta"
                style={{ borderRadius: '2rem', margin: '0', color: '#002c35', position: 'relative', overflow: 'hidden' }}
                initial={{ opacity: 0 }}
                animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className={styles.ctaContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}
                >
                    <h2 className={styles.ctaTitle} style={{ color: '#002c35', fontWeight: 900, fontSize: '2.5rem', marginBottom: '1.2rem' }}>
                        Lleva tu negocio al siguiente nivel
                    </h2>
                    <p className={styles.ctaText} style={{ color: '#002c35', fontSize: '1.18rem', marginBottom: '2.2rem' }}>
                        Únete a cientos de empresas que ya están optimizando su proceso de ventas con nuestra solución digital.
                    </p>
                    <motion.button
                        className={styles.ctaButton}
                        style={{ color: '#fff', fontWeight: 700, fontSize: '1.18rem', borderRadius: '1.2rem', padding: '1.1rem 2.2rem', boxShadow: '0 4px 24px 0 rgba(0,230,118,0.13)', border: 'none', transition: 'background 0.2s, color 0.2s, transform 0.2s' }}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,230,118,0.25)', color: '#002c35', borderColor: '#00b7a2', backgroundColor: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Comienza hoy mismo
                    </motion.button>
                </motion.div>
            </motion.section>
        

            <motion.section
                className={styles.heroPromoSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                <div className={styles.heroPromoGrid}>
                    <motion.div
                        className={styles.heroPromoTextCol}
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h1 className={styles.heroPromoTitle}>
                        Modernizá tu atención sin complicaciones
                        </h1>
                        <p className={styles.heroPromoDesc}>
                        QuickMenu conecta a tus clientes con tu carta en un clic. Pedidos y pagos desde su celular, sin filas ni confusión.
                        </p>
                        <motion.a
                            href="#contacto"
                            className={styles.heroPromoBtn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Empezá ahora
                        </motion.a>
                    </motion.div>
                    <motion.div
                        className={styles.heroPromoImgCol}
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className={styles.heroPromoImgWrapper}>
                            <img
                                src="/qrscan.png"
                                alt="Quickmenu app demo"
                                className={styles.heroPromoImg}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>






            

            {/* --- ACERCA DE QUICKMENÚ --- */}
            <section className={styles.aboutWipeSection}>
                <h2 className={styles.aboutWipeTitle}>
                    Acerca de <span className={styles.highlight}>QuickMenú</span>
                </h2>
                <div className={styles.aboutWipeGrid}>
                    <div className={styles.aboutWipeItem}>
                        <div className={styles.aboutWipeIcon}>
                            <RiRestaurantFill />
                        </div>
                        <h3 className={styles.aboutWipeItemTitle}>
                            Solución digital para <span className={styles.highlight}>gastronómicos</span>
                        </h3>
                        <p className={styles.aboutWipeItemText}>
                            Digitalizá tu restaurante y simplificá la gestión de pedidos y menú. Modernizá la experiencia de tus clientes con tecnología.
                        </p>
                    </div>
                    <div className={styles.aboutWipeItem}>
                        <div className={styles.aboutWipeIcon}>
                            <FaMobileAlt />
                        </div>
                        <h3 className={styles.aboutWipeItemTitle}>
                            Escaneo y pago <span className={styles.highlight}>por QR</span>
                        </h3>
                        <p className={styles.aboutWipeItemText}>
                            Tus clientes escanean el código QR, ven el menú y pagan desde su celular, sin esperas ni contacto físico.
                        </p>
                    </div>
                    <div className={styles.aboutWipeItem}>
                        <div className={styles.aboutWipeIcon}>
                            <FaChartLine />
                        </div>
                        <h3 className={styles.aboutWipeItemTitle}>
                            Aliado estratégico para <span className={styles.highlight}>crecer</span>
                        </h3>
                        <p className={styles.aboutWipeItemText}>
                            Te acompañamos con herramientas y datos para potenciar tu negocio y mejorar la experiencia de tus clientes.
                        </p>
                    </div>
                </div>
            </section>

          
    <QuickmenuDobleFeature />

            {/* --- BENEFICIOS (NO SE REPITEN CON VENTAJAS/FUNCIONALIDADES) --- */}
            <section className={styles.benefitsDarkSection} id="beneficios" ref={benefitsRef}>
                <h2 className={styles.benefitsDarkTitle}>Beneficios</h2>
                <p className={styles.benefitsDarkSubtitle}>
                    <span className={styles.benefitsHighlight}>Digitalizá</span> tu negocio y mejorá la experiencia de tus clientes con tecnología simple, rápida y segura.
                </p>
                <div className={styles.benefitsDarkGrid}>
                    <div className={styles.benefitsDarkTextCol}>
                        <ul className={styles.benefitsDarkList}>
                            {beneficios.map((item, idx) => (
                                <li className={styles.benefitsDarkItem} key={idx}>
                                    {item.icon}
                                    <span className={styles.benefitsText} >{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.benefitsDarkImgCol}>
                        <div className={styles.benefitsDarkImgWrapper}>
                            <img src="/Beneficios.png" alt="Personas disfrutando en restaurante con celulares" className={styles.benefitsDarkImg} />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN UNIFICADA: VENTAJAS Y FUNCIONALIDADES --- */}
            <section className={styles.ventajasSection} id="ventajas">
                <h2 className={styles.ventajasTitle}>
                    Ventajas y funcionalidades <span className={styles.ventajasHighlight}>QuickMenú</span>
                </h2>
                <div className={styles.ventajasGrid}>
                    {ventajasFuncionalidades.map((item, i) => (
                        <motion.div
                            className={styles.ventajaCard}
                            key={i}
                            whileHover={{ y: -8, boxShadow: '0 12px 40px 0 rgba(0,230,118,0.18)' }}
                        >
                            <div>{item.icon}</div>
                            <h3 className={styles.ventajaTitle}>{item.title}</h3>
                            <p className={styles.ventajaText}>{item.description}</p>
                        </motion.div>
                    ))}
                </div>
                <div>
                    <button className={styles.ventajasCta}>
                        Sumate a la revolución digital con QuickMenú
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <motion.section
                className={styles.statsSection}
                ref={statsRef}
            >
                <Contador />
            </motion.section>

        
        </div>
    );
};

export default QueOfrecemos;
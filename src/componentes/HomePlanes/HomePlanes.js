"use client";
import React, { useState } from 'react';
import style from './HomePlanes.module.css';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import { motion } from 'framer-motion';

const HomePlanes = () => {

    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (plan) => {
        setHoveredCard(plan);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? `translateY(0)` : `translateY(100px)`,
    });

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: i => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeInOut"
            }
        })
    };

    return (
        <section ref={ref} id="planes" className={style.animateSection}>
            <animated.div style={animation} className={style.planes}>
                <motion.h1
                    className={style.plansTitle}
                    initial="hidden"
                    animate="visible"
                >
                    {"DISEÑA TU UNIVERSO DIGITAL".split(" ").map((word, index) => (
                        <motion.span
                            key={index}
                            custom={index}
                            variants={textVariants}
                            className={style.wordWrapper}
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                </motion.h1>
                <div className={style.cardSection}>

                    {/* Plan Inicial */}
                    <div className={style.card}>
                        <h3>tu Wipe personal</h3>
                        <p>Todo lo que necesitás para emprender. Ideal para quienes están empezando.</p>
                        <ul>
                            {[
                                'Personalización completa',
                                'Diseños exclusivos',
                                'Soporte técnico',
                                'Hasta 50 productos',
                                'Dashboard y dominio personalizado',
                                'Análisis de métricas básico',
                                'Integración con redes y Mercado Pago',
                                'Gestión de inventario y pedidos',
                                'Diseño responsive y SSL'
                            ].map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <Link href="/quiero-mi-spazio" className={style.ctaButton}>Crea tu Wipe</Link>
                        <Link href="/quiero-mi-spazio" className={style.infoLink}>Ver más información</Link>
                    </div>

                    {/* Plan Esencial */}
                    <div
                        className={`${style.card} ${style.disabledCard}`}
                        onMouseEnter={() => handleMouseEnter('esencial')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={style.comingSoonOverlay}>
                            <span className={style.comingSoonText}>Próximamente</span>
                        </div>
                        <h3>Esencial</h3>
                        <p>Profesionalizá tu negocio y aumentá tus ventas. El plan ideal para crecer.</p>
                        <ul>
                            <li>Todo del plan Inicial</li>
                            <li>Atención por email + WhatsApp</li>
                            <li>Sin límites de productos, ventas y visitas</li>
                            <li>Integración de Mercado Pago</li>
                        </ul>
                        <Link href="/crea-mi-spazio/esencial" className={style.ctaButton}>Probar gratis por 7 días</Link>
                        <Link href="/crea-mi-spazio/esencial" className={style.infoLink}>Ver más información</Link>
                    </div>

                    {/* Plan SPAZIO PREMIUM */}
                    <div
                        className={`${style.card} ${style.disabledCard}`}
                        onMouseEnter={() => handleMouseEnter('premium')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={style.comingSoonOverlay}>
                            <span className={style.comingSoonText}>Próximamente</span>
                        </div>
                        <h3>Spazio Premium</h3>
                        <p>Automatizá tu negocio y llevá tus ventas al siguiente nivel con funcionalidades avanzadas.</p>
                        <ul>
                            <li>Todo del plan Esencial</li>
                            <li>Atención por email + messenger + WhatsApp</li>
                            <li>Acciones masivas sobre ventas y productos</li>
                            <li>Ventas Internacionales con Pay-Pal</li>
                            <li>Integración con Google Analytics</li>
                            <li>Acceso al código fuente</li>
                        </ul>
                        <Link href="/crea-mi-spazio/premium" className={style.ctaButton}>Probar gratis por 7 días</Link>
                        <Link href="/crea-mi-spazio/premium" className={style.infoLink}>Ver más información</Link>
                    </div>

                </div>
            </animated.div>
        </section>
    );
};

export default HomePlanes;
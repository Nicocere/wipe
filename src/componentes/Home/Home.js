"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import styles from './Home.module.css';

const Home = () => {
    const router = useRouter();
    const presentationRef = useRef(null);
    const [qrValue] = useState('https://barapp.vercel.app/?tenant_id=856d5c03-2335-4556-829a-86b22af307a4');
    const isPresentationInView = useInView(presentationRef, { once: true, margin: "-100px" });

    const handleButtonClick = () => {
        router.push('/comienza-ya');
    };

    return (
        <div className={styles.container}>
            <section className={styles.presentation} ref={presentationRef}>
                <div className={styles.heroSectionFixed}>
                    <div className={styles.leftBlock}>
                        <motion.h1
                            className={styles.title}
                            initial="hidden"
                            animate={isPresentationInView ? "visible" : "hidden"}
                        >
                            Una app pensada para agilizar la dinámica comercial
                        </motion.h1>
                        <motion.p
                            className={styles.subtitle}
                            initial="hidden"
                            animate={isPresentationInView ? "visible" : "hidden"}
                        >
                            Creamos soluciones digitales únicas para optimizar los procesos de atención, compra y venta.
                        </motion.p>
                        <div className={styles.ctaQrRow}>
                       
                            <div className={styles.qrBlock}>
                                <span className={styles.qrLabel}>Escanea para probar la demo</span>
                                <div className={styles.qrFrameCompact}>
                                    <QRCodeSVG
                                        value={qrValue}
                                        size={90}
                                        bgColor={"#ffffff"}
                                        fgColor={"#000000"}
                                        level={"H"}
                                        className={styles.qrCode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        className={styles.astronautWrapperFixed}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isPresentationInView ?
                            { opacity: 1, x: 0 } :
                            { opacity: 0, x: 50 }
                        }
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <video
                            src="/videos/barapp.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={styles.astronautImageFixed}
                        />
                    </motion.div>
                </div>
            </section>
            <section className={styles.extraSection}>
                <h2 className={styles.extraTitle}>Una experiencia única de compra</h2>
                <p className={styles.extraDesc}>
                    Una solución pensada para los comercios pero, sobre todo, para los clientes, para que puedan disfrutar de una experiencia única en la compra de productos gastronómicos en restaurantes y bares.
                </p>
                     <motion.button
                                initial={{ opacity: 0 }}
                                animate={isPresentationInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleButtonClick}
                                className={styles.btnSpazio}
                            >
                                Empieza ahora
                            </motion.button>
            </section>
        </div>
    );
};

export default Home;
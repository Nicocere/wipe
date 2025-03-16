"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { FaUtensils, FaTshirt, FaMobileAlt, FaClock, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { BsFillPhoneFill } from "react-icons/bs";
import { QRCodeSVG } from 'qrcode.react';
import styles from './Home.module.css';

const Home = () => {
    const router = useRouter();
    const presentationRef = useRef(null);
    const servicesRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [qrValue] = useState('https://puntomesa.com/demo-restaurante');



    const handleButtonClick = () => {
        router.push('/comienza-ya');
    };

    // Simplificar variantes de animación
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const isPresentationInView = useInView(presentationRef, { once: true, margin: "-100px" });
    const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

    return (
        <div className={styles.container}>
            <section className={styles.presentation} ref={presentationRef}>
                <div className={styles.heroSection}>
                    <div className={styles.textContent}>
                        <motion.h1
                            className={styles.title}
                            initial="hidden"
                            animate={isPresentationInView ? "visible" : "hidden"}
                            variants={staggerChildren}
                        >
                            {"Compra Fácil con QR".split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    className={styles.word}
                                    variants={fadeIn}
                                >
                                    {word}{' '}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p
                            className={styles.subtitle}
                            initial="hidden"
                            animate={isPresentationInView ? "visible" : "hidden"}
                            variants={fadeIn}
                        >
                            Agiliza tus compras en restaurantes y tiendas con nuestro sistema de QR.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={isPresentationInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleButtonClick}
                            className={styles.btnSpazio}
                            onHoverStart={() => setIsHovering(true)}
                            onHoverEnd={() => setIsHovering(false)}
                        >
                            <span> Escanea para probar la demo </span>
                            <motion.div
                                className={styles.qrContainer}
                                initial="hidden"
                                animate={isPresentationInView ? "visible" : "hidden"}
                                variants={fadeIn}
                            >
                                <div className={styles.qrFrame}>
                                    <QRCodeSVG
                                        value={qrValue}
                                        size={250}
                                        bgColor={"#ffffff"}
                                        fgColor={"#000000"}
                                        level={"H"}
                                        className={styles.qrCode}
                                        imageSettings={{
                                            src: "/wipe.png", // Ruta del logo (asegúrate de que sea accesible)
                                            x: undefined, // Posición X (centrado por defecto)
                                            y: undefined, // Posición Y (centrado por defecto)
                                            height: 40, // Tamaño del logo
                                            width: 150,
                                            excavate: true, // Hace que el logo no cubra el código QR

                                        }}
                                    />
                                </div>
                            </motion.div>
                        </motion.button>

                    </div>
                    <motion.div
                        className={styles.astronautWrapper}
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
                            className={styles.astronautImage}
                        // width={500}
                        // height={500}
                        />
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;
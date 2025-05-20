"use client";
import { motion } from "framer-motion";
import styles from "./homeBanner.module.css";
import { useRef } from 'react';
import { useInView } from "framer-motion";
import Image from 'next/image';

export default function HomeBanner() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { threshold: 0.2, triggerOnce: true });

  // Variantes de animación para el contenido y la imagen
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <section ref={containerRef} className={styles.banner}>
      <div className={styles.container}>
        <motion.div 
          className={styles.bannerContent}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={contentVariants}
        >
        
        <h1 className={styles.mainTitle}>Más que un menú, una solución digital</h1>
<p className={styles.bannerText}>Automatizá pedidos y cobros desde cualquier celular</p>

          <div className={styles.buttonRow}>
            <button className={styles.primaryBtn}>Probá la Demo</button>
            <button className={styles.secondaryBtn}>Beneficios</button>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.mockupCol}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <div className={styles.mockupCircle}></div>
          <div className={styles.mockupImgContainer}>
            <Image 
              src="/example.png" 
              alt="App mockup" 
              className={styles.mockupImg} 
              width={340} 
              height={680} 
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
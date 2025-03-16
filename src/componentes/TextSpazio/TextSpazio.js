"use client";

import { useMediaQuery } from "@mui/material";
import styles from "./TextSpazio.module.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from 'react';

export default function TextSpazio() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, triggerOnce: false });

  // Animación letra por letra
  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: inView ? 1 : 0,
      y: inView ? 0 : 50,
      transition: {
        delay: i * 0.05
      }
    })
  };

  // Efecto de escritura
  const typingEffect = (text) => {
    return text.split("").map((char, index) => (
      <motion.span key={index} initial="hidden" animate="visible" variants={letterAnimation} custom={index}>
        {char}
      </motion.span>
    ));
  };

  // Generar partículas
  const particles = Array.from({ length: 50 }).map((_, index) => (
    <div key={index} className={styles.particle} style={{
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 10 + 5}s`,
      animationDelay: `${Math.random() * 5}s`
    }} />
  ));

  return (
    <section ref={ref} className={styles.banner}>
      {particles}
      <motion.div className={styles.planes}>
        <motion.h1 initial="hidden" animate="visible" variants={letterAnimation} custom={2}>
          {typingEffect("Tu Spazio. Digital no tiene límites.")}
        </motion.h1>
      </motion.div>
    </section>
  );
}
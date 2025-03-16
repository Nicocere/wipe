"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./homeBanner.module.css";
import { useState, useRef } from 'react';
import { useInView } from "framer-motion";

export default function HomeBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, triggerOnce: true });
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    // offset: ["top center", "center end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], ["0deg", "360deg"]);

  


  const titulo = ['Transformá', 'tu', 'universo', 'digital'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };    

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      color: "#4FD3FF",
      transition: { duration: 0.2 }
    }
  };

  const textos = [
    "Desarrollamos soluciones web personalizadas y potenciamos tu marca con estrategias digitales innovadoras.",
    "Tu visión encuentra su Spazio en el futuro digital."
  ];

  return (
    <section ref={ref} className={styles.banner}>
      <div className={styles.bannerContent}>




      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={styles.mainTitle}
      >
        {titulo.map((word, wordIndex) => (
          <motion.span 
            key={`word-${wordIndex}`}
            className={styles.wordWrapper}
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={`letter-${wordIndex}-${letterIndex}`}
                className={styles.titleLetter}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (wordIndex * word.length + letterIndex) * 0.03 }}
                whileHover={{ 
                  scale: 1.2, 
                  color: "#4FD3FF",
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                {letter}
              </motion.span>
            ))}
            {wordIndex < titulo.length - 1 && " "}
          </motion.span>
        ))}
      </motion.h1>



      <motion.div ref={videoRef}  style={{ scale }}
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ 
    opacity: 1,
    scale: 1
  }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className={styles.videoContainer}
>
  <motion.video
    src="/videos/devices.mp4"
    autoPlay
    loop
    muted
    className={styles.video}
    initial={{ filter: "blur(10px)" }}
    animate={{ 
      filter: "blur(0px)" ,
      scale: [1, 1.02, 1]
    }}
    transition={{ 
      duration: 1,
    }}

  />
</motion.div>



        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={styles.bannerContainer}
        >
          {textos.map((texto, index) => (
            <motion.div
              key={index}
              className={styles.textWrapper}
              variants={textVariants}
              custom={index}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.p className={styles.bannerText}>
                {texto}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
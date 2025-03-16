"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './h1Texts.module.css';

gsap.registerPlugin(ScrollTrigger);

const H1Text = ({ children, className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll(`.${styles.letter}`);

    gsap.fromTo(
      letters,
      { y: '50%', color: '#aaa', opacity: 0.5 },  // Empieza opaco, gris y un poco desplazado hacia abajo
      {
        y: '0%',
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.05,  // Animación en cadena de izquierda a derecha
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',  // Empieza cuando el texto está cerca del 80% del viewport
          end: 'top 20%',  // Termina de animarse cuando el texto llega al 20% del viewport
          scrub: true,  // Hace que la animación siga el scroll de manera fluida
          toggleActions: 'play reverse play reverse',  // Al salir de pantalla hacia arriba, se revierte la animación
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className={styles.letter}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <h1 ref={textRef} className={`${styles.animated} ${className}`}>
      {splitText(children)}
    </h1>
  );
};

export default H1Text;
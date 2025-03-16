"use client";

import React, { useState, useEffect } from 'react';
import { useSpring, a } from '@react-spring/web';
import style from './preloader.module.css';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';

const ScreenLoader = () => {
  const [loaded, setLoaded] = useState(false);
  const [showTextSpazio, setShowTextSpazio] = useState(false);
  const [showTextDigital, setShowTextDigital] = useState(false);
  const [showTextSolutions, setShowTextSolutions] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Animación de desvanecimiento
  const fadeOut = useSpring({
    opacity: loaded ? 0 : 1,
    config: { duration: 1200 },
  });

  // Efecto de desvanecimiento de la pantalla completa
  const screenFadeOut = useSpring({
    opacity: loaded ? 0 : 1,
    transform: loaded ? (isMobile ? 'translateX(100%)' : 'translateY(100%)') : 'translateY(0)',
    config: { duration: 1000 },
  });

  // Animación para el texto SPAZIO.
  const textFadeInSpazio = useSpring({
    opacity: showTextSpazio ? 1 : 0,
    transform: showTextSpazio ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 400 },
  });

  // Animación para el texto Digital
  const textFadeInDigital = useSpring({
    opacity: showTextDigital ? 1 : 0,
    transform: showTextDigital ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 400 },
  });

  // Animación para el texto Solutions
  const textFadeInSolutions = useSpring({
    opacity: showTextSolutions ? 1 : 0,
    transform: showTextSolutions ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 400 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      const loadingScreen = document.getElementById("loadingScreen");
      if (loadingScreen) {
        loadingScreen.classList.add(style.fadeOut);
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 1000); // Tiempo de la animación de desvanecimiento
      }
    }, 3000); // Ajusta este tiempo según sea necesario

    // Mostrar el texto SPAZIO. después de 1 segundo
    const textTimerSpazio = setTimeout(() => {
      setShowTextSpazio(true);
    }, 500);

    // Mostrar el texto Digital después de 1.5 segundos
    const textTimerDigital = setTimeout(() => {
      setShowTextDigital(true);
    }, 600);

    // Mostrar el texto Solutions después de 2 segundos
    const textTimerSolutions = setTimeout(() => {
      setShowTextSolutions(true);
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimerSpazio);
      clearTimeout(textTimerDigital);
      clearTimeout(textTimerSolutions);
    };
  }, []);

  return (
    <a.div style={screenFadeOut} className={style.loadingScreen} id="loadingScreen">
      <div className={style.loadingScreenBackground}>
        <a.div style={fadeOut} className={style.firstElement}>
          <article>
            {/* <a.div style={fadeOut}>
              <a.div>
                <Image src="/imagenes/logo/logotipo.png" alt="Spazio Logo" width={200} height={200} priority />
              </a.div>
            </a.div> */}
            <div className={style.textDiv}>
              <a.div style={textFadeInSpazio} className={style.spazio}>
                <Image src="/spazio-logo3.png" alt="Spazio Logo" width={400} height={90} priority />
              </a.div>

              <div className={style.sloganDiv}>
              <a.h3 style={textFadeInDigital} className={style.digital}>Digital</a.h3>
              <a.h3 style={textFadeInSolutions} className={style.solutions}>Solutions</a.h3>
              </div>
            </div>
          </article>
        </a.div>
      </div>
    </a.div>
  );
};

export default ScreenLoader;
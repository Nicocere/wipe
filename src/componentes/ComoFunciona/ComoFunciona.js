"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { FaRocket, FaCode, FaGlobe, FaCog } from 'react-icons/fa';
import H1Text from '@/utils/H1Texts/H1Text';
import Image from 'next/image';
import style from './comoFunciona.module.css';

gsap.registerPlugin(ScrollTrigger);

const ComoFunciona = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const steppersRef = useRef([]);
  const ctaRef = useRef(null);
  const neptuneRef = useRef(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax y transformaciones
  const neptuneY = useTransform(scrollYProgress, [0, 1], [-50, -250]);
  const neptuneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const neptuneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const neptuneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.3]);
  
  // Configuración de springs para movimientos más suaves
  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const springY = useSpring(neptuneY, springConfig);
  const springRotate = useSpring(neptuneRotate, springConfig);
  const springScale = useSpring(neptuneScale, springConfig);

  const isInView = useInView(sectionRef, { 
    margin: "-20% 0px",
    once: false 
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (titleRef.current) {
      const ctx = gsap.context(() => {
        // Título con split text mejorado
        const titleText = titleRef.current.textContent;
        titleRef.current.innerHTML = '';
        titleRef.current.style.opacity = 1;
        
        const chars = [...titleText].map((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = 0;
          span.style.display = 'inline-block';
          span.style.transform = `translate3d(0, 50px, 0) rotate(${Math.random() * 30}deg)`;
          titleRef.current.appendChild(span);
          return span;
        });

        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(chars, {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: "power3.out"
            });
          },
          onLeave: () => {
            gsap.to(chars, {
              opacity: 0,
              y: -50,
              rotate: -30,
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.in"
            });
          },
          onEnterBack: () => {
            gsap.to(chars, {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: "power3.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(chars, {
              opacity: 0,
              y: 50,
              rotate: 30,
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.in"
            });
          }
        });

        // Steppers con mejoras en la animación
        steppersRef.current.forEach((stepper, index) => {
          if (stepper) {
            ScrollTrigger.create({
              trigger: stepper,
              start: "top 80%",
              end: "bottom 20%",
              markers: false,
              onEnter: () => {
                gsap.to(stepper, {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "power3.out"
                });
              },
              onLeave: () => {
                gsap.to(stepper, {
                  opacity: 0,
                  y: -50,
                  rotateX: -15,
                  duration: 0.5,
                  ease: "power2.in"
                });
              },
              onEnterBack: () => {
                gsap.to(stepper, {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  duration: 0.8,
                  ease: "power3.out"
                });
              },
              onLeaveBack: () => {
                gsap.to(stepper, {
                  opacity: 0,
                  y: 50,
                  rotateX: 15,
                  duration: 0.5,
                  ease: "power2.in"
                });
              }
            });
          }
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <motion.section id='servicios'
      ref={sectionRef} 
      className={style.howWorks}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={style.container}>
        <motion.div
          ref={neptuneRef}
          className={style.moonWrapper}
          style={{
            y: springY,
            rotate: springRotate,
            scale: springScale
          }}
        >
          <Image
            src="/images/png/Neptune.png"
            alt="Neptune"
            width={500}
            height={500}
            className={style.moonImage}
            priority
          />


        </motion.div>

        <motion.div
          ref={neptuneRef}
          className={style.astronautWrapper}
          style={{
            y: springY,
            rotate: springRotate,
            scale: springScale
          }}
        >
      <Image 
            src="/images/png/astronaut-notebook.png"
            alt="Astronaut"
            width={500}
            height={500}
            className={style.astronautImage}
            priority
          />


        </motion.div>

    

{/* 
        <H1Text ref={titleRef} className={style.titleH1}>
          ¿CÓMO FUNCIONA?
        </H1Text> */}

        <motion.div 
          className={style.stepper}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {[  
            { icon: <FaRocket />, title: "1. Contanos tu idea", desc: "En Spazio, te hacemos una breve consulta online para entender qué necesita tu proyecto." },
            { icon: <FaCode />, title: "2. Creamos tu sitio web", desc: "Nos encargamos de todo. Rápido, fácil y con todo incluido." },
            { icon: <FaGlobe />, title: "3. ¡Estás online!", desc: "Tu página estará lista para que empieces a captar clientes." },
            { icon: <FaCog />, title: "4. Mantenimiento Premium", desc: "Con Spazio, siempre estamos ahí para ti." }
          ].map((step, i) => (
            <motion.div
              key={i}
              ref={el => steppersRef.current[i] = el}
              className={style.step}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 50,
                  rotateX: -15
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <motion.div 
                className={style.stepIcon}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.3 }
                }}
              >
                {step.icon}
              </motion.div>
              <motion.h3 
                className={style.stepTitle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className={style.stepDescription}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                {step.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="ver-planes" className={style.ctaButton}>
            VER PLANES
          </Link>
        </motion.div> */}
      </div>    
    </motion.section>
  );
};

export default ComoFunciona;
"use client";
import React, { useRef, useEffect } from "react";
import style from "./HomeServicios.module.css";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMediaQuery } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import H1Text from "@/utils/H1Texts/H1Text";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HomeServicios = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start -60%", "100% end"]
  });

  const services = [
    { img:'/images/png/celus.png', title: "Creación Rápida de Páginas Web", description: "En Spazio, tu sitio web estará listo en tiempo récord. Todo incluido, desde el diseño hasta el hosting." },
    { img:'/images/png/responsive.png', title: "Diseño Adaptado", description: "Páginas que se ajustan automáticamente a cualquier dispositivo. Tu web, siempre perfecta en móviles y computadoras." },
    { img:'/images/png/seo.png', title: "SEO Optimizado", description: "Diseñamos tu sitio web listo para destacar en Google. Maximiza tu visibilidad sin esfuerzo." },
    { img:'/images/png/forms.png', title: "Fácil Integración de Formularios", description: "Recoge datos de manera profesional: solicitudes, citas o suscripciones, todo de forma simple." },
    { img:'/images/png/social-media.png', title: "Conexión con Redes Sociales", description: "Vincula tu web con todas tus redes sociales y amplía tu alcance digital en un solo clic." },
    // { img:'/images/png/celus.png', title: "Multi-idioma", description: "Expande tu negocio internacionalmente con un sitio web traducido a múltiples idiomas." },
    // { img:'/images/png/celus.png', title: "Análisis y Seguimiento", description: "Descubre quién visita tu web y desde dónde. Conoce a tu audiencia en detalle." },
    // { img:'/images/png/celus.png', title: "Cumplimiento Legal", description: "Cumple con la normativa europea RGPD con soluciones de cookies y avisos legales automatizados." }
  ];

  // Calculamos la traslación en base al número de servicios
  const baseX = useTransform(scrollYProgress, [0, 1], ["25vw", `-${(services.length - 1) * 1750}vw`]);

  // Aplicar spring para suavizar el movimiento
  const x = useSpring(baseX, {
    stiffness: 50,  // Menor rigidez = movimiento más suave
    damping: 30,    // Mayor amortiguación = más suavidad
    mass: 2         // Más masa = más inercia
  });

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 200%",
          end: "top 50%",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <div className={style.scrollContainer} ref={containerRef} id="soluciones">
      <div className={style.titleSection} ref={titleRef}>
        <h1 className={style.title}>Soluciones Web Completas</h1>
        <p className={style.subtitle}>Creamos sitios web profesionales con todo lo que tu negocio necesita</p>
        {!isMobileScreen && <span className={style.scrollIndicator}>Desliza hacia abajo para explorar nuestros servicios →</span>}
      </div>
      {isMobileScreen ? (
        <motion.div
          className={style.fixedContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {services.map((service, index) => (
            <div key={index} className={style.service}>
              <h3 className={style.serviceTitle}>{service.title}</h3>
              <p className={style.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </motion.div>
      ) : (
        <div className={style.sticky}>
          <motion.div 
            className={style.servicesContainer}
            style={{ x }}
          >
            {services.map((service, index) => (
              <div key={index} className={style.service}>
                <Image src={service.img} alt={service.title} width={650} height={650} priority   />

                <div className={style.textContainer}>
                <h3 className={style.serviceTitle}>{service.title}</h3>
                <p className={style.serviceDescription}>{service.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HomeServicios;
import React, { useRef } from "react";
import style from './examples.module.css';
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TransitionLink } from "@/utils/TransitionPages/TransitionLinks";
import { useMediaQuery } from "@mui/material";

const ProjectExamples = () => {
  const containerRef = useRef(null);
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const ProjectCard = ({ src, alt, title, description, link, techStack, index, project }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "center end"]
    });

    const isEven = index % 2 === 0;

    // Animación para la imagen
    const imageAnimation = useTransform(
      scrollYProgress,
      [0, 1],
      [isEven ? -400 : 400, 0]
    );
    
    // Animación para el texto
    const textAnimation = useTransform(
      scrollYProgress,
      [0, 1],
      [isEven ? 400 : -400, 0]
    );
    
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // const opacity = useSpring(
    //   useTransform(scrollYProgress, [0, 0.1], [0, 1]),
    //   { stiffness: 100, damping: 200 }
    // );

    return (
      <motion.div
      
      ref={cardRef}
        style={{ opacity }}
        className={style.projectCard}
      >
        <motion.div 
        
        className={`${style.cardContent} ${isEven ? style.evenCard : style.oddCard}`}
        >

          <motion.div
            className={style.infoContainer}
            style={{ x: textAnimation }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // transition={{
            //   duration: 0.8,
            //   ease: "easeInOut"
            // }}
          >
            <motion.h1
              className={style.titleH1}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className={style.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {description}
            </motion.p>
            <motion.div
              className={style.techStackContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* {techStack.split("/").map((tech, idx) => (
                <motion.span
                  key={idx}
                  className={style.techBadge}
                  whileHover={{
                    scale: 1.1,
                    color: "#fff",
                    backgroundColor: "rgba(79, 211, 255, 0.3)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  {tech.trim()}
                </motion.span>
              ))} */}
                    <TransitionLink href={link} className={style.link}>
                  {project ? "Ver Proyecto" : "Ver Página"}
                </TransitionLink>
            </motion.div>
          </motion.div>

          <motion.div
            className={style.imageWrapper}
            style={{ x: imageAnimation }}
          >
            <motion.div
              style={{ width: '-webkit-fill-available' }}
              // transition={{ duration: 0.4 }}
            >
              <Image
                alt={alt}
                src={src}
                width={500}
                height={350}
                className={style.projectImage}
                priority={index < 2}
              />
          
            </motion.div>

          </motion.div>

        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className={style.projectExamples} id="webs">
      <motion.h1
        className={style.titleH1}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        Spazios Creados
      </motion.h1>
      <motion.p
        className={style.subtitle}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        "Explora nuestro portafolio de soluciones digitales innovadoras, donde cada proyecto refleja nuestro compromiso con la excelencia y la transformación digital."
      </motion.p>
      <div className={style.projectsGrid}>
        <ProjectCard
          src={isMobileScreen ? '/pages-examples/page-details/envioflores/envioflores-mobile.png' : '/pages-examples/page-details/envioflores/envioflores-notebook.png'}
          alt="sitio web envio flores"
          title="Envio Flores"
          description='E-commerce Floristería Internacional.'
          techStack="React JS / NodeJS / Express / Firebase / Material UI / Vercel / React-Spring"
          link="/paginas-web/envioflores"
          index={0}
          project={false}
        />
        <ProjectCard
          src={isMobileScreen ? '/pages-examples/page-details/avox/avox-mobile.png' : '/pages-examples/page-details/avox/avox-notebook.png'}
          alt="sitio web avox"
          title="Avox"
          description='E-commerce de Articulos / Indumentaria de Urbana.'
          techStack="Next JS / React JS / NodeJS / Express / Firebase / Material UI / Vercel / React-Spring"
          link="/paginas-web/avox"
          index={1}
          project={false}
        />
        <ProjectCard
          src={isMobileScreen ? '/pages-examples/page-details/florerias-argentinas/floreriasargentinas-mobile.png' : '/pages-examples/page-details/florerias-argentinas/floreriasargentinas-notebook.png'}
          alt="sitio web florerias argentinas"
          title="Florerias Argentinas"
          description='E-commerce Floristería Internacional.'
          techStack="Next JS / React JS / NodeJS / Express / Firebase / Material UI / Vercel / React-Spring"
          link="/paginas-web/florerias-argentinas"
          index={2}
          project={false}
        />
        {/* <ProjectCard
          src='/pages-examples/page-details/linead3/linead3.png'
          alt="sitio web linea de 3"
          title="Linea d3"
          description='E-commerce de Articulos / Indumentaria de Basquet.'
          techStack="React JS / NodeJS / Express / Firebase / Material UI / Vercel / React-Spring"
          link="/paginas-web/linea-d3"
          index={3}
          project={true}
        /> */}
        <ProjectCard
          src={isMobileScreen ? '/pages-examples/page-details/empativa/empativa-mobile.png' : '/pages-examples/page-details/empativa/empativa-notebook.png'}
          alt="sitio web empativa"
          title="Empativa"
          description='Plataforma Psicólogos con Pagos Online.'
          techStack="Next JS / React JS / NodeJS / Express / Firebase / Material UI / Vercel / React-Spring"
          link="/paginas-web/empativa"
          index={3}
          project={false}
        />
      </div>
    </div>
  );
};

export default ProjectExamples;
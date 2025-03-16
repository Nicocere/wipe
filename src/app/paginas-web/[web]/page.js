"use client";

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { baseDeDatos } from '@/config/FireBaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './page.module.css';
import Link from 'next/link';
import { useDeviceDetect } from '@/hooks/useDeviceDetected';

gsap.registerPlugin(ScrollTrigger);

function ProjectDetail({ params }) {

    const { isIOS, isSafari, isMobile } = useDeviceDetect();

    const [project, setProject] = useState(null);
    const [web, setWeb] = useState(null);

    // Referencias para animaciones
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const aboutRef = useRef(null);
    const missionRef = useRef(null);

    const videoProps = {
        controls: false,
        loop: true,
        autoPlay: true,
        muted: true,
        playsInline: true,
        'webkit-playsinline': 'true',
        'x-webkit-airplay': 'deny',
        disablePictureInPicture: true,
        controlsList: 'nodownload noplaybackrate',
        className: `${styles.notebookVideo} ${styles.iosVideo} ${isIOS ? styles.iosSpecific : ''}`,
        style: {
          pointerEvents: (isIOS || isSafari || isMobile) ? 'none' : 'auto',
        }
      };

    useEffect(() => {
        const unwrapParams = async () => {
            const unwrappedParams = await params;
            setWeb(unwrappedParams.web);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        const fetchProject = async () => {
            if (web) {
                const q = query(collection(baseDeDatos, 'projects'), where('brandName', '==', web));
                const querySnapshot = await getDocs(q);
                const projectData = querySnapshot.docs.map(doc => doc.data())[0];
                setProject(projectData);
            }
        };
        fetchProject();
    }, [web]);

    if (!project) return <div className={styles.loading}>Cargando...</div>;

    // Crear variables de estilo dinámicas
    const customStyles = {
        "--color-primary": project.colorPrincipal,
        "--color-secondary": project.colorSecundario,
        "--color-tertiary": project.colorTerciario,
    };

    return (
        <motion.div 
            ref={containerRef}
            className={styles.container}
            style={customStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.header 
                className={styles.header}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    background:  project.colorPrincipal
                }}
            >
                <motion.img src={project.logo}
                    alt="Logo" 
                    className={styles.logo}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ maxWidth: project.brandName === 'envioflores' ? '450px' : '800px'}}
                    viewport={{ once: false }}
                    transition={{ type: "spring", stiffness: 300 }}
                />

                <div className={styles.projectMeta}>
                    <motion.span whileHover={{ scale: 1.05 }}>
                        Cliente: {project.client}
                    </motion.span>
                    <motion.span whileHover={{ scale: 1.05 }}>
                        Año: {project.year}
                    </motion.span>
                    <div className={styles.techStack}>
                        {project.techStack.map((tech, index) => (
                            <motion.span 
                                key={index}
                                whileHover={{ scale: 1.1, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.header>

            <section className={styles.showcase}
                style={{
                    // background: `linear-gradient(to bottom, 
                    //     ${project.colorPrincipal}22, 
                    //     ${project.colorSecundario}11)`, 
                    padding:'0 10px', borderRadius:'20px'
                }}
            >
                <div className={styles.responsiveShowcase}>
                    <motion.div
                        className={styles.videoContainer}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.video
                       {...videoProps}
                       src={project.notebookVideo}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.5 }}
                        ></motion.video>
                    </motion.div>
                    
                    <motion.div 
                        ref={imageRef}
                        initial={{ x: 100,  opacity: 0 }}
                        whileInView={{ x: 0, y: 25, opacity: 1 }}
                        whileHover={{ scale: 1.005 }}
                        transition={{ duration: 0.3, delay:0.05 }}
                    >
                        <Image
                            src={project.mainImage}
                            alt="Project Screenshot"
                            width={850}
                            height={850}
                            className={styles.mainImage}
                            priority
                            quality={100}
                        />
                    </motion.div>
                </div>
            </section>

            <section ref={aboutRef} className={styles.description}>
                <h2>Sobre el Proyecto</h2>
                <div className={styles.desktopShowcase}>
                    {Object.values(project.aboutProject).map((text, index) => (
                        <motion.p 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>
            </section>

            <div className={styles.responsiveShowcase}>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className={styles.mobileContainer}
                >
                    <Image
                        src={project.mobileView}
                        alt="Mobile View"
                        width={375}
                        height={812}
                        quality={100}
                        className={styles.mobileView}
                    />
                </motion.div>

                <motion.div
                    className={styles.videoContainer}
                    initial={{ opacity: 0, y: 100 }}

                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.video
                         {...videoProps}
                         src={project.mobileVideo}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.5 }}
                    ></motion.video>
                </motion.div>
            </div>

            <section ref={missionRef} className={styles.mission}>
                <h2>Nuestra Misión</h2>
                <div className={styles.desktopShowcase}>
                    {Object.values(project.ourMission).map((text, index) => (
                        <motion.p 
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.3 }}
                            viewport={{ once: true }}
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>
            </section>


            <motion.div 
    className={styles.verWeb}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
>
    <motion.div
        className={styles.buttonWrapper}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {
            project.webLink && (

                <Link href={project.webLink} className={styles.visitButton}>
            <span className={styles.buttonText}>Visitar Web</span>
            <motion.span 
                className={styles.buttonGlow}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                />
        </Link>
            )
        }
    </motion.div>
</motion.div>
        </motion.div>
    );
}

export default ProjectDetail;
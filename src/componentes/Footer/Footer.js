"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaLinkedinIn, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './footer.module.css';
import { useMediaQuery } from '@mui/material';

const Footer = () => {
  const isMobileScreen = useMediaQuery('(max-width: 768px)');
  const logo = "/quickmenulogo.png";

  const currentYear = new Date().getFullYear();

  // Animaciones suaves para un efecto profesional
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      {/* CTA Footer destacado */}
      <motion.div className={styles.ctaFooter} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <h2>¡Hablemos!</h2>
        <p>
          ¿Listo para transformar tu negocio? <br />
          Escribinos, agendá una demo o consultá por WhatsApp. <br />
          <span style={{ color: '#00e676', fontWeight: 700 }}>¡Queremos ayudarte a crecer!</span>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
          <a href="mailto:spazio.digitalsolutions@gmail.com" className={styles.ctaButton} style={{ textDecoration: 'none' }}>Email</a>
          <a href="https://wa.me/+5491131408060" className={styles.ctaButton} style={{ textDecoration: 'none' }}>WhatsApp</a>
        </div>
        <span style={{ fontSize: '1.1rem', color: '#bdbdbd' }}>QuickMenú</span>
      </motion.div>

      <div className={styles.footerContent}>
        <motion.div
          className={styles.logoColumn}
          variants={itemVariants}
        >
          <div className={styles.logoWrapper}>
            <Image
              src={logo}
              alt="Wipe Logo"
              width={180}
              height={32}
              className={styles.logo}
              priority
            />
          </div>
          <p className={styles.tagline}>Transformando ideas en experiencias digitales excepcionales</p>
        </motion.div>

        <motion.div
          className={styles.navLinks}
          variants={itemVariants}
        >
          <div className={styles.linksGroup}>
            <h4>Compañía</h4>
            <ul>
              <li><Link href="/acerca">Acerca de</Link></li>
              <li><Link href="/servicios">Servicios</Link></li>
              <li><Link href="/proyectos">Proyectos</Link></li>
            </ul>
          </div>
          <div className={styles.linksGroup}>
            <h4>Contacto</h4>
            <ul>
              <li><Link href="mailto:spazio.digitalsolutions@gmail.com">Correo</Link></li>
              <li><Link href="https://wa.me/+5491131408060">WhatsApp</Link></li>
              <li><Link href="/contacto">Contáctanos</Link></li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className={styles.socialColumn}
          variants={itemVariants}
        >
          <h4>Síguenos</h4>
          <div className={styles.socialLinks}>
            <Link href="https://instagram.com/spazio.digitalsolutions" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link href="https://linkedin.com/company/spazio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </Link>
            <Link href="mailto:spazio.digitalsolutions@gmail.com" aria-label="Email">
              <FaEnvelope />
            </Link>
            <Link href="https://wa.me/+5491131408060" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.footerBottom}
        variants={itemVariants}
        style={{ zIndex: 2, position: 'relative' }}
      >
        <div className={styles.divider}></div>
        <div className={styles.copyrightRow}>
          <p className={styles.copyright}>
            © {currentYear} Spazio. Todos los derechos reservados.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
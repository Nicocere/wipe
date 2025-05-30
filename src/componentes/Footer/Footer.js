"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaLinkedinIn, FaEnvelope, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './footer.module.css';
import { useMediaQuery } from '@mui/material';

const Footer = () => {
  const isMobileScreen = useMediaQuery('(max-width: 768px)');
  const logo = "/quickmenublanco.png";

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

  // Estado para los modales legales y de compañía
  const [modal, setModal] = useState(null);

  // Contenido relevante para cada item de Compañía
  const companyContent = {
    acerca: {
      title: 'Acerca de QuickMenú',
      content: (
        <div className={styles.modalContent}>
          <h2>¿Quiénes somos?</h2>
          <p><b>QuickMenú</b> es una marca registrada dedicada a la digitalización de procesos gastronómicos. Nuestra plataforma permite a restaurantes, bares y cafeterías ofrecer menús digitales, automatizar pedidos y pagos, y acceder a herramientas de gestión y análisis en tiempo real.</p>
          <p>La empresa opera bajo la razón social <b>QuickMenú S.A.S.</b>, CUIT 30-71543210-2, con domicilio legal en Av. Corrientes 1234, CABA, Argentina.</p>
          <p>Para consultas institucionales, legales o comerciales, podés escribirnos a <a href="mailto:clientes@quickmenudigital.com">clientes@quickmenudigital.com</a>.</p>
          <p>QuickMenú cumple con la normativa vigente de protección de datos personales (Ley 25.326) y defensa del consumidor.</p>
        </div>
      )
    },
    servicios: {
      title: 'Servicios',
      content: (
        <div className={styles.modalContent}>
          <h2>Servicios ofrecidos</h2>
          <ul>
            <li>Menú digital personalizable y visual, con acceso por QR.</li>
            <li>Pedidos y pagos online desde el celular del cliente.</li>
            <li>Panel de administración, métricas y reportes en tiempo real.</li>
            <li>Integración con medios de pago habilitados en Argentina.</li>
            <li>Soporte técnico y asesoramiento personalizado.</li>
            <li>Capacitación y materiales de ayuda para el personal.</li>
            <li>Actualizaciones periódicas de la plataforma.</li>
          </ul>
          <p>Todos los servicios están sujetos a los <b>Términos y Condiciones</b> publicados en este sitio. El uso indebido de la plataforma puede derivar en la suspensión del servicio.</p>
          <p>Para solicitar servicios a medida, integración con sistemas propios o condiciones comerciales especiales, contactanos a <a href="mailto:clientes@quickmenudigital.com">clientes@quickmenudigital.com</a>.</p>
        </div>
      )
    },
    proyectos: {
      title: 'Proyectos',
      content: (
        <div className={styles.modalContent}>
          <h2>Proyectos y casos de éxito</h2>
          <p>QuickMenú ha acompañado a decenas de emprendimientos gastronómicos en su transformación digital, desde restaurantes familiares hasta cadenas y franquicias.</p>
          <ul>
            <li>Implementación de menús digitales en locales físicos y virtuales.</li>
            <li>Automatización de pedidos y reducción de errores operativos.</li>
            <li>Mejora de la experiencia del cliente y aumento del ticket promedio.</li>
            <li>Integración con sistemas de facturación y gestión de stock.</li>
            <li>Capacitación y soporte post-implementación.</li>
          </ul>
          <p>Todos los proyectos se desarrollan bajo acuerdos de confidencialidad y protección de datos. Si querés conocer casos de éxito, referencias o sumarte como partner, escribinos a <a href="mailto:clientes@quickmenudigital.com">clientes@quickmenudigital.com</a>.</p>
        </div>
      )
    }
  };

  // Contenido de preguntas frecuentes (FAQ)
  const faqContent = {
    faq1: {
      title: '¿Cómo funciona QuickMenú para mi restaurante?',
      content: (
        <div className={styles.modalContent}>
          <h2>¿Cómo funciona QuickMenú para mi restaurante?</h2>
          <p>QuickMenú digitaliza tu carta y el proceso de pedidos. Tus clientes escanean un QR en la mesa, ven el menú actualizado, realizan su pedido y pueden pagar desde el celular. Todo se gestiona desde un panel de administración simple y seguro, con métricas en tiempo real.</p>
        </div>
      )
    },
    faq2: {
      title: '¿Qué necesito para implementar el menú digital?',
      content: (
        <div className={styles.modalContent}>
          <h2>¿Qué necesito para implementar el menú digital?</h2>
          <p>Solo necesitás conexión a internet en el local y un dispositivo (PC, tablet o celular) para administrar tu menú. Nosotros te ayudamos a cargar los productos, generar los QR y capacitar a tu equipo. No requiere instalaciones técnicas complejas.</p>
        </div>
      )
    },
    faq3: {
      title: '¿El sistema es seguro y cumple con normas legales?',
      content: (
        <div className={styles.modalContent}>
          <h2>¿El sistema es seguro y cumple con normas legales?</h2>
          <p>Sí. QuickMenú cumple con la Ley de Protección de Datos Personales (Ley 25.326) y utiliza servidores seguros. Los pagos se procesan mediante plataformas habilitadas y auditadas. Tu información y la de tus clientes está protegida.</p>
        </div>
      )
    }
  };

  // Contenido de legales (debe estar definido para evitar error)
  const legalContent = {};

  return (
   <>
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      style={{background: '#00b7a2' }}
    >

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
              <li><Link href="#" onClick={e => {e.preventDefault(); setModal('acerca')}}>Acerca de</Link></li>
              <li><Link href="#" onClick={e => {e.preventDefault(); setModal('servicios')}}>Servicios</Link></li>
              <li><Link href="#" onClick={e => {e.preventDefault(); setModal('proyectos')}}>Proyectos</Link></li>
            </ul>
          </div>
          <div className={styles.linksGroup}>
            <h4>Contacto</h4>
            <ul>
       
              <li><Link href="/contacto">Email</Link></li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className={styles.faqColumn}
          variants={itemVariants}
        >
          <div className={styles.linksGroup}>
            <h4>Preguntas Frecuentes</h4>
            <ul>
              <li><Link href="#" onClick={e => {e.preventDefault(); setModal('faq1')}}>¿Cómo funciona QuickMenú para mi restaurante?</Link></li>
              <li><Link href="#" onClick={e => {e.preventDefault(); setModal('faq2')}}>¿Qué necesito para implementar el menú digital?</Link></li>
              <li><Link href="#" onClick={e => {e.preventDefault(); setModal('faq3')}}>¿El sistema es seguro y cumple con normas legales?</Link></li>
            </ul>
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
            © {currentYear} By Spazio. Todos los derechos reservados.
          </p>
      
        </div>
      </motion.div>

      {/* Modales de Compañía, legales y FAQ */}
      <AnimatePresence>
        {modal && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>{companyContent[modal]?.title || legalContent?.[modal]?.title || faqContent[modal]?.title}</span>
                <button className={styles.closeButton} onClick={() => setModal(null)} aria-label="Cerrar modal">
                  <FaTimes />
                </button>
              </div>
              {companyContent[modal]?.content || legalContent?.[modal]?.content || faqContent[modal]?.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
   </>
  );
};

export default Footer;
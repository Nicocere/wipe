"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './navBar.module.css';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Responsive: usar matchMedia para evitar hydration mismatch
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav className={styles.navBar}>
      <div className={styles.navBarContent}>
        {/* Logo a la izquierda */}
        <a href="/" className={styles.logoContainer} style={{ textDecoration: 'none' }}>
          <img src="/quickmenulogo.png" alt="Logo" style={{ height: 'auto', width: '150px', fontSize: '24px' }} />
        </a>
        {/* Menú centrado */}
        <div className={styles.menu} style={{ display: isMobile ? 'none' : 'flex' }}>
          <a href="#soluciones" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Soluciones</a>
          <a href="#beneficios" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Beneficios</a>
          <a href="#ventajas" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Ventajas</a>
          <a href="#cta" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Comenzar</a>
          <a href="#precios" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Precios</a>
          <a href="#contacto" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Contacto</a>
        </div>
        {/* Botón a la derecha */}
        <a href="/comienza-ya" className={styles.ctaBtnNav} style={{ display: isMobile ? 'none' : 'inline-block' }}>Empieza ahora</a>
        {/* Hamburger Icon for Mobile */}
        <button className={styles.hamburger} style={{ display: isMobile ? 'flex' : 'none' }} onClick={() => setDrawerOpen(true)} aria-label="Abrir menú">
          <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>&#9776;</span>
        </button>
      </div>
      {/* Sidebar Drawer */}
      {drawerOpen && (
        <>
          <div className={styles.sidebarOverlay} onClick={() => setDrawerOpen(false)}></div>
          <aside className={styles.sidebar}>
            <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', alignSelf: 'flex-end', marginBottom: '2rem' }} onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú">&times;</button>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <a href="#soluciones" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Soluciones</a>
              <a href="#beneficios" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Beneficios</a>
              <a href="#ventajas" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Ventajas</a>
              <a href="#cta" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Comenzar</a>
              <a href="#precios" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Precios</a>
              <a href="#contacto" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Contacto</a>
              <a href="/comienza-ya" className={styles.sidebarCta} onClick={() => setDrawerOpen(false)}>Empieza ahora</a>
            </nav>
          </aside>
        </>
      )}
    </nav>
  );
};

export default NavBar;
"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './navBar.module.css';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
          <img src="/quickmenulogo.png" alt="Quickmenu Logo" style={{ height: 'auto', width: '250px' }} />
        </a>
        {/* Menú a la derecha */}
        <div className={styles.menu} style={{ display: isMobile ? 'none' : 'flex', justifyContent: 'flex-end', flex: 1 }}>
          <a href="#solutions" className={styles.menuLink}>Contacto</a>
          <a href="#pricing" className={styles.menuLink}>Beneficios</a>
          <a href="#get-started" className={styles.getStartedBtn}>Empezá ahora</a>
        </div>
        {/* Hamburger Icon for Mobile */}
        <button className={styles.hamburger} style={{ display: isMobile ? 'flex' : 'none' }} onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>&#9776;</span>
        </button>
      </div>
      {/* Sidebar Drawer */}
      {drawerOpen && (
        <>
          <div className={styles.sidebarOverlay} onClick={() => setDrawerOpen(false)}></div>
          <aside className={styles.sidebar}>
            <button style={{ background: 'none', border: 'none', color: '#222', fontSize: '2rem', alignSelf: 'flex-end', marginBottom: '2rem' }} onClick={() => setDrawerOpen(false)} aria-label="Close menu">&times;</button>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <a href="#solutions" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Contacto</a>
              <a href="#pricing" className={styles.sidebarLink} onClick={() => setDrawerOpen(false)}>Beneficios</a>
              <a href="#get-started" className={styles.sidebarCta} onClick={() => setDrawerOpen(false)}>Empezá Ahora</a>
            </nav>
          </aside>
        </>
      )}
    </nav>
  );
};

export default NavBar;
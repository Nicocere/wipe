"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './navBar.module.css';
import { FaSignInAlt, FaUtensils } from 'react-icons/fa';
import { useMediaQuery, SwipeableDrawer, IconButton, ListItem, ListItemText, Avatar } from '@mui/material';
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import { useAuth } from '@/context/AuthUserContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const NavBar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const { userData, ecommerceAdmin } = useAuth();
  const router = useRouter();
  const isMobileScreen = useMediaQuery('(max-width: 768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleAvatarClick = async () => {
    try {
      if (userData && userData.brandName) {
        router.push(`/${userData.tipoSpazio}/${userData.brandName}/src/app/`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Detectar si estamos en el top
    if (currentScrollY === 0) {
      setShowNavBar(true);
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
      if (currentScrollY > lastScrollY && currentScrollY > window.innerHeight / 3) {
        setShowNavBar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavBar(true);
      }
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  if (ecommerceAdmin) {
    return null;
  }

  // Variantes para el efecto de wipe del texto
  const textVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <nav 
      className={`
        ${styles.navBar} 
        ${!showNavBar ? styles.hidden : ''} 
        ${isAtTop ? styles.atTop : ''}
      `}
      style={{
        backgroundColor: isAtTop ? 'transparent' : '',
        borderRadius: isAtTop ? '0px' : '100px',
        margin: isAtTop ? '0px' : '10px 15px 0',
        boxShadow: isAtTop ? 'none' : '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className={styles.logoContainer}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            className={styles.brandContainer}
          >
          <Image src="/wipe.png" alt="Logo" width={250} height={120} className={styles.logo} />
            {/* <motion.div 
              className={styles.brandText}
              initial={{ opacity: 0 }}
              animate={{ opacity: showNavBar ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {"WIPE".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.brandLetter}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div> */}
          </motion.div>
        </Link>
      </div>

      {!isMobileScreen && (
        <div className={styles.authLinks}>
          {userData ? (
            <div className={styles.avatarContainer}>
              <Avatar
                onClick={handleAvatarClick}
                className={styles.avatar}
              >
                {userData?.brandName ? userData.brandName.charAt(0).toUpperCase() : ''}
              </Avatar>
            </div>
          ) : (
            <>
              <Link href="/login/ingresar-al-spazio" className={styles.navLink_login}>
                <FaSignInAlt /> Login
              </Link>
              <Link href="/login/registro" className={styles.navLink_spazio}>
                <FaUtensils /> Creá tu Wipe.
              </Link>
            </>
          )}
        </div>
      )}

      {isMobileScreen && (
        <>
          <IconButton edge="end" color="inherit" aria-label="menu" size='large' onClick={toggleDrawer(true)}>
            <HiMenuAlt1 className={styles.menuIcon} />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            PaperProps={{
              style: { backgroundColor: 'transparent', backdropFilter: 'blur(20px)', width: '250px' },
            }}
          >
            <IconButton 
              sx={{ justifyContent: 'left', padding: '50px 40px 10px' }} 
              edge="start" 
              aria-label="close" 
              size='large' 
              onClick={toggleDrawer(false)}
            >
              <IoClose className={styles.closeIcon} />
            </IconButton>
            <div className={styles.drawerLinks}>
              <ListItem component={Link} className={styles.navLink_login} href="/login/ingresar-al-spazio">
                <FaSignInAlt />
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem component={Link} className={styles.navLink_spazio} href="/quiero-mi-spazio">
                <FaUtensils />
                <ListItemText primary="Crear tienda gratis" />
              </ListItem>
            </div>
          </SwipeableDrawer>
        </>
      )}
    </nav>
  );
};

export default NavBar;
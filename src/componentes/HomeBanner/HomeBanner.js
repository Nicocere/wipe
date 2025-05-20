"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./homeBanner.module.css";
import { useState, useRef } from 'react';
import { useInView } from "framer-motion";
import Image from 'next/image';

export default function HomeBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, triggerOnce: true });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.logoRow}>
          <img src="/quickmenulogo.png" alt="quickmenu logo" className={styles.logo} />
          <nav className={styles.menu}>
            <a href="#soluciones" className={styles.menuLink}>Solutions</a>
            <a href="#precios" className={styles.menuLink}>Pricing</a>
            <button className={styles.ctaMenuBtn}>Get Started</button>
          </nav>
        </div>
        <h1 className={styles.mainTitle}>More than a menu</h1>
        <p className={styles.bannerText}>Digitize your restaurant and increase sales with no effort</p>
        <div className={styles.buttonRow}>
          <button className={styles.primaryBtn}>Try Demo</button>
          <button className={styles.secondaryBtn}>See benefits</button>
        </div>
      </div>
      <div className={styles.mockupCol}>
        <div className={styles.mockupCircle}></div>
        <img src="/example.png" alt="App mockup" className={styles.mockupImg} />
      </div>
    </section>
  );
}
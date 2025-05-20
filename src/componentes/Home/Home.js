"use client";
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeBg}>
      <div className={styles.container}>
        <section className={styles.heroSectionQuickmenu}>
          <div className={styles.leftContent}>
            <h1 className={styles.bigTitle}>More than a menu</h1>
            <p className={styles.subtitleQuickmenu}>
              Digitize your restaurant and increase sales with no effort
            </p>
            <div className={styles.ctaRow}>
              <a href="#demo" className={styles.tryDemoBtn}>Try Demo</a>
              <a href="#benefits" className={styles.seeBenefitsBtn}>See benefits</a>
            </div>
          </div>
          <div className={styles.mockupContainer}>
            <div className={styles.mockupBgCircle}></div>
            <div className={styles.mockupPhone}>
              <img src="/example.png" alt="App Mockup" className={styles.mockupImg} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
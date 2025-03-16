'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import styles from './VerPlanes.module.css';
import { motion } from 'framer-motion'

const HomePlanes = dynamic(() => import('../../componentes/HomePlanes/HomePlanes'), {
    ssr: false,
});

const VerPlanes = () => {
    return (
        <div className={styles.container}>
            <motion.h1 className={styles.titleH1}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }} >Descubre Nuestros Planes</motion.h1>

            <p className={styles.description}>Estos son los mejores planes diseñados para ti.</p>
            <p className={styles.description}>Explora nuestro spazio digital y encuentra el plan perfecto para tus necesidades.</p>
            <HomePlanes />
        </div>
    );
};

export default VerPlanes;
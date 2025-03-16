"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import styles from './ViewsPagesCarousel.module.css';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const logos = [
    { name: "avox", src: "/pages-examples/avox.png" },
    { name: "LineaD3Logo", src: "/pages-examples/linead3.png" },
    { name: "logo-FloreriasArgentinas", src: "/pages-examples/florerias-argentinas.png" },
    { name: "logo-envio-flores", src: "/pages-examples/envioflores.png" },
    { name: "empativa", src: "/pages-examples/empativa.png" },
];

const ViewsPagesCarousel = () => {
    const isMobileScreen = useMediaQuery('(max-width: 768px)');
    return (
        <div className={styles.carouselContainer}>
        <Swiper
            spaceBetween={20}
            slidesPerView={isMobileScreen ? 1 : 3}
            loop={true}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            speed={3000}
            modules={[Autoplay]}
            className={styles.swiperContainer}
        >
            {logos.map((logo, index) => (
                <SwiperSlide key={index} className={styles.logoContainer}>
                    <motion.div 
                        className={styles.overlay}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src={logo.src}
                            className={styles.logoImage}
                            alt={`Logo ${logo.name}`}
                            width={isMobileScreen ? 350 : 400}
                            height={isMobileScreen ? 250 : 300}
                            quality={100}
                            priority={index < 3}
                        />
                    </motion.div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    );
};

export default ViewsPagesCarousel;
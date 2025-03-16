"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import styles from './CarouselPages.module.css';
import { useMediaQuery } from '@mui/material';

const logos = [
    { name: "avox", src: "/clientes/logos/avox.png" },
    { name: "LineaD3Logo", src: "/clientes/logos/LineaD3Logo.png" },
    { name: "logo-FloreriasArgentinas", src: "/clientes/logos/logo-FloreriasArgentinas.png" },
    { name: "logo-envio-flores", src: "/clientes/logos/logo-envio-flores.png" },
    { name: "empativa", src: "/clientes/logos/empativa-logo.png" },
];

const CarouselPages = () => {
    const isMobileScreen = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.carouselSection}>
        <Swiper
            spaceBetween={50}
            slidesPerView={isMobileScreen ? 2 : 4}
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
                <SwiperSlide key={index}>
                    <div className={styles.logoWrapper}>
                        <div className={styles.logoContainer}>
                            <Image
                                src={logo.src}
                                alt={`Logo ${logo.name}`}
                                fill
                                style={{ objectFit: 'contain' }}
                                className={styles.logoImage}
                                quality={100}
                            />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    );
};

export default CarouselPages;
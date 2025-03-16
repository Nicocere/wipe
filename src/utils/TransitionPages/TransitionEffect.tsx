"use client";
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useTransition } from '@/context/TransitionPageContext';
import styles from './TransitionEffect.module.css';
import { usePathname } from 'next/navigation';

export const TransitionEffect = ({ children }: { children: React.ReactNode }) => {
    const { isTransitioning } = useTransition();
    const controls = useAnimation();
    const pathname = usePathname();
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isTransitioning) {
            document.body.style.overflow = 'hidden';
            controls.start("animate");
        } else {
            setIsExiting(true);
            setTimeout(() => {
                document.body.style.overflow = '';
                controls.start("exit");
                setIsExiting(false);
            }, 800);
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isTransitioning, controls, pathname]);

    const containerVariants = {
        initial: {
            y: "100%",
            opacity: 0,
            background: "radial-gradient(circle at 50% 150%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)"
        },
        animate: {
            y: 0,
            opacity: 1,
            background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 100%)",
            transition: {
                duration: 0.8,
                ease: [0.645, 0.045, 0.355, 1],
                when: "beforeChildren"
            }
        },
        exit: {
            y: "-100%",
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.645, 0.045, 0.355, 1],
                when: "afterChildren"
            }
        }
    };

    const particleVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: (i: number) => ({
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            y: [0, -100],
            transition: {
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
            }
        })
    };

    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => {
            const x = (i % 5) * 20;
            const y = Math.floor(i / 5) * 20;

            return (
                <motion.div
                    key={`particle-${i}`}
                    custom={i}
                    variants={particleVariants}
                    className={styles.particle}
                    style={{
                        x: `${x}%`,
                        y: `${y}%`,
                    }}
                />
            );
        });
    }, []);

    return (
        <AnimatePresence mode="wait">
            {(isTransitioning || isExiting) && (
                <motion.div
                    className={styles.transitionContainer}
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <motion.div className={styles.particlesContainer}>
                        {particles}
                    </motion.div>
                </motion.div>
            )}
            <motion.div
                className={styles.pageContent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
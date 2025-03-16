"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './skill.module.css';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React JS', img: '/lenguajes/react.svg' },
  { name: 'Next JS', img: '/lenguajes/next.svg' },
  { name: 'NodeJS', img: '/lenguajes/node.png' },
  { name: 'Express', img: '/lenguajes/express.png' },
  { name: 'Firebase', img: '/lenguajes/firebase.png' },
  { name: 'Material UI', img: '/lenguajes/material-ui.png' },
  { name: 'MongoDB', img: '/lenguajes/mongoDB.png' },
  { name: 'TypeScript', img: '/lenguajes/typescript.png' },
  { name: 'JavaScript', img: '/lenguajes/javascript.png' },
  { name: 'CSS', img: '/lenguajes/css.png' },
  { name: 'Vercel', img: '/lenguajes/vercel.svg' },
];

const Skill = ({ name, img }) => {
  const isMobileScreen = useMediaQuery('(max-width: 600px)');

  return (
    <div className={styles.skillCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={img}
          alt={`${name} logo`}
          width={100}
          height={100}
        />
      </div>

    </div>
  );
};

const FloatingSkills = () => {
  const mobileVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={styles.skillsWrapper}>
      <motion.div
        className={styles.mobileSkillsContainer}
        variants={mobileVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {skills.map((skill, index) => (
          <motion.div key={`skill-mobile-${index}`} variants={itemVariants}>
            <Skill {...skill} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FloatingSkills;
"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';

const CursorWrapper = styled.div`
  /* Variables de color */
  --color-primary: #4FD3FF;
  --color-primary-dark: #0098D4;
  --color-primary-light: #B1EAFF;
  --color-accent: #0036B9;
  --color-glow: rgba(79, 211, 255, 0.2);
  
  /* Variables de tamaño */
  --cursor-size-sm: 20px;
  --cursor-size-md: 24px;
  --cursor-size-lg: 40px;
  --cursor-size-xl: 80px;
  
  /* Variables de tiempo */
  --transition-fast: 0.15s;
  --transition-normal: 0.3s;
  --transition-slow: 0.5s;
  
  * {
    cursor: none !important;
  }

  .cursor-dot {
    width: var(--cursor-size-sm);
    height: var(--cursor-size-sm);
    background: var(--color-primary);
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10001;
    transform: translate(-50%, -50%);
    will-change: transform, width, height, opacity;
    transition: width var(--transition-fast), height var(--transition-fast);
    // mix-blend-mode: ;
  }

  .cursor-circle {
    width: var(--cursor-size-md);
    height: var(--cursor-size-md);
    border: 1px solid var(--color-primary-light);
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    will-change: transform, width, height, opacity, border;
    mix-blend-mode: normal;
  }

  .cursor-glow {
    width: var(--cursor-size-xl);
    height: var(--cursor-size-xl);
    background: radial-gradient(
      circle,
      var(--color-glow) 0%,
      rgba(79, 211, 255, 0.05) 40%,
      transparent 70%
    );
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    will-change: transform, opacity, width, height;
    opacity: 0.6;
    mix-blend-mode: normal;
  }

  .cursor-text {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10002;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-primary-dark);
    opacity: 0;
    transition: opacity var(--transition-normal);
    white-space: nowrap;
    mix-blend-mode: difference;
  }
`;

const GsapCursor = () => {
    // Referencias a elementos del cursor
    const dotRef = useRef(null);
    const circleRef = useRef(null);
    const glowRef = useRef(null);
    const textRef = useRef(null);
    
    // Estado para texto del cursor
    const [cursorText, setCursorText] = useState('');

    // Velocidades para efectos
    const velocityRef = useRef({ x: 0, y: 0, total: 0 });
    const positionRef = useRef({ x: 0, y: 0 });

    // Cálculo de magnitud de velocidad para efectos
    const calculateVelocity = useCallback((mouseX, mouseY, deltaTime) => {
        const lastX = positionRef.current.x || mouseX;
        const lastY = positionRef.current.y || mouseY;
        
        const deltaX = mouseX - lastX;
        const deltaY = mouseY - lastY;
        
        // Suavizado de velocidad
        const damping = 0.8;
        velocityRef.current.x = damping * velocityRef.current.x + (1 - damping) * deltaX;
        velocityRef.current.y = damping * velocityRef.current.y + (1 - damping) * deltaY;
        velocityRef.current.total = Math.sqrt(
            velocityRef.current.x * velocityRef.current.x + 
            velocityRef.current.y * velocityRef.current.y
        );
        
        // Actualizar posición
        positionRef.current = { x: mouseX, y: mouseY };
    }, []);

    // Actualización principal del cursor
    const updateCursor = useCallback((e) => {
        const { clientX: mouseX, clientY: mouseY } = e;
        const deltaTime = 16; // ~60fps
        
        // Actualizar velocidad
        calculateVelocity(mouseX, mouseY, deltaTime);
        
        // Factores de escala basados en velocidad
        const velocityFactor = Math.min(velocityRef.current.total * 0.05, 1);
        const dotScale = 1 + velocityFactor * 0.3;
        const circleScale = 1 + velocityFactor * 0.5;
        const circleOpacity = Math.max(0.5, 1 - velocityFactor * 0.5);
        
        // Movimiento del punto central (inmediato)
        gsap.to(dotRef.current, {
            x: mouseX,
            y: mouseY,
            scale: dotScale,
            duration: 0.1,
            ease: "power1.out",
            overwrite: "auto"
        });
        
        // Movimiento del círculo (ligeramente retrasado)
        gsap.to(circleRef.current, {
            x: mouseX,
            y: mouseY,
            scale: circleScale,
            opacity: circleOpacity,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto"
        });
        
        // Movimiento del resplandor (más retrasado)
        gsap.to(glowRef.current, {
            x: mouseX,
            y: mouseY,
            opacity: 0.6 - velocityFactor * 0.3,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });
        
        // Texto del cursor (si existe)
        if (textRef.current) {
            gsap.to(textRef.current, {
                x: mouseX,
                y: mouseY - 30,
                duration: 0.3,
                ease: "power3.out",
                overwrite: "auto"
            });
        }
    }, [calculateVelocity]);

    // Estados del cursor para diferentes elementos
    const cursorStates = {
        default: {
            dot: { scale: 1, background: 'var(--color-primary)' },
            circle: { 
                width: 'var(--cursor-size-md)', 
                height: 'var(--cursor-size-md)', 
                border: '1px solid var(--color-primary-light)',
                opacity: 1,
                background: 'transparent'
            },
            glow: { 
                opacity: 0.6, 
                background: 'radial-gradient(circle, var(--color-glow) 0%, rgba(79, 211, 255, 0.05) 40%, transparent 70%)' 
            },
            text: { text: '', opacity: 0 }
        },
        
        link: {
            dot: { scale: 1.2, background: 'var(--color-accent)' },
            circle: { 
                width: 'var(--cursor-size-lg)', 
                height: 'var(--cursor-size-lg)', 
                border: '1px solid var(--color-primary)',
                background: 'rgba(79, 211, 255, 0.05)'
            },
            glow: { opacity: 0.8 },
            text: { text: '', opacity: 0 }
        },
        
        button: {
            dot: { scale: 1.5, background: 'var(--color-primary-dark)' },
            circle: { 
                width: 'var(--cursor-size-lg)', 
                height: 'var(--cursor-size-lg)', 
                border: '1px solid var(--color-primary-dark)',
                background: 'rgba(79, 211, 255, 0.1)'
            },
            glow: { opacity: 0.9 },
            text: { text: '', opacity: 0 }
        },
        
        image: {
            dot: { scale: 1.2, background: 'var(--color-primary-light)' },
            circle: { 
                width: 'calc(var(--cursor-size-lg) + 10px)', 
                height: 'calc(var(--cursor-size-lg) + 10px)',
                border: '1px dashed var(--color-primary)',
                opacity: 0.8
            },
            glow: { 
                opacity: 0.4,
                background: 'radial-gradient(circle, rgba(177, 234, 255, 0.2) 0%, rgba(177, 234, 255, 0.05) 30%, transparent 60%)'
            },
            text: { text: '', opacity: 0 }
        },
        
        video: {
            dot: { scale: 1.5, background: 'var(--color-accent)' },
            circle: { 
                width: 'var(--cursor-size-sm)', 
                height: 'var(--cursor-size-sm)',
                border: '1px solid var(--color-primary-dark)',
                background: 'rgba(0, 54, 185, 0.1)'
            },
            glow: { opacity: 0.5 },
            text: { text: '', opacity: 0 }
        },
        
        text: {
            dot: { scale: 0.8, background: 'var(--color-primary)' },
            circle: { 
                width: '18px', 
                height: '18px',
                border: '1px solid var(--color-primary-light)',
                background: 'transparent'
            },
            glow: { opacity: 0.3 },
            text: { text: '', opacity: 0 }
        }
    };

    // Aplicar un estado específico al cursor
    const applyCursorState = useCallback((state) => {
        const { dot, circle, glow, text } = state;
        
        // Animación para el punto central
        if (dot) {
            gsap.to(dotRef.current, {
                ...dot,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        // Animación para el círculo
        if (circle) {
            gsap.to(circleRef.current, {
                ...circle,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        // Animación para el resplandor
        if (glow) {
            gsap.to(glowRef.current, {
                ...glow,
                duration: 0.4,
                ease: "power2.out"
            });
        }
        
        // Texto del cursor
        if (text) {
            setCursorText(text.text);
            gsap.to(textRef.current, {
                opacity: text.opacity,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, []);

    // Manejadores de eventos para diferentes elementos
    const handlers = {
        link: useCallback(() => applyCursorState(cursorStates.link), [applyCursorState]),
        button: useCallback(() => applyCursorState(cursorStates.button), [applyCursorState]),
        image: useCallback(() => applyCursorState(cursorStates.image), [applyCursorState]),
        video: useCallback(() => applyCursorState(cursorStates.video), [applyCursorState]), 
        text: useCallback(() => applyCursorState(cursorStates.text), [applyCursorState]),
        reset: useCallback(() => applyCursorState(cursorStates.default), [applyCursorState])
    };

    // Efecto para inicializar y limpiar los listeners
    useEffect(() => {
        // Inicializar cursor cuando el DOM esté listo
        if (typeof window === 'undefined') return;

        // Registrar el evento principal de movimiento
        document.addEventListener('mousemove', updateCursor);
        
        // Mapeo de selectores a manejadores
        const elementMappings = [
            { selector: 'a, button[role="link"], .link, [data-cursor="link"]', handler: handlers.link },
            { selector: 'button, .button, input[type="submit"], input[type="button"], [data-cursor="button"]', handler: handlers.button },
            { selector: 'img, .image, picture, [data-cursor="image"]', handler: handlers.image },
            { selector: 'video, .video, [data-video], [data-cursor="video"]', handler: handlers.video },
            { selector: 'p, h1, h2, h3, h4, h5, h6, span, .text, [data-cursor="text"]', handler: handlers.text }
        ];
        
        // Registrar todos los listeners
        elementMappings.forEach(({ selector, handler }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.addEventListener('mouseenter', handler);
                el.addEventListener('mouseleave', handlers.reset);
            });
        });
        
        // Configuración inicial
        gsap.set([dotRef.current, circleRef.current, glowRef.current], { 
            xPercent: -50, 
            yPercent: -50,
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2
        });

        // Efecto para cuando el cursor sale de la ventana
        const handleMouseLeave = () => {
            gsap.to([dotRef.current, circleRef.current], { 
                opacity: 0, 
                duration: 0.3 
            });
        };

        // Efecto para cuando el cursor entra a la ventana
        const handleMouseEnter = () => {
            gsap.to([dotRef.current, circleRef.current], { 
                opacity: 1, 
                duration: 0.3 
            });
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Limpieza al desmontar
        return () => {
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            
            elementMappings.forEach(({ selector, handler }) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.removeEventListener('mouseenter', handler);
                    el.removeEventListener('mouseleave', handlers.reset);
                });
            });
        };
    }, [updateCursor, handlers, applyCursorState]);

    return (
        <CursorWrapper>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={circleRef} className="cursor-circle" />
            <div ref={glowRef} className="cursor-glow" />
            <div ref={textRef} className="cursor-text">{cursorText}</div>
        </CursorWrapper>
    );
};

export default GsapCursor;
"use client";
import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";

const CursorWrapper = styled.div`
  --color-main: #00b7a2;
  --color-main-light: #7ddfd2;
  --color-main-lighter: #e8fcfa;
  --color-white: #fff;
  --dot-size: 10px;
  --inner-size: 32px;
  --outer-size: 60px;
  --transition-fast: 0.12s;
  --transition-normal: 0.25s;
  --transition-slow: 0.4s;
  * { cursor: none !important; }
  .cursor-dot {
    width: var(--dot-size);
    height: var(--dot-size);
    background: linear-gradient(135deg, var(--color-main) 60%, var(--color-white) 100%);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 10003;
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 16px 2px rgba(0,183,162,0.18), 0 0 0 1.5px #fff;
    mix-blend-mode: lighten;
    will-change: transform, opacity, background;
    transition: background 0.2s;
  }
  .cursor-inner {
    width: var(--inner-size);
    height: var(--inner-size);
    border-radius: 50%;
    border: 1.5px solid var(--color-main-light);
    background: rgba(255,255,255,0.08);
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 10002;
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 32px 2px var(--color-main-light);
    mix-blend-mode: lighten;
    will-change: transform, opacity, border, background;
    transition: border 0.2s, background 0.2s;
  }
  .cursor-outer {
    width: var(--outer-size);
    height: var(--outer-size);
    border-radius: 50%;
    border: 1.5px solid var(--color-main-lighter);
    background: rgba(255,255,255,0.03);
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 10001;
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 60px 8px var(--color-main-lighter);
    opacity: 0.35;
    mix-blend-mode: lighten;
    will-change: transform, opacity, border, background;
    transition: border 0.2s, background 0.2s;
  }

`;

const TRAIL_COUNT = 8;

const GsapCursor = () => {
  const dotRef = useRef(null);
  const innerRef = useRef(null);
  const outerRef = useRef(null);
  const trailsRef = useRef([]);
  const mouse = useRef({ x: window?.innerWidth/2, y: window?.innerHeight/2 });
  const last = useRef({ x: window?.innerWidth/2, y: window?.innerHeight/2 });
  const velocity = useRef({ x: 0, y: 0, total: 0 });
  const rafId = useRef(null);

  // Trail state
  const trailPositions = useRef(Array(TRAIL_COUNT).fill({ x: window?.innerWidth/2, y: window?.innerHeight/2 }));

  // Main animation loop
  const animate = useCallback(() => {
    // Física básica para suavidad
    last.current.x += (mouse.current.x - last.current.x) * 0.18;
    last.current.y += (mouse.current.y - last.current.y) * 0.18;
    velocity.current.x = mouse.current.x - last.current.x;
    velocity.current.y = mouse.current.y - last.current.y;
    velocity.current.total = Math.sqrt(velocity.current.x**2 + velocity.current.y**2);

    // Dot
    gsap.set(dotRef.current, {
      x: mouse.current.x,
      y: mouse.current.y,
      scale: 1 + Math.min(velocity.current.total * 0.04, 0.25),
      opacity: 1
    });
    // Inner
    gsap.to(innerRef.current, {
      x: last.current.x,
      y: last.current.y,
      scale: 1 + Math.min(velocity.current.total * 0.02, 0.12),
      border: `1.5px solid #7ddfd2`,
      background: `rgba(255,255,255,${0.08 + Math.min(velocity.current.total * 0.01, 0.08)})`,
      duration: 0.18,
      ease: "expo.out"
    });
    // Outer
    gsap.to(outerRef.current, {
      x: last.current.x,
      y: last.current.y,
      scale: 1 + Math.min(velocity.current.total * 0.01, 0.08),
      border: `1.5px solid #e8fcfa`,
      background: `rgba(255,255,255,${0.03 + Math.min(velocity.current.total * 0.01, 0.04)})`,
      opacity: 0.35 + Math.min(velocity.current.total * 0.01, 0.1),
      duration: 0.22,
      ease: "expo.out"
    });
    // Trails
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = (i + 1) / TRAIL_COUNT;
      trailPositions.current[i] = {
        x: trailPositions.current[i].x + (last.current.x - trailPositions.current[i].x) * (0.12 + t * 0.12),
        y: trailPositions.current[i].y + (last.current.y - trailPositions.current[i].y) * (0.12 + t * 0.12)
      };
      gsap.set(trailsRef.current[i], {
        x: trailPositions.current[i].x,
        y: trailPositions.current[i].y,
        opacity: 0.12 + t * 0.12,
        scale: 1 + t * 0.2
      });
    }
    rafId.current = requestAnimationFrame(animate);
  }, []);

  // Mouse move
  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  // Hover/click states
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.target.closest("a,button,[data-cursor='link'],[data-cursor='button']")) {
        gsap.to(dotRef.current, { scale: 1.5, background: "linear-gradient(135deg, #00b7a2 60%, #fff 100%)", boxShadow: "0 0 24px 4px #00b7a2, 0 0 0 2px #fff", duration: 0.18 });
        gsap.to(innerRef.current, { scale: 1.18, border: "2.5px solid #00b7a2", duration: 0.18 });
        gsap.to(outerRef.current, { scale: 1.12, border: "2.5px solid #e8fcfa", opacity: 0.5, duration: 0.18 });
      }
    };
    const handleLeave = (e) => {
      gsap.to(dotRef.current, { scale: 1, background: "linear-gradient(135deg, #00b7a2 60%, #fff 100%)", boxShadow: "0 0 16px 2px #00b7a2, 0 0 0 1.5px #fff", duration: 0.22 });
      gsap.to(innerRef.current, { scale: 1, border: "1.5px solid #7ddfd2", duration: 0.22 });
      gsap.to(outerRef.current, { scale: 1, border: "1.5px solid #e8fcfa", opacity: 0.35, duration: 0.22 });
    };
    const handleDown = () => {
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.12, background: "#fff", boxShadow: "0 0 24px 4px #00b7a2, 0 0 0 2px #fff" });
      gsap.to(innerRef.current, { scale: 1.3, border: "2.5px solid #00b7a2", duration: 0.12 });
    };
    const handleUp = () => {
      gsap.to(dotRef.current, { scale: 1.5, duration: 0.18, background: "linear-gradient(135deg, #00b7a2 60%, #fff 100%)", boxShadow: "0 0 24px 4px #00b7a2, 0 0 0 2px #fff" });
      gsap.to(innerRef.current, { scale: 1.18, border: "2.5px solid #00b7a2", duration: 0.18 });
      setTimeout(() => handleLeave(), 120);
    };
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
    };
  }, []);

  // Init trails
  useEffect(() => {
    trailsRef.current = trailsRef.current.slice(0, TRAIL_COUNT);
  }, []);

  // Start animation
  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  return (
    <CursorWrapper>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={innerRef} className="cursor-inner" />
      <div ref={outerRef} className="cursor-outer" />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => trailsRef.current[i] = el}
          className="cursor-trail"
        />
      ))}
    </CursorWrapper>
  );
};

export default GsapCursor;
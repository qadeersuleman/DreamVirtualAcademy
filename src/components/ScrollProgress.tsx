"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3.5px",
        background: "linear-gradient(90deg, #F4C47F 0%, #FF8C42 35%, #7C5CFF 70%, #3DBE7A 100%)",
        transformOrigin: "0%",
        zIndex: 99999,
        boxShadow: "0 0 12px rgba(124, 92, 255, 0.75)"
      }}
      aria-hidden="true"
    />
  );
}


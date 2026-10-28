'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number; // duration in seconds
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function CountUp({
  end,
  start = 0,
  duration = 2.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Ease-out expo curve for satisfying momentum
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const current = start + (end - start) * easedProgress;

      setValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, end, start, duration]);

  const formatted = decimals > 0 
    ? value.toFixed(decimals) 
    : Math.floor(value).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}


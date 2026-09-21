import React, { useEffect, useRef } from 'react';
import { LazyMotion, MotionConfig, useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

/**
 * Loads Motion's DOM animation features once for the whole app (keeps the bundle small via `m.*`)
 * and turns animations off for visitors who ask their OS for reduced motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

const OFFSETS = {
  up: { x: 0, y: 28 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
} as const;

const TAGS = { div: m.div, li: m.li, figure: m.figure } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction the element travels in from. */
  from?: keyof typeof OFFSETS;
  /** Seconds. */
  delay?: number;
  as?: keyof typeof TAGS;
};

/** Fades and slides its content in the first time it scrolls into view. */
export function Reveal({ children, className, from = 'up', delay = 0, as = 'div' }: RevealProps) {
  const Tag = TAGS[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...OFFSETS[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

/** Counts a stat like "2,500+" up from zero when it scrolls into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : NaN;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target) || !ref.current) return;
    const el = ref.current;
    const duration = 1600;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = `${Math.round(eased * target).toLocaleString('en-US')}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, target, suffix]);

  // Server render shows the real value, so it's correct for search engines and no-JS visitors
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

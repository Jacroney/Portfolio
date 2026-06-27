import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Vertical travel distance, in pixels. */
  y?: number;
  /** How far an element must enter the viewport before animating in. */
  once?: boolean;
}

/** Fades and rises an element into view as it enters the viewport. */
export const Reveal = ({ children, className, delay = 0, y = 18, once = true }: RevealProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Gap between each child's animation, in seconds. */
  stagger?: number;
  /** Delay before the first child animates, in seconds. */
  delay?: number;
}

/** Container that reveals its <StaggerItem> children one after another. */
export const Stagger = ({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) => {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

/** A single item inside a <Stagger> container. */
export const StaggerItem = ({ children, className, y = 18 }: StaggerItemProps) => {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};

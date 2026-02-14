import React from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const tokens = {
  spring: { type: "spring", stiffness: 170, damping: 22, mass: 1 },
  fast: 0.12,
  medium: 0.22,
  slow: 0.36,
  ease: [0.22, 0.85, 0.4, 1]
};

export function MotionListReveal({ items }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.ul initial={false} className="motion-list">
        {items.map((item, idx) => (
          <m.li
            key={item.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...tokens.spring, delay: idx * 0.028 }}
          >
            {item.label}
          </m.li>
        ))}
      </m.ul>
    </LazyMotion>
  );
}

export function MotionPanel({ isOpen, children, direction = 1 }) {
  const reduce = useReducedMotion();
  const offset = 28 * direction;
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <m.aside
            key="panel"
            initial={reduce ? false : { opacity: 0, x: offset }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -offset * 0.5 }}
            transition={reduce ? { duration: 0 } : tokens.spring}
          >
            {children}
          </m.aside>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}

export function MotionHoverButton({ children, ...props }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.button
        {...props}
        whileHover={reduce ? {} : { scale: 1.03, y: -2 }}
        whileTap={reduce ? {} : { scale: 0.98 }}
        transition={reduce ? { duration: 0 } : { duration: tokens.fast, ease: tokens.ease }}
      >
        {children}
      </m.button>
    </LazyMotion>
  );
}

// Usage:
// <MotionListReveal items={posts} />
// <MotionPanel isOpen={isReaderOpen}><Reader /></MotionPanel>
// <MotionHoverButton>Save</MotionHoverButton>

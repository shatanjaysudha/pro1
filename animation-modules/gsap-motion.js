import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const tokens = {
  stiffness: 170,
  damping: 22,
  fast: 0.12,
  medium: 0.22,
  slow: 0.36,
  ease: "power3.out"
};

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function revealList(selector) {
  const targets = gsap.utils.toArray(selector);
  if (!targets.length) {
    return;
  }

  if (reduceMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: tokens.medium,
      ease: "back.out(1.3)",
      stagger: 0.028,
      overwrite: true
    }
  );
}

export function transitionPanel(panelSelector, from = "left") {
  const x = from === "left" ? -28 : 28;
  if (reduceMotion()) {
    gsap.set(panelSelector, { opacity: 1, x: 0 });
    return;
  }

  gsap.fromTo(
    panelSelector,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration: tokens.slow,
      ease: "elastic.out(0.85, 0.7)",
      overwrite: true
    }
  );
}

export function attachHoverFeedback(selector) {
  const targets = gsap.utils.toArray(selector);
  targets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      if (reduceMotion()) {
        return;
      }
      gsap.to(target, {
        scale: 1.03,
        y: -2,
        duration: tokens.fast,
        ease: tokens.ease,
        overwrite: true
      });
    });

    target.addEventListener("mouseleave", () => {
      gsap.to(target, {
        scale: 1,
        y: 0,
        duration: tokens.fast,
        ease: tokens.ease,
        overwrite: true
      });
    });
  });
}

export function setupScrollReveal(selector) {
  const targets = gsap.utils.toArray(selector);
  targets.forEach((target) => {
    if (reduceMotion()) {
      gsap.set(target, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      target,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: tokens.medium,
        ease: tokens.ease,
        scrollTrigger: {
          trigger: target,
          start: "top 88%",
          once: true
        }
      }
    );
  });
}

// Usage:
// revealList(".newsletter-list > li");
// transitionPanel(".split-reader-panel", "right");
// attachHoverFeedback(".button, .card");
// setupScrollReveal("[data-reveal]");

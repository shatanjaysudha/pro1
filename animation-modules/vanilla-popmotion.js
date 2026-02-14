import { animate } from "popmotion";

export const motionTokens = {
  stiffness: 170,
  damping: 22,
  fast: 120,
  medium: 220,
  slow: 360,
  easing: "cubic-bezier(.22,.85,.4,1)"
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function revealList(selector) {
  const items = Array.from(document.querySelectorAll(selector));
  if (!items.length) {
    return;
  }

  if (prefersReducedMotion()) {
    items.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
    return;
  }

  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
  });

  items.forEach((item, index) => {
    window.setTimeout(() => {
      animate({
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        type: "spring",
        stiffness: motionTokens.stiffness,
        damping: motionTokens.damping,
        onUpdate: (value) => {
          item.style.opacity = String(value.opacity);
          item.style.transform = `translateY(${value.y}px)`;
        }
      });
    }, index * 28);
  });
}

export function transitionPanel(panelEl, direction = "left") {
  if (!(panelEl instanceof HTMLElement)) {
    return;
  }

  const fromX = direction === "left" ? -28 : 28;

  if (prefersReducedMotion()) {
    panelEl.style.opacity = "1";
    panelEl.style.transform = "none";
    return;
  }

  animate({
    from: 0,
    to: 1,
    type: "spring",
    stiffness: motionTokens.stiffness,
    damping: motionTokens.damping,
    onUpdate: (value) => {
      panelEl.style.opacity = String(value);
      panelEl.style.transform = `translate3d(${(1 - value) * fromX}px, 0, 0)`;
    }
  });
}

export function attachHoverFeedback(selector) {
  const targets = document.querySelectorAll(selector);
  targets.forEach((target) => {
    if (!(target instanceof HTMLElement)) {
      return;
    }

    target.style.transition = `transform ${motionTokens.fast}ms ${motionTokens.easing}, box-shadow ${motionTokens.fast}ms ${motionTokens.easing}`;

    target.addEventListener("mouseenter", () => {
      if (prefersReducedMotion()) {
        return;
      }
      target.style.transform = "translate3d(0,-2px,0) scale(1.03)";
      target.style.boxShadow = "0 10px 24px rgba(0,0,0,0.18)";
    });

    target.addEventListener("mouseleave", () => {
      target.style.transform = "translate3d(0,0,0) scale(1)";
      target.style.boxShadow = "";
    });
  });
}

// Usage example:
// revealList(".article-list .item");
// transitionPanel(document.querySelector(".split-panel"), "left");
// attachHoverFeedback(".button, .card");

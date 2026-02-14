const elements = {
  stiffness: document.getElementById("stiffness"),
  damping: document.getElementById("damping"),
  stiffnessValue: document.getElementById("stiffnessValue"),
  dampingValue: document.getElementById("dampingValue"),
  reduceMotionToggle: document.getElementById("reduceMotionToggle"),
  revealListButton: document.getElementById("revealListButton"),
  togglePanelButton: document.getElementById("togglePanelButton"),
  demoList: document.getElementById("demoList"),
  demoPanel: document.getElementById("demoPanel")
};

const state = {
  stiffness: 170,
  damping: 22,
  panelOpen: false,
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
};

function isReduced() {
  return state.reducedMotion;
}

function syncControls() {
  elements.stiffness.value = String(state.stiffness);
  elements.damping.value = String(state.damping);
  elements.stiffnessValue.value = String(state.stiffness);
  elements.dampingValue.value = String(state.damping);
  elements.reduceMotionToggle.checked = state.reducedMotion;
}

function springTo({ from, to, onUpdate, onComplete }) {
  if (isReduced()) {
    onUpdate(to);
    if (typeof onComplete === "function") {
      onComplete();
    }
    return;
  }

  let value = from;
  let velocity = 0;
  const mass = 1;
  let last = performance.now();

  function frame(now) {
    const delta = Math.min(34, now - last) / 1000;
    last = now;

    const force = -state.stiffness * (value - to);
    const damping = -state.damping * velocity;
    const acceleration = (force + damping) / mass;
    velocity += acceleration * delta;
    value += velocity * delta;

    onUpdate(value);

    if (Math.abs(to - value) < 0.001 && Math.abs(velocity) < 0.001) {
      onUpdate(to);
      if (typeof onComplete === "function") {
        onComplete();
      }
      return;
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function revealList() {
  const items = Array.from(elements.demoList.querySelectorAll(".demo-item"));
  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translate3d(0,20px,0)";
  });

  items.forEach((item, index) => {
    window.setTimeout(() => {
      springTo({
        from: 0,
        to: 1,
        onUpdate: (value) => {
          item.style.opacity = String(value);
          item.style.transform = `translate3d(0, ${(1 - value) * 20}px, 0)`;
        },
        onComplete: () => {
          item.style.opacity = "";
          item.style.transform = "";
        }
      });
    }, index * 28);
  });
}

function animatePanel(open) {
  const panel = elements.demoPanel;
  const from = open ? 0 : 1;
  const to = open ? 1 : 0;
  panel.setAttribute("aria-hidden", String(!open));

  springTo({
    from,
    to,
    onUpdate: (value) => {
      panel.style.opacity = String(value);
      panel.style.transform = `translate3d(${(1 - value) * -28}px,0,0)`;
    }
  });
}

function bindEvents() {
  elements.stiffness.addEventListener("input", () => {
    state.stiffness = Number(elements.stiffness.value);
    syncControls();
  });

  elements.damping.addEventListener("input", () => {
    state.damping = Number(elements.damping.value);
    syncControls();
  });

  elements.reduceMotionToggle.addEventListener("change", () => {
    state.reducedMotion = elements.reduceMotionToggle.checked;
    syncControls();
  });

  elements.revealListButton.addEventListener("click", revealList);

  elements.togglePanelButton.addEventListener("click", () => {
    state.panelOpen = !state.panelOpen;
    animatePanel(state.panelOpen);
  });
}

syncControls();
bindEvents();
revealList();

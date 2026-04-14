const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function hasWindow() {
  return typeof window !== "undefined";
}

function getAnimateTarget(target) {
  if (!target || typeof target.animate !== "function") {
    return null;
  }

  return target;
}

function prefersReducedMotion() {
  if (!hasWindow() || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function animate(target, keyframes, options = {}, reducedFallback = null) {
  const element = getAnimateTarget(target);

  if (!element) {
    return null;
  }

  const animationKeyframes = prefersReducedMotion() && reducedFallback ? reducedFallback : keyframes;
  const animationOptions = prefersReducedMotion()
    ? { ...options, duration: Math.min(Number(options.duration) || 140, 120) }
    : options;

  return element.animate(animationKeyframes, animationOptions);
}

export function pulse(target, options = {}) {
  return animate(
    target,
    [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(1.02)", opacity: 1 },
      { transform: "scale(1)", opacity: 1 }
    ],
    {
      duration: 260,
      easing: "ease-out",
      ...options
    },
    [
      { opacity: 0.9 },
      { opacity: 1 }
    ]
  );
}

export function shake(target, options = {}) {
  return animate(
    target,
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
      { transform: "translateX(0)" }
    ],
    {
      duration: 360,
      easing: "ease-in-out",
      ...options
    },
    [
      { opacity: 1 },
      { opacity: 0.94 },
      { opacity: 1 }
    ]
  );
}

export function pop(target, options = {}) {
  return animate(
    target,
    [
      { transform: "scale(0.96)", opacity: 0.7 },
      { transform: "scale(1.01)", opacity: 1 },
      { transform: "scale(1)", opacity: 1 }
    ],
    {
      duration: 220,
      easing: "cubic-bezier(.2,.8,.2,1)",
      ...options
    },
    [
      { opacity: 0.82 },
      { opacity: 1 }
    ]
  );
}

export function fadeIn(target, options = {}) {
  return animate(
    target,
    [
      { opacity: 0 },
      { opacity: 1 }
    ],
    {
      duration: 180,
      easing: "ease-out",
      fill: "both",
      ...options
    },
    [
      { opacity: 0.4 },
      { opacity: 1 }
    ]
  );
}

export function fadeOut(target, options = {}) {
  return animate(
    target,
    [
      { opacity: 1 },
      { opacity: 0 }
    ],
    {
      duration: 160,
      easing: "ease-in",
      fill: "both",
      ...options
    },
    [
      { opacity: 1 },
      { opacity: 0.65 }
    ]
  );
}

export function slideIn(target, options = {}) {
  return animate(
    target,
    [
      { opacity: 0, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    {
      duration: 220,
      easing: "ease-out",
      fill: "both",
      ...options
    },
    [
      { opacity: 0.45 },
      { opacity: 1 }
    ]
  );
}

export function slideOut(target, options = {}) {
  return animate(
    target,
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-10px)" }
    ],
    {
      duration: 180,
      easing: "ease-in",
      fill: "both",
      ...options
    },
    [
      { opacity: 1 },
      { opacity: 0.55 }
    ]
  );
}

export function withReducedMotionFallback(target, keyframes, options = {}, reducedFallback = null) {
  return animate(target, keyframes, options, reducedFallback);
}


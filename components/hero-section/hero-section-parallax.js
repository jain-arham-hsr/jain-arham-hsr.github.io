/*
 *   Parallax effect on scroll
 */

const contentLeft = document.querySelector(".content-left");
const illustrationRight = document.querySelector(".illustration-right");
const orb1 = document.querySelector(".orb-1");
const orb2 = document.querySelector(".orb-2");
const pixelPatternEl = document.getElementById("pixelPattern");
const floatingCodes = document.querySelectorAll(".floating-code");
const branchIndicators = document.querySelectorAll(".branch-indicator");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  const parallaxSpeedFast = 0.7;

  // Main content moves up faster
  contentLeft.style.transform = `translateY(${scrolled * parallaxSpeedFast}px)`;
  illustrationRight.style.transform = `translateY(${
    scrolled * parallaxSpeedFast
  }px)`;

  // Orbs move at different speeds for depth
  orb1.style.transform = `translate(0, ${scrolled * parallaxSpeed}px) scale(1)`;
  orb2.style.transform = `translate(0, ${
    scrolled * parallaxSpeed * 0.8
  }px) scale(1)`;

  // Pixel pattern moves slowest
  pixelPatternEl.style.transform = `translateY(${scrolled * 0.2}px)`;

  // Floating code elements
  floatingCodes.forEach((code, index) => {
    code.style.transform = `translateY(${scrolled * (0.3 + index * 0.1)}px)`;
  });

  // Branch indicators
  branchIndicators.forEach((branch, index) => {
    branch.style.transform = `translateY(${scrolled * (0.35 + index * 0.1)}px)`;
  });

  // Fade out content as you scroll
  const opacity = 1 - scrolled / 500;
  contentLeft.style.opacity = Math.max(opacity, 0);
  illustrationRight.style.opacity = Math.max(opacity, 0);
});

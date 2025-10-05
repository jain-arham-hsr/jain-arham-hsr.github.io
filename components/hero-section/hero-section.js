class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Load template HTML
    fetch("./components/hero-section/hero-section.html")
      .then((res) => res.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.generatePixelPattern();
        // this.initParallax();
      });
  }

  initParallax() {
    const shadow = this.shadowRoot;

    const contentLeft = shadow.querySelector(".content-left");
    const illustrationRight = shadow.querySelector(".illustration-right");
    const orb1 = shadow.querySelector(".orb-1");
    const orb2 = shadow.querySelector(".orb-2");
    const pixelPatternEl = shadow.getElementById("pixelPattern");
    const floatingCodes = shadow.querySelectorAll(".floating-code");
    const branchIndicators = shadow.querySelectorAll(".branch-indicator");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      const parallaxSpeedFast = 0.7;

      // Main content
      contentLeft.style.transform = `translateY(${
        scrolled * parallaxSpeedFast
      }px)`;
      illustrationRight.style.transform = `translateY(${
        scrolled * parallaxSpeedFast
      }px)`;

      // Orbs
      orb1.style.transform = `translate(0, ${
        scrolled * parallaxSpeed
      }px) scale(1)`;
      orb2.style.transform = `translate(0, ${
        scrolled * parallaxSpeed * 0.8
      }px) scale(1)`;

      // Pixel pattern
      pixelPatternEl.style.transform = `translateY(${scrolled * 0.2}px)`;

      // Floating codes
      floatingCodes.forEach((code, index) => {
        code.style.transform = `translateY(${
          scrolled * (0.3 + index * 0.1)
        }px)`;
      });

      // Branch indicators
      branchIndicators.forEach((branch, index) => {
        branch.style.transform = `translateY(${
          scrolled * (0.35 + index * 0.1)
        }px)`;
      });

      // Fade content
      const opacity = 1 - scrolled / 500;
      contentLeft.style.opacity = Math.max(opacity, 0);
      illustrationRight.style.opacity = Math.max(opacity, 0);
    });
  }

  generatePixelPattern() {
    const shadow = this.shadowRoot;

    const pixelPattern = shadow.getElementById("pixelPattern");
    for (let i = 0; i < 15; i++) {
      const row = document.createElement("div");
      row.className = "pixel-row";
      for (let j = 0; j < 100; j++) {
        const square = document.createElement("div");
        square.className = "pixel-square";
        square.style.opacity = Math.random() * 0.5;
        row.appendChild(square);
      }
      pixelPattern.appendChild(row);
    }
  }
}

customElements.define("hero-section", HeroSection);

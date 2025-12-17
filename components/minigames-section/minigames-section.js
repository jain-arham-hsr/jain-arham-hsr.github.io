class MinigamesSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Load template HTML
    fetch("./components/minigames-section/minigames-section.html")
      .then((res) => res.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Initialize carousel after template is appended
        this.initCarousel();
      });
  }

  initCarousel() {
    const waitForMaterialize = () => {
      const carouselEls = this.shadowRoot.querySelectorAll(".carousel");
      if (carouselEls.length > 0 && window.M && window.M.Carousel) {
        M.Carousel.init(carouselEls, {
          duration: 200,
          indicators: true,
        });
      } else {
        // Retry until both the carousel element and Materialize are ready
        setTimeout(waitForMaterialize, 100);
      }
    };

    waitForMaterialize();
  }
}

customElements.define("minigames-section", MinigamesSection);

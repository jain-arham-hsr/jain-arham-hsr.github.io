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
      });

    this.initCarousel();
  }

  initCarousel() {
    const waitForMaterialize = () => {
      if (window.M && window.M.Carousel) {
        const carouselEls = this.shadowRoot.querySelectorAll(".carousel");
        M.Carousel.init(carouselEls, {
          duration: 200,
          indicators: true,
        });
      } else {
        // Retry if M isn't ready yet
        setTimeout(waitForMaterialize, 100);
      }
    };

    waitForMaterialize();
  }
}

customElements.define("minigames-section", MinigamesSection);

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
    // Prevent double initialization
    if (this._carouselInitialized) return;

    const waitForMaterialize = () => {
      const carouselEls = this.shadowRoot.querySelectorAll(".carousel");
      if (carouselEls.length > 0 && window.M && window.M.Carousel) {
        // Wait for images inside the carousel to load so Materialize can calculate sizes correctly
        const imgs = this.shadowRoot.querySelectorAll(".carousel img");

        const waitForImages = (timeout = 3000) => {
          const promises = Array.from(imgs).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            });
          });
          // Fallback timeout to avoid hanging forever
          const timer = new Promise((resolve) => setTimeout(resolve, timeout));
          return Promise.race([Promise.all(promises), timer]);
        };

        waitForImages().then(() => {
          if (this._carouselInitialized) return;
          M.Carousel.init(carouselEls, {
            duration: 200,
            indicators: true,
          });
          this._carouselInitialized = true;
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

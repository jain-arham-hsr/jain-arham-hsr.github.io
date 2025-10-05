class AI2ScratchSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Load template HTML
    fetch("./components/ai2-scratch-section/ai2-scratch-section.html")
      .then((res) => res.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      });
  }
}

customElements.define("ai2-scratch-section", AI2ScratchSection);

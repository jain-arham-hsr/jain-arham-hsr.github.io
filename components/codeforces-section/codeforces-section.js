class CodeforcesSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Load template HTML
    fetch("./components/codeforces-section/codeforces-section.html")
      .then((res) => res.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      });
  }
}

customElements.define("codeforces-section", CodeforcesSection);

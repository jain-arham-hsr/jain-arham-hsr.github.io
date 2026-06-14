class CompetitiveProgrammingSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Load template HTML
    fetch(
      "./components/competitive-programming-section/competitive-programming-section.html",
    )
      .then((res) => res.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      });
  }
}

customElements.define(
  "competitive-programming-section",
  CompetitiveProgrammingSection,
);

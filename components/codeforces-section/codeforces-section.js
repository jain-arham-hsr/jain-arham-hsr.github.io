function getCodeforcesTitleProgress(currentTitle) {
  const titles = [
    { title: "Newbie", lower: 0 },
    { title: "Pupil", lower: 1200 },
    { title: "Specialist", lower: 1400 },
    { title: "Expert", lower: 1600 },
    { title: "Candidate Master", lower: 1900 },
    { title: "Master", lower: 2100 },
    { title: "International Master", lower: 2300 },
    { title: "Grandmaster", lower: 2400 },
    { title: "International Grandmaster", lower: 2600 },
    { title: "Legendary Grandmaster", lower: 2900 },
  ];

  const index = titles.findIndex(
    (t) => t.title.toLowerCase() === currentTitle.toLowerCase()
  );

  if (index === -1) {
    throw new Error("Invalid title name.");
  }

  let current, next;

  if (index === titles.length - 1) {
    // If it's the last title, return last two titles
    current = titles[titles.length - 2];
    next = titles[titles.length - 1];
  } else {
    current = titles[index];
    next = titles[index + 1];
  }

  return {
    currentTitle: current.title,
    currentLowerLimit: current.lower,
    nextTitle: next.title,
    nextLowerLimit: next.lower,
  };
}

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
        this.getCodeforcesData();
      });
  }

  getCodeforcesData() {
    const uname = "jain_arham_hsr";
    const rankBadge = this.shadowRoot.getElementById("rank-badge");
    const ratingStatValue = this.shadowRoot.getElementById("rating-value");
    const maxRatingStatValue =
      this.shadowRoot.getElementById("max-rating-value");
    const progressbarCurrent = this.shadowRoot.getElementById(
      "progressbar-current"
    );
    const progressbarNext = this.shadowRoot.getElementById("progressbar-next");
    const progressbarLabel =
      this.shadowRoot.getElementById("progressbar-label");
    const progressbar = this.shadowRoot.getElementById("progressBar");

    fetch("https://codeforces.com/api/user.info?handles=" + uname)
      .then((res) => res.json())
      .then((json) => {
        const userData = json.result[0];

        const rank = userData.rank;
        const rating = userData.rating;
        const maxRating = userData.maxRating;

        rankBadge.innerText = rank;
        ratingStatValue.innerText = rating;
        maxRatingStatValue.innerText = maxRating;

        const { currentTitle, currentLowerLimit, nextTitle, nextLowerLimit } =
          getCodeforcesTitleProgress(rank);
        if (rank != "Legendary Grandmaster") {
          progressbarLabel.innerText = "Climbing to " + nextTitle + " Rating";
          progressbar.style.width =
            ((rating - currentLowerLimit) /
              (nextLowerLimit - currentLowerLimit)) *
              100 +
            "%";
        } else {
          progressbarLabel.innerText = "Legendary Grandmaster";
          progressbar.style.width = "100%";
        }
        progressbarCurrent.innerText = currentTitle + ": " + currentLowerLimit;
        progressbarNext.innerText = nextTitle + ": " + nextLowerLimit;
      });
  }
}

customElements.define("codeforces-section", CodeforcesSection);

/*
 * Generate pixel pattern background
 */

const pixelPattern = document.getElementById("pixelPattern");
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

const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset");

const createDivs = (numSquares) => {
  for (let i = 0; i < numSquares * numSquares; i++) {
    const div = document.createElement("div");
    div.style.width = `calc(100%/${numSquares})`;
    div.style.height = `calc(100%/${numSquares})`;
    container.appendChild(div);
    div.classList.add("inner");
  }
};

const clearContainer = () => {
  container.replaceChildren();
};

const defaultSize = 16;
createDivs(defaultSize);

container.addEventListener("mouseover", (event) => {
  if (!event.target.dataset.originalColor) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const randomColor = `rgb(${r},${g},${b})`;
    event.target.dataset.originalColor = randomColor;
    event.target.style.backgroundColor = randomColor;
  }
});

resetBtn.addEventListener("click", () => {
  const userInput = prompt("Please enter number of squares per side.");
  const gridSize = parseInt(userInput);

  if (isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  clearContainer();
  createDivs(gridSize);
});

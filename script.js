const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset");
const rainbow = document.querySelector(".rainbow");
const tonal = document.querySelector(".tonal");
const eraseBtn = document.querySelector(".erase");

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

const setRandomColor = (event) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const randomColor = `rgb(${r},${g},${b})`;
  event.target.style.backgroundColor = randomColor;
};

const makeTonal = (event) => {
  let opacity = parseFloat(event.target.style.opacity) || 0;
  if (opacity < 1) {
    opacity += 0.1;
    event.target.style.opacity = opacity;
  }
  if (opacity >= 1) {
    return;
  }
  event.target.style.backgroundColor = "rgba(0, 0, 0, " + opacity + ")";
};

const eraseCells = (event) => {
  event.target.style.backgroundColor = "rgb(255, 255, 255)";
}

const defaultSize = 16;
createDivs(defaultSize);

rainbow.addEventListener("click", () => {
  container.removeEventListener("mouseover", eraseCells);
  container.removeEventListener("mouseover", makeTonal);
  container.addEventListener("mouseover", setRandomColor);
});

tonal.addEventListener("click", () => {
  container.removeEventListener("mouseover", eraseCells)
  container.removeEventListener("mouseover", setRandomColor);
  container.addEventListener("mouseover", makeTonal);
});

eraseBtn.addEventListener("click", () => {
  container.removeEventListener("mouseover", makeTonal);
  container.removeEventListener("mouseover", setRandomColor);
  container.addEventListener("mouseover", eraseCells);

})

resetBtn.addEventListener("click", () => {
  const userInput = prompt("Please enter number of squares per side.", "16");
  const gridSize = parseInt(userInput);

  if (isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  clearContainer();
  createDivs(gridSize);
});

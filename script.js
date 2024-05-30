const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset");
const rainbowBtn = document.querySelector(".rainbow");
const tonalBtn = document.querySelector(".tonal");
const eraseBtn = document.querySelector(".erase");

const MAX_GRID_SIZE = 100;
const DEFAULT_SIZE = 16;
let currentMode = "rainbow";
let currentSize = DEFAULT_SIZE;

// Create a grid of divs inside the container
const createDivs = (numSquares) => {
  for (let i = 0; i < numSquares * numSquares; i++) {
    const div = document.createElement("div");
    div.style.width = `calc(100% / ${numSquares})`;
    div.style.height = `calc(100% / ${numSquares})`;
    container.appendChild(div);
    div.classList.add("inner");
  }
};

// Clear all children of the container
const clearContainer = () => {
  container.replaceChildren();
};

// Set a random color for the target element
const setRandomColor = (event) => {
  if (!event.target.dataset.bgColor) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const randomColor = `rgb(${r}, ${g}, ${b})`;
    event.target.style.backgroundColor = randomColor;
    event.target.dataset.bgColor = randomColor;
  }

  let rainbowOpacity = parseFloat(event.target.style.opacity) || 0;
  if (rainbowOpacity < 1) {
    rainbowOpacity += 0.1;
    event.target.style.opacity = rainbowOpacity;
  }
};

// Incremental opacity for the target element
const makeTonal = (event) => {
  let opacity = parseFloat(event.target.style.opacity) || 0;
  if (opacity < 1) {
    opacity += 0.1;
    event.target.style.opacity = opacity;
    event.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }
};

// Erase the color of the target element
const eraseCells = (event) => {
  event.target.style.backgroundColor = "rgb(255, 255, 255)";
  event.target.style.opacity = 1;
};

// Event handler for drawing on the grid based on the current mode
const handleMouseOver = (event) => {
  if (!event.target.classList.contains("inner")) return;

  switch (currentMode) {
    case "rainbow":
      setRandomColor(event);
      break;
    case "tonal":
      makeTonal(event);
      break;
    case "erase":
      eraseCells(event);
      break;
  }
};

// Initialize the grid with the default size
createDivs(DEFAULT_SIZE);

// Event listeners for mode buttons
rainbowBtn.addEventListener("click", () => {
  clearContainer();
  createDivs(currentSize);
  currentMode = "rainbow";
});

tonalBtn.addEventListener("click", () => {
  clearContainer();
  createDivs(currentSize);
  currentMode = "tonal";
});

eraseBtn.addEventListener("click", () => {
  currentMode = "erase";
});

// Event listener for the reset button
resetBtn.addEventListener("click", () => {
  const userInput = prompt(
    "Please enter the number of squares per side (1-100):",
    "16"
  );
  const gridSize = parseInt(userInput);

  if (isNaN(gridSize) || gridSize <= 0 || gridSize > MAX_GRID_SIZE) {
    alert(`Please enter a valid number between 1 and ${MAX_GRID_SIZE}.`);
    return;
  }

  clearContainer();
  createDivs(gridSize);
  currentSize = gridSize;
});

// Add a single event listener for mouseover on the container
container.addEventListener("mouseover", handleMouseOver);

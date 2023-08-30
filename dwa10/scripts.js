const MAX_NUMBER = 15;
const MIN_NUMBER = -5;

const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const reset = document.querySelector("#equals");
const input = document.querySelector("#input");

const rangeSlider = document.querySelector("#rangeSlider");
const outputDiv = document.getElementById("output");

function getRange() {
  const amount = parseInt(rangeSlider.value);

  if (amount < MIN_NUMBER || amount > MAX_NUMBER) {
    outputDiv.textContent = `Out of range`;
  } else {
    outputDiv.textContent = `Answer: ${amount}`;
  }

  return amount;
}
// You can add more logic here based on your requirements

// Event listeners
plus.addEventListener("click", () => {
  const currentValue = parseInt(rangeSlider.value);
  const newValue = currentValue + 1;

  if (newValue <= MAX_NUMBER) {
    rangeSlider.value = newValue; // Update the slider value
    getRange(); // Update the output message
  }
});

minus.addEventListener("click", () => {
  const currentValue = parseInt(rangeSlider.value);
  const newValue = currentValue - 1;

  if (newValue >= MIN_NUMBER) {
    rangeSlider.value = newValue; // Update the slider value
    getRange(); // Update the output message
  }
});

reset.addEventListener("click", () => {
  rangeSlider.value = 0;
  getRange();
});

rangeSlider.addEventListener("input", () => {
  getRange();

  // Call the getRange() function or perform other actions based on the selected value
});

getRange();

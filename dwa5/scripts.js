// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// This variable will keep track of whether the calculation has been performed or not
let calculationPerformed = false;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (dividend === "" || divider === "") {
    // Handle empty inputs here
    result.innerText = "Please enter values for both dividend and divider.";
    return;
  }

  if (!isNumeric(dividend) || !isNumeric(divider)) {
    // Handle non-numeric inputs here
    crashProgram();
    return;
  }

  if (parseFloat(divider) === 0) {
    // Handle division by zero here
    result.innerText = "Division not performed. Cannot divide by zero.";
    return;
  }

  // Perform the division and display the result as a whole number
  result.innerText = Math.floor(dividend / divider);

  // Set the calculationPerformed flag to true
  calculationPerformed = true;
});

// Check if the calculation has been performed on page load
window.addEventListener("DOMContentLoaded", () => {
  if (!calculationPerformed) {
    // If calculationPerformed is false, display the default message
    result.innerText = "No calculation performed";
  }
});

// Helper function to check if a value is numeric
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Function to crash the program with an error message
function crashProgram() {
  document.body.innerHTML =
    "<h1>Something critical went wrong. Please reload the page</h1>";
  console.error("Critical Error: Non-numeric input detected.");
  throw new Error("Critical Error: Non-numeric input detected.");
}

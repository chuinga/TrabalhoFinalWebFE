function currentYear() {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", function () {
  currentYear();
});

const counterUpdate = (element) => {
  //Get the value from the 'data-value' attribute of the element
  const value = parseInt(element.dataset.value); //parseInt --> produces an integer value based on the interpretation of the content
  // Calculate the increment to be added at each time interval
  const increment = Math.ceil(value / 10000); //Math.ceil rounds value up
  // Initialize the initial value of the count
  let initialValue = 0;
  // Define a function that will be executed repeatedly every millisecond
  const incrementCounter = setInterval(() => {
    initialValue += increment; // Add the increment to the initial value
    if (initialValue > value) {
      // Check if the initial value has exceeded the desired value
      element.textContent = `${value}`; // Set the element's text to the desired value
      clearInterval(incrementCounter); // Stop the repeated execution of the function
      return;
    }
    element.textContent = `${initialValue}`; // Update the element's text to the current value of the count
  }, 1); // The time interval is set to 1 millisecond
};
// Select all elements on the page with the class 'number' and convert them to an array
const items = [...document.querySelectorAll(".number")];
// For each selected element, apply the 'counterUpdate' function

items.forEach((item) => {
  counterUpdate(item);
});

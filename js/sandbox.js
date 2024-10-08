// Validation configuration for different input fields
const validationRules = {
  billAmount: {
    validate: (value) => !isNaN(value) && value > 0,
    errorMessage: "Please enter a valid bill amount greater than zero."
  },
  numPeople: {
    validate: (value) => !isNaN(value) && value > 0,
    errorMessage: "Please enter a valid number of people."
  },
  tipPercentage: {
    validate: (value) => value !== null,
    errorMessage: "Please select a tip percentage or enter a valid custom tip."
  },
  customTip: {
    validate: (value) => !isNaN(value) && value >= 1 && value <= 100,
    errorMessage: "Please enter a valid custom tip percentage between 1 and 100."
  }
};

// Helper function to perform validation
function validateField(field, value) {
  const rule = validationRules[field];
  if (!rule.validate(value)) {
    displayError(`${field}Error`, rule.errorMessage);
    return false;
  }
  displayError(`${field}Error`, ''); // Clear error message if valid
  return true;
}

// Generalized helper function to get tip percentage
function getSelectedTipPercentage() {
  const selectedTipRadio = document.querySelector('input[name="tipPercentage"]:checked');
  const customTipInput = document.getElementById('customTip');
  const customTipValue = parseFloat(customTipInput.value);

  // If a preset tip is selected, return its value
  if (selectedTipRadio) {
    return parseFloat(selectedTipRadio.value);
  }

  // Validate custom tip input if no preset tip is selected
  if (validateField('customTip', customTipValue)) {
    return customTipValue;
  }

  return null; // No valid tip selected or entered
}

// Helper function to calculate the tip amount per person
function calculateTipAmount(billAmount, tipPercentage, numPeople) {
  return (billAmount * tipPercentage) / 100 / numPeople;
}

// Helper function to calculate the total amount per person (bill + tip)
function calculateTotalAmount(billAmount, tipAmount, numPeople) {
  return (billAmount / numPeople) + tipAmount;
}

// Helper function to update the UI with calculated values
function updateResults(tipAmount, totalAmount) {
  document.getElementById('tipAmount').textContent = `$${tipAmount.toFixed(2)}`;
  document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
}

// Generalized error handling function
function displayError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Main function to handle calculation when inputs change
function handleInputChange() {
  const billInput = document.getElementById('billAmount');
  const numPeopleInput = document.getElementById('numPeople');

  const billAmount = parseFloat(billInput.value);
  const numPeople = parseInt(numPeopleInput.value);
  const tipPercentage = getSelectedTipPercentage();

  // Validate the bill amount, number of people, and tip percentage using the helper function
  const isBillValid = validateField('billAmount', billAmount);
  const isPeopleValid = validateField('numPeople', numPeople);
  const isTipValid = validateField('tipPercentage', tipPercentage);

  if (!isBillValid || !isPeopleValid || !isTipValid) {
    updateResults(0, 0);
    return;
  }

  // Calculate tip and total per person
  const tipAmount = calculateTipAmount(billAmount, tipPercentage, numPeople);
  const totalAmount = calculateTotalAmount(billAmount, tipAmount, numPeople);

  // Update the results in the UI
  updateResults(tipAmount, totalAmount);
}

// Event listeners to handle changes in inputs
document.getElementById('billAmount').addEventListener('input', handleInputChange);
document.getElementById('numPeople').addEventListener('input', handleInputChange);
document.querySelectorAll('input[name="tipPercentage"]').forEach(radio => {
  radio.addEventListener('change', handleInputChange);
});
document.getElementById('customTip').addEventListener('input', handleInputChange);

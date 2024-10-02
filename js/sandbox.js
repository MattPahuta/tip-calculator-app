// Helper function to validate the bill amount input
function isValidBillAmount(billAmount) {
  return !isNaN(billAmount) && billAmount > 0;
}

// Helper function to validate the number of people input
function isValidNumberOfPeople(numPeople) {
  return !isNaN(numPeople) && numPeople > 0;
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
function renderResults(tipAmount, totalAmount) {
  document.getElementById('tipAmount').textContent = `$${tipAmount.toFixed(2)}`;
  document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
}

// Error handling for invalid inputs
function renderErrorMessage(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Main function to handle calculation when inputs change
function handleInputChange() {
  const billInput = document.getElementById('billAmount');
  const numPeopleInput = document.getElementById('numPeople');
  const selectedTipRadio = document.querySelector('input[name="tipPercentage"]:checked');

  const billAmount = parseFloat(billInput.value);
  const numPeople = parseInt(numPeopleInput.value);
  const tipPercentage = parseFloat(selectedTipRadio.value);

  // Validate inputs
  if (!isValidBillAmount(billAmount)) {
    renderErrorMessage('billError', 'Please enter a valid bill amount greater than zero.');
    renderResults(0, 0);
    return;
  }

  if (!isValidNumberOfPeople(numPeople)) {
    renderErrorMessage('peopleError', 'Please enter a valid number of people.');
    renderResults(0, 0);
    return;
  }

  // Clear error messages
  renderErrorMessage('billError', '');
  renderErrorMessage('peopleError', '');

  // Calculate tip and total per person
  const tipAmount = calculateTipAmount(billAmount, tipPercentage, numPeople);
  const totalAmount = calculateTotalAmount(billAmount, tipAmount, numPeople);

  // Update the results in the UI
  renderResults(tipAmount, totalAmount);
}

// Event listeners to handle changes in inputs
document.getElementById('billAmount').addEventListener('input', handleInputChange);
document.getElementById('numPeople').addEventListener('input', handleInputChange);
document.querySelectorAll('input[name="tipPercentage"]').forEach(radio => {
  radio.addEventListener('change', handleInputChange);
});

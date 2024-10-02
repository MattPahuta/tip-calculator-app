// Validate bill amount input
function isValidBillAmount(billAmount) {
  // billAmount is a number and greater than 0
  return !isNaN(billAmount) && billAmount > 0;
}

// Validate number of people input
function isValidNumberOfPeople(numPeople) {
  // numPeople is a number and greater than 0
  return !isNaN(numPeople) && numPeople > 0;
}

// Calculate tip amount per person
function calculateTipAmount(billAmount, tipPercentage, numPeople) {
  // Note: Need toFixed(2) method?
  return (billAmount * tipPercentage) / 100 / numPeople;
}

// Calculate total amount per person (billAmount + tip)
function calculateTotalAmount(billAmount, tipAmount, numPeople) {
  // Note: Need toFixed(2) method?
  return (billAmount / numPeople) + tipAmount;
}

// Render calculated results to UI
function renderResults(tipAmount, totalAmount) {
  const tipResultDisplay = document.getElementById('tip-result');
  const totalResultDisplay = document.getElementById('total-result');
  tipResultDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalResultDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

// Render error messaging
function renderErrorMessage(elementId, message) {
  const targetElement = document.getElementById(elementId);
  targetElement.textContent = message;
}

// Handle calculation upon input change events
function handleInputChange() {
  // form input elements
  // ToDo: move these to global scope?
  const billAmountInput = document.getElementById('billAmount');
  const numPeopleInput = document.getElementById('numPeople');
  const selectedTipInput = document.querySelector('input[name="tip-percentage"]:checked');
  // form input element values
  const billAmount = parseFloat(billAmountInput.value);
  const numPeople = parseInt(numPeopleInput.value);
  const tipPercentage = parseFloat(selectedTipInput.value);

  // ToDo: further separate out the error handling functions
  // Validate inputs
  if (!isValidBillAmount(billAmount)) {
    renderErrorMessage('bill-error', 'Enter amount greater than zero')
    renderResults(0,0);
    return;
  }

  if (!isValidNumberOfPeople(numPeople)) {
    renderErrorMessage('people-error', 'Enter valid number of people');
    renderResults(0,0);
    return;
  }

  // Clear any existing error messages
  renderErrorMessage('bill-error', '');
  renderErrorMessage('people-error', '');

  // Calculate tip and total per person
  // ToDo: futher separate out the calculation functionality
  const tipAmount = calculateTipAmount(billAmount, tipPercentage, numPeople);
  const totalAmount = calculateTotalAmount(billAmount, tipAmount, numPeople);

  // Render results to UI
  renderResults(tipAmount, totalAmount)

}

// Event listeners
document.getElementById('billAmount').addEventListener('input', handleInputChange);
document.getElementById('numPeople').addEventListener('input', handleInputChange);
document.querySelector('input[name="tip-percentage"]:checked').forEach(el => {
  el.addEventListener('change', handleInputChange);
})
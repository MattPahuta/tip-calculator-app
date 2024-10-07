const billAmountInput = document.getElementById('billAmount');
const tipPercentageBtns = document.querySelectorAll('input[name="tipPercentage"]');
const customPercentageInput = document.getElementById('tipCustom');
const numPeopleInput = document.getElementById('numPeople');
const resetBtn = document.getElementById('resetBtn');

// Validate bill amount input
function isValidBillAmount(billAmount) {
  return !isNaN(billAmount) && billAmount > 0;
}

// Validate number of people input
function isValidNumberOfPeople(numPeople) {
  return !isNaN(numPeople) && numPeople > 0;
}

// Calculate tip amount per person
function calculateTipAmount(billAmount, tipPercentage, numPeople) {
  return (billAmount * tipPercentage) / 100 / numPeople;
}

// Calculate total amount per person (billAmount + tip)
function calculateTotalAmount(billAmount, tipAmount, numPeople) {
  return (billAmount / numPeople) + tipAmount;
}

// Render calculated results to UI
function renderResults(tipAmount, totalAmount) {
  document.getElementById('tipAmount').textContent = `$${tipAmount.toFixed(2)}`;
  document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
}

// Render error messaging
function renderError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Reset radio input states if custom tip input is focused 
function resetRadioInputs() {
  tipPercentageBtns.forEach(el => el.checked = false);
}

function clearErrors() {
  const errorEls = document.querySelectorAll('.error');
  errorEls.forEach(el => el.textContent = '');
}

// Reset form, clear values
function resetCalculator() {
  document.getElementById('form').reset();
  renderResults(0, 0);
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(error => error.textContent = '');
}

// Handle calculation upon input change events
function handleInputChange() {
  // get the selected tip percentage radio btn
  // ToDo: streamline this code:
  const selectedTipInput = document.querySelector('input[name="tipPercentage"]:checked')
  // get form input values and assign to variables
  const billAmount = parseFloat(billAmountInput.value);
  const numPeople = parseInt(numPeopleInput.value);
  // tip percentage is null or a selected tip percentage
  const tipPercentage = selectedTipInput ? parseFloat(selectedTipInput.value) : null;
  // Clear any existing error messages
  renderError('billError', '');
  renderError('peopleError', '');

  // ToDo: further separate out the error handling functions
  // - A general validation function or object?
  // Validate inputs
  if (!isValidBillAmount(billAmount)) {
    renderError('billError', 'Enter a dollar amount')
    renderResults(0, 0);
    return;
  }

  if (!isValidNumberOfPeople(numPeople)) {
    renderError('peopleError', 'Enter at least 1 person');
    renderResults(0, 0);
    return;
  }

  // Calculate tip and total per person
  const tipAmount = calculateTipAmount(billAmount, tipPercentage, numPeople);
  const totalAmount = calculateTotalAmount(billAmount, tipAmount, numPeople);

  // Render results to UI
  renderResults(tipAmount, totalAmount)
}

// Event listeners
billAmountInput.addEventListener('input', handleInputChange);
numPeopleInput.addEventListener('input', handleInputChange);
tipPercentageBtns.forEach(radio => {
  radio.addEventListener('change', handleInputChange);
});
customPercentageInput.addEventListener('focus', resetRadioInputs);
resetBtn.addEventListener('click', resetCalculator);
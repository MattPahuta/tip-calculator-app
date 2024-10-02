// const billAmountInput = document.getElementById('billAmount');
// const numPeopleInput = document.getElementById('numPeople');
const tipPercentageBtns = document.querySelectorAll('input[name="tip-percentage"]');
const customPercentageInput = document.getElementById('tipCustom');
// const resetBtn = document.getElementById('resetBtn');


// Validate bill amount input
function isValidBillAmount(billAmount) {
  // billAmount is a number and greater than 0, true or false
  return !isNaN(billAmount) && billAmount > 0;
}

// Validate number of people input
function isValidNumberOfPeople(numPeople) {
  // numPeople is a number and greater than 0, true or false
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
  const tipResultDisplay = document.getElementById('tipResult');
  const totalResultDisplay = document.getElementById('totalResult');
  tipResultDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalResultDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

// *** Render error messaging
function renderError(elementId, message) {
  document.getElementById(elementId).textContent = message;
  console.log('populating ', document.getElementById(elementId))
}

// Clear tipPercentage radio btns
// Reset radio input states if custom tip input is focused 
function resetRadioInputs() {
  // uncheck any chechek input
  tipPercentageBtns.forEach(el => el.checked = false);
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
  const billAmountInput = document.getElementById('billAmount');
  const numPeopleInput = document.getElementById('numPeople');
  // get the selected tip percentage radio btn
  // ToDo: streamline this code:
  const selectedTipInput = document.querySelector('input[name="tip-percentage"]:checked')
  // get form input values and assign to variables
  const billAmount = parseFloat(billAmountInput.value);
  const numPeople = parseInt(numPeopleInput.value);
  // tip percentage is null or a selected tip percentage
  const tipPercentage = selectedTipInput ? parseFloat(selectedTipInput.value) : null;

  // ToDo: further separate out the error handling functions
  // - A general validation function or object?
  // Validate inputs
  if (!isValidBillAmount(billAmount)) {
    renderError('billError', 'Enter amount greater than zero')
    renderResults(0, 0);
    return;
  }

  if (!isValidNumberOfPeople(numPeople)) {
    renderError('peopleError', 'Enter valid number of people');
    renderResults(0, 0);
    return;
  }

  // Clear any existing error messages
  renderError('billError', '');
  renderError('peopleError', '');


  // Calculate tip and total per person
  const tipAmount = calculateTipAmount(billAmount, tipPercentage, numPeople);
  const totalAmount = calculateTotalAmount(billAmount, tipAmount, numPeople);

  // Render results to UI
  renderResults(tipAmount, totalAmount)
}

// Event listeners
// ToDo: update with variables where needed
// Add 'focus' listener to customTip field, call resetRadios
document.getElementById('billAmount').addEventListener('input', handleInputChange);
document.getElementById('numPeople').addEventListener('input', handleInputChange);
document.querySelectorAll('input[name="tip-percentage"]').forEach(radio => {
  radio.addEventListener('change', handleInputChange);
});

customPercentageInput.addEventListener('focus', resetRadioInputs);
document.getElementById('resetBtn').addEventListener('click', resetCalculator);
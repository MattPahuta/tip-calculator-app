const billAmountInput = document.getElementById('billAmount');
const tipPercentageBtns = document.querySelectorAll('input[name="tipPercentage"]');
const customTipInput = document.getElementById('customTip');
const numPeopleInput = document.getElementById('numPeople');
const resetBtn = document.getElementById('resetBtn');

// Error validation rules object
const validations = {
  billAmount: {
    validate: (value) => !isNaN(value) && value > 0,
    elementId: "billError",
    errorMessage: "Please enter a valid dollar amount."
  },
  numPeople: {
    validate: (value) => !isNaN(value) && value > 0,
    elementId: "peopleError",
    errorMessage: "Please enter at least 1 person."
  },
  tipPercentage: {
    validate: (value) => value !== null,
    elementId: "tipError",
    errorMessage: "Please enter a tip percentage."
  },
}

// Helper function for validating form fields
function validateField(field, value) {
  const rule = validations[field];
  if (!rule.validate(value)) {
    renderError(rule.elementId, rule.errorMessage);
    return false;
  }
  renderError(rule.elementId, '');
  return true;
}

// Render error messaging
function renderError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Validate tip radio btn input selected or custom tip input entered
function getSelectedTipPercentage() {
  const selectedTipRadio = document.querySelector('input[name="tipPercentage"]:checked');
  const customTipValue = parseFloat(customTipInput.value);
  let tipPercentage = null;

  // if tip btn selected, return its value
  if (selectedTipRadio) {
    customTipInput.value = '';
    tipPercentage = parseFloat(selectedTipRadio.value);
    return tipPercentage;
  }
  // if custom tip is input, validate and return value
  if (!isNaN(customTipValue) && customTipValue >= 1) {
    tipPercentage = customTipValue;
    return tipPercentage;
  }
  // if no valid tip selected
  return tipPercentage;
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
  // get form input values and assign to variables
  const billAmount = parseFloat(billAmountInput.value)
  const numPeople = parseInt(numPeopleInput.value);
  // get tip percentage
  const tipPercentage = getSelectedTipPercentage();
  // variables for validations
  const isBillValid = validateField('billAmount', billAmount);
  const isPeopleValid = validateField('numPeople', numPeople);
  const isTipValid = validateField('tipPercentage', tipPercentage);

  if (!isBillValid || !isPeopleValid || !isTipValid) {
    renderResults(0,0);
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
customTipInput.addEventListener('focus', resetRadioInputs);
customTipInput.addEventListener('input', handleInputChange);
resetBtn.addEventListener('click', resetCalculator);
const form = document.getElementById('form');
// const inputs = document.getElementById("form").elements;

// Form Inputs
// form.elements gets from elements by name attribute
const billInput = form.elements['bill'];
const percentageInputs = Array.from(form.elements['tip-percentage']);
const customPercentageInput = form.elements['custom-percentage'];
const splitTotalInput = form.elements['split-total'];
// Calculator Outputs
const tipResultDisplay = document.getElementById('tip-result');
const totalResultDisplay = document.getElementById('total-result');
// Reset button
const resetBtn = document.getElementById('reset-btn');
// Ready to calculate state
let isReadyToCalculate = false;

// *** High level logic
/* 
  - wait for user inputs to run calculation
    - once bill value, tip selection, and splitNum is present
      - set isReadyToCalculate to true;
  - if billTotalInput && splitTotalInput && tipPercentage 
    - run calculation
    - render results 

*/



// Clear error or success states for a field
function clearError() {

}

// Render error message for a field
function renderError() {

}

// Check for valid data
function dataIsValid() {
  // if value passes validation, return true
  // else return false
}

// Get the selected tip percentage value - preset btn or custom
function getSelectedTipPercentage() {
  const selectedTipInputBtn = document.querySelector('input[name="tip-percentage"]:checked');
  const selectedTipValue = parseFloat(selectedTipInputBtn.value);
  return selectedTipValue;
}


function calculateTip() {



  const billAmount = parseFloat(billInput.value);
  const tip = getSelectedTipPercentage()

  if ()

  if (isNaN(billAmount) || billAmount <= 0) {
    // set tip amount and total bill element to render $0.00
    tipResultDisplay.textContent = '$0.00';
    totalResultDisplay.textContent = '$0.00';
    return;
  }

  const tipAmount = (billAmount * tip) / 100;
  const totalAmount = billAmount + tipAmount;

  // render results
  tipResultDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalResultDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}


billInput.addEventListener('input', calculateTip);
percentageInputs.forEach(radio => {
  radio.addEventListener('change', calculateTip)
});

// Calculate tip amount
function calculateTipAmount(bill, percentage, splitNum){
  const tip = bill * percentage / 100;
  return (tip / splitNum).toFixed(2);
}

// Calculate bill total
function calculateTotalAmount(bill, tipAmountPerPerson, splitNum) {
  // total per person without tip
  const total = bill / splitNum;
  // tipAmountPerPerson = calculateTipAmount()
  const totalPerPerson = total + Number(tipAmountPerPerson);
  return totalPerPerson.toFixed(2)
}


// Reset radio input states if custom tip input is focused 
function resetRadioInputs() {
  // uncheck any chechek input
  percentageInputs.forEach(el => el.checked = false);
  // reset selected tip value
}


// Reset form fields and calculations
function resetForm() {
  console.log('Resetting form...')
}

// Custom percentage focus listener
customPercentageInput.addEventListener('focus', resetRadioInputs);


// Reset event listener
form.addEventListener('reset', resetForm)
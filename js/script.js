const form = document.getElementById('form');
// const inputs = document.getElementById("form").elements;

// Form Inputs
const billTotalInput = form.elements['total'];
const percentageInputs = Array.from(form.elements['tip-percentage']);
const customPercentageInput = form.elements['custom-percentage'];
const splitTotalInput = form.elements['split-total'];
// Calculator Outputs
const tipResult = document.getElementById('tip-result');
const totalResult = document.getElementById('total-result');
// Reset Button
const resetBtn = document.getElementById('reset-btn');

// console.log('Bill Total: ', billTotalInput.value)
// console.log('Custom Tip: ', customPercentageInput.value)
// console.log('Split Total: ', splitTotalInput.value)


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

// Calculate tip
function calculateTip(total, percentage, splitNum) {
  // total = total bill
  // percentage = selected tip percentage
  // splitNum = number of ways to split the bill

  const tipAmount = total * percentage

  // return tip amount per person
  // return total amount per person
}

// Reset radio input states if custom tip input is focused 
function resetRadioInputs() {
  // uncheck any chechek input
  percentageInputs.forEach(el => el.checked = false);
  // reset selected tip value
}

// Run on form input change events
function handleChange(e) {
  // e.preventDefault();
  // *** Required Logic *** //
  /*
    - get bill total value, 
  */
  // remove error message from form

  console.log('Bill Total: ', billTotalInput.value)


  // console.log('Bill total: ', billTotal.value)
  // console.log('Split total: ', splitTotal.value)
} 

// Reset form fields and calculations
function resetForm() {
  console.log('Resetting form...')
}

// Custom percentage focus listener
customPercentageInput.addEventListener('focus', resetRadioInputs);


// Reset event listener
form.addEventListener('reset', resetForm)
let currentValue = '';
let previousValue = '';
let operation = null;

function appendValue(value) {
  currentValue += value;
  updateDisplay();
}

function clearDisplay() {
  currentValue = '';
  previousValue = '';
  operation = null;
  updateDisplay();
}

function calculate() {
  if (operation === null || previousValue === '') {
    return;
  }
  
  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  
  switch (operation) {
    case '+':
      currentValue = previous + current;
      break;
    case '-':
      currentValue = previous - current;
      break;
    case '*':
      currentValue = previous * current;
      break;
    case '/':
      currentValue = previous / current;
      break;
  }
  
  previousValue = '';
  operation = null;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('display').value = currentValue;
}

document.addEventListener('DOMContentLoaded', function() {
  clearDisplay();
});

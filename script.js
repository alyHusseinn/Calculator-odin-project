const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('.btn-equal');
const ClearScreen = document.querySelector('.btn-clear');
const previuosOperand = document.querySelector('.previous-operand');
const CurrentOperand = document.querySelector('.current-operand');

let val1 = '', val2 = '';
let operator = "";
let pressEqallKey = false;

numberButtons.forEach(button => {
  button.addEventListener('click',(e)=>{
    append(e.target.textContent);
  })
});

function append(num){
  if(pressEqallKey) {
    clearAll();// start new operation : like clear
  }
    
  if(operator == "" ){
    val1 += num;
  }
  else {
    val2 += num;
  }
  CurrentOperand.textContent += num;
}

operationsButtons.forEach(Button => {
  Button.addEventListener('click', () => {
    if(val1 != "" && operator != "" && val2 != ""){
      updateResults();
    }
    if(val1 != "") {
      
      if(operator != "") {
        operator = Button.innerHTML;
        updateScreen('', val1 + ' ' + operator);
      }
      else{
        operator = Button.innerHTML;
        updateScreen('',CurrentOperand.textContent + ' ' + operator);
      }
      
    }
    pressEqallKey = false;
  });
});

equalsButton.addEventListener('click', () => {
  if(val1 != "" && operator != "" && val2 != "") {
    updateResults();
    pressEqallKey = true;
  }
});

function updateResults(){
  let result = operate(Number(val1), Number(val2), operator);
  updateScreen(result,'');
  val1 = result;
  val2 = '';
  operator = "";
}

ClearScreen.addEventListener('click',clearAll);

function clearAll(){
  val1 = '', val2 = '';
  operator = "";
  pressEqallKey = false;
  previuosOperand.textContent = '';
  CurrentOperand.textContent = '';

}

function operate(v1, v2, operator) {
   if(operator === '+') return v1 + v2;
   else if(operator === '-') return v1 - v2;
   else if(operator === '*') return v1 * v2;
   else if(operator === '/') return v1 / v2;
}

function updateScreen(current,prev){
  previuosOperand.textContent = prev;
  CurrentOperand.textContent = current;
}
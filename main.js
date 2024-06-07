const totaldinner = document.querySelector('#input-bill')
const percenttip = document.querySelector('#custom-percentage-button')
const npeople = document.querySelector('#input-people')
const resultado1 = document.querySelector('#tip-amount')
const resultado2 = document.querySelector('#total')
const reset = document.querySelector('#reset-button')

//Evento para el mensaje de alerta cuando es menor que 1 el npeople
const peopleError = document.querySelector('#people-error');
npeople.addEventListener('input', function() {
  const inputValue = npeople.value;
  if (inputValue < 1) {
    npeople.classList.add('input-invalid');
    peopleError.style.display = 'block';
  } else {
    npeople.classList.remove('input-invalid');
    peopleError.style.display = 'none';
  }
});

//Evento para saber el valor de cada botón
const percentageButtons  = document.querySelectorAll('.percentage-button')
let percentwant = 0;
let selectedButton = null; 
percentageButtons.forEach(button => {
  button.addEventListener('click', function() {
    if (selectedButton) {
      selectedButton.style.backgroundColor = '#00474b';
    }
    selectedButton = button;
    selectedButton.style.backgroundColor = '#26c2ad';
    percentwant = parseFloat(button.value);
    percenttip.value = "";
    clearPercentTipInput();
    calcularGorjeta();
  });
});

//Evento para saber activar o desactivar el color de un botón
percenttip.addEventListener('input', function() {
  if (percenttip.value!== '') {
    percentwant = parseFloat(percenttip.value);
    if (selectedButton) {
      selectedButton.style.backgroundColor = '#00474b';
      selectedButton = null;
    }
    percenttip.style.backgroundColor = "#f4f8fb";
    calcularGorjeta();
  }
});

//Función para limpiar el input percenttip
function clearPercentTipInput() {
  percenttip.value = "";
  percenttip.style.backgroundColor = "#f4f8fb";
}

//Eventro para el valor total de la comida y el número de personas
totaldinner.addEventListener('input', calcularGorjeta);
npeople.addEventListener('input', calcularGorjeta);

//Función para hallar la propina de cada cliente y el valor de la comida más la propina
function calcularGorjeta(){
    const totaldinnerValue = parseFloat(totaldinner.value);
    const percenttipValue = percenttip.value || percentwant;
    const npeopleValue = parseFloat(npeople.value);

    if (!isNaN(totaldinnerValue) && !isNaN(percenttipValue) && !isNaN(npeopleValue)) {
        const tipAmount = ((totaldinnerValue * percenttipValue) / 100) / npeopleValue;
        resultado1.textContent = tipAmount.toFixed(2)
        const total = (totaldinnerValue/npeopleValue) + tipAmount
        resultado2.textContent = total.toFixed(2)
        }else{
            resultado1.textContent = '0'
            resultado2.textContent = '0';}
    }


//Evento para resetear los valores
const resetButton = document.querySelector('#reset-button')
const porcentageButtons = document.querySelectorAll('.percentage-button')
const billInput = document.querySelector('.input-bill')

function generalActions(){
    if(parseInt(billInput.value) > 0){
        resetButton.disable = false
        resetButton.style = 'background-color: #26c2ad'
        
    }else{
        resetButton.disable = true
        resetButton.style = 'background-color: #0d686d'
    }
}
billInput.addEventListener('input', () => {
    generalActions()
})

porcentageButtons.forEach(boton =>{
    boton.addEventListener('click', function (){
        generalActions()
    })
})

reset.addEventListener('click', function(){
    totaldinner.value = "0"
    percenttip.value = ""
    npeople.value = "1"
    resultado1.textContent = "0"
    resultado2.textContent = "0"
    generalActions()

})
generalActions()
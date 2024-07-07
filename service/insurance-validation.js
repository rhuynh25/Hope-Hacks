const insuranceSearchForm = document.getElementById('search-form');
const zipcode = document.getElementById('zipcode');
const income = document.getElementById('income');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const uses_tobacco = document.getElementById('uses_tobacco');
const market = document.getElementById('market');
const state = document.getElementById('state');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters.`)
    } else {
        showSuccess(input);
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
     if(input.value.trim() === ''){
         showError(input, `${getFieldName(input)} is required`);
     } else {
         showSuccess(input);
     }
    } ); 
 }

 function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


insuranceSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([zipcode, income, age, gender, uses_tobacco, market, state]);
    checkLength(zipcode, 5, 5);
    checkLength(state, 2, 20);
})
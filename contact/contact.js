const form = document.getElementById('form');
const userName = document.getElementById('user-name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone-number');

// Show input error message
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

function checkEmail(input){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid')
    }
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

 // Get field Name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([userName, email, phoneNumber]);

    checkLength(userName, 3, 15);

    checkEmail(email);

});
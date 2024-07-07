const providerSearchForm = document.getElementById('providerSearchForm');
const keyword = document.getElementById('query');
const zipcode = document.getElementById('zipcode');
const type = document.getElementById('type');


// Check if fields are empty
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

providerSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([keyword, zipcode, type]);
    checkLength(keyword, 3, 20);
    checkLength(zipcode, 5, 5);
    checkLength(type, 3, 20);
})

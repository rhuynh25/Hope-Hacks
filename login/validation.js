// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Section: Form Validation and Submission
    const registerForm = document.getElementById('register-form'); // Get the registration form element

    // Check if the registration form exists
    if (registerForm) {

        // Add submit event listener to the registration form
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            let valid = true; // Flag to track form validity

            // Validate Name 
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                valid = false;
            } else {
                hideError(name);
            }

            // Validate Email
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                valid = false;
            } else {
                hideError(email);
            }

            // Validate Password 
            const password = document.getElementById('password');
            if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters long');
                valid = false;
            } else {
                hideError(password);
            }

            // Address
            const address = document.getElementById('address');
            if (address.value.trim() === '') {
                showError(address, 'Address is required');
                valid = false;
            } else {
                hideError(address);
            }

            // City
            const city = document.getElementById('city');
            if (city.value.trim() === '') {
                showError(city, 'City is required');
                valid = false;
            } else {
                hideError(city);
            }

            // State
            const state = document.getElementById('state');
            if (state.value === '') {
                showError(state, 'Please select a state');
                valid = false;
            } else {
                hideError(state);
            }

            // Healthcare Type
            const healthcareType = document.getElementById('healthcare_type');
            if (healthcareType.value === '') {
                showError(healthcareType, 'Please select a type of health care');
                valid = false;
            } else {
                hideError(healthcareType);
            }

            // Section: Form Submission if Valid
            if (valid) {
                const formData = new FormData(registerForm); // Get form data
                const data = Object.fromEntries(formData.entries()); // Convert to plain object

                // Send form data to server via fetch
                fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Registration failed');
                    }
                    return response.json(); // Parse response as JSON
                })
                .then(user => {
                    console.log('User registered:', user); // Log successful registration
                })
                .catch(error => {
                    console.error('Error:', error); // Log and handle registration error
                });
            }
        });
    }
});



// Function to display error message for input field
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    formControl.querySelector('small').textContent = message;
}

// Function to hide error message for input field
function hideError(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.querySelector('small').textContent = '';
}


// Hamburger menu
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu= document.querySelector('.dropdown-menu');
toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open')
  const isOpen = dropDownMenu.classList.contains('open');
  toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
};

// Hero image shift effect
var dropdownButton = document.querySelector('.toggle-btn');
var heroImage = document.querySelector('.hero-image');

dropdownButton.addEventListener('click', function() {
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu.classList.contains('open')) {
        heroImage.classList.add('shifted');
    } else {
        heroImage.classList.remove('shifted');
    }
});

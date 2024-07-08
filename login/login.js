// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form'); // Get the login form element
    // Check if the login form exists
    if (loginForm) {
        // Add event listener for form submission
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            let valid = true; // Flag to track form validity
            // Validate email input
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailError = document.querySelector('#email + small');
            if (!emailPattern.test(email.value)) {
                showError(email, 'Enter Valid Email');
                valid = false;
            } else {
                hideError(email);
            }
            // Validate password input
            const password = document.getElementById('password');
            const passwordError = document.querySelector('#password + small');
            if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters long');
                valid = false;
            } else {
                hideError(password);
            }
            // Proceed with form submission if valid
            if (valid) {
                const formData = new FormData(loginForm);
                const data = Object.fromEntries(formData.entries());
                // Send login request to server
                fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Login failed');
                    }
                    return response.json();
                })
                .then(user => {
                    // Store user data in session and redirect on successful login
                    console.log('User data received:', user);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    window.location.href = '/login/user.html';
                })
                .catch(error => {
                    // Handle login errors
                    console.error('Error:', error);
                    showError(email, 'Invalid email or password.');
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
const dropDownMenu = document.querySelector('.dropdown-menu');
toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');
  toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
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
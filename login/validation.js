// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Register form validation and submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        // Add an event listener for the form's submit event
        registerForm.addEventListener('submit', function (event) {
            let valid = true; // Variable to track if the form is valid

            // Validate the name field
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                valid = false;
                alert('Name is required');
            }

            // Validate the email field 
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                valid = false;
                alert('Please enter a valid email address');
            }

            // Validate the password field to ensure it is at least 8 characters long
            const password = document.getElementById('password');
            if (password.value.length < 8) {
                valid = false;
                alert('Password must be at least 8 characters long');
            }

            // Prevent form submission if any validation fails
            if (!valid) {
                event.preventDefault();
                return; // Exit the function early if the form is not valid
            }

            // Prepare data for submission
            // FormData object from the registration form element
            const formData = new FormData(registerForm);
            // Convert the FormData entries to a plain object
            const data = Object.fromEntries(formData.entries()); // Convert form data to an object

            // Submit the form data using fetch
            // Create an HTTP POST request to the /register endpoint
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Set the Content-Type to JSON
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string placed in request body
            })
                .then(response => response.json()) // Convert the response from the server to JSON
                .then(result => {
                    alert(result.message); // Show success message from the server
                    window.location.href = '/login/login.html'; // Redirect to login page
                })
                .catch(error => {
                    console.error('Error:', error); // Log the error to the console
                    alert('Error registering user.'); // Display an alert indicating there was an error registering the user
                });
        });
    }
});

// Hamburger Menu
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

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Get the login form element by its ID
    const loginForm = document.getElementById('login-form');

    // Check if the login form exists on the page
    if (loginForm) {
        // Event listener to handle form submission
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            let valid = true; // Variable to track if the form is valid

            // Get the email input element by its ID
            const email = document.getElementById('email');
            // Validate the email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Validate the email input
            if (!emailPattern.test(email.value)) {
                valid = false; // Mark the form as invalid
                alert('Please enter a valid email address'); // Show an alert if email is invalid
            }

            // Get the password input element by its ID
            const password = document.getElementById('password');
            // Validate the password length to ensure it is at least 8 characters long
            if (password.value.length < 8) {
                valid = false; // Mark the form as invalid
                alert('Password must be at least 8 characters long'); // Show an alert if password is too short
            }

            // If the form is not valid, do not allow submission
            if (!valid) {
                return;
            }

            // Create a FormData object from the login form element
            const formData = new FormData(loginForm);
            // Convert the FormData entries to a plain object
            const data = Object.fromEntries(formData.entries());

            // Use the fetch API to make an HTTP POST request to the /login endpoint
            fetch('http://localhost:3000/login', {
                method: 'POST', // Specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // Set the Content-Type header to application/json 
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string and include it in the request body
            })
                .then(response => {
                    // Check if the response is not OK 
                    if (!response.ok) {
                        throw new Error('Login failed'); // Error thrown if faliure occurs
                    }
                    return response.json(); // Convert the response from the server to JSON
                })
                .then(user => {
                    console.log('User data received:', user); // Log user data 
                    sessionStorage.setItem('user', JSON.stringify(user)); // Save user data to sessionStorage
                    window.location.href = '/login/user.html'; // Redirect to user information page
                })
                .catch(error => {
                    console.error('Error:', error); // Log the error to the console
                    alert('Invalid email or password.'); // Display an alert indicating there was an error logging in
                });
        });
    }
});

// Toggle Menu
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
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

            // Validate the email field using a regular expression pattern
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
                event.preventDefault(); // Prevent the default form submission behavior
                return; // Exit the function early if the form is not valid
            }

            // Prepare data for submission
            // Create a FormData object from the registration form element
            const formData = new FormData(registerForm);
            // Convert the FormData entries to a plain object
            const data = Object.fromEntries(formData.entries()); // Convert form data to an object

            // Submit the form data using fetch
            // Use the fetch API to make an HTTP POST request to the /register endpoint
            fetch('http://localhost:3000/register', {
                method: 'POST', // Specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // Set the Content-Type header to application/json to indicate JSON payload
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string and include it in the request body
            })
                .then(response => response.json()) // Convert the response from the server to JSON
                .then(result => {
                    alert(result.message); // Show success message from the server
                    window.location.href = 'login.html'; // Redirect to login page
                })
                .catch(error => {
                    console.error('Error:', error); // Log the error to the console
                    alert('Error registering user.'); // Display an alert indicating there was an error registering the user
                });
        });
    }

    // Login form submission and user data handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        // Add an event listener for the form's submit event
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // Create a FormData object from the login form element
            const formData = new FormData(loginForm);
            // Convert the FormData entries to a plain object
            const data = Object.fromEntries(formData.entries()); // Convert form data to an object

            // Use the fetch API to make an HTTP POST request to the /login endpoint
            fetch('http://localhost:3000/login', {
                method: 'POST', // Specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // Set the Content-Type header to JSON
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string and include it in the request body
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Login failed'); // Handle login failure by throwing an error if response is not OK
                    }
                    return response.json(); // Convert the response from the server to JSON
                })
                .then(user => {
                    // Save user data to our sessionStorage
                    sessionStorage.setItem('user', JSON.stringify(user));
                    // Redirect to user information page
                    window.location.href = 'user.html';
                })
                .catch(error => {
                    console.error('Error:', error); // Log the error to the console 
                    alert('Invalid email or password.'); // Display an alert indicating there was an error logging in
                });
        });
    }

    // Display user information on user.html
    const userInfoDiv = document.getElementById('user-info');
    if (userInfoDiv) {
        // Retrieve the user data from sessionStorage and parse it as JSON
        const userData = JSON.parse(sessionStorage.getItem('user'));

        // If user data is available, populate the user-info div with the user's data
        if (userData) {
            userInfoDiv.innerHTML = `
                <p><strong>Name:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Birthdate:</strong> ${new Date(userData.birthdate).toLocaleDateString()}</p>
                <p><strong>Address:</strong> ${userData.address}</p>
                <p><strong>City:</strong> ${userData.city}</p>
                <p><strong>State:</strong> ${userData.state}</p>
                <p><strong>Zip Code:</strong> ${userData.zip_code}</p>
                <p><strong>Phone Number:</strong> ${userData.phone_number}</p>
                <p><strong>Healthcare Type:</strong> ${userData.healthcare_type}</p>
            `;
        }
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');

    // Add an event listener to the hamburger icon to toggle the 'open' class on the nav element
    hamburger.addEventListener('click', function () {
        nav.classList.toggle('open'); // Toggle the 'open' class on the nav element
    });
});

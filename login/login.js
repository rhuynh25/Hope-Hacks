// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login');

    // Add an event listener to handle form submission
    form.addEventListener('submit', function (event) {
        let valid = true;

        // Validate the name field
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            valid = false;
            alert('Name is required'); // Show an alert if the name is empty
        }

        // Validate the email field using a regex
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            valid = false;
            alert('Please enter a valid email address');
        }

        // Validate the password field to ensure it reaches at least certain amount of characters
        const password = document.getElementById('password');
        if (password.value.length < 8) {
            valid = false;
            alert('Password must be at least 8 characters long');
        }
    });
});
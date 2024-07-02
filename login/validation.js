// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
// Select the registration form by its ID
const form = document.getElementById('register-form');

// Add an event listener to handle form submission
form.addEventListener('submit', function (event) {
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

// Validate the birthdate field
const birthdate = document.getElementById('birthdate');
if (birthdate.value === '') {
valid = false;
alert('Birthdate is required'); 
}

// Validate the address field
const address = document.getElementById('address');
if (address.value.trim() === '') {
valid = false;
alert('Address is required'); 
}

// Validate the city field
const city = document.getElementById('city');
if (city.value.trim() === '') {
valid = false;
alert('City is required'); 
}

// Validate the state field
const state = document.getElementById('state');
if (state.value === '') {
valid = false;
alert('State is required'); 
}

// Validate the zip code field using a regular expression pattern
const zipCode = document.getElementById('zip_code');
const zipPattern = /^\d{5}(-\d{4})?$/;
if (!zipPattern.test(zipCode.value)) {
valid = false;
alert('Please enter a valid zip code');
}

// Validate the phone number field using a regular expression pattern
const phoneNumber = document.getElementById('phone_number');
const phonePattern = /^\d{10}$/;
if (!phonePattern.test(phoneNumber.value)) {
valid = false;
alert('Please enter a valid 10-digit phone number');
}

// Validate the healthcare type field
const healthcareType = document.getElementById('healthcare_type');
if (healthcareType.value === '') {
valid = false;
alert('Healthcare type is required'); 
}

// Prevent form submission if any validation fails
if (!valid) {
event.preventDefault();
}
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');

hamburger.addEventListener('click', function () {
nav.classList.toggle('open');
});
});
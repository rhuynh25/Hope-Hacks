// toggle button and dropdown menu functionality
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

// dropdown menu and hero image functionality
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
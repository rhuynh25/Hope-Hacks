const apiUrl = 'http://localhost:3000/search-providers';

document.getElementById('providerSearchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

    console.log('Form data being sent:', jsonData); // Log the data being sent

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.details || 'Error searching for healthcare providers');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 

        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = ''; 

        if (data.providers && data.providers.length > 0) {
            data.providers.forEach(provider => {
                const providerElement = document.createElement('div');
                providerElement.classList.add('provider-item');

                const nameElement = document.createElement('h3');
                nameElement.textContent = provider.provider.name;
                nameElement.classList.add('provider-name');
                providerElement.appendChild(nameElement);

                const providerID = document.createElement('p');
                providerID.textContent = `NPI: ${provider.provider.npi}`;
                providerID.classList.add('provider-details');
                providerElement.appendChild(providerID);

                const addressElement = document.createElement('p');
                addressElement.textContent = `${provider.address.street1}, ${provider.address.city}, ${provider.address.state} ${provider.address.zipcode}`;
                addressElement.classList.add('provider-details');
                providerElement.appendChild(addressElement);

                const phoneElement = document.createElement('p');
                phoneElement.textContent = `Phone: ${provider.address.phone}`;
                phoneElement.classList.add('provider-details');
                providerElement.appendChild(phoneElement);

                resultsContainer.appendChild(providerElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No providers found.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = `<p>${error.message}</p>`;
    });
});

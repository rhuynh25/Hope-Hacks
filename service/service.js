const apiUrl = 'http://localhost:3000/search-plans'; // Update with your backend endpoint

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form input values
    const formData = new FormData(event.target);

    // Make a POST request to your backend server
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.details || 'Error searching for health insurance plans');
            });
        }
        return response.json();
    })
    .then(data => {
        // Handle API response data, display results dynamically
        console.log(data); 
  
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.innerHTML = ''; 

        if (data.plans && data.plans.length > 0) {
            data.plans.forEach(plan => {
                const planElement = document.createElement('div');
                planElement.classList.add('plan-item');

                const nameElement = document.createElement('h3');
                nameElement.textContent = plan.name;
                nameElement.classList.add('plan-name');
                planElement.appendChild(nameElement);

                const planID = document.createElement('p');
                planID.textContent = `Plan ID: ${plan.id}`;
                planID.classList.add('plan-ID');
                planElement.appendChild(planID);

                const issuerElement = document.createElement('p');
                issuerElement.textContent = plan.issuer.name;
                issuerElement.classList.add('plan-details');
                planElement.appendChild(issuerElement);

                const planPremium = document.createElement('p');
                planPremium.textContent = `Premium: $${plan.premium}`;
                planPremium.classList.add('plan-details');
                planElement.appendChild(planPremium);

                const planDeductible = document.createElement('p');
                planDeductible.textContent = `Deductible: $${plan.deductibles[0].amount}`;
                planDeductible.classList.add('plan-details');
                planElement.appendChild(planDeductible);

                const benefitsLink = document.createElement('a');
                benefitsLink.href = plan.benefitsUrl;
                benefitsLink.textContent = 'View Benefits';
                planElement.appendChild(benefitsLink);

                const brochureUrl = document.createElement('a');
                brochureUrl.href = plan.brochureUrl;
                brochureUrl.textContent = 'View Brochure';
                planElement.appendChild(brochureUrl);

                const viewPlanButton = document.createElement('button');
                viewPlanButton.textContent = 'View Plans';
                viewPlanButton.classList.add('view-btn');
                planElement.appendChild(viewPlanButton);

                resultsContainer.appendChild(planElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No plans found.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.innerHTML = `<p>${error.message}</p>`;
    });
});

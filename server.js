const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

const apiKey = 'your_api_key_here';

// Middleware
app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static('home'));
app.use(express.static('aboutUs'));
app.use(express.static('contact'));
app.use(express.static('service'));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'aboutUs', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact', 'contact.html'));
});

app.get('/insurance', (req, res) => {
  res.sendFile(path.join(__dirname, 'service', 'service.html'));
});

app.get('/provider', (req, res) => {
  res.sendFile(path.join(__dirname, 'service', 'provider.html'));
});

// Function to get the county FIPS code based on user input
const getCountyFipsCode = async (zipcode) => {
  const url = `https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/${zipcode}?apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log('County FIPS response:', response.data);
    const countyfips = response.data.counties[0].fips;
    return countyfips;
  } catch (error) {
    console.error('Error fetching county FIPS code:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to search for health insurance plans based on user input and county FIPS code
const searchHealthInsurancePlans = async (countyfips, zipcode, income, age, gender, uses_tobacco, market, state, year = 2019) => {
  const url = `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${apiKey}`;

  const requestBody = {
    household: {
      income: parseFloat(income) || income,
      people: [
        {
          age: parseInt(age) || age,
          aptc_eligible: true,
          gender: gender,
          uses_tobacco: uses_tobacco === 'Yes'  // Convert to boolean
        }
      ]
    },
    market: market,
    place: {
      countyfips: countyfips,
      state: state,
      zipcode: zipcode
    },
    year: year
  };

  try {
    console.log('Request body:', requestBody);
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('Status:', response.status);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching health insurance plans:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Search For Plans
app.post('/search-plans', async (req, res) => {
  const { zipcode, income, age, gender, uses_tobacco, market, state } = req.body;

  console.log('Received data:', { zipcode, income, age, gender, uses_tobacco, market, state });

  try {
    const countyfips = await getCountyFipsCode(zipcode);
    const plans = await searchHealthInsurancePlans(countyfips, zipcode, income, age, gender, uses_tobacco, market, state);
    res.json(plans);
  } catch (error) {
    console.error('Error searching for health insurance plans:', error);
    res.status(500).json({ error: 'Error searching for health insurance plans', details: error.message });
  }
});

// Search For Providers

app.post('/search-providers', async (req, res) => {
  const { query, zipcode, type} = req.body;
  const apiKey = 'UC0YoVdQzrav2kmHcCi3ET0nUovZPHb6';
  const apiUrl = `https://private-anon-c9adea25c6-marketplaceapicms.apiary-proxy.com/api/v1/providers/search?apikey=${apiKey}&q=${query}&zipcode=${zipcode}&type=${type}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status !== 200) {
        return res.status(response.status).send({ error: 'Failed to fetch providers' });
    }
    const data = response.data;
    res.json(data);
} catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).send({ error: 'An error occurred while fetching providers' });
}
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

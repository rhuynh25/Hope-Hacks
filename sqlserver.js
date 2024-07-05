// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create an Express application
const app = express();
const port = 3000;

// Use body-parser middleware to parse the request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "login" directory
app.use(express.static('login'));

// Create a MySQL connection
const connection = mysql.createConnection({
    host: '127.0.0.1', // My IP address (Do not need place for root since it is using the default 3306)
    database: 'HealthcareProject',
    user: 'root',
    password: 'password',
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Database is Connected!');
});

// Registration endpoint
app.post('/register', (req, res) => {
    // Takes the user details from the request body
    const { name, email, password, birthdate, address, city, state, zip_code, phone_number, healthcare_type } = req.body;

    // SQL query to insert a new user into the 'users' table ? are placeholders
    const sql = 'INSERT INTO users (name, email, password, birthdate, address, city, state, zip_code, phone_number, healthcare_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Execute the SQL query with the provided user details
    connection.query(sql, [name, email, password, birthdate, address, city, state, zip_code, phone_number, healthcare_type], (err, result) => {
        // Handle any errors that occur during the query execution
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).send('Error registering user.');
        }
        // Log a success message and send a response back to the client
        console.log('User registered successfully:', result);
        res.status(200).json({ message: 'User registered successfully' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    // Extract the email and password from the request body 
    const { email, password } = req.body;

    // Define the SQL query to select the user with the provided email and password
    // The '?' placeholders will be replaced by the values that are in the connection.query() i.e email and password
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    // Execute the SQL query with the provided email and password
    // connection.query(sql, [email, password], callback)
    connection.query(sql, [email, password], (err, results) => {
        // Check for any errors that occurred during the query execution
        if (err) {
            // Log the error message to the console 
            console.error('Error logging in:', err);
            // Will Send a 500 error response to the client (website) 
            return res.status(500).send('Error logging in.');
        }
        // Check if the query returned any results (i.e., if a user was found)
        if (results.length === 0) {
            // If no user is found, send a 400 response to the client with an error message
            return res.status(400).send('Invalid email or password.');
        }

        // If a user is found, extract the user data from the query results
        const user = results[0];
        // Send the user data back to the client as a JSON response with a 200 OK status
        res.status(200).json(user);
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

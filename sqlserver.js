// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');  // Path Module Built into Node

// Create an Express application
const app = express();
const port = 3000;

// Use body-parser middleware to parse the request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the specific directories
app.use('/login', express.static(path.join(__dirname, 'login')));
app.use('/home', express.static(path.join(__dirname, 'home')));
app.use('/aboutUs', express.static(path.join(__dirname, 'aboutUs')));
app.use('/contact', express.static(path.join(__dirname, 'contact')));
app.use('/service', express.static(path.join(__dirname, 'service')));

// Create a MySQL connection to the remote database
const connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',  // Remote database host
    database: 'sql5718336',            // Remote database name
    user: 'sql5718336',                // Remote database user
    password: 'vpF2eG1TX5',            // Remote database password
    port: 3306                         // Default MySQL port
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Database is Connected!');
});

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

// Registration endpoint to handle user registration
app.post('/register', (req, res) => {
    // Destructure the request body to get user data
    const { name, email, password, birthdate, address, city, state, zip_code, phone_number, healthcare_type } = req.body;

    // SQL query to insert user data into the users table
    const sql = 'INSERT INTO users (name, email, password, birthdate, address, city, state, zip_code, phone_number, healthcare_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, password, birthdate, address, city, state, zip_code, phone_number, healthcare_type], (err, result) => {
        if (err) {
            console.error('Error registering user:', err); // Log error if query fails
            return res.status(500).send('Error registering user.'); // Send error response
        }
        console.log('User registered successfully:', result); // Log success message
        res.status(200).redirect('/login/login.html'); // Redirect to login page
    });
});

// Login endpoint to handle user login
app.post('/login', (req, res) => {
    // Destructure the request body to get login data
    const { email, password } = req.body;

    // SQL stored procedure call to verify user credentials
    const sql = 'CALL LoginUser(?, ?)'; // ? Placeholder
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err); // Log error if query fails
            return res.status(500).send('Error logging in.'); // Send error response
        }
        if (results[0].length === 0) {
            return res.status(400).send('Invalid email or password.'); // Send error if no matching user found
        }

        const user = results[0][0]; // Get user data from the result
        res.status(200).json(user); // Send user data as JSON response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

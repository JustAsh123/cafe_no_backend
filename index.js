const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Database configuration
const dbConfig = {
  host: 'db4free.net', // Replace with your actual database host
  user: 'ashmit', // Replace with your actual database user
  password: 'ASmit123', // Replace with your actual database password
  database: 'dine_and_ash', // Replace with your actual database name
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Enable CORS to allow all origins (*)
app.use(cors());

// Endpoint to fetch data from the database and return it in JSON format
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM menu'; // Replace 'your_table_name' with your actual table name

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

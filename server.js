const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importing database connection

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to handle JSON data

// Fetch all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('❌ MySQL Query Error:', err);
            return res.status(500).json({ message: "Error fetching users", error: err });
        }
        res.json(results);
    });
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

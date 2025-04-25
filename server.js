const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Import your 'db.js' file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ====================
// GET: Fetch all users
// ====================
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('❌ MySQL Query Error:', err);
      return res.status(500).json({ message: "Error fetching users", error: err });
    }
    res.json(results);
  });
});

// ====================
// POST: Register a new user
// ====================
app.post('/users', (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, username, password], (err, results) => {
    if (err) {
      console.error('❌ MySQL Insert Error:', err);

      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: "Username or email already exists." });
      }

      return res.status(500).json({ message: "Error registering user", error: err });
    }

    res.status(201).json({
      message: "User registered successfully",
      userId: results.insertId
    });
  });
});

// ====================
// Start the Server on port 5001
// ====================
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

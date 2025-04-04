const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Use your MySQL username
    password: 'Ravikr@2005',  // Use your actual password
    database: 'crowdfunding_db'  // Ensure this database exists
});

connection.connect(err => {
    if (err) {
        console.error('❌ Database Connection Failed:', err);
    } else {
        console.log('✅ MySQL Connected Successfully!');
    }
});

module.exports = connection;

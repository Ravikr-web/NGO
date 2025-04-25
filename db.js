const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // MySQL username
    password: 'Ravikr@2005',// MySQL password
    database: 'crowdfunding_db'
});

connection.connect(err => {
    if (err) {
        console.error('❌ Database Connection Failed:', err);
    } else {
        console.log('✅ MySQL Connected Successfully!');
    }
});

module.exports = connection;

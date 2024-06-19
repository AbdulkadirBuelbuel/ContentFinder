const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',       // Ersetze dies mit deinem Host
    user: 'root',            // Ersetze dies mit deinem MySQL Benutzername
    password: 'changeme',    // Ersetze dies mit deinem MySQL Passwort
    database: 'images' // Ersetze dies mit deinem Datenbanknamen
});

connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden zur Datenbank:', err.stack);
        return;
    }
    console.log('Verbunden als ID ' + connection.threadId);
});

module.exports = connection;

const http = require('http');
const fs = require('fs');
const path = require('path');
const connection = require('./database'); // Stelle sicher, dass die Verbindung zur Datenbank hergestellt wird

// Funktion zum Löschen aller Einträge aus der Tabelle screenshots
function deleteImagesFromDatabase(callback) {
    const query = 'DELETE FROM screenshots';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen der Bilder aus der Datenbank:', err);
            callback(err);
        } else {
            console.log('Alle Einträge aus der Tabelle screenshots wurden gelöscht');
            resetAutoIncrement(() => {
                callback(null);
            });
        }
    });
}

// Funktion zum Zurücksetzen des Auto-Increment-Werts
function resetAutoIncrement(callback) {
    const query = 'ALTER TABLE screenshots AUTO_INCREMENT = 1';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Fehler beim Zurücksetzen des Auto-Increment-Werts:', err);
        } else {
            console.log('Auto-Increment-Wert der Tabelle screenshots wurde zurückgesetzt');
        }
        callback(err);
    });
}

// Funktion zum Einfügen der Bilder aus einem Ordner in die Datenbank
function insertImagesFromFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Fehler beim Lesen des Ordners:', err);
            return;
        }

        files.forEach((file) => {
            const imagePath = path.join(folderPath, file);
            const query = 'INSERT INTO screenshots (img_path) VALUES (?)';
            connection.query(query, [imagePath], (err, result) => {
                if (err) {
                    console.error('Fehler beim Einfügen des Bildes in die Datenbank:', err);
                    return;
                }
                console.log('Bild erfolgreich eingefügt mit ID:', result.insertId);
            });
        });
    });
}

// Beispielaufruf - Löschen der Bilder und anschließend Einfügen der neuen Bilder
deleteImagesFromDatabase((err) => {
    if (!err) {
        insertImagesFromFolder('1_screens_left_map');
    }
});
//========================================================================================================================
// Die Sortierten Bilder in der Datenbank
// Function to delete all entries from a specified table
function deleteImagesFromDatabaseTT(tableName, callback) {
    const query = `DELETE FROM ${tableName}`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error(`Error deleting images from the table ${tableName}:`, err);
            callback(err);
        } else {
            console.log(`All entries from the table ${tableName} have been deleted`);
            resetAutoIncrementTT(tableName, callback);
        }
    });
}

// Function to reset the auto-increment value of a specified table
function resetAutoIncrementTT(tableName, callback) {
    const query = `ALTER TABLE ${tableName} AUTO_INCREMENT = 1`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error(`Error resetting the auto-increment value for table ${tableName}:`, err);
        } else {
            console.log(`Auto-increment value of the table ${tableName} has been reset`);
        }
        callback(err);
    });
}

// Function to insert images from a folder into a specified table
function insertImagesFromFolderTT(folderPath, tableName) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Error reading the folder ${folderPath}:`, err);
            return;
        }

        files.forEach((file) => {
            const imagePath = path.join(folderPath, file);
            const query = `INSERT INTO ${tableName} (img_path) VALUES (?)`;
            connection.query(query, [imagePath], (err, result) => {
                if (err) {
                    console.error(`Error inserting the image into the table ${tableName}:`, err);
                    return;
                }
                console.log(`Image successfully inserted into table ${tableName} with ID:`, result.insertId);
            });
        });
    });
}

// Main function to process all folders
function processFoldersTT(baseFolderPath) {
    fs.readdir(baseFolderPath, (err, folders) => {
        if (err) {
            console.error(`Error reading the base folder ${baseFolderPath}:`, err);
            return;
        }

        folders.forEach((folder) => {
            const folderPath = path.join(baseFolderPath, folder);
            const tableName = folder.charAt(0).toLowerCase() + folder.slice(1);

            deleteImagesFromDatabaseTT(tableName, (err) => {
                if (!err) {
                    insertImagesFromFolderTT(folderPath, tableName);
                }
            });
        });
    });
}

// Example call - process all folders in the base folder 'Sortierte_Bilder_new'
processFoldersTT('Sortierte_Bilder_new');

//========================================================================================================================

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./index.html', (error, content) => {
            if (error) {
                res.writeHead(500);
                res.end(`Sorry, there was an error: ${error.code} ..\n`);
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.url === '/images') {
        const query = 'SELECT img_path FROM screenshots';
        connection.query(query, (err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Fehler beim Abrufen der Bilder' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    } else {
        let filePath = '.' + req.url;
        if (filePath == './home') {
            filePath = './home.html';
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.svg': 'application/image/svg+xml'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', (error, content) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end(`Sorry, there was an error: ${error.code} ..\n`);
                    res.end();
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');
const connection = require('./database'); // Stellen Sie sicher, dass die Verbindung zur Datenbank hergestellt wird

// Funktion zum Löschen aller Einträge aus einer Tabelle
function deleteImagesFromDatabaseTT(tableName, callback) {
    const query = `DELETE FROM ${tableName}`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error(`Fehler beim Löschen der Bilder aus der Tabelle ${tableName}:`, err);
            callback(err);
        } else {
            console.log(`Alle Einträge aus der Tabelle ${tableName} wurden gelöscht`);
            resetAutoIncrementTT(tableName, callback);
        }
    });
}

// Funktion zum Zurücksetzen des Auto-Increment-Werts einer Tabelle
function resetAutoIncrementTT(tableName, callback) {
    const query = `ALTER TABLE ${tableName} AUTO_INCREMENT = 1`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error(`Fehler beim Zurücksetzen des Auto-Increment-Werts für die Tabelle ${tableName}:`, err);
        } else {
            console.log(`Auto-Increment-Wert der Tabelle ${tableName} wurde zurückgesetzt`);
        }
        callback(err);
    });
}

// Funktion zum Einfügen der Bilder aus einem Ordner in eine Tabelle
function insertImagesFromFolderTT(folderPath, tableName) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Fehler beim Lesen des Ordners ${folderPath}:`, err);
            return;
        }

        const [color, count] = folderPath.match(/(green|red)(\d+)$/i).slice(1, 3);

        files.forEach((file) => {
            const imagePath = path.join(folderPath, file);
            const query = `INSERT INTO ${tableName} (img_path, color, count) VALUES (?, ?, ?)`;
            connection.query(query, [imagePath, color, parseInt(count)], (err, result) => {
                if (err) {
                    console.error(`Fehler beim Einfügen des Bildes in die Tabelle ${tableName}:`, err);
                    return;
                }
                console.log(`Bild erfolgreich in die Tabelle ${tableName} eingefügt mit ID:`, result.insertId);
            });
        });
    });
}

// Hauptfunktion zum Verarbeiten aller Ordner
function processFoldersTT(baseFolderPath) {
    fs.readdir(baseFolderPath, (err, folders) => {
        if (err) {
            console.error(`Fehler beim Lesen des Basisordners ${baseFolderPath}:`, err);
            return;
        }

        folders.forEach((folder) => {
            const folderPath = path.join(baseFolderPath, folder);
            let tableName;

            if (folder.startsWith('Left_')) {
                tableName = 'leftdisplay';
            } else if (folder.startsWith('Right_')) {
                tableName = 'rightdisplay';
            }

            if (tableName) {
                deleteImagesFromDatabaseTT(tableName, (err) => {
                    if (!err) {
                        insertImagesFromFolderTT(folderPath, tableName);
                    }
                });
            }
        });
    });
}

// Beispielaufruf - Verarbeiten aller Ordner im Basisordner 'Sortierte_Bilder_new'
processFoldersTT('Sortierte_Bilder_new');

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
    } else if (req.url.startsWith('/images')) {
        const side = req.url.split('=')[1]; // Get the side (left or right) from query params
        const tableName = side === 'left' ? 'leftdisplay' : 'rightdisplay';
        const query = `SELECT img_path FROM ${tableName}`;
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
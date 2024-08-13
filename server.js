const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Evitar solicitud de favicon
    if (req.url === '/favicon.ico') {
        res.writeHead(204);  // Response 204 significa que la solicitud fue exitosa pero no hay contenido para mostrar
        res.end();
        return;
    }

    // Obtener la ruta absoluta del archivo solicitado
    let filePath = path.join(__dirname, 'public', req.url);

    console.log('Ruta del Archivo solicitado', filePath); // Mensaje de depuración

    // Verificar si filepath es un archivo o un directorio
    if (fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    // Lee el archivo solicitado y responde con su contenido
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error('Error al leer el archivo', err);
            if (err.code === 'ENOENT') {
                console.error('Archivo no encontrado', filePath);
                res.writeHead(404, {'content-type': 'text/html'});
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(500, {'content-type': 'text/html'});
                res.end('Error en el servidor');
            }
        } else {
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            switch (ext) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                    contentType = 'image/jpg';
                    break;

                case '.gif':
                    contentType = 'image/gif';
                    break;
            }

            console.log('Sirviendo archivo solicitado: ', filePath);

            // Archivo encontrado, envia el contenido como respuesta 
            res.writeHead(200, {'content-type': contentType});
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
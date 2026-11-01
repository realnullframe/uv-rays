import { createBareServer } from '@tomphttp/bare-server-node';
import express from 'express';
import http from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'node:path';

const __dirname = path.resolve();
const server = http.createServer();
const app = express();
const bareServer = createBareServer('/bare/');

app.use('/uv/uv.config.js', express.static(path.join(__dirname, 'uv.config.js')));
app.use('/uv/', express.static(uvPath));

// CHANGE THIS BLOCK: Serve the index.html frontend file natively 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Ultraviolet server listening on port ${PORT}`);
});

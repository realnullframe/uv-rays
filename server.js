import { createBareServer } from '@tomphttp/bare-server-node';
import express from 'express';
import http from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'node:path';

const __dirname = path.resolve();
const server = http.createServer();
const app = express();
const bareServer = createBareServer('/bare/');

// Explicitly route requests for uv.config.js to your repository's local configuration file
app.get('/uv/uv.config.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'uv.config.js'));
});

// Serve the remaining internal Ultraviolet library assets natively
app.use('/uv/', express.static(uvPath));

// Deliver the index.html user dashboard layout when hitting the root domain route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Intercept standard routing streams to pass network requests to the Bare server backend
server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

// Upgrade incoming network streams (WebSocket support for real-time web apps and games)
server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

// Dynamically bind to the environment port layout assigned by Render
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Ultraviolet server listening on port ${PORT}`);
});

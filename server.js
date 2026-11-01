import { createBareServer } from '@tomphttp/bare-server-node';
import express from 'express';
import http from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'node:path';

const __dirname = path.resolve();
const server = http.createServer();
const app = express();
const bareServer = createBareServer('/bare/');

// Serve Ultraviolet frontend distribution scripts
app.use('/uv/', express.static(uvPath));

// Fail-safe handling for static routing
app.get('/', (req, res) => {
    res.send('Ultraviolet Proxy Backend is Running Successfully.');
});

// Intercept routing logic to pass requests to the Bare server backend
server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

// Upgrade requests (WebSocket support for complex web apps/games)
server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

// Dynamically bind to the environment port assigned by Render
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Ultraviolet server listening on port ${PORT}`);
});

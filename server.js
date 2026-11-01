import { createBareServer } from '@tomphttp/bare-server-node';
import express from 'express';
import http from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'node:path';

const __dirname = path.resolve();
const server = http.createServer();
const app = express();
const bareServer = createBareServer('/bare/');

// Prioritize files in your repository's local public/uv folder first
app.use('/uv/', express.static(path.join(__dirname, 'public', 'uv')));

// Fallback to internal library components if not present locally
app.use('/uv/', express.static(uvPath));

// Deliver the index.html frontend interface dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Intercept routing logic to pass requests to the Bare server backend
server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

// Upgrade requests (WebSocket support)
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

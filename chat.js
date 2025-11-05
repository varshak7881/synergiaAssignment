const WebSocket = require('ws');

const chatServer = new WebSocket.Server({ port: 3003 });
console.log('Server created');

chatServer.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Someone sent: ${message}`);

    // Broadcast the message to all connected clients
    chatServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Tata Bye Bye');
  });
});
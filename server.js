// server.js
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    // console.log('a user connected');
    socket.on('audioChunk', (data) => {
        // Retransmit the audio chunk to all other clients
        socket.broadcast.emit('audioChunk', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

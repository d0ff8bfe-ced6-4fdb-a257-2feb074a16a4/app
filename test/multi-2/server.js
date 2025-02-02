const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = {};
let objects = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New client connected');
    users[socket.id] = { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } };

    // Send current object positions to the newly connected client
    socket.emit('initialObjectPositions', objects);

    socket.on('updatePosition', (data) => {
        users[data.id] = { position: data.position, rotation: data.rotation };
        io.emit('updatePositions', users);
    });

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('updateObjectPosition', (data) => {
        objects[data.id] = { position: data.position };
        io.emit('updateObjectPosition', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        delete users[socket.id];
        io.emit('updatePositions', users);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
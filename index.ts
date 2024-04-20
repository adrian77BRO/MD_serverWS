import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
//const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    pingInterval: 1000,
    pingTimeout: 2000,
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendData', (data: any) => {
        console.log('Informacion Recibida:', data);
        io.emit('getData', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
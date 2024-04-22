import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { verifyToken } from './src/middlewares/authMiddleware';
import { dataHandler } from './src/handlers/dataHandler';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    verifyToken(socket, token, next);
});

io.on('connection', (socket) => {
    console.log('User connected: ', socket.data.idUser);
    socket.join(socket.data.idUser);
    dataHandler(io, socket);

    socket.on('disconnect', () => {
        console.log('User disconnected: ');
    });

    socket.on('reconnect', () => {
        console.log('User reconnected');
      });
    
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
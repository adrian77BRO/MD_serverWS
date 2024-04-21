"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('sendData', (data) => {
        console.log('Informacion Recibida:', data);
        io.emit('getData', data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});

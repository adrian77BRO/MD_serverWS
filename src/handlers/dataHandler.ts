import { Server, Socket } from 'socket.io';
import { Event } from '../constants/events';

export function dataHandler(io: Server, socket: Socket) {
    const packetQueue: any[] = [];
    let isProcessing = false;

    const sendData = (payload: any) => {
        try {
            packetQueue.push(payload);

            if (!isProcessing) {
                processQueue();
            }
            console.log('Datos recibidos: ', payload);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const processQueue = () => {
        isProcessing = true;

        while (packetQueue.length > 0) {
            const payload = packetQueue.shift();
            socket.to(socket.data.idUser).emit(Event.GET_DATA, payload);
        }
        isProcessing = false;
    };
    socket.on(Event.SEND_DATA, sendData);
}
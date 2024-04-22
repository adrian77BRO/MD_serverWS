import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

export const verifyToken = (socket: Socket, token: string, next: Function) => {
    if (!token) {
        return next(new Error('Authentication error: Token is missing'));
    }
    try {
        const decoded: any = jwt.verify(
            token,
            'secret'
        );
        socket.data.idUser = decoded.idUser;
        console.log('Verified');
        next();
    } catch (error: any) {
        console.log('Not verified');
        console.log(error);
        return next(new Error('Authentication error: Invalid token'));
    }
};
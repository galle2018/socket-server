// AQUI PONDREMOS TODA LA LOGICA DE LOS SOCKETS
import {Socket} from 'socket.io';
import socketIO from 'socket.io';

// de esta forma puedo usarla en otro lugar
export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

}


//escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido: ', payload);

        //emito el mensaje del servidor
        io.emit('mensaje-nuevo', payload);

    });

}
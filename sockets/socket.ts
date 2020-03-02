// AQUI PONDREMOS TODA LA LOGICA DE LOS SOCKETS
import {Socket} from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


// crea una instancia de mis usuarios conectados
export const usuariosConectados =  new UsuariosLista();


// --------------------------------------------------------------------------------------------------

export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id ); // nueva instancia de usuario recibiendo cliente-id

    usuariosConectados.agregar( usuario );
    
}

// --------------------------------------------------------------------------------------------------


// de esta forma puedo usarla en otro lugar
export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');

        usuariosConectados.borrarUsuario( cliente.id );
        console.log('El cliente: ('+cliente.id+') --> se ha desconectado');//comprueba que se quito este cliente
    });

}


// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido: ', payload);

        //emito el mensaje del servidor
        io.emit('mensaje-nuevo', payload);

    });

}


// Configurar usuario ---------------------------------------------------------------------------
export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
      
       // console.log('Configurando Usuario: ', payload.nombre);

       usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre}, configurado`
        });

        //emito el mensaje del servidor
       // io.emit('mensaje-nuevo', payload);

    });

}


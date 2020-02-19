
import express from 'express';
import { SERVER_PORT } from '../global/environments';

//para los sockets
import socketIO from 'socket.io';
import http from 'http';

//importar todas las exportaciones de socket.ts con el nombre socket
//para usarlas por ej uso: socket. y lo que quiero usar
import * as socket from '../sockets/socket';


export default class Server {
    
    private static _instance: Server;

    //para express
    public app: express.Application;
    public port: number;

    //para los sockets -- debo asegurarme de tener 1 unica instancia 
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        //para los sockets
        this.httpServer = new http.Server(this.app);
        this.io = socketIO( this.httpServer );
        this.escucharSockets();

    }

    public static get instance(){
        return this._instance || ( this._instance = new this());
    }

    //para los sockets
    private escucharSockets(){
        
        console.log('Escuchando conexiones - sockets');
        
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            //Mensajes
            socket.mensaje( cliente, this.io );

            //Detectar cuando el cliente se desconecta
            // cliente.on('disconnect', ()=>{
            //     console.log('Cliente Desconectado');
            // }); //esta forma la use cuando hice directo
            socket.desconectar(cliente);//asi usando desde el socket.ts importado

        })

    }


    //creo un metodo para levantar este servidor
    start( callback: Function ) {

        //inicia el express
        //this.app.listen( this.port, callback() );

        //inicia nuestro http.Server
        this.httpServer.listen( this.port, callback() );
    }

}
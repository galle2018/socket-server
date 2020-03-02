
// centralizo la logica de todos los usuarios

import { Usuario } from './usuario';
import { desconectar } from '../sockets/socket';

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor(){ }

    // AGREGAR 1 USUARIO --------------------
    public agregar( usuario: Usuario ){
        
        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }
    // --------------------------------------



    // METODO PARA ACTUALIZAR EL NOMBRE --------------------------
    public actualizarNombre( id: string, nombre: string ){

        for( let usuario of this.lista ) {

            if ( usuario.id === id ){
                usuario.nombre = nombre;
                break; //sale del ciclo for cuando lo encuentra
        }
    }

    console.log('==== Actualizando usuario ====');
    console.log( this.lista );

    }
    // -----------------------------------------------------------



    // OBTENER LISTA DE USUARIOS CONECTADOS - LA LISTA ES PRIVADA
    public getLista(){
        return this.lista;
    }
    // ----------------------------------------------------------



    // funcion para OBTENER 1 USUARIO----------------------------------------------------------------------------
    public getUsuario( id: string ){
        return this.lista.find( usuario => usuario.id === id ); //al poner en 1 misma linea no necesito el return
    }
    // -----------------------------------------------------------------------------------------------------------


    
    // OBTENER LOS USUARIOS EN 1 SALA EN PARTICULAR-------------------
    public getUsuariosEnSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }
    // ---------------------------------------------------------------



    // BORRAR USUARIO
    public borrarUsuario( id: string ){
        const tempUsuario = this.getUsuario( id );
        this.lista = this.lista.filter( usuario => usuario.id !== id );

        console.log(this.lista);// muestra lista y confirmo si elimina cuando se descontecta

        return tempUsuario; //va decir usuario borrado es fulando de tal
        
    }
    // --------------------------------------------





}
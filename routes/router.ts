import {Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();

// INICIO DEL GET -----------------------------------------------------
//cuando alguien haga una peticion http.get lo que este dentro de
//de la carpeta /mesajes lo recibira 
router.get('/mensajes', (req: Request, res: Response) => {
 
    //envio un mensaje de respuesta
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!!'
    });
});
// FIN DEL GET -----------------------------------------------------



// INICIO DEL POST -----------------------------------------------------
//cuando alguien haga una peticion http.post lo que este dentro de
//de la carpeta /mesajes lo recibira 
//router.post('/mensajes/:id', (req: Request, res: Response) => {
    router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    //const id = req.params.id;

    const payload = {de, cuerpo };

    const server = Server.instance; 
    server.io.emit('mensaje-nuevo', payload );

    // const payload = {
    //     de,
    //     cuerpo
    // }

   // const server = Server.instance; 

    // para enviar 1 msg a 1 o a todos los usuarios
    // server.io.in( id ).emit('mensaje-privado', payload);
    
 
    //envio un mensaje de respuesta
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
// FIN DEL POST -----------------------------------------------------



// INICIO DEL SERVICIO PARA LEER EL URL---------------------------------
//por ej: localhost:5000/mensajes/ABC  el ABC de aqui
router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
 
    //envio un mensaje de respuesta
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
// FIN DEL SERVICIO PARA LEER EL URL---------------------------------




export default router; //si uso asi cuando lo importe no necesito ponerlo dentro de {}
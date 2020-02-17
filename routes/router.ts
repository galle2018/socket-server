import {Router, Request, Response} from 'express';

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
// INICIO DEL GET -----------------------------------------------------



// INICIO DEL POST -----------------------------------------------------
//cuando alguien haga una peticion http.post lo que este dentro de
//de la carpeta /mesajes lo recibira 
router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
 
    //envio un mensaje de respuesta
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
// INICIO DEL POST -----------------------------------------------------



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
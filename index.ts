import Server from "./classes/server"; //puedo poner directo Server pues esta designado como default
import router from "./routes/router";
import bodyParser = require("body-parser");
import cors = require("cors");

//import { SERVER_PORT } from "./global/environments"; //si uso abajo ${SERVER_PORT}

const server = new Server();

// BodyParser inicio
server.app.use( bodyParser.urlencoded({extended: true}));
server.app.use( bodyParser.json());
// BodyParser fin


// INICIO CONFIGURACION CORS ---------------------------------------
// CORS para que pueda tener peticiones desde afuera del servidor
// considerando que tendria el servidor hospedado por un lado 
// y la peticion vendria desde otro lugar
server.app.use( cors({ origin: true, credentials: true}))
// cualquier persona puede llamar mi servicio
// FIN CONFIGURACION CORS ------------------------------------------


// RUTAS DE SERVICIOS
server.app.use('/', router);

server.start( () => {
    //console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`); o de la manera de abajo sin el import de arriva
    console.log(`Servidor corriendo en el puerto ${server.port}. 
Saludos Hector!!!`);
    //usando los ` ` puedo poner por ej el ${SERVER_PORT} y ademas hacer saltos de linea directos al dar enter y usar varias lineas
});
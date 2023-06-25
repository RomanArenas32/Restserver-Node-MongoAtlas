const express = require('express');
const cors = require('cors');
const  {dbConnecion} = require('../database/config');

class Server {
    
    dbConnecion

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/users';

        //db conection
        this.conectarDB();


        //midlewares
        this.midlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnecion();
    }

    midlewares() {
        this.app.use(express.json()); //Formatea todo lo que viene en formato json
        this.app.use(cors()); //soluciona errores de los cors
        this.app.use(express.static('public')); //renderiza el html de la carpeta public 
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/routes'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log("servidor corriendo en el puerto: ", this.PORT)
        })
    }
}



module.exports = Server
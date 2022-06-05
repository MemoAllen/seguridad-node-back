import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import { checkJwt } from "../middlewares/jwt";

class UsuarioRoutes{

    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config(): void{
        this.router.get('/',[checkJwt] ,usuarioController.listar);
        this.router.post('/',[checkJwt] , usuarioController.datoUsuario);
        this.router.put('/',[checkJwt] ,usuarioController.insertar);
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
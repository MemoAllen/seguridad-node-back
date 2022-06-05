"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const jwt_1 = require("../middlewares/jwt");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', [jwt_1.checkJwt], usuarioController_1.usuarioController.listar);
        this.router.post('/', [jwt_1.checkJwt], usuarioController_1.usuarioController.datoUsuario);
        this.router.put('/', [jwt_1.checkJwt], usuarioController_1.usuarioController.insertar);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;

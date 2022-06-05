"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioDao_1 = __importDefault(require("../dao/usuarioDao"));
const validator_1 = __importDefault(require("validator"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const keysScripts_1 = __importDefault(require("../config/keysScripts"));
const logs_1 = require("../utils/logs");
class UsuarioController {
    /**
     * @description Enlista los usaurios
     * @param req
     * @param res
     */
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuarioDao_1.default.listar();
                res.json(result);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error interno de servidor" });
            }
        });
    }
    /**
     * @description se obtiene al usuario a partir de su username
     * @param req
     * @param res
     * @returns Promise <void>
     */
    datoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var { username } = req.body;
                const result = yield usuarioDao_1.default.datoUsuario(username);
                res.json(result);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error interno de servidor" });
            }
        });
    }
    /**
     * @description Inserta usuarios
     * @param req
     * @param res
     * @returns Promise <void>
     */
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //se obtienen los datos del body
                var usuario = req.body;
                if (!usuario.nombre || !usuario.apellido || !usuario.password || !usuario.username) {
                    logs_1.logger.error('todos los datos son requeridos');
                    return res.json({ message: "todos los datos son requeridos" });
                }
                //validar que datos no sean null o indefinidos
                if (validator_1.default.isEmpty(usuario.nombre.trim()) || validator_1.default.isEmpty(usuario.apellido.trim()) ||
                    validator_1.default.isEmpty(usuario.password.trim()) || validator_1.default.isEmpty(usuario.username.trim())) {
                    logs_1.logger.error('todos los datos son requeridos, algunos vienen vacios');
                    return res.json({ message: "todos los datos son requeridos" });
                }
                //encriptar contra
                var encryptedText = crypto_js_1.default.AES.encrypt(usuario.password, keysScripts_1.default.keys.secret).toString();
                usuario.password = encryptedText;
                const newUser = {
                    nombre: usuario.nombre.trim(),
                    apellido: usuario.apellido.trim(),
                    username: usuario.username.trim(),
                    password: usuario.password.trim()
                };
                //insercion de datos
                const result = yield usuarioDao_1.default.insertar(newUser);
                if (result.affectedRows > 0) {
                    logs_1.logger.info('Los datos se guardaron Correctamente');
                    return res.json({ message: "Los datos se guardaron Correctamente" });
                }
                return res.status(500).json(result.message);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error interno de servidorrr" });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();

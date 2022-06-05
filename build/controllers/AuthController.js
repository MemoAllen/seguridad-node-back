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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const validator_1 = __importDefault(require("validator"));
const authDao_1 = __importDefault(require("../dao/authDao"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const keysScripts_1 = __importDefault(require("../config/keysScripts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logs_1 = require("../utils/logs");
class AuthController {
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                //Validacion
                if (!username || !password) {
                    logs_1.logger.error('El usuario y contraseña son requeridos ya que no se estan enviando');
                    return res.json({ message: "Todos los campos son requeridos" });
                }
                if (validator_1.default.isEmpty(username.trim() || validator_1.default.isEmpty(password.trim()))) {
                    logs_1.logger.error('El usuario y contraseña son requeridos, ya que se estan enviando algunos vacios');
                    return res.json({ message: "Todos los campos son requeridos" });
                }
                //se obtiene el dato del usuario
                const isUsers = yield authDao_1.default.GetByUsername(username);
                //verificar si existe usuario
                if (isUsers.length <= 0) {
                    logs_1.logger.error('EL usuario y/o contraseña son incorrecto');
                    return res.json({
                        message: "EL usuario y/o contraseña son incorrecto",
                    });
                }
                //Verificar que la contrasela sea correcta
                for (let usuario of isUsers) {
                    var bytes = crypto_js_1.default.AES.decrypt(usuario.password, keysScripts_1.default.keys.secret);
                    var originalText = bytes.toString(crypto_js_1.default.enc.Utf8);
                    if (password == originalText) {
                        //Quitamos la contraseña para que no aparezca en el return
                        const { password } = usuario, newUser = __rest(usuario, ["password"]);
                        //Se genera el token
                        var token = jsonwebtoken_1.default.sign(newUser, keysScripts_1.default.keys.secret, { expiresIn: '120s' });
                        console.log(token);
                        logs_1.logger.info('Autentificacion correcta');
                        return res.json({ message: "Autentificacion correcta", token, code: 0 });
                    }
                    else {
                        logs_1.logger.error('EL usuario y/o contraseña son incorrecto');
                        return res.json({ message: "EL usuario y/o contraseña son incorrecto" });
                    }
                }
            }
            catch (error) {
                return res.status(500).json({ message: "ocurrio un error", code: 1 });
            }
        });
    }
}
exports.authController = new AuthController();

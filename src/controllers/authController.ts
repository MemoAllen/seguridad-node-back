import { Request, Response } from "express";
import validator from "validator";
import dao from "../dao/authDao";
import cryptojs from "crypto-js";
import keysScripts from "../config/keysScripts";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logs";

class AuthController {
  public async iniciarSesion(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      //Validacion
      if (!username || !password) {
        logger.error('El usuario y contraseña son requeridos ya que no se estan enviando');
        return res.json({ message: "Todos los campos son requeridos" });
      }
      if (
        validator.isEmpty(username.trim() || validator.isEmpty(password.trim()))
      ) {
        logger.error('El usuario y contraseña son requeridos, ya que se estan enviando algunos vacios');
        return res.json({ message: "Todos los campos son requeridos" });
      }

      //se obtiene el dato del usuario

      const isUsers = await dao.GetByUsername(username);

      //verificar si existe usuario
      if (isUsers.length <= 0) {
        logger.error('EL usuario y/o contraseña son incorrecto');
        return res.json({
          message: "EL usuario y/o contraseña son incorrecto",

        });
      }

      //Verificar que la contrasela sea correcta
      for (let usuario of isUsers) {
        var bytes = cryptojs.AES.decrypt(usuario.password,keysScripts.keys.secret);
        var originalText = bytes.toString(cryptojs.enc.Utf8);

        if(password == originalText){


        //Quitamos la contraseña para que no aparezca en el return
        const {password, ...newUser}=usuario;

            //Se genera el token
            var token = jwt.sign(newUser,keysScripts.keys.secret, {expiresIn:'120s'});
            console.log(token);

            logger.info('Autentificacion correcta');
            return res.json({message:"Autentificacion correcta",token,code:0});
        }else{
          logger.error('EL usuario y/o contraseña son incorrecto');
            return res.json({message:"EL usuario y/o contraseña son incorrecto"});
        }
      }
    } catch (error) {
      return res.status(500).json({ message: "ocurrio un error",code:1});
    }
  }
}
export const authController = new AuthController();

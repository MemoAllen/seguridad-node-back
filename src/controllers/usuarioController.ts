import { Request, Response } from "express";
import dao from "../dao/usuarioDao";
import validator from "validator";
import cryptojs from "crypto-js";
import keysScripts from "../config/keysScripts";
import { logger } from "../utils/logs";


class UsuarioController {
    /**
     * @description Enlista los usaurios
     * @param req
     * @param res
     */

    public async listar(req: Request, res: Response): Promise<void> {
        try {
            const result = await dao.listar();

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno de servidor" });
        }
    }

    /**
     * @description se obtiene al usuario a partir de su username
     * @param req
     * @param res
     * @returns Promise <void>
     */
    public async datoUsuario(req: Request, res: Response): Promise<void> {
        try {
            var { username } = req.body;

            const result = await dao.datoUsuario(username);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno de servidor" });
        }
    }

    /**
     * @description Inserta usuarios
     * @param req
     * @param res
     * @returns Promise <void>
     */
    public async insertar(req: Request, res: Response) {
        try {
            //se obtienen los datos del body
            var usuario = req.body;
            
            if (!usuario.nombre|| !usuario.apellido || !usuario.password || !usuario.username) {
                logger.error('todos los datos son requeridos');
                return res.json({ message: "todos los datos son requeridos" });
            }
            //validar que datos no sean null o indefinidos
            if ( validator.isEmpty(usuario.nombre.trim()) || validator.isEmpty(usuario.apellido.trim()) ||
                validator.isEmpty(usuario.password.trim()) || validator.isEmpty(usuario.username.trim())) {
                    logger.error('todos los datos son requeridos, algunos vienen vacios');
                return res.json({ message: "todos los datos son requeridos" });
            }
             //encriptar contra
            var encryptedText = cryptojs.AES.encrypt(usuario.password, keysScripts.keys.secret).toString();
            usuario.password = encryptedText;

            const newUser={
                nombre: usuario.nombre.trim(),
                apellido:usuario.apellido.trim(),
                username:usuario.username.trim(),
                password:usuario.password.trim()
            }

            //insercion de datos

            const result = await dao.insertar(newUser);

            if(result.affectedRows>0){
         
                logger.info('Los datos se guardaron Correctamente');
                return res.json({message:"Los datos se guardaron Correctamente"})
            }
            return res.status(500).json(result.message);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno de servidorrr" }); 



        }
    }
 
}

export const usuarioController = new UsuarioController();

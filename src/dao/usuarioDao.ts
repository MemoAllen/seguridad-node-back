import pool from "../database/database";

class UsuarioDao {

    public async listar() {
        const result = await pool.then(async (connection) => {
            return connection.query("SELECT cveUsuario, nombre, apellido, fechaRegistro FROM usuario");
        });
            
        return result;
    }

    public async datoUsuario(username : String) {
        const result = await pool.then(async (connection) => {
            return await connection.query("SELECT * FROM usuario WHERE username = ?", [username]);
        });

        return result;
    }

    public async insertar(usuario: any){
        const result = await pool.then(async(connection)=>{
            return await connection.query("INSERT INTO usuario SET ?",[usuario]);
        });
        return result;
    }
}

const dao = new UsuarioDao();
export default dao;
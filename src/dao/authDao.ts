import pool from "../database/database";


class AuthDao{

    public async GetByUsername(username:string){
        const result = await pool.then(async(connection)=>{
            return await connection.query("SELECT * FROM usuario WHERE username=?",[username]);
        });
        return result;
    }
}

const dao = new AuthDao();
export default dao;
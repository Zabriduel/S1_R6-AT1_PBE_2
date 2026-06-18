import pool from "../config/db.js";

const categoriasModel = {
    selectALL: async () => {
        const sql = 'SELECT * FROM categorias;';
        const [rows] = await pool.execute(sql)
        return rows;
    },
    selectCategoria: async (pIdCategoria) => {
        const sql = 'SELECT * FROM categorias WHERE idCategoria = ?;';
        const values = [pIdCategoria];
        const [rows] = await pool.execute(sql,values);
        return rows;
    },
    insert: async (pDescricao) => {
        const sql = "INSERT INTO categorias(descricaoCategoria) VALUES (?);";
        const values = [pDescricao];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
    update: async (pIdCategoria, pDescricao, ) => {
        const sql = "UPDATE categorias SET descricaoCategoria=? WHERE idCategoria=?;";
        const values = [pDescricao,pIdCategoria];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    delete: async (pIdCategoria) => {
        const sql = "DELETE FROM categorias WHERE idCategoria = ?;";
        const values = [pIdCategoria];
        const [rows] = await pool.execute(sql, values);
        return rows;

    }
}

export default categoriasModel
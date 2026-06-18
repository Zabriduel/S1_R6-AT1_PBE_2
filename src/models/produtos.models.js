import pool from "../config/db.js";

const produtosModels = {
    selectALL: async () => {
        const sql = 'SELECT *FROM produtos;';
        const [rows] = await pool.execute(sql)
        return rows;
    },
    selectProduto: async (pIdProduto) => {
        const sql = "SELECT * FROM produtos WHERE idProduto = ?";
        const values = [pIdProduto];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
    insert: async (pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem) => {
        const sql = "INSERT INTO produtos(idCategoria,nomeProduto, valorProduto, vinculoImagem) VALUES (?,?,?,?);";
        const values = [pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
     update: async (pIdProduto, pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem) => {
        const sql = "UPDATE produtos SET idCategoria=?, nomeProduto=?, valorProduto=?, vinculoImagem=? WHERE idProduto=?;";
        const values = [pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem, pIdProduto];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    delete: async (pIdProduto) => {
        const sql = "DELETE FROM produtos WHERE idProduto = ?;";
        const values = [pIdProduto];
        const [rows] = await pool.execute(sql, values);
        return rows;
    }
}

export default produtosModels
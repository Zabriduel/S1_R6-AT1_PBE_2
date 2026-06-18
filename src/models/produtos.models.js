import {connection} from '../config/Database.js';

const produtosModels = {
    selectALL: async () => {
        const sql = 'SELECT *FROM produtos;';
        const [rows] = await connection.execute(sql)
        return rows;
    },
    selectProduto: async (pIdProduto) => {
        const sql = "SELECT * FROM produtos WHERE idProduto = ?";
        const values = [pIdProduto];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    insert: async (pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem) => {
        const sql = "INSERT INTO produtos(idCategoria,nomeProduto, valorProduto, vinculoImagem) VALUES (?,?,?,?);";
        const values = [pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
     update: async (pIdProduto, pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem) => {
        const sql = "UPDATE produtos SET idCategoria=?, nomeProduto=?, valorProduto=?, vinculoImagem=? WHERE idProduto=?;";
        const values = [pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem, pIdProduto];
        const [rows] = await connection.query(sql, values);
        return rows;
    },
    delete: async (pIdProduto) => {
        const sql = "DELETE FROM produtos WHERE idProduto = ?;";
        const values = [pIdProduto];
        const [rows] = await connection.execute(sql, values);
        return rows;
    }
}

export default produtosModels
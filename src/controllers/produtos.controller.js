import produtosModels from "../models/produtos.models.js";
import path from "path";
import fs from 'fs';
import { log } from "console";


const produtosController = {
    selectTodos: async (req, res) => {
        try {
            const resultado = await produtosModels.selectALL();

            if (resultado.length === 0) {
                return res.status(200).json({ message: "A consulta não retornou resultados" });
            }
            return res.status(200).json({ data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurreu um erro no servidor', errorMessage: error.message });
        }
    },
    selectByID: async (req, res) => {
        try {
            const { idProduto } = req.query;
            if (isNaN(idProduto)) {
                return res.status(400).json({ message: "Forneça valor númerico válido para idProduto" });
            }
            const resultado = await produtosModels.selectProduto(idProduto);
            if (resultado === 0) {
                return res.status(200).json({ message: "A consulta não retornou resultados" });
            }

            res.status(200).json({ data: resultado })
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurreu um erro no servidor', errorMessage: error.message });
        }
    },

    incluiProdutos: async (req, res) => {
        try {
            const { idCategoria, nomeProduto, valorProduto } = req.body

            if (!idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({ message: "Um dos valores está vazio confirme e tente novamente" });
            }

            if (isNaN(parseInt(idCategoria)) || isNaN(parseFloat(valorProduto))) {
                return res.status(400).json({ message: "Forneça valor númerico válido para IdCategoria ou para Valor produto" });

            }

            if (!req.file) {
                return res.status(400).json({ message: 'Arquivo não enviado' });
            }
            
            const image = req.file.filename;
            const resultado = await produtosModels.insert(idCategoria, nomeProduto, valorProduto, image);
            
            if (resultado.insertId === 0) {
                throw new Error('Ocorreu um erro ao incluir categoria');
            }

            res.status(201).json({ message: 'Registro incluido com sucesso', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurreu um erro no servidor', errorMessage: error.message });
        }
    }, alterarProduto: async (req, res) => {
        try {
            const {idProduto} = req.query;
            const { idCategoria, nomeProduto, valorProduto } = req.body;
            
            if (isNaN(parseInt(idCategoria)) || isNaN(parseFloat(valorProduto))) {
                return res.status(400).json({ message: "Forneça valor númerico válido para IdCategoria ou para Valor produto" });

            }

            console.log(idProduto);
            
            const produtoAtual = await produtosModels.selectProduto(idProduto);
            if (produtoAtual.length === 0) {
                return res.status(200).json({ message: 'Produto não localizado' });
            }
            let novaImagem;
            if (!req.file) {
                novaImagem = produtoAtual[0].vinculoImagem;
            } else {
                const imagePath = path.resolve(process.cwd(), `uploads/images/${produtoAtual[0].vinculoImagem}`);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
                novaImagem = req.file.filename;
            }

            const novaCategoria = idCategoria ?? produtoAtual[0].idCategoria;
            const novoNome = nomeProduto ?? produtoAtual[0].nomeProduto;
            const novoValor = valorProduto ?? produtoAtual[0].valorProduto;


            const resultUpdate = await produtosModels.update(idProduto, novaCategoria, novoNome, novoValor, novaImagem);

            if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
                return res.status(200).json({ message: 'Não há alterações a serem realizadas' });
            }
            if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1) {
                res.status(200).json({ message: 'Registro alterado com sucesso' });
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um errro no servidor', errorMessage: error.message });

        }
    },
    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.query;
            
            if (isNaN(idProduto) || !idProduto) {
                return res.status(400).json({ message: "Forneça valor númerico válido para idProduto" });
            }

            const resultadoSelect = await produtosModels.selectProduto(idProduto);

            if (resultadoSelect.length === 0) {
                return res.status(200).json({ message: "Produto não encontrado no banco de dados" });
            }
            const imagePath = path.resolve(process.cwd(), `uploads/images/${resultadoSelect[0].vinculoImagem}`);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            const resultado = await produtosModels.delete(idProduto);

            if (resultado.affectedRows === 0) {
                return res.status(200).json({ message: 'Ocorreu um erro ao excluir o item' });
            }

            res.status(200).json({ message: "Produto excluído com sucesso" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    }
}

export default produtosController;
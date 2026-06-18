import categoriasModel from "../models/categorias.model.js";

const categoriasController = {
    selectTodos: async (req, res) => {
        try {
            const resultado = await categoriasModel.selectALL();

            if (resultado.length === 0) {
                return res.status(200).json({ message: "A consulta não retornou resultados" });
            }
            return res.status(200).json({ data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurreu um erro no servidor', errorMessage: error.message });
        }
    },
    selectById: async (req, res) => {
        try {
            const { idCategoria } = req.query;
              if (isNaN(idCategoria)) {
                return res.status(400).json({ message: "Forneça valor númerico válido para idCategoria" });
            }
            const resultado = await categoriasModel.selectCategoria(idCategoria);
            if (resultado === 0) {
                return res.status(200).json({ messa: 'A consulta não retornou resultados' });
            }
            res.status(200).json({ data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurreu um erro no servidor', errorMessage: error.message });
        }
    },
    incluiCategorias: async (req, res) => {
        try {
            const { descricaoCategoria } = req.query
            if ( !descricaoCategoria ) {
                return res.status(400).json({ message: "Você enviou um valor valor vazio confirme e tente novamente" });
            }
            
            const resultado = await categoriasModel.insert(descricaoCategoria);
            if (resultado.insertId === 0) {
                throw new Error('Ocorreu um erro ao incluir categoria');
            }

            res.status(201).json({ message: 'Registro incluido com sucesso', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurreu um erro no servidor', errorMessage: error.message });
        }
    },
    alterarCategoria: async (req, res) => {
        try {
            const {idCategoria, descricaoCategoria} = req.query;
            
            if (isNaN(parseInt(idCategoria)) || !idCategoria) {
                return res.status(400).json({ message: "Forneça valor númerico válido para IdCategoria" });

            }

            const categoriaAtual = await categoriasModel.selectCategoria(idCategoria);
            if (categoriaAtual.length === 0) {
                return res.status(200).json({ message: 'Categoria não localizado' });
            }     

            const novaDescricao = descricaoCategoria ?? categoriaAtual[0].descricaoCategoria;


            const resultUpdate = await categoriasModel.update(idCategoria,novaDescricao)
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
    deletarCategoria: async (req, res) => {
        try {
            const { idCategoria } = req.query;
            const resultado = await categoriasModel.delete(idCategoria);


            if (resultado.affectedRows === 0) {
                return res.status(200).json({ message: "Ocorreu um erro ao excluir o produto" });
            }
            res.status(200).json({ message: "Produto excluído com sucesso!" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurreu um erro no servidor', errorMessage: error.message });
        }

    }
}

export default categoriasController;
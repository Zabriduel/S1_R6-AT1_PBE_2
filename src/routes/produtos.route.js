import { Router } from "express";
import uploadImage from "../middlewares/uploadImage.middleware.js";
import produtosController from "../controllers/produtos.controller.js";

const produtosRoutes = Router();

produtosRoutes.get('/produtos', produtosController.selectTodos);
produtosRoutes.get('/produtos/produto',produtosController.selectByID);
produtosRoutes.post('/produtos',uploadImage,produtosController.incluiProdutos);
produtosRoutes.put('/produtos/', uploadImage,produtosController.alterarProduto);
produtosRoutes.delete('/produtos',produtosController.deletarProduto);

export default produtosRoutes;


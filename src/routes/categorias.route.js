import { Router } from "express";
import categoriasController from "../controllers/categorias.controller.js";

const categoriasRoutes = Router();

categoriasRoutes.get('/categorias', categoriasController.selectTodos);
categoriasRoutes.get('/categorias/categoria',categoriasController.selectById);
categoriasRoutes.post('/categorias',categoriasController.incluiCategorias);
categoriasRoutes.put('/categorias',categoriasController.alterarCategoria);
categoriasRoutes.delete('/categorias',categoriasController.deletarCategoria);

export default categoriasRoutes;


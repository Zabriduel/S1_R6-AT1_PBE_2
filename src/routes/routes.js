import express from 'express';
const router = express.Router();
import categoriasRoutes from "./categorias.route.js";
import produtosRoutes from './produtos.route.js';

router.use('/', categoriasRoutes);
router.use('/', produtosRoutes);

export default router;
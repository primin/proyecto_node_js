import { Router } from 'express';
import { getCategoriasCreadas, getProductosCreados } from '../controllers/creados.controller.js';

const router = Router();

// Routes
router.get('/categorias/:id', getCategoriasCreadas);
router.get('/productos/:id', getProductosCreados);

export default router;
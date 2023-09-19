import { Router } from 'express';
import { 
    getUsuarios,
    createUsuario,
    getUsuario,
    usuarioLogin,
    updateUsuario,
    deleteUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

// Routes
router.get('/', getUsuarios);
router.post('/', createUsuario);
router.get('/:id', getUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.post('/login',usuarioLogin);


export default router;
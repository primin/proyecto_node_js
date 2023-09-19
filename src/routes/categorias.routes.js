import { Router } from 'express';
import { 
    getCategorias,
    createCategoria,
    getCategoria,
    updateCategoria,
    deleteCategoria 
} from '../controllers/categorias.controller.js';
import jwt from 'jsonwebtoken';

const router = Router();

// Routes
router.get('/', getCategorias);
router.post('/', verifyToken, createCategoria);
router.get('/:id', getCategoria);
router.put('/:id', verifyToken, updateCategoria);
router.delete('/:id', verifyToken, deleteCategoria);

export default router;

function verifyToken(req, res, next){ // Se coloca en las rutas que querramos
    const bearerHeader = req.headers['authorization'];
    console.log('bearerHeader', bearerHeader);

    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        console.log('token', token);
        jwt.verify(token, 'secretkey', (error, usuario) => {
            if (error){
                return res.json({
                    "message": "No se encuentra autorizado para realizar este proceso"
                });
            }
            else {
                req.usuario = usuario;
                next();
            }
        });
    }
    else {
        return res.json({
            "message": "No se encuentra autorizado para realizar este proceso"
        });
    };
 }
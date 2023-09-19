import { Router } from 'express';
import { 
    getProductos,
    createProducto,
    getProducto,
    updateProducto,
    deleteProducto 
} from '../controllers/productos.controller.js';
import jwt from 'jsonwebtoken';

const router = Router();

// Routes
router.get('/', getProductos);
router.post('/', verifyToken, createProducto);
router.get('/:id', getProducto);
router.put('/:id', verifyToken, updateProducto);
router.delete('/:id', verifyToken, deleteProducto);

export default router;

function verifyToken(req, res, next){ // Se coloca en las rutas que querramos
    const bearerHeader = req.headers['authorization'];
    console.log('bearerHeader', bearerHeader);

    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        console.log('token', token);
        jwt.verify(token, 'secretkey', (error, usuario) => {
            if (error) res.sendStatus(403);
            else {
                req.usuario = usuario;
                next();
            }
        });
    }
    else res.sendStatus(403);
 }
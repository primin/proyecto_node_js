import { Usuarios } from '../models/Usuarios.js';
import { Categorias } from '../models/Categorias.js';
import { Productos } from '../models/Productos.js';

// Muestra todas las categorias creadas:
export async function getCategoriasCreadas(req, res){
    const { id } = req.params;

    try {
        const cantCategorias = await Categorias.findAndCountAll({
            where: { usuario_id: id },
        });

        if(cantCategorias['count']>0){
            const categorias = await Categorias.findAll({
                attributes: ['nombre'],
                include: [
                    {
                        model: Usuarios,
                        attributes: ["nombre","correo"]
                    }
                ],
                where: { usuario_id: id }
            });
            res.json(categorias);
        }else{
            res.json({
                message: 'El usuario no ha registrado categorias'
            });
        }        
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

// Muestra todos los productos creados:
export async function getProductosCreados(req, res){
    const { id } = req.params;

    try {
        const cantProductos = await Productos.findAndCountAll({
            where: { usuario_id: id },
        });

        if(cantProductos['count']>0){
            const productos = await Productos.findAll({
                attributes: ['nombre','precio_unitario','estado'],
                include: [
                    {
                        model: Categorias,
                        attributes: ["nombre"]
                    },
                    {
                        model: Usuarios,
                        attributes: ["nombre","correo"]
                    },
                ],
                where: { usuario_id: id }
            });
            res.json(productos);
        }else{
            res.json({
                message: 'El usuario no ha registrado productos'
            });
        }        
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}
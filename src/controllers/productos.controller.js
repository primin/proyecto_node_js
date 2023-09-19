import { Categorias } from '../models/Categorias.js';
import { Usuarios } from '../models/Usuarios.js';
import { Productos } from '../models/Productos.js';

// Listar todos los productos registrados (Método GET):
export async function getProductos(req, res){
    try {
        const cantProductos = await Productos.findAndCountAll();

        if(cantProductos['count']>0){
            const productos = await Productos.findAll({
                attributes: ['id','nombre','precio_unitario','estado','categoria_id','usuario_id'],
                include: [
                    {
                        model: Usuarios,
                        attributes: ["nombre","correo"]
                    },
                    {
                        model: Categorias,
                        attributes: ["nombre","usuario_id"]
                    }
                ]
            });

            res.json(productos);
        }else{
            res.json({
                message: 'No existen productos registrados'
            });
        }        
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

// Para crear un nuevo producto:
export async function createProducto(req, res){
    const { nombre, precio_unitario, estado, categoria_id, usuario_id } = req.body;

    try {
        const cantUsuarios = await Usuarios.findAndCountAll({
            where: { id: usuario_id },
        });

        if(cantUsuarios['count']==0){
            return res.json({
                "message": "El usuario no se encuentra registrado en la Base de Datos, por favor verifique"
            });
        }

        const cantCategoria = await Categorias.findAndCountAll({
            where: { id: categoria_id}
        });

        if(cantCategoria['count']==0){
            return res.json({
                "message": "La categoria no se encuentra registrado en la Base de Datos, por favor verifique"
            });
        }

        const newProducto = await Productos.create(
            {
                nombre,
                precio_unitario,
                estado,
                categoria_id,
                usuario_id
            }
        );
        return res.json(newProducto);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para listar un producto de acuerdo a un determinado parámetro:
export async function getProducto(req, res){
    try {
        const { id } = req.params;
        const producto = await Productos.findOne({
            where: { id },
        });        
        return res.json(producto);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para actualizar un producto:
export async function updateProducto (req, res){
    const { id } = req.params;
    const { nombre, precio_unitario, estado, categoria_id, usuario_id } = req.body;

    try {
        const producto = await Productos.findByPk(id);
        producto.nombre = nombre;
        producto.precio_unitario = precio_unitario;
        producto.estado = estado;
        producto.categoria_id = categoria_id;
        producto.usuario_id = usuario_id;

        await producto.save();

        return res.json(producto);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para eliminar un producto:
export async function deleteProducto (req, res){
    const { id } = req.params;

    try {
        await Productos.destroy({
            where: { id },
        });

        return res.json({
            "message": "El producto a sido eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
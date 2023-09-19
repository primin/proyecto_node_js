import { Categorias } from '../models/Categorias.js';
import { Usuarios } from '../models/Usuarios.js';

// Listar todos los categorias registradas (Método GET):
export async function getCategorias(req, res){
    try {
        const cantCategorias = await Categorias.findAndCountAll();

        if(cantCategorias['count']>0){
            const categorias = await Categorias.findAll({
                include: {
                    model: Usuarios
                }
            });

            res.json(categorias);
        }else{
            res.json({
                message: 'No existen categorias registradas'
            });
        }        
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

// Para crear una nueva categoria:
export async function createCategoria(req, res){
    const { id, nombre, usuario_id } = req.body;

    try {
        const cantUsuarios = await Usuarios.findAndCountAll({
            where: { id: usuario_id },
        });

        if(cantUsuarios['count']==0){
            return res.json({
                "message": "El usuario no se encuentra registrado en la Base de Datos, por favor verifique"
            });
        }

        const newCategoria = await Categorias.create(
            {
                nombre,
                usuario_id
            }
        );
        return res.json(newCategoria);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para listar una categoria de acuerdo a un determinado parámetro:
export async function getCategoria(req, res){
    try {
        const { id } = req.params;
        const categoria = await Categorias.findOne({
            where: { id },
        });        
        return res.json(categoria);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para actualizar una categoria:
export async function updateCategoria (req, res){
    const { id } = req.params;
    const { nombre, usuario_id } = req.body;

    try {
        const categoria = await Categorias.findByPk(id);
        categoria.nombre = nombre;
        categoria.usuario_id = usuario_id;

        await categoria.save();

        return res.json(categoria);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para eliminar categorias:
export async function deleteCategoria (req, res){
    const { id } = req.params;

    try {
        await Categorias.destroy({
            where: { id },
        });

        return res.json({
            "message": "La categoria a sido eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
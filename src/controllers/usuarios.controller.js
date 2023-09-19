import { Usuarios } from '../models/Usuarios.js';
import { Categorias } from '../models/Categorias.js';
import { Productos } from '../models/Productos.js';
import jwt from 'jsonwebtoken';

// Listar todos los usuarios registrados (Método GET):
export async function getUsuarios(req, res){
    try {
        const cantUsuarios = await Usuarios.findAndCountAll({

        });

        if(cantUsuarios['count']>0){
            const usuarios = await Usuarios.findAll({
                attributes: ['id','nombre','correo','contrasena','estado'],
            });
            res.json(usuarios);
        }else{
            res.json({
                message: 'No existen usuarios registrados'
            });
        }        
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

// Para crear un nuevo usuario:
export async function createUsuario(req, res){
    const { nombre, correo, contrasena, estado } = req.body;

    try {
        const newUsuario = await Usuarios.create(
            {
                nombre,
                correo,
                contrasena,
                estado
            },
            {
                fields: ['nombre','correo','contrasena','estado'],
            }
        );
        return res.json(newUsuario);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para listar un usuario de acuerdo a un determinado parámetro:
export async function getUsuario(req, res){
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findOne({
            where: { id },
        });        
        return res.json(usuario);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para actualizar un usuario:
export async function updateUsuario (req, res){
    const { id } = req.params;
    const { nombre, correo, contrasena, estado } = req.body;

    try {
        const usuario = await Usuarios.findByPk(id);
        usuario.nombre = nombre;
        usuario.correo = correo;
        usuario.contrasena = contrasena;
        usuario.estado = estado;
        
        await usuario.save();

        return res.json(usuario);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Para eliminar usuarios:
export async function deleteUsuario (req, res){
    const { id } = req.params;

    try {
        await Usuarios.destroy({
            where: { id },
        });

        return res.json({
            "message": "El usuario a sido eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Devuelve un token:
export async function usuarioLogin(req, res){
    try {
        const { correo, contrasena } = req.body;

        const cantLogin = await Usuarios.findAndCountAll({
            where: {
                correo,
                contrasena
            }
        });

        if(cantLogin['count']>0){

            const datosUsuario = await Usuarios.findOne({
                attributes: ['id','correo','contrasena'],
                where: {
                    correo,
                    contrasena
                }
            });


            const usuario = datosUsuario['dataValues'];

            jwt.sign({usuario}, 'secretkey', {expiresIn: '60s'}, (err, token) =>{
                res.json({token});
            });
        }
        else {
            res.json({
                message: 'No existen usuarios registrados'
            });
        }

       // return res.json(login);
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
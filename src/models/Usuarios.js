import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Categorias } from './Categorias.js';
import { Productos } from './Productos.js';

export const Usuarios = sequelize.define(
    'usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        timestamps: false,
    }
    );

    // Relación con la tabla categorias:
    Usuarios.hasMany(Categorias, {
        foreignKey: 'usuario_id',
        sourceKey: 'id',

    });

    Categorias.belongsTo(Usuarios,{
        foreignKey: 'usuario_id',
        targetKey: 'id',
    });

    // Relación con la tabla productos:
    Usuarios.hasMany(Productos, {
        foreignKey: 'usuario_id',
        sourceKey: 'id',

    });

    Productos.belongsTo(Usuarios,{
        foreignKey: 'usuario_id',
        targetKey: 'id',
    });
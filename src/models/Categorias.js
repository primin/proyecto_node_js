import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Productos } from './Productos.js';

export const Categorias = sequelize.define(
    'categorias',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
    );

    // Relación con la tabla Productos:
    Categorias.hasMany(Productos, {
        foreignKey: 'categoria_id',
        sourceKey: 'id',

    });

    Productos.belongsTo(Categorias,{
        foreignKey: 'categoria_id',
        targetKey: 'id',
    });
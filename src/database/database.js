import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
    process.env.DB_NAME, // db Name
    process.env.USER_NAME, // username
    process.env.PASSWORD, // password
    {
        host: process.env.HOST,
        dialect: 'postgres',
    }
);
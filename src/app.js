import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

const app = express();

// Import routes
//import projectRoutes from './routes/projects.routes.js';
//import taskRoutes from './routes/task.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import productosRoutes from './routes/productos.routes.js';
import creadosRoutes from './routes/creados.routes.js';

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// Routes
//app.use('/api/projects',projectRoutes);
//app.use('/api/tasks', taskRoutes);

app.use('/api/usuarios',usuariosRoutes); // Para api usuarios
app.use('/api/categorias',categoriasRoutes); // Para api categorias
app.use('/api/productos',productosRoutes); // Para api productos
app.use('/api/creadosusuarios', creadosRoutes); // Para mostrar los que han sido creados

export default app;
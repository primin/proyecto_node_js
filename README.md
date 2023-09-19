# proyecto_node_js
Proyecto desarrollado en Node js para módulo 4 diplomado Full-Stack

1.- Crear la Base de datos para el proyecto:
CREATE DATABASE diplomado_node OWNER postgres;

2.- Instalar node
3.- Instalar nodemon, ejecutar la siguiente línea de comando: 
   npm install -g nodemon
4.- Crear la carpeta proyecto

5.- Abrir la consola e ir a la dirección de la carpeta proyecto y ejecutar el siguiente comando: 
    npm init o npm init -y

6.- Instalar express, dentro de la carpeta proyecto, para esto ejecutamos la siguiente línea de comando: 
    npm install express

7.- Instalar Morgan:
    npm i morgan

8.- Instalar jsonwebtoken:
npm i jsonwebtoken

9.- Instalar sequelize:
npm i sequelize
npm i pg-hstore
npm install pg
npm i sequelize-cli -D
npm i dotenv

10.- Crear el archivo .gitignore dentro de la carpeta proyecto y escribir dentro del archivo: 
    node_modules

11.- Abrir el archivo package.json y debajo de la línea "main":"index.js" agregar:
    "main":"index.js",
    "type":"module",

12.- links para las apis:

Para usuarios:
Método GET (Listar todos los usuarios):
localhost:3001/api/usuarios/
Método GET (Listar solo 1 usuario):
localhost:3001/api/usuarios/idusuario
Método POST (Crear usuario):
localhost:3001/api/usuarios/
Método PUT (Actualizar usuario):
localhost:3001/api/usuarios/idusuario
Método DELETE (Eliminar usuario):
localhost:3001/api/usuarios/idusuario
Para generar token:
Método POST:
localhost:3001/api/usuarios/login

Para categoria:
Para usuarios:
Método GET (Listar todas las categorias):
localhost:3001/api/categorias/
Método GET (Listar una sola categoria):
localhost:3001/api/categorias/idcategoria
Método POST (Crear categoria):
localhost:3001/api/categorias/
Método PUT (Actualizar categoria):
localhost:3001/api/categorias/idcategoria
Método DELETE (Eliminar categoria):
localhost:3001/api/categorias/idcategoria

Para producto:
Para usuarios:
Método GET (Listar todos los productos):
localhost:3001/api/productos/
Método GET (Listar 1 solo producto):
localhost:3001/api/productos/idproducto
Método POST (Crear nuevo producto):
localhost:3001/api/productos/
Método PUT (Actualizar producto):
localhost:3001/api/productos/idproducto
Método DELETE (Eliminar producto):
localhost:3001/api/productos/idproducto

Para listar todas las categorias que han sido registradas por un usuario:
localhost:3001/api/creadosusuarios/categorias/idusuario
Para listar todos los productos que han sido registradas por un usuario:
localhost:3001/api/creadosusuarios/productos/idusuario

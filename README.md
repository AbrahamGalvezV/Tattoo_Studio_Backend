# API REST para la gestión de un Tattoo Studio

## Objetivo 🎯

Proyecto del Bootcamp de Full Stack Developer de Geekshubs Academy. El objetivo es crear una API conectada a una base de datos que pueda llevar la gestión de cita de un estudio de tatuajes. La API debe permitir crear los roles de administrador, tatuador y cliente, cada uno de ellos podrá realizar unas funciones diferentes.

## Sobre el proyecto 📜

Proyecto realizado con el objetivo de poner a prueba con un proyecto real lo aprendido en clase. He procurado crear un código limpio y fácilmente entendible.

## Stack 🛠️

<div align="center">
<a href="https://www.mysql.com/">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>

<a href="https://typeorm.io/">
    <img src="https://img.shields.io/badge/TypeORM-E83524?style=for-the-badge&logo=typeorm&logoColor=white" />
</a>
<a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</a>
 </div>

## Diagrama BD 🏗️

!['imagen-db'](./sql_img.png)

## Características Principales ✅

● Registro de usuarios.

● Login de usuarios.

● Perfil de usuario.

● Modificación de datos del perfil.

● Creación de citas.

● Edición de citas.

● Eliminar citas.

● Ver todas las citas que tengo como cliente.

● Ver todas las citas existentes conmigo (role tatuador).

● Listar tatuadores.

● Ver todos los clientes registrados (admin).

● Creación de tatuadores (admin).

● Ver todos los clientes.

● Ver una cita en detalle.

● El admin puede modificar los roles de los usuarios del sistema.

● Validar la fecha de la cita.

● Añadir tipos de intervención (tattoo / piercing / eliminación de tattoo ) a las citas.

## Instrucciones de instalación en local 📥

1. Clonar el repositorio
 `git clone`https://github.com/AbrahamGalvezV/TATTOO_STUDIO

2. Inicializar el proyecto
`npm init -y`

3. Instalar los módulos necesarios
 `npm i express`
 `npm i -D typescript`

4. Instalar tipos de nodo y express
 `npm i -D @types/node`
 `npm i -D @types/express`

5. Install additional modules
 `npm i cors`
 `npm i -D @types/cors`
 `npm i -D nodemon`
 `npm i -D ts-node`
 `npm i bcrypt`
 `npm i -D @types/bcrypt`
 `npm i @faker-js/faker`
 `npm i jsonwebtoken`
 `npm i -D @types/jsonwebtoken`
 `npm i dotenv`
 `npm i typeorm reflect-metadata mysql2`
 
6. Conecte el proyecto con la Base de Datos en la carpeta raíz del proyecto, busque .env-example para generar un archivo .env para tener las variables principales
    ![image](./env-exaple.png)
    

7. Ejecutar las migraciones
    `npm run db:migrate`

8. Ejecutar las sembradoras
    `npm run db:seed` 

9. Ejecute el servidor
    `npm run dev`


## Endpoints principales 🧭

###Authentication 

    ##### REGISTER

        POST  ` /api/auth/register`

             JSON:
{
	"firstName": "Abraham",
	"lastName": "Gálvez",
	"email": "Abraham.Galvez.Vives@gmail.com",
	"password": "12345678",
	"isActive": true
}


    ##### LOGIN 

        POST  `/api/auth/login`

            JSON:

{
    "email": "Abraham.Galvez.Vives@gmail.com",
	"password": "12345678",
}

### USER

    ##### NUEVO USUARIO 

        POST  `/api/users`

             JSON:
{
	"firstName": "Abraham",
	"lastName": "Gálvez",
	"email": "Abraham.Galvez.Vives@gmail.com",
	"password": "12345678",
	"isActive": true
}

- Esta ruta puede ser usada por: admin.

+ Introducir token para la identificación.


    ##### LISTA DE USUARIOS

        GET  `/api/users?page=1&limit=200`

+ Introducir token para la identificación.

- Esta ruta puede ser usada por: admin y artist.


    ##### DETALLES DE USUARIO

        GET  `/api/users/{id:}`

            + Introducir token para la identificación.

- Esta ruta puede ser usada por: admin y artist.


    ##### MODIFICAR USUARIO (Se puede modificar cualquier parámetrodel usuario)

        PUT  `/api/users/{id:}`

             JSON:
{
	"email": "JuancohoChoas@gmail.com"
}

+ Introducir token para la identificación.

- Esta ruta puede ser usada por: admin.


    ##### ELIMINAR USUARIO 

        DELETE  `/api/users/{id:}`


- Esta ruta puede ser usada por: admin.

+ Introducir token para la identificación.


    ##### PERFIL DE USUARIO

        GET  `/api/users/7profile`


- Esta ruta puede ser usada por: admin,  artist y client.

+ Introducir token para la identificación.


    ##### ACTUALIZAR PERFIL

        PUT  `/api/users/profile/update`

            body: Se incluye el o los parámetros a modificar

- Esta ruta puede ser usada por: admin, artist y client.

+ Introducir token para la identificación.


    ##### EDITAR ROL

        PUT  `/api/users/edit/role/{id:}`

            JSON: 
            
{
	"roleId": 2
}

- Esta ruta puede ser usada por: admin.

+ Introducir token para la identificación.


### APPOINTMENT

    ##### VER TODAS LAS CITAS

        GET  `/api/appointments`

- Esta ruta puede ser usada por: admin.

+ Introducir token para la identificación.


    ##### OBTENER CITA BY ID

        GET  `/api/appointments/{id:}`

- Esta ruta puede ser usada por: admin, artist y client.

+ Introducir token para la identificación.


    ##### NUEVA CITA

        POST  `/api/appointments`

            JSON:
{
	"appointmentDate": "2024-03-29 18:00:00",
	"clientId": 22,
	"serviceId": 2,
	"artistId": 3
}

- Esta ruta puede ser usada por: admin.

+ Introducir token para la identificación.


    ##### ACTUALIZAR CITA

        PUT  `/api/appointments/{id:}`

            JSON:
{
	"appointmentDate": "2024-03-29 18:00:00",
	"clientId": 32,
	"serviceId": 2,
	"artistId": 3
}

- Esta ruta puede ser usada por: admin.

+ Introducir token para la identificación.


    ##### ELIMINAR CITA

        DELETE  `/api/appointments/{id:}`

- Esta ruta puede ser usada por: admin,  artist y client.

+ Introducir token para la identificación.


    ##### CITA BY CLIENT

        GET  `/api/appointments/client`

- Esta ruta puede ser usada por: client.

+ Introducir token para la identificación.


    ##### CITA BY ARTIST

        GET  `/api/appointments/artist`

- Esta ruta puede ser usada por: artist.

+ Introducir token para la identificación.


### SERVICIOS


    ##### LISTA DE SERVICIOS

        GET  `/api/services`

- Esta ruta puede ser usada por:admin, artist y user.


    ##### LISTA DE ARTISTAS

        GET  `/api/services/artists`

- Esta ruta puede ser usada por:admin, artist y user.


    ##### DETALLES SERVICIOS

        GET  `/api/services/{id:}`

- Esta ruta puede ser usada por:admin y artist.

+ Introducir token para la identificación.


    ##### NUEVO SERVICIO

        POST  `/api/services`

- Esta ruta puede ser usada por:admin.

+ Introducir token para la identificación.


    ##### MODIFICAR SERVICIO

        PUT  `/api/services/{id:}`

            JSON: 
{
	"serviceName": "Piercing",
	"description": "Face"
}

- Esta ruta puede ser usada por:admin.

+ Introducir token para la identificación.


    ##### ELIMINAR SERVICIO

        DELETE  `/api/services/{id:}`

- Esta ruta puede ser usada por:admin.

+ Introducir token para la identificación.


## Contacto

<a href="https://www.linkedin.com/in/abraham-galvez-vives/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>

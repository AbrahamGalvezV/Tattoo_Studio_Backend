import { Request, Response } from "express";
import { User } from "../models/User";
import { UserRoles } from "../constants/UserRoles";
import bcrypt from "bcrypt";

//----------------------------------------------------------------

export const userController = {


// Perfil de usuario registrado
   async getProfile(req:Request,res:Response): Promise<void>{
    try {
      const userId = Number(req.tokenData.userId);
      
      const user = await User.findOne({
        relations:{
          role:true
        },
        where:{
          id:userId
        }
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
      res.json(user).status(200);

    }catch(error){
      res.status(500).json({message:"Something went wrong"});
    }
  },
  
// Actualizar perfil de usuario
  async updateLogedUser(req:Request,res:Response){
    try {
        const userId = req.tokenData?.userId;
        const {firstName,lastName,email,isActive} = req.body;
        const user = await User.findOne({where:{id:userId}});

        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.isActive = isActive;

        await user.save();
        res.status(200).json({message:"User updated successfully"});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
},


// Editar rol 
async editUserRole(req:Request,res:Response){
  try{
                                                                              //take the user id from the request
      const userId = Number(req.params.id);

                                                                                //take the role id from the request
      const roleId = Number(req.body.roleId);
      
                                                                                //find the user by id
      const userToChange = await User.findOne(
          {   
              relations:{
                  role:true
              },
              select:{
                  id:true,
                  firstName:true,
                  role:{
                      id:true,
                  }
              },
              where:{
                  id:userId
              }
          })
                                                                                //if the user is not found, return a 404 status
      if(!userToChange){
          res.status(404).json({message:"User not found"});
          return;
      }

                                                                                //change the role of the user
      userToChange.role.id = roleId;

                                                                                //save the user in DB
      await User.save(userToChange);

                                                                                //return a 200 status
      res.status(200).json({message:"Role updated successfully"});

  }catch(error){
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
  }
},

// Lista de artistas
async getAllArtists(req: Request, res: Response): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;                                  // numero de pagina
    const limit = Number(req.query.limit) || 10;                               // limite de users

    const [users, totalUsers] = await User.findAndCount({
      select: {
                                                                                // selecciona la informacion de role que quieres mostrar
        role: {
          name: true,
        },
        id:true,
        firstName:true,
        lastName:true,
        email:true,
        roleId: true,

      },
      where:{roleId: 2},
      skip: (page - 1) * limit,                                                 // muestra los users de 10 en 10
      take: limit,
    });

    if (totalUsers === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const totalPages = Math.ceil(totalUsers / limit);                           // divide el total de usuarios por 10 para hallar el numero de paginas

    res.status(200).json({
      users: users,
      current_page: page,
      per_page: limit,
      total_pages: totalPages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users",
    });
  }
},

// Nuevo usuario
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password, isActive } = req.body;    // campos requeridos que deben tener un nuevo user

      if (!firstName ||!lastName || !email || !password || !isActive) {
        res.status(400).json({
          message: "All fields must be provided",
        }); 
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const userToCreate = User.create({
                                                                              // crea una instancia que no guarda en la base de datos
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        isActive: isActive,
        role: UserRoles.CLIENT,
      });

      await User.save(userToCreate);                                          // guarda userToCreate en la base de datos

      res.status(201).json({
        message: "User has been created",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create user",
        error: (error as any).message, 
      });
    }
  },

  // Lista de usuarios
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;                               // numero de pagina
      const limit = Number(req.query.limit) || 10;                            // limite de users

      const [users, totalUsers] = await User.findAndCount({
        relations: {
                                                                              // trae la información de role
          role: true,
        },
        select: {
                                                                              // selecciona la informacion de role que quieres mostrar
          role: {
            name: true,
          },
        },
        skip: (page - 1) * limit,                                             // muestra los users de 10 en 10
        take: limit,
      });

      if (totalUsers === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const totalPages = Math.ceil(totalUsers / limit);                       // divide el total de usuarios por 10 para hallar el numero de paginas

      res.status(200).json({
        users: users,
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve users",
      });
    }
  },

  // Detalles de usuarios
  async getById(req: Request, res: Response): Promise<void> {
    
    try {
      const userId = Number(req.params.id);                                   // extraer id user

      const user = await User.findOne({
                                                                              // comprobar si el usuario existe
        relations: {
          role: true,                                                         // ver rol 
        },
        where: { id: userId }, 
      });

      if (!user) {
        res.status(404).json({ massage: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        massage: "Failed to retrieve user",
      });
    }
  },

  // Modificar usuario
  async update(req:Request,res:Response) {
    try {
      const userId = Number(req.params.id);                                   // captura el id

      const { firstName,lastName,email,password,isActive} = req.body;         // separacion de pasword y rol

      const userToUpdate = await User.findOne({
                                                                              // encuentra el usuario ataves del id
        where: { id: userId },
      });

      if(!userToUpdate){
        res.status(404).json({message:"User not found"});
        return;
    }

      userToUpdate.firstName = firstName;
      userToUpdate.lastName = lastName;
      userToUpdate.email = email;
      userToUpdate.password = password;
      userToUpdate.isActive = isActive;
      await userToUpdate.save();                                              // guardar cambios

      res.status(202).json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Failed to update user",
      });
    }
  },

  // Eliminar usuario
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);                                      // captura el id del user

      const userToDelete = await User.delete(userId);                            // elimina el usuario

      if(!userId){
        res.status(404).json({message:"User not found"});
        return;
    }

      if (userToDelete.affected === 0) {
        res.status(404).json({ message: "User NOT Found" });                    // el usuario no existe
        return;
      }

      res.status(500).json({ message: "User deleted sucessfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete The user by id" });
    }
    
  },













}





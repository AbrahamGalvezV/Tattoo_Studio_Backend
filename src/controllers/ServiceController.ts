import { Request, Response } from "express";
import { User } from "../models/User";
import { Service } from "../models/Service";

//----------------------------------------------------------------

export const serviceController = {

// Lista de artistas
async getAllArtists(req: Request, res: Response): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;                     // numero de pagina
    const limit = Number(req.query.limit) || 10;                  // limite de users

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
      skip: (page - 1) * limit,                                     // muestra los users de 10 en 10
      take: limit,
    });

    if (totalUsers === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const totalPages = Math.ceil(totalUsers / limit);               // divide el total de usuarios por 10 para hallar el numero de paginas

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

// Lista de servicios
async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;                               // numero de pagina
      const limit = Number(req.query.limit) || 10;                            // limite de servicios

      const [services, totalServices] = await Service.findAndCount({
        select: {
          id:true,
          serviceName:true,
          description:true,
        },
        skip: (page - 1) * limit,                                             // muestra los users de 10 en 10
        take: limit,
      });

      if (totalServices === 0) {
        res.status(404).json({ message: "Service not found" });
        return;
      }

      const totalPages = Math.ceil(totalServices / limit);                    // divide el total de usuarios por 10 para hallar el numero de paginas

      res.status(200).json({
        services: services,
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve services",
      });
    }
},

// Detalles de servicio
async getById(req: Request, res: Response): Promise<void> {
    
    try {
      const serviceId = Number(req.params.id);                                // extraer id user

      const service = await Service.findOne({

        where: { id: serviceId }, 
      });

      if (!service) {
        res.status(404).json({ massage: "User not found" });
        return;
      }

      res.json(service);
    } catch (error) {
      res.status(500).json({
        massage: "Failed to retrieve user",
      });
    }
},

//TODO----------Protected------------

// Nuevo servicio
async create(req: Request, res: Response): Promise<void> {
    try {
      const { serviceName, description} = req.body;                           // campos requeridos que deben tener un nuevo user

      if (!serviceName ||!description) {
        res.status(400).json({
          message: "All fields must be provided",
        }); 
        return;
      }

      const servicioToCreate = Service.create({                               // crea una instancia que no guarda en la base de datos
        serviceName: serviceName,
        description: description,
      });

      await Service.save(servicioToCreate);                                   // guarda userToCreate en la base de datos

      res.status(201).json({
        message: "Service has been created",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create service",
        error: (error as any).message, 
      });
    }
},

// Modificar servicio
async update(req:Request,res:Response) {
    try {
      const serviceId = Number(req.params.id);                               // captura el id

      const { serviceName, description} = req.body;                          // separacion de pasword y rol

      const serviceToUpdate = await Service.findOne({                        // encuentra el usuario ataves del id
        where: { id: serviceId },
      });

      if(!serviceToUpdate){
        res.status(404).json({message:"Service not found"});
        return;
    }

      serviceToUpdate.serviceName = serviceName;
      serviceToUpdate.description = description;
      await serviceToUpdate.save();                                           // guardar cambios

      res.status(202).json({ message: "Service updated successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Failed to update service",
      });
    }
},

// Eliminar servicio
async delete(req: Request, res: Response): Promise<void> {
    try {
      const serviceId = Number(req.params.id);                                // captura el id del user

      const serviceToDelete = await Service.delete(serviceId);                // elimina el usuario

      if(!serviceId){
        res.status(404).json({message:"Service not found"});
        return;
    }

      if (serviceToDelete.affected === 0) {
        res.status(404).json({ message: "Service NOT Found" });               // el usuario no existe
        return;
      }

      res.status(500).json({ message: "Service deleted sucessfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete The Service by id" });
    }
},

}





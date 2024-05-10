import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

//---------------------------------------------------------------------------

export const appointmentController = {
  // Obtener todas las citas by Client
  async getByLogedClient(req: Request, res: Response) {
    try {
      const userId = Number(req.tokenData.userId);
      const page = Number(req.query.page) || 1; // numero de pagina
      const limit = Number(req.query.limit) || 10;

      const [appointmentsForShows, totalAppointmentsForShows] = await Appointment.findAndCount({
        relations: {
          client: true,
          artist: true,
          service: true,
        },
        select: {
          id: true,
          appointmentDate: true,
          client: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
          artist: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
          service: {
            id: true,
            serviceName: true,
            description: true,
          },
        },
        where: {
          clientId: userId,
        },
        skip: (page - 1) * limit, // muestra los users de 10 en 10
        take: limit,
      });

      if (totalAppointmentsForShows === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const totalPages = Math.ceil(totalAppointmentsForShows / limit);

      res.status(200).json({
        appointments__client: appointmentsForShows,
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Citas by artist
  async getByLogedArtists(req: Request, res: Response) {
    try {
      const userId = Number(req.tokenData.userId);
      const page = Number(req.query.page) || 1; // numero de pagina
      const limit = Number(req.query.limit) || 10;

      const [appointmentsForShows, totalAppointmentsForShows] =
        await Appointment.findAndCount({
          relations: {
            client: true,
            artist: true,
            service: true,
          },
          select: {
            id: true,
            appointmentDate: true,
            client: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
            artist: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
            service: {
              id: true,
              serviceName: true,
              description: true,
            },
          },
          where: {
            artistId: userId,
          },
          skip: (page - 1) * limit, // muestra los users de 10 en 10
          take: limit,
        });

      if (totalAppointmentsForShows === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const totalPages = Math.ceil(totalAppointmentsForShows / limit);

      res.status(200).json({
        appointments__artist: appointmentsForShows,
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Ver todas las citas
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 250;

      const [appointments, totalAppointments] = await Appointment.findAndCount({
        select: {
          id: true,
          appointmentDate: true,
          clientId: true,
          serviceId: true,
          artistId: true,
        },
        skip: (page - 1) * limit,                                             // muestra los users de 10 en 10
        take: limit,
      });

      if (totalAppointments === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const totalPages = Math.ceil(totalAppointments / limit);

      res.status(200).json({
        dates: appointments,
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  // Obtener cita by id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const dateId = Number(req.params.id);

      const appointment = await Appointment.findOne({
        relations: {
          client: true,
          artist: true,
          service: true,
        },
        select: {
          id: true,
          appointmentDate: true,
          client: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
          artist: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
          service: {
            id: true,
            serviceName: true,
            description: true,
          },
        },
        where: { id: dateId },
      });

      if (!appointment) {
        res.status(404).json({ message: "Date not found" });
        return;
      }

      res.json(appointment);
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve Date",
      });
    }
  },

  // Nueva cita
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { appointmentDate, clientId, serviceId, artistId } = req.body;

      if (!appointmentDate || !clientId || !serviceId || !artistId) {
        res.status(400).json({
          message: "All fields must be provided",
        });
        return;
      }

      const appointmentToCreate = Appointment.create({
        appointmentDate: appointmentDate,
        clientId: clientId,
        serviceId: serviceId,
        artistId: artistId,
      });

      await Appointment.save(appointmentToCreate);

      res.status(201).json({
        message: "appointment has been created",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create date",
      });
    }
  },

  // Actualizar cita
  async update(req: Request, res: Response): Promise<void> {
    try {
      const dateId = Number(req.params.id);
      const { appointmentDate, clientId, serviceId, artistId } = req.body;

      const appointmentToUpdate = await Appointment.findOne({
        where: { id: dateId },
      });

      if (!appointmentToUpdate) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      appointmentToUpdate.appointmentDate = appointmentDate;
      appointmentToUpdate.clientId = clientId;
      appointmentToUpdate.serviceId = serviceId;
      appointmentToUpdate.artistId = artistId;
      await Appointment.save(appointmentToUpdate);
      res.status(202).json({
        message: "Appointment has been updated",
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Eliminar cita
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const dateId = Number(req.params.id);

      const deleteResult = await Appointment.findOne({ where: { id: dateId } });

      if (!deleteResult) {
        res.status(404).json({ message: "Date not found" });
        return;
      }

      await deleteResult.remove();

      res.status(200).json({
        message: "Date deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete date",
      });
    }
  },
};

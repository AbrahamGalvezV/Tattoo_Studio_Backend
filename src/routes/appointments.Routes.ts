import express from 'express';
import { appointmentController } from '../controllers/AppointmentController';
import { auth } from '../middlewares/auth';
import { authorize } from '../middlewares/authorize';

//----------------------------------------------------------------

const router = express.Router();

// Citas by client
router.get('/client',auth,authorize(["client"]), appointmentController.getByLogedClient);

// Citas by artist
router.get('/artist',auth,authorize(["artist"]), appointmentController.getByLogedArtists);

// Ver todas las citas
router.get('/',auth,authorize(["admin"]), appointmentController.getAll);

// Obtener cita by id
router.get("/:id",auth,authorize(["artist", "admin", 'client']), appointmentController.getById);

// Nueva cita
router.post('/',auth, authorize(["admin", 'client']), appointmentController.create);

// Actualizar cita
router.put('/:id',auth,authorize(["artist", "admin"]), appointmentController.update);

// Eliminar cita
router.delete('/:id',auth,authorize(["artist", "admin", "client"]), appointmentController.delete);

export default router;
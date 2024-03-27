import express from "express";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { serviceController } from "../controllers/ServiceController";

//----------------------------------------------------------------

const router = express.Router();

// Lista de artistas
router.get("/artists", serviceController.getAllArtists);

/// Lista de servicios
router.get("/", serviceController.getAll);

//TODO------------ Private routes -------------

// Detalles de servicio by id
router.get("/:id",auth,authorize(["admin", 'artist']), serviceController.getById);

// Nuevo servicio
router.post("/",auth,authorize(["admin"]), serviceController.create);

// Modificar servicio
router.put("/:id",auth,authorize(["admin"]), serviceController.update);

// Eliminar servicio
router.delete("/:id",auth,authorize(["admin"]), serviceController.delete);


export default router;

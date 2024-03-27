import express from "express";
import { userController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

//----------------------------------------------------------------

const router = express.Router();

// Perfil de usuario registrado
router.get('/profile',auth,authorize(["admin", 'artist', 'client']), userController.getProfile);

// Actualizar perfil de usuario
router.put('/profile/update',auth,authorize(["admin", 'artist', 'client']), userController.updateLogedUser);

// Nuevo usuario
router.post("/",auth,authorize(["admin"]), userController.create);

// Lista de usuarios
router.get("/", auth,authorize(["admin", 'artist']), userController.getAll);

// Detalles de usuarios by id
router.get("/:id",auth,authorize(["admin", 'artist']), userController.getById);

// Modificar usuario
router.put("/:id",auth,authorize(["admin"]), userController.update);

// Eliminar usuario
router.delete("/:id",auth,authorize(["admin"]), userController.delete);

// Editar rol 
router.put('/edit/role/:id',auth,authorize(["admin"]), userController.editUserRole);

export default router;



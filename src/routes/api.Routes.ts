import express from "express";
import usersRoutes from "./users.Routes";
import baseRoutes from "./base.Routes";
import appointmentsRoutes from "./appointments.Routes";
import servicesRoutes from "./services.Routes"
import authRoutes from "./auth.routes"

//----------------------------------------------------------------

const router = express.Router();

// API routes
router.use('/', baseRoutes);
router.use("/auth", authRoutes);
router.use('/users', usersRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/services", servicesRoutes);

export default router;


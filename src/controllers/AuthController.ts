import { Request, Response } from "express";
import { UserRoles } from "../constants/UserRoles";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {TokenData} from '../types/types';

//----------------------------------------------------------------

export const authController = {

// Register
  async register(req: Request, res: Response): Promise<void> {    // campos requeridos que deben tener un nuevo user
    try {
      const { firstName, email, password } = req.body;

      if (!firstName || !email || !password) {
        res.status(400).json({
          message: "All fields must be provided",
        });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password,10);

      const userToCreate = User.create({                           // crea una instancia que no guarda en la base de datos
        firstName: firstName,
        email: email,
        password: hashedPassword,
        role: UserRoles.CLIENT,
      });

      await User.save(userToCreate);                                // guardar en la base de datos

      res.status(201).json({
        message: "User has been registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create user",
      });
    }
  },


// Login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          message: "All fields must be provided",
        });
        return;
      }

      const user = await User.findOne({
        relations: { role: true },
        select: { id: true, email: true, password: true },
        where: { email: email }
      });

      if (!user) {
        res.status(400).json({ message: "Bad credentials" });
        return;
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      
      if (!validPassword) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const tokenPayload: TokenData = {
        userId: user.id,
        userRole: user.role.name,
      };
      
// Generar token
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
        expiresIn: "3h",
      });

      res.status(200).json({
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to login user",           //TODO :remove on protection
      });
    }
  },
};

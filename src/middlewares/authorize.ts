import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../constants/UserRoles";

//----------------------------------------------------------------

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.tokenData.userRole;

    // Default access as admin
    if (userRole === UserRoles.ADMIN.name) {
      return next();
    }

    // Access if -the user role is in allowed roles
    if (allowedRoles.includes(userRole)) {
       next();
    }else {
       res.status(403).json({
        message: "Unauthorized access",
      });
    }
    
  };
};
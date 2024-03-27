import express, { Request, Response } from "express";

//----------------------------------------------------------------

const router = express.Router();

// Base routes 

router.get("/", (req: Request, res: Response) => {
    res.send("Welcome Tattoo Studio")

});

export default router;
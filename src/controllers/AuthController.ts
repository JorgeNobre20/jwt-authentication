import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import db from "../database/config/connection";
import IUser from "../interfaces/IUser";


class AuthController{

    async login(req: Request, res: Response){
        
        const email = req.body.username as string;
        const password = req.body.password as string;

        if(!email && !password){
            return res.status(404).json({ "message": "Todos os campos são obrigatórios" });
        }

        const user = await db("users").select<IUser>("*").where({ email: email });

        if(!user){
            return res.status(400).json({ "message": "Usuário não registrado" });
        }

        if(user.password !== password){
            return res.status(400).json({ "message": "E-mail ou senha incorretos" });
        }

        const token = jwt.sign({ userId: user.id }, "a8ds7df7e7ad98asd5dsa87as53434jk3v4c432432k43j2432h432v4jv23v45kj3v5345524kabdsf", { expiresIn: "1d" });

        return res.json(200).json({ user, token });

    }
}

export default new AuthController();
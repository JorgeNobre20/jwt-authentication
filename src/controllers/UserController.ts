import { Request, Response } from "express";
import db from "../database/config/connection";
import IUser from "../interfaces/IUser";

class UserController{

    async store(req: Request, res: Response){

        const username = req.body.username as string;
        const email = req.body.username as string;
        const password = req.body.password as string;

        if(!username && !email && !password){
            return res.status(404).json({ "message": "Informações inválidas" });
        }

        const userExists = await db("users").select<IUser>("*").where({ email: email });

        if(userExists){
            return res.status(400).json({ "message": "Este e-mail já está cadastrado" });
        }

        try{
            await db("users").insert({ username, email, password });
            return res.status(201).json({});
        }catch{
            return res.status(500).json({ "message": "Erro ao criar usuário,tente novamente mais tarde" })
        }

    }

    async index(req: Request, res: Response){

        const users = await db("users").select<IUser[]>("*");
        return res.json(200).json(users)

    }


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

        return res.json(200).json(user)

    }
}

export default new UserController();
import { Request, Response } from "express";
import db from "../database/config/connection";
import IUser from "../interfaces/IUser";

class UserController{

    async store(req: Request, res: Response){

        const username = req.body.username as string;
        const email = req.body.username as string;
        const password = req.body.password as string;

        if(!username && !email && !password){
            return res.status(404).send({ "message": "Informações inválidas" });
        }

        const userExists = await db("users").select<IUser>("*").where({ email: email });

        if(userExists){
            return res.status(400).send({ "message": "Este e-mail já está cadastrado" });
        }

        try{
            await db("users").insert({ username, email, password });
            return res.status(201).send({});
        }catch{
            return res.status(500).send({ "message": "Erro ao criar usuário,tente novamente mais tarde" })
        }

    }

    async index(req: Request, res: Response){
        return res.json({ "message": "listing" });
    }
}

export default new UserController();
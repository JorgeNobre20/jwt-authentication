import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import ITokenPayload from "../interfaces/ITokenPayload";

export default function authMiddleware(req: Request, res: Response, next: NextFunction){

    const { authorization } = req.headers;
    
    if(!authorization){
        return res.sendStatus(401);
    }

    const token = authorization.replace("Bearer","").trim();

    try{
        
        const data = jwt.verify(token, "a8ds7df7e7ad98asd5dsa87as53434jk3v4c432432k43j2432h432v4jv23v45kj3v5345524kabdsf");
        const { id } = data as ITokenPayload;

        req.userId = id;

        return next();

    }catch{

        return res.sendStatus(401);

    }

}
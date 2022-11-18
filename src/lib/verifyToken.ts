import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
interface IPayload{
    _id:string;
    iat:number;
    exp:number;
}

export const validarToken =  (req:Request, res:Response, next:NextFunction)  =>{

    const Token =  req.header('token'); 

    if(!Token) return res.status(401).json({"titulo":"Error","respuesta":`Falta Token`, "type":"error"});

    const payload   =   jwt.verify(Token, process.env.TOKKEN_SCRET||'tokendidactico')as IPayload;
    
  req.personaId   =   payload._id;
    
            next();
            


}

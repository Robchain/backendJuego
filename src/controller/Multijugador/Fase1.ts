import { Request, Response } from 'express';


export const MostrandoGruposConUsuario =(req:Request, res:Response)=>{
    try {
        res.json("mostrar");
    } catch (error) {
        res.json(error);
    }
    
}


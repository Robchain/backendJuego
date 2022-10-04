import Vocabulario,{IRecursosVocabulario} from "../../models/Administrador/RecursosVocabulario";
import { Request, Response } from "express";

export const   ArmandoPartida   = async (req:Request, res:Response)   =>{
    try {
        const data = await Vocabulario.find({$expr:{$eq:["$Categoria", req.body.Categoria]}});
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}
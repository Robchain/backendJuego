import Vocabulario,{IRecursosVocabulario} from "../../models/Administrador/RecursosVocabulario";
import { Request, Response } from "express";

export const   ArmandoPartida   = async (req:Request, res:Response)   =>{
    try {
        //const data = await Vocabulario.find({$expr:{$eq:["$Categoria", req.body.Categoria]}});
            const data = await Vocabulario.aggregate([
                {
                  '$match': {
                    'Categoria': 'COLOR'
                  }
                }, {
                  '$group': {
                    '_id': '$Palabra'
                  }
                }
              ])
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}
import Rompecabeza,{IRompecabeza} from "../models/RecursosRompecabeza";
import Vocabulario,{IRecursosVocabulario} from "../models/RecursosVocabulario";
import EstudianteRompecabeza, {IEstudianteRompecabeza} from "../models/EstudianteRompecabeza";
import { Request, Response } from "express";

export const example = async (req:Request, res:Response) => {
    try {
        const data = await Rompecabeza.aggregate([
            {
                $lookup:{
                    from:"categorias", //coleccion a llamar
                    localField:"Categoria", // campo donde esta la la Object id
                    foreignField:"NombreCategoria", // campo donde esta el object id inicial a llamar
                    as:"Data"   // el nombre del nuevo campo
                }
            }
        ])
        res.json(data);
        console.log(data);
    } catch (error) {
        res.json(error);
    }
}

//volver a revisar la logica
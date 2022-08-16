import Rompecabeza,{IRompecabeza} from "../models/Rompecabeza";
import { Request, Response } from "express";

export const subir = async (req:Request, res:Response) =>{
        const rompecabeza:IRompecabeza =    new Rompecabeza ({
            Nombre:req.body.Nombre,
            FileBlanco:req.body.FileBlanco,
            FileColor:req.body.FileColor,
            Estado:req.body.Estado
        }) 
        const rompecabezaGuardar = await rompecabeza.save();
        res.json(rompecabezaGuardar);
}
export const borrar =async (req:Request,res:Response)=>{
    const imagen = await Rompecabeza.findOneAndDelete(req.body.Nombre);
    
}
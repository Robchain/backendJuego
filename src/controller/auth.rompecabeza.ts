import Rompecabeza,{IRompecabeza} from "../models/RecursosRompecabeza";
import { Request, Response } from "express";

export const subirRom= async (req:Request, res:Response) =>{
    try {
        const rompecabeza:IRompecabeza =    new Rompecabeza ({
            Nombre:req.body.Nombre,
            FileBlanco:req.body.FileBlanco,
            FileColor:req.body.FileColor,
            Estado:req.body.Estado
        }) 
        const rompecabezaGuardar = await rompecabeza.save();
        res.json(rompecabezaGuardar);
    } catch (error) {
        res.json('e')
    }
       
}
export const borrarRom =async (req:Request,res:Response)=>{
    try {
        const imagen = await Rompecabeza.findOneAndDelete(req.body.Nombre);
        res.json(imagen);
    } catch (error) {
        res.json(error);
    }
}


//revisar el find

export const mostrarRom    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find(req.body.Nombre);
        res.json(imagenM);
    } catch (error) {
        res.json(error)
    }
}
/*
export const actualizar=async (req:Request,res:Response) => {
           try {
                const imagen    = await Rompecabeza.findOneAndUpdate(req.body.Nombre,)
           } catch (error) {
            res.json(error);
           }
}



*/
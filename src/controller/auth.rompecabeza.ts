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
//borra todas las coincidencia
export const borrarRom =async (req:Request,res:Response)=>{
    try {
        const imagen = await Rompecabeza.deleteMany({Nombre:req.body.Nombre});
        res.json(imagen);
    } catch (error) {
        res.json(error);
    }
}
//muestra las coincidencia
export const mostrarRom    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({Nombre:req.body.Nombre});
        res.json(imagenM);
    } catch (error) {
        res.json(error)
    }
}
//muestra todos
export const mostrarRomTodos    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({},{"createdAt":0,"updatedAt":0});
        res.json(imagenM);
    } catch (error) {
        res.json(error)
    }
}
//revisar el update tanto si es un archivo como para los que no son archivos
/*
export const actualizarRompecabeza=async (req:Request,res:Response) => {
           try {
                const imagen    = await Rompecabeza.updateMany(req.body.Nombre);
           } catch (error) {
            res.json(error);
           }
}

*/


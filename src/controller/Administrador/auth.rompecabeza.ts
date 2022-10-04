import Rompecabeza,{IRompecabeza} from "../../models/Administrador/RecursosRompecabeza";
import { Request, Response } from "express";
export const subirRom= async (req:Request, res:Response) =>{
    try {
        const rompecabeza:IRompecabeza =    new Rompecabeza ({
            Nombre:req.body.Nombre,
            Pieza:req.body.Pieza,
            FileBlanco:req.body.FileBlanco,
            FileColor:req.body.FileColor,
            Estado:req.body.Estado
        }) 
        const rompecabezaGuardar = await rompecabeza.save();
        res.json({"titulo":"Excelente","respuesta":'Rompecabeza Creada con exito',"type":"success"})
    } catch (e:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(e.keyPattern)} ya existe`, "type":"error"})
    }
}
//borra todas las coincidencia
export const borrarRom =async (req:Request,res:Response)=>{
    try {
        const imagen = await Rompecabeza.deleteMany({Nombre:req.body.Nombre});
        res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
//muestra las coincidencia
export const mostrarRom    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({Nombre:req.body.Nombre});
        res.json(imagenM);
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`Algo salio mal`, "type":"error"});
    }
}
//muestra todos
export const mostrarRomTodos    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({},{"createdAt":0,"updatedAt":0});
        res.json(imagenM);
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`Algo salio mal`, "type":"error"});
    }
}

export const EditarRompecabeza =async (req:Request, res:Response) => {
        try {
            const data = await Rompecabeza.findByIdAndUpdate({
                _id:req.body._id
            },{ 
            $set:{
                Nombre:req.body.Nombre,
                Pieza:req.body.Pieza,
                FileBlanco:req.body.FileBlanco,
                FileColor:req.body.FileColor,
                Estado:req.body.Estado
            }
        })
        res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
        } catch (error) {
            res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
        }
}


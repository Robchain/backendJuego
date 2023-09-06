import Rompecabeza,{IRompecabeza} from "../../models/Administrador/RecursosRompecabeza";
import { Request, Response } from "express";
export const subirRom= async (req:Request, res:Response) =>{
    try {
        const rompecabeza:IRompecabeza =    new Rompecabeza ({
            Nombre:req.body.Nombre,
            Pieza:req.body.Pieza,
            FileBlanco:req.body.FileBlanco,
            FileColor:req.body.FileColor,
            Estado:"ACTIVO"
        }) 
        const rompecabezaGuardar = await rompecabeza.save();
        res.json({"titulo":"Excelente","respuesta":'Rompecabeza creado con éxito',"type":"success"})
    } catch (e:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(e.keyPattern)} ya existe`, "type":"error"})
    }
}
//borra todas las coincidencia
export const borrarRom =async (req:Request,res:Response)=>{
    try {
        const data = await Rompecabeza.deleteOne({_id:req.body._id});
        res.json({"titulo":"Excelente","respuesta":'Ítem Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
    }
}
//muestra las coincidencia
export const mostrarRom    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({Nombre:req.body.Nombre});
        res.json(imagenM);
    } catch (error) {
        res.json([]);
    }
}
//muestra todos
export const mostrarRomTodos    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({},{"createdAt":0,"updatedAt":0});
        res.json(imagenM);
    } catch (error) {
        res.json([]);
    }
}
export const DesibilitarRompecabeza =async (req:Request, res:Response) => {
    try {
        const data = await Rompecabeza.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":'Ítem borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
    }
}
export const HabilitarRompecabeza =async (req:Request, res:Response) => {
    try {
        const data = await Rompecabeza.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":'Ítem restaurado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
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
            }
        })
        res.json({"titulo":"Excelente","respuesta":'Ítem editado con éxito',"type":"success"})
        } catch (error) {
            res.json({"titulo":"Error","respuesta":`No se pudo editar el ítem`, "type":"error"});
        }
}
export const EditarRompecabezaSinArchivo =async (req:Request, res:Response) => {
    try {
        const data = await Rompecabeza.findByIdAndUpdate({
            _id:req.body._id
        },{ 
        $set:{
            Nombre:req.body.Nombre,
            Pieza:req.body.Pieza,
        }
    })
    res.json({"titulo":"Excelente","respuesta":'Ítem editado con éxito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo editar el ítemr`, "type":"error"});
    }
}


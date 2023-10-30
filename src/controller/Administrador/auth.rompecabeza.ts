import { responseformualrio } from "../../lib";
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
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Creado.Creado,"type":"success"})
    } catch (e:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(e.keyPattern)} ya existe`, "type":"error"})
    }
}
//borra todas las coincidencia
export const borrarRom =async (req:Request,res:Response)=>{
    try {
        const data = await Rompecabeza.deleteOne({_id:req.body._id});
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Borrar.BorrarItem,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Borrar.NoBorrarItem, "type":"error"});
    }
}
//muestra las coincidencia
export const mostrarRom    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({Nombre:req.body.Nombre});
        res.json(imagenM);
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Mostrar.NoMostrar, "type":"error"});;
    }
}
//muestra todos
export const mostrarRomTodos    =   async (req:Request,res:Response)=>{
    try {
        const imagenM = await Rompecabeza.find({},{"createdAt":0,"updatedAt":0});
        res.json(imagenM);
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Mostrar.NoMostrar, "type":"error"});;
    }
}
export const DesibilitarRompecabeza =async (req:Request, res:Response) => {
    try {
        const data = await Rompecabeza.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Desactivar.Desactivar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Desactivar.NoDesactivar, "type":"error"});
    }
}
export const HabilitarRompecabeza =async (req:Request, res:Response) => {
    try {
        const data = await Rompecabeza.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Activar.NoActivar, "type":"error"});
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
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
        } catch (error) {
            res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
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
    res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
    }
}


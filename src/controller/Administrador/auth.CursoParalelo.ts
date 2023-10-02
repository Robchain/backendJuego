import { Request, Response } from 'express'
import Curso from '../../models/Administrador/Curso';
import Paralelo from '../../models/Administrador/Paralelo';
import { responseformualrio } from '../../lib';

///Curso
export const CrearCurso = async (req:Request, res:Response) => {
    try {
        const equipo    = new Curso({
            Nombre:req.body.Nombre,
            Estado:"ACTIVO",
        })
        const data = await equipo.save();
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Creado.Creado,"type":"success"})
    } catch (error:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})  
    }
}

export const MostrarCurso =async (req:Request, res:Response) => {
    try {
        const data = await Curso.find({},{"createdAt":0,"updatedAt":0})
        res.json(data)
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Mostrar.NoMostrar, "type":"error"});
    }
}

export const DesibilitarCurso =async (req:Request, res:Response) => {
    try {
        const data = await Curso.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Desactivar.Desactivar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Desactivar.NoDesactivar, "type":"error"});
    }
}
export const HabilitarCurso =async (req:Request, res:Response) => {
    try {
        const data = await Curso.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Activar.NoActivar, "type":"error"});
    }
}
export const EditarCurso = async (req:Request, res:Response) => {
    try {
        const data = await Curso.findByIdAndUpdate({_id:req.body._id},
        {$set:
        {   Nombre:req.body.Nombre,
        }})
            res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
    }
}

/// Paralelo
export const CrearParalelo = async (req:Request, res:Response) => {
    try {
        const equipo    = new Paralelo({
            Nombre:req.body.Nombre,
            Estado:"ACTIVO",
        })
        const data = await equipo.save();
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Creado.Creado,"type":"success"})
    } catch (error:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})  
    }
}


export const MostrarParalelo =async (req:Request, res:Response) => {
    try {
        const data = await Paralelo.find({},{"createdAt":0,"updatedAt":0})
        res.json(data)
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Mostrar.NoMostrar, "type":"error"});
    }
}

export const DesibilitarParalelo =async (req:Request, res:Response) => {
    try {
        const data = await Paralelo.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Desactivar.Desactivar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Desactivar.NoDesactivar, "type":"error"});
    }
}
export const HabilitarParalelo =async (req:Request, res:Response) => {
    try {
        const data = await Paralelo.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Activar.NoActivar, "type":"error"});
    }
}
export const EditarParalelo = async (req:Request, res:Response) => {
    try {
        const data = await Paralelo.findByIdAndUpdate({_id:req.body._id},
        {$set:
        {   Nombre:req.body.Nombre,
        }})
            res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
    }
}
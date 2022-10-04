import Equipo, {IEquipo} from '../../models/Administrador/Equipo'
import { Request, Response } from 'express'
import Persona from '../../models/Administrador/Persona'

export const CrearEquipo = async (req:Request, res:Response) => {
    try {
        const equipo    = new Equipo({
            Nombre:req.body.Nombre,
            Imagen:req.body.Imagen,
            Estado:req.body.Estado,
        })
        const data = equipo.save();
        res.json({"titulo":"Excelente","respuesta":'Equipo creada con exito',"type":"success"})
    } catch (error:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})  
    }
}

export const MostrarEquipo =async (req:Request, res:Response) => {
    try {
        const data = await Equipo.find({},{"createdAt":0,"updatedAt":0})
        res.json(data)
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}

export const EliminarEquipo =async (req:Request, res:Response) => {
    try {
        const data = await Equipo.deleteMany({Nombre:req.body.Nombre})
        res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
export const CrearEquipoAuto    =   async (req:Request,res:Response)=>{
    try {
        const Team =   await Persona.find({TipoUsuario:"Estudiante"}).count()
        const a=Math.round(Team/3)
        const Equipo = await Persona.aggregate([ { $sample: { size: a } } ])
        console.log(Equipo)
        res.json(Equipo);
    } catch (error) {
        res.json(error)
    }
}
export const GuardarTeams =async (req:Request,res:Response) => {
    try {
        const guardarT  = await Equipo.updateOne({Nombre:req.body.Nombre},{$set:{Team:req.body.Creado}})
    } catch (error) {
        res.json(error)
    }
}
export const editarEquipo = async (req:Request, res:Response) => {
    try {
        const data = await Equipo.findByIdAndUpdate({_id:req.body._id},
        {$set:
        {   Nombre:req.body.Nombre,
            Imagen:req.body.Imagen,
            Estado:req.body.Estado  
        }})
            res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
    }
}
/*
export const EditarEquipo =async (req:Request, res:Response) => {
    try {
        const data = await Equipo.updateMany({Nombre:req.body.Nombre},{"$set":{"Nombre": req.body.Nombre}})
        res.json(data);
    } catch (error) {
        res.json(error);
    }
}*/
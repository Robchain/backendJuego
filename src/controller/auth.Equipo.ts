import Equipo, {IEquipo} from '../models/Equipo'
import { Request, Response } from 'express'

export const CrearEquipo = async (req:Request, res:Response) => {
    try {
        const equipo    = new Equipo({
            Nombre:req.body.Nombre,
            Imagen:req.body.Imagen,
            Estado:req.body.Estado
        })
        const data = equipo.save();
        res.json(data);
    } catch (error) {
     res.json(error)   
    }
}

export const MostrarEquipo =async (req:Request, res:Response) => {
    try {
        const data = await Equipo.find({},{"createdAt":0,"updatedAt":0})
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}

export const EliminarEquipo =async (req:Request, res:Response) => {
    try {
        const data = await Equipo.deleteMany({Nombre:req.body.Nombre})
        res.json(data);
    } catch (error) {
        res.json(error);
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
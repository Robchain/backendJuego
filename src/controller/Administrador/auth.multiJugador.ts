import { Request, Response } from 'express'
import MultiJugador, {IMultiJuga} from '../../models/Administrador/MultiJugador';


export const CrearEvento = async (req:Request, res:Response) => {
    try {
        const multiJugador:IMultiJuga  = new  MultiJugador({
            Grupos:req.body.Primero,
            Equipos:req.body.Segundo,
            Fecha:req.body.Tercero,
            Estado:req.body.Estado
        })
        const guardarmulti   =    await   multiJugador.save();
        res.json({"titulo":"Excelente","respuesta":'Rompecabeza Creada con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
    }
}

export const PEvento = async (req:Request, res:Response) => {
    try {
        const data = await MultiJugador.find({},{"createdAt":0,"updatedAt":0})
        res.json(data)
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo encontrar`, "type":"error"});
    }
}

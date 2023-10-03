import { Request, Response } from 'express'
import { responseformualrio } from '../../lib';
import HabilitarJuego from '../../models/Administrador/HabilitarJuego';

interface ICrearHabilitarJuego{
    Curso:string;
     Paralelo:string;
      Juego:string;
}

///Curso
export const CrearHabilitarJuego = async ({Curso, Paralelo, Juego,}:ICrearHabilitarJuego) => {
    try {
       
        const equipo    = new HabilitarJuego({
            Juego:Juego,
            Curso:Curso,
            Paralelo:Paralelo,
            Estado:"ACTIVO"
        })
        await equipo.save();
     
    } catch (error:any) {
     
    }
}

export const MostrarHabilitarJuego =async (req:Request, res:Response) => {
    try {
        const data = await HabilitarJuego.find({},{"createdAt":0,"updatedAt":0})
        res.json(data)
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Mostrar.NoMostrar, "type":"error"});
    }
}

export const DesibilitarHabilitarJuego =async (req:Request, res:Response) => {
    try {
        const data = await HabilitarJuego.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Desactivar.Desactivar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Desactivar.NoDesactivar, "type":"error"});
    }
}
export const HabilitarHabilitarJuego =async (req:Request, res:Response) => {
    try {
        const data = await HabilitarJuego.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Activar.NoActivar, "type":"error"});
    }
 }
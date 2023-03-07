import { Request, Response } from 'express'
import MultiJugador, {IMultiJuga} from '../../models/Administrador/MultiJugador';
import { GuardarRelacionEntreEquipoYJuegos, CrearModeloInicialSinJuegos } from '../Multijugador/Fase1';


export const CrearEvento = async (req:Request, res:Response) => {
    try {
        const multiJugador:IMultiJuga  = new  MultiJugador({
            NombreDeEquipos:req.body.NombreDeEquipo,
            NumeroDeGrupos:req.body.NumeroDeGrupos,
            NumeroDeIntegrantes:req.body.NumeroDeIntegrantes,
            IntegrantesPorGrupos:req.body.Segundo,
            Fecha:req.body.picker,
            Estado:req.body.Estado,
        })
        const guardarmulti   =    await   multiJugador.save();
        CrearModeloInicialSinJuegos(guardarmulti); 
        //crear EquipoConJuego y lo guarda
        GuardarRelacionEntreEquipoYJuegos(guardarmulti);
              //crear el modelo base y lo guarda
                     
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

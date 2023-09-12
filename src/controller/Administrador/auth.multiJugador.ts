import { Request, Response } from 'express'
import MultiJugador, {IMultiJuga} from '../../models/Administrador/MultiJugador';
import { GuardarRelacionEntreEquipoYJuegos, CrearModeloInicialSinJuegos } from '../Multijugador/Fase1';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import Persona from '../../models/Administrador/Persona';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';



export const CrearEvento = async (req:Request, res:Response) => {
    try {
        let TipoDeJuego = req.body.TipoDeJuego;
        let Curso = req.body.Curso;
        let Paralelo = req.body.Paralelo;
        const multiJugador:IMultiJuga  = new  MultiJugador({
            NombreDeEquipos:req.body.NombreDeEquipo,
            NumeroDeGrupos:req.body.NumeroDeGrupos,
            NumeroDeIntegrantes:req.body.NumeroDeIntegrantes,
            IntegrantesPorGrupos:req.body.Segundo,
            TipoDeJuego:TipoDeJuego,
            Curso:Curso,
            Paralelo:Paralelo,
            Fecha:req.body.picker,
            Estado:"ACTIVO"
        })
        const guardarmulti   =    await   multiJugador.save();
        CrearModeloInicialSinJuegos(guardarmulti); 
        //crear EquipoConJuego y lo guarda
        GuardarRelacionEntreEquipoYJuegos(guardarmulti);
              //crear el modelo base y lo guarda
                     
                res.status(200).json({"titulo":"Excelente","respuesta":'Colaborativo creado con éxito',"type":"success"})
    } catch (error) {
        res.status(500).json({"titulo":"Error","respuesta":`No se pudo crear el colaborativo`, "type":"error"});
    }
}


export const BuscarPorCursoYParaleloMultijugador =async (req:Request, res:Response) => {
    try {
            const grupo:IGrupoDeTrabajo[] = await Grupos.find({Curso:req.body.Curso, Paralelo:req.body.Paralelo});
            if(grupo.length === 0){
                const user = await Persona.find({Curso:req.body.Curso, Paralelo:req.body.Paralelo}, {password:0});
                if(user.length === 0){
                    res.status(200).json([{value:"NO HAY ESTUDIANTES",label:"NO HAY ESTUDIANTES"}]);
                }else{
                let respuesta = user.map((item) => ({
                value: item.Identificacion,
                label: `${item.Nombre} ${item.Apellido}`
              }));
                res.status(200).json(respuesta);
            }    
            // aqui se manda el listado de estudiante en base al curso y paralelo
            }else{  
              const fechaActual = new Date();
              const FechaDeFin = new Date(grupo[0].FechaDeFin.toString());
              const FechaDeInicio = new Date(grupo[0].FechaDeInicio.toString());
// Compara las fechas
if(fechaActual >= FechaDeInicio || fechaActual < FechaDeInicio){
if (fechaActual.getTime() > FechaDeFin.getTime()) {
  const user = await Persona.find({Curso:req.body.Curso, Paralelo:req.body.Paralelo}, {password:0});
  if(user.length === 0){
      res.status(200).json([{value:"NO HAY ESTUDIANTES",label:"NO HAY ESTUDIANTES"}]);
  }else{
  let respuesta = user.map((item) => ({
  value: item.Identificacion,
  label: `${item.Nombre} ${item.Apellido}`
}));
  res.status(200).json(respuesta);
} 
} else if (fechaActual.getTime() < FechaDeFin.getTime()) {
  res.status(200).json(grupo);    
}
//aqui se manda todo los grupo mostrando que hay una actividad en progreso    
}

        }
    } catch (error) {
    res.status(500).json([{value:"NO HAY INFORMACION",label:"NO HAY INFORMACION"}]);
    }
}

export const PEvento = async (req:Request, res:Response) => {
    try {
        const data = await MultiJugador.find({},{"createdAt":0,"updatedAt":0})
        res.status(200).json(data)
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo encontrar`, "type":"error"});
    }
}


export const CreaJuegoMultijuador = async (req: Request, res: Response) => {
    try { 
      let piezas = req.params.id;
      let Juego1 = {}
      let Juego2 = {}
      let Juego3 = {}
      let Juego4 = {}
      let Juego5 = {}
      if(parseInt(piezas) !== 1 && parseInt(piezas) !==2  && parseInt(piezas) !==3){
        res.status(500).json("Numero no valido")
      }
      if (parseInt(piezas) === 1) {
        Juego1 = await CreaciondePartidasIndividualesVocabulario();
        Juego2 = await CreaciondePartidasIndividualesVocabulario();
        Juego3 = await CreaciondePartidasIndividualesVocabulario();
        Juego4 = await CreaciondePartidasIndividualesVocabulario();
        Juego5 = await CreaciondePartidasIndividualesVocabulario();
        res.json({ Juego1, Juego2, Juego3, Juego4, Juego5 })
      } else if (parseInt(piezas) === 2) {
        Juego1 = await uniendoOracionesPorCategoria();
        Juego2 = await uniendoOracionesPorCategoria();
        Juego3 = await uniendoOracionesPorCategoria();
        Juego4 = await uniendoOracionesPorCategoria();
        Juego5 = await uniendoOracionesPorCategoria();
        res.json({  Juego1, Juego2, Juego3, Juego4, Juego5 })
      }else if (parseInt(piezas) === 3) {
        Juego1 = await CreaciondePartidasIndividualesVocabulario();
        Juego2 = await uniendoOracionesPorCategoria();
        Juego3 = await CreaciondePartidasIndividualesVocabulario();
        Juego4 = await uniendoOracionesPorCategoria();
        Juego5 = await uniendoOracionesPorCategoria();
        res.json({  Juego1, Juego2, Juego3, Juego4, Juego5 })
      }

    } catch (error) {
      res.json(error)
    }
  }

  export const CrearJuegoVocabularioIndividual = async (req: Request, res: Response) => {
    try {
        let piezas = req.params.id;
      let Juego1 = {}
      let Juego2 = {}
      let Juego3 = {}
      let Juego4 = {}
      let Juego5 = {}
      let Juego6 = {}
      let Juego7 = {}
      if(parseInt(piezas) !== 4 && parseInt(piezas) !==6){
        res.status(500).json("Numero no valido")
      }
      if (parseInt(piezas) === 4) {
        Juego1 = await CreaciondePartidasIndividualesVocabulario();
        Juego2 = await CreaciondePartidasIndividualesVocabulario();
        Juego3 = await CreaciondePartidasIndividualesVocabulario();
        Juego4 = await CreaciondePartidasIndividualesVocabulario();
        Juego5 = await CreaciondePartidasIndividualesVocabulario();
        res.json({ Juego1, Juego2, Juego3, Juego4, Juego5 })
      } else if (parseInt(piezas) === 6) {
        Juego1 = await CreaciondePartidasIndividualesVocabulario();
        Juego2 = await CreaciondePartidasIndividualesVocabulario();
        Juego3 = await CreaciondePartidasIndividualesVocabulario();
        Juego4 = await CreaciondePartidasIndividualesVocabulario();
        Juego5 = await CreaciondePartidasIndividualesVocabulario();
        Juego6 = await CreaciondePartidasIndividualesVocabulario();
        Juego7 = await CreaciondePartidasIndividualesVocabulario();
        res.json({ Juego1, Juego2, Juego3, Juego4, Juego5, Juego6, Juego7 })
      }
    } catch (error) {
      res.json(error)
    }
  }
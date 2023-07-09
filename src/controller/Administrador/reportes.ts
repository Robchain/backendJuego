import { Request, Response } from "express";
import Grupos from "../../models/Juego/Multijugador/Grupos";
import JugadoresConOraciones from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import JugadoresConVocabularios from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import { IAvenceArriba } from "../../interface/Multijugador/Grupos.Interface";



function seleccionarObjetosPorIntervalo(array:IAvenceArriba[], inicio:number, fin:number) {
  return array.slice(inicio, fin );
}


  export const reporteGeneralPorEstudiante =async (req:Request,res:Response) => {
    try {
      let Pregunta=req.body.Pregunta
      let id = req.body.valorId
      let objetosConAvance:any[] = [] 
      let objetosConAvancedos:any[] = [] 
      let objetosConAvancetres:any[] = [] 
      switch (Pregunta) {
        case 'vocabulario':
          objetosConAvance   = await JugadoresConVocabularios.find({ "Estudiante.Identificacion":id},{ Rompecabeza: 0 }).exec()
          if(objetosConAvance.length>0){
            res.status(200).json(objetosConAvance);
          }else if(objetosConAvance.length===0){
            res.status(200).json([])
          }
          break;
          case 'oracion':
            objetosConAvance   = await JugadoresConOraciones.find({ "Estudiante.Identificacion": id},{ Rompecabeza: 0 }).exec()
            if(objetosConAvance.length>0){
              res.status(200).json(objetosConAvance);
            }else if(objetosConAvance.length===0){
              res.status(200).json([])
            }
          break;
          case 'Multi-Jugador':
            objetosConAvance   = await Grupos.find({
              "Integrantes": {
                  $elemMatch: {
                      value: id
                  }
              }
          });

          if(objetosConAvance.length>0){
             let pos=-1
            const nuevoarray = objetosConAvance.map(obj=>{
           const {Integrantes,Avance, createdAt,updatedAt} = obj;
           if(Avance !== null){
            for (let i = 0; i < Integrantes.length; i++) {
              if (Integrantes[i].value === id) {
                pos = i;
break;
              }
            }
              let inicio = ((pos+1)*5)-5;
            let  nuevoAn = seleccionarObjetosPorIntervalo(Avance, inicio, (pos+1)*5);
            if(nuevoAn.length>0){
              return{
                Avance:nuevoAn,
                createdAt,
                updatedAt
              }
            }else if(nuevoAn.length===0){
              return{
                Avance:[{PalabraAEvaluar:'No a jugado',PalabraASeleccionada:'No a jugado',Resultado:'No a jugado'}],
                createdAt,
                updatedAt
              }
            }
         
           }else if(Avance ===null){
           return{
            Avance:[{PalabraAEvaluar:'No a jugado',PalabraASeleccionada:'No a jugado',Resultado:'No a jugado'}],
            createdAt,
            updatedAt
          }}
          })
          res.status(200).json(nuevoarray);
          }else if(objetosConAvance.length===0){
            res.status(200).json([{ Avance:[{PalabraAEvaluar:'No existe juego',PalabraASeleccionada:'No existe juego',Resultado:'No existe juego'}]}])
          }
          break;
          case 'Todos':
            objetosConAvance   = await JugadoresConVocabularios.find({ "Estudiante.Identificacion":id},{ Rompecabeza: 0 }).exec()
            objetosConAvancedos   = await JugadoresConOraciones.find({ "Estudiante.Identificacion": id},{ Rompecabeza: 0 }).exec()
            objetosConAvancetres = await Grupos.find({
              "Integrantes": {
                  $elemMatch: {
                      value: id
                  }
              }
          });

          if(objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length  > 0){
            res.status(200).json(objetosConAvance.concat(objetosConAvancedos,multijugadorinter(objetosConAvancetres,id)));
          }else if(objetosConAvance.length===0 && objetosConAvancedos.length === 0){
            res.status(200).json([])
          }
          break;
        default:
          res.status(200).json([])
          break;
      }
    } catch (error) {
      res.status(500).json([]);
    }
  }

// por curso
export const reporteGeneralPorCurso =async (req:Request,res:Response) => {
  try {
    let Pregunta=req.body.Pregunta
    let Curso=req.body.Curso
    let Paralelo= req.body.Paralelo;
    let objetosConAvance:any[] = [] 
    let objetosConAvancedos:any[] = [] 
    let objetosConAvancetres:any[] = [] 
    switch (Pregunta) {
      case 'vocabulario':
        objetosConAvance   = await JugadoresConVocabularios.find({ "Estudiante.Curso": Curso,"Estudiante.Paralelo": Paralelo },{ Rompecabeza: 0 })
        if(objetosConAvance.length>0){
          res.status(200).json(objetosConAvance);
        }else if(objetosConAvance.length===0){
          res.status(203).json([])
        }
        break;
        case 'oracion':
          objetosConAvance   = await JugadoresConOraciones.find({ "Estudiante.Curso": Curso,"Estudiante.Paralelo": Paralelo },{ Rompecabeza: 0 })
          if(objetosConAvance.length>0){
            res.status(200).json(objetosConAvance);
          }else if(objetosConAvance.length===0){
            res.status(203).json([])
          }
        break;
        case 'Multi-Jugador':
          objetosConAvance   = await Grupos.find({ "Curso": Curso,"Paralelo": Paralelo },{ updatedAt: 0 });
          if(objetosConAvance.length>0){
            res.status(200).json(objetosConAvance);
          }else if(objetosConAvance.length===0){
            res.status(203).json([])
          }
        break;
        case 'Todos':
          objetosConAvance   = await JugadoresConVocabularios.find({ "Estudiante.Curso": Curso,"Estudiante.Paralelo": Paralelo },{ Rompecabeza: 0 })
          objetosConAvancedos   = await JugadoresConOraciones.find({ "Estudiante.Curso": Curso,"Estudiante.Paralelo": Paralelo },{ Rompecabeza: 0 })
          objetosConAvancetres = await Grupos.find({ "Curso": Curso,"Paralelo": Paralelo },{ updatedAt: 0 });
          if(objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length>0 ){
            res.status(200).json(objetosConAvance.concat(objetosConAvancedos,objetosConAvancetres));
          }else if(objetosConAvance.length===0 && objetosConAvancedos.length === 0 && objetosConAvancetres.length===0){
            res.status(203).json([])
          }
        break;
      default:
        res.status(203).json([])
        break;
    }
  } catch (error) {
    res.status(500).json([]);
  }
}

  //por juego
  export const reporteGeneralPorJuego =async (req:Request,res:Response) => {
    try {
      let Pregunta=req.body.Pregunta
      let objetosConAvance:any = [] 
      let objetosConAvancedos:any[] = [] 
      let objetosConAvancetres:any[] = [] 
      switch (Pregunta) {
        case 'vocabulario':
          objetosConAvance   = await JugadoresConVocabularios.find()
          if(objetosConAvance.length>0){
            res.status(200).json(objetosConAvance);
          }else if(objetosConAvance.length===0){
            res.status(203).json([])
          }
          break;
          case 'oracion':
            objetosConAvance   = await JugadoresConOraciones.find()
            if(objetosConAvance.length>0){
              res.status(200).json(objetosConAvance);
            }else if(objetosConAvance.length===0){
              res.status(203).json([])
            }
          break;
          case 'Multi-Jugador':
            objetosConAvance   = await Grupos.find({},{ updatedAt: 0 })
            res.status(200).json(objetosConAvance);
          break;
          case 'Todos':
            objetosConAvance   = await JugadoresConVocabularios.find()
            objetosConAvancedos = await JugadoresConOraciones.find()
            objetosConAvancetres=await Grupos.find({},{ updatedAt: 0 })
            if(objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length>0){
              res.status(200).json(objetosConAvance.concat(objetosConAvancedos,objetosConAvancetres));
            }else if(objetosConAvance.length===0 && objetosConAvancedos.length === 0&& objetosConAvancetres.length===0){
              res.status(203).json([])
            }
          break;
        default:
          res.status(203).json([])
          break;
      }
    } catch (error) {
      res.status(500).json([]);
    }
  }
 
  //por todos los juegos





  const multijugadorinter = (objetosConAvance:any[],id:string)=>{
    let pos=-1
    try {
      if(objetosConAvance.length ===0){
        return [{ Avance:[{PalabraAEvaluar:'No existe juego',PalabraASeleccionada:'No existe juego',Resultado:'No existe juego'}]}]
      }else if(objetosConAvance.length >0){
        const nuevoarray = objetosConAvance.map(obj=>{
          const {Integrantes,Avance, createdAt,updatedAt} = obj;
          if(Avance !== null){
           for (let i = 0; i < Integrantes.length; i++) {
             if (Integrantes[i].value === id) {
               pos = i;
    break;
             }
           }
             let inicio = ((pos+1)*5)-5;
           let  nuevoAn = seleccionarObjetosPorIntervalo(Avance, inicio, (pos+1)*5);
           if(nuevoAn.length>0){
             return{
               Avance:nuevoAn,
               createdAt,
               updatedAt
             }
           }else if(nuevoAn.length===0){
             return{
               Avance:[{PalabraAEvaluar:'No a jugado',PalabraASeleccionada:'No a jugado',Resultado:'No a jugado'}],
               createdAt,
               updatedAt
             }
           }
        
          }else if(Avance ===null){
          return{
           Avance:[{PalabraAEvaluar:'No a jugado',PalabraASeleccionada:'No a jugado',Resultado:'No a jugado'}],
           createdAt,
           updatedAt
         }}
         })
         return nuevoarray;
      } 
    } catch (error) {
      return [{ Avance:[{PalabraAEvaluar:'No existe juego',PalabraASeleccionada:'No existe juego',Resultado:'No existe juego'}]}]
    }
    
  }
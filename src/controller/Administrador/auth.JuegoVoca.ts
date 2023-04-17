import Rompecabeza,{IRompecabeza} from "../../models/Administrador/RecursosRompecabeza";
import Vocabulario,{IRecursosVocabulario} from "../../models/Administrador/RecursosVocabulario";
import EstudianteRompecabeza, {IEstudianteRompecabeza} from "../../models/Administrador/EstudianteRompecabeza";
import { Request, Response } from "express";
import Persona from "../../models/Administrador/Persona";
import PartidaVocabulario from "../../models/Juego/Vocabulario/PartidaVocabulario";
import { CrearJuegoVocabularioIndividual, modeloPartida, rompecabezas } from "../auth.TestDeLlamada";
import JugadoresConVocabularios, { IJugadoresConVocabulario } from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";

export const example = async (req:Request, res:Response) => {
    try {
        const data = await Rompecabeza.aggregate([
            {
                $lookup:{
                    from:"categorias", //coleccion a llamar
                    localField:"Categoria", // campo donde esta la la Object id
                    foreignField:"NombreCategoria", // campo donde esta el object id inicial a llamar
                    as:"Data"   // el nombre del nuevo campo
                }
            }
        ])
        res.json(data);
        console.log(data);
    } catch (error) {
        res.json(error);
    }
}

//volver a revisar la logica


export const activarJuegoVocabularioPorGrupo = async (req:Request, res:Response)=>{
try {   
    const Estudiantes = await Persona.find({Estado:"ACTIVO",TipoUsuario:"ESTUDIANTE",Paralelo:req.body.Paralelo,Curso:req.body.Curso},{ 'createdAt': 0, 'updatedAt': 0, 'Password': 0 })
    for( const estudiante of Estudiantes){
        await   crearJuegoVocabulario(estudiante);
    }
    res.json({"titulo":"Excelente","respuesta":'Juego Creado Con exito',"type":"success"})
} catch (error) {
    res.json({"titulo":"Error","respuesta":`Hubo un error al crear el juego`, "type":"error"}); 
}
}

const crearJuegoVocabulario = async (estudiante:any) => {
    for (let index = 0; index < 13; index++) {
      const juegosVocabulario = new JugadoresConVocabularios({
        Estudiante: {
          _id: estudiante._id,
          Nombre: estudiante.Nombre,
          Usuario: estudiante.Usuario,
          Identificacion: estudiante.Identificacion,
        },
        Rompecabeza: await rompecabezas(),
        Avance: null,
        Terminado: false,
      });
      await juegosVocabulario.save();
    }
  }
  
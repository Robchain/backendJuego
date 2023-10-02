import Rompecabeza from "../../models/Administrador/RecursosRompecabeza";
import { Request, Response } from "express";
import Persona from "../../models/Administrador/Persona";
import { rompecabezas } from "../auth.TestDeLlamada";
import JugadoresConVocabularios from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import { CrearHabilitarJuego } from "./auth.HabilitarJuego";
import { responseformualrio } from "../../lib";

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

//volver a revisar la logica - aqui me quede


export const activarJuegoVocabularioPorGrupo = async (req:Request, res:Response)=>{
try {    
    const {Paralelo, Curso} = req.body;
    const Estudiantes = await Persona.find({Estado:"ACTIVO",TipoUsuario:"ESTUDIANTE",Paralelo:Paralelo,Curso:Curso},{ 'createdAt': 0, 'updatedAt': 0, 'Password': 0 })
    if(Estudiantes.length > 0 ){ 
        for( const estudiante of Estudiantes){
            await   crearJuegoVocabulario(estudiante);
        }
       CrearHabilitarJuego({Curso:Curso, Paralelo:Paralelo, Juego:"VOCABULARIO"});
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    }else {
        res.json({"titulo":"Error","respuesta":'No hay estudiantes para asignar juego',"type":"error"})
    }
    
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
          Curso:estudiante.Curso,
          Paralelo:estudiante.Paralelo
        },
        Rompecabeza: await rompecabezas(),
        Avance: null,
        Terminado: false,
        Activo:true,
      });
      await juegosVocabulario.save();
    }
  }
  
import Rompecabeza from "../../models/Administrador/RecursosRompecabeza";
import { Request, Response } from "express";
import Persona from "../../models/Administrador/Persona";
import { rompecabezasVocabulario } from "../auth.TestDeLlamada";
import { CrearHabilitarJuego } from "./auth.HabilitarJuego";
import { responseformualrio } from "../../lib";
import JugadoresConVocabularios from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import mongoose from "mongoose";
import HabilitarJuego from "../../models/Administrador/HabilitarJuego";

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
    const jugadoresConVocabularios = await HabilitarJuego.find({Juego:"VOCABULARIO", Curso:Curso, Paralelo:Paralelo});
    if(jugadoresConVocabularios.length >0){
        res.json({"titulo":"Error","respuesta":responseformualrio.Creado.Repetido,"type":"error"})
    }else if(jugadoresConVocabularios.length ===0){
    const Estudiantes = await Persona.find({Estado:"ACTIVO",TipoUsuario:"ESTUDIANTE",Paralelo:Paralelo,Curso:Curso},{ 'createdAt': 0, 'updatedAt': 0, 'Password': 0 })
    if(Estudiantes.length > 0 ){ 
        for( const estudiante of Estudiantes){
            await   crearJuegoVocabulario(estudiante);
        }
       CrearHabilitarJuego({Curso:Curso, Paralelo:Paralelo, Juego:"VOCABULARIO"});
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    }else {
        res.json({"titulo":"Error","respuesta":'No hay estudiantes para asignar juegos',"type":"error"})
    }
}
    
} catch (error) {
    res.json({"titulo":"Error","respuesta":`Hubo un error al crear el juego`, "type":"error"}); 
}
}

export const crearJuegoVocabulario = async (estudiante:any) => {
  const rompecabeza = await Rompecabeza.aggregate([
    {
      '$match': {
        'Estado': 'ACTIVO', 
        'Juego': 'VOCABULARIO'
      }
    }
  ]);

    for (let index = 0; index <= rompecabeza.length; index++) {
      const juegosVocabulario = new JugadoresConVocabularios({
        Estudiante: {
          _id: estudiante._id,
          Nombre: estudiante.Nombre,
          Usuario: estudiante.Usuario,
          Identificacion: estudiante.Identificacion,
          Curso:estudiante.Curso,
          Paralelo:estudiante.Paralelo
        },
        Rompecabeza: rompecabeza[index],
        Avance: null,
        Terminado: false,
        Activo:true,
      });
      await juegosVocabulario.save();
    }
  }

  

  export const crearJuegoVocabularioIndividualAsignar = async ({estudiante, rompecabeza}:{estudiante:any, rompecabeza:any}) => {

     
        const juegosVocabulario = new JugadoresConVocabularios({
          Estudiante: {
            _id: estudiante._id,
            Nombre: estudiante.Nombre,
            Usuario: estudiante.Usuario,
            Identificacion: estudiante.Identificacion,
            Curso:estudiante.Curso,
            Paralelo:estudiante.Paralelo
          },
          Rompecabeza:rompecabeza,
          Avance: null,
          Terminado: false,
          Activo:true,
        });
        await juegosVocabulario.save();
      }



  export const crearJuegoVocabularioConCursoYParalelo = async (estudiante:any,Curso:string,Paralelo:string) => {
   
    const rompecabeza = await Rompecabeza.aggregate([
      {
        '$match': {
          'Estado': 'ACTIVO', 
          'Juego': 'VOCABULARIO'
        }
      }
    ]);

    for (let index = 0; index <= rompecabeza.length; index++) {
      const juegosVocabulario = new JugadoresConVocabularios({
        Estudiante: {
          _id: estudiante._id,
          Nombre: estudiante.Nombre,
          Usuario: estudiante.Usuario,
          Identificacion: estudiante.Identificacion,
          Curso:Curso,
          Paralelo:Paralelo
        },
        Rompecabeza: rompecabeza[index],
        Avance: null,
        Terminado: false,
        Activo:true,
      });
      await juegosVocabulario.save();
    }
  }
  
  export const cambiarCursoYParaleloDeLosJuegosCreadosVocabulario =async ({Curso, Paralelo,_id}:{Curso:string, Paralelo:string,_id:string})=>{
    try {
      const objectId = new mongoose.Types.ObjectId(_id);
  const data =   await JugadoresConVocabularios.updateMany({"Estudiante._id":objectId},{
    $set: {
      'Estudiante.Curso': Curso,
      'Estudiante.Paralelo': Paralelo
    }})
    } catch (error) {
      return;
    }
  }
  